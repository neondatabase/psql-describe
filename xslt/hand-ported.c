/* fe_utils/string_utils.c: fmtIdEnc */
const char *
fmtIdEnc(const char *rawid, int encoding)
{
	PQExpBuffer id_return = getLocalPQExpBuffer();

	const char *cp;
	bool		need_quotes = false;
	size_t		remaining = strlen(rawid);

	/*
	 * These checks need to match the identifier production in scan.l. Don't
	 * use islower() etc.
	 */
	if (quote_all_identifiers)
		need_quotes = true;
	/* slightly different rules for first character */
	else if (!((rawid[0] >= 'a' && rawid[0] <= 'z') || rawid[0] == '_'))
		need_quotes = true;
	else
	{
		/* otherwise check the entire string */
		cp = rawid;
		for (size_t i = 0; i < remaining; i++, cp++)
		{
			if (!((*cp >= 'a' && *cp <= 'z')
				  || (*cp >= '0' && *cp <= '9')
				  || (*cp == '_')))
			{
				need_quotes = true;
				break;
			}
		}
	}

	if (!need_quotes)
	{
		/*
		 * Check for keyword.  We quote keywords except for unreserved ones.
		 * (In some cases we could avoid quoting a col_name or type_func_name
		 * keyword, but it seems much harder than it's worth to tell that.)
		 *
		 * Note: ScanKeywordLookup() does case-insensitive comparison, but
		 * that's fine, since we already know we have all-lower-case.
		 */
		int			kwnum = ScanKeywordLookup(rawid, &ScanKeywords);

		if (kwnum >= 0 && ScanKeywordCategories[kwnum] != UNRESERVED_KEYWORD)
			need_quotes = true;
	}

	if (!need_quotes)
	{
		/* no quoting needed */
		appendPQExpBufferStr(id_return, rawid);
	}
	else
	{
		appendPQExpBufferChar(id_return, '"');

		cp = &rawid[0];
		while (remaining > 0)
		{
			int			charlen;

			/* Fast path for plain ASCII */
			if (!IS_HIGHBIT_SET(*cp))
			{
				/*
				 * Did we find a double-quote in the string? Then make this a
				 * double double-quote per SQL99. Before, we put in a
				 * backslash/double-quote pair. - thomas 2000-08-05
				 */
				if (*cp == '"')
					appendPQExpBufferChar(id_return, '"');
				appendPQExpBufferChar(id_return, *cp);
				remaining--;
				cp++;
				continue;
			}

			/* Slow path for possible multibyte characters */
			charlen = pg_encoding_mblen(encoding, cp);

			if (remaining < charlen ||
				pg_encoding_verifymbchar(encoding, cp, charlen) == -1)
			{
				/*
				 * Multibyte character is invalid.  It's important to verify
				 * that as invalid multibyte characters could e.g. be used to
				 * "skip" over quote characters, e.g. when parsing
				 * character-by-character.
				 *
				 * Replace the character's first byte with an invalid
				 * sequence. The invalid sequence ensures that the escaped
				 * string will trigger an error on the server-side, even if we
				 * can't directly report an error here.
				 *
				 * It would be a bit faster to verify the whole string the
				 * first time we encounter a set highbit, but this way we can
				 * replace just the invalid data, which probably makes it
				 * easier for users to find the invalidly encoded portion of a
				 * larger string.
				 */
				if (enlargePQExpBuffer(id_return, 2))
				{
					pg_encoding_set_invalid(encoding,
											id_return->data + id_return->len);
					id_return->len += 2;
					id_return->data[id_return->len] = '\0';
				}

				/*
				 * Handle the following bytes as if this byte didn't exist.
				 * That's safer in case the subsequent bytes contain
				 * characters that are significant for the caller (e.g. '>' in
				 * html).
				 */
				remaining--;
				cp++;
			}
			else
			{
				for (int i = 0; i < charlen; i++)
				{
					appendPQExpBufferChar(id_return, *cp);
					remaining--;
					cp++;
				}
			}
		}

		appendPQExpBufferChar(id_return, '"');
	}

	return id_return->data;
}

/* fe_utils/string_utils.c: fmtId */
const char *
fmtId(const char *rawid)
{
	return fmtIdEnc(rawid, getFmtEncoding());
}

/* fe_utils/string_utils.c: appendStringLiteral */
void
appendStringLiteral(PQExpBuffer buf, const char *str,
					int encoding, bool std_strings)
{
	size_t		length = strlen(str);
	const char *source = str;
	char	   *target;
	size_t		remaining = length;

	if (!enlargePQExpBuffer(buf, 2 * length + 2))
		return;

	target = buf->data + buf->len;
	*target++ = '\'';

	while (remaining > 0)
	{
		char		c = *source;
		int			charlen;
		int			i;

		/* Fast path for plain ASCII */
		if (!IS_HIGHBIT_SET(c))
		{
			/* Apply quoting if needed */
			if (SQL_STR_DOUBLE(c, !std_strings))
				*target++ = c;
			/* Copy the character */
			*target++ = c;
			source++;
			remaining--;
			continue;
		}

		/* Slow path for possible multibyte characters */
		charlen = PQmblen(source, encoding);

		if (remaining < charlen ||
			pg_encoding_verifymbchar(encoding, source, charlen) == -1)
		{
			/*
			 * Multibyte character is invalid.  It's important to verify that
			 * as invalid multibyte characters could e.g. be used to "skip"
			 * over quote characters, e.g. when parsing
			 * character-by-character.
			 *
			 * Replace the character's first byte with an invalid sequence.
			 * The invalid sequence ensures that the escaped string will
			 * trigger an error on the server-side, even if we can't directly
			 * report an error here.
			 *
			 * We know there's enough space for the invalid sequence because
			 * the "target" buffer is 2 * length + 2 long, and at worst we're
			 * replacing a single input byte with two invalid bytes.
			 *
			 * It would be a bit faster to verify the whole string the first
			 * time we encounter a set highbit, but this way we can replace
			 * just the invalid data, which probably makes it easier for users
			 * to find the invalidly encoded portion of a larger string.
			 */
			pg_encoding_set_invalid(encoding, target);
			target += 2;

			/*
			 * Handle the following bytes as if this byte didn't exist. That's
			 * safer in case the subsequent bytes contain important characters
			 * for the caller (e.g. '>' in html).
			 */
			source++;
			remaining--;
		}
		else
		{
			/* Copy the character */
			for (i = 0; i < charlen; i++)
			{
				*target++ = *source++;
				remaining--;
			}
		}
	}

	/* Write the terminating quote and NUL character. */
	*target++ = '\'';
	*target = '\0';

	buf->len = target - buf->data;
}

/* fe_utils/string_utils.c: appendStringLiteralConn */
void
appendStringLiteralConn(PQExpBuffer buf, const char *str, PGconn *conn)
{
	size_t		length = strlen(str);

	/*
	 * XXX This is a kluge to silence escape_string_warning in our utility
	 * programs.  It can go away once pre-v19 servers are out of support.
	 */
	if (strchr(str, '\\') != NULL && PQserverVersion(conn) < 190000)
	{
		/* ensure we are not adjacent to an identifier */
		if (buf->len > 0 && buf->data[buf->len - 1] != ' ')
			appendPQExpBufferChar(buf, ' ');
		appendPQExpBufferChar(buf, ESCAPE_STRING_SYNTAX);
		appendStringLiteral(buf, str, PQclientEncoding(conn), false);
		return;
	}
	/* XXX end kluge */

	if (!enlargePQExpBuffer(buf, 2 * length + 2))
		return;
	appendPQExpBufferChar(buf, '\'');
	buf->len += PQescapeStringConn(conn, buf->data + buf->len,
								   str, length, NULL);
	appendPQExpBufferChar(buf, '\'');
}

