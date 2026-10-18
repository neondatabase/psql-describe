var we=[["ABORT","abort the current transaction","sql-abort","ABORT [ WORK | TRANSACTION ] [ AND [ NO ] CHAIN ]"],["ALTE\
R AGGREGATE","change the definition of an aggregate function","sql-alteraggregate",`ALTER AGGREGATE name ( aggregate_sig\
nature ) RENAME TO new_name
ALTER AGGREGATE name ( aggregate_signature )
                OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER AGGREGATE name ( aggregate_signature ) SET SCHEMA new_schema

where aggregate_signature is:

* |
[ argmode ] [ argname ] argtype [ , ... ] |
[ [ argmode ] [ argname ] argtype [ , ... ] ] ORDER BY [ argmode ] [ argname ] argtype [ , ... ]`],["ALTER COLLATION","c\
hange the definition of a collation","sql-altercollation",`ALTER COLLATION name REFRESH VERSION

ALTER COLLATION name RENAME TO new_name
ALTER COLLATION name OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER COLLATION name SET SCHEMA new_schema`],["ALTER CONVERSION","change the definition of a conversion","sql-alterconve\
rsion",`ALTER CONVERSION name RENAME TO new_name
ALTER CONVERSION name OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER CONVERSION name SET SCHEMA new_schema`],["ALTER DATABASE","change a database","sql-alterdatabase",`ALTER DATABASE \
name [ [ WITH ] option [ ... ] ]

where option can be:

    ALLOW_CONNECTIONS allowconn
    CONNECTION LIMIT connlimit
    IS_TEMPLATE istemplate

ALTER DATABASE name RENAME TO new_name

ALTER DATABASE name OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }

ALTER DATABASE name SET TABLESPACE new_tablespace

ALTER DATABASE name REFRESH COLLATION VERSION

ALTER DATABASE name SET configuration_parameter { TO | = } { value | DEFAULT }
ALTER DATABASE name SET configuration_parameter FROM CURRENT
ALTER DATABASE name RESET configuration_parameter
ALTER DATABASE name RESET ALL`],["ALTER DEFAULT PRIVILEGES","define default access privileges","sql-alterdefaultprivileg\
es",`ALTER DEFAULT PRIVILEGES
    [ FOR { ROLE | USER } target_role [, ...] ]
    [ IN SCHEMA schema_name [, ...] ]
    abbreviated_grant_or_revoke

where abbreviated_grant_or_revoke is one of:

GRANT { { SELECT | INSERT | UPDATE | DELETE | TRUNCATE | REFERENCES | TRIGGER | MAINTAIN }
    [, ...] | ALL [ PRIVILEGES ] }
    ON TABLES
    TO { [ GROUP ] role_name | PUBLIC } [, ...] [ WITH GRANT OPTION ]

GRANT { { USAGE | SELECT | UPDATE }
    [, ...] | ALL [ PRIVILEGES ] }
    ON SEQUENCES
    TO { [ GROUP ] role_name | PUBLIC } [, ...] [ WITH GRANT OPTION ]

GRANT { EXECUTE | ALL [ PRIVILEGES ] }
    ON { FUNCTIONS | ROUTINES }
    TO { [ GROUP ] role_name | PUBLIC } [, ...] [ WITH GRANT OPTION ]

GRANT { USAGE | ALL [ PRIVILEGES ] }
    ON TYPES
    TO { [ GROUP ] role_name | PUBLIC } [, ...] [ WITH GRANT OPTION ]

GRANT { { USAGE | CREATE }
    [, ...] | ALL [ PRIVILEGES ] }
    ON SCHEMAS
    TO { [ GROUP ] role_name | PUBLIC } [, ...] [ WITH GRANT OPTION ]

GRANT { { SELECT | UPDATE }
    [, ...] | ALL [ PRIVILEGES ] }
    ON LARGE OBJECTS
    TO { [ GROUP ] role_name | PUBLIC } [, ...] [ WITH GRANT OPTION ]

REVOKE [ GRANT OPTION FOR ]
    { { SELECT | INSERT | UPDATE | DELETE | TRUNCATE | REFERENCES | TRIGGER | MAINTAIN }
    [, ...] | ALL [ PRIVILEGES ] }
    ON TABLES
    FROM { [ GROUP ] role_name | PUBLIC } [, ...]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { { USAGE | SELECT | UPDATE }
    [, ...] | ALL [ PRIVILEGES ] }
    ON SEQUENCES
    FROM { [ GROUP ] role_name | PUBLIC } [, ...]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { EXECUTE | ALL [ PRIVILEGES ] }
    ON { FUNCTIONS | ROUTINES }
    FROM { [ GROUP ] role_name | PUBLIC } [, ...]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { USAGE | ALL [ PRIVILEGES ] }
    ON TYPES
    FROM { [ GROUP ] role_name | PUBLIC } [, ...]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { { USAGE | CREATE }
    [, ...] | ALL [ PRIVILEGES ] }
    ON SCHEMAS
    FROM { [ GROUP ] role_name | PUBLIC } [, ...]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { { SELECT | UPDATE }
    [, ...] | ALL [ PRIVILEGES ] }
    ON LARGE OBJECTS
    FROM { [ GROUP ] role_name | PUBLIC } [, ...]
    [ CASCADE | RESTRICT ]`],["ALTER DOMAIN","change the definition of a domain","sql-alterdomain",`ALTER DOMAIN name
    { SET DEFAULT expression | DROP DEFAULT }
ALTER DOMAIN name
    { SET | DROP } NOT NULL
ALTER DOMAIN name
    ADD domain_constraint [ NOT VALID ]
ALTER DOMAIN name
    DROP CONSTRAINT [ IF EXISTS ] constraint_name [ RESTRICT | CASCADE ]
ALTER DOMAIN name
     RENAME CONSTRAINT constraint_name TO new_constraint_name
ALTER DOMAIN name
    VALIDATE CONSTRAINT constraint_name
ALTER DOMAIN name
    OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER DOMAIN name
    RENAME TO new_name
ALTER DOMAIN name
    SET SCHEMA new_schema

where domain_constraint is:

[ CONSTRAINT constraint_name ]
{ NOT NULL | CHECK (expression) }`],["ALTER EVENT TRIGGER","change the definition of an event trigger","sql-altereventtr\
igger",`ALTER EVENT TRIGGER name DISABLE
ALTER EVENT TRIGGER name ENABLE [ REPLICA | ALWAYS ]
ALTER EVENT TRIGGER name OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER EVENT TRIGGER name RENAME TO new_name`],["ALTER EXTENSION","change the definition of an extension","sql-alterexten\
sion",`ALTER EXTENSION name UPDATE [ TO new_version ]
ALTER EXTENSION name SET SCHEMA new_schema
ALTER EXTENSION name ADD member_object
ALTER EXTENSION name DROP member_object

where member_object is:

  ACCESS METHOD object_name |
  AGGREGATE aggregate_name ( aggregate_signature ) |
  CAST (source_type AS target_type) |
  COLLATION object_name |
  CONVERSION object_name |
  DOMAIN object_name |
  EVENT TRIGGER object_name |
  FOREIGN DATA WRAPPER object_name |
  FOREIGN TABLE object_name |
  FUNCTION function_name [ ( [ [ argmode ] [ argname ] argtype [, ...] ] ) ] |
  MATERIALIZED VIEW object_name |
  OPERATOR operator_name (left_type, right_type) |
  OPERATOR CLASS object_name USING index_method |
  OPERATOR FAMILY object_name USING index_method |
  [ PROCEDURAL ] LANGUAGE object_name |
  PROCEDURE procedure_name [ ( [ [ argmode ] [ argname ] argtype [, ...] ] ) ] |
  ROUTINE routine_name [ ( [ [ argmode ] [ argname ] argtype [, ...] ] ) ] |
  SCHEMA object_name |
  SEQUENCE object_name |
  SERVER object_name |
  TABLE object_name |
  TEXT SEARCH CONFIGURATION object_name |
  TEXT SEARCH DICTIONARY object_name |
  TEXT SEARCH PARSER object_name |
  TEXT SEARCH TEMPLATE object_name |
  TRANSFORM FOR type_name LANGUAGE lang_name |
  TYPE object_name |
  VIEW object_name

and aggregate_signature is:

* |
[ argmode ] [ argname ] argtype [ , ... ] |
[ [ argmode ] [ argname ] argtype [ , ... ] ] ORDER BY [ argmode ] [ argname ] argtype [ , ... ]`],["ALTER FOREIGN DATA \
WRAPPER","change the definition of a foreign-data wrapper","sql-alterforeigndatawrapper",`ALTER FOREIGN DATA WRAPPER nam\
e
    [ HANDLER handler_function | NO HANDLER ]
    [ VALIDATOR validator_function | NO VALIDATOR ]
    [ CONNECTION connection_function | NO CONNECTION ]
    [ OPTIONS ( [ ADD | SET | DROP ] option ['value'] [, ... ]) ]
ALTER FOREIGN DATA WRAPPER name OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER FOREIGN DATA WRAPPER name RENAME TO new_name`],["ALTER FOREIGN TABLE","change the definition of a foreign table","\
sql-alterforeigntable",`ALTER FOREIGN TABLE [ IF EXISTS ] [ ONLY ] name [ * ]
    action [, ... ]
ALTER FOREIGN TABLE [ IF EXISTS ] [ ONLY ] name [ * ]
    RENAME [ COLUMN ] column_name TO new_column_name
ALTER FOREIGN TABLE [ IF EXISTS ] name
    RENAME TO new_name
ALTER FOREIGN TABLE [ IF EXISTS ] name
    SET SCHEMA new_schema

where action is one of:

    ADD [ COLUMN ] [ IF NOT EXISTS ] column_name data_type [ COLLATE collation ] [ column_constraint [ ... ] ]
    DROP [ COLUMN ] [ IF EXISTS ] column_name [ RESTRICT | CASCADE ]
    ALTER [ COLUMN ] column_name [ SET DATA ] TYPE data_type [ COLLATE collation ]
    ALTER [ COLUMN ] column_name SET DEFAULT expression
    ALTER [ COLUMN ] column_name DROP DEFAULT
    ALTER [ COLUMN ] column_name { SET | DROP } NOT NULL
    ALTER [ COLUMN ] column_name SET STATISTICS integer
    ALTER [ COLUMN ] column_name SET ( attribute_option = value [, ... ] )
    ALTER [ COLUMN ] column_name RESET ( attribute_option [, ... ] )
    ALTER [ COLUMN ] column_name SET STORAGE { PLAIN | EXTERNAL | EXTENDED | MAIN | DEFAULT }
    ALTER [ COLUMN ] column_name OPTIONS ( [ ADD | SET | DROP ] option ['value'] [, ... ])
    ADD table_constraint [ NOT VALID ]
    VALIDATE CONSTRAINT constraint_name
    DROP CONSTRAINT [ IF EXISTS ]  constraint_name [ RESTRICT | CASCADE ]
    DISABLE TRIGGER [ trigger_name | ALL | USER ]
    ENABLE TRIGGER [ trigger_name | ALL | USER ]
    ENABLE REPLICA TRIGGER trigger_name
    ENABLE ALWAYS TRIGGER trigger_name
    SET WITHOUT OIDS
    INHERIT parent_table
    NO INHERIT parent_table
    OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
    OPTIONS ( [ ADD | SET | DROP ] option ['value'] [, ... ])`],["ALTER FUNCTION","change the definition of a function",
"sql-alterfunction",`ALTER FUNCTION name [ ( [ [ argmode ] [ argname ] argtype [, ...] ] ) ]
    action [ ... ] [ RESTRICT ]
ALTER FUNCTION name [ ( [ [ argmode ] [ argname ] argtype [, ...] ] ) ]
    RENAME TO new_name
ALTER FUNCTION name [ ( [ [ argmode ] [ argname ] argtype [, ...] ] ) ]
    OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER FUNCTION name [ ( [ [ argmode ] [ argname ] argtype [, ...] ] ) ]
    SET SCHEMA new_schema
ALTER FUNCTION name [ ( [ [ argmode ] [ argname ] argtype [, ...] ] ) ]
    [ NO ] DEPENDS ON EXTENSION extension_name

where action is one of:

    CALLED ON NULL INPUT | RETURNS NULL ON NULL INPUT | STRICT
    IMMUTABLE | STABLE | VOLATILE
    [ NOT ] LEAKPROOF
    [ EXTERNAL ] SECURITY INVOKER | [ EXTERNAL ] SECURITY DEFINER
    PARALLEL { UNSAFE | RESTRICTED | SAFE }
    COST execution_cost
    ROWS result_rows
    SUPPORT support_function
    SET configuration_parameter { TO | = } { value | DEFAULT }
    SET configuration_parameter FROM CURRENT
    RESET configuration_parameter
    RESET ALL`],["ALTER GROUP","change role name or membership","sql-altergroup",`ALTER GROUP role_specification ADD USE\
R user_name [, ... ]
ALTER GROUP role_specification DROP USER user_name [, ... ]

where role_specification can be:

    role_name
  | CURRENT_ROLE
  | CURRENT_USER
  | SESSION_USER

ALTER GROUP group_name RENAME TO new_name`],["ALTER INDEX","change the definition of an index","sql-alterindex",`ALTER I\
NDEX [ IF EXISTS ] name RENAME TO new_name
ALTER INDEX [ IF EXISTS ] name SET TABLESPACE tablespace_name
ALTER INDEX name ATTACH PARTITION index_name
ALTER INDEX name [ NO ] DEPENDS ON EXTENSION extension_name
ALTER INDEX [ IF EXISTS ] name SET ( storage_parameter [= value] [, ... ] )
ALTER INDEX [ IF EXISTS ] name RESET ( storage_parameter [, ... ] )
ALTER INDEX [ IF EXISTS ] name ALTER [ COLUMN ] column_number
    SET STATISTICS integer
ALTER INDEX ALL IN TABLESPACE name [ OWNED BY role_name [, ... ] ]
    SET TABLESPACE new_tablespace [ NOWAIT ]`],["ALTER LANGUAGE","change the definition of a procedural language","sql-a\
lterlanguage",`ALTER [ PROCEDURAL ] LANGUAGE name RENAME TO new_name
ALTER [ PROCEDURAL ] LANGUAGE name OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }`],["ALTER LARGE O\
BJECT","change the definition of a large object","sql-alterlargeobject","ALTER LARGE OBJECT large_object_oid OWNER TO { \
new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }"],["ALTER MATERIALIZED VIEW","change the definition of a materi\
alized view","sql-altermaterializedview",`ALTER MATERIALIZED VIEW [ IF EXISTS ] name
    action [, ... ]
ALTER MATERIALIZED VIEW name
    [ NO ] DEPENDS ON EXTENSION extension_name
ALTER MATERIALIZED VIEW [ IF EXISTS ] name
    RENAME [ COLUMN ] column_name TO new_column_name
ALTER MATERIALIZED VIEW [ IF EXISTS ] name
    RENAME TO new_name
ALTER MATERIALIZED VIEW [ IF EXISTS ] name
    SET SCHEMA new_schema
ALTER MATERIALIZED VIEW ALL IN TABLESPACE name [ OWNED BY role_name [, ... ] ]
    SET TABLESPACE new_tablespace [ NOWAIT ]

where action is one of:

    ALTER [ COLUMN ] column_name SET STATISTICS integer
    ALTER [ COLUMN ] column_name SET ( attribute_option = value [, ... ] )
    ALTER [ COLUMN ] column_name RESET ( attribute_option [, ... ] )
    ALTER [ COLUMN ] column_name SET STORAGE { PLAIN | EXTERNAL | EXTENDED | MAIN | DEFAULT }
    ALTER [ COLUMN ] column_name SET COMPRESSION compression_method
    CLUSTER ON index_name
    SET WITHOUT CLUSTER
    SET ACCESS METHOD new_access_method
    SET TABLESPACE new_tablespace
    SET ( storage_parameter [= value] [, ... ] )
    RESET ( storage_parameter [, ... ] )
    OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }`],["ALTER OPERATOR","change the definition of an\
 operator","sql-alteroperator",`ALTER OPERATOR name ( { left_type | NONE } , right_type )
    OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }

ALTER OPERATOR name ( { left_type | NONE } , right_type )
    SET SCHEMA new_schema

ALTER OPERATOR name ( { left_type | NONE } , right_type )
    SET ( {  RESTRICT = { res_proc | NONE }
           | JOIN = { join_proc | NONE }
           | COMMUTATOR = com_op
           | NEGATOR = neg_op
           | HASHES
           | MERGES
          } [, ... ] )`],["ALTER OPERATOR CLASS","change the definition of an operator class","sql-alteropclass",`ALTER \
OPERATOR CLASS name USING index_method
    RENAME TO new_name

ALTER OPERATOR CLASS name USING index_method
    OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }

ALTER OPERATOR CLASS name USING index_method
    SET SCHEMA new_schema`],["ALTER OPERATOR FAMILY","change the definition of an operator family","sql-alteropfamily",`\
ALTER OPERATOR FAMILY name USING index_method ADD
  {  OPERATOR strategy_number operator_name ( op_type, op_type )
              [ FOR SEARCH | FOR ORDER BY sort_family_name ]
   | FUNCTION support_number [ ( op_type [ , op_type ] ) ]
              function_name [ ( argument_type [, ...] ) ]
  } [, ... ]

ALTER OPERATOR FAMILY name USING index_method DROP
  {  OPERATOR strategy_number ( op_type [ , op_type ] )
   | FUNCTION support_number ( op_type [ , op_type ] )
  } [, ... ]

ALTER OPERATOR FAMILY name USING index_method
    RENAME TO new_name

ALTER OPERATOR FAMILY name USING index_method
    OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }

ALTER OPERATOR FAMILY name USING index_method
    SET SCHEMA new_schema`],["ALTER POLICY","change the definition of a row-level security policy","sql-alterpolicy",`AL\
TER POLICY name ON table_name RENAME TO new_name

ALTER POLICY name ON table_name
    [ TO { role_name | PUBLIC | CURRENT_ROLE | CURRENT_USER | SESSION_USER } [, ...] ]
    [ USING ( using_expression ) ]
    [ WITH CHECK ( check_expression ) ]`],["ALTER PROCEDURE","change the definition of a procedure","sql-alterprocedure",
`ALTER PROCEDURE name [ ( [ [ argmode ] [ argname ] argtype [, ...] ] ) ]
    action [ ... ] [ RESTRICT ]
ALTER PROCEDURE name [ ( [ [ argmode ] [ argname ] argtype [, ...] ] ) ]
    RENAME TO new_name
ALTER PROCEDURE name [ ( [ [ argmode ] [ argname ] argtype [, ...] ] ) ]
    OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER PROCEDURE name [ ( [ [ argmode ] [ argname ] argtype [, ...] ] ) ]
    SET SCHEMA new_schema
ALTER PROCEDURE name [ ( [ [ argmode ] [ argname ] argtype [, ...] ] ) ]
    [ NO ] DEPENDS ON EXTENSION extension_name

where action is one of:

    [ EXTERNAL ] SECURITY INVOKER | [ EXTERNAL ] SECURITY DEFINER
    SET configuration_parameter { TO | = } { value | DEFAULT }
    SET configuration_parameter FROM CURRENT
    RESET configuration_parameter
    RESET ALL`],["ALTER PUBLICATION","change the definition of a publication","sql-alterpublication",`ALTER PUBLICATION \
name ADD publication_object [, ...]
ALTER PUBLICATION name DROP publication_drop_object [, ...]
ALTER PUBLICATION name SET { publication_object [, ...] | publication_all_object [, ... ] }
ALTER PUBLICATION name SET ( publication_parameter [= value] [, ... ] )
ALTER PUBLICATION name OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER PUBLICATION name RENAME TO new_name

where publication_object is one of:

    TABLE table_and_columns [, ... ]
    TABLES IN SCHEMA { schema_name | CURRENT_SCHEMA } [, ... ]

and publication_all_object is one of:

    ALL TABLES [ EXCEPT ( except_table_object [, ... ] ) ]
    ALL SEQUENCES

and publication_drop_object is one of:

    TABLE table_object [, ... ]
    TABLES IN SCHEMA { schema_name | CURRENT_SCHEMA } [, ... ]

and table_and_columns is:

    table_object [ ( column_name [, ... ] ) ] [ WHERE ( expression ) ]

and except_table_object is:

    TABLE table_object [, ... ]

and table_object is:

   [ ONLY ] table_name [ * ]`],["ALTER ROLE","change a database role","sql-alterrole",`ALTER ROLE role_specification [ W\
ITH ] option [ ... ]

where option can be:

      SUPERUSER | NOSUPERUSER
    | CREATEDB | NOCREATEDB
    | CREATEROLE | NOCREATEROLE
    | INHERIT | NOINHERIT
    | LOGIN | NOLOGIN
    | REPLICATION | NOREPLICATION
    | BYPASSRLS | NOBYPASSRLS
    | CONNECTION LIMIT connlimit
    | [ ENCRYPTED ] PASSWORD 'password' | PASSWORD NULL
    | VALID UNTIL 'timestamp'

ALTER ROLE name RENAME TO new_name

ALTER ROLE { role_specification | ALL } [ IN DATABASE database_name ] SET configuration_parameter { TO | = } { value | D\
EFAULT }
ALTER ROLE { role_specification | ALL } [ IN DATABASE database_name ] SET configuration_parameter FROM CURRENT
ALTER ROLE { role_specification | ALL } [ IN DATABASE database_name ] RESET configuration_parameter
ALTER ROLE { role_specification | ALL } [ IN DATABASE database_name ] RESET ALL

where role_specification can be:

    role_name
  | CURRENT_ROLE
  | CURRENT_USER
  | SESSION_USER`],["ALTER ROUTINE","change the definition of a routine","sql-alterroutine",`ALTER ROUTINE name [ ( [ [ \
argmode ] [ argname ] argtype [, ...] ] ) ]
    action [ ... ] [ RESTRICT ]
ALTER ROUTINE name [ ( [ [ argmode ] [ argname ] argtype [, ...] ] ) ]
    RENAME TO new_name
ALTER ROUTINE name [ ( [ [ argmode ] [ argname ] argtype [, ...] ] ) ]
    OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER ROUTINE name [ ( [ [ argmode ] [ argname ] argtype [, ...] ] ) ]
    SET SCHEMA new_schema
ALTER ROUTINE name [ ( [ [ argmode ] [ argname ] argtype [, ...] ] ) ]
    [ NO ] DEPENDS ON EXTENSION extension_name

where action is one of:

    IMMUTABLE | STABLE | VOLATILE
    [ NOT ] LEAKPROOF
    [ EXTERNAL ] SECURITY INVOKER | [ EXTERNAL ] SECURITY DEFINER
    PARALLEL { UNSAFE | RESTRICTED | SAFE }
    COST execution_cost
    ROWS result_rows
    SET configuration_parameter { TO | = } { value | DEFAULT }
    SET configuration_parameter FROM CURRENT
    RESET configuration_parameter
    RESET ALL`],["ALTER RULE","change the definition of a rule","sql-alterrule","ALTER RULE name ON table_name RENAME TO\
 new_name"],["ALTER SCHEMA","change the definition of a schema","sql-alterschema",`ALTER SCHEMA name RENAME TO new_name
ALTER SCHEMA name OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }`],["ALTER SEQUENCE","change the de\
finition of a sequence generator","sql-altersequence",`ALTER SEQUENCE [ IF EXISTS ] name
    [ AS data_type ]
    [ INCREMENT [ BY ] increment ]
    [ MINVALUE minvalue | NO MINVALUE ] [ MAXVALUE maxvalue | NO MAXVALUE ]
    [ [ NO ] CYCLE ]
    [ START [ WITH ] start ]
    [ RESTART [ [ WITH ] restart ] ]
    [ CACHE cache ]
    [ OWNED BY { table_name.column_name | NONE } ]
ALTER SEQUENCE [ IF EXISTS ] name SET { LOGGED | UNLOGGED }
ALTER SEQUENCE [ IF EXISTS ] name OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER SEQUENCE [ IF EXISTS ] name RENAME TO new_name
ALTER SEQUENCE [ IF EXISTS ] name SET SCHEMA new_schema`],["ALTER SERVER","change the definition of a foreign server","s\
ql-alterserver",`ALTER SERVER name [ VERSION 'new_version' ]
    [ OPTIONS ( [ ADD | SET | DROP ] option ['value'] [, ... ] ) ]
ALTER SERVER name OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER SERVER name RENAME TO new_name`],["ALTER STATISTICS","change the definition of an extended statistics object","sql\
-alterstatistics",`ALTER STATISTICS name OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER STATISTICS name RENAME TO new_name
ALTER STATISTICS name SET SCHEMA new_schema
ALTER STATISTICS name SET STATISTICS { new_target | DEFAULT }`],["ALTER SUBSCRIPTION","change the definition of a subscr\
iption","sql-altersubscription",`ALTER SUBSCRIPTION name SERVER server_name
ALTER SUBSCRIPTION name CONNECTION 'conninfo'
ALTER SUBSCRIPTION name SET PUBLICATION publication_name [, ...] [ WITH ( publication_option [= value] [, ... ] ) ]
ALTER SUBSCRIPTION name ADD PUBLICATION publication_name [, ...] [ WITH ( publication_option [= value] [, ... ] ) ]
ALTER SUBSCRIPTION name DROP PUBLICATION publication_name [, ...] [ WITH ( publication_option [= value] [, ... ] ) ]
ALTER SUBSCRIPTION name REFRESH PUBLICATION [ WITH ( refresh_option [= value] [, ... ] ) ]
ALTER SUBSCRIPTION name REFRESH SEQUENCES
ALTER SUBSCRIPTION name ENABLE
ALTER SUBSCRIPTION name DISABLE
ALTER SUBSCRIPTION name SET ( subscription_parameter [= value] [, ... ] )
ALTER SUBSCRIPTION name SKIP ( skip_option = value )
ALTER SUBSCRIPTION name OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER SUBSCRIPTION name RENAME TO new_name`],["ALTER SYSTEM","change a server configuration parameter","sql-altersystem",
`ALTER SYSTEM SET configuration_parameter { TO | = } { value [, ...] | DEFAULT }

ALTER SYSTEM RESET configuration_parameter
ALTER SYSTEM RESET ALL`],["ALTER TABLE","change the definition of a table","sql-altertable",`ALTER TABLE [ IF EXISTS ] [\
 ONLY ] name [ * ]
    action [, ... ]
ALTER TABLE [ IF EXISTS ] [ ONLY ] name [ * ]
    RENAME [ COLUMN ] column_name TO new_column_name
ALTER TABLE [ IF EXISTS ] [ ONLY ] name [ * ]
    RENAME CONSTRAINT constraint_name TO new_constraint_name
ALTER TABLE [ IF EXISTS ] name
    RENAME TO new_name
ALTER TABLE [ IF EXISTS ] name
    SET SCHEMA new_schema
ALTER TABLE ALL IN TABLESPACE name [ OWNED BY role_name [, ... ] ]
    SET TABLESPACE new_tablespace [ NOWAIT ]
ALTER TABLE [ IF EXISTS ] name
    ATTACH PARTITION partition_name { FOR VALUES partition_bound_spec | DEFAULT }
ALTER TABLE [ IF EXISTS ] name
    DETACH PARTITION partition_name [ CONCURRENTLY | FINALIZE ]

where action is one of:

    ADD [ COLUMN ] [ IF NOT EXISTS ] column_name data_type [ COLLATE collation ] [ column_constraint [ ... ] ]
    DROP [ COLUMN ] [ IF EXISTS ] column_name [ RESTRICT | CASCADE ]
    ALTER [ COLUMN ] column_name [ SET DATA ] TYPE data_type [ COLLATE collation ] [ USING expression ]
    ALTER [ COLUMN ] column_name SET DEFAULT expression
    ALTER [ COLUMN ] column_name DROP DEFAULT
    ALTER [ COLUMN ] column_name { SET | DROP } NOT NULL
    ALTER [ COLUMN ] column_name SET EXPRESSION AS ( expression )
    ALTER [ COLUMN ] column_name DROP EXPRESSION [ IF EXISTS ]
    ALTER [ COLUMN ] column_name ADD GENERATED { ALWAYS | BY DEFAULT } AS IDENTITY [ ( sequence_options ) ]
    ALTER [ COLUMN ] column_name { SET GENERATED { ALWAYS | BY DEFAULT } | SET sequence_option | RESTART [ [ WITH ] rest\
art ] } [...]
    ALTER [ COLUMN ] column_name DROP IDENTITY [ IF EXISTS ]
    ALTER [ COLUMN ] column_name SET STATISTICS { integer | DEFAULT }
    ALTER [ COLUMN ] column_name SET ( attribute_option = value [, ... ] )
    ALTER [ COLUMN ] column_name RESET ( attribute_option [, ... ] )
    ALTER [ COLUMN ] column_name SET STORAGE { PLAIN | EXTERNAL | EXTENDED | MAIN | DEFAULT }
    ALTER [ COLUMN ] column_name SET COMPRESSION compression_method
    ADD table_constraint [ NOT VALID ]
    ADD table_constraint_using_index
    ALTER CONSTRAINT constraint_name [ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ] [ ENFO\
RCED | NOT ENFORCED ]
    ALTER CONSTRAINT constraint_name [ INHERIT | NO INHERIT ]
    VALIDATE CONSTRAINT constraint_name
    DROP CONSTRAINT [ IF EXISTS ]  constraint_name [ RESTRICT | CASCADE ]
    DISABLE TRIGGER [ trigger_name | ALL | USER ]
    ENABLE TRIGGER [ trigger_name | ALL | USER ]
    ENABLE REPLICA TRIGGER trigger_name
    ENABLE ALWAYS TRIGGER trigger_name
    DISABLE RULE rewrite_rule_name
    ENABLE RULE rewrite_rule_name
    ENABLE REPLICA RULE rewrite_rule_name
    ENABLE ALWAYS RULE rewrite_rule_name
    DISABLE ROW LEVEL SECURITY
    ENABLE ROW LEVEL SECURITY
    FORCE ROW LEVEL SECURITY
    NO FORCE ROW LEVEL SECURITY
    CLUSTER ON index_name
    SET WITHOUT CLUSTER
    SET WITHOUT OIDS
    SET ACCESS METHOD { new_access_method | DEFAULT }
    SET TABLESPACE new_tablespace
    SET { LOGGED | UNLOGGED }
    SET ( storage_parameter [= value] [, ... ] )
    RESET ( storage_parameter [, ... ] )
    INHERIT parent_table
    NO INHERIT parent_table
    OF type_name
    NOT OF
    OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
    REPLICA IDENTITY { DEFAULT | USING INDEX index_name | FULL | NOTHING }

and partition_bound_spec is:

IN ( partition_bound_expr [, ...] ) |
FROM ( { partition_bound_expr | MINVALUE | MAXVALUE } [, ...] )
  TO ( { partition_bound_expr | MINVALUE | MAXVALUE } [, ...] ) |
WITH ( MODULUS numeric_literal, REMAINDER numeric_literal )

and column_constraint is:

[ CONSTRAINT constraint_name ]
{ NOT NULL [ NO INHERIT ] |
  NULL |
  CHECK ( expression ) [ NO INHERIT ] |
  DEFAULT default_expr |
  GENERATED ALWAYS AS ( generation_expr ) [ STORED | VIRTUAL ] |
  GENERATED { ALWAYS | BY DEFAULT } AS IDENTITY [ ( sequence_options ) ] |
  UNIQUE [ NULLS [ NOT ] DISTINCT ] index_parameters |
  PRIMARY KEY index_parameters |
  REFERENCES reftable [ ( refcolumn ) ] [ MATCH FULL | MATCH PARTIAL | MATCH SIMPLE ]
    [ ON DELETE referential_action ] [ ON UPDATE referential_action ] }
[ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ] [ ENFORCED | NOT ENFORCED ]

and table_constraint is:

[ CONSTRAINT constraint_name ]
{ CHECK ( expression ) [ NO INHERIT ] |
  NOT NULL column_name [ NO INHERIT ] |
  UNIQUE [ NULLS [ NOT ] DISTINCT ] ( column_name [, ... ] [, column_name WITHOUT OVERLAPS ] ) index_parameters |
  PRIMARY KEY ( column_name [, ... ] [, column_name WITHOUT OVERLAPS ] ) index_parameters |
  EXCLUDE [ USING index_method ] ( exclude_element WITH operator [, ... ] ) index_parameters [ WHERE ( predicate ) ] |
  FOREIGN KEY ( column_name [, ... ] [, PERIOD column_name ] ) REFERENCES reftable [ ( refcolumn [, ... ]  [, PERIOD ref\
column ] ) ]
    [ MATCH FULL | MATCH PARTIAL | MATCH SIMPLE ] [ ON DELETE referential_action ] [ ON UPDATE referential_action ] }
[ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ] [ ENFORCED | NOT ENFORCED ]

and table_constraint_using_index is:

    [ CONSTRAINT constraint_name ]
    { UNIQUE | PRIMARY KEY } USING INDEX index_name
    [ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ]

index_parameters in UNIQUE, PRIMARY KEY, and EXCLUDE constraints are:

[ INCLUDE ( column_name [, ... ] ) ]
[ WITH ( storage_parameter [= value] [, ... ] ) ]
[ USING INDEX TABLESPACE tablespace_name ]

exclude_element in an EXCLUDE constraint is:

{ column_name | ( expression ) } [ COLLATE collation ] [ opclass [ ( opclass_parameter = value [, ... ] ) ] ] [ ASC | DE\
SC ] [ NULLS { FIRST | LAST } ]

referential_action in a FOREIGN KEY/REFERENCES constraint is:

{ NO ACTION | RESTRICT | CASCADE | SET NULL [ ( column_name [, ... ] ) ] | SET DEFAULT [ ( column_name [, ... ] ) ] }`],
["ALTER TABLESPACE","change the definition of a tablespace","sql-altertablespace",`ALTER TABLESPACE name RENAME TO new_n\
ame
ALTER TABLESPACE name OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER TABLESPACE name SET ( tablespace_option = value [, ... ] )
ALTER TABLESPACE name RESET ( tablespace_option [, ... ] )`],["ALTER TEXT SEARCH CONFIGURATION","change the definition o\
f a text search configuration","sql-altertsconfig",`ALTER TEXT SEARCH CONFIGURATION name
    ADD MAPPING FOR token_type [, ... ] WITH dictionary_name [, ... ]
ALTER TEXT SEARCH CONFIGURATION name
    ALTER MAPPING FOR token_type [, ... ] WITH dictionary_name [, ... ]
ALTER TEXT SEARCH CONFIGURATION name
    ALTER MAPPING REPLACE old_dictionary WITH new_dictionary
ALTER TEXT SEARCH CONFIGURATION name
    ALTER MAPPING FOR token_type [, ... ] REPLACE old_dictionary WITH new_dictionary
ALTER TEXT SEARCH CONFIGURATION name
    DROP MAPPING [ IF EXISTS ] FOR token_type [, ... ]
ALTER TEXT SEARCH CONFIGURATION name RENAME TO new_name
ALTER TEXT SEARCH CONFIGURATION name OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER TEXT SEARCH CONFIGURATION name SET SCHEMA new_schema`],["ALTER TEXT SEARCH DICTIONARY","change the definition of a\
 text search dictionary","sql-altertsdictionary",`ALTER TEXT SEARCH DICTIONARY name (
    option [ = value ] [, ... ]
)
ALTER TEXT SEARCH DICTIONARY name RENAME TO new_name
ALTER TEXT SEARCH DICTIONARY name OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER TEXT SEARCH DICTIONARY name SET SCHEMA new_schema`],["ALTER TEXT SEARCH PARSER","change the definition of a text s\
earch parser","sql-altertsparser",`ALTER TEXT SEARCH PARSER name RENAME TO new_name
ALTER TEXT SEARCH PARSER name SET SCHEMA new_schema`],["ALTER TEXT SEARCH TEMPLATE","change the definition of a text sea\
rch template","sql-altertstemplate",`ALTER TEXT SEARCH TEMPLATE name RENAME TO new_name
ALTER TEXT SEARCH TEMPLATE name SET SCHEMA new_schema`],["ALTER TRIGGER","change the definition of a trigger","sql-alter\
trigger",`ALTER TRIGGER name ON table_name RENAME TO new_name
ALTER TRIGGER name ON table_name [ NO ] DEPENDS ON EXTENSION extension_name`],["ALTER TYPE","change the definition of a \
type","sql-altertype",`ALTER TYPE name OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER TYPE name RENAME TO new_name
ALTER TYPE name SET SCHEMA new_schema
ALTER TYPE name RENAME ATTRIBUTE attribute_name TO new_attribute_name [ CASCADE | RESTRICT ]
ALTER TYPE name action [, ... ]
ALTER TYPE name ADD VALUE [ IF NOT EXISTS ] new_enum_value [ { BEFORE | AFTER } neighbor_enum_value ]
ALTER TYPE name RENAME VALUE existing_enum_value TO new_enum_value
ALTER TYPE name SET ( property = value [, ... ] )

where action is one of:

    ADD ATTRIBUTE attribute_name data_type [ COLLATE collation ] [ CASCADE | RESTRICT ]
    DROP ATTRIBUTE [ IF EXISTS ] attribute_name [ CASCADE | RESTRICT ]
    ALTER ATTRIBUTE attribute_name [ SET DATA ] TYPE data_type [ COLLATE collation ] [ CASCADE | RESTRICT ]`],["ALTER US\
ER","change a database role","sql-alteruser",`ALTER USER role_specification [ WITH ] option [ ... ]

where option can be:

      SUPERUSER | NOSUPERUSER
    | CREATEDB | NOCREATEDB
    | CREATEROLE | NOCREATEROLE
    | INHERIT | NOINHERIT
    | LOGIN | NOLOGIN
    | REPLICATION | NOREPLICATION
    | BYPASSRLS | NOBYPASSRLS
    | CONNECTION LIMIT connlimit
    | [ ENCRYPTED ] PASSWORD 'password' | PASSWORD NULL
    | VALID UNTIL 'timestamp'

ALTER USER name RENAME TO new_name

ALTER USER { role_specification | ALL } [ IN DATABASE database_name ] SET configuration_parameter { TO | = } { value | D\
EFAULT }
ALTER USER { role_specification | ALL } [ IN DATABASE database_name ] SET configuration_parameter FROM CURRENT
ALTER USER { role_specification | ALL } [ IN DATABASE database_name ] RESET configuration_parameter
ALTER USER { role_specification | ALL } [ IN DATABASE database_name ] RESET ALL

where role_specification can be:

    role_name
  | CURRENT_ROLE
  | CURRENT_USER
  | SESSION_USER`],["ALTER USER MAPPING","change the definition of a user mapping","sql-alterusermapping",`ALTER USER MA\
PPING FOR { user_name | USER | CURRENT_ROLE | CURRENT_USER | SESSION_USER | PUBLIC }
    SERVER server_name
    OPTIONS ( [ ADD | SET | DROP ] option ['value'] [, ... ] )`],["ALTER VIEW","change the definition of a view","sql-al\
terview",`ALTER VIEW [ IF EXISTS ] name ALTER [ COLUMN ] column_name SET DEFAULT expression
ALTER VIEW [ IF EXISTS ] name ALTER [ COLUMN ] column_name DROP DEFAULT
ALTER VIEW [ IF EXISTS ] name OWNER TO { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER }
ALTER VIEW [ IF EXISTS ] name RENAME [ COLUMN ] column_name TO new_column_name
ALTER VIEW [ IF EXISTS ] name RENAME TO new_name
ALTER VIEW [ IF EXISTS ] name SET SCHEMA new_schema
ALTER VIEW [ IF EXISTS ] name SET ( view_option_name [= view_option_value] [, ... ] )
ALTER VIEW [ IF EXISTS ] name RESET ( view_option_name [, ... ] )`],["ANALYZE","collect statistics about a database","sq\
l-analyze",`ANALYZE [ ( option [, ...] ) ] [ table_and_columns [, ...] ]

where option can be one of:

    VERBOSE [ boolean ]
    SKIP_LOCKED [ boolean ]
    BUFFER_USAGE_LIMIT size

and table_and_columns is:

    [ ONLY ] table_name [ * ] [ ( column_name [, ...] ) ]`],["BEGIN","start a transaction block","sql-begin",`BEGIN [ WO\
RK | TRANSACTION ] [ transaction_mode [, ...] ]

where transaction_mode is one of:

    ISOLATION LEVEL { SERIALIZABLE | REPEATABLE READ | READ COMMITTED | READ UNCOMMITTED }
    READ WRITE | READ ONLY
    [ NOT ] DEFERRABLE`],["CALL","invoke a procedure","sql-call","CALL name ( [ argument ] [, ...] )"],["CHECKPOINT","fo\
rce a write-ahead log checkpoint","sql-checkpoint",`CHECKPOINT [ ( option [, ...] ) ]

where option can be one of:

    FLUSH_UNLOGGED [ boolean ]
    MODE { FAST | SPREAD }`],["CLOSE","close a cursor","sql-close","CLOSE { name | ALL }"],["CLUSTER","cluster a table a\
ccording to an index","sql-cluster",`CLUSTER [ ( option [, ...] ) ] [ table_name [ USING index_name ] ]

where option can be one of:

    VERBOSE [ boolean ]`],["COMMENT","define or change the comment of an object","sql-comment",`COMMENT ON
{
  ACCESS METHOD object_name |
  AGGREGATE aggregate_name ( aggregate_signature ) |
  CAST (source_type AS target_type) |
  COLLATION object_name |
  COLUMN relation_name.column_name |
  CONSTRAINT constraint_name ON table_name |
  CONSTRAINT constraint_name ON DOMAIN domain_name |
  CONVERSION object_name |
  DATABASE object_name |
  DOMAIN object_name |
  EXTENSION object_name |
  EVENT TRIGGER object_name |
  FOREIGN DATA WRAPPER object_name |
  FOREIGN TABLE object_name |
  FUNCTION function_name [ ( [ [ argmode ] [ argname ] argtype [, ...] ] ) ] |
  INDEX object_name |
  LARGE OBJECT large_object_oid |
  MATERIALIZED VIEW object_name |
  OPERATOR operator_name (left_type, right_type) |
  OPERATOR CLASS object_name USING index_method |
  OPERATOR FAMILY object_name USING index_method |
  POLICY policy_name ON table_name |
  [ PROCEDURAL ] LANGUAGE object_name |
  PROCEDURE procedure_name [ ( [ [ argmode ] [ argname ] argtype [, ...] ] ) ] |
  PUBLICATION object_name |
  ROLE object_name |
  ROUTINE routine_name [ ( [ [ argmode ] [ argname ] argtype [, ...] ] ) ] |
  RULE rule_name ON table_name |
  SCHEMA object_name |
  SEQUENCE object_name |
  SERVER object_name |
  STATISTICS object_name |
  SUBSCRIPTION object_name |
  TABLE object_name |
  TABLESPACE object_name |
  TEXT SEARCH CONFIGURATION object_name |
  TEXT SEARCH DICTIONARY object_name |
  TEXT SEARCH PARSER object_name |
  TEXT SEARCH TEMPLATE object_name |
  TRANSFORM FOR type_name LANGUAGE lang_name |
  TRIGGER trigger_name ON table_name |
  TYPE object_name |
  VIEW object_name
} IS { string_literal | NULL }

where aggregate_signature is:

* |
[ argmode ] [ argname ] argtype [ , ... ] |
[ [ argmode ] [ argname ] argtype [ , ... ] ] ORDER BY [ argmode ] [ argname ] argtype [ , ... ]`],["COMMIT","commit the\
 current transaction","sql-commit","COMMIT [ WORK | TRANSACTION ] [ AND [ NO ] CHAIN ]"],["COMMIT PREPARED","commit a tr\
ansaction that was earlier prepared for two-phase commit","sql-commit-prepared","COMMIT PREPARED transaction_id"],["COPY",
"copy data between a file and a table","sql-copy",`COPY table_name [ ( column_name [, ...] ) ]
    FROM { 'filename' | PROGRAM 'command' | STDIN }
    [ [ WITH ] ( option [, ...] ) ]
    [ WHERE condition ]

COPY { table_name [ ( column_name [, ...] ) ] | ( query ) }
    TO { 'filename' | PROGRAM 'command' | STDOUT }
    [ [ WITH ] ( option [, ...] ) ]

where option can be one of:

    FORMAT format_name
    FREEZE [ boolean ]
    DELIMITER 'delimiter_character'
    NULL 'null_string'
    DEFAULT 'default_string'
    HEADER [ boolean | integer | MATCH ]
    QUOTE 'quote_character'
    ESCAPE 'escape_character'
    FORCE_ARRAY [ boolean ]
    FORCE_QUOTE { ( column_name [, ...] ) | * }
    FORCE_NOT_NULL { ( column_name [, ...] ) | * }
    FORCE_NULL { ( column_name [, ...] ) | * }
    ON_ERROR error_action
    REJECT_LIMIT maxerror
    ENCODING 'encoding_name'
    LOG_VERBOSITY verbosity`],["CREATE ACCESS METHOD","define a new access method","sql-create-access-method",`CREATE AC\
CESS METHOD name
    TYPE access_method_type
    HANDLER handler_function`],["CREATE AGGREGATE","define a new aggregate function","sql-createaggregate",`CREATE [ OR \
REPLACE ] AGGREGATE name ( [ argmode ] [ argname ] arg_data_type [ , ... ] ) (
    SFUNC = sfunc,
    STYPE = state_data_type
    [ , SSPACE = state_data_size ]
    [ , FINALFUNC = ffunc ]
    [ , FINALFUNC_EXTRA ]
    [ , FINALFUNC_MODIFY = { READ_ONLY | SHAREABLE | READ_WRITE } ]
    [ , COMBINEFUNC = combinefunc ]
    [ , SERIALFUNC = serialfunc ]
    [ , DESERIALFUNC = deserialfunc ]
    [ , INITCOND = initial_condition ]
    [ , MSFUNC = msfunc ]
    [ , MINVFUNC = minvfunc ]
    [ , MSTYPE = mstate_data_type ]
    [ , MSSPACE = mstate_data_size ]
    [ , MFINALFUNC = mffunc ]
    [ , MFINALFUNC_EXTRA ]
    [ , MFINALFUNC_MODIFY = { READ_ONLY | SHAREABLE | READ_WRITE } ]
    [ , MINITCOND = minitial_condition ]
    [ , SORTOP = sort_operator ]
    [ , SUPPORT = support_function ]
    [ , PARALLEL = { SAFE | RESTRICTED | UNSAFE } ]
)

CREATE [ OR REPLACE ] AGGREGATE name ( [ [ argmode ] [ argname ] arg_data_type [ , ... ] ]
                        ORDER BY [ argmode ] [ argname ] arg_data_type [ , ... ] ) (
    SFUNC = sfunc,
    STYPE = state_data_type
    [ , SSPACE = state_data_size ]
    [ , FINALFUNC = ffunc ]
    [ , FINALFUNC_EXTRA ]
    [ , FINALFUNC_MODIFY = { READ_ONLY | SHAREABLE | READ_WRITE } ]
    [ , INITCOND = initial_condition ]
    [ , SUPPORT = support_function ]
    [ , PARALLEL = { SAFE | RESTRICTED | UNSAFE } ]
    [ , HYPOTHETICAL ]
)

or the old syntax

CREATE [ OR REPLACE ] AGGREGATE name (
    BASETYPE = base_type,
    SFUNC = sfunc,
    STYPE = state_data_type
    [ , SSPACE = state_data_size ]
    [ , FINALFUNC = ffunc ]
    [ , FINALFUNC_EXTRA ]
    [ , FINALFUNC_MODIFY = { READ_ONLY | SHAREABLE | READ_WRITE } ]
    [ , COMBINEFUNC = combinefunc ]
    [ , SERIALFUNC = serialfunc ]
    [ , DESERIALFUNC = deserialfunc ]
    [ , INITCOND = initial_condition ]
    [ , MSFUNC = msfunc ]
    [ , MINVFUNC = minvfunc ]
    [ , MSTYPE = mstate_data_type ]
    [ , MSSPACE = mstate_data_size ]
    [ , MFINALFUNC = mffunc ]
    [ , MFINALFUNC_EXTRA ]
    [ , MFINALFUNC_MODIFY = { READ_ONLY | SHAREABLE | READ_WRITE } ]
    [ , MINITCOND = minitial_condition ]
    [ , SORTOP = sort_operator ]
    [ , SUPPORT = support_function ]
)`],["CREATE CAST","define a new cast","sql-createcast",`CREATE CAST (source_type AS target_type)
    WITH FUNCTION function_name [ (argument_type [, ...]) ]
    [ AS ASSIGNMENT | AS IMPLICIT ]

CREATE CAST (source_type AS target_type)
    WITHOUT FUNCTION
    [ AS ASSIGNMENT | AS IMPLICIT ]

CREATE CAST (source_type AS target_type)
    WITH INOUT
    [ AS ASSIGNMENT | AS IMPLICIT ]`],["CREATE COLLATION","define a new collation","sql-createcollation",`CREATE COLLATI\
ON [ IF NOT EXISTS ] name (
    [ LOCALE = locale, ]
    [ LC_COLLATE = lc_collate, ]
    [ LC_CTYPE = lc_ctype, ]
    [ PROVIDER = provider, ]
    [ DETERMINISTIC = boolean, ]
    [ RULES = rules, ]
    [ VERSION = version ]
)
CREATE COLLATION [ IF NOT EXISTS ] name FROM existing_collation`],["CREATE CONVERSION","define a new encoding conversion",
"sql-createconversion",`CREATE [ DEFAULT ] CONVERSION name
    FOR source_encoding TO dest_encoding FROM function_name`],["CREATE DATABASE","create a new database","sql-createdata\
base",`CREATE DATABASE name
    [ WITH ] [ OWNER [=] user_name ]
           [ TEMPLATE [=] template ]
           [ ENCODING [=] encoding ]
           [ STRATEGY [=] strategy ]
           [ LOCALE [=] locale ]
           [ LC_COLLATE [=] lc_collate ]
           [ LC_CTYPE [=] lc_ctype ]
           [ BUILTIN_LOCALE [=] builtin_locale ]
           [ ICU_LOCALE [=] icu_locale ]
           [ ICU_RULES [=] icu_rules ]
           [ LOCALE_PROVIDER [=] locale_provider ]
           [ COLLATION_VERSION = collation_version ]
           [ TABLESPACE [=] tablespace_name ]
           [ ALLOW_CONNECTIONS [=] allowconn ]
           [ CONNECTION LIMIT [=] connlimit ]
           [ IS_TEMPLATE [=] istemplate ]
           [ OID [=] oid ]`],["CREATE DOMAIN","define a new domain","sql-createdomain",`CREATE DOMAIN name [ AS ] data_t\
ype
    [ COLLATE collation ]
    [ DEFAULT expression ]
    [ domain_constraint [ ... ] ]

where domain_constraint is:

[ CONSTRAINT constraint_name ]
{ NOT NULL | NULL | CHECK (expression) }`],["CREATE EVENT TRIGGER","define a new event trigger","sql-createeventtrigger",
`CREATE EVENT TRIGGER name
    ON event
    [ WHEN filter_variable IN (filter_value [, ... ]) [ AND ... ] ]
    EXECUTE { FUNCTION | PROCEDURE } function_name()`],["CREATE EXTENSION","install an extension","sql-createextension",
`CREATE EXTENSION [ IF NOT EXISTS ] extension_name
    [ WITH ] [ SCHEMA schema_name ]
             [ VERSION version ]
             [ CASCADE ]`],["CREATE FOREIGN DATA WRAPPER","define a new foreign-data wrapper","sql-createforeigndatawrap\
per",`CREATE FOREIGN DATA WRAPPER name
    [ HANDLER handler_function | NO HANDLER ]
    [ VALIDATOR validator_function | NO VALIDATOR ]
    [ CONNECTION connection_function | NO CONNECTION ]
    [ OPTIONS ( option 'value' [, ... ] ) ]`],["CREATE FOREIGN TABLE","define a new foreign table","sql-createforeigntab\
le",`CREATE FOREIGN TABLE [ IF NOT EXISTS ] table_name ( [
  { column_name data_type [ OPTIONS ( option 'value' [, ... ] ) ] [ COLLATE collation ] [ column_constraint [ ... ] ]
    | table_constraint
    | LIKE source_table [ like_option ... ] }
    [, ... ]
] )
[ INHERITS ( parent_table [, ... ] ) ]
  SERVER server_name
[ OPTIONS ( option 'value' [, ... ] ) ]

CREATE FOREIGN TABLE [ IF NOT EXISTS ] table_name
  PARTITION OF parent_table [ (
  { column_name [ WITH OPTIONS ] [ column_constraint [ ... ] ]
    | table_constraint }
    [, ... ]
) ]
{ FOR VALUES partition_bound_spec | DEFAULT }
  SERVER server_name
[ OPTIONS ( option 'value' [, ... ] ) ]

where column_constraint is:

[ CONSTRAINT constraint_name ]
{ NOT NULL [ NO INHERIT ] |
  NULL |
  CHECK ( expression ) [ NO INHERIT ] |
  DEFAULT default_expr |
  GENERATED ALWAYS AS ( generation_expr ) [ STORED | VIRTUAL ] }
[ ENFORCED | NOT ENFORCED ]

and table_constraint is:

[ CONSTRAINT constraint_name ]
{  NOT NULL column_name [ NO INHERIT ] |
   CHECK ( expression ) [ NO INHERIT ] }
[ ENFORCED | NOT ENFORCED ]

and like_option is:

{ INCLUDING | EXCLUDING } { COMMENTS | CONSTRAINTS | DEFAULTS | GENERATED | STATISTICS | ALL }

and partition_bound_spec is:

IN ( partition_bound_expr [, ...] ) |
FROM ( { partition_bound_expr | MINVALUE | MAXVALUE } [, ...] )
  TO ( { partition_bound_expr | MINVALUE | MAXVALUE } [, ...] ) |
WITH ( MODULUS numeric_literal, REMAINDER numeric_literal )`],["CREATE FUNCTION","define a new function","sql-createfunc\
tion",`CREATE [ OR REPLACE ] FUNCTION
    name ( [ [ argmode ] [ argname ] argtype [ { DEFAULT | = } default_expr ] [, ...] ] )
    [ RETURNS rettype
      | RETURNS TABLE ( column_name column_type [, ...] ) ]
  { LANGUAGE lang_name
    | TRANSFORM { FOR TYPE type_name } [, ... ]
    | WINDOW
    | { IMMUTABLE | STABLE | VOLATILE }
    | [ NOT ] LEAKPROOF
    | { CALLED ON NULL INPUT | RETURNS NULL ON NULL INPUT | STRICT }
    | { [ EXTERNAL ] SECURITY INVOKER | [ EXTERNAL ] SECURITY DEFINER }
    | PARALLEL { UNSAFE | RESTRICTED | SAFE }
    | COST execution_cost
    | ROWS result_rows
    | SUPPORT support_function
    | SET configuration_parameter { TO value | = value | FROM CURRENT }
    | AS 'definition'
    | AS 'obj_file', 'link_symbol'
    | sql_body
  } ...`],["CREATE GROUP","define a new database role","sql-creategroup",`CREATE GROUP name [ [ WITH ] option [ ... ] ]

where option can be:

      SUPERUSER | NOSUPERUSER
    | CREATEDB | NOCREATEDB
    | CREATEROLE | NOCREATEROLE
    | INHERIT | NOINHERIT
    | LOGIN | NOLOGIN
    | REPLICATION | NOREPLICATION
    | BYPASSRLS | NOBYPASSRLS
    | CONNECTION LIMIT connlimit
    | [ ENCRYPTED ] PASSWORD 'password' | PASSWORD NULL
    | VALID UNTIL 'timestamp'
    | IN ROLE role_name [, ...]
    | ROLE role_name [, ...]
    | ADMIN role_name [, ...]
    | SYSID uid`],["CREATE INDEX","define a new index","sql-createindex",`CREATE [ UNIQUE ] INDEX [ CONCURRENTLY ] [ [ I\
F NOT EXISTS ] name ] ON [ ONLY ] table_name [ USING method ]
    ( { column_name | ( expression ) } [ COLLATE collation ] [ opclass [ ( opclass_parameter = value [, ... ] ) ] ] [ AS\
C | DESC ] [ NULLS { FIRST | LAST } ] [, ...] )
    [ INCLUDE ( column_name [, ...] ) ]
    [ NULLS [ NOT ] DISTINCT ]
    [ WITH ( storage_parameter [= value] [, ... ] ) ]
    [ TABLESPACE tablespace_name ]
    [ WHERE predicate ]`],["CREATE LANGUAGE","define a new procedural language","sql-createlanguage",`CREATE [ OR REPLAC\
E ] [ TRUSTED ] [ PROCEDURAL ] LANGUAGE name
    HANDLER call_handler [ INLINE inline_handler ] [ VALIDATOR valfunction ]
CREATE [ OR REPLACE ] [ TRUSTED ] [ PROCEDURAL ] LANGUAGE name`],["CREATE MATERIALIZED VIEW","define a new materialized \
view","sql-creatematerializedview",`CREATE MATERIALIZED VIEW [ IF NOT EXISTS ] table_name
    [ (column_name [, ...] ) ]
    [ USING method ]
    [ WITH ( storage_parameter [= value] [, ... ] ) ]
    [ TABLESPACE tablespace_name ]
    AS query
    [ WITH [ NO ] DATA ]`],["CREATE OPERATOR","define a new operator","sql-createoperator",`CREATE OPERATOR name (
    {FUNCTION|PROCEDURE} = function_name
    [, LEFTARG = left_type ] , RIGHTARG = right_type
    [, COMMUTATOR = com_op ] [, NEGATOR = neg_op ]
    [, RESTRICT = res_proc ] [, JOIN = join_proc ]
    [, HASHES ] [, MERGES ]
)`],["CREATE OPERATOR CLASS","define a new operator class","sql-createopclass",`CREATE OPERATOR CLASS name [ DEFAULT ] F\
OR TYPE data_type
  USING index_method [ FAMILY family_name ] AS
  {  OPERATOR strategy_number operator_name [ ( op_type, op_type ) ] [ FOR SEARCH | FOR ORDER BY sort_family_name ]
   | FUNCTION support_number [ ( op_type [ , op_type ] ) ] function_name ( argument_type [, ...] )
   | STORAGE storage_type
  } [, ... ]`],["CREATE OPERATOR FAMILY","define a new operator family","sql-createopfamily","CREATE OPERATOR FAMILY nam\
e USING index_method"],["CREATE POLICY","define a new row-level security policy for a table","sql-createpolicy",`CREATE \
POLICY name ON table_name
    [ AS { PERMISSIVE | RESTRICTIVE } ]
    [ FOR { ALL | SELECT | INSERT | UPDATE | DELETE } ]
    [ TO { role_name | PUBLIC | CURRENT_ROLE | CURRENT_USER | SESSION_USER } [, ...] ]
    [ USING ( using_expression ) ]
    [ WITH CHECK ( check_expression ) ]`],["CREATE PROCEDURE","define a new procedure","sql-createprocedure",`CREATE [ O\
R REPLACE ] PROCEDURE
    name ( [ [ argmode ] [ argname ] argtype [ { DEFAULT | = } default_expr ] [, ...] ] )
  { LANGUAGE lang_name
    | TRANSFORM { FOR TYPE type_name } [, ... ]
    | [ EXTERNAL ] SECURITY INVOKER | [ EXTERNAL ] SECURITY DEFINER
    | SET configuration_parameter { TO value | = value | FROM CURRENT }
    | AS 'definition'
    | AS 'obj_file', 'link_symbol'
    | sql_body
  } ...`],["CREATE PUBLICATION","define a new publication","sql-createpublication",`CREATE PUBLICATION name
    [ FOR { publication_object [, ... ] | publication_all_object [, ... ] } ]
    [ WITH ( publication_parameter [= value] [, ... ] ) ]

where publication_object is one of:

    TABLE table_and_columns [, ... ]
    TABLES IN SCHEMA { schema_name | CURRENT_SCHEMA } [, ... ]

and publication_all_object is one of:

    ALL TABLES [ EXCEPT ( except_table_object [, ... ] ) ]
    ALL SEQUENCES

and table_and_columns is:

    table_object [ ( column_name [, ... ] ) ] [ WHERE ( expression ) ]

and except_table_object is:

    TABLE table_object [, ... ]

and table_object is:

   [ ONLY ] table_name [ * ]`],["CREATE ROLE","define a new database role","sql-createrole",`CREATE ROLE name [ [ WITH ]\
 option [ ... ] ]

where option can be:

      SUPERUSER | NOSUPERUSER
    | CREATEDB | NOCREATEDB
    | CREATEROLE | NOCREATEROLE
    | INHERIT | NOINHERIT
    | LOGIN | NOLOGIN
    | REPLICATION | NOREPLICATION
    | BYPASSRLS | NOBYPASSRLS
    | CONNECTION LIMIT connlimit
    | [ ENCRYPTED ] PASSWORD 'password' | PASSWORD NULL
    | VALID UNTIL 'timestamp'
    | IN ROLE role_name [, ...]
    | ROLE role_name [, ...]
    | ADMIN role_name [, ...]
    | SYSID uid`],["CREATE RULE","define a new rewrite rule","sql-createrule",`CREATE [ OR REPLACE ] RULE name AS ON eve\
nt
    TO table_name [ WHERE condition ]
    DO [ ALSO | INSTEAD ] { NOTHING | command | ( command ; command ... ) }

where event can be one of:

    SELECT | INSERT | UPDATE | DELETE`],["CREATE SCHEMA","define a new schema","sql-createschema",`CREATE SCHEMA schema_\
name [ AUTHORIZATION role_specification ] [ schema_element [ ... ] ]
CREATE SCHEMA AUTHORIZATION role_specification [ schema_element [ ... ] ]
CREATE SCHEMA IF NOT EXISTS schema_name [ AUTHORIZATION role_specification ]
CREATE SCHEMA IF NOT EXISTS AUTHORIZATION role_specification

where role_specification can be:

    user_name
  | CURRENT_ROLE
  | CURRENT_USER
  | SESSION_USER`],["CREATE SEQUENCE","define a new sequence generator","sql-createsequence",`CREATE [ { TEMPORARY | TEM\
P } | UNLOGGED ] SEQUENCE [ IF NOT EXISTS ] name
    [ AS data_type ]
    [ INCREMENT [ BY ] increment ]
    [ MINVALUE minvalue | NO MINVALUE ] [ MAXVALUE maxvalue | NO MAXVALUE ]
    [ [ NO ] CYCLE ]
    [ START [ WITH ] start ]
    [ CACHE cache ]
    [ OWNED BY { table_name.column_name | NONE } ]`],["CREATE SERVER","define a new foreign server","sql-createserver",`\
CREATE SERVER [ IF NOT EXISTS ] server_name [ TYPE 'server_type' ] [ VERSION 'server_version' ]
    FOREIGN DATA WRAPPER fdw_name
    [ OPTIONS ( option 'value' [, ... ] ) ]`],["CREATE STATISTICS","define extended statistics","sql-createstatistics",`\
CREATE STATISTICS [ [ IF NOT EXISTS ] statistics_name ]
    ON { column_name | ( expression ) }
    FROM table_name

CREATE STATISTICS [ [ IF NOT EXISTS ] statistics_name ]
    [ ( statistics_kind [, ... ] ) ]
    ON { column_name | ( expression ) }, { column_name | ( expression ) } [, ...]
    FROM table_name`],["CREATE SUBSCRIPTION","define a new subscription","sql-createsubscription",`CREATE SUBSCRIPTION s\
ubscription_name
    { SERVER server_name | CONNECTION 'conninfo' }
    PUBLICATION publication_name [, ...]
    [ WITH ( subscription_parameter [= value] [, ... ] ) ]`],["CREATE TABLE","define a new table","sql-createtable",`CRE\
ATE [ persistence_mode ] TABLE [ IF NOT EXISTS ] table_name ( [
  { column_name data_type [ column_storage ] [ column_compression ] [ COLLATE collation ] [ column_constraint [ ... ] ]
    | table_constraint
    | LIKE source_table [ like_option ... ] }
    [, ... ]
] )
[ INHERITS ( parent_table [, ... ] ) ]
[ PARTITION BY { RANGE | LIST | HASH } ( { column_name | ( expression ) } [ COLLATE collation ] [ opclass ] [, ... ] ) ]\

[ USING method ]
[ WITH ( storage_parameter [= value] [, ... ] ) | WITHOUT OIDS ]
[ ON COMMIT { PRESERVE ROWS | DELETE ROWS | DROP } ]
[ TABLESPACE tablespace_name ]

CREATE [ persistence_mode ] TABLE [ IF NOT EXISTS ] table_name
    OF type_name [ (
  { column_name [ WITH OPTIONS ] [ column_constraint [ ... ] ]
    | table_constraint }
    [, ... ]
) ]
[ PARTITION BY { RANGE | LIST | HASH } ( { column_name | ( expression ) } [ COLLATE collation ] [ opclass ] [, ... ] ) ]\

[ USING method ]
[ WITH ( storage_parameter [= value] [, ... ] ) | WITHOUT OIDS ]
[ ON COMMIT { PRESERVE ROWS | DELETE ROWS | DROP } ]
[ TABLESPACE tablespace_name ]

CREATE [ persistence_mode ] TABLE [ IF NOT EXISTS ] table_name
    PARTITION OF parent_table [ (
  { column_name [ WITH OPTIONS ] [ column_constraint [ ... ] ]
    | table_constraint }
    [, ... ]
) ] { FOR VALUES partition_bound_spec | DEFAULT }
[ PARTITION BY { RANGE | LIST | HASH } ( { column_name | ( expression ) } [ COLLATE collation ] [ opclass ] [, ... ] ) ]\

[ USING method ]
[ WITH ( storage_parameter [= value] [, ... ] ) | WITHOUT OIDS ]
[ ON COMMIT { PRESERVE ROWS | DELETE ROWS | DROP } ]
[ TABLESPACE tablespace_name ]

where persistence_mode is:

{ [ GLOBAL | LOCAL ] { TEMPORARY | TEMP } } | UNLOGGED

and column_storage is:

STORAGE { PLAIN | EXTERNAL | EXTENDED | MAIN | DEFAULT }

and column_compression is:

COMPRESSION compression_method

and column_constraint is:

[ CONSTRAINT constraint_name ]
{ NOT NULL [ NO INHERIT ]  |
  NULL |
  CHECK ( expression ) [ NO INHERIT ] |
  DEFAULT default_expr |
  GENERATED ALWAYS AS ( generation_expr ) [ STORED | VIRTUAL ] |
  GENERATED { ALWAYS | BY DEFAULT } AS IDENTITY [ ( sequence_options ) ] |
  UNIQUE [ NULLS [ NOT ] DISTINCT ] index_parameters |
  PRIMARY KEY index_parameters |
  REFERENCES reftable [ ( refcolumn ) ] [ MATCH FULL | MATCH PARTIAL | MATCH SIMPLE ]
    [ ON DELETE referential_action ] [ ON UPDATE referential_action ] }
[ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ] [ ENFORCED | NOT ENFORCED ]

and table_constraint is:

[ CONSTRAINT constraint_name ]
{ CHECK ( expression ) [ NO INHERIT ] |
  NOT NULL column_name [ NO INHERIT ] |
  UNIQUE [ NULLS [ NOT ] DISTINCT ] ( column_name [, ... ] [, column_name WITHOUT OVERLAPS ] ) index_parameters |
  PRIMARY KEY ( column_name [, ... ] [, column_name WITHOUT OVERLAPS ] ) index_parameters |
  EXCLUDE [ USING index_method ] ( exclude_element WITH operator [, ... ] ) index_parameters [ WHERE ( predicate ) ] |
  FOREIGN KEY ( column_name [, ... ] [, PERIOD column_name ] ) REFERENCES reftable [ ( refcolumn [, ... ] [, PERIOD refc\
olumn ] ) ]
    [ MATCH FULL | MATCH PARTIAL | MATCH SIMPLE ] [ ON DELETE referential_action ] [ ON UPDATE referential_action ] }
[ DEFERRABLE | NOT DEFERRABLE ] [ INITIALLY DEFERRED | INITIALLY IMMEDIATE ] [ ENFORCED | NOT ENFORCED ]

and like_option is:

{ INCLUDING | EXCLUDING } { COMMENTS | COMPRESSION | CONSTRAINTS | DEFAULTS | GENERATED | IDENTITY | INDEXES | STATISTIC\
S | STORAGE | ALL }

and partition_bound_spec is:

IN ( partition_bound_expr [, ...] ) |
FROM ( { partition_bound_expr | MINVALUE | MAXVALUE } [, ...] )
  TO ( { partition_bound_expr | MINVALUE | MAXVALUE } [, ...] ) |
WITH ( MODULUS numeric_literal, REMAINDER numeric_literal )

and index_parameters in UNIQUE, PRIMARY KEY, and EXCLUDE constraints are:

[ INCLUDE ( column_name [, ... ] ) ]
[ WITH ( storage_parameter [= value] [, ... ] ) ]
[ USING INDEX TABLESPACE tablespace_name ]

and exclude_element in an EXCLUDE constraint is:

{ column_name | ( expression ) } [ COLLATE collation ] [ opclass [ ( opclass_parameter = value [, ... ] ) ] ] [ ASC | DE\
SC ] [ NULLS { FIRST | LAST } ]

and referential_action in a FOREIGN KEY/REFERENCES constraint is:

{ NO ACTION | RESTRICT | CASCADE | SET NULL [ ( column_name [, ... ] ) ] | SET DEFAULT [ ( column_name [, ... ] ) ] }`],
["CREATE TABLE AS","define a new table from the results of a query","sql-createtableas",`CREATE [ persistence_mode ] TAB\
LE [ IF NOT EXISTS ] table_name
    [ ( column_name [, ...] ) ]
    [ USING method ]
    [ WITH ( storage_parameter [= value] [, ... ] ) | WITHOUT OIDS ]
    [ ON COMMIT { PRESERVE ROWS | DELETE ROWS | DROP } ]
    [ TABLESPACE tablespace_name ]
    AS query
    [ WITH [ NO ] DATA ]

where persistence_mode is:

{ [ GLOBAL | LOCAL ] { TEMPORARY | TEMP } } | UNLOGGED`],["CREATE TABLESPACE","define a new tablespace","sql-createtable\
space",`CREATE TABLESPACE tablespace_name
    [ OWNER { new_owner | CURRENT_ROLE | CURRENT_USER | SESSION_USER } ]
    LOCATION 'directory'
    [ WITH ( tablespace_option = value [, ... ] ) ]`],["CREATE TEXT SEARCH CONFIGURATION","define a new text search conf\
iguration","sql-createtsconfig",`CREATE TEXT SEARCH CONFIGURATION name (
    PARSER = parser_name |
    COPY = source_config
)`],["CREATE TEXT SEARCH DICTIONARY","define a new text search dictionary","sql-createtsdictionary",`CREATE TEXT SEARCH \
DICTIONARY name (
    TEMPLATE = template
    [, option = value [, ... ]]
)`],["CREATE TEXT SEARCH PARSER","define a new text search parser","sql-createtsparser",`CREATE TEXT SEARCH PARSER name \
(
    START = start_function ,
    GETTOKEN = gettoken_function ,
    END = end_function ,
    LEXTYPES = lextypes_function
    [, HEADLINE = headline_function ]
)`],["CREATE TEXT SEARCH TEMPLATE","define a new text search template","sql-createtstemplate",`CREATE TEXT SEARCH TEMPLA\
TE name (
    [ INIT = init_function , ]
    LEXIZE = lexize_function
)`],["CREATE TRANSFORM","define a new transform","sql-createtransform",`CREATE [ OR REPLACE ] TRANSFORM FOR type_name LA\
NGUAGE lang_name (
    FROM SQL WITH FUNCTION from_sql_function_name [ (argument_type [, ...]) ],
    TO SQL WITH FUNCTION to_sql_function_name [ (argument_type [, ...]) ]
);`],["CREATE TRIGGER","define a new trigger","sql-createtrigger",`CREATE [ OR REPLACE ] [ CONSTRAINT ] TRIGGER name { B\
EFORE | AFTER | INSTEAD OF } { event [ OR ... ] }
    ON table_name
    [ FROM referenced_table_name ]
    [ NOT DEFERRABLE | [ DEFERRABLE ] [ INITIALLY IMMEDIATE | INITIALLY DEFERRED ] ] [ ENFORCED ]
    [ REFERENCING { { OLD | NEW } TABLE [ AS ] transition_relation_name } [ ... ] ]
    [ FOR [ EACH ] { ROW | STATEMENT } ]
    [ WHEN ( condition ) ]
    EXECUTE { FUNCTION | PROCEDURE } function_name ( arguments )

where event can be one of:

    INSERT
    UPDATE [ OF column_name [, ... ] ]
    DELETE
    TRUNCATE`],["CREATE TYPE","define a new data type","sql-createtype",`CREATE TYPE name AS
    ( [ attribute_name data_type [ COLLATE collation ] [, ... ] ] )

CREATE TYPE name AS ENUM
    ( [ 'label' [, ... ] ] )

CREATE TYPE name AS RANGE (
    SUBTYPE = subtype
    [ , SUBTYPE_OPCLASS = subtype_operator_class ]
    [ , COLLATION = collation ]
    [ , CANONICAL = canonical_function ]
    [ , SUBTYPE_DIFF = subtype_diff_function ]
    [ , MULTIRANGE_TYPE_NAME = multirange_type_name ]
)

CREATE TYPE name (
    INPUT = input_function,
    OUTPUT = output_function
    [ , RECEIVE = receive_function ]
    [ , SEND = send_function ]
    [ , TYPMOD_IN = type_modifier_input_function ]
    [ , TYPMOD_OUT = type_modifier_output_function ]
    [ , ANALYZE = analyze_function ]
    [ , SUBSCRIPT = subscript_function ]
    [ , INTERNALLENGTH = { internallength | VARIABLE } ]
    [ , PASSEDBYVALUE ]
    [ , ALIGNMENT = alignment ]
    [ , STORAGE = storage ]
    [ , LIKE = like_type ]
    [ , CATEGORY = category ]
    [ , PREFERRED = preferred ]
    [ , DEFAULT = default ]
    [ , ELEMENT = element ]
    [ , DELIMITER = delimiter ]
    [ , COLLATABLE = collatable ]
)

CREATE TYPE name`],["CREATE USER","define a new database role","sql-createuser",`CREATE USER name [ [ WITH ] option [ ..\
. ] ]

where option can be:

      SUPERUSER | NOSUPERUSER
    | CREATEDB | NOCREATEDB
    | CREATEROLE | NOCREATEROLE
    | INHERIT | NOINHERIT
    | LOGIN | NOLOGIN
    | REPLICATION | NOREPLICATION
    | BYPASSRLS | NOBYPASSRLS
    | CONNECTION LIMIT connlimit
    | [ ENCRYPTED ] PASSWORD 'password' | PASSWORD NULL
    | VALID UNTIL 'timestamp'
    | IN ROLE role_name [, ...]
    | ROLE role_name [, ...]
    | ADMIN role_name [, ...]
    | SYSID uid`],["CREATE USER MAPPING","define a new mapping of a user to a foreign server","sql-createusermapping",`C\
REATE USER MAPPING [ IF NOT EXISTS ] FOR { user_name | USER | CURRENT_ROLE | CURRENT_USER | PUBLIC }
    SERVER server_name
    [ OPTIONS ( option 'value' [ , ... ] ) ]`],["CREATE VIEW","define a new view","sql-createview",`CREATE [ OR REPLACE \
] [ TEMP | TEMPORARY ] [ RECURSIVE ] VIEW name [ ( column_name [, ...] ) ]
    [ WITH ( view_option_name [= view_option_value] [, ... ] ) ]
    AS query
    [ WITH [ CASCADED | LOCAL ] CHECK OPTION ]`],["DEALLOCATE","deallocate a prepared statement","sql-deallocate","DEALL\
OCATE [ PREPARE ] { name | ALL }"],["DECLARE","define a cursor","sql-declare",`DECLARE name [ BINARY ] [ ASENSITIVE | IN\
SENSITIVE ] [ [ NO ] SCROLL ]
    CURSOR [ { WITH | WITHOUT } HOLD ] FOR query`],["DELETE","delete rows of a table","sql-delete",`[ WITH [ RECURSIVE ]\
 with_query [, ...] ]
DELETE FROM [ ONLY ] table_name [ * ] [ [ AS ] alias ]
    [ USING from_item [, ...] ]
    [ WHERE condition | WHERE CURRENT OF cursor_name ]
    [ RETURNING [ WITH ( { OLD | NEW } AS output_alias [, ...] ) ]
                { * | output_expression [ [ AS ] output_name ] } [, ...] ]`],["DISCARD","discard session state","sql-dis\
card","DISCARD { ALL | PLANS | SEQUENCES | TEMPORARY | TEMP }"],["DO","execute an anonymous code block","sql-do","DO [ L\
ANGUAGE lang_name ] code"],["DROP ACCESS METHOD","remove an access method","sql-drop-access-method","DROP ACCESS METHOD \
[ IF EXISTS ] name [ CASCADE | RESTRICT ]"],["DROP AGGREGATE","remove an aggregate function","sql-dropaggregate",`DROP A\
GGREGATE [ IF EXISTS ] name ( aggregate_signature ) [, ...] [ CASCADE | RESTRICT ]

where aggregate_signature is:

* |
[ argmode ] [ argname ] argtype [ , ... ] |
[ [ argmode ] [ argname ] argtype [ , ... ] ] ORDER BY [ argmode ] [ argname ] argtype [ , ... ]`],["DROP CAST","remove \
a cast","sql-dropcast","DROP CAST [ IF EXISTS ] (source_type AS target_type) [ CASCADE | RESTRICT ]"],["DROP COLLATION",
"remove a collation","sql-dropcollation","DROP COLLATION [ IF EXISTS ] name [ CASCADE | RESTRICT ]"],["DROP CONVERSION",
"remove a conversion","sql-dropconversion","DROP CONVERSION [ IF EXISTS ] name [ CASCADE | RESTRICT ]"],["DROP DATABASE",
"remove a database","sql-dropdatabase",`DROP DATABASE [ IF EXISTS ] name [ [ WITH ] ( option [, ...] ) ]

where option can be:

    FORCE`],["DROP DOMAIN","remove a domain","sql-dropdomain","DROP DOMAIN [ IF EXISTS ] name [, ...] [ CASCADE | RESTRI\
CT ]"],["DROP EVENT TRIGGER","remove an event trigger","sql-dropeventtrigger","DROP EVENT TRIGGER [ IF EXISTS ] name [ C\
ASCADE | RESTRICT ]"],["DROP EXTENSION","remove an extension","sql-dropextension","DROP EXTENSION [ IF EXISTS ] name [, \
...] [ CASCADE | RESTRICT ]"],["DROP FOREIGN DATA WRAPPER","remove a foreign-data wrapper","sql-dropforeigndatawrapper",
"DROP FOREIGN DATA WRAPPER [ IF EXISTS ] name [, ...] [ CASCADE | RESTRICT ]"],["DROP FOREIGN TABLE","remove a foreign t\
able","sql-dropforeigntable","DROP FOREIGN TABLE [ IF EXISTS ] name [, ...] [ CASCADE | RESTRICT ]"],["DROP FUNCTION","r\
emove a function","sql-dropfunction",`DROP FUNCTION [ IF EXISTS ] name [ ( [ [ argmode ] [ argname ] argtype [, ...] ] )\
 ] [, ...]
    [ CASCADE | RESTRICT ]`],["DROP GROUP","remove a database role","sql-dropgroup","DROP GROUP [ IF EXISTS ] name [, ..\
.]"],["DROP INDEX","remove an index","sql-dropindex","DROP INDEX [ CONCURRENTLY ] [ IF EXISTS ] name [, ...] [ CASCADE |\
 RESTRICT ]"],["DROP LANGUAGE","remove a procedural language","sql-droplanguage","DROP [ PROCEDURAL ] LANGUAGE [ IF EXIS\
TS ] name [ CASCADE | RESTRICT ]"],["DROP MATERIALIZED VIEW","remove a materialized view","sql-dropmaterializedview","DR\
OP MATERIALIZED VIEW [ IF EXISTS ] name [, ...] [ CASCADE | RESTRICT ]"],["DROP OPERATOR","remove an operator","sql-drop\
operator","DROP OPERATOR [ IF EXISTS ] name ( { left_type | NONE } , right_type ) [, ...] [ CASCADE | RESTRICT ]"],["DRO\
P OPERATOR CLASS","remove an operator class","sql-dropopclass","DROP OPERATOR CLASS [ IF EXISTS ] name USING index_metho\
d [ CASCADE | RESTRICT ]"],["DROP OPERATOR FAMILY","remove an operator family","sql-dropopfamily","DROP OPERATOR FAMILY \
[ IF EXISTS ] name USING index_method [ CASCADE | RESTRICT ]"],["DROP OWNED","remove database objects owned by a databas\
e role","sql-drop-owned","DROP OWNED BY { name | CURRENT_ROLE | CURRENT_USER | SESSION_USER } [, ...] [ CASCADE | RESTRI\
CT ]"],["DROP POLICY","remove a row-level security policy from a table","sql-droppolicy","DROP POLICY [ IF EXISTS ] name\
 ON table_name [ CASCADE | RESTRICT ]"],["DROP PROCEDURE","remove a procedure","sql-dropprocedure",`DROP PROCEDURE [ IF \
EXISTS ] name [ ( [ [ argmode ] [ argname ] argtype [, ...] ] ) ] [, ...]
    [ CASCADE | RESTRICT ]`],["DROP PUBLICATION","remove a publication","sql-droppublication","DROP PUBLICATION [ IF EXI\
STS ] name [, ...] [ CASCADE | RESTRICT ]"],["DROP ROLE","remove a database role","sql-droprole","DROP ROLE [ IF EXISTS \
] name [, ...]"],["DROP ROUTINE","remove a routine","sql-droproutine",`DROP ROUTINE [ IF EXISTS ] name [ ( [ [ argmode ]\
 [ argname ] argtype [, ...] ] ) ] [, ...]
    [ CASCADE | RESTRICT ]`],["DROP RULE","remove a rewrite rule","sql-droprule","DROP RULE [ IF EXISTS ] name ON table_\
name [ CASCADE | RESTRICT ]"],["DROP SCHEMA","remove a schema","sql-dropschema","DROP SCHEMA [ IF EXISTS ] name [, ...] \
[ CASCADE | RESTRICT ]"],["DROP SEQUENCE","remove a sequence","sql-dropsequence","DROP SEQUENCE [ IF EXISTS ] name [, ..\
.] [ CASCADE | RESTRICT ]"],["DROP SERVER","remove a foreign server descriptor","sql-dropserver","DROP SERVER [ IF EXIST\
S ] name [, ...] [ CASCADE | RESTRICT ]"],["DROP STATISTICS","remove extended statistics","sql-dropstatistics","DROP STA\
TISTICS [ IF EXISTS ] name [, ...] [ CASCADE | RESTRICT ]"],["DROP SUBSCRIPTION","remove a subscription","sql-dropsubscr\
iption","DROP SUBSCRIPTION [ IF EXISTS ] name [ CASCADE | RESTRICT ]"],["DROP TABLE","remove a table","sql-droptable","D\
ROP TABLE [ IF EXISTS ] name [, ...] [ CASCADE | RESTRICT ]"],["DROP TABLESPACE","remove a tablespace","sql-droptablespa\
ce","DROP TABLESPACE [ IF EXISTS ] name"],["DROP TEXT SEARCH CONFIGURATION","remove a text search configuration","sql-dr\
optsconfig","DROP TEXT SEARCH CONFIGURATION [ IF EXISTS ] name [ CASCADE | RESTRICT ]"],["DROP TEXT SEARCH DICTIONARY","\
remove a text search dictionary","sql-droptsdictionary","DROP TEXT SEARCH DICTIONARY [ IF EXISTS ] name [ CASCADE | REST\
RICT ]"],["DROP TEXT SEARCH PARSER","remove a text search parser","sql-droptsparser","DROP TEXT SEARCH PARSER [ IF EXIST\
S ] name [ CASCADE | RESTRICT ]"],["DROP TEXT SEARCH TEMPLATE","remove a text search template","sql-droptstemplate","DRO\
P TEXT SEARCH TEMPLATE [ IF EXISTS ] name [ CASCADE | RESTRICT ]"],["DROP TRANSFORM","remove a transform","sql-droptrans\
form","DROP TRANSFORM [ IF EXISTS ] FOR type_name LANGUAGE lang_name [ CASCADE | RESTRICT ]"],["DROP TRIGGER","remove a \
trigger","sql-droptrigger","DROP TRIGGER [ IF EXISTS ] name ON table_name [ CASCADE | RESTRICT ]"],["DROP TYPE","remove \
a data type","sql-droptype","DROP TYPE [ IF EXISTS ] name [, ...] [ CASCADE | RESTRICT ]"],["DROP USER","remove a databa\
se role","sql-dropuser","DROP USER [ IF EXISTS ] name [, ...]"],["DROP USER MAPPING","remove a user mapping for a foreig\
n server","sql-dropusermapping","DROP USER MAPPING [ IF EXISTS ] FOR { user_name | USER | CURRENT_ROLE | CURRENT_USER | \
PUBLIC } SERVER server_name"],["DROP VIEW","remove a view","sql-dropview","DROP VIEW [ IF EXISTS ] name [, ...] [ CASCAD\
E | RESTRICT ]"],["END","commit the current transaction","sql-end","END [ WORK | TRANSACTION ] [ AND [ NO ] CHAIN ]"],["\
EXECUTE","execute a prepared statement","sql-execute","EXECUTE name [ ( parameter [, ...] ) ]"],["EXPLAIN","show the exe\
cution plan of a statement","sql-explain",`EXPLAIN [ ( option [, ...] ) ] statement

where option can be one of:

    ANALYZE [ boolean ]
    VERBOSE [ boolean ]
    COSTS [ boolean ]
    SETTINGS [ boolean ]
    GENERIC_PLAN [ boolean ]
    BUFFERS [ boolean ]
    SERIALIZE [ { NONE | TEXT | BINARY } ]
    WAL [ boolean ]
    TIMING [ boolean ]
    SUMMARY [ boolean ]
    MEMORY [ boolean ]
    IO [ boolean ]
    FORMAT { TEXT | XML | JSON | YAML }`],["FETCH","retrieve rows from a query using a cursor","sql-fetch",`FETCH [ dire\
ction ] [ FROM | IN ] cursor_name

where direction can be one of:

    NEXT
    PRIOR
    FIRST
    LAST
    ABSOLUTE count
    RELATIVE count
    count
    ALL
    FORWARD
    FORWARD count
    FORWARD ALL
    BACKWARD
    BACKWARD count
    BACKWARD ALL`],["GRANT","define access privileges","sql-grant",`GRANT { { SELECT | INSERT | UPDATE | DELETE | TRUNCA\
TE | REFERENCES | TRIGGER | MAINTAIN }
    [, ...] | ALL [ PRIVILEGES ] }
    ON { [ TABLE ] table_name [, ...]
         | ALL TABLES IN SCHEMA schema_name [, ...] }
    TO role_specification [, ...] [ WITH GRANT OPTION ]
    [ GRANTED BY role_specification ]

GRANT { { SELECT | INSERT | UPDATE | REFERENCES } ( column_name [, ...] )
    [, ...] | ALL [ PRIVILEGES ] ( column_name [, ...] ) }
    ON [ TABLE ] table_name [, ...]
    TO role_specification [, ...] [ WITH GRANT OPTION ]
    [ GRANTED BY role_specification ]

GRANT { { USAGE | SELECT | UPDATE }
    [, ...] | ALL [ PRIVILEGES ] }
    ON { SEQUENCE sequence_name [, ...]
         | ALL SEQUENCES IN SCHEMA schema_name [, ...] }
    TO role_specification [, ...] [ WITH GRANT OPTION ]
    [ GRANTED BY role_specification ]

GRANT { { CREATE | CONNECT | TEMPORARY | TEMP } [, ...] | ALL [ PRIVILEGES ] }
    ON DATABASE database_name [, ...]
    TO role_specification [, ...] [ WITH GRANT OPTION ]
    [ GRANTED BY role_specification ]

GRANT { USAGE | ALL [ PRIVILEGES ] }
    ON DOMAIN domain_name [, ...]
    TO role_specification [, ...] [ WITH GRANT OPTION ]
    [ GRANTED BY role_specification ]

GRANT { USAGE | ALL [ PRIVILEGES ] }
    ON FOREIGN DATA WRAPPER fdw_name [, ...]
    TO role_specification [, ...] [ WITH GRANT OPTION ]
    [ GRANTED BY role_specification ]

GRANT { USAGE | ALL [ PRIVILEGES ] }
    ON FOREIGN SERVER server_name [, ...]
    TO role_specification [, ...] [ WITH GRANT OPTION ]
    [ GRANTED BY role_specification ]

GRANT { EXECUTE | ALL [ PRIVILEGES ] }
    ON { { FUNCTION | PROCEDURE | ROUTINE } routine_name [ ( [ [ argmode ] [ arg_name ] arg_type [, ...] ] ) ] [, ...]
         | ALL { FUNCTIONS | PROCEDURES | ROUTINES } IN SCHEMA schema_name [, ...] }
    TO role_specification [, ...] [ WITH GRANT OPTION ]
    [ GRANTED BY role_specification ]

GRANT { USAGE | ALL [ PRIVILEGES ] }
    ON LANGUAGE lang_name [, ...]
    TO role_specification [, ...] [ WITH GRANT OPTION ]
    [ GRANTED BY role_specification ]

GRANT { { SELECT | UPDATE } [, ...] | ALL [ PRIVILEGES ] }
    ON LARGE OBJECT loid [, ...]
    TO role_specification [, ...] [ WITH GRANT OPTION ]
    [ GRANTED BY role_specification ]

GRANT { { SET | ALTER SYSTEM } [, ... ] | ALL [ PRIVILEGES ] }
    ON PARAMETER configuration_parameter [, ...]
    TO role_specification [, ...] [ WITH GRANT OPTION ]
    [ GRANTED BY role_specification ]

GRANT { { CREATE | USAGE } [, ...] | ALL [ PRIVILEGES ] }
    ON SCHEMA schema_name [, ...]
    TO role_specification [, ...] [ WITH GRANT OPTION ]
    [ GRANTED BY role_specification ]

GRANT { CREATE | ALL [ PRIVILEGES ] }
    ON TABLESPACE tablespace_name [, ...]
    TO role_specification [, ...] [ WITH GRANT OPTION ]
    [ GRANTED BY role_specification ]

GRANT { USAGE | ALL [ PRIVILEGES ] }
    ON TYPE type_name [, ...]
    TO role_specification [, ...] [ WITH GRANT OPTION ]
    [ GRANTED BY role_specification ]

GRANT role_name [, ...] TO role_specification [, ...]
    [ WITH { ADMIN | INHERIT | SET } { OPTION | TRUE | FALSE } ]
    [ GRANTED BY role_specification ]

where role_specification can be:

    [ GROUP ] role_name
  | PUBLIC
  | CURRENT_ROLE
  | CURRENT_USER
  | SESSION_USER`],["IMPORT FOREIGN SCHEMA","import table definitions from a foreign server","sql-importforeignschema",`\
IMPORT FOREIGN SCHEMA remote_schema
    [ { LIMIT TO | EXCEPT } ( table_name [, ...] ) ]
    FROM SERVER server_name
    INTO local_schema
    [ OPTIONS ( option 'value' [, ... ] ) ]`],["INSERT","create new rows in a table","sql-insert",`[ WITH [ RECURSIVE ] \
with_query [, ...] ]
INSERT INTO table_name [ AS alias ] [ ( column_name [, ...] ) ]
    [ OVERRIDING { SYSTEM | USER } VALUE ]
    { DEFAULT VALUES | VALUES ( { expression | DEFAULT } [, ...] ) [, ...] | query }
    [ ON CONFLICT [ conflict_target ] conflict_action ]
    [ RETURNING [ WITH ( { OLD | NEW } AS output_alias [, ...] ) ]
                { * | output_expression [ [ AS ] output_name ] } [, ...] ]

where conflict_target can be one of:

    ( { index_column_name | ( index_expression ) } [ COLLATE collation ] [ opclass ] [, ...] ) [ WHERE index_predicate ]\

    ON CONSTRAINT constraint_name

and conflict_action is one of:

    DO NOTHING
    DO SELECT [ FOR { UPDATE | NO KEY UPDATE | SHARE | KEY SHARE } ] [ WHERE condition ]
    DO UPDATE SET { column_name = { expression | DEFAULT } |
                    ( column_name [, ...] ) = [ ROW ] ( { expression | DEFAULT } [, ...] ) |
                    ( column_name [, ...] ) = ( sub-SELECT )
                  } [, ...]
              [ WHERE condition ]`],["LISTEN","listen for a notification","sql-listen","LISTEN channel"],["LOAD","load a\
 shared library file","sql-load","LOAD 'filename'"],["LOCK","lock a table","sql-lock",`LOCK [ TABLE ] [ ONLY ] name [ * \
] [, ...] [ IN lockmode MODE ] [ NOWAIT ]

where lockmode is one of:

    ACCESS SHARE | ROW SHARE | ROW EXCLUSIVE | SHARE UPDATE EXCLUSIVE
    | SHARE | SHARE ROW EXCLUSIVE | EXCLUSIVE | ACCESS EXCLUSIVE`],["MERGE","conditionally insert, update, or delete row\
s of a table","sql-merge",`[ WITH with_query [, ...] ]
MERGE INTO [ ONLY ] target_table_name [ * ] [ [ AS ] target_alias ]
    USING data_source ON join_condition
    when_clause [...]
    [ RETURNING [ WITH ( { OLD | NEW } AS output_alias [, ...] ) ]
                { * | output_expression [ [ AS ] output_name ] } [, ...] ]

where data_source is:

    { [ ONLY ] source_table_name [ * ] | ( source_query ) } [ [ AS ] source_alias ]

and when_clause is:

    { WHEN MATCHED [ AND condition ] THEN { merge_update | merge_delete | DO NOTHING } |
      WHEN NOT MATCHED BY SOURCE [ AND condition ] THEN { merge_update | merge_delete | DO NOTHING } |
      WHEN NOT MATCHED [ BY TARGET ] [ AND condition ] THEN { merge_insert | DO NOTHING } }

and merge_insert is:

    INSERT [( column_name [, ...] )]
        [ OVERRIDING { SYSTEM | USER } VALUE ]
        { VALUES ( { expression | DEFAULT } [, ...] ) | DEFAULT VALUES }

and merge_update is:

    UPDATE SET { column_name = { expression | DEFAULT } |
                 ( column_name [, ...] ) = [ ROW ] ( { expression | DEFAULT } [, ...] ) |
                 ( column_name [, ...] ) = ( sub-SELECT )
               } [, ...]

and merge_delete is:

    DELETE`],["MOVE","position a cursor","sql-move",`MOVE [ direction ] [ FROM | IN ] cursor_name

where direction can be one of:

    NEXT
    PRIOR
    FIRST
    LAST
    ABSOLUTE count
    RELATIVE count
    count
    ALL
    FORWARD
    FORWARD count
    FORWARD ALL
    BACKWARD
    BACKWARD count
    BACKWARD ALL`],["NOTIFY","generate a notification","sql-notify","NOTIFY channel [ , payload ]"],["PREPARE","prepare \
a statement for execution","sql-prepare","PREPARE name [ ( data_type [, ...] ) ] AS statement"],["PREPARE TRANSACTION","\
prepare the current transaction for two-phase commit","sql-prepare-transaction","PREPARE TRANSACTION transaction_id"],["\
REASSIGN OWNED","change the ownership of database objects owned by a database role","sql-reassign-owned",`REASSIGN OWNED\
 BY { old_role | CURRENT_ROLE | CURRENT_USER | SESSION_USER } [, ...]
               TO { new_role | CURRENT_ROLE | CURRENT_USER | SESSION_USER }`],["REFRESH MATERIALIZED VIEW","replace the \
contents of a materialized view","sql-refreshmaterializedview",`REFRESH MATERIALIZED VIEW [ CONCURRENTLY ] name
    [ WITH [ NO ] DATA ]`],["REINDEX","rebuild indexes","sql-reindex",`REINDEX [ ( option [, ...] ) ] { INDEX | TABLE | \
SCHEMA } [ CONCURRENTLY ] name
REINDEX [ ( option [, ...] ) ] { DATABASE | SYSTEM } [ CONCURRENTLY ] [ name ]

where option can be one of:

    CONCURRENTLY [ boolean ]
    TABLESPACE new_tablespace
    VERBOSE [ boolean ]`],["RELEASE SAVEPOINT","release a previously defined savepoint","sql-release-savepoint","RELEASE\
 [ SAVEPOINT ] savepoint_name"],["REPACK","rewrite a table to reclaim disk space","sql-repack",`REPACK [ ( option [, ...\
] ) ] [ table_and_columns [ USING INDEX [ index_name ] ] ]
REPACK [ ( option [, ...] ) ] USING INDEX

where option can be one of:

    VERBOSE [ boolean ]
    ANALYZE [ boolean ]
    CONCURRENTLY [ boolean ]

and table_and_columns is:

    table_name [ ( column_name [, ...] ) ]`],["RESET","restore the value of a run-time parameter to the default value","\
sql-reset",`RESET configuration_parameter
RESET ALL`],["REVOKE","remove access privileges","sql-revoke",`REVOKE [ GRANT OPTION FOR ]
    { { SELECT | INSERT | UPDATE | DELETE | TRUNCATE | REFERENCES | TRIGGER | MAINTAIN }
    [, ...] | ALL [ PRIVILEGES ] }
    ON { [ TABLE ] table_name [, ...]
         | ALL TABLES IN SCHEMA schema_name [, ...] }
    FROM role_specification [, ...]
    [ GRANTED BY role_specification ]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { { SELECT | INSERT | UPDATE | REFERENCES } ( column_name [, ...] )
    [, ...] | ALL [ PRIVILEGES ] ( column_name [, ...] ) }
    ON [ TABLE ] table_name [, ...]
    FROM role_specification [, ...]
    [ GRANTED BY role_specification ]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { { USAGE | SELECT | UPDATE }
    [, ...] | ALL [ PRIVILEGES ] }
    ON { SEQUENCE sequence_name [, ...]
         | ALL SEQUENCES IN SCHEMA schema_name [, ...] }
    FROM role_specification [, ...]
    [ GRANTED BY role_specification ]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { { CREATE | CONNECT | TEMPORARY | TEMP } [, ...] | ALL [ PRIVILEGES ] }
    ON DATABASE database_name [, ...]
    FROM role_specification [, ...]
    [ GRANTED BY role_specification ]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { USAGE | ALL [ PRIVILEGES ] }
    ON DOMAIN domain_name [, ...]
    FROM role_specification [, ...]
    [ GRANTED BY role_specification ]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { USAGE | ALL [ PRIVILEGES ] }
    ON FOREIGN DATA WRAPPER fdw_name [, ...]
    FROM role_specification [, ...]
    [ GRANTED BY role_specification ]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { USAGE | ALL [ PRIVILEGES ] }
    ON FOREIGN SERVER server_name [, ...]
    FROM role_specification [, ...]
    [ GRANTED BY role_specification ]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { EXECUTE | ALL [ PRIVILEGES ] }
    ON { { FUNCTION | PROCEDURE | ROUTINE } function_name [ ( [ [ argmode ] [ arg_name ] arg_type [, ...] ] ) ] [, ...]
         | ALL { FUNCTIONS | PROCEDURES | ROUTINES } IN SCHEMA schema_name [, ...] }
    FROM role_specification [, ...]
    [ GRANTED BY role_specification ]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { USAGE | ALL [ PRIVILEGES ] }
    ON LANGUAGE lang_name [, ...]
    FROM role_specification [, ...]
    [ GRANTED BY role_specification ]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { { SELECT | UPDATE } [, ...] | ALL [ PRIVILEGES ] }
    ON LARGE OBJECT loid [, ...]
    FROM role_specification [, ...]
    [ GRANTED BY role_specification ]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { { SET | ALTER SYSTEM } [, ...] | ALL [ PRIVILEGES ] }
    ON PARAMETER configuration_parameter [, ...]
    FROM role_specification [, ...]
    [ GRANTED BY role_specification ]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { { CREATE | USAGE } [, ...] | ALL [ PRIVILEGES ] }
    ON SCHEMA schema_name [, ...]
    FROM role_specification [, ...]
    [ GRANTED BY role_specification ]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { CREATE | ALL [ PRIVILEGES ] }
    ON TABLESPACE tablespace_name [, ...]
    FROM role_specification [, ...]
    [ GRANTED BY role_specification ]
    [ CASCADE | RESTRICT ]

REVOKE [ GRANT OPTION FOR ]
    { USAGE | ALL [ PRIVILEGES ] }
    ON TYPE type_name [, ...]
    FROM role_specification [, ...]
    [ GRANTED BY role_specification ]
    [ CASCADE | RESTRICT ]

REVOKE [ { ADMIN | INHERIT | SET } OPTION FOR ]
    role_name [, ...] FROM role_specification [, ...]
    [ GRANTED BY role_specification ]
    [ CASCADE | RESTRICT ]

where role_specification can be:

    [ GROUP ] role_name
  | PUBLIC
  | CURRENT_ROLE
  | CURRENT_USER
  | SESSION_USER`],["ROLLBACK","abort the current transaction","sql-rollback","ROLLBACK [ WORK | TRANSACTION ] [ AND [ N\
O ] CHAIN ]"],["ROLLBACK PREPARED","cancel a transaction that was earlier prepared for two-phase commit","sql-rollback-p\
repared","ROLLBACK PREPARED transaction_id"],["ROLLBACK TO SAVEPOINT","roll back to a savepoint","sql-rollback-to","ROLL\
BACK [ WORK | TRANSACTION ] TO [ SAVEPOINT ] savepoint_name"],["SAVEPOINT","define a new savepoint within the current tr\
ansaction","sql-savepoint","SAVEPOINT savepoint_name"],["SECURITY LABEL","define or change a security label applied to a\
n object","sql-security-label",`SECURITY LABEL [ FOR provider ] ON
{
  TABLE object_name |
  COLUMN table_name.column_name |
  AGGREGATE aggregate_name ( aggregate_signature ) |
  DATABASE object_name |
  DOMAIN object_name |
  EVENT TRIGGER object_name |
  FOREIGN TABLE object_name |
  FUNCTION function_name [ ( [ [ argmode ] [ argname ] argtype [, ...] ] ) ] |
  LARGE OBJECT large_object_oid |
  MATERIALIZED VIEW object_name |
  [ PROCEDURAL ] LANGUAGE object_name |
  PROCEDURE procedure_name [ ( [ [ argmode ] [ argname ] argtype [, ...] ] ) ] |
  PUBLICATION object_name |
  ROLE object_name |
  ROUTINE routine_name [ ( [ [ argmode ] [ argname ] argtype [, ...] ] ) ] |
  SCHEMA object_name |
  SEQUENCE object_name |
  SUBSCRIPTION object_name |
  TABLESPACE object_name |
  TYPE object_name |
  VIEW object_name
} IS { string_literal | NULL }

where aggregate_signature is:

* |
[ argmode ] [ argname ] argtype [ , ... ] |
[ [ argmode ] [ argname ] argtype [ , ... ] ] ORDER BY [ argmode ] [ argname ] argtype [ , ... ]`],["SELECT","retrieve r\
ows from a table or view","sql-select",`[ WITH [ RECURSIVE ] with_query [, ...] ]
SELECT [ ALL | DISTINCT [ ON ( expression [, ...] ) ] ]
    [ { * | expression [ [ AS ] output_name ] } [, ...] ]
    [ FROM from_item [, ...] ]
    [ WHERE condition ]
    [ GROUP BY [ ALL | DISTINCT ] grouping_element [, ...] ]
    [ HAVING condition ]
    [ WINDOW window_name AS ( window_definition ) [, ...] ]
    [ { UNION | INTERSECT | EXCEPT } [ ALL | DISTINCT ] select ]
    [ ORDER BY expression [ ASC | DESC | USING operator ] [ NULLS { FIRST | LAST } ] [, ...] ]
    [ LIMIT { count | ALL } ]
    [ OFFSET start [ ROW | ROWS ] ]
    [ FETCH { FIRST | NEXT } [ count ] { ROW | ROWS } { ONLY | WITH TIES } ]
    [ FOR { UPDATE | NO KEY UPDATE | SHARE | KEY SHARE } [ OF from_reference [, ...] ] [ NOWAIT | SKIP LOCKED ] [...] ]

where from_item can be one of:

    [ ONLY ] table_name [ * ] [ [ AS ] alias [ ( column_alias [, ...] ) ] ]
                [ TABLESAMPLE sampling_method ( argument [, ...] ) [ REPEATABLE ( seed ) ] ]
    [ LATERAL ] ( select ) [ [ AS ] alias [ ( column_alias [, ...] ) ] ]
    with_query_name [ [ AS ] alias [ ( column_alias [, ...] ) ] ]
    [ LATERAL ] function_name ( [ argument [, ...] ] )
                [ WITH ORDINALITY ] [ [ AS ] alias [ ( column_alias [, ...] ) ] ]
    [ LATERAL ] function_name ( [ argument [, ...] ] ) [ AS ] alias ( column_definition [, ...] )
    [ LATERAL ] function_name ( [ argument [, ...] ] ) AS ( column_definition [, ...] )
    [ LATERAL ] ROWS FROM( function_name ( [ argument [, ...] ] ) [ AS ( column_definition [, ...] ) ] [, ...] )
                [ WITH ORDINALITY ] [ [ AS ] alias [ ( column_alias [, ...] ) ] ]
    from_item join_type from_item { ON join_condition | USING ( join_column [, ...] ) [ AS join_using_alias ] }
    from_item NATURAL join_type from_item
    from_item CROSS JOIN from_item

and grouping_element can be one of:

    ( )
    expression
    ( expression [, ...] )
    ROLLUP ( { expression | ( expression [, ...] ) } [, ...] )
    CUBE ( { expression | ( expression [, ...] ) } [, ...] )
    GROUPING SETS ( grouping_element [, ...] )

and with_query is:

    with_query_name [ ( column_name [, ...] ) ] AS [ [ NOT ] MATERIALIZED ] ( select | values | insert | update | delete\
 | merge )
        [ SEARCH { BREADTH | DEPTH } FIRST BY column_name [, ...] SET search_seq_col_name ]
        [ CYCLE column_name [, ...] SET cycle_mark_col_name [ TO cycle_mark_value DEFAULT cycle_mark_default ] USING cyc\
le_path_col_name ]

TABLE [ ONLY ] table_name [ * ]`],["SELECT INTO","define a new table from the results of a query","sql-selectinto",`[ WI\
TH [ RECURSIVE ] with_query [, ...] ]
SELECT [ ALL | DISTINCT [ ON ( expression [, ...] ) ] ]
    [ { * | expression [ [ AS ] output_name ] } [, ...] ]
    INTO [ TEMPORARY | TEMP | UNLOGGED ] [ TABLE ] new_table
    [ FROM from_item [, ...] ]
    [ WHERE condition ]
    [ GROUP BY [ ALL | DISTINCT ] grouping_element [, ...] ]
    [ HAVING condition ]
    [ WINDOW window_name AS ( window_definition ) [, ...] ]
    [ { UNION | INTERSECT | EXCEPT } [ ALL | DISTINCT ] select ]
    [ ORDER BY expression [ ASC | DESC | USING operator ] [ NULLS { FIRST | LAST } ] [, ...] ]
    [ LIMIT { count | ALL } ]
    [ OFFSET start [ ROW | ROWS ] ]
    [ FETCH { FIRST | NEXT } [ count ] { ROW | ROWS } { ONLY | WITH TIES } ]
    [ FOR { UPDATE | NO KEY UPDATE | SHARE | KEY SHARE } [ OF from_reference [, ...] ] [ NOWAIT | SKIP LOCKED ] [...] ]`],
["SET","change a run-time parameter","sql-set",`SET [ SESSION | LOCAL ] configuration_parameter { TO | = } { value [, ..\
.] | DEFAULT }
SET [ SESSION | LOCAL ] TIME ZONE { value | LOCAL | DEFAULT }`],["SET CONSTRAINTS","set constraint check timing for the \
current transaction","sql-set-constraints","SET CONSTRAINTS { ALL | name [, ...] } { DEFERRED | IMMEDIATE }"],["SET ROLE",
"set the current user identifier of the current session","sql-set-role",`SET [ SESSION | LOCAL ] ROLE role_name
SET [ SESSION | LOCAL ] ROLE NONE
RESET ROLE`],["SET SESSION AUTHORIZATION","set the session user identifier and the current user identifier of the curren\
t session","sql-set-session-authorization",`SET [ SESSION | LOCAL ] SESSION AUTHORIZATION user_name
SET [ SESSION | LOCAL ] SESSION AUTHORIZATION DEFAULT
RESET SESSION AUTHORIZATION`],["SET TRANSACTION","set the characteristics of the current transaction","sql-set-transacti\
on",`SET TRANSACTION transaction_mode [, ...]
SET TRANSACTION SNAPSHOT snapshot_id
SET SESSION CHARACTERISTICS AS TRANSACTION transaction_mode [, ...]

where transaction_mode is one of:

    ISOLATION LEVEL { SERIALIZABLE | REPEATABLE READ | READ COMMITTED | READ UNCOMMITTED }
    READ WRITE | READ ONLY
    [ NOT ] DEFERRABLE`],["SHOW","show the value of a run-time parameter","sql-show",`SHOW name
SHOW ALL`],["START TRANSACTION","start a transaction block","sql-start-transaction",`START TRANSACTION [ transaction_mod\
e [, ...] ]

where transaction_mode is one of:

    ISOLATION LEVEL { SERIALIZABLE | REPEATABLE READ | READ COMMITTED | READ UNCOMMITTED }
    READ WRITE | READ ONLY
    [ NOT ] DEFERRABLE`],["TABLE","retrieve rows from a table or view","sql-select",`[ WITH [ RECURSIVE ] with_query [, \
...] ]
SELECT [ ALL | DISTINCT [ ON ( expression [, ...] ) ] ]
    [ { * | expression [ [ AS ] output_name ] } [, ...] ]
    [ FROM from_item [, ...] ]
    [ WHERE condition ]
    [ GROUP BY [ ALL | DISTINCT ] grouping_element [, ...] ]
    [ HAVING condition ]
    [ WINDOW window_name AS ( window_definition ) [, ...] ]
    [ { UNION | INTERSECT | EXCEPT } [ ALL | DISTINCT ] select ]
    [ ORDER BY expression [ ASC | DESC | USING operator ] [ NULLS { FIRST | LAST } ] [, ...] ]
    [ LIMIT { count | ALL } ]
    [ OFFSET start [ ROW | ROWS ] ]
    [ FETCH { FIRST | NEXT } [ count ] { ROW | ROWS } { ONLY | WITH TIES } ]
    [ FOR { UPDATE | NO KEY UPDATE | SHARE | KEY SHARE } [ OF from_reference [, ...] ] [ NOWAIT | SKIP LOCKED ] [...] ]

where from_item can be one of:

    [ ONLY ] table_name [ * ] [ [ AS ] alias [ ( column_alias [, ...] ) ] ]
                [ TABLESAMPLE sampling_method ( argument [, ...] ) [ REPEATABLE ( seed ) ] ]
    [ LATERAL ] ( select ) [ [ AS ] alias [ ( column_alias [, ...] ) ] ]
    with_query_name [ [ AS ] alias [ ( column_alias [, ...] ) ] ]
    [ LATERAL ] function_name ( [ argument [, ...] ] )
                [ WITH ORDINALITY ] [ [ AS ] alias [ ( column_alias [, ...] ) ] ]
    [ LATERAL ] function_name ( [ argument [, ...] ] ) [ AS ] alias ( column_definition [, ...] )
    [ LATERAL ] function_name ( [ argument [, ...] ] ) AS ( column_definition [, ...] )
    [ LATERAL ] ROWS FROM( function_name ( [ argument [, ...] ] ) [ AS ( column_definition [, ...] ) ] [, ...] )
                [ WITH ORDINALITY ] [ [ AS ] alias [ ( column_alias [, ...] ) ] ]
    from_item join_type from_item { ON join_condition | USING ( join_column [, ...] ) [ AS join_using_alias ] }
    from_item NATURAL join_type from_item
    from_item CROSS JOIN from_item

and grouping_element can be one of:

    ( )
    expression
    ( expression [, ...] )
    ROLLUP ( { expression | ( expression [, ...] ) } [, ...] )
    CUBE ( { expression | ( expression [, ...] ) } [, ...] )
    GROUPING SETS ( grouping_element [, ...] )

and with_query is:

    with_query_name [ ( column_name [, ...] ) ] AS [ [ NOT ] MATERIALIZED ] ( select | values | insert | update | delete\
 | merge )
        [ SEARCH { BREADTH | DEPTH } FIRST BY column_name [, ...] SET search_seq_col_name ]
        [ CYCLE column_name [, ...] SET cycle_mark_col_name [ TO cycle_mark_value DEFAULT cycle_mark_default ] USING cyc\
le_path_col_name ]

TABLE [ ONLY ] table_name [ * ]`],["TRUNCATE","empty a table or set of tables","sql-truncate",`TRUNCATE [ TABLE ] [ ONLY\
 ] name [ * ] [, ... ]
    [ RESTART IDENTITY | CONTINUE IDENTITY ] [ CASCADE | RESTRICT ]`],["UNLISTEN","stop listening for a notification","s\
ql-unlisten","UNLISTEN { channel | * }"],["UPDATE","update rows of a table","sql-update",`[ WITH [ RECURSIVE ] with_quer\
y [, ...] ]
UPDATE [ ONLY ] table_name [ * ] [ [ AS ] alias ]
    SET { column_name = { expression | DEFAULT } |
          ( column_name [, ...] ) = [ ROW ] ( { expression | DEFAULT } [, ...] ) |
          ( column_name [, ...] ) = ( sub-SELECT )
        } [, ...]
    [ FROM from_item [, ...] ]
    [ WHERE condition | WHERE CURRENT OF cursor_name ]
    [ RETURNING [ WITH ( { OLD | NEW } AS output_alias [, ...] ) ]
                { * | output_expression [ [ AS ] output_name ] } [, ...] ]`],["VACUUM","garbage-collect and optionally a\
nalyze a database","sql-vacuum",`VACUUM [ ( option [, ...] ) ] [ table_and_columns [, ...] ]

where option can be one of:

    FREEZE [ boolean ]
    VERBOSE [ boolean ]
    ANALYZE [ boolean ]
    DISABLE_PAGE_SKIPPING [ boolean ]
    SKIP_LOCKED [ boolean ]
    INDEX_CLEANUP { AUTO | ON | OFF }
    PROCESS_MAIN [ boolean ]
    PROCESS_TOAST [ boolean ]
    TRUNCATE [ boolean ]
    PARALLEL integer
    SKIP_DATABASE_STATS [ boolean ]
    ONLY_DATABASE_STATS [ boolean ]
    BUFFER_USAGE_LIMIT size
    FULL [ boolean ]

and table_and_columns is:

    [ ONLY ] table_name [ * ] [ ( column_name [, ...] ) ]`],["VALUES","compute a set of rows","sql-values",`VALUES ( exp\
ression [, ...] ) [, ...]
    [ ORDER BY sort_expression [ ASC | DESC | USING operator ] [, ...] ]
    [ LIMIT { count | ALL } ]
    [ OFFSET start [ ROW | ROWS ] ]
    [ FETCH { FIRST | NEXT } [ count ] { ROW | ROWS } ONLY ]`],["WAIT","wait for WAL to reach a target LSN","sql-wait",`\
WAIT FOR LSN 'lsn'
    [ WITH ( option [, ...] ) ]

where option can be:

    MODE 'mode'
    TIMEOUT 'timeout'
    NO_THROW

and mode can be:

    standby_replay | standby_write | standby_flush | primary_flush`],["WITH","retrieve rows from a table or view","sql-s\
elect",`[ WITH [ RECURSIVE ] with_query [, ...] ]
SELECT [ ALL | DISTINCT [ ON ( expression [, ...] ) ] ]
    [ { * | expression [ [ AS ] output_name ] } [, ...] ]
    [ FROM from_item [, ...] ]
    [ WHERE condition ]
    [ GROUP BY [ ALL | DISTINCT ] grouping_element [, ...] ]
    [ HAVING condition ]
    [ WINDOW window_name AS ( window_definition ) [, ...] ]
    [ { UNION | INTERSECT | EXCEPT } [ ALL | DISTINCT ] select ]
    [ ORDER BY expression [ ASC | DESC | USING operator ] [ NULLS { FIRST | LAST } ] [, ...] ]
    [ LIMIT { count | ALL } ]
    [ OFFSET start [ ROW | ROWS ] ]
    [ FETCH { FIRST | NEXT } [ count ] { ROW | ROWS } { ONLY | WITH TIES } ]
    [ FOR { UPDATE | NO KEY UPDATE | SHARE | KEY SHARE } [ OF from_reference [, ...] ] [ NOWAIT | SKIP LOCKED ] [...] ]

where from_item can be one of:

    [ ONLY ] table_name [ * ] [ [ AS ] alias [ ( column_alias [, ...] ) ] ]
                [ TABLESAMPLE sampling_method ( argument [, ...] ) [ REPEATABLE ( seed ) ] ]
    [ LATERAL ] ( select ) [ [ AS ] alias [ ( column_alias [, ...] ) ] ]
    with_query_name [ [ AS ] alias [ ( column_alias [, ...] ) ] ]
    [ LATERAL ] function_name ( [ argument [, ...] ] )
                [ WITH ORDINALITY ] [ [ AS ] alias [ ( column_alias [, ...] ) ] ]
    [ LATERAL ] function_name ( [ argument [, ...] ] ) [ AS ] alias ( column_definition [, ...] )
    [ LATERAL ] function_name ( [ argument [, ...] ] ) AS ( column_definition [, ...] )
    [ LATERAL ] ROWS FROM( function_name ( [ argument [, ...] ] ) [ AS ( column_definition [, ...] ) ] [, ...] )
                [ WITH ORDINALITY ] [ [ AS ] alias [ ( column_alias [, ...] ) ] ]
    from_item join_type from_item { ON join_condition | USING ( join_column [, ...] ) [ AS join_using_alias ] }
    from_item NATURAL join_type from_item
    from_item CROSS JOIN from_item

and grouping_element can be one of:

    ( )
    expression
    ( expression [, ...] )
    ROLLUP ( { expression | ( expression [, ...] ) } [, ...] )
    CUBE ( { expression | ( expression [, ...] ) } [, ...] )
    GROUPING SETS ( grouping_element [, ...] )

and with_query is:

    with_query_name [ ( column_name [, ...] ) ] AS [ [ NOT ] MATERIALIZED ] ( select | values | insert | update | delete\
 | merge )
        [ SEARCH { BREADTH | DEPTH } FIRST BY column_name [, ...] SET search_seq_col_name ]
        [ CYCLE column_name [, ...] SET cycle_mark_col_name [ TO cycle_mark_value DEFAULT cycle_mark_default ] USING cyc\
le_path_col_name ]

TABLE [ ONLY ] table_name [ * ]`]];var va=0,l=null,xa=100,Ba="E",Ya=0,sn=0,on=1,Ae=0,An=2,Ve=5,Fe=0,Sn=4,qa=6,Fn=0,ka=1,Va="b",Xa="i",ja="a",Ja="e",Ka="r",
za="S",Qa="f",$a="T",Za="n",et="L",nt="a",at="d",tt="s",st="v",ge="r",be="i",it="S",Xe="t",je="v",pe="m",gn="c",Ne="f",Te="\
p",Se="I",Cn="n",Dn="s",ot=20,rt=21,lt=23,Et=26,ct=28,pt=29,Tt=5069,Rt=700,_t=701,At=790,gt=1700;function Ut(A,L){return typeof A==
"string"?A:St(A,L)}function Pt(A,L){return typeof A=="string"?`<p>${ce(A,!0)}</p>`:ft(A,L)}function Ft(A,L,C,P,w=!1,Y=null,k=1,V=B=>`\
https://www.postgresql.org/docs/19/${B}.html`){let B=!1;function Re(){B=!0,P=()=>{}}function re(){if(B)throw new Error("\
cancelled")}async function fe(){let _e=A.match(/^\\([?hdzsl]\S*)(.*)/);if(!_e)return P(`unsupported command: ${A}`),!1;let[
,J,oe]=_e;if(J=J.replace(/^lo_list/,"dl"),J=J.replace(/^z/,"dp"),J==="?")return P(Ct),!1;if(J==="h"){let o=(oe??"").trim().
toUpperCase().replace(/\s+/g," ");if(o==="")return P(`Available help:
`+we.map(i=>i[0]).join(`
`)),!1;{let i=o==="*"?we:we.filter(n=>n[0]===o);if(i.length===0&&(i=we.filter(n=>n[0].startsWith(o))),i.length===0){let n=o.
split(" ");for(let a=n.length;a>0;a--){let s=n.slice(0,a).join(" ");if(i=we.filter(e=>e[0].startsWith(s)),i.length>0)break}}
if(i.length===0)return P(`No help available for "${oe.trim()}".
Try \\h with no arguments to see available help.`),!1;for(let n of i)P(`Command:     ${n[0]}
Description: ${n[1]}
Syntax:
${n[3]}

URL: ${V(n[2])}`);return!1}}let u=async(o,i=!1)=>{re(),w&&!i&&P(`/**** INTERNAL QUERY ****/
${o}
/************************/`);let n=await C(o);return re(),n},E;try{if(!Y){let s=await u("SHOW server_version_num",!0);Y=
parseInt(s.rows[0][0],10)}let i=(J.startsWith("dx")?J.slice(2):J).indexOf("x")!==-1?1:0;E={sversion:Y,db:{dbName:L,sversion:Y,
std_strings:k,status:Fn,encoding:qa},popt:{topt:{default_footer:!0},nullPrint:"",expanded:i}};let n=[oe,0];if(await(J[0]===
"d"?qn(n,!0,J):J==="sf"||J==="sf+"||J==="sv"||J==="sv+"?Mn(n,!0,J,J[1]==="f"):J[0]==="l"?Yn(n,!0,J):Ae)===Ae)P(`invalid \
command \\${J}`);else{let s,e=[];for(;s=Pe(n,Fe,l,!0);)e.push(se('\\%s: extra argument "%s" ignored',J,s));e.length>0&&P(
e.join(`
`))}}catch(o){return P("ERROR:  "+o.message),B?null:!1}function M(o,...i){P(se(o,...i))}function U(o,i,n,a,s,e,c,f,S,T){
let F={},m={},D;if(b(F),D=de(E.db,o,i,n,a,s,e,c,f,F,m),m=m.value,S&&(S.value=D),m>=T)return M("improper qualified name (\
too many dotted names): %s",i),!1;if(T>1&&m==T-1){if(Pn(E.db)==l)return M("You are currently not connected to a database\
."),!1;if(H(Pn(E.db),F.data)!=0)return M("cross-database references are not implemented: %s",i),!1}return!0}function de(o,i,n,a,s,e,c,f,S,T,F){
let m={},D={},O=!1;return F||(F={}),F.value=0,n==l?(S&&(r(i,a?"  AND ":"WHERE "),a=!0,O=!0,p(i,`%s
`,S)),O):(b(m),b(D),ve(yn(o),e?T:l,e?m:l,D,n,s,!0,F),c&&D.len>2&&H(D.data,"^(.*)$")!=0&&(r(i,a?"  AND ":"WHERE "),a=!0,O=
!0,f?(p(i,"(%s OPERATOR(pg_catalog.~) ",c),Ge(i,D.data,o),Je(o)>=12e4&&r(i," COLLATE pg_catalog.default"),p(i,`
        OR %s OPERATOR(pg_catalog.~) `,f),Ge(i,D.data,o),Je(o)>=12e4&&r(i," COLLATE pg_catalog.default"),r(i,`)
`)):(p(i,"%s OPERATOR(pg_catalog.~) ",c),Ge(i,D.data,o),Je(o)>=12e4&&r(i," COLLATE pg_catalog.default"),K(i,`
`))),e&&m.len>2?H(m.data,"^(.*)$")!=0&&e&&(r(i,a?"  AND ":"WHERE "),a=!0,O=!0,p(i,"%s OPERATOR(pg_catalog.~) ",e),Ge(i,m.
data,o),Je(o)>=12e4&&r(i," COLLATE pg_catalog.default"),K(i,`
`)):S&&(r(i,a?"  AND ":"WHERE "),a=!0,O=!0,p(i,`%s
`,S)),O)}function ve(o,i,n,a,s,e,c,f){let S=[{},{},{}],T=0,F={},m={},D={},O,G,z;Me(s),Me(a),Me(!i||n),Me(f),f.value=0,O=
!1,z=s,i?D=2:n?D=1:D=0,m=S[T],c?(G=!0,b(F)):G=!1,b(m),r(m,"^(");let ee=0,Q;for(;(Q=z[ee])!=l;)Q=='"'?(O&&z[ee+1]=='"'?(K(
m,'"'),G&&K(F,'"'),ee++):O=!O,ee++):!O&&ut(Q)?(K(m,fn(Q)),G&&K(F,fn(Q)),ee++):!O&&Q=="*"?(r(m,".*"),G&&K(F,"*"),ee++):!O&&
Q=="?"?(K(m,"."),G&&K(F,"?"),ee++):!O&&Q=="."?(G=!1,f.value++,T<D?(r(m,")$"),m=S[++T],b(m),r(m,"^("),ee++):(K(m,Q),ee++)):
Q=="$"?(r(m,"\\$"),G&&K(F,"$"),ee++):(((O||e)&&Z("|*+?()[]{}.^$\\",Q)!=l||Q=="["&&z[ee+1]=="]")&&K(m,"\\"),G&&K(F,Q),K(m,
Q),ee++);r(m,")$"),a&&(r(a,m.data),m=S[--T]),n&&T>=0&&(r(n,m.data),m=S[--T]),i&&T>=0&&(c?r(i,F.data):r(i,m.data))}function Ke(o){
let i;switch(o){case rt:case lt:case ot:case Rt:case _t:case gt:case Et:case ct:case Tt:case pt:case At:i="r";break;default:
i="l";break}return i}function v(o,i,n,a,s){let e={},c,f,S;for(xe(e,i.topt,i.title,Hn(o),x(o)),Me(i.translate_columns==l||
i.translate_columns==null||i.n_translate_columns>=e.ncolumns),c=0;c<e.ncolumns;c++)ae(e,wn(o,c),i.translate_header,Ke(It(
o,c)));for(f=0;f<e.nrows;f++)for(S=0;S<e.ncolumns;S++){let T,F=!1,m;ie(o,f,S)?T=i.nullPrint?i.nullPrint:"":(T=g(o,f,S),e.
aligns[S]=="r"&&i.topt.numericLocale&&(T=format_numeric_locale(T),F=!0)),m=i.translate_columns&&i.translate_columns[S],j(
e,T,m,F)}if(i.footers)for(let T of i.footers)y(e,T);ze(e,n,a,s)}function xe(o,i,n,a,s){o.opt=i,o.title=n,o.ncolumns=a,o.
nrows=s,o.headers=[],o.cells=[],o.footers=l,o.aligns=[]}function ae(o,i,n,a){n&&(i=R(i)),o.headers.push(i),o.header=i,o.
aligns.push(a),o.align=a}function j(o,i,n,a){n&&(i=R(i)),o.cells.push(i),o.cell=i}function y(o,i){o.footers==l&&(o.footers=
[]),o.footers.push(i),o.footer=i}function te(o,i){o.footers&&o.footers.pop(),y(o,i)}function ze(o,i,n,a){P({...o},E)}async function Mn(o,i,n,a){
let s=An,e=Z(n,"+")!=l,c={},f,S={value:Ya},T=a?sn:on;return b(c),f=Pe(o,Sn,l,!0),f?await Wn(T,f,S)&&await vn(T,S.value,c)?
e?Gn(c.data,a):P(c.data):s=Ve:(M(a?"function name is required":"view name is required"),s=Ve),s}function Gn(o,i){let n=i,
a=0,s="";o=o.trimEnd().split(`
`);for(let e of o)n&&(We(e,"AS ",3)==0||We(e,"BEGIN ",6)==0||We(e,"RETURN ",7)==0)&&(n=!1),n||a++,n?s+=se(`        %s
`,e):s+=se(`%-7d %s
`,a,e);P(s)}async function Wn(o,i,n){let a=!0,s={};b(s);let e;switch(o){case sn:N(s,`/* %s */
`,R("Get function's OID")),r(s,"SELECT "),Ge(s,i,E.db),p(s,"::pg_catalog.%s::pg_catalog.oid",Z(i,"(")!==l?"regprocedure":
"regproc");break;case on:N(s,`/* %s */
`,R("Get view's OID")),r(s,"SELECT "),Ge(s,i,E.db),r(s,"::pg_catalog.regclass::pg_catalog.oid");break}try{e=await u(s.data),
e&&x(e)==1?n.value=Nn(g(e,0,0)):(M("Error when querying"),a=!1)}catch(c){M("ERROR:  "+c.message),a=!1}return a}async function vn(o,i,n){
let a=!0,s={};b(s);let e;switch(o){case sn:N(s,`/* %s */
`,R("Get function's definition")),p(s,"SELECT pg_catalog.pg_get_functiondef(%u)",i);break;case on:N(s,`/* %s */
`,R("Get view's definition and details")),E.sversion>=90400?p(s,"SELECT nspname, relname, relkind, pg_catalog.pg_get_vie\
wdef(c.oid, true), pg_catalog.array_remove(pg_catalog.array_remove(c.reloptions,'check_option=local'),'check_option=casc\
aded') AS reloptions, CASE WHEN 'check_option=local' = ANY (c.reloptions) THEN 'LOCAL'::text WHEN 'check_option=cascaded\
' = ANY (c.reloptions) THEN 'CASCADED'::text ELSE NULL END AS checkoption FROM pg_catalog.pg_class c LEFT JOIN pg_catalo\
g.pg_namespace n ON c.relnamespace = n.oid WHERE c.oid = %u",i):p(s,"SELECT nspname, relname, relkind, pg_catalog.pg_get\
_viewdef(c.oid, true), c.reloptions AS reloptions, NULL AS checkoption FROM pg_catalog.pg_class c LEFT JOIN pg_catalog.p\
g_namespace n ON c.relnamespace = n.oid WHERE c.oid = %u",i);break}if(e=await u(s.data),e&&x(e)==1){switch(rn(n),o){case sn:
r(n,g(e,0,0));break;case on:let c=g(e,0,0),f=g(e,0,1),S=g(e,0,2),T=g(e,0,3),F=g(e,0,4),m=g(e,0,5);S[0]===je?r(n,"CREATE \
OR REPLACE VIEW "):(M('"%s.%s" is not a view',c,f),a=!1),p(n,"%s.",He(c)),r(n,He(f)),F!=l&&he(F)>2&&(r(n,`
 WITH (`),xn(n,F,"",E.encoding,E.db.standard_strings)||(M("could not parse reloptions array"),a=!1),K(n,")")),p(n,` AS
%s`,T),n.len>0&&n.data[n.len-1]==";"&&(n.data=n.data.slice(0,n.len-1)),m&&m[0]!=l&&p(n,`
 WITH %s CHECK OPTION`,m);break}n.len>0&&n.data[n.len-1]!=`
`&&K(n,`
`)}else M("Error when querying"),a=!1;return a}function xn(o,i,n,a,s){let e=[],c={},f;if(!Bn(i,e,c))return!1;for(c=c.value,
f=0;f<c;f++){let S=e[f],[T,F]=S.split("=");F??(F=""),f>0&&r(o,", "),p(o,"%s%s=",n,He(T)),H(He(F),F)==0?r(o,F):On(o,F,a,s)}
return!0}function Bn(o,i,n){let a,s,e;if(a=he(o),n.value=0,a<2||o[0]!="{"||o[a-1]!="}")return!1;let c=0;for(c++,e=0;o[c]!=
"}";){if(o[c]==l)return!1;for(s="";o[c]!="}"&&o[c]!=",";){if(o[c]==l)return!1;if(o[c]!='"')s+=o[c++];else{for(c++;o[c]!=
'"';){if(o[c]==l||o[c]=="\\"&&(c++,o[c]==l))return!1;s+=o[c++]}c++}}i[e]=s,o[c]==","&&c++,e++}return o[c+1]&&o[c+1]!=l?!1:
(n.value=e,!0)}function He(o){let i={};b(i);let n=!1;return va?n=!0:o[0]>="a"&&o[0]<="z"||o[0]=="_"?/[^a-z0-9_]/.test(o)&&
(n=!0):n=!0,n||new Set(["all","analyse","analyze","and","any","array","as","asc","asymmetric","authorization","between",
"bigint","binary","bit","boolean","both","case","cast","char","character","check","coalesce","collate","collation","colu\
mn","concurrently","constraint","create","cross","current_catalog","current_date","current_role","current_schema","curre\
nt_time","current_timestamp","current_user","dec","decimal","default","deferrable","desc","distinct","do","else","end","\
except","exists","extract","false","fetch","float","for","foreign","freeze","from","full","grant","greatest","group","gr\
ouping","having","ilike","in","initially","inner","inout","int","integer","intersect","interval","into","is","isnull","j\
oin","json","json_array","json_arrayagg","json_object","json_objectagg","json_scalar","json_serialize","lateral","leadin\
g","least","left","like","limit","localtime","localtimestamp","national","natural","nchar","none","normalize","not","not\
null","null","nullif","numeric","offset","on","only","or","order","out","outer","overlaps","overlay","placing","position",
"precision","primary","real","references","returning","right","row","select","session_user","setof","similar","smallint",
"some","substring","symmetric","system_user","table","tablesample","then","time","timestamp","to","trailing","treat","tr\
im","true","union","unique","user","using","values","varchar","variadic","verbose","when","where","window","with","xmlat\
tributes","xmlconcat","xmlelement","xmlexists","xmlforest","xmlnamespaces","xmlparse","xmlpi","xmlroot","xmlserialize","\
xmltable"]).has(o)&&(n=!0),n?(K(i,'"'),K(i,o.replace(/"/g,'""')),K(i,'"')):r(i,o),i.data}async function Yn(o,i,n){let a,
s,e;return s=Pe(o,Fe,l,!0),e=Z(n,"+")!=l,a=await kn(s,e),a?An:Ve}async function qn(o,i,n){let a=An,s=!0,e,c,f;switch(e=Pe(
o,Fe,l,!0),c=Z(n,"+")!=l,f=Z(n,"S")!=l,n[1]){case void 0:case"+":case"S":e?(E.popt.expanded=0,s=await ea(e,c,f)):s=await Ln(
"tvmsE",l,c,f);break;case"A":{let S=l;switch(e&&n[2]!=l&&n[2]!="+"&&(S=Pe(o,Fe,l,!0)),n[2]){case void 0:case"+":case"x":
s=await Xn(e,c);break;case"c":s=await ha(e,S,c);break;case"f":s=await ya(e,S,c);break;case"o":s=await Ha(e,S,c);break;case"\
p":s=await wa(e,S,c);break;default:a=Ae;break}}break;case"a":s=await Vn(e,c,f);break;case"b":s=await jn(e,c);break;case"\
c":We(n,"dconfig",7)==0?s=await la(e,c,f):s=await ra(e,c,f);break;case"C":s=await pa(e,c);break;case"d":We(n,"ddp",3)==0?
s=await $n(e):s=await Zn(e,f);break;case"D":s=await oa(e,c,f);break;case"f":switch(n[2]){case void 0:case"+":case"S":case"\
a":case"n":case"p":case"t":case"w":case"x":s=await dn(o,n,e,c,f);break;default:a=Ae;break}break;case"g":s=await un(e,c,f);
break;case"l":s=await Ma(c);break;case"L":s=await ia(e,c,f);break;case"n":s=await Ra(e,c,f);break;case"o":s=await dn(o,n,
e,c,f);break;case"O":s=await Ta(e,c,f);break;case"p":s=await Qn(e,f);break;case"P":switch(n[2]){case void 0:case"+":case"\
t":case"i":case"n":case"x":s=await sa(n.slice(2),e,c);break;default:a=Ae;break}break;case"T":s=await Kn(e,c,f);break;case"\
t":case"v":case"m":case"i":case"s":case"E":s=await Ln(n[1],e,c,f);break;case"r":if(n[2]=="d"&&n[3]=="s"){let S=l;e&&(S=Pe(
o,Fe,l,!0)),s=await aa(e,S)}else n[2]=="g"?s=await ta(e,f):a=Ae;break;case"R":switch(n[2]){case"p":c?s=await Pa(e):s=await Ua(
e);break;case"s":s=await Fa(e,c);break;default:a=Ae}break;case"u":s=await un(e,c,f);break;case"F":switch(n[2]){case void 0:case"\
+":case"x":s=await ma(e,c);break;case"p":s=await _a(e,c);break;case"d":s=await Na(e,c);break;case"t":s=await Sa(e,c);break;default:
a=Ae;break}break;case"e":switch(n[2]){case"s":s=await ua(e,c);break;case"u":s=await La(e,c);break;case"w":s=await da(e,c);
break;case"t":s=await Ia(e,c);break;default:a=Ae;break}break;case"x":c?s=await Da(e):s=await Ca(e);break;case"X":s=await ca(
e,c);break;case"y":s=await Ea(e,c);break;default:a=Ae}return s||(a=Ve),a}async function dn(o,i,n,a,s){let e,c=[],f=0;if(n){
let S;for(;(S=Pe(o,Fe,l,!0))!=l&&(c[f++]=S,!(f>=xa)););}return i[1]=="f"?e=await Jn(i.slice(2),n,c,f,a,s):e=await zn(n,c,
f,a,s),e}async function kn(o,i){let n,a={},s=E.popt;return b(a),N(a,`/* %s */
`,R("Get matching databases")),p(a,`SELECT
  d.datname as "%s",
  pg_catalog.pg_get_userbyid(d.datdba) as "%s",
  pg_catalog.pg_encoding_to_char(d.encoding) as "%s",
`,t("Name"),t("Owner"),t("Encoding")),E.sversion>=15e4?p(a,`  CASE d.datlocprovider WHEN 'b' THEN 'builtin' WHEN 'c' THE\
N 'libc' WHEN 'i' THEN 'icu' END AS "%s",
`,t("Locale Provider")):p(a,`  'libc' AS "%s",
`,t("Locale Provider")),p(a,`  d.datcollate as "%s",
  d.datctype as "%s",
`,t("Collate"),t("Ctype")),E.sversion>=17e4?p(a,`  d.datlocale as "%s",
`,t("Locale")):E.sversion>=15e4?p(a,`  d.daticulocale as "%s",
`,t("Locale")):p(a,`  NULL as "%s",
`,t("Locale")),E.sversion>=16e4?p(a,`  d.daticurules as "%s",
`,t("ICU Rules")):p(a,`  NULL as "%s",
`,t("ICU Rules")),r(a,"  "),Ee(a,"d.datacl"),i&&p(a,`,
  CASE WHEN pg_catalog.has_database_privilege(d.datname, 'CONNECT')
       %s       THEN pg_catalog.pg_size_pretty(pg_catalog.pg_database_size(d.datname))
       ELSE 'No Access'
  END as "%s",
  t.spcname as "%s",
  pg_catalog.shobj_description(d.oid, 'pg_database') as "%s"`,E.sversion>=1e5?`OR pg_catalog.pg_has_role('pg_read_all_st\
ats', 'USAGE')
`:"",t("Size"),t("Tablespace"),t("Description")),r(a,`
FROM pg_catalog.pg_database d
`),i&&r(a,`  JOIN pg_catalog.pg_tablespace t on d.dattablespace = t.oid
`),o&&!U(a,o,!1,!1,l,"d.datname",l,l,l,1)||(r(a,"ORDER BY 1;"),n=await u(a.data),!n)?!1:(s.nullPrint=l,s.title=R("List o\
f databases"),s.translate_header=!0,v(n,s,E.queryFout,!1,E.logfile),!0)}async function Vn(o,i,n){let a={},s,e=E.popt;return b(
a),N(a,`/* %s */
`,R("Get matching aggregates")),p(a,`SELECT n.nspname as "%s",
  p.proname AS "%s",
  pg_catalog.format_type(p.prorettype, NULL) AS "%s",
  CASE WHEN p.pronargs = 0
    THEN CAST('*' AS pg_catalog.text)
    ELSE pg_catalog.pg_get_function_arguments(p.oid)
  END AS "%s",
`,t("Schema"),t("Name"),t("Result data type"),t("Argument data types")),E.sversion>=11e4?p(a,`  pg_catalog.obj_descripti\
on(p.oid, 'pg_proc') as "%s"
FROM pg_catalog.pg_proc p
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
WHERE p.prokind = 'a'
`,t("Description")):p(a,`  pg_catalog.obj_description(p.oid, 'pg_proc') as "%s"
FROM pg_catalog.pg_proc p
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
WHERE p.proisagg
`,t("Description")),!n&&!o&&r(a,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!U(a,o,!0,!1,"n.nspname","p.proname",l,"pg_catalog.pg_function_is_visible(p.oid)",l,3)||(r(a,"ORDER BY 1, 2, 4;"),s=await u(
a.data),!s)?!1:(e.nullPrint=l,e.title=R("List of aggregate functions"),e.translate_header=!0,v(s,e,E.queryFout,!1,E.logfile),
!0)}async function Xn(o,i){let n={},a,s=E.popt,e=[!1,!0,!1,!1];if(E.sversion<90600){let c;return M("The server (version \
%s) does not support access methods.",Ie(E.sversion,!1,c,Le(c))),!0}return b(n),N(n,`/* %s */
`,R("Get matching access methods")),p(n,`SELECT amname AS "%s",
  CASE amtype WHEN 'i' THEN '%s' WHEN 't' THEN '%s' END AS "%s"`,t("Name"),t("Index"),t("Table"),t("Type")),i&&p(n,`,
  amhandler AS "%s",
  pg_catalog.obj_description(oid, 'pg_am') AS "%s"`,t("Handler"),t("Description")),r(n,`
FROM pg_catalog.pg_am
`),!U(n,o,!1,!1,l,"amname",l,l,l,1)||(r(n,"ORDER BY 1;"),a=await u(n.data),!a)?!1:(s.nullPrint=l,s.title=R("List of acce\
ss methods"),s.translate_header=!0,s.translate_columns=e,s.n_translate_columns=$(e),v(a,s,E.queryFout,!1,E.logfile),!0)}
async function jn(o,i){let n={},a,s=E.popt;return b(n),N(n,`/* %s */
`,R("Get matching tablespaces")),p(n,`SELECT spcname AS "%s",
  pg_catalog.pg_get_userbyid(spcowner) AS "%s",
  pg_catalog.pg_tablespace_location(oid) AS "%s"`,t("Name"),t("Owner"),t("Location")),i&&(r(n,`,
  `),Ee(n,"spcacl"),p(n,`,
  spcoptions AS "%s",
  pg_catalog.pg_size_pretty(pg_catalog.pg_tablespace_size(oid)) AS "%s",
  pg_catalog.shobj_description(oid, 'pg_tablespace') AS "%s"`,t("Options"),t("Size"),t("Description"))),r(n,`
FROM pg_catalog.pg_tablespace
`),!U(n,o,!1,!1,l,"spcname",l,l,l,1)||(r(n,"ORDER BY 1;"),a=await u(n.data),!a)?!1:(s.nullPrint=l,s.title=R("List of tab\
lespaces"),s.translate_header=!0,v(a,s,E.queryFout,!1,E.logfile),!0)}async function Jn(o,i,n,a,s,e){let c="anptwSx+",f=Z(
o,"a")!=l,S=Z(o,"n")!=l,T=Z(o,"p")!=l,F=Z(o,"t")!=l,m=Z(o,"w")!=l,D,O={},G,z=E.popt,ee=[!1,!1,!1,!1,!0,!0,!0,!1,!0,!0,!1,
!1,!1,!1],Q=[!1,!1,!1,!1,!0,!0,!1,!0,!0,!1,!1,!1,!1];if(he(o)!=Ot(o,c))return M(`\\df only takes [${c}] as options`),!0;
if(T&&E.sversion<11e4){let X;return M('\\df does not take a "%c" option with server version %s',"p",Ie(E.sversion,!1,X,Le(
X))),!0}!f&&!S&&!T&&!F&&!m&&(f=S=F=m=!0,E.sversion>=11e4&&(T=!0)),b(O),N(O,`/* %s */
`,R("Get matching functions")),p(O,`SELECT n.nspname as "%s",
  p.proname as "%s",
`,t("Schema"),t("Name")),E.sversion>=11e4?p(O,`  pg_catalog.pg_get_function_result(p.oid) as "%s",
  pg_catalog.pg_get_function_arguments(p.oid) as "%s",
 CASE p.prokind
  WHEN 'a' THEN '%s'
  WHEN 'w' THEN '%s'
  WHEN 'p' THEN '%s'
  ELSE '%s'
 END as "%s"`,t("Result data type"),t("Argument data types"),t("agg"),t("window"),t("proc"),t("func"),t("Type")):p(O,`  \
pg_catalog.pg_get_function_result(p.oid) as "%s",
  pg_catalog.pg_get_function_arguments(p.oid) as "%s",
 CASE
  WHEN p.proisagg THEN '%s'
  WHEN p.proiswindow THEN '%s'
  WHEN p.prorettype = 'pg_catalog.trigger'::pg_catalog.regtype THEN '%s'
  ELSE '%s'
 END as "%s"`,t("Result data type"),t("Argument data types"),t("agg"),t("window"),t("trigger"),t("func"),t("Type")),s&&(p(
O,`,
 CASE
  WHEN p.provolatile = 'i' THEN '%s'
  WHEN p.provolatile = 's' THEN '%s'
  WHEN p.provolatile = 'v' THEN '%s'
 END as "%s"`,t("immutable"),t("stable"),t("volatile"),t("Volatility")),E.sversion>=90600&&p(O,`,
 CASE
  WHEN p.proparallel = 'r' THEN '%s'
  WHEN p.proparallel = 's' THEN '%s'
  WHEN p.proparallel = 'u' THEN '%s'
 END as "%s"`,t("restricted"),t("safe"),t("unsafe"),t("Parallel")),p(O,`,
 pg_catalog.pg_get_userbyid(p.proowner) as "%s",
 CASE WHEN prosecdef THEN '%s' ELSE '%s' END AS "%s",
 CASE WHEN p.proleakproof THEN '%s' ELSE '%s' END as "%s"`,t("Owner"),t("definer"),t("invoker"),t("Security"),t("yes"),t(
"no"),t("Leakproof?")),r(O,`,
 `),Ee(O,"p.proacl"),p(O,`,
 l.lanname as "%s"`,t("Language")),p(O,`,
 CASE WHEN l.lanname IN ('internal', 'c') THEN p.prosrc END as "%s"`,t("Internal name")),p(O,`,
 pg_catalog.obj_description(p.oid, 'pg_proc') as "%s"`,t("Description"))),r(O,`
FROM pg_catalog.pg_proc p
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
`);for(let X=0;X<a;X++)p(O,`     LEFT JOIN pg_catalog.pg_type t%d ON t%d.oid = p.proargtypes[%d]
     LEFT JOIN pg_catalog.pg_namespace nt%d ON nt%d.oid = t%d.typnamespace
`,X,X,X,X,X,X);if(s&&r(O,`     LEFT JOIN pg_catalog.pg_language l ON l.oid = p.prolang
`),D=!1,!(S&&f&&T&&F&&m))if(S)f||(D?r(O,"      AND "):(r(O,"WHERE "),D=!0),E.sversion>=11e4?r(O,`p.prokind <> 'a'
`):r(O,`NOT p.proisagg
`)),!T&&E.sversion>=11e4&&(D?r(O,"      AND "):(r(O,"WHERE "),D=!0),r(O,`p.prokind <> 'p'
`)),F||(D?r(O,"      AND "):(r(O,"WHERE "),D=!0),r(O,`p.prorettype <> 'pg_catalog.trigger'::pg_catalog.regtype
`)),m||(D?r(O,"      AND "):(r(O,"WHERE "),D=!0),E.sversion>=11e4?r(O,`p.prokind <> 'w'
`):r(O,`NOT p.proiswindow
`));else{let X=!1;r(O,`WHERE (
       `),D=!0,f&&(E.sversion>=11e4?r(O,`p.prokind = 'a'
`):r(O,`p.proisagg
`),X=!0),F&&(X&&r(O,"       OR "),r(O,`p.prorettype = 'pg_catalog.trigger'::pg_catalog.regtype
`),X=!0),T&&(X&&r(O,"       OR "),r(O,`p.prokind = 'p'
`),X=!0),m&&(X&&r(O,"       OR "),E.sversion>=11e4?r(O,`p.prokind = 'w'
`):r(O,`p.proiswindow
`)),r(O,`      )
`)}if(!U(O,i,D,!1,"n.nspname","p.proname",l,"pg_catalog.pg_function_is_visible(p.oid)",l,3))return!1;for(let X=0;X<a;X++)
if(H(n[X],"-")!=0){let Be,Ye,qe,De;if(Be=se("nt%d.nspname",X),Ye=se("t%d.typname",X),qe=se("pg_catalog.format_type(t%d.o\
id, NULL)",X),De=se("pg_catalog.pg_type_is_visible(t%d.oid)",X),!U(O,pn(n[X]),!0,!1,Be,Ye,qe,De,l,3))return!1}else p(O,`\
  AND t%d.typname IS NULL
`,X);return!e&&!i&&r(O,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),r(O,"ORDER BY 1, 2, 4;"),G=await u(O.data),G?(z.nullPrint=l,z.title=R("List of functions"),z.translate_header=!0,E.sversion>=
90600?(z.translate_columns=ee,z.n_translate_columns=$(ee)):(z.translate_columns=Q,z.n_translate_columns=$(Q)),v(G,z,E.queryFout,
!1,E.logfile),!0):!1}async function Kn(o,i,n){let a={},s,e=E.popt;return b(a),N(a,`/* %s */
`,R("Get matching types")),p(a,`SELECT n.nspname as "%s",
  pg_catalog.format_type(t.oid, NULL) AS "%s",
`,t("Schema"),t("Name")),i&&(p(a,`  t.typname AS "%s",
  CASE WHEN t.typrelid != 0
      THEN CAST('tuple' AS pg_catalog.text)
    WHEN t.typlen < 0
      THEN CAST('var' AS pg_catalog.text)
    ELSE CAST(t.typlen AS pg_catalog.text)
  END AS "%s",
  pg_catalog.array_to_string(
      ARRAY(
          SELECT e.enumlabel
          FROM pg_catalog.pg_enum e
          WHERE e.enumtypid = t.oid
          ORDER BY e.enumsortorder
      ),
      E'\\n'
  ) AS "%s",
  pg_catalog.pg_get_userbyid(t.typowner) AS "%s",
`,t("Internal name"),t("Size"),t("Elements"),t("Owner")),Ee(a,"t.typacl"),r(a,`,
  `)),p(a,`  pg_catalog.obj_description(t.oid, 'pg_type') as "%s"
`,t("Description")),r(a,`FROM pg_catalog.pg_type t
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
`),r(a,"WHERE (t.typrelid = 0 "),r(a,`OR (SELECT c.relkind = 'c' FROM pg_catalog.pg_class c WHERE c.oid = t.typrelid))
`),(o==l||En(o,"[]")==l)&&r(a,`  AND NOT EXISTS(SELECT 1 FROM pg_catalog.pg_type el WHERE el.oid = t.typelem AND el.typa\
rray = t.oid)
`),!n&&!o&&r(a,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!U(a,pn(o),!0,!1,"n.nspname","t.typname","pg_catalog.format_type(t.oid, NULL)","pg_catalog.pg_type_is_visible(t.oid)",
l,3)||(r(a,"ORDER BY 1, 2;"),s=await u(a.data),!s)?!1:(e.nullPrint=l,e.title=R("List of data types"),e.translate_header=
!0,v(s,e,E.queryFout,!1,E.logfile),!0)}function pn(o){let i=["decimal","numeric","float","double precision","int","integ\
er","bool[]","boolean[]","decimal[]","numeric[]","float[]","double precision[]","float4[]","real[]","float8[]","double p\
recision[]","int[]","integer[]","int2[]","smallint[]","int4[]","integer[]","int8[]","bigint[]","time[]","time without ti\
me zone[]","timetz[]","time with time zone[]","timestamp[]","timestamp without time zone[]","timestamptz[]","timestamp w\
ith time zone[]","varbit[]","bit varying[]","varchar[]","character varying[]",l];if(o==l)return l;for(let n=0;i[n]!=l;n+=
2)if(Lt(o,i[n])==0)return i[n+1];return o}async function zn(o,i,n,a,s){let e={},c,f=E.popt,S=[!1,!1,!1,!1,!1,!1,!0,!1];if(b(
e),N(e,`/* %s */
`,R("Get matching operators")),p(e,`SELECT n.nspname as "%s",
  o.oprname AS "%s",
  CASE WHEN o.oprkind='l' THEN NULL ELSE pg_catalog.format_type(o.oprleft, NULL) END AS "%s",
  CASE WHEN o.oprkind='r' THEN NULL ELSE pg_catalog.format_type(o.oprright, NULL) END AS "%s",
  pg_catalog.format_type(o.oprresult, NULL) AS "%s",
`,t("Schema"),t("Name"),t("Left arg type"),t("Right arg type"),t("Result type")),a&&p(e,`  o.oprcode AS "%s",
  CASE WHEN p.proleakproof THEN '%s' ELSE '%s' END AS "%s",
`,t("Function"),t("yes"),t("no"),t("Leakproof?")),p(e,`  coalesce(pg_catalog.obj_description(o.oid, 'pg_operator'),
           pg_catalog.obj_description(o.oprcode, 'pg_proc')) AS "%s"
FROM pg_catalog.pg_operator o
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = o.oprnamespace
`,t("Description")),n>=2?(n=2,r(e,`     LEFT JOIN pg_catalog.pg_type t0 ON t0.oid = o.oprleft
     LEFT JOIN pg_catalog.pg_namespace nt0 ON nt0.oid = t0.typnamespace
     LEFT JOIN pg_catalog.pg_type t1 ON t1.oid = o.oprright
     LEFT JOIN pg_catalog.pg_namespace nt1 ON nt1.oid = t1.typnamespace
`)):n==1&&r(e,`     LEFT JOIN pg_catalog.pg_type t0 ON t0.oid = o.oprright
     LEFT JOIN pg_catalog.pg_namespace nt0 ON nt0.oid = t0.typnamespace
`),a&&r(e,`     LEFT JOIN pg_catalog.pg_proc p ON p.oid = o.oprcode
`),!s&&!o&&r(e,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!U(e,o,!s&&!o,!0,"n.nspname","o.oprname",l,"pg_catalog.pg_operator_is_visible(o.oid)",l,3))return!1;n==1&&r(e,`  AND \
o.oprleft = 0
`);for(let T=0;T<n;T++)if(H(i[T],"-")!=0){let F,m,D,O;if(F=se("nt%d.nspname",T),m=se("t%d.typname",T),D=se("pg_catalog.f\
ormat_type(t%d.oid, NULL)",T),O=se("pg_catalog.pg_type_is_visible(t%d.oid)",T),!U(e,pn(i[T]),!0,!1,F,m,D,O,l,3))return!1}else
p(e,`  AND t%d.typname IS NULL
`,T);return r(e,"ORDER BY 1, 2, 3, 4;"),c=await u(e.data),c?(f.nullPrint=l,f.title=R("List of operators"),f.translate_header=
!0,f.translate_columns=S,f.n_translate_columns=$(S),v(c,f,E.queryFout,!1,E.logfile),!0):!1}async function Qn(o,i){let n={},
a,s=E.popt,e=[!1,!1,!0,!1,!1,!1];return b(n),N(n,`/* %s */
`,R("Get access privileges of matching relations")),p(n,`SELECT n.nspname as "%s",
  c.relname as "%s",
  CASE c.relkind WHEN 'r' THEN '%s' WHEN 'v' THEN '%s' WHEN 'm' THEN '%s' WHEN 'S' THEN '%s' WHEN 'f' THEN '%s' WHEN 'p'\
 THEN '%s' END as "%s",
  `,t("Schema"),t("Name"),t("table"),t("view"),t("materialized view"),t("sequence"),t("foreign table"),t("partitioned ta\
ble"),t("Type")),Ee(n,"c.relacl"),p(n,`,
  pg_catalog.array_to_string(ARRAY(
    SELECT attname || E':\\n  ' || pg_catalog.array_to_string(attacl, E'\\n  ')
    FROM pg_catalog.pg_attribute a
    WHERE attrelid = c.oid AND NOT attisdropped AND attacl IS NOT NULL
  ), E'\\n') AS "%s"`,t("Column privileges")),E.sversion>=90500&&E.sversion<1e5&&p(n,`,
  pg_catalog.array_to_string(ARRAY(
    SELECT polname
    || CASE WHEN polcmd != '*' THEN
           E' (' || polcmd::pg_catalog.text || E'):'
       ELSE E':'
       END
    || CASE WHEN polqual IS NOT NULL THEN
           E'\\n  (u): ' || pg_catalog.pg_get_expr(polqual, polrelid)
       ELSE E''
       END
    || CASE WHEN polwithcheck IS NOT NULL THEN
           E'\\n  (c): ' || pg_catalog.pg_get_expr(polwithcheck, polrelid)
       ELSE E''
       END    || CASE WHEN polroles <> '{0}' THEN
           E'\\n  to: ' || pg_catalog.array_to_string(
               ARRAY(
                   SELECT rolname
                   FROM pg_catalog.pg_roles
                   WHERE oid = ANY (polroles)
                   ORDER BY 1
               ), E', ')
       ELSE E''
       END
    FROM pg_catalog.pg_policy pol
    WHERE polrelid = c.oid), E'\\n')
    AS "%s"`,t("Policies")),E.sversion>=1e5&&p(n,`,
  pg_catalog.array_to_string(ARRAY(
    SELECT polname
    || CASE WHEN NOT polpermissive THEN
       E' (RESTRICTIVE)'
       ELSE '' END
    || CASE WHEN polcmd != '*' THEN
           E' (' || polcmd::pg_catalog.text || E'):'
       ELSE E':'
       END
    || CASE WHEN polqual IS NOT NULL THEN
           E'\\n  (u): ' || pg_catalog.pg_get_expr(polqual, polrelid)
       ELSE E''
       END
    || CASE WHEN polwithcheck IS NOT NULL THEN
           E'\\n  (c): ' || pg_catalog.pg_get_expr(polwithcheck, polrelid)
       ELSE E''
       END    || CASE WHEN polroles <> '{0}' THEN
           E'\\n  to: ' || pg_catalog.array_to_string(
               ARRAY(
                   SELECT rolname
                   FROM pg_catalog.pg_roles
                   WHERE oid = ANY (polroles)
                   ORDER BY 1
               ), E', ')
       ELSE E''
       END
    FROM pg_catalog.pg_policy pol
    WHERE polrelid = c.oid), E'\\n')
    AS "%s"`,t("Policies")),r(n,`
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
WHERE c.relkind IN ('r','v','m','S','f','p')
`),!i&&!o&&r(n,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!U(n,o,!0,!1,"n.nspname","c.relname",l,"pg_catalog.pg_table_is_visible(c.oid)",l,3)||(r(n,"ORDER BY 1, 2;"),a=await u(
n.data),!a)?!1:(s.nullPrint=l,N(n,R("Access privileges")),s.title=n.data,s.translate_header=!0,s.translate_columns=e,s.n_translate_columns=
$(e),v(a,s,E.queryFout,!1,E.logfile),!0)}async function $n(o){let i={},n,a=E.popt,s=[!1,!1,!0,!1];return b(i),N(i,`/* %s\
 */
`,R("Get matching default ACLs")),p(i,`SELECT pg_catalog.pg_get_userbyid(d.defaclrole) AS "%s",
  n.nspname AS "%s",
  CASE d.defaclobjtype     WHEN '%c' THEN '%s' WHEN '%c' THEN '%s' WHEN '%c' THEN '%s'    WHEN '%c' THEN '%s' WHEN '%c' \
THEN '%s' WHEN '%c' THEN '%s' END AS "%s",
  `,t("Owner"),t("Schema"),Ka,t("table"),za,t("sequence"),Qa,t("function"),$a,t("type"),Za,t("schema"),et,t("large objec\
t"),t("Type")),Ee(i,"d.defaclacl"),r(i,`
FROM pg_catalog.pg_default_acl d
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = d.defaclnamespace
`),!U(i,o,!1,!1,l,"n.nspname","pg_catalog.pg_get_userbyid(d.defaclrole)",l,l,3)||(r(i,"ORDER BY 1, 2, 3;"),n=await u(i.data),
!n)?!1:(a.nullPrint=l,N(i,R("Default access privileges")),a.title=i.data,a.translate_header=!0,a.translate_columns=s,a.n_translate_columns=
$(s),v(n,a,E.queryFout,!1,E.logfile),!0)}async function Zn(o,i){let n={},a,s=E.popt,e=[!1,!1,!0,!1];return b(n),N(n,`/* \
%s */
`,R("Get matching object comments")),p(n,`SELECT DISTINCT tt.nspname AS "%s", tt.name AS "%s", tt.object AS "%s", d.desc\
ription AS "%s"
FROM (
`,t("Schema"),t("Name"),t("Object"),t("Description")),p(n,`  SELECT pgc.oid as oid, pgc.tableoid AS tableoid,
  n.nspname as nspname,
  CAST(pgc.conname AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_constraint pgc
    JOIN pg_catalog.pg_class c ON c.oid = pgc.conrelid
    LEFT JOIN pg_catalog.pg_namespace n     ON n.oid = c.relnamespace
`,t("table constraint")),!i&&!o&&r(n,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!U(n,o,!i&&!o,!1,"n.nspname","pgc.conname",l,"pg_catalog.pg_table_is_visible(c.oid)",l,3)||(p(n,`UNION ALL
  SELECT pgc.oid as oid, pgc.tableoid AS tableoid,
  n.nspname as nspname,
  CAST(pgc.conname AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_constraint pgc
    JOIN pg_catalog.pg_type t ON t.oid = pgc.contypid
    LEFT JOIN pg_catalog.pg_namespace n     ON n.oid = t.typnamespace
`,t("domain constraint")),!i&&!o&&r(n,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!U(n,o,!i&&!o,!1,"n.nspname","pgc.conname",l,"pg_catalog.pg_type_is_visible(t.oid)",l,3))||(p(n,`UNION ALL
  SELECT o.oid as oid, o.tableoid as tableoid,
  n.nspname as nspname,
  CAST(o.opcname AS pg_catalog.text) as name,
  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_opclass o
    JOIN pg_catalog.pg_am am ON o.opcmethod = am.oid
    JOIN pg_catalog.pg_namespace n ON n.oid = o.opcnamespace
`,t("operator class")),!i&&!o&&r(n,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!U(n,o,!0,!1,"n.nspname","o.opcname",l,"pg_catalog.pg_opclass_is_visible(o.oid)",l,3))||(p(n,`UNION ALL
  SELECT opf.oid as oid, opf.tableoid as tableoid,
  n.nspname as nspname,
  CAST(opf.opfname AS pg_catalog.text) AS name,
  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_opfamily opf
    JOIN pg_catalog.pg_am am ON opf.opfmethod = am.oid
    JOIN pg_catalog.pg_namespace n ON opf.opfnamespace = n.oid
`,t("operator family")),!i&&!o&&r(n,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!U(n,o,!0,!1,"n.nspname","opf.opfname",l,"pg_catalog.pg_opfamily_is_visible(opf.oid)",l,3))||(p(n,`UNION ALL
  SELECT r.oid as oid, r.tableoid as tableoid,
  n.nspname as nspname,
  CAST(r.rulename AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_rewrite r
       JOIN pg_catalog.pg_class c ON c.oid = r.ev_class
       LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
  WHERE r.rulename != '_RETURN'
`,t("rule")),!i&&!o&&r(n,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!U(n,o,!0,!1,"n.nspname","r.rulename",l,"pg_catalog.pg_table_is_visible(c.oid)",l,3))||(p(n,`UNION ALL
  SELECT t.oid as oid, t.tableoid as tableoid,
  n.nspname as nspname,
  CAST(t.tgname AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_trigger t
       JOIN pg_catalog.pg_class c ON c.oid = t.tgrelid
       LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
`,t("trigger")),!i&&!o&&r(n,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!U(n,o,!i&&!o,!1,"n.nspname","t.tgname",l,"pg_catalog.pg_table_is_visible(c.oid)",l,3))||(r(n,`) AS tt
  JOIN pg_catalog.pg_description d ON (tt.oid = d.objoid AND tt.tableoid = d.classoid AND d.objsubid = 0)
`),r(n,"ORDER BY 1, 2, 3;"),a=await u(n.data),!a)?!1:(s.nullPrint=l,s.title=R("Object descriptions"),s.translate_header=
!0,s.translate_columns=e,s.n_translate_columns=$(e),v(a,s,E.queryFout,!1,E.logfile),!0)}async function ea(o,i,n){let a={},
s,e;if(b(a),N(a,`/* %s */
`,R("Get matching relations to describe")),r(a,`SELECT c.oid,
  n.nspname,
  c.relname
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
`),!n&&!o&&r(a,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!U(a,o,!n&&!o,!1,"n.nspname","c.relname",l,"pg_catalog.pg_table_is_visible(c.oid)",l,3)||(r(a,"ORDER BY 2, 3;"),s=await u(
a.data),!s))return!1;if(x(s)==0)return E.quiet||(o?M('Did not find any relation named "%s".',o):M("Did not find any rela\
tions.")),!1;for(e=0;e<x(s);e++){let c,f,S;if(c=g(s,e,0),f=g(s,e,1),S=g(s,e,2),!await na(f,S,c,i)||B)return!1}return!0}async function na(o,i,n,a){
let s=!1,e={},c=l,f=E.popt.topt,S={},T,F=l,m=[],D={},O={},G,z=-1,ee=-1,Q=-1,X=-1,Be=-1,Ye=-1,qe=-1,De=-1,Qe=-1,$e=-1,Ze=-1,
en=-1,nn=-1,an=-1,_n,d={},tn=!1;if(f.default_footer=!1,f.expanded=!1,b(e),b(D),b(O),N(e,`/* %s */
`,R("Get general information about one relation")),E.sversion>=12e4?p(e,`SELECT c.relchecks, c.relkind, c.relhasindex, c\
.relhasrules, c.relhastriggers, c.relrowsecurity, c.relforcerowsecurity, false AS relhasoids, c.relispartition, %s, c.re\
ltablespace, CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersisten\
ce, c.relreplident, am.amname
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
LEFT JOIN pg_catalog.pg_am am ON (c.relam = am.oid)
WHERE c.oid = '%s';`,a?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",n):E.sversion>=1e5?p(e,`SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, c.relrowse\
curity, c.relforcerowsecurity, c.relhasoids, c.relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN '' EL\
SE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
WHERE c.oid = '%s';`,a?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",n):E.sversion>=90500?p(e,`SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, c.relrow\
security, c.relforcerowsecurity, c.relhasoids, false as relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 T\
HEN '' ELSE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
WHERE c.oid = '%s';`,a?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",n):E.sversion>=90400?p(e,`SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, false, f\
alse, c.relhasoids, false as relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg\
_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
WHERE c.oid = '%s';`,a?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",n):p(e,`SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, false, false, c.relhasoids\
, false as relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg_catalog.regtype::\
pg_catalog.text END, c.relpersistence
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
WHERE c.oid = '%s';`,a?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",n),c=await u(e.data),!c)return s;if(x(c)==0)return E.quiet||M("Did not find any relation with OID %s.",n),s;if(d.
checks=bn(g(c,0,0)),d.relkind=g(c,0,1),d.hasindex=H(g(c,0,2),"t")==0,d.hasrules=H(g(c,0,3),"t")==0,d.hastriggers=H(g(c,0,
4),"t")==0,d.rowsecurity=H(g(c,0,5),"t")==0,d.forcerowsecurity=H(g(c,0,6),"t")==0,d.hasoids=H(g(c,0,7),"t")==0,d.ispartition=
H(g(c,0,8),"t")==0,d.reloptions=me(g(c,0,9)),d.tablespace=Nn(g(c,0,10)),d.reloftype=H(g(c,0,11),"")!=0?me(g(c,0,11)):l,d.
relpersistence=g(c,0,12),d.relreplident=E.sversion>=90400?g(c,0,13):"d",E.sversion>=12e4?d.relam=ie(c,0,14)?l:me(g(c,0,14)):
d.relam=l,c=l,d.relkind==it){let _=l,I=E.popt,h=[l,l,l];if(N(e,`/* %s */
`,R("Get sequence information")),E.sversion>=1e5?(p(e,`SELECT pg_catalog.format_type(seqtypid, NULL) AS "%s",
       seqstart AS "%s",
       seqmin AS "%s",
       seqmax AS "%s",
       seqincrement AS "%s",
       CASE WHEN seqcycle THEN '%s' ELSE '%s' END AS "%s",
       seqcache AS "%s"
`,t("Type"),t("Start"),t("Minimum"),t("Maximum"),t("Increment"),t("yes"),t("no"),t("Cycles?"),t("Cache")),p(e,`FROM pg_c\
atalog.pg_sequence
WHERE seqrelid = '%s';`,n)):(p(e,`SELECT 'bigint' AS "%s",
       start_value AS "%s",
       min_value AS "%s",
       max_value AS "%s",
       increment_by AS "%s",
       CASE WHEN is_cycled THEN '%s' ELSE '%s' END AS "%s",
       cache_value AS "%s"
`,t("Type"),t("Start"),t("Minimum"),t("Maximum"),t("Increment"),t("yes"),t("no"),t("Cycles?"),t("Cache")),p(e,"FROM %s",
He(o)),p(e,".%s;",He(i))),c=await u(e.data),!c)return s;if(N(e,`/* %s */
`,R("Get the column that owns this sequence")),p(e,`SELECT pg_catalog.quote_ident(nspname) || '.' ||
   pg_catalog.quote_ident(relname) || '.' ||
   pg_catalog.quote_ident(attname),
   d.deptype
FROM pg_catalog.pg_class c
INNER JOIN pg_catalog.pg_depend d ON c.oid=d.refobjid
INNER JOIN pg_catalog.pg_namespace n ON n.oid=c.relnamespace
INNER JOIN pg_catalog.pg_attribute a ON (
 a.attrelid=c.oid AND
 a.attnum=d.refobjsubid)
WHERE d.classid='pg_catalog.pg_class'::pg_catalog.regclass
 AND d.refclassid='pg_catalog.pg_class'::pg_catalog.regclass
 AND d.objid='%s'
 AND d.deptype IN ('a', 'i')`,n),_=await u(e.data),_){if(x(_)==1)switch(g(_,0,1)[0]){case"a":h[0]=ln(R("Owned by: %s"),g(
_,0,0));break;case"i":h[0]=ln(R("Sequence for identity column: %s"),g(_,0,0));break}}else return s;if(E.sversion>=19e4&&
(N(e,`/* %s */
`,R("Get publications containing this sequence")),p(e,`SELECT pubname FROM pg_catalog.pg_publication p
WHERE p.puballsequences
 AND pg_catalog.pg_relation_is_publishable('%s')
ORDER BY 1`,n),_=await u(e.data),_)){let W=x(_);if(W>0){for(N(O,R("Included in publications:")),T=0;T<W;T++)p(O,`
    "%s"`,g(_,T,0));h[0]==l?h[0]=me(O.data):h[1]=me(O.data),rn(O)}}return d.relpersistence=="u"?N(D,R('Unlogged sequence\
 "%s.%s"'),o,i):N(D,R('Sequence "%s.%s"'),o,i),I.footers=h,I.topt.default_footer=!1,I.title=D.data,I.translate_header=!0,
v(c,I,E.queryFout,!1,E.logfile),s=!0,s}if((d.relkind==ge||d.relkind==je||d.relkind==pe||d.relkind==Ne||d.relkind==gn||d.
relkind==Te)&&(tn=!0),G=0,N(e,`/* %s */
`,R("Get per-column information for one relation")),r(e,"SELECT a.attname"),z=G++,r(e,`,
  pg_catalog.format_type(a.atttypid, a.atttypmod)`),ee=G++,tn&&(r(e,`,
  (SELECT pg_catalog.pg_get_expr(d.adbin, d.adrelid, true)
   FROM pg_catalog.pg_attrdef d
   WHERE d.adrelid = a.attrelid AND d.adnum = a.attnum AND a.atthasdef),
  a.attnotnull`),Q=G++,X=G++,r(e,`,
  (SELECT c.collname FROM pg_catalog.pg_collation c, pg_catalog.pg_type t
   WHERE c.oid = a.attcollation AND t.oid = a.atttypid AND a.attcollation <> t.typcollation) AS attcollation`),Be=G++,E.
sversion>=1e5?r(e,`,
  a.attidentity`):r(e,`,
  ''::pg_catalog.char AS attidentity`),Ye=G++,E.sversion>=12e4?r(e,`,
  a.attgenerated`):r(e,`,
  ''::pg_catalog.char AS attgenerated`),qe=G++),(d.relkind==be||d.relkind==Se)&&(E.sversion>=11e4&&(p(e,`,
  CASE WHEN a.attnum <= (SELECT i.indnkeyatts FROM pg_catalog.pg_index i WHERE i.indexrelid = '%s') THEN '%s' ELSE '%s' \
END AS is_key`,n,t("yes"),t("no")),De=G++),r(e,`,
  pg_catalog.pg_get_indexdef(a.attrelid, a.attnum, TRUE) AS indexdef`),Qe=G++),d.relkind==Ne&&(r(e,`,
  CASE WHEN attfdwoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT pg_catalog.quote_ident(o\
ption_name) || ' ' || pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(attfdwoptions)), ', \
') || ')' END AS attfdwoptions`),$e=G++),a&&(r(e,`,
  a.attstorage`),Ze=G++,E.sversion>=14e4&&!E.hide_compression&&(d.relkind==ge||d.relkind==Te||d.relkind==pe)&&(r(e,`,
  a.attcompression AS attcompression`),en=G++),(d.relkind==ge||d.relkind==be||d.relkind==Se||d.relkind==pe||d.relkind==Ne||
d.relkind==Te)&&(r(e,`,
  CASE WHEN a.attstattarget=-1 THEN NULL ELSE a.attstattarget END AS attstattarget`),nn=G++),(d.relkind==ge||d.relkind==
je||d.relkind==pe||d.relkind==Ne||d.relkind==gn||d.relkind==Te)&&(r(e,`,
  pg_catalog.col_description(a.attrelid, a.attnum)`),an=G++)),r(e,`
FROM pg_catalog.pg_attribute a`),p(e,`
WHERE a.attrelid = '%s' AND a.attnum > 0 AND NOT a.attisdropped`,n),r(e,`
ORDER BY a.attnum;`),c=await u(e.data),!c)return s;switch(_n=x(c),d.relkind){case ge:d.relpersistence=="u"?N(D,R('Unlogg\
ed table "%s.%s"'),o,i):N(D,R('Table "%s.%s"'),o,i);break;case je:N(D,R('View "%s.%s"'),o,i);break;case pe:N(D,R('Materi\
alized view "%s.%s"'),o,i);break;case be:d.relpersistence=="u"?N(D,R('Unlogged index "%s.%s"'),o,i):N(D,R('Index "%s.%s"'),
o,i);break;case Se:d.relpersistence=="u"?N(D,R('Unlogged partitioned index "%s.%s"'),o,i):N(D,R('Partitioned index "%s.%\
s"'),o,i);break;case Xe:N(D,R('TOAST table "%s.%s"'),o,i);break;case gn:N(D,R('Composite type "%s.%s"'),o,i);break;case Ne:
N(D,R('Foreign table "%s.%s"'),o,i);break;case Te:d.relpersistence=="u"?N(D,R('Unlogged partitioned table "%s.%s"'),o,i):
N(D,R('Partitioned table "%s.%s"'),o,i);break;default:N(D,'?%c? "%s.%s"',d.relkind,o,i);break}for(G=0,m[G++]=t("Column"),
m[G++]=t("Type"),tn&&(m[G++]=t("Collation"),m[G++]=t("Nullable"),m[G++]=t("Default")),De>=0&&(m[G++]=t("Key?")),Qe>=0&&(m[G++]=
t("Definition")),$e>=0&&(m[G++]=t("FDW options")),Ze>=0&&(m[G++]=t("Storage")),en>=0&&(m[G++]=t("Compression")),nn>=0&&(m[G++]=
t("Stats target")),an>=0&&(m[G++]=t("Description")),Me(G<=$(m)),xe(S,f,D.data,G,_n),T=0;T<G;T++)ae(S,m[T],!0,"l");for(T=
0;T<_n;T++){if(j(S,g(c,T,z),!1,!1),j(S,g(c,T,ee),!1,!1),tn){let _,I,h,W=!1;j(S,g(c,T,Be),!1,!1),j(S,H(g(c,T,X),"t")==0?"\
not null":"",!1,!1),_=g(c,T,Ye),I=g(c,T,qe),_[0]==nt?h="generated always as identity":_[0]==at?h="generated by default a\
s identity":I[0]==tt?(h=ln("generated always as (%s) stored",g(c,T,Q)),W=!0):I[0]==st?(h=ln("generated always as (%s)",g(
c,T,Q)),W=!0):h=g(c,T,Q),j(S,h,!1,W)}if(De>=0&&j(S,g(c,T,De),!0,!1),Qe>=0&&j(S,g(c,T,Qe),!1,!1),$e>=0&&j(S,g(c,T,$e),!1,
!1),Ze>=0){let _=g(c,T,Ze);j(S,_[0]=="p"?"plain":_[0]=="m"?"main":_[0]=="x"?"extended":_[0]=="e"?"external":"???",!1,!1)}
if(en>=0){let _=g(c,T,en);j(S,_[0]=="p"?"pglz":_[0]=="l"?"lz4":_[0]==l?"":"???",!1,!1)}nn>=0&&j(S,g(c,T,nn),!1,!1),an>=0&&
j(S,g(c,T,an),!1,!1)}if(d.ispartition){let _;if(N(e,`/* %s */
`,R("Get partitioning information for this partition")),r(e,`SELECT inhparent::pg_catalog.regclass,
  pg_catalog.pg_get_expr(c.relpartbound, c.oid),
  `),r(e,E.sversion>=14e4?"inhdetachpending":"false as inhdetachpending"),a&&r(e,`,
  pg_catalog.pg_get_partition_constraintdef(c.oid)`),p(e,`
FROM pg_catalog.pg_class c JOIN pg_catalog.pg_inherits i ON c.oid = inhrelid
WHERE c.oid = '%s';`,n),_=await u(e.data),!_)return s;if(x(_)>0){let I=g(_,0,0),h=g(_,0,1),W=g(_,0,2);if(N(O,R("Partitio\
n of: %s %s%s"),I,h,H(W,"t")==0?" DETACH PENDING":""),y(S,O.data),a){let q=l;ie(_,0,3)||(q=g(_,0,3)),q==l||q[0]==l?N(O,R(
"No partition constraint")):N(O,R("Partition constraint: %s"),q),y(S,O.data)}}}if(d.relkind==Te){let _;if(N(e,`/* %s */
`,R("Get partitioning information for this table")),p(e,"SELECT pg_catalog.pg_get_partkeydef('%s'::pg_catalog.oid);",n),
_=await u(e.data),!_)return s;if(x(_)==1){let I=g(_,0,0);N(O,R("Partition key: %s"),I),y(S,O.data)}}if(d.relkind==Xe){let _;
if(N(e,`/* %s */
`,R("Get the table that owns this TOAST table")),p(e,`SELECT n.nspname, c.relname
FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
WHERE reltoastrelid = '%s';`,n),_=await u(e.data),!_)return s;if(x(_)==1){let I=g(_,0,0),h=g(_,0,1);N(O,R('Owning table:\
 "%s.%s"'),I,h),y(S,O.data)}}if(d.relkind==be||d.relkind==Se){let _;if(N(e,`/* %s */
`,R("Get index details")),r(e,`SELECT i.indisunique, i.indisprimary, i.indisclustered, i.indisvalid,
  (NOT i.indimmediate) AND EXISTS (SELECT 1 FROM pg_catalog.pg_constraint WHERE conrelid = i.indrelid AND conindid = i.i\
ndexrelid AND contype IN ('p','u','x') AND condeferrable) AS condeferrable,
  (NOT i.indimmediate) AND EXISTS (SELECT 1 FROM pg_catalog.pg_constraint WHERE conrelid = i.indrelid AND conindid = i.i\
ndexrelid AND contype IN ('p','u','x') AND condeferred) AS condeferred,
`),E.sversion>=90400?r(e,`i.indisreplident,
`):r(e,`false AS indisreplident,
`),E.sversion>=15e4?r(e,`i.indnullsnotdistinct,
`):r(e,`false AS indnullsnotdistinct,
`),p(e,`  a.amname, c2.relname, pg_catalog.pg_get_expr(i.indpred, i.indrelid, true)
FROM pg_catalog.pg_index i, pg_catalog.pg_class c, pg_catalog.pg_class c2, pg_catalog.pg_am a
WHERE i.indexrelid = c.oid AND c.oid = '%s' AND c.relam = a.oid
AND i.indrelid = c2.oid;`,n),_=await u(e.data),_){if(x(_)!=1)return s;{let I=g(_,0,0),h=g(_,0,1),W=g(_,0,2),q=g(_,0,3),ne=g(
_,0,4),ue=g(_,0,5),le=g(_,0,6),ke=g(_,0,7),Ga=g(_,0,8),Wa=g(_,0,9),In=g(_,0,10);H(h,"t")==0?N(O,R("primary key, ")):H(I,
"t")==0?H(ke,"t")==0?N(O,R("unique nulls not distinct, ")):N(O,R("unique, ")):rn(O),p(O,R('%s, for table "%s.%s"'),Ga,o,
Wa),he(In)&&p(O,R(", predicate (%s)"),In),H(W,"t")==0&&r(O,R(", clustered")),H(q,"t")!=0&&r(O,R(", invalid")),H(ne,"t")==
0&&r(O,R(", deferrable")),H(ue,"t")==0&&r(O,R(", initially deferred")),H(le,"t")==0&&r(O,R(", replica identity")),y(S,O.
data),d.relkind==be&&await Tn(S,d.relkind,d.tablespace,!0)}}else return s}else if(d.relkind==ge||d.relkind==pe||d.relkind==
Ne||d.relkind==Te||d.relkind==Se||d.relkind==Xe){let _=l,I=0;if(d.hasindex){if(N(e,`/* %s */
`,R("Get indexes for this table")),r(e,`SELECT c2.relname, i.indisprimary, i.indisunique, i.indisclustered, i.indisvalid\
, pg_catalog.pg_get_indexdef(i.indexrelid, 0, true),
  pg_catalog.pg_get_constraintdef(con.oid, true), contype, condeferrable, condeferred`),E.sversion>=90400?r(e,", i.indis\
replident"):r(e,", false AS indisreplident"),r(e,", c2.reltablespace"),E.sversion>=18e4?r(e,", con.conperiod"):r(e,", fa\
lse AS conperiod"),p(e,`
FROM pg_catalog.pg_class c, pg_catalog.pg_class c2, pg_catalog.pg_index i
  LEFT JOIN pg_catalog.pg_constraint con ON (conrelid = i.indrelid AND conindid = i.indexrelid AND contype IN ('p','u','\
x'))
WHERE c.oid = '%s' AND c.oid = i.indrelid AND i.indexrelid = c2.oid
ORDER BY i.indisprimary DESC, c2.relname;`,n),_=await u(e.data),_)I=x(_);else return s;if(I>0)for(y(S,R("Indexes:")),T=0;T<
I;T++){if(N(e,'    "%s"',g(_,T,0)),H(g(_,T,7),"x")==0||H(g(_,T,12),"t")==0)p(e," %s",g(_,T,6));else{let h,W;H(g(_,T,1),"\
t")==0?r(e," PRIMARY KEY,"):H(g(_,T,2),"t")==0&&(H(g(_,T,7),"u")==0?r(e," UNIQUE CONSTRAINT,"):r(e," UNIQUE,")),h=g(_,T,
5),W=En(h," USING "),W!=l&&(h=h.slice(W+7)),p(e," %s",h),H(g(_,T,8),"t")==0&&r(e," DEFERRABLE"),H(g(_,T,9),"t")==0&&r(e,
" INITIALLY DEFERRED")}H(g(_,T,3),"t")==0&&r(e," CLUSTER"),H(g(_,T,4),"t")!=0&&r(e," INVALID"),H(g(_,T,10),"t")==0&&r(e,
" REPLICA IDENTITY"),y(S,e.data),await Tn(S,be,Nn(g(_,T,11)),!1)}}if(d.checks){if(N(e,`/* %s */
`,R("Get check constraints for this table")),p(e,`SELECT r.conname, pg_catalog.pg_get_constraintdef(r.oid, true)
FROM pg_catalog.pg_constraint r
WHERE r.conrelid = '%s' AND r.contype = 'c'
ORDER BY 1;`,n),_=await u(e.data),_)I=x(_);else return s;if(I>0)for(y(S,R("Check constraints:")),T=0;T<I;T++)N(e,'    "%\
s" %s',g(_,T,0),g(_,T,1)),y(S,e.data)}if(N(e,`/* %s */
`,R("Get foreign key constraints for this table")),E.sversion>=12e4&&(d.ispartition||d.relkind==Te)?p(e,`SELECT conrelid\
 = '%s'::pg_catalog.regclass AS sametable,
       conname,
       pg_catalog.pg_get_constraintdef(oid, true) AS condef,
       conrelid::pg_catalog.regclass AS ontable
  FROM pg_catalog.pg_constraint,
       pg_catalog.pg_partition_ancestors('%s')
 WHERE conrelid = relid AND contype = 'f' AND conparentid = 0
ORDER BY sametable DESC, conname;`,n,n):(p(e,`SELECT true as sametable, conname,
  pg_catalog.pg_get_constraintdef(r.oid, true) as condef,
  conrelid::pg_catalog.regclass AS ontable
FROM pg_catalog.pg_constraint r
WHERE r.conrelid = '%s' AND r.contype = 'f'
`,n),E.sversion>=12e4&&p(e,`     AND conparentid = 0
`),p(e,"ORDER BY conname")),_=await u(e.data),_)I=x(_);else return s;if(I>0){let h=Ue(_,"sametable"),W=Ue(_,"conname"),q=Ue(
_,"condef"),ne=Ue(_,"ontable");for(y(S,R("Foreign-key constraints:")),T=0;T<I;T++)H(g(_,T,h),"f")==0?N(e,'    TABLE "%s"\
 CONSTRAINT "%s" %s',g(_,T,ne),g(_,T,W),g(_,T,q)):N(e,'    "%s" %s',g(_,T,W),g(_,T,q)),y(S,e.data)}if(N(e,`/* %s */
`,R("Get foreign keys referencing this table")),E.sversion>=12e4?p(e,`SELECT conname, conrelid::pg_catalog.regclass AS o\
ntable,
       pg_catalog.pg_get_constraintdef(oid, true) AS condef
  FROM pg_catalog.pg_constraint c
 WHERE confrelid IN (SELECT pg_catalog.pg_partition_ancestors('%s')
                     UNION ALL VALUES ('%s'::pg_catalog.regclass))
       AND contype = 'f' AND conparentid = 0
ORDER BY conname;`,n,n):p(e,`SELECT conname, conrelid::pg_catalog.regclass AS ontable,
       pg_catalog.pg_get_constraintdef(oid, true) AS condef
  FROM pg_catalog.pg_constraint
 WHERE confrelid = %s AND contype = 'f'
ORDER BY conname;`,n),_=await u(e.data),_)I=x(_);else return s;if(I>0){let h=Ue(_,"conname"),W=Ue(_,"ontable"),q=Ue(_,"c\
ondef");for(y(S,R("Referenced by:")),T=0;T<I;T++)N(e,'    TABLE "%s" CONSTRAINT "%s" %s',g(_,T,W),g(_,T,h),g(_,T,q)),y(S,
e.data)}if(E.sversion>=90500){if(N(e,`/* %s */
`,R("Get row-level policies for this table")),r(e,"SELECT pol.polname,"),E.sversion>=1e5?r(e,` pol.polpermissive,
`):r(e,` 't' as polpermissive,
`),p(e,`  CASE WHEN pol.polroles = '{0}' THEN NULL ELSE pg_catalog.array_to_string(array(select rolname from pg_catalog.\
pg_roles where oid = any (pol.polroles) order by 1),',') END,
  pg_catalog.pg_get_expr(pol.polqual, pol.polrelid),
  pg_catalog.pg_get_expr(pol.polwithcheck, pol.polrelid),
  CASE pol.polcmd
    WHEN 'r' THEN 'SELECT'
    WHEN 'a' THEN 'INSERT'
    WHEN 'w' THEN 'UPDATE'
    WHEN 'd' THEN 'DELETE'
    END AS cmd
FROM pg_catalog.pg_policy pol
WHERE pol.polrelid = '%s' ORDER BY 1;`,n),_=await u(e.data),_)I=x(_);else return s;for(d.rowsecurity&&!d.forcerowsecurity&&
I>0&&y(S,R("Policies:")),d.rowsecurity&&d.forcerowsecurity&&I>0&&y(S,R("Policies (forced row security enabled):")),d.rowsecurity&&
!d.forcerowsecurity&&I==0&&y(S,R("Policies (row security enabled): (none)")),d.rowsecurity&&d.forcerowsecurity&&I==0&&y(
S,R("Policies (forced row security enabled): (none)")),!d.rowsecurity&&I>0&&y(S,R("Policies (row security disabled):")),
T=0;T<I;T++)N(e,'    POLICY "%s"',g(_,T,0)),g(_,T,1)=="f"&&r(e," AS RESTRICTIVE"),ie(_,T,5)||p(e," FOR %s",g(_,T,5)),ie(
_,T,2)||p(e,`
      TO %s`,g(_,T,2)),ie(_,T,3)||p(e,`
      USING (%s)`,g(_,T,3)),ie(_,T,4)||p(e,`
      WITH CHECK (%s)`,g(_,T,4)),y(S,e.data)}if(E.sversion>=14e4){if(N(e,`/* %s */
`,R("Get extended statistics for this table")),p(e,`SELECT oid, stxrelid::pg_catalog.regclass, stxnamespace::pg_catalog.\
regnamespace::pg_catalog.text AS nsp, stxname,
pg_catalog.pg_get_statisticsobjdef_columns(oid) AS columns,
  'd' = any(stxkind) AS ndist_enabled,
  'f' = any(stxkind) AS deps_enabled,
  'm' = any(stxkind) AS mcv_enabled,
stxstattarget
FROM pg_catalog.pg_statistic_ext
WHERE stxrelid = '%s'
ORDER BY nsp, stxname;`,n),_=await u(e.data),_)I=x(_);else return s;if(I>0)for(y(S,R("Statistics objects:")),T=0;T<I;T++){
let h=!1,W,q,ne,ue,le;W=H(g(_,T,5),"t")==0,q=H(g(_,T,6),"t")==0,ne=H(g(_,T,7),"t")==0,N(e,"    "),p(e,'"%s.%s"',g(_,T,2),
g(_,T,3)),ue=W&&q&&ne,le=W||q||ne,le&&!ue&&(r(e," ("),W&&(r(e,"ndistinct"),h=!0),q&&(p(e,"%sdependencies",h?", ":""),h=!0),
ne&&p(e,"%smcv",h?", ":""),K(e,")")),p(e," ON %s FROM %s",g(_,T,4),g(_,T,1)),!ie(_,T,8)&&H(g(_,T,8),"-1")!=0&&p(e,"; STA\
TISTICS %s",g(_,T,8)),y(S,e.data)}}else if(E.sversion>=1e5){if(N(e,`/* %s */
`,R("Get extended statistics for this table")),r(e,`SELECT oid, stxrelid::pg_catalog.regclass, stxnamespace::pg_catalog.\
regnamespace AS nsp, stxname,
  (SELECT pg_catalog.string_agg(pg_catalog.quote_ident(attname),', ')
   FROM pg_catalog.unnest(stxkeys) s(attnum)
   JOIN pg_catalog.pg_attribute a ON (stxrelid = a.attrelid AND
        a.attnum = s.attnum AND NOT attisdropped)) AS columns,
  'd' = any(stxkind) AS ndist_enabled,
  'f' = any(stxkind) AS deps_enabled,
  'm' = any(stxkind) AS mcv_enabled,
`),E.sversion>=13e4?r(e,`  stxstattarget
`):r(e,`  -1 AS stxstattarget
`),p(e,`FROM pg_catalog.pg_statistic_ext
WHERE stxrelid = '%s'
ORDER BY 1;`,n),_=await u(e.data),_)I=x(_);else return s;if(I>0)for(y(S,R("Statistics objects:")),T=0;T<I;T++){let h=!1;
N(e,"    "),p(e,'"%s.%s" (',g(_,T,2),g(_,T,3)),H(g(_,T,5),"t")==0&&(r(e,"ndistinct"),h=!0),H(g(_,T,6),"t")==0&&(p(e,"%sd\
ependencies",h?", ":""),h=!0),H(g(_,T,7),"t")==0&&p(e,"%smcv",h?", ":""),p(e,") ON %s FROM %s",g(_,T,4),g(_,T,1)),H(g(_,
T,8),"-1")!=0&&p(e,"; STATISTICS %s",g(_,T,8)),y(S,e.data)}}if(d.hasrules&&d.relkind!=pe){if(N(e,`/* %s */
`,R("Get rules for this relation")),p(e,`SELECT r.rulename, trim(trailing ';' from pg_catalog.pg_get_ruledef(r.oid, true\
)), ev_enabled
FROM pg_catalog.pg_rewrite r
WHERE r.ev_class = '%s' ORDER BY 1;`,n),_=await u(e.data),_)I=x(_);else return s;if(I>0){let h,W;for(W=0;W<4;W++)for(h=!1,
T=0;T<I;T++){let q,ne=!1;switch(W){case 0:g(_,T,2)=="O"&&(ne=!0);break;case 1:g(_,T,2)=="D"&&(ne=!0);break;case 2:g(_,T,
2)=="A"&&(ne=!0);break;case 3:g(_,T,2)=="R"&&(ne=!0);break}if(ne){if(!h){switch(W){case 0:N(e,R("Rules:"));break;case 1:
N(e,R("Disabled rules:"));break;case 2:N(e,R("Rules firing always:"));break;case 3:N(e,R("Rules firing on replica only:"));
break}y(S,e.data),h=!0}q=g(_,T,1),q=q.slice(12),N(e,"    %s",q),y(S,e.data)}}}}if(E.sversion>=1e5){if(N(e,`/* %s */
`,R("Get publications that publish this table")),E.sversion>=15e4?(p(e,`SELECT pubname
     , NULL
     , NULL
FROM pg_catalog.pg_publication p
     JOIN pg_catalog.pg_publication_namespace pn ON p.oid = pn.pnpubid
     JOIN pg_catalog.pg_class pc ON pc.relnamespace = pn.pnnspid
WHERE pc.oid ='%s' and pg_catalog.pg_relation_is_publishable('%s')
UNION
SELECT pubname
     , pg_catalog.pg_get_expr(pr.prqual, c.oid)
     , (CASE WHEN pr.prattrs IS NOT NULL THEN
         (SELECT pg_catalog.string_agg(attname, ', ')
           FROM pg_catalog.generate_series(0, pg_catalog.array_upper(pr.prattrs::pg_catalog.int2[], 1)) s,
                pg_catalog.pg_attribute
          WHERE attrelid = pr.prrelid AND attnum = prattrs[s])
        ELSE NULL END) FROM pg_catalog.pg_publication p
     JOIN pg_catalog.pg_publication_rel pr ON p.oid = pr.prpubid
     JOIN pg_catalog.pg_class c ON c.oid = pr.prrelid
WHERE pr.prrelid = '%s'
`,n,n,n),E.sversion>=19e4?p(e,` AND NOT pr.prexcept
UNION
SELECT pubname
     , NULL
     , NULL
FROM pg_catalog.pg_publication p
WHERE p.puballtables AND pg_catalog.pg_relation_is_publishable('%s')
     AND NOT EXISTS (
     SELECT 1
     FROM pg_catalog.pg_publication_rel pr
     WHERE pr.prpubid = p.oid AND
     (pr.prrelid = '%s' OR pr.prrelid = pg_catalog.pg_partition_root('%s')))
ORDER BY 1;`,n,n,n):p(e,`UNION
SELECT pubname
		, NULL
		, NULL
FROM pg_catalog.pg_publication p
WHERE p.puballtables AND pg_catalog.pg_relation_is_publishable('%s')
ORDER BY 1;`,n)):p(e,`SELECT pubname
     , NULL
     , NULL
FROM pg_catalog.pg_publication p
JOIN pg_catalog.pg_publication_rel pr ON p.oid = pr.prpubid
WHERE pr.prrelid = '%s'
UNION ALL
SELECT pubname
     , NULL
     , NULL
FROM pg_catalog.pg_publication p
WHERE p.puballtables AND pg_catalog.pg_relation_is_publishable('%s')
ORDER BY 1;`,n,n),_=await u(e.data),_)I=x(_);else return s;for(I>0&&y(S,R("Included in publications:")),T=0;T<I;T++)N(e,
'    "%s"',g(_,T,0)),ie(_,T,2)||p(e," (%s)",g(_,T,2)),ie(_,T,1)||p(e," WHERE %s",g(_,T,1)),y(S,e.data)}if(E.sversion>=19e4){
if(N(e,`/* %s */
`,R("Get publications that exclude this table")),p(e,`SELECT pubname
FROM pg_catalog.pg_publication p
JOIN pg_catalog.pg_publication_rel pr ON p.oid = pr.prpubid
WHERE (pr.prrelid = '%s' OR pr.prrelid = pg_catalog.pg_partition_root('%s'))
AND pr.prexcept
ORDER BY 1;`,n,n),_=await u(e.data),_)I=x(_);else return s;for(I>0&&y(S,R("Excluded from publications:")),T=0;T<I;T++)N(
e,'    "%s"',g(_,T,0)),y(S,e.data)}if(a){if(N(e,`/* %s */
`,R("Get not-null constraints for this table")),p(e,`SELECT c.conname, a.attname, c.connoinherit,
  c.conislocal, c.coninhcount <> 0,
  c.convalidated
FROM pg_catalog.pg_constraint c JOIN
  pg_catalog.pg_attribute a ON
    (a.attrelid = c.conrelid AND a.attnum = c.conkey[1])
WHERE c.contype = 'n' AND
  c.conrelid = '%s'::pg_catalog.regclass
ORDER BY a.attnum`,n),_=await u(e.data),_)I=x(_);else return s;for(I>0&&y(S,R("Not-null constraints:")),T=0;T<I;T++){let h=g(
_,T,3)[0]=="t",W=g(_,T,4)[0]=="t",q=g(_,T,5)[0]=="t";N(e,'    "%s" NOT NULL "%s"%s%s',g(_,T,0),g(_,T,1),g(_,T,2)[0]=="t"?
" NO INHERIT":h&&W?R(" (local, inherited)"):W?R(" (inherited)"):"",q?"":" NOT VALID"),y(S,e.data)}}}if((d.relkind==je||d.
relkind==pe)&&a){let _;if(N(e,`/* %s */
`,R("Get view's definition")),p(e,"SELECT pg_catalog.pg_get_viewdef('%s'::pg_catalog.oid, true);",n),_=await u(e.data),!_)
return s;x(_)>0&&(F=me(g(_,0,0)))}if(F){let _=l;if(y(S,R("View definition:")),y(S,F),d.hasrules){if(N(e,`/* %s */
`,R("Get rules for this view")),p(e,`SELECT r.rulename, trim(trailing ';' from pg_catalog.pg_get_ruledef(r.oid, true))
FROM pg_catalog.pg_rewrite r
WHERE r.ev_class = '%s' AND r.rulename != '_RETURN' ORDER BY 1;`,n),_=await u(e.data),!_)return s;if(x(_)>0)for(y(S,R("R\
ules:")),T=0;T<x(_);T++){let I;I=g(_,T,1),I=I.slice(12),N(e," %s",I),y(S,e.data)}}}if(d.hastriggers){let _,I;if(N(e,`/* \
%s */
`,R("Get triggers for this relation")),r(e,`SELECT t.tgname, pg_catalog.pg_get_triggerdef(t.oid, true), t.tgenabled, t.t\
gisinternal,
`),E.sversion>=13e4?r(e,`  CASE WHEN t.tgparentid != 0 THEN
    (SELECT u.tgrelid::pg_catalog.regclass
     FROM pg_catalog.pg_trigger AS u,
          pg_catalog.pg_partition_ancestors(t.tgrelid) WITH ORDINALITY AS a(relid, depth)
     WHERE u.tgname = t.tgname AND u.tgrelid = a.relid
           AND u.tgparentid = 0
     ORDER BY a.depth LIMIT 1)
  END AS parent
`):r(e,`  NULL AS parent
`),p(e,`FROM pg_catalog.pg_trigger t
WHERE t.tgrelid = '%s' AND `,n),E.sversion>=11e4&&E.sversion<15e4?r(e,`(NOT t.tgisinternal OR (t.tgisinternal AND t.tgen\
abled = 'D') 
    OR EXISTS (SELECT 1 FROM pg_catalog.pg_depend WHERE objid = t.oid 
        AND refclassid = 'pg_catalog.pg_trigger'::pg_catalog.regclass))`):r(e,"(NOT t.tgisinternal OR (t.tgisinternal AN\
D t.tgenabled = 'D'))"),r(e,`
ORDER BY 1;`),_=await u(e.data),_)I=x(_);else return s;if(I>0){let h,W;for(W=0;W<=4;W++)for(h=!1,T=0;T<I;T++){let q,ne,ue,
le,ke;switch(le=g(_,T,2),ke=g(_,T,3),q=!1,W){case 0:(le=="O"||le=="t")&&(q=!0);break;case 1:(le=="D"||le=="f")&&ke=="f"&&
(q=!0);break;case 2:(le=="D"||le=="f")&&ke=="t"&&(q=!0);break;case 3:le=="A"&&(q=!0);break;case 4:le=="R"&&(q=!0);break}
if(q!=!1){if(h==!1){switch(W){case 0:N(e,R("Triggers:"));break;case 1:N(e,R("Disabled user triggers:"));break;case 2:N(e,
R("Disabled internal triggers:"));break;case 3:N(e,R("Triggers firing always:"));break;case 4:N(e,R("Triggers firing on \
replica only:"));break}y(S,e.data),h=!0}ne=g(_,T,1),ue=En(ne," TRIGGER "),ue!=l&&(ne=ne.slice(ue+9)),N(e,"    %s",ne),ie(
_,T,4)||p(e,", ON TABLE %s",g(_,T,4)),y(S,e.data)}}}}if(d.relkind==ge||d.relkind==pe||d.relkind==Ne||d.relkind==Te||d.relkind==
Se||d.relkind==Xe){let _,I,h;if(_=d.relkind==Te||d.relkind==Se,d.relkind==Ne){let W;if(N(e,`/* %s */
`,R("Get foreign server for this table")),p(e,`SELECT s.srvname,
  pg_catalog.array_to_string(ARRAY(
    SELECT pg_catalog.quote_ident(option_name) || ' ' || pg_catalog.quote_literal(option_value)
    FROM pg_catalog.pg_options_to_table(ftoptions)),  ', ')
FROM pg_catalog.pg_foreign_table f,
     pg_catalog.pg_foreign_server s
WHERE f.ftrelid = '%s' AND s.oid = f.ftserver;`,n),I=await u(e.data),I){if(x(I)!=1)return s}else return s;N(e,R("Server:\
 %s"),g(I,0,0)),y(S,e.data),W=g(I,0,1),W&&W[0]!=l&&(N(e,R("FDW options: (%s)"),W),y(S,e.data))}if(N(e,`/* %s */
`,R("Get inheritance parent tables")),p(e,`SELECT c.oid::pg_catalog.regclass
FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i
WHERE c.oid = i.inhparent AND i.inhrelid = '%s'
  AND c.relkind != 'p' AND c.relkind != 'I'
ORDER BY inhseqno;`,n),I=await u(e.data),I){let W=R("Inherits");for(h=x(I),h>0&&(N(e,"%s:",W),y(S,e.data)),T=0;T<h;T++)N(
e,"    %s",g(I,T,0)),y(S,e.data)}else return s;if(N(e,`/* %s */
`,R("Get child tables")),E.sversion>=14e4?p(e,`SELECT c.oid::pg_catalog.regclass, c.relkind, inhdetachpending, pg_catalo\
g.pg_get_expr(c.relpartbound, c.oid)
FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i
WHERE c.oid = i.inhrelid AND i.inhparent = '%s'
ORDER BY pg_catalog.pg_get_expr(c.relpartbound, c.oid) = 'DEFAULT', c.oid::pg_catalog.regclass::pg_catalog.text;`,n):E.sversion>=
1e5?p(e,`SELECT c.oid::pg_catalog.regclass, c.relkind, false AS inhdetachpending, pg_catalog.pg_get_expr(c.relpartbound,\
 c.oid)
FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i
WHERE c.oid = i.inhrelid AND i.inhparent = '%s'
ORDER BY pg_catalog.pg_get_expr(c.relpartbound, c.oid) = 'DEFAULT', c.oid::pg_catalog.regclass::pg_catalog.text;`,n):p(e,
`SELECT c.oid::pg_catalog.regclass, c.relkind, false AS inhdetachpending, NULL
FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i
WHERE c.oid = i.inhrelid AND i.inhparent = '%s'
ORDER BY c.oid::pg_catalog.regclass::pg_catalog.text;`,n),I=await u(e.data),!I)return s;if(h=x(I),_&&h==0)N(e,R("Number \
of partitions: %d"),h),y(S,e.data);else if(!a)h>0&&(_?N(e,R("Number of partitions: %d (Use \\d+ to list them.)"),h):N(e,
R("Number of child tables: %d (Use \\d+ to list them.)"),h),y(S,e.data));else{let W=R(_?"Partitions":"Child tables");for(h>
0&&(N(e,"%s:",W),y(S,e.data)),T=0;T<h;T++){let q=g(I,T,1);N(e,"    %s",g(I,T,0)),ie(I,T,3)||p(e," %s",g(I,T,3)),q==Te||q==
Se?r(e,", PARTITIONED"):q==Ne&&r(e,", FOREIGN"),H(g(I,T,2),"t")==0&&r(e," (DETACH PENDING)"),y(S,e.data)}}if(d.reloftype&&
(N(e,R("Typed table of type: %s"),d.reloftype),y(S,e.data)),a&&(d.relkind==ge||d.relkind==pe)&&d.relreplident!="i"&&(H(o,
"pg_catalog")!=0&&d.relreplident!="d"||H(o,"pg_catalog")==0&&d.relreplident!="n")){let W=R("Replica Identity");N(e,"%s: \
%s",W,d.relreplident=="f"?"FULL":d.relreplident=="n"?"NOTHING":"???"),y(S,e.data)}a&&d.relkind!=pe&&d.hasoids&&y(S,R("Ha\
s OIDs: yes")),await Tn(S,d.relkind,d.tablespace,!0),a&&d.relam!=l&&!E.hide_tableam&&(N(e,R("Access method: %s"),d.relam),
y(S,e.data))}if(a&&d.reloptions&&d.reloptions[0]!=l){let _=R("Options");N(e,"%s: %s",_,d.reloptions),y(S,e.data)}return ze(
S,E.queryFout,!1,E.logfile),s=!0,s}async function Tn(o,i,n,a){if((i==ge||i==pe||i==be||i==Te||i==Se||i==Xe)&&n!=0){let s=l,
e={};if(b(e),N(e,`/* %s */
`,R("Get tablespace information for this relation")),p(e,`SELECT spcname FROM pg_catalog.pg_tablespace
WHERE oid = '%u';`,n),s=await u(e.data),!s)return;x(s)>0&&(a?(N(e,R('Tablespace: "%s"'),g(s,0,0)),y(o,e.data)):(N(e,"%s",
o.footer),p(e,R(', tablespace "%s"'),g(s,0,0)),te(o,e.data)))}}async function un(o,i,n){let a={},s,e={},c=E.popt.topt,f=2,
S=0,T,F,m="l",D;if(c.default_footer=!1,b(a),N(a,`/* %s */
`,R("Get matching roles")),r(a,`SELECT r.rolname, r.rolsuper, r.rolinherit,
  r.rolcreaterole, r.rolcreatedb, r.rolcanlogin,
  r.rolconnlimit, r.rolvaliduntil`),i&&(r(a,`
, pg_catalog.shobj_description(r.oid, 'pg_authid') AS description`),f++),r(a,`
, r.rolreplication`),E.sversion>=90500&&r(a,`
, r.rolbypassrls`),r(a,`
FROM pg_catalog.pg_roles r
`),!n&&!o&&r(a,`WHERE r.rolname !~ '^pg_'
`),!U(a,o,!1,!1,l,"r.rolname",l,l,l,1)||(r(a,"ORDER BY 1;"),s=await u(a.data),!s))return!1;for(S=x(s),D=[],xe(e,c,R("Lis\
t of roles"),f,S),ae(e,t("Role name"),!0,m),ae(e,t("Attributes"),!0,m),i&&ae(e,t("Description"),!0,m),T=0;T<S;T++)j(e,g(
s,T,0),!1,!1),rn(a),H(g(s,T,1),"t")==0&&Ce(a,R("Superuser")),H(g(s,T,2),"t")!=0&&Ce(a,R("No inheritance")),H(g(s,T,3),"t")==
0&&Ce(a,R("Create role")),H(g(s,T,4),"t")==0&&Ce(a,R("Create DB")),H(g(s,T,5),"t")!=0&&Ce(a,R("Cannot login")),H(g(s,T,i?
9:8),"t")==0&&Ce(a,R("Replication")),E.sversion>=90500&&H(g(s,T,i?10:9),"t")==0&&Ce(a,R("Bypass RLS")),F=bn(g(s,T,6)),F>=
0&&(a.len>0&&K(a,`
`),F==0?r(a,R("No connections")):p(a,ngettext("%d connection","%d connections",F),F)),H(g(s,T,7),"")!=0&&(a.len>0&&K(a,`\

`),r(a,R("Password valid until ")),r(a,g(s,T,7))),D[T]=me(a.data),j(e,D[T],!1,!1),i&&j(e,g(s,T,8),!1,!1);return ze(e,E.queryFout,
!1,E.logfile),!0}function Ce(o,i){o.len>0&&r(o,", "),r(o,i)}async function aa(o,i){let n={},a,s=E.popt,e={};return b(n),
N(n,`/* %s */
`,R("Get per-database and per-role settings")),p(n,`SELECT rolname AS "%s", datname AS "%s",
pg_catalog.array_to_string(setconfig, E'\\n') AS "%s"
FROM pg_catalog.pg_db_role_setting s
LEFT JOIN pg_catalog.pg_database d ON d.oid = setdatabase
LEFT JOIN pg_catalog.pg_roles r ON r.oid = setrole
`,t("Role"),t("Database"),t("Settings")),!U(n,o,!1,!1,l,"r.rolname",l,l,e,1)||!U(n,i,e.value,!1,l,"d.datname",l,l,l,1)||
(r(n,"ORDER BY 1, 2;"),a=await u(n.data),!a)?!1:(x(a)==0&&!E.quiet?o&&i?M('Did not find any settings for role "%s" and d\
atabase "%s".',o,i):o?M('Did not find any settings for role "%s".',o):M("Did not find any settings."):(s.nullPrint=l,s.title=
R("List of settings"),s.translate_header=!0,v(a,s,E.queryFout,!1,E.logfile)),!0)}async function ta(o,i){let n={},a,s=E.popt;
return b(n),N(n,`/* %s */
`,R("Get matching role grants")),p(n,`SELECT m.rolname AS "%s", r.rolname AS "%s",
  pg_catalog.concat_ws(', ',
`,t("Role name"),t("Member of")),E.sversion>=16e4?r(n,`    CASE WHEN pam.admin_option THEN 'ADMIN' END,
    CASE WHEN pam.inherit_option THEN 'INHERIT' END,
    CASE WHEN pam.set_option THEN 'SET' END
`):r(n,`    CASE WHEN pam.admin_option THEN 'ADMIN' END,
    CASE WHEN m.rolinherit THEN 'INHERIT' END,
    'SET'
`),p(n,`  ) AS "%s",
  g.rolname AS "%s"
`,t("Options"),t("Grantor")),r(n,`FROM pg_catalog.pg_roles m
     JOIN pg_catalog.pg_auth_members pam ON (pam.member = m.oid)
     LEFT JOIN pg_catalog.pg_roles r ON (pam.roleid = r.oid)
     LEFT JOIN pg_catalog.pg_roles g ON (pam.grantor = g.oid)
`),!i&&!o&&r(n,`WHERE m.rolname !~ '^pg_'
`),!U(n,o,!1,!1,l,"m.rolname",l,l,l,1)||(r(n,`ORDER BY 1, 2, 4;
`),a=await u(n.data),!a)?!1:(s.nullPrint=l,s.title=R("List of role grants"),s.translate_header=!0,v(a,s,E.queryFout,!1,E.
logfile),!0)}async function Ln(o,i,n,a){let s=Z(o,"t")!=l,e=Z(o,"i")!=l,c=Z(o,"v")!=l,f=Z(o,"m")!=l,S=Z(o,"s")!=l,T=Z(o,
"E")!=l,F,m={},D,O=E.popt,G,z=[!1,!1,!0,!1,!1,!1,!1,!1,!1];return F=s+e+c+f+S+T,F==0&&(s=c=f=S=T=!0),b(m),N(m,`/* %s */
`,R("Get matching relations")),p(m,`SELECT n.nspname as "%s",
  c.relname as "%s",
  CASE c.relkind WHEN 'r' THEN '%s' WHEN 'v' THEN '%s' WHEN 'm' THEN '%s' WHEN 'i' THEN '%s' WHEN 'S' THEN '%s' WHEN 't'\
 THEN '%s' WHEN 'f' THEN '%s' WHEN 'p' THEN '%s' WHEN 'I' THEN '%s' END as "%s",
  pg_catalog.pg_get_userbyid(c.relowner) as "%s"`,t("Schema"),t("Name"),t("table"),t("view"),t("materialized view"),t("i\
ndex"),t("sequence"),t("TOAST table"),t("foreign table"),t("partitioned table"),t("partitioned index"),t("Type"),t("Owne\
r")),G=4,e&&(p(m,`,
  c2.relname as "%s"`,t("Table")),G++),n&&(p(m,`,
  CASE c.relpersistence WHEN 'p' THEN '%s' WHEN 't' THEN '%s' WHEN 'u' THEN '%s' END as "%s"`,t("permanent"),t("temporar\
y"),t("unlogged"),t("Persistence")),z[G]=!0,E.sversion>=12e4&&!E.hide_tableam&&(s||f||e)&&p(m,`,
  am.amname as "%s"`,t("Access method")),p(m,`,
  pg_catalog.pg_size_pretty(pg_catalog.pg_table_size(c.oid)) as "%s",
  pg_catalog.obj_description(c.oid, 'pg_class') as "%s"`,t("Size"),t("Description"))),r(m,`
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace`),E.sversion>=12e4&&!E.hide_tableam&&(s||f||e)&&r(m,`\

     LEFT JOIN pg_catalog.pg_am am ON am.oid = c.relam`),e&&r(m,`
     LEFT JOIN pg_catalog.pg_index i ON i.indexrelid = c.oid
     LEFT JOIN pg_catalog.pg_class c2 ON i.indrelid = c2.oid`),r(m,`
WHERE c.relkind IN (`),s&&(r(m,"'r','p',"),(a||i)&&r(m,"'t',")),c&&r(m,"'v',"),f&&r(m,"'m',"),e&&r(m,"'i','I',"),S&&r(m,
"'S',"),(a||i)&&r(m,"'s',"),T&&r(m,"'f',"),r(m,"''"),r(m,`)
`),!a&&!i&&r(m,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname !~ '^pg_toast'
      AND n.nspname <> 'information_schema'
`),!U(m,i,!0,!1,"n.nspname","c.relname",l,"pg_catalog.pg_table_is_visible(c.oid)",l,3)||(r(m,"ORDER BY 1,2;"),D=await u(
m.data),!D)?!1:(x(D)==0&&!E.quiet?i?F!=1?M('Did not find any relations named "%s".',i):s?M('Did not find any tables name\
d "%s".',i):e?M('Did not find any indexes named "%s".',i):c?M('Did not find any views named "%s".',i):f?M('Did not find \
any materialized views named "%s".',i):S?M('Did not find any sequences named "%s".',i):T?M('Did not find any foreign tab\
les named "%s".',i):pg_log_error_internal('Did not find any ??? named "%s".',i):F!=1?M("Did not find any relations."):s?
M("Did not find any tables."):e?M("Did not find any indexes."):c?M("Did not find any views."):f?M("Did not find any mate\
rialized views."):S?M("Did not find any sequences."):T?M("Did not find any foreign tables."):pg_log_error_internal("Did \
not find any ??? relations."):(O.nullPrint=l,O.title=F!=1?R("List of relations"):s?R("List of tables"):e?R("List of inde\
xes"):c?R("List of views"):f?R("List of materialized views"):S?R("List of sequences"):T?R("List of foreign tables"):"Lis\
t of ???",O.translate_header=!0,O.translate_columns=z,O.n_translate_columns=$(z),v(D,O,E.queryFout,!1,E.logfile)),!0)}async function sa(o,i,n){
let a=Z(o,"t")!=l,s=Z(o,"i")!=l,e=Z(o,"n")!=l,c={},f={},S,T=E.popt,F=[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1],m,D=!1;if(E.sversion<
1e5){let O;return M("The server (version %s) does not support declarative table partitioning.",Ie(E.sversion,!1,O,Le(O))),
!0}return!a&&!s&&(a=s=!0),s&&!a?m=R("List of partitioned indexes"):a&&!s?m=R("List of partitioned tables"):(m=R("List of\
 partitioned relations"),D=!0),b(c),N(c,`/* %s */
`,R("Get matching partitioned relations")),p(c,`SELECT n.nspname as "%s",
  c.relname as "%s",
  pg_catalog.pg_get_userbyid(c.relowner) as "%s"`,t("Schema"),t("Name"),t("Owner")),D&&(p(c,`,
  CASE c.relkind WHEN 'p' THEN '%s' WHEN 'I' THEN '%s' END as "%s"`,t("partitioned table"),t("partitioned index"),t("Typ\
e")),F[3]=!0),(e||i)&&p(c,`,
  inh.inhparent::pg_catalog.regclass as "%s"`,t("Parent name")),s&&p(c,`,
 c2.oid::pg_catalog.regclass as "%s"`,t("Table")),n&&(p(c,`,
  am.amname as "%s"`,t("Access method")),e&&p(c,`,
  s.dps as "%s"`,t("Leaf partition size")),p(c,`,
  s.tps as "%s"`,t("Total size")),p(c,`,
  pg_catalog.obj_description(c.oid, 'pg_class') as "%s"`,t("Description"))),r(c,`
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace`),s&&r(c,`
     LEFT JOIN pg_catalog.pg_index i ON i.indexrelid = c.oid
     LEFT JOIN pg_catalog.pg_class c2 ON i.indrelid = c2.oid`),(e||i)&&r(c,`
     LEFT JOIN pg_catalog.pg_inherits inh ON c.oid = inh.inhrelid`),n&&(r(c,`
     LEFT JOIN pg_catalog.pg_am am ON c.relam = am.oid`),E.sversion<12e4?r(c,`,
     LATERAL (WITH RECURSIVE d
                AS (SELECT inhrelid AS oid, 1 AS level
                      FROM pg_catalog.pg_inherits
                     WHERE inhparent = c.oid
                    UNION ALL
                    SELECT inhrelid, level + 1
                      FROM pg_catalog.pg_inherits i
                           JOIN d ON i.inhparent = d.oid)
                SELECT pg_catalog.pg_size_pretty(sum(pg_catalog.pg_table_size(d.oid))) AS tps,
                       pg_catalog.pg_size_pretty(sum(
             CASE WHEN d.level = 1 THEN pg_catalog.pg_table_size(d.oid) ELSE 0 END)) AS dps
               FROM d) s`):r(c,`,
     LATERAL (SELECT pg_catalog.pg_size_pretty(sum(
                 CASE WHEN ppt.isleaf AND ppt.level = 1
                      THEN pg_catalog.pg_table_size(ppt.relid) ELSE 0 END)) AS dps,
                     pg_catalog.pg_size_pretty(sum(pg_catalog.pg_table_size(ppt.relid))) AS tps
              FROM pg_catalog.pg_partition_tree(c.oid) ppt) s`)),r(c,`
WHERE c.relkind IN (`),a&&r(c,"'p',"),s&&r(c,"'I',"),r(c,"''"),r(c,`)
`),r(c,!e&&!i?` AND NOT c.relispartition
`:""),i||r(c,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname !~ '^pg_toast'
      AND n.nspname <> 'information_schema'
`),!U(c,i,!0,!1,"n.nspname","c.relname",l,"pg_catalog.pg_table_is_visible(c.oid)",l,3)||(p(c,'ORDER BY "Schema", %s%s"Na\
me";',D?'"Type" DESC, ':"",e||i?'"Parent name" NULLS FIRST, ':""),S=await u(c.data),!S)?!1:(b(f),r(f,m),T.nullPrint=l,T.
title=f.data,T.translate_header=!0,T.translate_columns=F,T.n_translate_columns=$(F),v(S,T,E.queryFout,!1,E.logfile),!0)}
async function ia(o,i,n){let a={},s,e=E.popt;return b(a),N(a,`/* %s */
`,R("Get matching procedural languages")),p(a,`SELECT l.lanname AS "%s",
       pg_catalog.pg_get_userbyid(l.lanowner) as "%s",
       l.lanpltrusted AS "%s"`,t("Name"),t("Owner"),t("Trusted")),i&&(p(a,`,
       NOT l.lanispl AS "%s",
       l.lanplcallfoid::pg_catalog.regprocedure AS "%s",
       l.lanvalidator::pg_catalog.regprocedure AS "%s",
       l.laninline::pg_catalog.regprocedure AS "%s",
       `,t("Internal language"),t("Call handler"),t("Validator"),t("Inline handler")),Ee(a,"l.lanacl")),p(a,`,
       d.description AS "%s"
FROM pg_catalog.pg_language l
LEFT JOIN pg_catalog.pg_description d
  ON d.classoid = l.tableoid AND d.objoid = l.oid
  AND d.objsubid = 0
`,t("Description")),o&&!U(a,o,!1,!1,l,"l.lanname",l,l,l,2)||(!n&&!o&&r(a,`WHERE l.lanplcallfoid != 0
`),r(a,"ORDER BY 1;"),s=await u(a.data),!s)?!1:(e.nullPrint=l,e.title=R("List of languages"),e.translate_header=!0,v(s,e,
E.queryFout,!1,E.logfile),!0)}async function oa(o,i,n){let a={},s,e=E.popt;return b(a),N(a,`/* %s */
`,R("Get matching domains")),p(a,`SELECT n.nspname as "%s",
       t.typname as "%s",
       pg_catalog.format_type(t.typbasetype, t.typtypmod) as "%s",
       (SELECT c.collname FROM pg_catalog.pg_collation c, pg_catalog.pg_type bt
        WHERE c.oid = t.typcollation AND bt.oid = t.typbasetype AND t.typcollation <> bt.typcollation) as "%s",
       CASE WHEN t.typnotnull THEN 'not null' END as "%s",
       t.typdefault as "%s",
       pg_catalog.array_to_string(ARRAY(
         SELECT pg_catalog.pg_get_constraintdef(r.oid, true) FROM pg_catalog.pg_constraint r WHERE t.oid = r.contypid AN\
D r.contype = 'c' ORDER BY r.conname
       ), ' ') as "%s"`,t("Schema"),t("Name"),t("Type"),t("Collation"),t("Nullable"),t("Default"),t("Check")),i&&(r(a,`,\

  `),Ee(a,"t.typacl"),p(a,`,
       d.description as "%s"`,t("Description"))),r(a,`
FROM pg_catalog.pg_type t
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
`),i&&r(a,`     LEFT JOIN pg_catalog.pg_description d ON d.classoid = t.tableoid AND d.objoid = t.oid AND d.objsubid = 0\

`),r(a,`WHERE t.typtype = 'd'
`),!n&&!o&&r(a,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!U(a,o,!0,!1,"n.nspname","t.typname",l,"pg_catalog.pg_type_is_visible(t.oid)",l,3)||(r(a,"ORDER BY 1, 2;"),s=await u(
a.data),!s)?!1:(e.nullPrint=l,e.title=R("List of domains"),e.translate_header=!0,v(s,e,E.queryFout,!1,E.logfile),!0)}async function ra(o,i,n){
let a={},s,e=E.popt,c=[!1,!1,!1,!1,!0,!1];return b(a),N(a,`/* %s */
`,R("Get matching conversions")),p(a,`SELECT n.nspname AS "%s",
       c.conname AS "%s",
       pg_catalog.pg_encoding_to_char(c.conforencoding) AS "%s",
       pg_catalog.pg_encoding_to_char(c.contoencoding) AS "%s",
       CASE WHEN c.condefault THEN '%s'
       ELSE '%s' END AS "%s"`,t("Schema"),t("Name"),t("Source"),t("Destination"),t("yes"),t("no"),t("Default?")),i&&p(a,
`,
       d.description AS "%s"`,t("Description")),r(a,`
FROM pg_catalog.pg_conversion c
     JOIN pg_catalog.pg_namespace n ON n.oid = c.connamespace
`),i&&r(a,`LEFT JOIN pg_catalog.pg_description d ON d.classoid = c.tableoid
          AND d.objoid = c.oid AND d.objsubid = 0
`),r(a,`WHERE true
`),!n&&!o&&r(a,`  AND n.nspname <> 'pg_catalog'
  AND n.nspname <> 'information_schema'
`),!U(a,o,!0,!1,"n.nspname","c.conname",l,"pg_catalog.pg_conversion_is_visible(c.oid)",l,3)||(r(a,"ORDER BY 1, 2;"),s=await u(
a.data),!s)?!1:(e.nullPrint=l,e.title=R("List of conversions"),e.translate_header=!0,e.translate_columns=c,e.n_translate_columns=
$(c),v(s,e,E.queryFout,!1,E.logfile),!0)}async function la(o,i,n){let a={},s,e=E.popt;return b(a),N(a,`/* %s */
`,R("Get matching configuration parameters")),p(a,'SELECT s.name AS "%s", pg_catalog.current_setting(s.name) AS "%s"',t(
"Parameter"),t("Value")),i&&(p(a,', s.vartype AS "%s", s.context AS "%s", ',t("Type"),t("Context")),E.sversion>=15e4?Ee(
a,"p.paracl"):p(a,'NULL AS "%s"',t("Access privileges"))),r(a,`
FROM pg_catalog.pg_settings s
`),i&&E.sversion>=15e4&&r(a,`  LEFT JOIN pg_catalog.pg_parameter_acl p
  ON pg_catalog.lower(s.name) = p.parname
`),o?de(E.db,a,o,!1,!1,l,"pg_catalog.lower(s.name)",l,l,l,l):r(a,`WHERE s.source <> 'default' AND
      s.setting IS DISTINCT FROM s.boot_val
`),r(a,"ORDER BY 1;"),s=await u(a.data),s?(e.nullPrint=l,o?e.title=R("List of configuration parameters"):e.title=R("List\
 of non-default configuration parameters"),e.translate_header=!0,v(s,e,E.queryFout,!1,E.logfile),!0):!1}async function Ea(o,i){
let n={},a,s=E.popt,e=[!1,!1,!1,!0,!1,!1,!1];if(E.sversion<90300){let c;return M("The server (version %s) does not suppo\
rt event triggers.",Ie(E.sversion,!1,c,Le(c))),!0}return b(n),N(n,`/* %s */
`,R("Get matching event triggers")),p(n,`SELECT evtname as "%s", evtevent as "%s", pg_catalog.pg_get_userbyid(e.evtowner\
) as "%s",
 case evtenabled when 'O' then '%s'  when 'R' then '%s'  when 'A' then '%s'  when 'D' then '%s' end as "%s",
 e.evtfoid::pg_catalog.regproc as "%s", pg_catalog.array_to_string(array(select x from pg_catalog.unnest(evttags) as t(x\
)), ', ') as "%s"`,t("Name"),t("Event"),t("Owner"),t("enabled"),t("replica"),t("always"),t("disabled"),t("Enabled"),t("F\
unction"),t("Tags")),i&&p(n,`,
pg_catalog.obj_description(e.oid, 'pg_event_trigger') as "%s"`,t("Description")),r(n,`
FROM pg_catalog.pg_event_trigger e `),!U(n,o,!1,!1,l,"evtname",l,l,l,1)||(r(n,"ORDER BY 1"),a=await u(n.data),!a)?!1:(s.
nullPrint=l,s.title=R("List of event triggers"),s.translate_header=!0,s.translate_columns=e,s.n_translate_columns=$(e),v(
a,s,E.queryFout,!1,E.logfile),!0)}async function ca(o,i){let n={},a,s=E.popt;if(E.sversion<1e5){let e;return M("The serv\
er (version %s) does not support extended statistics.",Ie(E.sversion,!1,e,Le(e))),!0}return b(n),N(n,`/* %s */
`,R("Get matching extended statistics")),p(n,`SELECT 
es.stxnamespace::pg_catalog.regnamespace::pg_catalog.text AS "%s", 
es.stxname AS "%s", 
`,t("Schema"),t("Name")),E.sversion>=14e4?p(n,`pg_catalog.format('%%s FROM %%s', 
  pg_catalog.pg_get_statisticsobjdef_columns(es.oid), 
  es.stxrelid::pg_catalog.regclass) AS "%s"`,t("Definition")):p(n,`pg_catalog.format('%%s FROM %%s', 
  (SELECT pg_catalog.string_agg(pg_catalog.quote_ident(a.attname),', ') 
   FROM pg_catalog.unnest(es.stxkeys) s(attnum) 
   JOIN pg_catalog.pg_attribute a 
   ON (es.stxrelid = a.attrelid 
   AND a.attnum = s.attnum 
   AND NOT a.attisdropped)), 
es.stxrelid::pg_catalog.regclass) AS "%s"`,t("Definition")),p(n,`,
CASE WHEN 'd' = any(es.stxkind) THEN 'defined' 
END AS "%s", 
CASE WHEN 'f' = any(es.stxkind) THEN 'defined' 
END AS "%s"`,t("Ndistinct"),t("Dependencies")),E.sversion>=12e4&&p(n,`,
CASE WHEN 'm' = any(es.stxkind) THEN 'defined' 
END AS "%s" `,t("MCV")),i&&p(n,`, 
pg_catalog.obj_description(oid, 'pg_statistic_ext') AS "%s"
`,t("Description")),r(n,` 
FROM pg_catalog.pg_statistic_ext es 
`),!U(n,o,!1,!1,"es.stxnamespace::pg_catalog.regnamespace::pg_catalog.text","es.stxname",l,"pg_catalog.pg_statistics_obj\
_is_visible(es.oid)",l,3)||(r(n,"ORDER BY 1, 2;"),a=await u(n.data),!a)?!1:(s.nullPrint=l,s.title=R("List of extended st\
atistics"),s.translate_header=!0,v(a,s,E.queryFout,!1,E.logfile),!0)}async function pa(o,i){let n={},a,s=E.popt,e=[!1,!1,
!1,!0,!0,!1];return b(n),N(n,`/* %s */
`,R("Get matching casts")),p(n,`SELECT pg_catalog.format_type(castsource, NULL) AS "%s",
       pg_catalog.format_type(casttarget, NULL) AS "%s",
`,t("Source type"),t("Target type")),p(n,`       CASE WHEN c.castmethod = '%c' THEN '(binary coercible)'
            WHEN c.castmethod = '%c' THEN '(with inout)'
            ELSE p.proname
       END AS "%s",
`,Va,Xa,t("Function")),p(n,`       CASE WHEN c.castcontext = '%c' THEN '%s'
            WHEN c.castcontext = '%c' THEN '%s'
            ELSE '%s'
       END AS "%s"`,Ja,t("no"),ja,t("in assignment"),t("yes"),t("Implicit?")),i&&p(n,`,
       CASE WHEN p.proleakproof THEN '%s'
            ELSE '%s'
       END AS "%s",
       d.description AS "%s"`,t("yes"),t("no"),t("Leakproof?"),t("Description")),r(n,`
FROM pg_catalog.pg_cast c LEFT JOIN pg_catalog.pg_proc p
     ON c.castfunc = p.oid
     LEFT JOIN pg_catalog.pg_type ts
     ON c.castsource = ts.oid
     LEFT JOIN pg_catalog.pg_namespace ns
     ON ns.oid = ts.typnamespace
     LEFT JOIN pg_catalog.pg_type tt
     ON c.casttarget = tt.oid
     LEFT JOIN pg_catalog.pg_namespace nt
     ON nt.oid = tt.typnamespace
`),i&&r(n,`     LEFT JOIN pg_catalog.pg_description d
     ON d.classoid = c.tableoid AND d.objoid = c.oid AND d.objsubid = 0
`),r(n,"WHERE ( (true"),!U(n,o,!0,!1,"ns.nspname","ts.typname","pg_catalog.format_type(ts.oid, NULL)","pg_catalog.pg_typ\
e_is_visible(ts.oid)",l,3)||(r(n,") OR (true"),!U(n,o,!0,!1,"nt.nspname","tt.typname","pg_catalog.format_type(tt.oid, NU\
LL)","pg_catalog.pg_type_is_visible(tt.oid)",l,3))||(r(n,`) )
ORDER BY 1, 2;`),a=await u(n.data),!a)?!1:(s.nullPrint=l,s.title=R("List of casts"),s.translate_header=!0,s.translate_columns=
e,s.n_translate_columns=$(e),v(a,s,E.queryFout,!1,E.logfile),!0)}async function Ta(o,i,n){let a={},s,e=E.popt,c=[!1,!1,!1,
!1,!1,!1,!1,!0,!1];return b(a),N(a,`/* %s */
`,R("Get matching collations")),p(a,`SELECT
  n.nspname AS "%s",
  c.collname AS "%s",
`,t("Schema"),t("Name")),E.sversion>=1e5?p(a,`  CASE c.collprovider WHEN 'd' THEN 'default' WHEN 'b' THEN 'builtin' WHEN\
 'c' THEN 'libc' WHEN 'i' THEN 'icu' END AS "%s",
`,t("Provider")):p(a,`  'libc' AS "%s",
`,t("Provider")),p(a,`  c.collcollate AS "%s",
  c.collctype AS "%s",
`,t("Collate"),t("Ctype")),E.sversion>=17e4?p(a,`  c.colllocale AS "%s",
`,t("Locale")):E.sversion>=15e4?p(a,`  c.colliculocale AS "%s",
`,t("Locale")):p(a,`  c.collcollate AS "%s",
`,t("Locale")),E.sversion>=16e4?p(a,`  c.collicurules AS "%s",
`,t("ICU Rules")):p(a,`  NULL AS "%s",
`,t("ICU Rules")),E.sversion>=12e4?p(a,`  CASE WHEN c.collisdeterministic THEN '%s' ELSE '%s' END AS "%s"`,t("yes"),t("n\
o"),t("Deterministic?")):p(a,`  '%s' AS "%s"`,t("yes"),t("Deterministic?")),i&&p(a,`,
  pg_catalog.obj_description(c.oid, 'pg_collation') AS "%s"`,t("Description")),r(a,`
FROM pg_catalog.pg_collation c, pg_catalog.pg_namespace n
WHERE n.oid = c.collnamespace
`),!n&&!o&&r(a,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),r(a,`      AND c.collencoding IN (-1, pg_catalog.pg_char_to_encoding(pg_catalog.getdatabaseencoding()))
`),!U(a,o,!0,!1,"n.nspname","c.collname",l,"pg_catalog.pg_collation_is_visible(c.oid)",l,3)||(r(a,"ORDER BY 1, 2;"),s=await u(
a.data),!s)?!1:(e.nullPrint=l,e.title=R("List of collations"),e.translate_header=!0,e.translate_columns=c,e.n_translate_columns=
$(c),v(s,e,E.queryFout,!1,E.logfile),!0)}async function Ra(o,i,n){let a={},s,e=E.popt,c=0,f=l;if(b(a),N(a,`/* %s */
`,R("Get matching schemas")),p(a,`SELECT n.nspname AS "%s",
  pg_catalog.pg_get_userbyid(n.nspowner) AS "%s"`,t("Name"),t("Owner")),i&&(r(a,`,
  `),Ee(a,"n.nspacl"),p(a,`,
  pg_catalog.obj_description(n.oid, 'pg_namespace') AS "%s"`,t("Description"))),r(a,`
FROM pg_catalog.pg_namespace n
`),!n&&!o&&r(a,`WHERE n.nspname !~ '^pg_' AND n.nspname <> 'information_schema'
`),!U(a,o,!n&&!o,!1,l,"n.nspname",l,l,l,2)||(r(a,"ORDER BY 1;"),s=await u(a.data),!s))return!1;if(e.nullPrint=l,e.title=
R("List of schemas"),e.translate_header=!0,o&&E.sversion>=15e4){let S,T;if(N(a,`/* %s */
`,R("Get publications that publish this schema")),p(a,`SELECT pubname 
FROM pg_catalog.pg_publication p
     JOIN pg_catalog.pg_publication_namespace pn ON p.oid = pn.pnpubid
     JOIN pg_catalog.pg_namespace n ON n.oid = pn.pnnspid 
WHERE n.nspname = '%s'
ORDER BY 1`,o),S=await u(a.data),S)c=x(S);else return!1;if(c>0){for(f=[],f[0]=me(R("Included in publications:")),T=0;T<c;T++)
N(a,'    "%s"',g(S,T,0)),f[T+1]=me(a.data);f[T+1]=l,e.footers=f}}return v(s,e,E.queryFout,!1,E.logfile),!0}async function _a(o,i){
let n={},a,s=E.popt;return i?await Aa(o):(b(n),N(n,`/* %s */
`,R("Get matching text search parsers")),p(n,`SELECT
  n.nspname as "%s",
  p.prsname as "%s",
  pg_catalog.obj_description(p.oid, 'pg_ts_parser') as "%s"
FROM pg_catalog.pg_ts_parser p
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.prsnamespace
`,t("Schema"),t("Name"),t("Description")),!U(n,o,!1,!1,"n.nspname","p.prsname",l,"pg_catalog.pg_ts_parser_is_visible(p.o\
id)",l,3)||(r(n,"ORDER BY 1, 2;"),a=await u(n.data),!a)?!1:(s.nullPrint=l,s.title=R("List of text search parsers"),s.translate_header=
!0,v(a,s,E.queryFout,!1,E.logfile),!0))}async function Aa(o){let i={},n,a;if(b(i),N(i,`/* %s */
`,R("Get matching text search parsers")),r(i,`SELECT p.oid,
  n.nspname,
  p.prsname
FROM pg_catalog.pg_ts_parser p
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.prsnamespace
`),!U(i,o,!1,!1,"n.nspname","p.prsname",l,"pg_catalog.pg_ts_parser_is_visible(p.oid)",l,3)||(r(i,"ORDER BY 1, 2;"),n=await u(
i.data),!n))return!1;if(x(n)==0)return E.quiet||(o?M('Did not find any text search parser named "%s".',o):M("Did not fin\
d any text search parsers.")),!1;for(a=0;a<x(n);a++){let s,e=l,c;if(s=g(n,a,0),ie(n,a,1)||(e=g(n,a,1)),c=g(n,a,2),!await ga(
s,e,c)||B)return!1}return!0}async function ga(o,i,n){let a={},s,e={},c=E.popt,f=[!0,!1,!1];return b(a),N(a,`/* %s */
`,R("Get text search parser details")),p(a,`SELECT '%s' AS "%s",
   p.prsstart::pg_catalog.regproc AS "%s",
   pg_catalog.obj_description(p.prsstart, 'pg_proc') as "%s"
 FROM pg_catalog.pg_ts_parser p
 WHERE p.oid = '%s'
UNION ALL
SELECT '%s',
   p.prstoken::pg_catalog.regproc,
   pg_catalog.obj_description(p.prstoken, 'pg_proc')
 FROM pg_catalog.pg_ts_parser p
 WHERE p.oid = '%s'
UNION ALL
SELECT '%s',
   p.prsend::pg_catalog.regproc,
   pg_catalog.obj_description(p.prsend, 'pg_proc')
 FROM pg_catalog.pg_ts_parser p
 WHERE p.oid = '%s'
UNION ALL
SELECT '%s',
   p.prsheadline::pg_catalog.regproc,
   pg_catalog.obj_description(p.prsheadline, 'pg_proc')
 FROM pg_catalog.pg_ts_parser p
 WHERE p.oid = '%s'
UNION ALL
SELECT '%s',
   p.prslextype::pg_catalog.regproc,
   pg_catalog.obj_description(p.prslextype, 'pg_proc')
 FROM pg_catalog.pg_ts_parser p
 WHERE p.oid = '%s';`,t("Start parse"),t("Method"),t("Function"),t("Description"),o,t("Get next token"),o,t("End parse"),
o,t("Get headline"),o,t("Get token types"),o),s=await u(a.data),!s||(c.nullPrint=l,b(e),i?N(e,R('Text search parser "%s.\
%s"'),i,n):N(e,R('Text search parser "%s"'),n),c.title=e.data,c.footers=l,c.topt.default_footer=!1,c.translate_header=!0,
c.translate_columns=f,c.n_translate_columns=$(f),v(s,c,E.queryFout,!1,E.logfile),b(a),N(a,`/* %s */
`,R("Get text search parser token types")),p(a,`SELECT t.alias as "%s",
  t.description as "%s"
FROM pg_catalog.ts_token_type( '%s'::pg_catalog.oid ) as t
ORDER BY 1;`,t("Token name"),t("Description"),o),s=await u(a.data),!s)?!1:(c.nullPrint=l,i?N(e,R('Token types for parser\
 "%s.%s"'),i,n):N(e,R('Token types for parser "%s"'),n),c.title=e.data,c.footers=l,c.topt.default_footer=!0,c.translate_header=
!0,c.translate_columns=l,c.n_translate_columns=0,v(s,c,E.queryFout,!1,E.logfile),!0)}async function Na(o,i){let n={},a,s=E.
popt;return b(n),N(n,`/* %s */
`,R("Get matching text search dictionaries")),p(n,`SELECT
  n.nspname as "%s",
  d.dictname as "%s",
`,t("Schema"),t("Name")),i&&p(n,`  ( SELECT COALESCE(nt.nspname, '(null)')::pg_catalog.text || '.' || t.tmplname FROM
    pg_catalog.pg_ts_template t
    LEFT JOIN pg_catalog.pg_namespace nt ON nt.oid = t.tmplnamespace
    WHERE d.dicttemplate = t.oid ) AS  "%s",
  d.dictinitoption as "%s",
`,t("Template"),t("Init options")),p(n,`  pg_catalog.obj_description(d.oid, 'pg_ts_dict') as "%s"
`,t("Description")),r(n,`FROM pg_catalog.pg_ts_dict d
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = d.dictnamespace
`),!U(n,o,!1,!1,"n.nspname","d.dictname",l,"pg_catalog.pg_ts_dict_is_visible(d.oid)",l,3)||(r(n,"ORDER BY 1, 2;"),a=await u(
n.data),!a)?!1:(s.nullPrint=l,s.title=R("List of text search dictionaries"),s.translate_header=!0,v(a,s,E.queryFout,!1,E.
logfile),!0)}async function Sa(o,i){let n={},a,s=E.popt;return b(n),N(n,`/* %s */
`,R("Get matching text search templates")),i?p(n,`SELECT
  n.nspname AS "%s",
  t.tmplname AS "%s",
  t.tmplinit::pg_catalog.regproc AS "%s",
  t.tmpllexize::pg_catalog.regproc AS "%s",
  pg_catalog.obj_description(t.oid, 'pg_ts_template') AS "%s"
`,t("Schema"),t("Name"),t("Init"),t("Lexize"),t("Description")):p(n,`SELECT
  n.nspname AS "%s",
  t.tmplname AS "%s",
  pg_catalog.obj_description(t.oid, 'pg_ts_template') AS "%s"
`,t("Schema"),t("Name"),t("Description")),r(n,`FROM pg_catalog.pg_ts_template t
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.tmplnamespace
`),!U(n,o,!1,!1,"n.nspname","t.tmplname",l,"pg_catalog.pg_ts_template_is_visible(t.oid)",l,3)||(r(n,"ORDER BY 1, 2;"),a=
await u(n.data),!a)?!1:(s.nullPrint=l,s.title=R("List of text search templates"),s.translate_header=!0,v(a,s,E.queryFout,
!1,E.logfile),!0)}async function ma(o,i){let n={},a,s=E.popt;return i?await fa(o):(b(n),N(n,`/* %s */
`,R("Get matching text search configurations")),p(n,`SELECT
   n.nspname as "%s",
   c.cfgname as "%s",
   pg_catalog.obj_description(c.oid, 'pg_ts_config') as "%s"
FROM pg_catalog.pg_ts_config c
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.cfgnamespace
`,t("Schema"),t("Name"),t("Description")),!U(n,o,!1,!1,"n.nspname","c.cfgname",l,"pg_catalog.pg_ts_config_is_visible(c.o\
id)",l,3)||(r(n,"ORDER BY 1, 2;"),a=await u(n.data),!a)?!1:(s.nullPrint=l,s.title=R("List of text search configurations"),
s.translate_header=!0,v(a,s,E.queryFout,!1,E.logfile),!0))}async function fa(o){let i={},n,a;if(b(i),N(i,`/* %s */
`,R("Get matching text search configurations")),r(i,`SELECT c.oid, c.cfgname,
   n.nspname,
   p.prsname,
   np.nspname as pnspname
FROM pg_catalog.pg_ts_config c
   LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.cfgnamespace,
 pg_catalog.pg_ts_parser p
   LEFT JOIN pg_catalog.pg_namespace np ON np.oid = p.prsnamespace
WHERE  p.oid = c.cfgparser
`),!U(i,o,!0,!1,"n.nspname","c.cfgname",l,"pg_catalog.pg_ts_config_is_visible(c.oid)",l,3)||(r(i,"ORDER BY 3, 2;"),n=await u(
i.data),!n))return!1;if(x(n)==0)return E.quiet||(o?M('Did not find any text search configuration named "%s".',o):M("Did \
not find any text search configurations.")),!1;for(a=0;a<x(n);a++){let s,e,c=l,f,S=l;if(s=g(n,a,0),e=g(n,a,1),ie(n,a,2)||
(c=g(n,a,2)),f=g(n,a,3),ie(n,a,4)||(S=g(n,a,4)),!await Oa(s,c,e,S,f)||B)return!1}return!0}async function Oa(o,i,n,a,s){let e={},
c={},f,S=E.popt;return b(e),N(e,`/* %s */
`,R("Get text search configuration details")),p(e,`SELECT
  ( SELECT t.alias FROM
    pg_catalog.ts_token_type(c.cfgparser) AS t
    WHERE t.tokid = m.maptokentype ) AS "%s",
  pg_catalog.btrim(
    ARRAY( SELECT mm.mapdict::pg_catalog.regdictionary
           FROM pg_catalog.pg_ts_config_map AS mm
           WHERE mm.mapcfg = m.mapcfg AND mm.maptokentype = m.maptokentype
           ORDER BY mapcfg, maptokentype, mapseqno
    ) :: pg_catalog.text,
  '{}') AS "%s"
FROM pg_catalog.pg_ts_config AS c, pg_catalog.pg_ts_config_map AS m
WHERE c.oid = '%s' AND m.mapcfg = c.oid
GROUP BY m.mapcfg, m.maptokentype, c.cfgparser
ORDER BY 1;`,t("Token"),t("Dictionaries"),o),f=await u(e.data),f?(b(c),i?p(c,R('Text search configuration "%s.%s"'),i,n):
p(c,R('Text search configuration "%s"'),n),a?p(c,R(`
Parser: "%s.%s"`),a,s):p(c,R(`
Parser: "%s"`),s),S.nullPrint=l,S.title=c.data,S.footers=l,S.topt.default_footer=!1,S.translate_header=!0,v(f,S,E.queryFout,
!1,E.logfile),!0):!1}async function da(o,i){let n={},a,s=E.popt;return b(n),N(n,`/* %s */
`,R("Get matching foreign-data wrappers")),p(n,`SELECT fdw.fdwname AS "%s",
  pg_catalog.pg_get_userbyid(fdw.fdwowner) AS "%s",
  fdw.fdwhandler::pg_catalog.regproc AS "%s",
  fdw.fdwvalidator::pg_catalog.regproc AS "%s"`,t("Name"),t("Owner"),t("Handler"),t("Validator")),i&&(r(n,`,
  `),Ee(n,"fdwacl"),p(n,`,
 CASE WHEN fdwoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(opt\
ion_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(fdwoptions)),  ', '\
) || ')'   END AS "%s",
  d.description AS "%s" `,t("FDW options"),t("Description"))),r(n,`
FROM pg_catalog.pg_foreign_data_wrapper fdw
`),i&&r(n,`LEFT JOIN pg_catalog.pg_description d
       ON d.classoid = fdw.tableoid AND d.objoid = fdw.oid AND d.objsubid = 0
`),!U(n,o,!1,!1,l,"fdwname",l,l,l,1)||(r(n,"ORDER BY 1;"),a=await u(n.data),!a)?!1:(s.nullPrint=l,s.title=R("List of for\
eign-data wrappers"),s.translate_header=!0,v(a,s,E.queryFout,!1,E.logfile),!0)}async function ua(o,i){let n={},a,s=E.popt;
return b(n),N(n,`/* %s */
`,R("Get matching foreign servers")),p(n,`SELECT s.srvname AS "%s",
  pg_catalog.pg_get_userbyid(s.srvowner) AS "%s",
  f.fdwname AS "%s"`,t("Name"),t("Owner"),t("Foreign-data wrapper")),i&&(r(n,`,
  `),Ee(n,"s.srvacl"),p(n,`,
  s.srvtype AS "%s",
  s.srvversion AS "%s",
  CASE WHEN srvoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(op\
tion_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(srvoptions)),  ', \
') || ')'   END AS "%s",
  d.description AS "%s"`,t("Type"),t("Version"),t("FDW options"),t("Description"))),r(n,`
FROM pg_catalog.pg_foreign_server s
     JOIN pg_catalog.pg_foreign_data_wrapper f ON f.oid=s.srvfdw
`),i&&r(n,`LEFT JOIN pg_catalog.pg_description d
       ON d.classoid = s.tableoid AND d.objoid = s.oid AND d.objsubid = 0
`),!U(n,o,!1,!1,l,"s.srvname",l,l,l,1)||(r(n,"ORDER BY 1;"),a=await u(n.data),!a)?!1:(s.nullPrint=l,s.title=R("List of f\
oreign servers"),s.translate_header=!0,v(a,s,E.queryFout,!1,E.logfile),!0)}async function La(o,i){let n={},a,s=E.popt;return b(
n),N(n,`/* %s */
`,R("Get matching user mappings")),p(n,`SELECT um.srvname AS "%s",
  um.usename AS "%s"`,t("Server"),t("User name")),i&&p(n,`,
 CASE WHEN umoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(opti\
on_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(umoptions)),  ', ') \
|| ')'   END AS "%s"`,t("FDW options")),r(n,`
FROM pg_catalog.pg_user_mappings um
`),!U(n,o,!1,!1,l,"um.srvname","um.usename",l,l,1)||(r(n,"ORDER BY 1, 2;"),a=await u(n.data),!a)?!1:(s.nullPrint=l,s.title=
R("List of user mappings"),s.translate_header=!0,v(a,s,E.queryFout,!1,E.logfile),!0)}async function Ia(o,i){let n={},a,s=E.
popt;return b(n),N(n,`/* %s */
`,R("Get matching foreign tables")),p(n,`SELECT n.nspname AS "%s",
  c.relname AS "%s",
  s.srvname AS "%s"`,t("Schema"),t("Table"),t("Server")),i&&p(n,`,
 CASE WHEN ftoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(opti\
on_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(ftoptions)),  ', ') \
|| ')'   END AS "%s",
  d.description AS "%s"`,t("FDW options"),t("Description")),r(n,`
FROM pg_catalog.pg_foreign_table ft
  INNER JOIN pg_catalog.pg_class c ON c.oid = ft.ftrelid
  INNER JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
  INNER JOIN pg_catalog.pg_foreign_server s ON s.oid = ft.ftserver
`),i&&r(n,`   LEFT JOIN pg_catalog.pg_description d
          ON d.classoid = c.tableoid AND d.objoid = c.oid AND d.objsubid = 0
`),!U(n,o,!1,!1,"n.nspname","c.relname",l,"pg_catalog.pg_table_is_visible(c.oid)",l,3)||(r(n,"ORDER BY 1, 2;"),a=await u(
n.data),!a)?!1:(s.nullPrint=l,s.title=R("List of foreign tables"),s.translate_header=!0,v(a,s,E.queryFout,!1,E.logfile),
!0)}async function Ca(o){let i={},n,a=E.popt;return b(i),N(i,`/* %s */
`,R("Get matching installed extensions")),p(i,`SELECT e.extname AS "%s", e.extversion AS "%s", ae.default_version AS "%s\
",n.nspname AS "%s", d.description AS "%s"
FROM pg_catalog.pg_extension e LEFT JOIN pg_catalog.pg_namespace n ON n.oid = e.extnamespace LEFT JOIN pg_catalog.pg_des\
cription d ON d.objoid = e.oid AND d.classoid = 'pg_catalog.pg_extension'::pg_catalog.regclass LEFT JOIN pg_catalog.pg_a\
vailable_extensions() ae(name, default_version, comment) ON ae.name = e.extname
`,t("Name"),t("Version"),t("Default version"),t("Schema"),t("Description")),!U(i,o,!1,!1,l,"e.extname",l,l,l,1)||(r(i,"O\
RDER BY 1;"),n=await u(i.data),!n)?!1:(a.nullPrint=l,a.title=R("List of installed extensions"),a.translate_header=!0,v(n,
a,E.queryFout,!1,E.logfile),!0)}async function Da(o){let i={},n,a;if(b(i),N(i,`/* %s */
`,R("Get matching installed extensions")),r(i,`SELECT e.extname, e.oid
FROM pg_catalog.pg_extension e
`),!U(i,o,!1,!1,l,"e.extname",l,l,l,1)||(r(i,"ORDER BY 1;"),n=await u(i.data),!n))return!1;if(x(n)==0)return E.quiet||(o?
M('Did not find any extension named "%s".',o):M("Did not find any extensions.")),!1;for(a=0;a<x(n);a++){let s,e;if(s=g(n,
a,0),e=g(n,a,1),!await ba(s,e)||B)return!1}return!0}async function ba(o,i){let n={},a,s={},e=E.popt;return b(n),N(n,`/* \
%s */
`,R("Get installed extension's contents")),p(n,`SELECT pg_catalog.pg_describe_object(classid, objid, 0) AS "%s"
FROM pg_catalog.pg_depend
WHERE refclassid = 'pg_catalog.pg_extension'::pg_catalog.regclass AND refobjid = '%s' AND deptype = 'e'
ORDER BY 1;`,t("Object description"),i),a=await u(n.data),a?(e.nullPrint=l,b(s),N(s,R('Objects in extension "%s"'),o),e.
title=s.data,e.translate_header=!0,v(a,e,E.queryFout,!1,E.logfile),!0):!1}async function Ua(o){let i={},n,a=E.popt,s=[!1,
!1,!1,!1,!1,!1,!1,!1,!1,!1];if(E.sversion<1e5){let e;return M("The server (version %s) does not support publications.",Ie(
E.sversion,!1,e,Le(e))),!0}return b(i),N(i,`/* %s */
`,R("Get matching publications")),p(i,`SELECT pubname AS "%s",
  pg_catalog.pg_get_userbyid(pubowner) AS "%s",
  puballtables AS "%s"`,t("Name"),t("Owner"),t("All tables")),E.sversion>=19e4&&p(i,`,
  puballsequences AS "%s"`,t("All sequences")),p(i,`,
  pubinsert AS "%s",
  pubupdate AS "%s",
  pubdelete AS "%s"`,t("Inserts"),t("Updates"),t("Deletes")),E.sversion>=11e4&&p(i,`,
  pubtruncate AS "%s"`,t("Truncates")),E.sversion>=18e4&&p(i,`,
 (CASE pubgencols
    WHEN '%c' THEN 'none'
    WHEN '%c' THEN 'stored'
   END) AS "%s"`,Cn,Dn,t("Generated columns")),E.sversion>=13e4&&p(i,`,
  pubviaroot AS "%s"`,t("Via root")),r(i,`
FROM pg_catalog.pg_publication
`),!U(i,o,!1,!1,l,"pubname",l,l,l,1)||(r(i,"ORDER BY 1;"),n=await u(i.data),!n)?!1:(a.title=R("List of publications"),a.
translate_header=!0,a.translate_columns=s,a.n_translate_columns=$(s),v(n,a,E.queryFout,!1,E.logfile),!0)}async function Rn(o,i,n,a){
let s,e=0,c=0;if(s=await u(o.data),s)e=x(s);else return!1;for(e>0&&y(a,i),c=0;c<e;c++)n?N(o,'    "%s"',g(s,c,0)):(N(o,' \
   "%s.%s"',g(s,c,0),g(s,c,1)),ie(s,c,3)||p(o," (%s)",g(s,c,3)),ie(s,c,2)||p(o," WHERE %s",g(s,c,2))),y(a,o.data);return!0}
async function Pa(o){let i={},n,a,s,e,c,f,S=6,T=1,F={},m={};if(E.sversion<1e5){let D;return M("The server (version %s) d\
oes not support publications.",Ie(E.sversion,!1,D,Le(D))),!0}if(f=E.sversion>=19e4,s=E.sversion>=11e4,e=E.sversion>=18e4,
c=E.sversion>=13e4,b(i),N(i,`/* %s */
`,R("Get details about matching publications")),r(i,`SELECT oid, pubname,
  pg_catalog.pg_get_userbyid(pubowner) AS owner,
  puballtables`),f?r(i,", puballsequences"):r(i,", false AS puballsequences"),r(i,", pubinsert, pubupdate, pubdelete"),s?
r(i,", pubtruncate"):r(i,", false AS pubtruncate"),e?p(i,`, (CASE pubgencols
    WHEN '%c' THEN 'none'
    WHEN '%c' THEN 'stored'
   END) AS "%s"
`,Cn,Dn,t("Generated columns")):r(i,", 'none' AS pubgencols"),c?r(i,", pubviaroot"):r(i,", false AS pubviaroot"),r(i,", \
pg_catalog.obj_description(oid, 'pg_publication')"),r(i,`
FROM pg_catalog.pg_publication
`),!U(i,o,!1,!1,l,"pubname",l,l,l,1)||(r(i,"ORDER BY 2;"),a=await u(i.data),!a))return!1;if(x(a)==0)return E.quiet||(o?M(
'Did not find any publication named "%s".',o):M("Did not find any publications.")),!1;for(f&&S++,s&&S++,e&&S++,c&&S++,n=
0;n<x(a);n++){let D="l",O=g(a,n,0),G=g(a,n,1),z=H(g(a,n,3),"t")==0,ee=E.popt.topt;if(b(F),N(F,R("Publication %s"),G),xe(
m,ee,F.data,S,T),ae(m,t("Owner"),!0,D),ae(m,t("All tables"),!0,D),f&&ae(m,t("All sequences"),!0,D),ae(m,t("Inserts"),!0,
D),ae(m,t("Updates"),!0,D),ae(m,t("Deletes"),!0,D),s&&ae(m,t("Truncates"),!0,D),e&&ae(m,t("Generated columns"),!0,D),c&&
ae(m,t("Via root"),!0,D),ae(m,t("Description"),!0,D),j(m,g(a,n,2),!1,!1),j(m,g(a,n,3),!1,!1),f&&j(m,g(a,n,4),!1,!1),j(m,
g(a,n,5),!1,!1),j(m,g(a,n,6),!1,!1),j(m,g(a,n,7),!1,!1),s&&j(m,g(a,n,8),!1,!1),e&&j(m,g(a,n,9),!1,!1),c&&j(m,g(a,n,10),!1,
!1),j(m,g(a,n,11),!1,!1),z){if(E.sversion>=19e4&&(N(i,`/* %s */
`,R("Get tables excluded by this publication")),p(i,`SELECT n.nspname || '.' || c.relname
FROM pg_catalog.pg_class c
     JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
     JOIN pg_catalog.pg_publication_rel pr ON c.oid = pr.prrelid
WHERE pr.prpubid = '%s' AND pr.prexcept
ORDER BY 1`,O),!await Rn(i,R("Except tables:"),!0,m)))return!1}else if(N(i,`/* %s */
`,R("Get tables published by this publication")),r(i,"SELECT n.nspname, c.relname"),E.sversion>=15e4?(r(i,", pg_catalog.\
pg_get_expr(pr.prqual, c.oid)"),r(i,`, (CASE WHEN pr.prattrs IS NOT NULL THEN
     pg_catalog.array_to_string(      ARRAY(SELECT attname
              FROM
                pg_catalog.generate_series(0, pg_catalog.array_upper(pr.prattrs::pg_catalog.int2[], 1)) s,
                pg_catalog.pg_attribute
        WHERE attrelid = c.oid AND attnum = prattrs[s]), ', ')
       ELSE NULL END)`)):r(i,", NULL, NULL"),p(i,`
FROM pg_catalog.pg_class c,
     pg_catalog.pg_namespace n,
     pg_catalog.pg_publication_rel pr
WHERE c.relnamespace = n.oid
  AND c.oid = pr.prrelid
  AND pr.prpubid = '%s'
`,O),E.sversion>=19e4&&r(i,`  AND NOT pr.prexcept
`),r(i,"ORDER BY 1,2"),!await Rn(i,R("Tables:"),!1,m)||E.sversion>=15e4&&(N(i,`/* %s */
`,R("Get schemas published by this publication")),p(i,`SELECT n.nspname
FROM pg_catalog.pg_namespace n
     JOIN pg_catalog.pg_publication_namespace pn ON n.oid = pn.pnnspid
WHERE pn.pnpubid = '%s'
ORDER BY 1`,O),!await Rn(i,R("Tables from schemas:"),!0,m)))return!1;ze(m,E.queryFout,!1,E.logfile)}return!0}async function Fa(o,i){
let n={},a,s=E.popt,e=[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1];if(E.sversion<1e5){let c;return M(
"The server (version %s) does not support subscriptions.",Ie(E.sversion,!1,c,Le(c))),!0}return b(n),N(n,`/* %s */
`,R("Get matching subscriptions")),p(n,`SELECT subname AS "%s"
,  pg_catalog.pg_get_userbyid(subowner) AS "%s"
,  subenabled AS "%s"
,  subpublications AS "%s"
`,t("Name"),t("Owner"),t("Enabled"),t("Publication")),i&&(E.sversion>=14e4&&(p(n,`, subbinary AS "%s"
`,t("Binary")),E.sversion>=16e4?p(n,`, (CASE substream
    WHEN 'f' THEN 'off'
    WHEN 't' THEN 'on'
    WHEN 'p' THEN 'parallel'
   END) AS "%s"
`,t("Streaming")):p(n,`, substream AS "%s"
`,t("Streaming"))),E.sversion>=15e4&&p(n,`, subtwophasestate AS "%s"
, subdisableonerr AS "%s"
`,t("Two-phase commit"),t("Disable on error")),E.sversion>=16e4&&p(n,`, suborigin AS "%s"
, subpasswordrequired AS "%s"
, subrunasowner AS "%s"
`,t("Origin"),t("Password required"),t("Run as owner?")),E.sversion>=17e4&&p(n,`, subfailover AS "%s"
`,t("Failover")),E.sversion>=19e4&&(p(n,`, (select srvname from pg_catalog.pg_foreign_server where oid=subserver) AS "%s\
"
`,t("Server")),p(n,`, subretaindeadtuples AS "%s"
`,t("Retain dead tuples")),p(n,`, submaxretention AS "%s"
`,t("Max retention duration")),p(n,`, subretentionactive AS "%s"
`,t("Retention active"))),p(n,`,  subsynccommit AS "%s"
,  subconninfo AS "%s"
`,t("Synchronous commit"),t("Conninfo")),E.sversion>=19e4&&p(n,`, subwalrcvtimeout AS "%s"
`,t("Receiver timeout")),E.sversion>=15e4&&p(n,`, subskiplsn AS "%s"
`,t("Skip LSN")),p(n,`,  pg_catalog.obj_description(oid, 'pg_subscription') AS "%s"
`,t("Description"))),r(n,`FROM pg_catalog.pg_subscription
WHERE subdbid = (SELECT oid
                 FROM pg_catalog.pg_database
                 WHERE datname = pg_catalog.current_database())`),!U(n,o,!0,!1,l,"subname",l,l,l,1)||(r(n,"ORDER BY 1;"),
a=await u(n.data),!a)?!1:(s.nullPrint=l,s.title=R("List of subscriptions"),s.translate_header=!0,s.translate_columns=e,s.
n_translate_columns=$(e),v(a,s,E.queryFout,!1,E.logfile),!0)}function Ee(o,i){p(o,`CASE WHEN pg_catalog.array_length(%s,\
 1) = 0 THEN '%s' ELSE pg_catalog.array_to_string(%s, E'\\n') END AS "%s"`,i,t("(none)"),i,t("Access privileges"))}async function ha(o,i,n){
let a={},s,e=E.popt,c=!1,f=[!1,!1,!1,!1,!1,!1,!1];if(b(a),N(a,`/* %s */
`,R("Get matching operator classes")),p(a,`SELECT
  am.amname AS "%s",
  pg_catalog.format_type(c.opcintype, NULL) AS "%s",
  CASE
    WHEN c.opckeytype <> 0 AND c.opckeytype <> c.opcintype
    THEN pg_catalog.format_type(c.opckeytype, NULL)
    ELSE NULL
  END AS "%s",
  CASE
    WHEN pg_catalog.pg_opclass_is_visible(c.oid)
    THEN pg_catalog.format('%%I', c.opcname)
    ELSE pg_catalog.format('%%I.%%I', n.nspname, c.opcname)
  END AS "%s",
  (CASE WHEN c.opcdefault
    THEN '%s'
    ELSE '%s'
  END) AS "%s"`,t("AM"),t("Input type"),t("Storage type"),t("Operator class"),t("yes"),t("no"),t("Default?")),n&&p(a,`,
  CASE
    WHEN pg_catalog.pg_opfamily_is_visible(of.oid)
    THEN pg_catalog.format('%%I', of.opfname)
    ELSE pg_catalog.format('%%I.%%I', ofn.nspname, of.opfname)
  END AS "%s",
 pg_catalog.pg_get_userbyid(c.opcowner) AS "%s"
`,t("Operator family"),t("Owner")),r(a,`
FROM pg_catalog.pg_opclass c
  LEFT JOIN pg_catalog.pg_am am on am.oid = c.opcmethod
  LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.opcnamespace
  LEFT JOIN pg_catalog.pg_type t ON t.oid = c.opcintype
  LEFT JOIN pg_catalog.pg_namespace tn ON tn.oid = t.typnamespace
`),n&&r(a,`  LEFT JOIN pg_catalog.pg_opfamily of ON of.oid = c.opcfamily
  LEFT JOIN pg_catalog.pg_namespace ofn ON ofn.oid = of.opfnamespace
`),o){if(c={value:c},!U(a,o,!1,!1,l,"am.amname",l,l,c,1))return!1;c=c.value}return i&&!U(a,i,c,!1,"tn.nspname","t.typnam\
e","pg_catalog.format_type(t.oid, NULL)","pg_catalog.pg_type_is_visible(t.oid)",l,3)||(r(a,"ORDER BY 1, 2, 4;"),s=await u(
a.data),!s)?!1:(e.nullPrint=l,e.title=R("List of operator classes"),e.translate_header=!0,e.translate_columns=f,e.n_translate_columns=
$(f),v(s,e,E.queryFout,!1,E.logfile),!0)}async function ya(o,i,n){let a={},s,e=E.popt,c=!1,f=[!1,!1,!1,!1];if(b(a),N(a,`\
/* %s */
`,R("Get matching operator families")),p(a,`SELECT
  am.amname AS "%s",
  CASE
    WHEN pg_catalog.pg_opfamily_is_visible(f.oid)
    THEN pg_catalog.format('%%I', f.opfname)
    ELSE pg_catalog.format('%%I.%%I', n.nspname, f.opfname)
  END AS "%s",
  (SELECT
     pg_catalog.string_agg(pg_catalog.format_type(oc.opcintype, NULL), ', ')
   FROM pg_catalog.pg_opclass oc
   WHERE oc.opcfamily = f.oid) "%s"`,t("AM"),t("Operator family"),t("Applicable types")),n&&p(a,`,
  pg_catalog.pg_get_userbyid(f.opfowner) AS "%s"
`,t("Owner")),r(a,`
FROM pg_catalog.pg_opfamily f
  LEFT JOIN pg_catalog.pg_am am on am.oid = f.opfmethod
  LEFT JOIN pg_catalog.pg_namespace n ON n.oid = f.opfnamespace
`),o){if(c={value:c},!U(a,o,!1,!1,l,"am.amname",l,l,c,1))return!1;c=c.value}if(i){if(p(a,`  %s EXISTS (
    SELECT 1
    FROM pg_catalog.pg_type t
    JOIN pg_catalog.pg_opclass oc ON oc.opcintype = t.oid
    LEFT JOIN pg_catalog.pg_namespace tn ON tn.oid = t.typnamespace
    WHERE oc.opcfamily = f.oid
`,c?"AND":"WHERE"),!U(a,i,!0,!1,"tn.nspname","t.typname","pg_catalog.format_type(t.oid, NULL)","pg_catalog.pg_type_is_vi\
sible(t.oid)",l,3))return!1;r(a,`  )
`)}return r(a,"ORDER BY 1, 2;"),s=await u(a.data),s?(e.nullPrint=l,e.title=R("List of operator families"),e.translate_header=
!0,e.translate_columns=f,e.n_translate_columns=$(f),v(s,e,E.queryFout,!1,E.logfile),!0):!1}async function Ha(o,i,n){let a={},
s,e=E.popt,c=!1,f=[!1,!1,!1,!1,!1,!1,!0];if(b(a),N(a,`/* %s */
`,R("Get operators of matching operator families")),p(a,`SELECT
  am.amname AS "%s",
  CASE
    WHEN pg_catalog.pg_opfamily_is_visible(of.oid)
    THEN pg_catalog.format('%%I', of.opfname)
    ELSE pg_catalog.format('%%I.%%I', nsf.nspname, of.opfname)
  END AS "%s",
  o.amopopr::pg_catalog.regoperator AS "%s"
,  o.amopstrategy AS "%s",
  CASE o.amoppurpose
    WHEN 'o' THEN '%s'
    WHEN 's' THEN '%s'
  END AS "%s"
`,t("AM"),t("Operator family"),t("Operator"),t("Strategy"),t("ordering"),t("search"),t("Purpose")),n&&p(a,`, ofs.opfname\
 AS "%s",
  CASE
    WHEN p.proleakproof THEN '%s'
    ELSE '%s'
  END AS "%s"
`,t("Sort opfamily"),t("yes"),t("no"),t("Leakproof?")),r(a,`FROM pg_catalog.pg_amop o
  LEFT JOIN pg_catalog.pg_opfamily of ON of.oid = o.amopfamily
  LEFT JOIN pg_catalog.pg_am am ON am.oid = of.opfmethod AND am.oid = o.amopmethod
  LEFT JOIN pg_catalog.pg_namespace nsf ON of.opfnamespace = nsf.oid
`),n&&r(a,`  LEFT JOIN pg_catalog.pg_opfamily ofs ON ofs.oid = o.amopsortfamily
  LEFT JOIN pg_catalog.pg_operator op ON op.oid = o.amopopr
  LEFT JOIN pg_catalog.pg_proc p ON p.oid = op.oprcode
`),o){if(c={value:c},!U(a,o,!1,!1,l,"am.amname",l,l,c,1))return!1;c=c.value}return i&&!U(a,i,c,!1,"nsf.nspname","of.opfn\
ame",l,l,l,3)||(r(a,`ORDER BY 1, 2,
  o.amoplefttype = o.amoprighttype DESC,
  pg_catalog.format_type(o.amoplefttype, NULL),
  pg_catalog.format_type(o.amoprighttype, NULL),
  o.amopstrategy;`),s=await u(a.data),!s)?!1:(e.nullPrint=l,e.title=R("List of operators of operator families"),e.translate_header=
!0,e.translate_columns=f,e.n_translate_columns=$(f),v(s,e,E.queryFout,!1,E.logfile),!0)}async function wa(o,i,n){let a={},
s,e=E.popt,c=!1,f=[!1,!1,!1,!1,!1,!1];if(b(a),N(a,`/* %s */
`,R("Get support functions of matching operator families")),p(a,`SELECT
  am.amname AS "%s",
  CASE
    WHEN pg_catalog.pg_opfamily_is_visible(of.oid)
    THEN pg_catalog.format('%%I', of.opfname)
    ELSE pg_catalog.format('%%I.%%I', ns.nspname, of.opfname)
  END AS "%s",
  pg_catalog.format_type(ap.amproclefttype, NULL) AS "%s",
  pg_catalog.format_type(ap.amprocrighttype, NULL) AS "%s",
  ap.amprocnum AS "%s"
`,t("AM"),t("Operator family"),t("Registered left type"),t("Registered right type"),t("Number")),n?p(a,`, ap.amproc::pg_\
catalog.regprocedure AS "%s"
`,t("Function")):p(a,`, p.proname AS "%s"
`,t("Function")),r(a,`FROM pg_catalog.pg_amproc ap
  LEFT JOIN pg_catalog.pg_opfamily of ON of.oid = ap.amprocfamily
  LEFT JOIN pg_catalog.pg_am am ON am.oid = of.opfmethod
  LEFT JOIN pg_catalog.pg_namespace ns ON of.opfnamespace = ns.oid
  LEFT JOIN pg_catalog.pg_proc p ON ap.amproc = p.oid
`),o){if(c={value:c},!U(a,o,!1,!1,l,"am.amname",l,l,c,1))return!1;c=c.value}return i&&!U(a,i,c,!1,"ns.nspname","of.opfna\
me",l,l,l,3)||(r(a,`ORDER BY 1, 2,
  ap.amproclefttype = ap.amprocrighttype DESC,
  3, 4, 5;`),s=await u(a.data),!s)?!1:(e.nullPrint=l,e.title=R("List of support functions of operator families"),e.translate_header=
!0,e.translate_columns=f,e.n_translate_columns=$(f),v(s,e,E.queryFout,!1,E.logfile),!0)}async function Ma(o){let i={},n,
a=E.popt;if(b(i),N(i,`/* %s */
`,R("Get large objects")),p(i,`SELECT oid as "%s",
  pg_catalog.pg_get_userbyid(lomowner) as "%s",
  `,t("ID"),t("Owner")),o&&(Ee(i,"lomacl"),r(i,`,
  `)),p(i,`pg_catalog.obj_description(oid, 'pg_largeobject') as "%s"
FROM pg_catalog.pg_largeobject_metadata
ORDER BY oid`,t("Description")),n=await u(i.data),!n)return!1;a.nullPrint=l,a.title=R("Large objects"),a.translate_header=
!0,v(n,a,E.queryFout,!1,E.logfile)}return!0}return{promise:fe(),cancel:Re}}function cn(A,L,C,P="",w=""){let Y=Math.max(0,
L-he(A));return C==="r"?P+" ".repeat(Y)+A+w:C==="c"?P+" ".repeat(Math.floor(Y/2))+A+" ".repeat(Math.ceil(Y/2))+w:P+A+" ".
repeat(Y)+w}function hn(A,L){let C=0,P=A.length,w=[];for(;C<P;)w.push(A.slice(C,C+=L));return w}function mn(A){let L=-1,
C=0,P=1,w=0;for(;(L=A.indexOf(`
`,L+1))!==-1;)L-C>w&&(w=L-C),C=L+1,P++;return A.length-C>w&&(w=A.length-C),{count:P,longest:w}}function ce(A,L){return A=
A.replace(/[<>&'"]/g,C=>({"<":"&lt;",">":"&gt;","&":"&amp;","'":"&apos;",'"':"&quot;"})[C]),L&&(A=A.replace(/ /g,"&nbsp;").
replace(/\n/g,"<br />")),A}function Nt(A,L){let{ncolumns:C,nrows:P,headers:w,cells:Y}=A;if(Y.length===0)return`(${P} row${P===
1?"":"s"})`;let k=w.map(mn),V=Math.max(...k.map(E=>E.longest)),B=Y.map(mn),Re=Math.max(...B.map(E=>E.longest)),re=3,fe=P===
0?0:13+(Math.log10(A.nrows)|0),Oe=Math.max(V+re+Re,fe),_e="";for(let E=0,M=Y.length,U=0;E<M;E++){let de=E%C;if(de===0){U++;
let te=`-[ RECORD ${U} ]`;te.length<V+1&&(te+="-".repeat(V-te.length+1)),te.length<V+2&&(te+="+"),te.length<Oe&&(te+="-".
repeat(Oe-te.length)),_e+=`
${te}`}let Ke=w[de].split(`
`),v=Ke.length,ae=Y[E].split(`
`),j=ae.length,y=Math.max(v,j);for(let te=0;te<y;te++)_e+=`
`+cn(Ke[te]??"",V)+(v>te+1?"+":" ")+"| "+cn(ae[te]??"",Re)+(j>te+1?"+":"")}let J=A.footers?A.footers.filter(ye):[],oe=J.
length>0?`

`+J.join(`
`):"";return`${A.title}${_e}${oe}`}function St(A,L){if(L&&L.popt&&L.popt.expanded)return Nt(A,L);let{ncolumns:C,nrows:P,
aligns:w}=A,Y=[...A.headers,...A.cells].map(mn),{colWidths:k,rowHeights:V}=Y.reduce((oe,u,E)=>{let M=Math.floor(E/A.ncolumns),
U=E%A.ncolumns;return u.longest>oe.colWidths[U]&&(oe.colWidths[U]=u.longest),u.count>oe.rowHeights[M]&&(oe.rowHeights[M]=
u.count),oe},{colWidths:new Array(C).fill(0),rowHeights:new Array(P+1).fill(1)}),B=k.reduce((oe,u)=>oe+u,0)+C*2+(C-1),Re=cn(
A.title,B,"c"),re=[A.headers,null,...hn(A.cells,C)],fe=re.map((oe,u)=>{if(u===1)return A.headers.map((M,U)=>"-".repeat(k[U%
C]+2)).join("+");u>1&&u--;let E=oe.map(M=>M.split(`
`));return new Array(V[u]).fill("").map((M,U)=>E.map((de,ve)=>cn(de[U]??"",k[ve],u===0?"c":w[ve]," ",de[U+1]===void 0?" ":
"+")).join("|")).join(`
`)}).join(`
`),Oe=A.footers?A.footers.filter(ye):[],_e=Oe.length>0?`
`+Oe.join(`
`):A.opt.default_footer?`
(${P} row${P===1?"":"s"})`:"";return`${Re}
${fe}${_e}`}function mt(A,L){let{ncolumns:C,cells:P,headers:w}=A,Y=`<table><tr><th align="left" colspan="2">${ce(A.title)}\
</th></tr>`,k=w.map(B=>ce(B,!0));for(let B=0,Re=P.length,re=0;B<Re;B++){let fe=B%C;fe===0&&(re++,Y+=`<tr><th align="left\
" colspan="2">RECORD ${re}</th></tr>`);let Oe=k[fe],_e=ce(P[B],!0);Y+=`<tr><td valign="top">${Oe}</td><td valign="top">${_e}\
</td></tr>`}Y+="</table>";let V=A.footers?A.footers.filter(ye):[];return V.length>0&&(V.length>1&&V.some(B=>/^\s/.test(B))?
Y+="<dl>"+V.map(B=>/^\s/.test(B)?`<dd>${ce(B.trim(),!0)}</dd>`:`<dt>${ce(B,!0)}</dt>`).join("")+"</dl>":Y+=V.map(B=>`<p>${ce(
B,!0)}</p>`).join("")),Y}function ft(A,L){if(L&&L.popt&&L.popt.expanded)return mt(A,L);let C=`<table><tr><th valign="top\
" style="text-align: center;" colspan="${A.ncolumns}">${ce(A.title)}</th></tr><tr>`;for(let w of A.headers)C+=`<th valig\
n="top" style="text-align: center;">${ce(w)}</th>`;C+="</tr>";for(let w of hn(A.cells,A.ncolumns))C+="<tr>"+w.map((Y,k)=>`\
<td valign="top" style="text-align: ${A.aligns[k]==="c"?"center":A.aligns[k]==="r"?"right":"left"}">${ce(Y).replace(/\n/g,
"<br>")}</td>`).join(`
`)+"</tr>";C+="</table>";let P=A.footers?A.footers.filter(ye):[];return P.length>0?P.length>1&&P.some(w=>/^\s/.test(w))?
C+="<dl>"+P.map(w=>/^\s/.test(w)?`<dd>${ce(w.trim(),!0)}</dd>`:`<dt>${ce(w,!0)}</dt>`).join("")+"</dl>":C+=P.map(w=>`<p>${ce(
w,!0)}</p>`).join(""):A.opt.default_footer&&(C+=`<p>(${A.nrows} row${A.nrows===1?"":"s"})</p>`),C}function Me(A){if(!A)throw new Error(
`Assertion failed (value: ${A})`)}var t=ye,me=ye,R=ye;function En(A,L){let C=A.indexOf(L);return C===-1?l:C}var Z=En;function he(A){
return A.length}function We(A,L,C){if(typeof A!="string"||typeof L!="string")throw new Error("Not a string");return A.length>
C&&(A=A.slice(0,C)),L.length>C&&(L=L.slice(0,C)),A<L?-1:A>L?1:0}function H(A,L){return We(A,L,1/0)}function Ot(A,L){let C=he(
A);for(let P=0;P<C;P++)if(L.indexOf(A[P])===-1)return P;return C}function bn(A){return parseInt(A,10)}function Nn(A){return parseInt(
A,10)}function Un(A){return A===" "||A==="	"||A===`
`||A==="\r"}function dt(A){return A==='"'||A==="'"}function ut(A){let L=A.charCodeAt(0);return L>=65&&L<=90}function $(A){
return A.length}function fn(A){return A.toLowerCase()}function Lt(A,L){return H(A.toLowerCase(),L.toLowerCase())}function Le(A){return 0}function b(A){A.data="",A.len=0}var rn=b;function r(A,L){A.data+=L,A.len=A.data.length}var K=r;function p(A,L,...C){
let P=se(L,...C);r(A,P)}function N(A,L,...C){b(A),p(A,L,...C)}function On(A,L,C,P){let Y="'"+L.replace(P?/[']/g:/['\\]/g,
"\\$&")+"'";r(A,Y)}function Ge(A,L,C){if(Z(L,"\\")!=l&&Je(C)<19e4){A.len>0&&A.data[A.len-1]!=" "&&K(A," "),K(A,Ba),On(A,
L,yn(C),!1);return}On(A,L,C.encoding,C.std_strings)}function se(A,...L){let C="",P=0,w=0,Y;for(;(Y=A.indexOf("%",w))!==-1;){
let k=0,V=!1;C+=A.slice(w,Y),w=Y+1;let B=A[w++];if(B==="%"&&(C+="%"),B==="*"&&(k=parseInt(L[P++],10),B=A[w++]),B==="-"&&
(V=!0,B=A[w++]),B>="0"&&B<="9"&&(k=parseInt(B,10),B=A[w++]),B==="s"||B==="c"||B==="d"||B==="u"){let Re=String(L[P++]),re=k-
Re.length;V===!1&&re>0&&(C+=" ".repeat(re)),C+=Re,V===!0&&re>0&&(C+=" ".repeat(re))}}return C+=A.slice(w),C}var ln=se;function Pn(A){
return A?A.dbName:l}function Je(A){return!A||A.status===ka?0:A.sversion}function yn(A){return!A||A.status!=Fn?-1:A.client_encoding}
function x(A){return A.rowCount}function Hn(A){return A.fields.length}function wn(A,L){return A.fields[L].name}function It(A,L){
return A.fields[L].dataTypeID}function ie(A,L,C){return A.rows[L][C]===null?1:0}function g(A,L,C){let P=A.rows[L][C];return String(
P===null?"":P)}function Ue(A,L){let C,P,w,Y,k;if(!A||L==l||L[0]==l)return-1;for(C=!1,w="",P=0,k=he(L);P<k;P++){let V=L[P];
C?V=='"'?L[P+1]=='"'?(w+='"',P++):C=!1:w+=V:V=='"'?C=!0:(V=fn(V),w+=V)}for(Y=0,k=Hn(A);Y<k;Y++)if(H(w,wn(A,Y))==0)return Y;
return-1}function Ie(A,L,C,P){return A>=1e5?L?C=se("%d.%d",Math.floor(A/1e4),A%1e4):C=se("%d",A/1e4):L?C=se("%d.%d.%d",Math.
floor(A/1e4),Math.floor(A/100)%100,A%100):C=se("%d.%d",Math.floor(A/1e4),Math.floor(A/100)%100),C}function Pe(A,L,C,P){if(L!==
Fe&&L!==Sn)throw new Error(`scan type ${L} not implemented`);if(C!==l)throw new Error("cannot return quote type");let w=[],
Y=P?/^(.*);*$/:/^(.*)$/,k;for(;;){if(k=A[0][A[1]],k==l)return l;if(!Un(k))break;A[1]++}if(L===Sn)return A[0].slice(A[1],
A[1]=A[0].length);let V="";for(;;){if(k=A[0][A[1]++],k==l)return w.length>0?l:V.match(Y)[1];if(dt(k))k===w[w.length-1]?w.
pop():w.push(k),k==='"'&&(V+=k);else{if(w.length===0&&Un(k))return V.match(Y)[1];V+=k}}}function ye(A){return A}var Ct=`\
Help
  \\? [commands]          show help on backslash commands
  \\h [NAME]              help on syntax of SQL commands, * for all commands

Informational
  (options: S = show system objects, x = expanded mode, + = additional detail)
  \\d[Sx+]                list tables, views, and sequences
  \\d[S+]   NAME          describe table, view, sequence, or index
  \\da[Sx]  [PATTERN]     list aggregates
  \\dA[x+]  [PATTERN]     list access methods
  \\dAc[x+] [AMPTRN [TYPEPTRN]]  list operator classes
  \\dAf[x+] [AMPTRN [TYPEPTRN]]  list operator families
  \\dAo[x+] [AMPTRN [OPFPTRN]]   list operators of operator families
  \\dAp[x+] [AMPTRN [OPFPTRN]]   list support functions of operator families
  \\db[x+]  [PATTERN]     list tablespaces
  \\dc[Sx+] [PATTERN]     list conversions
  \\dconfig[x+] [PATTERN] list configuration parameters
  \\dC[x+]  [PATTERN]     list casts
  \\dd[Sx]  [PATTERN]     show object descriptions not displayed elsewhere
  \\dD[Sx+] [PATTERN]     list domains
  \\ddp[x]  [PATTERN]     list default privileges
  \\dE[Sx+] [PATTERN]     list foreign tables
  \\des[x+] [PATTERN]     list foreign servers
  \\det[x+] [PATTERN]     list foreign tables
  \\deu[x+] [PATTERN]     list user mappings
  \\dew[x+] [PATTERN]     list foreign-data wrappers
  \\df[anptw][Sx+] [FUNCPTRN [TYPEPTRN ...]]
                         list [only agg/normal/procedure/trigger/window] functions
  \\dF[x+]  [PATTERN]     list text search configurations
  \\dFd[x+] [PATTERN]     list text search dictionaries
  \\dFp[x+] [PATTERN]     list text search parsers
  \\dFt[x+] [PATTERN]     list text search templates
  \\dg[Sx+] [PATTERN]     list roles
  \\di[Sx+] [PATTERN]     list indexes
  \\dl[x+]                list large objects, same as \\lo_list
  \\dL[Sx+] [PATTERN]     list procedural languages
  \\dm[Sx+] [PATTERN]     list materialized views
  \\dn[Sx+] [PATTERN]     list schemas
  \\do[Sx+] [OPPTRN [TYPEPTRN [TYPEPTRN]]]
                         list operators
  \\dO[Sx+] [PATTERN]     list collations
  \\dp[Sx]  [PATTERN]     list table, view, and sequence access privileges
  \\dP[itnx+] [PATTERN]   list [only index/table] partitioned relations [n=nested]
  \\drds[x] [ROLEPTRN [DBPTRN]] 
                         list per-database role settings
  \\drg[Sx] [PATTERN]     list role grants
  \\dRp[x+] [PATTERN]     list replication publications
  \\dRs[x+] [PATTERN]     list replication subscriptions
  \\ds[Sx+] [PATTERN]     list sequences
  \\dt[Sx+] [PATTERN]     list tables
  \\dT[Sx+] [PATTERN]     list data types
  \\du[Sx+] [PATTERN]     list roles
  \\dv[Sx+] [PATTERN]     list views
  \\dx[x+]  [PATTERN]     list extensions
  \\dX[x+]  [PATTERN]     list extended statistics
  \\dy[x+]  [PATTERN]     list event triggers
  \\l[x+]   [PATTERN]     list databases
  \\lo_list[x+]           list large objects
  \\sf[+]   FUNCNAME      show a function's definition
  \\sv[+]   VIEWNAME      show a view's definition
  \\z[Sx]   [PATTERN]     same as \\dp
`;export{Ft as describe,Pt as describeDataToHtml,Ut as describeDataToString,ce as htmlEscape};
