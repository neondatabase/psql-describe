/*
 * The SQL keywords, by number, as in ScanKeywordCategories (in common/keywords.c, which this follows). In psql, the
 * names are in ScanKeywords, a hash table that gen_keywordlist.pl makes at build time, in kwlist_d.h.
 */
#define PG_KEYWORD(kwname, value, category, collabel) kwname,
const char *const ScanKeywordNames[] = {
#include "parser/kwlist.h"
};
#undef PG_KEYWORD