/* fe_utils/string_utils.c: parsePGArray */
bool
parsePGArray(const char *atext, char ***itemarray, int *nitems)
{
	int			inputlen;
	char	  **items;
	char	   *strings;
	int			curitem;

	/*
	 * We expect input in the form of "{item,item,item}" where any item is
	 * either raw data, or surrounded by double quotes (in which case embedded
	 * characters including backslashes and quotes are backslashed).
	 *
	 * We build the result as an array of pointers followed by the actual
	 * string data, all in one malloc block for convenience of deallocation.
	 * The worst-case storage need is not more than one pointer and one
	 * character for each input character (consider "{,,,,,,,,,,}").
	 */
	*itemarray = NULL;
	*nitems = 0;
	inputlen = strlen(atext);
	if (inputlen < 2 || atext[0] != '{' || atext[inputlen - 1] != '}')
		return false;			/* bad input */
	items = (char **) malloc(inputlen * (sizeof(char *) + sizeof(char)));
	if (items == NULL)
		return false;			/* out of memory */
	*itemarray = items;
	strings = (char *) (items + inputlen);

	atext++;					/* advance over initial '{' */
	curitem = 0;
	while (*atext != '}')
	{
		if (*atext == '\0')
			return false;		/* premature end of string */
		items[curitem] = strings;
		while (*atext != '}' && *atext != ',')
		{
			if (*atext == '\0')
				return false;	/* premature end of string */
			if (*atext != '"')
				*strings++ = *atext++;	/* copy unquoted data */
			else
			{
				/* process quoted substring */
				atext++;
				while (*atext != '"')
				{
					if (*atext == '\0')
						return false;	/* premature end of string */
					if (*atext == '\\')
					{
						atext++;
						if (*atext == '\0')
							return false;	/* premature end of string */
					}
					*strings++ = *atext++;	/* copy quoted data */
				}
				atext++;
			}
		}
		*strings++ = '\0';
		if (*atext == ',')
			atext++;
		curitem++;
	}
	if (atext[1] != '\0')
		return false;			/* bogus syntax (embedded '}') */
	*nitems = curitem;
	return true;
}

/* bin/psql/common.c: PSQLexec */
PGresult *
PSQLexec(const char *query)
{
	PGresult   *res;

	if (!pset.db)
	{
		pg_log_error("You are currently not connected to a database.");
		return NULL;
	}

	if (pset.echo_hidden != PSQL_ECHO_HIDDEN_OFF)
	{
		printf(_("/**** INTERNAL QUERY ****/\n"
				 "%s\n"
				 "/************************/\n\n"), query);
		fflush(stdout);
		if (pset.logfile)
		{
			fprintf(pset.logfile,
					_("/**** INTERNAL QUERY ****/\n"
					  "%s\n"
					  "/************************/\n\n"), query);
			fflush(pset.logfile);
		}

		if (pset.echo_hidden == PSQL_ECHO_HIDDEN_NOEXEC)
			return NULL;
	}

	SetCancelConn(pset.db);

	res = PQexec(pset.db, query);

	ResetCancelConn();

	if (!AcceptResult(res, true))
	{
		ClearOrSaveResult(res);
		res = NULL;
	}

	return res;
}

