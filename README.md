# psql-describe

psql's `\d` (describe) family of commands ported to JavaScript.

* From the master branch (17devel), we took `exec_command_d` from `command.c` and all of `describe.c` from `src/bin/psql`.
* We used RegExp search-and-replace to turn the C code into valid JS syntax.
* Then we fixed a variety of problems, mostly related to pointer arithmetic, pointer dereferencing, and pointer output parameters.

To test on my machine, I run:

```
./test.mjs /usr/local/pgsql/bin/psql postgres://localhost:5435/main < tests.txt
```

In case of failure, the tests halt and a `psql.txt` and `local.txt` are written, for you to diff.