/* fe_utils/print.c: print_aligned_text */
static void
print_aligned_text(const printTableContent *cont, FILE *fout, bool is_pager)
{
	bool		opt_tuples_only = cont->opt->tuples_only;
	int			encoding = cont->opt->encoding;
	unsigned short opt_border = cont->opt->border;
	const printTextFormat *format = get_line_style(cont->opt);
	const printTextLineFormat *dformat = &format->lrule[PRINT_RULE_DATA];

	unsigned int col_count = 0,
				cell_count = 0;

	unsigned int i,
				j;

	unsigned int *width_header,
			   *max_width,
			   *width_wrap,
			   *width_average;
	unsigned int *max_nl_lines, /* value split by newlines */
			   *curr_nl_line,
			   *max_bytes;
	unsigned char **format_buf;
	unsigned int width_total;
	unsigned int total_header_width;

	const char *const *ptr;

	struct lineptr **col_lineptrs;	/* pointers to line pointer per column */

	bool	   *header_done;	/* Have all header lines been output? */
	int		   *bytes_output;	/* Bytes output for column value */
	printTextLineWrap *wrap;	/* Wrap status for each column */
	int			output_columns = 0; /* Width of interactive console */
	bool		is_local_pager = false;

	if (cancel_pressed)
		return;

	if (opt_border > 2)
		opt_border = 2;

	if (cont->ncolumns > 0)
	{
		col_count = cont->ncolumns;
		width_header = pg_malloc0_array(unsigned int, col_count);
		width_average = pg_malloc0_array(unsigned int, col_count);
		max_width = pg_malloc0_array(unsigned int, col_count);
		width_wrap = pg_malloc0_array(unsigned int, col_count);
		max_nl_lines = pg_malloc0_array(unsigned int, col_count);
		curr_nl_line = pg_malloc0_array(unsigned int, col_count);
		col_lineptrs = pg_malloc0_array(struct lineptr *, col_count);
		max_bytes = pg_malloc0_array(unsigned int, col_count);
		format_buf = pg_malloc0_array(unsigned char *, col_count);
		header_done = pg_malloc0_array(bool, col_count);
		bytes_output = pg_malloc0_array(int, col_count);
		wrap = pg_malloc0_array(printTextLineWrap, col_count);
	}
	else
	{
		width_header = NULL;
		width_average = NULL;
		max_width = NULL;
		width_wrap = NULL;
		max_nl_lines = NULL;
		curr_nl_line = NULL;
		col_lineptrs = NULL;
		max_bytes = NULL;
		format_buf = NULL;
		header_done = NULL;
		bytes_output = NULL;
		wrap = NULL;
	}

	/* scan all column headers, find maximum width and max max_nl_lines */
	for (i = 0; i < col_count; i++)
	{
		int			width,
					nl_lines,
					bytes_required;

		pg_wcssize((const unsigned char *) cont->headers[i], strlen(cont->headers[i]),
				   encoding, &width, &nl_lines, &bytes_required);
		if (width > max_width[i])
			max_width[i] = width;
		if (nl_lines > max_nl_lines[i])
			max_nl_lines[i] = nl_lines;
		if (bytes_required > max_bytes[i])
			max_bytes[i] = bytes_required;

		width_header[i] = width;
	}

	/* scan all cells, find maximum width, compute cell_count */
	for (i = 0, ptr = cont->cells; *ptr; ptr++, cell_count++)
	{
		int			width,
					nl_lines,
					bytes_required;

		pg_wcssize((const unsigned char *) *ptr, strlen(*ptr), encoding,
				   &width, &nl_lines, &bytes_required);

		if (width > max_width[i])
			max_width[i] = width;
		if (nl_lines > max_nl_lines[i])
			max_nl_lines[i] = nl_lines;
		if (bytes_required > max_bytes[i])
			max_bytes[i] = bytes_required;

		width_average[i] += width;

		/* i is the current column number: increment with wrap */
		if (++i >= col_count)
			i = 0;
	}

	/* If we have rows, compute average */
	if (col_count != 0 && cell_count != 0)
	{
		int			rows = cell_count / col_count;

		for (i = 0; i < col_count; i++)
			width_average[i] /= rows;
	}

	/* adjust the total display width based on border style */
	if (opt_border == 0)
		width_total = col_count;
	else if (opt_border == 1)
		width_total = col_count * 3 - ((col_count > 0) ? 1 : 0);
	else
		width_total = col_count * 3 + 1;
	total_header_width = width_total;

	for (i = 0; i < col_count; i++)
	{
		width_total += max_width[i];
		total_header_width += width_header[i];
	}

	/*
	 * At this point: max_width[] contains the max width of each column,
	 * max_nl_lines[] contains the max number of lines in each column,
	 * max_bytes[] contains the maximum storage space for formatting strings,
	 * width_total contains the giant width sum.  Now we allocate some memory
	 * for line pointers.
	 */
	for (i = 0; i < col_count; i++)
	{
		/* Add entry for ptr == NULL array termination */
		col_lineptrs[i] = pg_malloc0_array(struct lineptr,
										   (max_nl_lines[i] + 1));

		format_buf[i] = pg_malloc_array(unsigned char, (max_bytes[i] + 1));

		col_lineptrs[i]->ptr = format_buf[i];
	}

	/* Default word wrap to the full width, i.e. no word wrap */
	for (i = 0; i < col_count; i++)
		width_wrap[i] = max_width[i];

	/*
	 * Choose target output width: \pset columns, or $COLUMNS, or ioctl
	 */
	if (cont->opt->columns > 0)
		output_columns = cont->opt->columns;
	else if ((fout == stdout && isatty(fileno(stdout))) || is_pager)
	{
		if (cont->opt->env_columns > 0)
			output_columns = cont->opt->env_columns;
#ifdef TIOCGWINSZ
		else
		{
			struct winsize screen_size;

			if (ioctl(fileno(stdout), TIOCGWINSZ, &screen_size) != -1)
				output_columns = screen_size.ws_col;
		}
#endif
	}

	if (cont->opt->format == PRINT_WRAPPED)
	{
		/*
		 * Optional optimized word wrap. Shrink columns with a high max/avg
		 * ratio.  Slightly bias against wider columns. (Increases chance a
		 * narrow column will fit in its cell.)  If available columns is
		 * positive...  and greater than the width of the unshrinkable column
		 * headers
		 */
		if (output_columns > 0 && output_columns >= total_header_width)
		{
			/* While there is still excess width... */
			while (width_total > output_columns)
			{
				double		max_ratio = 0;
				int			worst_col = -1;

				/*
				 * Find column that has the highest ratio of its maximum width
				 * compared to its average width.  This tells us which column
				 * will produce the fewest wrapped values if shortened.
				 * width_wrap starts as equal to max_width.
				 */
				for (i = 0; i < col_count; i++)
				{
					if (width_average[i] && width_wrap[i] > width_header[i])
					{
						/* Penalize wide columns by 1% of their width */
						double		ratio;

						ratio = (double) width_wrap[i] / width_average[i] +
							max_width[i] * 0.01;
						if (ratio > max_ratio)
						{
							max_ratio = ratio;
							worst_col = i;
						}
					}
				}

				/* Exit loop if we can't squeeze any more. */
				if (worst_col == -1)
					break;

				/* Decrease width of target column by one. */
				width_wrap[worst_col]--;
				width_total--;
			}
		}
	}

	/*
	 * If in expanded auto mode, we have now calculated the expected width, so
	 * we can now escape to vertical mode if necessary.  If the output has
	 * only one column, the expanded format would be wider than the regular
	 * format, so don't use it in that case.
	 */
	if (cont->opt->expanded == 2 && output_columns > 0 && cont->ncolumns > 1 &&
		(output_columns < total_header_width || output_columns < width_total))
	{
		print_aligned_vertical(cont, fout, is_pager);
		goto cleanup;
	}

	/* If we wrapped beyond the display width, use the pager */
	if (!is_pager && fout == stdout && output_columns > 0 &&
		(output_columns < total_header_width || output_columns < width_total))
	{
		fout = PageOutput(INT_MAX, cont->opt);	/* force pager */
		is_pager = is_local_pager = true;
	}

	/* Check if there are enough lines to require the pager */
	if (!is_pager)
	{
		IsPagerNeeded(cont, width_wrap, false, &fout, &is_pager);
		is_local_pager = is_pager;
	}

	/* time to output */
	if (cont->opt->start_table)
	{
		/* print title */
		if (cont->title && !opt_tuples_only)
		{
			int			width,
						height;

			pg_wcssize((const unsigned char *) cont->title, strlen(cont->title),
					   encoding, &width, &height, NULL);
			if (width >= width_total)
				/* Aligned */
				fprintf(fout, "%s\n", cont->title);
			else
				/* Centered */
				fprintf(fout, "%-*s%s\n", (width_total - width) / 2, "",
						cont->title);
		}

		/* print headers */
		if (!opt_tuples_only)
		{
			int			more_col_wrapping;
			int			curr_nl_line;

			if (opt_border == 2)
				_print_horizontal_line(col_count, width_wrap, opt_border,
									   PRINT_RULE_TOP, format, fout);

			for (i = 0; i < col_count; i++)
				pg_wcsformat((const unsigned char *) cont->headers[i],
							 strlen(cont->headers[i]), encoding,
							 col_lineptrs[i], max_nl_lines[i]);

			more_col_wrapping = col_count;
			curr_nl_line = 0;
			if (col_count > 0)
				memset(header_done, false, col_count * sizeof(bool));
			while (more_col_wrapping)
			{
				if (opt_border == 2)
					fputs(dformat->leftvrule, fout);

				for (i = 0; i < cont->ncolumns; i++)
				{
					struct lineptr *this_line = col_lineptrs[i] + curr_nl_line;
					unsigned int nbspace;

					if (opt_border != 0 ||
						(!format->wrap_right_border && i > 0))
						fputs(curr_nl_line ? format->header_nl_left : " ",
							  fout);

					if (!header_done[i])
					{
						nbspace = width_wrap[i] - this_line->width;

						/* centered */
						fprintf(fout, "%-*s%s%-*s",
								nbspace / 2, "", this_line->ptr, (nbspace + 1) / 2, "");

						if (!(this_line + 1)->ptr)
						{
							more_col_wrapping--;
							header_done[i] = 1;
						}
					}
					else
						fprintf(fout, "%*s", width_wrap[i], "");

					if (opt_border != 0 || format->wrap_right_border)
						fputs(!header_done[i] ? format->header_nl_right : " ",
							  fout);

					if (opt_border != 0 && col_count > 0 && i < col_count - 1)
						fputs(dformat->midvrule, fout);
				}
				curr_nl_line++;

				if (opt_border == 2)
					fputs(dformat->rightvrule, fout);
				fputc('\n', fout);
			}

			_print_horizontal_line(col_count, width_wrap, opt_border,
								   PRINT_RULE_MIDDLE, format, fout);
		}
	}

	/* print cells, one loop per row */
	for (i = 0, ptr = cont->cells; *ptr; i += col_count, ptr += col_count)
	{
		bool		more_lines;

		if (cancel_pressed)
			break;

		/*
		 * Format each cell.
		 */
		for (j = 0; j < col_count; j++)
		{
			pg_wcsformat((const unsigned char *) ptr[j], strlen(ptr[j]), encoding,
						 col_lineptrs[j], max_nl_lines[j]);
			curr_nl_line[j] = 0;
		}

		memset(bytes_output, 0, col_count * sizeof(int));

		/*
		 * Each time through this loop, one display line is output. It can
		 * either be a full value or a partial value if embedded newlines
		 * exist or if 'format=wrapping' mode is enabled.
		 */
		do
		{
			more_lines = false;

			/* left border */
			if (opt_border == 2)
				fputs(dformat->leftvrule, fout);

			/* for each column */
			for (j = 0; j < col_count; j++)
			{
				/* We have a valid array element, so index it */
				struct lineptr *this_line = &col_lineptrs[j][curr_nl_line[j]];
				int			bytes_to_output;
				int			chars_to_output = width_wrap[j];
				bool		finalspaces = (opt_border == 2 ||
										   (col_count > 0 && j < col_count - 1));

				/* Print left-hand wrap or newline mark */
				if (opt_border != 0)
				{
					if (wrap[j] == PRINT_LINE_WRAP_WRAP)
						fputs(format->wrap_left, fout);
					else if (wrap[j] == PRINT_LINE_WRAP_NEWLINE)
						fputs(format->nl_left, fout);
					else
						fputc(' ', fout);
				}

				if (!this_line->ptr)
				{
					/* Past newline lines so just pad for other columns */
					if (finalspaces)
						fprintf(fout, "%*s", chars_to_output, "");
				}
				else
				{
					/* Get strlen() of the characters up to width_wrap */
					bytes_to_output =
						strlen_max_width(this_line->ptr + bytes_output[j],
										 &chars_to_output, encoding);

					/*
					 * If we exceeded width_wrap, it means the display width
					 * of a single character was wider than our target width.
					 * In that case, we have to pretend we are only printing
					 * the target display width and make the best of it.
					 */
					if (chars_to_output > width_wrap[j])
						chars_to_output = width_wrap[j];

					if (cont->aligns[j] == 'r') /* Right aligned cell */
					{
						/* spaces first */
						fprintf(fout, "%*s", width_wrap[j] - chars_to_output, "");
						fwrite((char *) (this_line->ptr + bytes_output[j]),
							   1, bytes_to_output, fout);
					}
					else		/* Left aligned cell */
					{
						/* spaces second */
						fwrite((char *) (this_line->ptr + bytes_output[j]),
							   1, bytes_to_output, fout);
					}

					bytes_output[j] += bytes_to_output;

					/* Do we have more text to wrap? */
					if (*(this_line->ptr + bytes_output[j]) != '\0')
						more_lines = true;
					else
					{
						/* Advance to next newline line */
						curr_nl_line[j]++;
						if (col_lineptrs[j][curr_nl_line[j]].ptr != NULL)
							more_lines = true;
						bytes_output[j] = 0;
					}
				}

				/* Determine next line's wrap status for this column */
				wrap[j] = PRINT_LINE_WRAP_NONE;
				if (col_lineptrs[j][curr_nl_line[j]].ptr != NULL)
				{
					if (bytes_output[j] != 0)
						wrap[j] = PRINT_LINE_WRAP_WRAP;
					else if (curr_nl_line[j] != 0)
						wrap[j] = PRINT_LINE_WRAP_NEWLINE;
				}

				/*
				 * If left-aligned, pad out remaining space if needed (not
				 * last column, and/or wrap marks required).
				 */
				if (cont->aligns[j] != 'r') /* Left aligned cell */
				{
					if (finalspaces ||
						wrap[j] == PRINT_LINE_WRAP_WRAP ||
						wrap[j] == PRINT_LINE_WRAP_NEWLINE)
						fprintf(fout, "%*s",
								width_wrap[j] - chars_to_output, "");
				}

				/* Print right-hand wrap or newline mark */
				if (wrap[j] == PRINT_LINE_WRAP_WRAP)
					fputs(format->wrap_right, fout);
				else if (wrap[j] == PRINT_LINE_WRAP_NEWLINE)
					fputs(format->nl_right, fout);
				else if (opt_border == 2 || (col_count > 0 && j < col_count - 1))
					fputc(' ', fout);

				/* Print column divider, if not the last column */
				if (opt_border != 0 && (col_count > 0 && j < col_count - 1))
				{
					if (wrap[j + 1] == PRINT_LINE_WRAP_WRAP)
						fputs(format->midvrule_wrap, fout);
					else if (wrap[j + 1] == PRINT_LINE_WRAP_NEWLINE)
						fputs(format->midvrule_nl, fout);
					else if (col_lineptrs[j + 1][curr_nl_line[j + 1]].ptr == NULL)
						fputs(format->midvrule_blank, fout);
					else
						fputs(dformat->midvrule, fout);
				}
			}

			/* end-of-row border */
			if (opt_border == 2)
				fputs(dformat->rightvrule, fout);
			fputc('\n', fout);
		} while (more_lines);
	}

	if (cont->opt->stop_table)
	{
		printTableFooter *footers = footers_with_default(cont);

		if (opt_border == 2 && !cancel_pressed)
			_print_horizontal_line(col_count, width_wrap, opt_border,
								   PRINT_RULE_BOTTOM, format, fout);

		/* print footers */
		if (footers && !opt_tuples_only && !cancel_pressed)
		{
			printTableFooter *f;

			for (f = footers; f; f = f->next)
				fprintf(fout, "%s\n", f->data);
		}

		fputc('\n', fout);
	}

cleanup:
	/* clean up */
	for (i = 0; i < col_count; i++)
	{
		free(col_lineptrs[i]);
		free(format_buf[i]);
	}
	free(width_header);
	free(width_average);
	free(max_width);
	free(width_wrap);
	free(max_nl_lines);
	free(curr_nl_line);
	free(col_lineptrs);
	free(max_bytes);
	free(format_buf);
	free(header_done);
	free(bytes_output);
	free(wrap);

	if (is_local_pager)
		ClosePager(fout);
}

/* fe_utils/print.c: print_aligned_vertical */
static void
print_aligned_vertical(const printTableContent *cont,
					   FILE *fout, bool is_pager)
{
	bool		opt_tuples_only = cont->opt->tuples_only;
	unsigned short opt_border = cont->opt->border;
	const printTextFormat *format = get_line_style(cont->opt);
	const printTextLineFormat *dformat = &format->lrule[PRINT_RULE_DATA];
	int			encoding = cont->opt->encoding;
	unsigned long record = cont->opt->prior_records + 1;
	const char *const *ptr;
	unsigned int i,
				hwidth = 0,
				dwidth = 0,
				hheight = 1,
				dheight = 1,
				hformatsize = 0,
				dformatsize = 0;
	struct lineptr *hlineptr,
			   *dlineptr;
	bool		is_local_pager = false,
				hmultiline = false,
				dmultiline = false;
	int			output_columns = 0; /* Width of interactive console */

	if (cancel_pressed)
		return;

	if (opt_border > 2)
		opt_border = 2;

	/*
	 * Kluge for totally empty table: use the default footer even though
	 * vertical modes normally don't.  Otherwise we'd print nothing at all,
	 * which isn't terribly friendly.  Assume pager will not be needed.
	 */
	if (cont->cells[0] == NULL && cont->opt->start_table &&
		cont->opt->stop_table)
	{
		printTableFooter *footers = footers_with_default(cont);

		if (!opt_tuples_only && !cancel_pressed && footers)
		{
			printTableFooter *f;

			for (f = footers; f; f = f->next)
				fprintf(fout, "%s\n", f->data);
		}

		fputc('\n', fout);

		return;
	}

	/* Find the maximum dimensions for the headers */
	for (i = 0; i < cont->ncolumns; i++)
	{
		int			width,
					height,
					fs;

		pg_wcssize((const unsigned char *) cont->headers[i], strlen(cont->headers[i]),
				   encoding, &width, &height, &fs);
		if (width > hwidth)
			hwidth = width;
		if (height > hheight)
		{
			hheight = height;
			hmultiline = true;
		}
		if (fs > hformatsize)
			hformatsize = fs;
	}

	/* find longest data cell */
	for (ptr = cont->cells; *ptr; ptr++)
	{
		int			width,
					height,
					fs;

		pg_wcssize((const unsigned char *) *ptr, strlen(*ptr), encoding,
				   &width, &height, &fs);
		if (width > dwidth)
			dwidth = width;
		if (height > dheight)
		{
			dheight = height;
			dmultiline = true;
		}
		if (fs > dformatsize)
			dformatsize = fs;
	}

	/*
	 * We now have all the information we need to setup the formatting
	 * structures
	 */
	dlineptr = pg_malloc_array(struct lineptr, (dheight + 1));
	hlineptr = pg_malloc_array(struct lineptr, (hheight + 1));

	dlineptr->ptr = pg_malloc(dformatsize);
	hlineptr->ptr = pg_malloc(hformatsize);

	/*
	 * Choose target output width: \pset columns, or $COLUMNS, or ioctl
	 */
	if (cont->opt->columns > 0)
		output_columns = cont->opt->columns;
	else if ((fout == stdout && isatty(fileno(stdout))) || is_pager)
	{
		if (cont->opt->env_columns > 0)
			output_columns = cont->opt->env_columns;
#ifdef TIOCGWINSZ
		else
		{
			struct winsize screen_size;

			if (ioctl(fileno(stdout), TIOCGWINSZ, &screen_size) != -1)
				output_columns = screen_size.ws_col;
		}
#endif
	}

	/*
	 * Determine data column width: fit output width in wrapped mode, or
	 * ensure alignment with the record header line in aligned mode.
	 */
	if (cont->opt->format == PRINT_WRAPPED || cont->opt->format == PRINT_ALIGNED)
	{
		unsigned int swidth,
					rwidth = 0,
					newdwidth;

		if (opt_border == 0)
		{
			/*
			 * For border = 0, one space in the middle.  (If we discover we
			 * need to wrap, the spacer column will be replaced by a wrap
			 * marker, and we'll make room below for another wrap marker at
			 * the end of the line.  But for now, assume no wrap is needed.)
			 */
			swidth = 1;

			/* We might need a column for header newline markers, too */
			if (hmultiline)
				swidth++;
		}
		else if (opt_border == 1)
		{
			/*
			 * For border = 1, two spaces and a vrule in the middle.  (As
			 * above, we might need one more column for a wrap marker.)
			 */
			swidth = 3;

			/* We might need a column for left header newline markers, too */
			if (hmultiline && (format == &pg_asciiformat_old))
				swidth++;
		}
		else
		{
			/*
			 * For border = 2, two more for the vrules at the beginning and
			 * end of the lines, plus spacer columns adjacent to these.  (We
			 * won't need extra columns for wrap/newline markers, we'll just
			 * repurpose the spacers.)
			 */
			swidth = 7;
		}

		/* Reserve a column for data newline indicators, too, if needed */
		if (dmultiline &&
			opt_border < 2 && format != &pg_asciiformat_old)
			swidth++;

		/* Determine width required for record header lines */
		if (!opt_tuples_only)
		{
			if (cont->nrows > 0)
				rwidth = 1 + (int) log10(cont->nrows);
			if (opt_border == 0)
				rwidth += 9;	/* "* RECORD " */
			else if (opt_border == 1)
				rwidth += 12;	/* "-[ RECORD  ]" */
			else
				rwidth += 15;	/* "+-[ RECORD  ]-+" */
		}

		/* We might need to do the rest of the calculation twice */
		for (;;)
		{
			unsigned int width;

			/* Total width required to not wrap data */
			width = hwidth + swidth + dwidth;
			/* ... and not the header lines, either */
			if (width < rwidth)
				width = rwidth;

			if (cont->opt->format == PRINT_WRAPPED && output_columns > 0)
			{
				unsigned int min_width;

				/* Minimum acceptable width: room for just 3 columns of data */
				min_width = hwidth + swidth + 3;
				/* ... but not less than what the record header lines need */
				if (min_width < rwidth)
					min_width = rwidth;

				if (output_columns >= width)
				{
					/* Plenty of room, use native data width */
					/* (but at least enough for the record header lines) */
					newdwidth = width - hwidth - swidth;
				}
				else if (output_columns < min_width)
				{
					/* Set data width to match min_width */
					newdwidth = min_width - hwidth - swidth;
				}
				else
				{
					/* Set data width to match output_columns */
					newdwidth = output_columns - hwidth - swidth;
				}
			}
			else
			{
				/* Don't know the wrap limit, so use native data width */
				/* (but at least enough for the record header lines) */
				newdwidth = width - hwidth - swidth;
			}

			/*
			 * If we will need to wrap data and didn't already allocate a data
			 * newline/wrap marker column, do so and recompute.
			 */
			if (newdwidth < dwidth && !dmultiline &&
				opt_border < 2 && format != &pg_asciiformat_old)
			{
				dmultiline = true;
				swidth++;
			}
			else
				break;
		}

		dwidth = newdwidth;
	}

	/*
	 * Deal with the pager here instead of in printTable(), because we could
	 * get here via print_aligned_text() in expanded auto mode, and so we have
	 * to recalculate the pager requirement based on vertical output.
	 */
	if (!is_pager)
	{
		unsigned int *width_wrap = NULL;

		/*
		 * Wrapping can add extra output lines, which count_table_lines() can
		 * only account for if it has wrap widths.  But vertical output uses
		 * the same data width for every field, so that's easy: use dwidth for
		 * every column.
		 */
		if (cont->opt->format == PRINT_WRAPPED && cont->ncolumns > 0)
		{
			width_wrap = pg_malloc_array(unsigned int, cont->ncolumns);
			for (i = 0; i < cont->ncolumns; i++)
				width_wrap[i] = dwidth;
		}

		IsPagerNeeded(cont, width_wrap, true, &fout, &is_pager);
		is_local_pager = is_pager;

		free(width_wrap);
	}

	if (cont->opt->start_table)
	{
		/* print title */
		if (!opt_tuples_only && cont->title)
			fprintf(fout, "%s\n", cont->title);
	}

	/* print records */
	for (i = 0, ptr = cont->cells; *ptr; i++, ptr++)
	{
		printTextRule pos;
		int			dline,
					hline,
					dcomplete,
					hcomplete,
					offset,
					chars_to_output;

		if (cancel_pressed)
			break;

		if (i == 0)
			pos = PRINT_RULE_TOP;
		else
			pos = PRINT_RULE_MIDDLE;

		/* Print record header (e.g. "[ RECORD N ]") above each record */
		if (i % cont->ncolumns == 0)
		{
			unsigned int lhwidth = hwidth;

			if ((opt_border < 2) &&
				(hmultiline) &&
				(format == &pg_asciiformat_old))
				lhwidth++;		/* for newline indicators */

			if (!opt_tuples_only)
				print_aligned_vertical_line(cont->opt, record++,
											lhwidth, dwidth, output_columns,
											pos, fout);
			else if (i != 0 || !cont->opt->start_table || opt_border == 2)
				print_aligned_vertical_line(cont->opt, 0, lhwidth,
											dwidth, output_columns, pos, fout);
		}

		/* Format the header */
		pg_wcsformat((const unsigned char *) cont->headers[i % cont->ncolumns],
					 strlen(cont->headers[i % cont->ncolumns]),
					 encoding, hlineptr, hheight);
		/* Format the data */
		pg_wcsformat((const unsigned char *) *ptr, strlen(*ptr), encoding,
					 dlineptr, dheight);

		/*
		 * Loop through header and data in parallel dealing with newlines and
		 * wrapped lines until they're both exhausted
		 */
		dline = hline = 0;
		dcomplete = hcomplete = 0;
		offset = 0;
		chars_to_output = dlineptr[dline].width;
		while (!dcomplete || !hcomplete)
		{
			/* Left border */
			if (opt_border == 2)
				fprintf(fout, "%s", dformat->leftvrule);

			/* Header (never wrapped so just need to deal with newlines) */
			if (!hcomplete)
			{
				int			swidth = hwidth,
							target_width = hwidth;

				/*
				 * Left spacer or new line indicator
				 */
				if ((opt_border == 2) ||
					(hmultiline && (format == &pg_asciiformat_old)))
					fputs(hline ? format->header_nl_left : " ", fout);

				/*
				 * Header text
				 */
				strlen_max_width(hlineptr[hline].ptr, &target_width,
								 encoding);
				fprintf(fout, "%-s", hlineptr[hline].ptr);

				/*
				 * Spacer
				 */
				swidth -= target_width;
				if (swidth > 0)
					fprintf(fout, "%*s", swidth, " ");

				/*
				 * New line indicator or separator's space
				 */
				if (hlineptr[hline + 1].ptr)
				{
					/* More lines after this one due to a newline */
					if ((opt_border > 0) ||
						(hmultiline && (format != &pg_asciiformat_old)))
						fputs(format->header_nl_right, fout);
					hline++;
				}
				else
				{
					/* This was the last line of the header */
					if ((opt_border > 0) ||
						(hmultiline && (format != &pg_asciiformat_old)))
						fputs(" ", fout);
					hcomplete = 1;
				}
			}
			else
			{
				unsigned int swidth = hwidth + opt_border;

				if ((opt_border < 2) &&
					(hmultiline) &&
					(format == &pg_asciiformat_old))
					swidth++;

				if ((opt_border == 0) &&
					(format != &pg_asciiformat_old) &&
					(hmultiline))
					swidth++;

				fprintf(fout, "%*s", swidth, " ");
			}

			/* Separator */
			if (opt_border > 0)
			{
				if (offset)
					fputs(format->midvrule_wrap, fout);
				else if (dline == 0)
					fputs(dformat->midvrule, fout);
				else
					fputs(format->midvrule_nl, fout);
			}

			/* Data */
			if (!dcomplete)
			{
				int			target_width = dwidth,
							bytes_to_output,
							swidth = dwidth;

				/*
				 * Left spacer or wrap indicator
				 */
				fputs(offset == 0 ? " " : format->wrap_left, fout);

				/*
				 * Data text
				 */
				bytes_to_output = strlen_max_width(dlineptr[dline].ptr + offset,
												   &target_width, encoding);
				fwrite((char *) (dlineptr[dline].ptr + offset),
					   1, bytes_to_output, fout);

				chars_to_output -= target_width;
				offset += bytes_to_output;

				/* Spacer */
				swidth -= target_width;

				if (chars_to_output)
				{
					/* continuing a wrapped column */
					if ((opt_border > 1) ||
						(dmultiline && (format != &pg_asciiformat_old)))
					{
						if (swidth > 0)
							fprintf(fout, "%*s", swidth, " ");
						fputs(format->wrap_right, fout);
					}
				}
				else if (dlineptr[dline + 1].ptr)
				{
					/* reached a newline in the column */
					if ((opt_border > 1) ||
						(dmultiline && (format != &pg_asciiformat_old)))
					{
						if (swidth > 0)
							fprintf(fout, "%*s", swidth, " ");
						fputs(format->nl_right, fout);
					}
					dline++;
					offset = 0;
					chars_to_output = dlineptr[dline].width;
				}
				else
				{
					/* reached the end of the cell */
					if (opt_border > 1)
					{
						if (swidth > 0)
							fprintf(fout, "%*s", swidth, " ");
						fputs(" ", fout);
					}
					dcomplete = 1;
				}

				/* Right border */
				if (opt_border == 2)
					fputs(dformat->rightvrule, fout);

				fputs("\n", fout);
			}
			else
			{
				/*
				 * data exhausted (this can occur if header is longer than the
				 * data due to newlines in the header)
				 */
				if (opt_border < 2)
					fputs("\n", fout);
				else
					fprintf(fout, "%*s  %s\n", dwidth, "", dformat->rightvrule);
			}
		}
	}

	if (cont->opt->stop_table)
	{
		if (opt_border == 2 && !cancel_pressed)
			print_aligned_vertical_line(cont->opt, 0, hwidth, dwidth,
										output_columns, PRINT_RULE_BOTTOM, fout);

		/* print footers */
		if (!opt_tuples_only && cont->footers != NULL && !cancel_pressed)
		{
			printTableFooter *f;

			if (opt_border < 2)
				fputc('\n', fout);
			for (f = cont->footers; f; f = f->next)
				fprintf(fout, "%s\n", f->data);
		}

		fputc('\n', fout);
	}

	free(hlineptr->ptr);
	free(dlineptr->ptr);
	free(hlineptr);
	free(dlineptr);

	if (is_local_pager)
		ClosePager(fout);
}

/* fe_utils/print.c: printTableInit */
void
printTableInit(printTableContent *const content, const printTableOpt *opt,
			   const char *title, const int ncolumns, const int nrows)
{
	uint64		total_cells;

	content->opt = opt;
	content->title = title;
	content->ncolumns = ncolumns;
	content->nrows = nrows;

	content->headers = pg_malloc0_array(const char *, (ncolumns + 1));

	total_cells = (uint64) ncolumns * nrows;
	/* Catch possible overflow.  Using >= here allows adding 1 below */
	if (total_cells >= SIZE_MAX / sizeof(*content->cells))
	{
		fprintf(stderr, _("Cannot print table contents: number of cells %" PRIu64 " is equal to or exceeds maximum %zu.\n"),
				total_cells,
				SIZE_MAX / sizeof(*content->cells));
		exit(EXIT_FAILURE);
	}
	content->cells = pg_malloc0_array(const char *, (total_cells + 1));

	content->cellmustfree = NULL;
	content->footers = NULL;

	content->aligns = pg_malloc0_array(char, (ncolumns + 1));

	content->header = content->headers;
	content->cell = content->cells;
	content->footer = content->footers;
	content->align = content->aligns;
	content->cellsadded = 0;
}

/* fe_utils/print.c: printTableAddHeader */
void
printTableAddHeader(printTableContent *const content, char *header,
					const bool translate, const char align)
{

	(void) translate;			/* unused parameter */


	if (content->header >= content->headers + content->ncolumns)
	{
		fprintf(stderr, _("Cannot add header to table content: "
						  "column count of %d exceeded.\n"),
				content->ncolumns);
		exit(EXIT_FAILURE);
	}

	*content->header = (char *) mbvalidate((unsigned char *) header,
										   content->opt->encoding);




	content->header++;

	*content->align = align;
	content->align++;
}

/* fe_utils/print.c: printTableAddCell */
void
printTableAddCell(printTableContent *const content, char *cell,
				  const bool translate, const bool mustfree)
{
	uint64		total_cells;


	(void) translate;			/* unused parameter */


	total_cells = (uint64) content->ncolumns * content->nrows;
	if (content->cellsadded >= total_cells)
	{
		fprintf(stderr, _("Cannot add cell to table content: total cell count of %" PRIu64 " exceeded.\n"),
				total_cells);
		exit(EXIT_FAILURE);
	}

	*content->cell = (char *) mbvalidate((unsigned char *) cell,
										 content->opt->encoding);






	if (mustfree)
	{
		if (content->cellmustfree == NULL)
			content->cellmustfree =
				pg_malloc0_array(bool, (total_cells + 1));

		content->cellmustfree[content->cellsadded] = true;
	}
	content->cell++;
	content->cellsadded++;
}

/* fe_utils/print.c: printTableAddFooter */
void
printTableAddFooter(printTableContent *const content, const char *footer)
{
	printTableFooter *f;

	f = pg_malloc0_object(printTableFooter);
	f->data = pg_strdup(footer);

	if (content->footers == NULL)
		content->footers = f;
	else
		content->footer->next = f;

	content->footer = f;
}

/* fe_utils/print.c: printTableSetFooter */
void
printTableSetFooter(printTableContent *const content, const char *footer)
{
	if (content->footers != NULL)
	{
		free(content->footer->data);
		content->footer->data = pg_strdup(footer);
	}
	else
		printTableAddFooter(content, footer);
}

/* fe_utils/print.c: printTable */
void
printTable(const printTableContent *cont,
		   FILE *fout, bool is_pager, FILE *flog)
{
	bool		is_local_pager = false;

	if (cancel_pressed)
		return;

	if (cont->opt->format == PRINT_NOTHING)
		return;

	/* print_aligned_*() handle the pager themselves */
	if (!is_pager &&
		cont->opt->format != PRINT_ALIGNED &&
		cont->opt->format != PRINT_WRAPPED)
	{
		IsPagerNeeded(cont, NULL, (cont->opt->expanded == 1), &fout, &is_pager);
		is_local_pager = is_pager;
	}

	/* clear any pre-existing error indication on the output stream */
	clearerr(fout);

	/* print the stuff */
	switch (cont->opt->format)
	{
		case PRINT_UNALIGNED:
			if (cont->opt->expanded == 1)
				print_unaligned_vertical(cont, fout);
			else
				print_unaligned_text(cont, fout);
			break;
		case PRINT_ALIGNED:
		case PRINT_WRAPPED:

			/*
			 * In expanded-auto mode, force vertical if a pager is passed in;
			 * else we may make different decisions for different hunks of the
			 * query result.
			 */
			if (cont->opt->expanded == 1 ||
				(cont->opt->expanded == 2 && is_pager))
				print_aligned_vertical(cont, fout, is_pager);
			else
				print_aligned_text(cont, fout, is_pager);
			break;
		case PRINT_CSV:
			if (cont->opt->expanded == 1)
				print_csv_vertical(cont, fout);
			else
				print_csv_text(cont, fout);
			break;
		case PRINT_HTML:
			if (cont->opt->expanded == 1)
				print_html_vertical(cont, fout);
			else
				print_html_text(cont, fout);
			break;
		case PRINT_ASCIIDOC:
			if (cont->opt->expanded == 1)
				print_asciidoc_vertical(cont, fout);
			else
				print_asciidoc_text(cont, fout);
			break;
		case PRINT_LATEX:
			if (cont->opt->expanded == 1)
				print_latex_vertical(cont, fout);
			else
				print_latex_text(cont, fout);
			break;
		case PRINT_LATEX_LONGTABLE:
			if (cont->opt->expanded == 1)
				print_latex_vertical(cont, fout);
			else
				print_latex_longtable_text(cont, fout);
			break;
		case PRINT_TROFF_MS:
			if (cont->opt->expanded == 1)
				print_troff_ms_vertical(cont, fout);
			else
				print_troff_ms_text(cont, fout);
			break;
		default:
			fprintf(stderr, _("invalid output format (internal error): %d"),
					cont->opt->format);
			exit(EXIT_FAILURE);
	}

	if (is_local_pager)
		ClosePager(fout);

	/* also produce log output if wanted */
	if (flog)
		print_aligned_text(cont, flog, false);
}

/* bin/psql/psqlscanslash.l: rules */
%%

%{
		/* Declare some local variables inside yylex(), for convenience */
		PsqlScanState cur_state = yyextra;
		PQExpBuffer output_buf = cur_state->output_buf;

		/*
		 * Force flex into the state indicated by start_state.  This has a
		 * couple of purposes: it lets some of the functions below set a new
		 * starting state without ugly direct access to flex variables, and it
		 * allows us to transition from one flex lexer to another so that we
		 * can lex different parts of the source string using separate lexers.
		 */
		BEGIN(cur_state->start_state);
%}

	/*
	 * We don't really expect to be invoked in the INITIAL state in this
	 * lexer; but if we are, just spit data to the output_buf until EOF.
	 */

{other}|\n		{ ECHO; }

	/*
	 * Exclusive lexer states to handle backslash command lexing
	 */

<xslashcmd>{
	/* command name ends at whitespace or backslash; eat all else */

{space}|"\\"	{
					yyless(0);
					cur_state->start_state = YY_START;
					return LEXRES_OK;
				}

{other}			{ ECHO; }

}

<xslashargstart>{
	/*
	 * Discard any whitespace before argument, then go to xslasharg state.
	 * An exception is that "|" is only special at start of argument, so we
	 * check for it here.
	 */

{space}+		{ }

"|"				{
					if (option_type == OT_FILEPIPE)
					{
						/* treat like whole-string case */
						ECHO;
						BEGIN(xslashwholeline);
					}
					else
					{
						/* vertical bar is not special otherwise */
						yyless(0);
						BEGIN(xslasharg);
					}
				}

{other}			{
					yyless(0);
					BEGIN(xslasharg);
				}

}

<xslasharg>{
	/*
	 * Default processing of text in a slash command's argument.
	 *
	 * Note: unquoted_option_chars counts the number of characters at the
	 * end of the argument that were not subject to any form of quoting.
	 * psql_scan_slash_option needs this to strip trailing semicolons safely.
	 */

{space}|"\\"	{
					/*
					 * Unquoted space is end of arg; do not eat.  Likewise
					 * backslash is end of command or next command, do not eat
					 *
					 * XXX this means we can't conveniently accept options
					 * that include unquoted backslashes; therefore, option
					 * processing that encourages use of backslashes is rather
					 * broken.
					 */
					yyless(0);
					cur_state->start_state = YY_START;
					return LEXRES_OK;
				}

{quote}			{
					*option_quote = '\'';
					unquoted_option_chars = 0;
					BEGIN(xslashquote);
				}

"`"				{
					backtick_start_offset = output_buf->len;
					*option_quote = '`';
					unquoted_option_chars = 0;
					BEGIN(xslashbackquote);
				}

{dquote}		{
					ECHO;
					*option_quote = '"';
					unquoted_option_chars = 0;
					BEGIN(xslashdquote);
				}

:{variable_char}+	{
					/* Possible psql variable substitution */
					if (cur_state->callbacks->get_variable == NULL)
						ECHO;
					else
					{
						char	   *varname;
						char	   *value;

						varname = psqlscan_extract_substring(cur_state,
															 yytext + 1,
															 yyleng - 1);
						value = cur_state->callbacks->get_variable(varname,
																   PQUOTE_PLAIN,
																   cur_state->cb_passthrough);
						free(varname);

						/*
						 * The variable value is just emitted without any
						 * further examination.  This is consistent with the
						 * pre-8.0 code behavior, if not with the way that
						 * variables are handled outside backslash commands.
						 * Note that we needn't guard against recursion here.
						 */
						if (value)
						{
							appendPQExpBufferStr(output_buf, value);
							free(value);
						}
						else
							ECHO;

						*option_quote = ':';
					}
					unquoted_option_chars = 0;
				}

:'{variable_char}+'	{
					psqlscan_escape_variable(cur_state, yytext, yyleng,
											 PQUOTE_SQL_LITERAL);
					*option_quote = ':';
					unquoted_option_chars = 0;
				}


:\"{variable_char}+\"	{
					psqlscan_escape_variable(cur_state, yytext, yyleng,
											 PQUOTE_SQL_IDENT);
					*option_quote = ':';
					unquoted_option_chars = 0;
				}

:\{\?{variable_char}+\}	{
					psqlscan_test_variable(cur_state, yytext, yyleng);
				}

:'{variable_char}*	{
					/* Throw back everything but the colon */
					yyless(1);
					unquoted_option_chars++;
					ECHO;
				}

:\"{variable_char}*	{
					/* Throw back everything but the colon */
					yyless(1);
					unquoted_option_chars++;
					ECHO;
				}

:\{\?{variable_char}*	{
					/* Throw back everything but the colon */
					yyless(1);
					unquoted_option_chars++;
					ECHO;
				}

:\{		{
					/* Throw back everything but the colon */
					yyless(1);
					unquoted_option_chars++;
					ECHO;
				}

{other}			{
					unquoted_option_chars++;
					ECHO;
				}

}

<xslashquote>{
	/*
	 * single-quoted text: copy literally except for '' and backslash
	 * sequences
	 */

{quote}			{ BEGIN(xslasharg); }

{xqdouble}		{ appendPQExpBufferChar(output_buf, '\''); }

"\\n"			{ appendPQExpBufferChar(output_buf, '\n'); }
"\\t"			{ appendPQExpBufferChar(output_buf, '\t'); }
"\\b"			{ appendPQExpBufferChar(output_buf, '\b'); }
"\\r"			{ appendPQExpBufferChar(output_buf, '\r'); }
"\\f"			{ appendPQExpBufferChar(output_buf, '\f'); }

{xeoctesc}		{
					/* octal case */
					appendPQExpBufferChar(output_buf,
										  (char) strtol(yytext + 1, NULL, 8));
				}

{xehexesc}		{
					/* hex case */
					appendPQExpBufferChar(output_buf,
										  (char) strtol(yytext + 2, NULL, 16));
				}

"\\".			{ psqlscan_emit(cur_state, yytext + 1, 1); }

{other}|\n		{ ECHO; }

}

<xslashbackquote>{
	/*
	 * backticked text: copy everything until next backquote (expanding
	 * variable references, but doing nought else), then evaluate.
	 */

"`"				{
					/* In an inactive \if branch, don't evaluate the command */
					if (cur_state->cb_passthrough == NULL ||
						conditional_active((ConditionalStack) cur_state->cb_passthrough))
						evaluate_backtick(cur_state);
					BEGIN(xslasharg);
				}

:{variable_char}+	{
					/* Possible psql variable substitution */
					if (cur_state->callbacks->get_variable == NULL)
						ECHO;
					else
					{
						char	   *varname;
						char	   *value;

						varname = psqlscan_extract_substring(cur_state,
															 yytext + 1,
															 yyleng - 1);
						value = cur_state->callbacks->get_variable(varname,
																   PQUOTE_PLAIN,
																   cur_state->cb_passthrough);
						free(varname);

						if (value)
						{
							appendPQExpBufferStr(output_buf, value);
							free(value);
						}
						else
							ECHO;
					}
				}

:'{variable_char}+'	{
					psqlscan_escape_variable(cur_state, yytext, yyleng,
											 PQUOTE_SHELL_ARG);
				}

:'{variable_char}*	{
					/* Throw back everything but the colon */
					yyless(1);
					ECHO;
				}

{other}|\n		{ ECHO; }

}

<xslashdquote>{
	/* double-quoted text: copy verbatim, including the double quotes */

{dquote}		{
					ECHO;
					BEGIN(xslasharg);
				}

{other}|\n		{ ECHO; }

}

<xslashwholeline>{
	/* copy everything until end of input line */
	/* but suppress leading whitespace */

{space}+		{
					if (output_buf->len > 0)
						ECHO;
				}

{other}			{ ECHO; }

}

<xslashend>{
	/* at end of command, eat a double backslash, but not anything else */

"\\\\"			{
					cur_state->start_state = YY_START;
					return LEXRES_OK;
				}

{other}|\n		{
					yyless(0);
					cur_state->start_state = YY_START;
					return LEXRES_OK;
				}

}

<<EOF>>			{
					if (cur_state->buffer_stack == NULL)
					{
						cur_state->start_state = YY_START;
						return LEXRES_EOL;		/* end of input reached */
					}

					/*
					 * We were expanding a variable, so pop the inclusion
					 * stack and keep lexing
					 */
					psqlscan_pop_buffer_stack(cur_state);
					psqlscan_select_top_buffer(cur_state);
				}

%%
