var ve=[["ABORT","abort the current transaction","sql-abort","ABORT [ WORK | TRANSACTION ] [ AND [ NO ] CHAIN ]"],["ALTE\
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

TABLE [ ONLY ] table_name [ * ]`]];var o=null,Ut=100,ht="E",Pt=0,Ft=6,Rn=0,_n=1,jn="S",Jn="M",yt="a",wt="e",Ht="b",Mt="i",Kn="n",zn="s",r=0,F=1,ee=2,b=3,Gt=3,
ta=0,vt=1,un=2,Wt=7,de=0,xt=1,Fe=2,Oe=5,me=0,We=4,Qn=0,Bt=1,Yt=2,qt="19rc1",kt="19",Vt=`Help
  \\? [commands]          show help on backslash commands
  \\? options             show help on psql command-line options
  \\? variables           show help on special variables
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
  \\sf[+]   FUNCNAME      show a function's definition
  \\sv[+]   VIEWNAME      show a view's definition
  \\z[Sx]   [PATTERN]     same as \\dp

Large Objects
  \\lo_list[x+]           list large objects

`;function os(g){return typeof g=="string"?g:jt(g)}function rs(g){return typeof g=="string"?`<p>${ge(g,!0)}</p>`:Kt(g)}function ls(g,L,U,G,x=!1,j=null,z=1,X=J=>`\
https://www.postgresql.org/docs/${Ke(qt,"devel")?"devel":kt}/${J}.html`){let J=!1;function Ne(){J=!0,G=()=>{}}function re(){
if(J)throw new Error("cancelled")}let Re=null;function Le(){Re!==null&&G(Re.replace(/\n+$/,"")),Re=null}function fe(Z){Le(),
G(Z)}function ce(Z){Re=(Re??"")+Z}async function le(){if(g[0]!=="\\")return fe(`unsupported command: ${g}`),!1;let Z=[g.
slice(1),0];function ie(t,s){let n=(t??"").trim().toUpperCase().replace(/\s+/g," ");if(n===""){fe(`Available help:
`+ve.map(i=>i[0]).join(`
`));return}let a=n==="*"?ve:ve.filter(i=>i[0]===n);if(a.length===0&&(a=ve.filter(i=>i[0].startsWith(n))),a.length===0){let i=n.
split(" ");for(let e=i.length;e>0;e--){let c=i.slice(0,e).join(" ");if(a=ve.filter(N=>N[0].startsWith(c)),a.length>0)break}}
if(a.length===0){fe(`No help available for "${t.trim()}".
Try \\h with no arguments to see available help.`);return}for(let i of a)fe(`Command:     ${i[0]}
Description: ${i[1]}
Syntax:
${i[3]}

URL: ${X(i[2])}`)}let Ie=t=>Fn(Vt,Me),Se=t=>()=>(H("\\%s is not supported",t),!1),bn=Se("? options"),Qe=Se("? variables"),
$e=Se("lo_export"),Un=Se("lo_import"),Ze=Se("lo_unlink"),fn=ue,C=async(t,s=!1)=>{re(),x&&!s&&fe(`/**** INTERNAL QUERY **\
**/
${t}
/************************/`);let n=await U(t);return re(),n};async function ae(t,s){re();try{return{...await U(s),status:un}}catch(n){
return{status:Wt,errorFields:{[jn]:"ERROR",[Jn]:n.message}}}finally{re()}}let hn=t=>t.status,Pn=(t,s)=>t.errorFields?.[s]??
o,la=()=>z,Me={write:ce},Fn=(t,s)=>s.write(t),en=(t,s,...n)=>t.write(Ee(s,...n)),Ea=(t,...s)=>en(Me,t,...s),ns=ue,as=ue,
ca=(t,s)=>Me,H=(t,...s)=>ce(Ee(t,...s)+`
`),yn=H,pa=H,wn=H,Hn=t=>!0,Ta=ue,ts=ue;function pe(t,s,n,a){if(s!==me&&s!==We)throw new Error(`scan type ${s} not implem\
ented`);let[i]=t,e=/[ \t\n\r\f\v]/,c=t[1],N="",A=0,S=0,p,d=()=>(H("unterminated quoted string"),t[1]=i.length,o);for(;e.
test(i[c]??"");)c++;if(s===We)N=i.slice(c),c=i.length,a&&(N=N.replace(/[; \t\n\r\f\v]+$/,""));else{for(;;){let D=i.slice(
c);if(D===""||e.test(D[0])||D[0]==="\\")break;if(D[0]==="'")for(A="'",S=0,c++;;){let m=i.slice(c);if(m==="")return d();if(m.
startsWith("''"))N+="'",c+=2;else if(m[0]==="'"){c++;break}else(p=m.match(/^\\[ntbrf]/))?(N+={n:`
`,t:"	",b:"\b",r:"\r",f:"\f"}[p[0][1]],c+=2):(p=m.match(/^\\([0-7]{1,3})/))?(N+=String.fromCharCode(parseInt(p[1],8)),c+=
p[0].length):(p=m.match(/^\\x([0-9A-Fa-f]{1,2})/))?(N+=String.fromCharCode(parseInt(p[1],16)),c+=p[0].length):(p=m.match(
/^\\(.)/))?(N+=p[1],c+=2):(N+=m[0],c++)}else if(D[0]==='"'){let m=i.indexOf('"',c+1);if(m===-1)return d();A='"',S=0,N+=i.
slice(c,m+1),c=m+1}else(p=D.match(/^:(?:[A-Za-z\u0080-\uFFFF_0-9]+|'[A-Za-z\u0080-\uFFFF_0-9]+'|"[A-Za-z\u0080-\uFFFF_0-9]+")/))?
(N+=p[0],c+=p[0].length,S=0):(p=D.match(/^:\{\?[A-Za-z\u0080-\uFFFF_0-9]+\}/))?(N+="FALSE",c+=p[0].length):(N+=D[0],c++,
S++)}if(a)for(;S-- >0&&N.endsWith(";");)N=N.slice(0,-1)}return t[1]=c,n!=o&&(n.value=A),N===""&&A===0?o:N}let Ra=!1;async function _a(t,s,n,a){
let i,e,c;if(be(t!=o),be(s!=o),e=aa(t),e==o?i=Oe:Ra&&u(e,"unrestrict")!=0?(H("backslash commands are restricted; only \\u\
nrestrict is allowed"),i=Oe):i=await Aa(e,t,s,n,a),i==de&&(H("invalid command \\%s",e),E.cur_cmd_interactive&&pa("Try \\?\
 for help."),i=Oe),i!=Oe){let N=Hn(s);for(Ta(s,Gt);(c=pe(t,me,o,!1))!=o;)N&&wn('\\%s: extra argument "%s" ignored',e,c)}else
for(;(c=pe(t,We,o,!1))!=o;);return E.queryFout,i}async function Aa(t,s,n,a,i){let e,c=Hn(n);return E.cur_cmd_interactive&&
!c&&!Oa(t)&&wn("\\%s command ignored; use \\endif or Ctrl-C to exit current \\if block",t),t[0]=="d"?e=await ga(s,c,t):u(
t,"h")==0||u(t,"help")==0?e=Na(s,c):u(t,"l")==0||u(t,"list")==0||u(t,"lx")==0||u(t,"listx")==0||u(t,"l+")==0||u(t,"list+")==
0||u(t,"lx+")==0||u(t,"listx+")==0||u(t,"l+x")==0||u(t,"list+x")==0?e=await fa(s,c,t):he(t,"lo_",3)==0?e=await ma(s,c,t):
u(t,"sf")==0||u(t,"sf+")==0?e=await Gn(s,c,t,!0):u(t,"sv")==0||u(t,"sv+")==0?e=await Gn(s,c,t,!1):u(t,"z")==0||u(t,"zS")==
0||u(t,"zx")==0||u(t,"zSx")==0||u(t,"zxS")==0?e=await Sa(s,c,t):u(t,"?")==0?e=da(s,c):e=de,e==xt&&ua(a,i),e}async function ga(t,s,n){
let a=Fe,i=!0;if(s){let e,c,N,A;switch(e=pe(t,me,o,!0),c=K(n,"+")!=o,N=K(n,"S")!=o,A=E.popt.topt.expanded,n[1]!=null&&K(
n.slice(2),"x")!=o&&(E.popt.topt.expanded=1),n[1]){case void 0:case"+":case"S":e!=o?i=await Ga(e,c,N):i=await qn("tvmsE",
o,c,N);break;case"A":{let S=o;switch(e!=o&&n[2]!=null&&n[2]!="+"&&n[2]!="x"&&(S=pe(t,me,o,!0)),n[2]){case void 0:case"+":case"\
x":i=await Ua(e,c);break;case"c":i=await At(e,S,c);break;case"f":i=await gt(e,S,c);break;case"o":i=await Nt(e,S,c);break;case"\
p":i=await ft(e,S,c);break;default:a=de;break}}break;case"a":i=await ba(e,c,N);break;case"b":i=await ha(e,c);break;case"\
c":he(n,"dconfig",7)==0?i=await Va(e,c,N):i=await ka(e,c,N);break;case"C":i=await Ja(e,c);break;case"d":he(n,"ddp",3)==0?
i=await Ha(e):i=await Ma(e,N);break;case"D":i=await qa(e,c,N);break;case"f":switch(n[2]){case void 0:case"+":case"S":case"\
a":case"n":case"p":case"t":case"w":case"x":i=await Mn(t,n,e,c,N);break;default:a=de;break}break;case"g":i=await Yn(e,c,N);
break;case"l":i=await kn(c);break;case"L":i=await Ya(e,c,N);break;case"n":i=await za(e,c,N);break;case"o":i=await Mn(t,n,
e,c,N);break;case"O":i=await Ka(e,c,N);break;case"p":i=await Bn(e,N);break;case"P":switch(n[2]){case void 0:case"+":case"\
t":case"i":case"n":case"x":i=await Ba(n.slice(2),e,c);break;default:a=de;break}break;case"T":i=await Fa(e,c,N);break;case"\
t":case"v":case"m":case"i":case"s":case"E":i=await qn(n.slice(1),e,c,N);break;case"r":if(n[2]=="d"&&n[3]=="s"){let S=o;e!=
o&&(S=pe(t,me,o,!0)),i=await Wa(e,S)}else n[2]=="g"?i=await xa(e,N):a=de;break;case"R":switch(n[2]){case"p":c?i=await Rt(
e):i=await Tt(e);break;case"s":i=await _t(e,c);break;default:a=de}break;case"u":i=await Yn(e,c,N);break;case"F":switch(n[2]){case void 0:case"\
+":case"x":i=await at(e,c);break;case"p":i=await Qa(e,c);break;case"d":i=await et(e,c);break;case"t":i=await nt(e,c);break;default:
a=de;break}break;case"e":switch(n[2]){case"s":i=await ot(e,c);break;case"u":i=await rt(e,c);break;case"w":i=await it(e,c);
break;case"t":i=await lt(e,c);break;default:a=de;break}break;case"x":c?i=await ct(e):i=await Et(e);break;case"X":i=await ja(
e,c);break;case"y":i=await Xa(e,c);break;default:a=de}E.popt.topt.expanded=A}else Ye(t);return i||(a=Oe),a}async function Mn(t,s,n,a,i){
let e,c=[],N=0;if(n!=o){let A;for(;(A=pe(t,me,o,!0))!=o&&(c[N++]=A,!(N>=Ut)););}return s[1]=="f"?e=await Pa(s.slice(2),n,
c,N,a,i):e=await ya(n,c,N,a,i),e}function Na(t,s){if(s){let n=pe(t,We,o,!0);ie(n,E.popt.topt.pager)}else vn(t);return Fe}
async function fa(t,s,n){let a=!0;if(s){let i,e,c;i=pe(t,me,o,!0),e=K(n,"+")!=o,c=E.popt.topt.expanded,K(n,"x")!=o&&(E.popt.
topt.expanded=1),a=await wa(i,e),E.popt.topt.expanded=c}else Ye(t);return a?Fe:Oe}async function ma(t,s,n){let a=Fe,i=!0;
if(s){let e={},c={};if(e.value=pe(t,me,o,!0),c.value=pe(t,me,o,!0),u(n.slice(3),"export")==0)e.value==o||c.value==o?(H("\
\\%s: missing required argument",n),i=!1):i=$e(e.value,c.value);else if(u(n.slice(3),"import")==0)e.value==o?(H("\\%s: mi\
ssing required argument",n),i=!1):i=Un(e.value,c.value);else if(he(n.slice(3),"list",4)==0){let N,A;N=K(n,"+")!=o,A=E.popt.
topt.expanded,K(n,"x")!=o&&(E.popt.topt.expanded=1),i=await kn(N),E.popt.topt.expanded=A}else u(n.slice(3),"unlink")==0?
e.value==o?(H("\\%s: missing required argument",n),i=!1):i=Ze(e.value):a=de}else Ye(t);return i||(a=Oe),a}async function Gn(t,s,n,a){
let i=Fe;if(s){let e=K(n,"+")!=o,c,N,A={value:Pt},S=a?Rn:_n;if(c=xe(),N=pe(t,We,o,!0),N==o)H(a?"function name is require\
d":"view name is required"),i=Oe;else if(!await La(S,N,A))i=Oe;else if(!await Ia(S,A.value,c))i=Oe;else{let p,d;if(E.queryFout==
Me){let D=Ca(c);p=ca(D,E.popt.topt),d=!0}else p=E.queryFout,d=!1;e?Da(p,c.data,a):Fn(c.data,p)}}else vn(t);return i}async function Sa(t,s,n){
let a=!0;if(s){let i,e,c;i=pe(t,me,o,!0),e=K(n,"S")!=o,c=E.popt.topt.expanded,K(n,"x")!=o&&(E.popt.topt.expanded=1),a=await Bn(
i,e),E.popt.topt.expanded=c}else Ye(t);return a?Fe:Oe}function da(t,s){if(s){let n=pe(t,me,o,!1);n==o||u(n,"commands")==
0?Ie(E.popt.topt.pager):u(n,"options")==0?bn(E.popt.topt.pager):u(n,"variables")==0?Qe(E.popt.topt.pager):Ie(E.popt.topt.
pager)}else Ye(t);return Fe}function Ye(t){let s;for(;(s=pe(t,me,o,!1))!=o;);}function vn(t){let s=pe(t,We,o,!1)}function Oa(t){
return u(t,"if")==0||u(t,"elif")==0||u(t,"else")==0||u(t,"endif")==0}function ua(t,s){return t&&t.len==0?(l(t,s.data),!0):
!1}function Wn(t){return!(E.echo_hidden!=Qn&&(Ea(`/**** INTERNAL QUERY ****/
%s
/************************/

`,t),E.logfile&&(en(E.logfile,`/**** INTERNAL QUERY ****/
%s
/************************/

`,t),E.logfile),E.echo_hidden==Yt))}async function La(t,s,n){let a=!0,i=xe(),e;switch(t){case Rn:f(i,`/* %s */
`,"Get function's OID"),l(i,"SELECT "),Be(i,s,E.db),T(i,"::pg_catalog.%s::pg_catalog.oid",K(s,"(")!=o?"regprocedure":"re\
gproc");break;case _n:f(i,`/* %s */
`,"Get view's OID"),l(i,"SELECT "),Be(i,s,E.db),l(i,"::pg_catalog.regclass::pg_catalog.oid");break}return Wn(i.data)?(e=
await ae(E.db,i.data),hn(e)==un&&B(e)==1?n.value=Ln(_(e,0,0)):(xn(e),a=!1),a):!1}async function Ia(t,s,n){let a=!0,i=xe(),
e;switch(t){case Rn:f(i,`/* %s */
`,"Get function's definition"),T(i,"SELECT pg_catalog.pg_get_functiondef(%u)",s);break;case _n:f(i,`/* %s */
`,"Get view's definition and details"),E.sversion>=90400?T(i,"SELECT nspname, relname, relkind, pg_catalog.pg_get_viewde\
f(c.oid, true), pg_catalog.array_remove(pg_catalog.array_remove(c.reloptions,'check_option=local'),'check_option=cascade\
d') AS reloptions, CASE WHEN 'check_option=local' = ANY (c.reloptions) THEN 'LOCAL'::text WHEN 'check_option=cascaded' =\
 ANY (c.reloptions) THEN 'CASCADED'::text ELSE NULL END AS checkoption FROM pg_catalog.pg_class c LEFT JOIN pg_catalog.p\
g_namespace n ON c.relnamespace = n.oid WHERE c.oid = %u",s):T(i,"SELECT nspname, relname, relkind, pg_catalog.pg_get_vi\
ewdef(c.oid, true), c.reloptions AS reloptions, NULL AS checkoption FROM pg_catalog.pg_class c LEFT JOIN pg_catalog.pg_n\
amespace n ON c.relnamespace = n.oid WHERE c.oid = %u",s);break}if(!Wn(i.data))return!1;if(e=await ae(E.db,i.data),hn(e)==
un&&B(e)==1){switch(An(n),t){case Rn:l(n,_(e,0,0));break;case _n:{let c=_(e,0,0),N=_(e,0,1),A=_(e,0,2),S=_(e,0,3),p=_(e,
0,4),d=_(e,0,5);A[0]==="v"?l(n,"CREATE OR REPLACE VIEW "):(H('"%s.%s" is not a view',c,N),a=!1),T(n,"%s.",Ge(c)),l(n,Ge(
N)),p!=o&&we(p)>2&&(l(n,`
 WITH (`),St(n,p,"",E.encoding,la())||(H("could not parse reloptions array"),a=!1),$(n,")")),T(n,` AS
%s`,S),n.len>0&&n.data[n.len-1]==";"&&(n.data=n.data.slice(0,--n.len)),d!=o&&d[0]!=null&&T(n,`
 WITH %s CHECK OPTION`,d)}break}n.len>0&&n.data[n.len-1]!=`
`&&$(n,`
`)}else xn(e),a=!1;return a}function Ca(t){let s=0,n=t.data;for(;n[0]!=null&&(s++,n=K(n,`
`),n!=o);)n=n.slice(1);return s}function Da(t,s,n){let a=n,i=0;for(;s[0]!=null;){let e;if(a&&(he(s,"AS ",3)==0||he(s,"BE\
GIN ",6)==0||he(s,"RETURN ",7)==0)&&(a=!1),a||i++,e=K(s,`
`),e!=o&&(s=s.slice(0,s.length-e.length)),a?en(t,`        %s
`,s):en(t,`%-7d %s
`,i,s),e==o)break;s=e=e.slice(1)}}function xn(t){let s,n;s=xe(),n=Pn(t,jn),n!=o?f(s,"%s:  ",n):f(s,"ERROR:  "),n=Pn(t,Jn),
n!=o?l(s,n):l(s,"(not available)"),$(s,`
`),H("%s",s.data)}async function ba(t,s,n){let a={},i,e=q(E.popt);return P(a),f(a,`/* %s */
`,"Get matching aggregates"),T(a,`SELECT n.nspname as "%s",
  p.proname AS "%s",
  pg_catalog.format_type(p.prorettype, NULL) AS "%s",
  CASE WHEN p.pronargs = 0
    THEN CAST('*' AS pg_catalog.text)
    ELSE pg_catalog.pg_get_function_arguments(p.oid)
  END AS "%s",
`,"Schema","Name","Result data type","Argument data types"),E.sversion>=11e4?T(a,`  pg_catalog.obj_description(p.oid, 'p\
g_proc') as "%s"
FROM pg_catalog.pg_proc p
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
WHERE p.prokind = 'a'
`,"Description"):T(a,`  pg_catalog.obj_description(p.oid, 'pg_proc') as "%s"
FROM pg_catalog.pg_proc p
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
WHERE p.proisagg
`,"Description"),!n&&t==o&&l(a,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!w(a,t,!0,!1,"n.nspname","p.proname",o,"pg_catalog.pg_function_is_visible(p.oid)",o,3)||(l(a,"ORDER BY 1, 2, 4;"),i=await C(
a.data),!i)?!1:(e.title="List of aggregate functions",e.translate_header=!0,Y(i,e,E.queryFout,!1,E.logfile),!0)}async function Ua(t,s){
let n={},a,i=q(E.popt),e=[!1,!0,!1,!1];if(E.sversion<90600){let c="";return H("The server (version %s) does not support \
access methods.",Ce(E.sversion,!1,c,Ue(c))),!0}return P(n),f(n,`/* %s */
`,"Get matching access methods"),T(n,`SELECT amname AS "%s",
  CASE amtype WHEN 'i' THEN '%s' WHEN 't' THEN '%s' END AS "%s"`,"Name","Index","Table","Type"),s&&T(n,`,
  amhandler AS "%s",
  pg_catalog.obj_description(oid, 'pg_am') AS "%s"`,"Handler","Description"),l(n,`
FROM pg_catalog.pg_am
`),!w(n,t,!1,!1,o,"amname",o,o,o,1)||(l(n,"ORDER BY 1;"),a=await C(n.data),!a)?!1:(i.title="List of access methods",i.translate_header=
!0,i.translate_columns=e,i.n_translate_columns=ne(e),Y(a,i,E.queryFout,!1,E.logfile),!0)}async function ha(t,s){let n={},
a,i=q(E.popt);return P(n),f(n,`/* %s */
`,"Get matching tablespaces"),T(n,`SELECT spcname AS "%s",
  pg_catalog.pg_get_userbyid(spcowner) AS "%s",
  pg_catalog.pg_tablespace_location(oid) AS "%s"`,"Name","Owner","Location"),s&&(l(n,`,
  `),Ae(n,"spcacl"),T(n,`,
  spcoptions AS "%s",
  pg_catalog.pg_size_pretty(pg_catalog.pg_tablespace_size(oid)) AS "%s",
  pg_catalog.shobj_description(oid, 'pg_tablespace') AS "%s"`,"Options","Size","Description")),l(n,`
FROM pg_catalog.pg_tablespace
`),!w(n,t,!1,!1,o,"spcname",o,o,o,1)||(l(n,"ORDER BY 1;"),a=await C(n.data),!a)?!1:(i.title="List of tablespaces",i.translate_header=
!0,Y(a,i,E.queryFout,!1,E.logfile),!0)}async function Pa(t,s,n,a,i,e){let c="anptwSx+",N=K(t,"a")!=o,A=K(t,"n")!=o,S=K(t,
"p")!=o,p=K(t,"t")!=o,d=K(t,"w")!=o,D,m={},v,h=q(E.popt),se=[!1,!1,!1,!1,!0,!0,!0,!1,!0,!0,!1,!1,!1,!1],qe=[!1,!1,!1,!1,
!0,!0,!1,!0,!0,!1,!1,!1,!1];if(we(t)!=Qt(t,c))return H("\\df only takes [%s] as options",c),!0;if(S&&E.sversion<11e4){let V="";
return H('\\df does not take a "%c" option with server version %s',"p",Ce(E.sversion,!1,V,Ue(V))),!0}!N&&!A&&!S&&!p&&!d&&
(N=A=p=d=!0,E.sversion>=11e4&&(S=!0)),P(m),f(m,`/* %s */
`,"Get matching functions"),T(m,`SELECT n.nspname as "%s",
  p.proname as "%s",
`,"Schema","Name"),E.sversion>=11e4?T(m,`  pg_catalog.pg_get_function_result(p.oid) as "%s",
  pg_catalog.pg_get_function_arguments(p.oid) as "%s",
 CASE p.prokind
  WHEN 'a' THEN '%s'
  WHEN 'w' THEN '%s'
  WHEN 'p' THEN '%s'
  ELSE '%s'
 END as "%s"`,"Result data type","Argument data types","agg","window","proc","func","Type"):T(m,`  pg_catalog.pg_get_fun\
ction_result(p.oid) as "%s",
  pg_catalog.pg_get_function_arguments(p.oid) as "%s",
 CASE
  WHEN p.proisagg THEN '%s'
  WHEN p.proiswindow THEN '%s'
  WHEN p.prorettype = 'pg_catalog.trigger'::pg_catalog.regtype THEN '%s'
  ELSE '%s'
 END as "%s"`,"Result data type","Argument data types","agg","window","trigger","func","Type"),i&&(T(m,`,
 CASE
  WHEN p.provolatile = 'i' THEN '%s'
  WHEN p.provolatile = 's' THEN '%s'
  WHEN p.provolatile = 'v' THEN '%s'
 END as "%s"`,"immutable","stable","volatile","Volatility"),E.sversion>=90600&&T(m,`,
 CASE
  WHEN p.proparallel = 'r' THEN '%s'
  WHEN p.proparallel = 's' THEN '%s'
  WHEN p.proparallel = 'u' THEN '%s'
 END as "%s"`,"restricted","safe","unsafe","Parallel"),T(m,`,
 pg_catalog.pg_get_userbyid(p.proowner) as "%s",
 CASE WHEN prosecdef THEN '%s' ELSE '%s' END AS "%s",
 CASE WHEN p.proleakproof THEN '%s' ELSE '%s' END as "%s"`,"Owner","definer","invoker","Security","yes","no","Leakproof?"),
l(m,`,
 `),Ae(m,"p.proacl"),T(m,`,
 l.lanname as "%s"`,"Language"),T(m,`,
 CASE WHEN l.lanname IN ('internal', 'c') THEN p.prosrc END as "%s"`,"Internal name"),T(m,`,
 pg_catalog.obj_description(p.oid, 'pg_proc') as "%s"`,"Description")),l(m,`
FROM pg_catalog.pg_proc p
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
`);for(let V=0;V<a;V++)T(m,`     LEFT JOIN pg_catalog.pg_type t%d ON t%d.oid = p.proargtypes[%d]
     LEFT JOIN pg_catalog.pg_namespace nt%d ON nt%d.oid = t%d.typnamespace
`,V,V,V,V,V,V);if(i&&l(m,`     LEFT JOIN pg_catalog.pg_language l ON l.oid = p.prolang
`),D=!1,!(A&&N&&S&&p&&d))if(A)N||(D?l(m,"      AND "):(l(m,"WHERE "),D=!0),E.sversion>=11e4?l(m,`p.prokind <> 'a'
`):l(m,`NOT p.proisagg
`)),!S&&E.sversion>=11e4&&(D?l(m,"      AND "):(l(m,"WHERE "),D=!0),l(m,`p.prokind <> 'p'
`)),p||(D?l(m,"      AND "):(l(m,"WHERE "),D=!0),l(m,`p.prorettype <> 'pg_catalog.trigger'::pg_catalog.regtype
`)),d||(D?l(m,"      AND "):(l(m,"WHERE "),D=!0),E.sversion>=11e4?l(m,`p.prokind <> 'w'
`):l(m,`NOT p.proiswindow
`));else{let V=!1;l(m,`WHERE (
       `),D=!0,N&&(E.sversion>=11e4?l(m,`p.prokind = 'a'
`):l(m,`p.proisagg
`),V=!0),p&&(V&&l(m,"       OR "),l(m,`p.prorettype = 'pg_catalog.trigger'::pg_catalog.regtype
`),V=!0),S&&(V&&l(m,"       OR "),l(m,`p.prokind = 'p'
`),V=!0),d&&(V&&l(m,"       OR "),E.sversion>=11e4?l(m,`p.prokind = 'w'
`):l(m,`p.proiswindow
`)),l(m,`      )
`)}if(!w(m,s,D,!1,"n.nspname","p.proname",o,"pg_catalog.pg_function_is_visible(p.oid)",o,3))return!1;for(let V=0;V<a;V++)
if(u(n[V],"-")!=0){let ke="",Ve="",Xe="",je="";if(ke=Ee("nt%d.nspname",V),Ve=Ee("t%d.typname",V),Xe=Ee("pg_catalog.forma\
t_type(t%d.oid, NULL)",V),je=Ee("pg_catalog.pg_type_is_visible(t%d.oid)",V),!w(m,mn(n[V]),!0,!1,ke,Ve,Xe,je,o,3))return!1}else
T(m,`  AND t%d.typname IS NULL
`,V);return!e&&s==o&&l(m,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),l(m,"ORDER BY 1, 2, 4;"),v=await C(m.data),v?(h.title="List of functions",h.translate_header=!0,E.sversion>=90600?(h.
translate_columns=se,h.n_translate_columns=ne(se)):(h.translate_columns=qe,h.n_translate_columns=ne(qe)),Y(v,h,E.queryFout,
!1,E.logfile),!0):!1}async function Fa(t,s,n){let a={},i,e=q(E.popt);return P(a),f(a,`/* %s */
`,"Get matching types"),T(a,`SELECT n.nspname as "%s",
  pg_catalog.format_type(t.oid, NULL) AS "%s",
`,"Schema","Name"),s&&(T(a,`  t.typname AS "%s",
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
`,"Internal name","Size","Elements","Owner"),Ae(a,"t.typacl"),l(a,`,
  `)),T(a,`  pg_catalog.obj_description(t.oid, 'pg_type') as "%s"
`,"Description"),l(a,`FROM pg_catalog.pg_type t
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
`),l(a,"WHERE (t.typrelid = 0 "),l(a,`OR (SELECT c.relkind = 'c' FROM pg_catalog.pg_class c WHERE c.oid = t.typrelid))
`),(t==o||Ke(t,"[]")==o)&&l(a,`  AND NOT EXISTS(SELECT 1 FROM pg_catalog.pg_type el WHERE el.oid = t.typelem AND el.typa\
rray = t.oid)
`),!n&&t==o&&l(a,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!w(a,mn(t),!0,!1,"n.nspname","t.typname","pg_catalog.format_type(t.oid, NULL)","pg_catalog.pg_type_is_visible(t.oid)",
o,3)||(l(a,"ORDER BY 1, 2;"),i=await C(a.data),!i)?!1:(e.title="List of data types",e.translate_header=!0,Y(i,e,E.queryFout,
!1,E.logfile),!0)}function mn(t){let s=["decimal","numeric","float","double precision","int","integer","bool[]","boolean\
[]","decimal[]","numeric[]","float[]","double precision[]","float4[]","real[]","float8[]","double precision[]","int[]","\
integer[]","int2[]","smallint[]","int4[]","integer[]","int8[]","bigint[]","time[]","time without time zone[]","timetz[]",
"time with time zone[]","timestamp[]","timestamp without time zone[]","timestamptz[]","timestamp with time zone[]","varb\
it[]","bit varying[]","varchar[]","character varying[]",o];if(t==o)return o;for(let n=0;s[n]!=o;n+=2)if(Zt(t,s[n])==0)return s[n+
1];return t}async function ya(t,s,n,a,i){let e={},c,N=q(E.popt),A=[!1,!1,!1,!1,!1,!1,!0,!1];if(P(e),f(e,`/* %s */
`,"Get matching operators"),T(e,`SELECT n.nspname as "%s",
  o.oprname AS "%s",
  CASE WHEN o.oprkind='l' THEN NULL ELSE pg_catalog.format_type(o.oprleft, NULL) END AS "%s",
  CASE WHEN o.oprkind='r' THEN NULL ELSE pg_catalog.format_type(o.oprright, NULL) END AS "%s",
  pg_catalog.format_type(o.oprresult, NULL) AS "%s",
`,"Schema","Name","Left arg type","Right arg type","Result type"),a&&T(e,`  o.oprcode AS "%s",
  CASE WHEN p.proleakproof THEN '%s' ELSE '%s' END AS "%s",
`,"Function","yes","no","Leakproof?"),T(e,`  coalesce(pg_catalog.obj_description(o.oid, 'pg_operator'),
           pg_catalog.obj_description(o.oprcode, 'pg_proc')) AS "%s"
FROM pg_catalog.pg_operator o
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = o.oprnamespace
`,"Description"),n>=2?(n=2,l(e,`     LEFT JOIN pg_catalog.pg_type t0 ON t0.oid = o.oprleft
     LEFT JOIN pg_catalog.pg_namespace nt0 ON nt0.oid = t0.typnamespace
     LEFT JOIN pg_catalog.pg_type t1 ON t1.oid = o.oprright
     LEFT JOIN pg_catalog.pg_namespace nt1 ON nt1.oid = t1.typnamespace
`)):n==1&&l(e,`     LEFT JOIN pg_catalog.pg_type t0 ON t0.oid = o.oprright
     LEFT JOIN pg_catalog.pg_namespace nt0 ON nt0.oid = t0.typnamespace
`),a&&l(e,`     LEFT JOIN pg_catalog.pg_proc p ON p.oid = o.oprcode
`),!i&&t==o&&l(e,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!w(e,t,!i&&t==o,!0,"n.nspname","o.oprname",o,"pg_catalog.pg_operator_is_visible(o.oid)",o,3))return!1;n==1&&l(e,`  AN\
D o.oprleft = 0
`);for(let S=0;S<n;S++)if(u(s[S],"-")!=0){let p="",d="",D="",m="";if(p=Ee("nt%d.nspname",S),d=Ee("t%d.typname",S),D=Ee("\
pg_catalog.format_type(t%d.oid, NULL)",S),m=Ee("pg_catalog.pg_type_is_visible(t%d.oid)",S),!w(e,mn(s[S]),!0,!1,p,d,D,m,o,
3))return!1}else T(e,`  AND t%d.typname IS NULL
`,S);return l(e,"ORDER BY 1, 2, 3, 4;"),c=await C(e.data),c?(N.title="List of operators",N.translate_header=!0,N.translate_columns=
A,N.n_translate_columns=ne(A),Y(c,N,E.queryFout,!1,E.logfile),!0):!1}async function wa(t,s){let n,a={},i=q(E.popt);return P(
a),f(a,`/* %s */
`,"Get matching databases"),T(a,`SELECT
  d.datname as "%s",
  pg_catalog.pg_get_userbyid(d.datdba) as "%s",
  pg_catalog.pg_encoding_to_char(d.encoding) as "%s",
`,"Name","Owner","Encoding"),E.sversion>=15e4?T(a,`  CASE d.datlocprovider WHEN 'b' THEN 'builtin' WHEN 'c' THEN 'libc' \
WHEN 'i' THEN 'icu' END AS "%s",
`,"Locale Provider"):T(a,`  'libc' AS "%s",
`,"Locale Provider"),T(a,`  d.datcollate as "%s",
  d.datctype as "%s",
`,"Collate","Ctype"),E.sversion>=17e4?T(a,`  d.datlocale as "%s",
`,"Locale"):E.sversion>=15e4?T(a,`  d.daticulocale as "%s",
`,"Locale"):T(a,`  NULL as "%s",
`,"Locale"),E.sversion>=16e4?T(a,`  d.daticurules as "%s",
`,"ICU Rules"):T(a,`  NULL as "%s",
`,"ICU Rules"),l(a,"  "),Ae(a,"d.datacl"),s&&T(a,`,
  CASE WHEN pg_catalog.has_database_privilege(d.datname, 'CONNECT')
       %s       THEN pg_catalog.pg_size_pretty(pg_catalog.pg_database_size(d.datname))
       ELSE 'No Access'
  END as "%s",
  t.spcname as "%s",
  pg_catalog.shobj_description(d.oid, 'pg_database') as "%s"`,E.sversion>=1e5?`OR pg_catalog.pg_has_role('pg_read_all_st\
ats', 'USAGE')
`:"","Size","Tablespace","Description"),l(a,`
FROM pg_catalog.pg_database d
`),s&&l(a,`  JOIN pg_catalog.pg_tablespace t on d.dattablespace = t.oid
`),t!=o&&!w(a,t,!1,!1,o,"d.datname",o,o,o,1)||(l(a,"ORDER BY 1;"),n=await C(a.data),!n)?!1:(i.title="List of databases",
i.translate_header=!0,Y(n,i,E.queryFout,!1,E.logfile),!0)}async function Bn(t,s){let n={},a,i=q(E.popt),e=[!1,!1,!0,!1,!1,
!1];return P(n),f(n,`/* %s */
`,"Get access privileges of matching relations"),T(n,`SELECT n.nspname as "%s",
  c.relname as "%s",
  CASE c.relkind WHEN 'r' THEN '%s' WHEN 'v' THEN '%s' WHEN 'm' THEN '%s' WHEN 'S' THEN '%s' WHEN 'f' THEN '%s' WHEN 'p'\
 THEN '%s' END as "%s",
  `,"Schema","Name","table","view","materialized view","sequence","foreign table","partitioned table","Type"),Ae(n,"c.re\
lacl"),T(n,`,
  pg_catalog.array_to_string(ARRAY(
    SELECT attname || E':\\n  ' || pg_catalog.array_to_string(attacl, E'\\n  ')
    FROM pg_catalog.pg_attribute a
    WHERE attrelid = c.oid AND NOT attisdropped AND attacl IS NOT NULL
  ), E'\\n') AS "%s"`,"Column privileges"),E.sversion>=90500&&E.sversion<1e5&&T(n,`,
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
    AS "%s"`,"Policies"),E.sversion>=1e5&&T(n,`,
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
    AS "%s"`,"Policies"),l(n,`
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
WHERE c.relkind IN ('r','v','m','S','f','p')
`),!s&&t==o&&l(n,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!w(n,t,!0,!1,"n.nspname","c.relname",o,"pg_catalog.pg_table_is_visible(c.oid)",o,3)||(l(n,"ORDER BY 1, 2;"),a=await C(
n.data),!a)?!1:(f(n,"Access privileges"),i.title=n.data,i.translate_header=!0,i.translate_columns=e,i.n_translate_columns=
ne(e),Y(a,i,E.queryFout,!1,E.logfile),!0)}async function Ha(t){let s={},n,a=q(E.popt),i=[!1,!1,!0,!1];return P(s),f(s,`/\
* %s */
`,"Get matching default ACLs"),T(s,`SELECT pg_catalog.pg_get_userbyid(d.defaclrole) AS "%s",
  n.nspname AS "%s",
  CASE d.defaclobjtype     WHEN '%c' THEN '%s' WHEN '%c' THEN '%s' WHEN '%c' THEN '%s'    WHEN '%c' THEN '%s' WHEN '%c' \
THEN '%s' WHEN '%c' THEN '%s' END AS "%s",
  `,"Owner","Schema","r","table","S","sequence","f","function","T","type","n","schema","L","large object","Type"),Ae(s,"\
d.defaclacl"),l(s,`
FROM pg_catalog.pg_default_acl d
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = d.defaclnamespace
`),!w(s,t,!1,!1,o,"n.nspname","pg_catalog.pg_get_userbyid(d.defaclrole)",o,o,3)||(l(s,"ORDER BY 1, 2, 3;"),n=await C(s.data),
!n)?!1:(f(s,"Default access privileges"),a.title=s.data,a.translate_header=!0,a.translate_columns=i,a.n_translate_columns=
ne(i),Y(n,a,E.queryFout,!1,E.logfile),!0)}async function Ma(t,s){let n={},a,i=q(E.popt),e=[!1,!1,!0,!1];return P(n),f(n,
`/* %s */
`,"Get matching object comments"),T(n,`SELECT DISTINCT tt.nspname AS "%s", tt.name AS "%s", tt.object AS "%s", d.descrip\
tion AS "%s"
FROM (
`,"Schema","Name","Object","Description"),T(n,`  SELECT pgc.oid as oid, pgc.tableoid AS tableoid,
  n.nspname as nspname,
  CAST(pgc.conname AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_constraint pgc
    JOIN pg_catalog.pg_class c ON c.oid = pgc.conrelid
    LEFT JOIN pg_catalog.pg_namespace n     ON n.oid = c.relnamespace
`,"table constraint"),!s&&t==o&&l(n,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!w(n,t,!s&&t==o,!1,"n.nspname","pgc.conname",o,"pg_catalog.pg_table_is_visible(c.oid)",o,3)||(T(n,`UNION ALL
  SELECT pgc.oid as oid, pgc.tableoid AS tableoid,
  n.nspname as nspname,
  CAST(pgc.conname AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_constraint pgc
    JOIN pg_catalog.pg_type t ON t.oid = pgc.contypid
    LEFT JOIN pg_catalog.pg_namespace n     ON n.oid = t.typnamespace
`,"domain constraint"),!s&&t==o&&l(n,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!w(n,t,!s&&t==o,!1,"n.nspname","pgc.conname",o,"pg_catalog.pg_type_is_visible(t.oid)",o,3))||(T(n,`UNION ALL
  SELECT o.oid as oid, o.tableoid as tableoid,
  n.nspname as nspname,
  CAST(o.opcname AS pg_catalog.text) as name,
  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_opclass o
    JOIN pg_catalog.pg_am am ON o.opcmethod = am.oid
    JOIN pg_catalog.pg_namespace n ON n.oid = o.opcnamespace
`,"operator class"),!s&&t==o&&l(n,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!w(n,t,!0,!1,"n.nspname","o.opcname",o,"pg_catalog.pg_opclass_is_visible(o.oid)",o,3))||(T(n,`UNION ALL
  SELECT opf.oid as oid, opf.tableoid as tableoid,
  n.nspname as nspname,
  CAST(opf.opfname AS pg_catalog.text) AS name,
  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_opfamily opf
    JOIN pg_catalog.pg_am am ON opf.opfmethod = am.oid
    JOIN pg_catalog.pg_namespace n ON opf.opfnamespace = n.oid
`,"operator family"),!s&&t==o&&l(n,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!w(n,t,!0,!1,"n.nspname","opf.opfname",o,"pg_catalog.pg_opfamily_is_visible(opf.oid)",o,3))||(T(n,`UNION ALL
  SELECT r.oid as oid, r.tableoid as tableoid,
  n.nspname as nspname,
  CAST(r.rulename AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_rewrite r
       JOIN pg_catalog.pg_class c ON c.oid = r.ev_class
       LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
  WHERE r.rulename != '_RETURN'
`,"rule"),!s&&t==o&&l(n,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!w(n,t,!0,!1,"n.nspname","r.rulename",o,"pg_catalog.pg_table_is_visible(c.oid)",o,3))||(T(n,`UNION ALL
  SELECT t.oid as oid, t.tableoid as tableoid,
  n.nspname as nspname,
  CAST(t.tgname AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_trigger t
       JOIN pg_catalog.pg_class c ON c.oid = t.tgrelid
       LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
`,"trigger"),!s&&t==o&&l(n,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!w(n,t,!s&&t==o,!1,"n.nspname","t.tgname",o,"pg_catalog.pg_table_is_visible(c.oid)",o,3))||(l(n,`) AS tt
  JOIN pg_catalog.pg_description d ON (tt.oid = d.objoid AND tt.tableoid = d.classoid AND d.objsubid = 0)
`),l(n,"ORDER BY 1, 2, 3;"),a=await C(n.data),!a)?!1:(i.title="Object descriptions",i.translate_header=!0,i.translate_columns=
e,i.n_translate_columns=ne(e),Y(a,i,E.queryFout,!1,E.logfile),!0)}async function Ga(t,s,n){let a={},i,e;if(P(a),f(a,`/* \
%s */
`,"Get matching relations to describe"),l(a,`SELECT c.oid,
  n.nspname,
  c.relname
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
`),!n&&t==o&&l(a,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!w(a,t,!n&&t==o,!1,"n.nspname","c.relname",o,"pg_catalog.pg_table_is_visible(c.oid)",o,3)||(l(a,"ORDER BY 2, 3;"),i=await C(
a.data),!i))return!1;if(B(i)==0)return E.quiet||(t!=o?H('Did not find any relation named "%s".',t):H("Did not find any r\
elations.")),!1;for(e=0;e<B(i);e++){let c,N,A;if(c=_(i,e,0),N=_(i,e,1),A=_(i,e,2),!await va(N,A,c,s)||J)return!1}return!0}
async function va(t,s,n,a){let i=!1,e={},c=o,N=nn(E.popt.topt),A={},S=!1,p,d=o,D=[],m={},v={},h,se=-1,qe=-1,V=-1,ke=-1,Ve=-1,
Xe=-1,je=-1,sn=-1,on=-1,rn=-1,ln=-1,En=-1,cn=-1,pn=-1,On,O={},Tn=!1;if(N.default_footer=!1,N.expanded=!1,P(e),P(m),P(v),
f(e,`/* %s */
`,"Get general information about one relation"),E.sversion>=12e4?T(e,`SELECT c.relchecks, c.relkind, c.relhasindex, c.re\
lhasrules, c.relhastriggers, c.relrowsecurity, c.relforcerowsecurity, false AS relhasoids, c.relispartition, %s, c.relta\
blespace, CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersistence,\
 c.relreplident, am.amname
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
LEFT JOIN pg_catalog.pg_am am ON (c.relam = am.oid)
WHERE c.oid = '%s';`,a?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",n):E.sversion>=1e5?T(e,`SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, c.relrowse\
curity, c.relforcerowsecurity, c.relhasoids, c.relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN '' EL\
SE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
WHERE c.oid = '%s';`,a?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",n):E.sversion>=90500?T(e,`SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, c.relrow\
security, c.relforcerowsecurity, c.relhasoids, false as relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 T\
HEN '' ELSE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
WHERE c.oid = '%s';`,a?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",n):E.sversion>=90400?T(e,`SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, false, f\
alse, c.relhasoids, false as relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg\
_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
WHERE c.oid = '%s';`,a?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",n):T(e,`SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, false, false, c.relhasoids\
, false as relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg_catalog.regtype::\
pg_catalog.text END, c.relpersistence
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
WHERE c.oid = '%s';`,a?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",n),c=await C(e.data),!c)return i;if(B(c)==0)return E.quiet||H("Did not find any relation with OID %s.",n),i;if(O.
checks=Zn(_(c,0,0)),O.relkind=_(c,0,1)[0],O.hasindex=u(_(c,0,2),"t")==0,O.hasrules=u(_(c,0,3),"t")==0,O.hastriggers=u(_(
c,0,4),"t")==0,O.rowsecurity=u(_(c,0,5),"t")==0,O.forcerowsecurity=u(_(c,0,6),"t")==0,O.hasoids=u(_(c,0,7),"t")==0,O.ispartition=
u(_(c,0,8),"t")==0,O.reloptions=_(c,0,9),O.tablespace=Ln(_(c,0,10)),O.reloftype=u(_(c,0,11),"")!=0?_(c,0,11):o,O.relpersistence=
_(c,0,12)[0],O.relreplident=E.sversion>=90400?_(c,0,13)[0]:"d",E.sversion>=12e4?O.relam=oe(c,0,14)?o:_(c,0,14):O.relam=o,
c=o,O.relkind=="S"){let R=o,I=q(E.popt),y=[o,o,o];if(f(e,`/* %s */
`,"Get sequence information"),E.sversion>=1e5?(T(e,`SELECT pg_catalog.format_type(seqtypid, NULL) AS "%s",
       seqstart AS "%s",
       seqmin AS "%s",
       seqmax AS "%s",
       seqincrement AS "%s",
       CASE WHEN seqcycle THEN '%s' ELSE '%s' END AS "%s",
       seqcache AS "%s"
`,"Type","Start","Minimum","Maximum","Increment","yes","no","Cycles?","Cache"),T(e,`FROM pg_catalog.pg_sequence
WHERE seqrelid = '%s';`,n)):(T(e,`SELECT 'bigint' AS "%s",
       start_value AS "%s",
       min_value AS "%s",
       max_value AS "%s",
       increment_by AS "%s",
       CASE WHEN is_cycled THEN '%s' ELSE '%s' END AS "%s",
       cache_value AS "%s"
`,"Type","Start","Minimum","Maximum","Increment","yes","no","Cycles?","Cache"),T(e,"FROM %s",Ge(t)),T(e,".%s;",Ge(s))),c=
await C(e.data),!c)return i;if(f(e,`/* %s */
`,"Get the column that owns this sequence"),T(e,`SELECT pg_catalog.quote_ident(nspname) || '.' ||
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
 AND d.deptype IN ('a', 'i')`,n),R=await C(e.data),R){if(B(R)==1)switch(_(R,0,1)[0]){case"a":y[0]=gn("Owned by: %s",_(R,
0,0));break;case"i":y[0]=gn("Sequence for identity column: %s",_(R,0,0));break}}else return i;if(E.sversion>=19e4&&(f(e,
`/* %s */
`,"Get publications containing this sequence"),T(e,`SELECT pubname FROM pg_catalog.pg_publication p
WHERE p.puballsequences
 AND pg_catalog.pg_relation_is_publishable('%s')
ORDER BY 1`,n),R=await C(e.data),R)){let W=B(R);if(W>0){for(f(v,"Included in publications:"),p=0;p<W;p++)T(v,`
    "%s"`,_(R,p,0));y[0]==o?y[0]=v.data:y[1]=v.data,An(v)}}return O.relpersistence=="u"?f(m,'Unlogged sequence "%s.%s"',
t,s):f(m,'Sequence "%s.%s"',t,s),I.footers=y,I.topt.default_footer=!1,I.title=m.data,I.translate_header=!0,Y(c,I,E.queryFout,
!1,E.logfile),i=!0,i}if((O.relkind=="r"||O.relkind=="v"||O.relkind=="m"||O.relkind=="f"||O.relkind=="c"||O.relkind=="p")&&
(Tn=!0),h=0,f(e,`/* %s */
`,"Get per-column information for one relation"),l(e,"SELECT a.attname"),se=h++,l(e,`,
  pg_catalog.format_type(a.atttypid, a.atttypmod)`),qe=h++,Tn&&(l(e,`,
  (SELECT pg_catalog.pg_get_expr(d.adbin, d.adrelid, true)
   FROM pg_catalog.pg_attrdef d
   WHERE d.adrelid = a.attrelid AND d.adnum = a.attnum AND a.atthasdef),
  a.attnotnull`),V=h++,ke=h++,l(e,`,
  (SELECT c.collname FROM pg_catalog.pg_collation c, pg_catalog.pg_type t
   WHERE c.oid = a.attcollation AND t.oid = a.atttypid AND a.attcollation <> t.typcollation) AS attcollation`),Ve=h++,E.
sversion>=1e5?l(e,`,
  a.attidentity`):l(e,`,
  ''::pg_catalog.char AS attidentity`),Xe=h++,E.sversion>=12e4?l(e,`,
  a.attgenerated`):l(e,`,
  ''::pg_catalog.char AS attgenerated`),je=h++),(O.relkind=="i"||O.relkind=="I")&&(E.sversion>=11e4&&(T(e,`,
  CASE WHEN a.attnum <= (SELECT i.indnkeyatts FROM pg_catalog.pg_index i WHERE i.indexrelid = '%s') THEN '%s' ELSE '%s' \
END AS is_key`,n,"yes","no"),sn=h++),l(e,`,
  pg_catalog.pg_get_indexdef(a.attrelid, a.attnum, TRUE) AS indexdef`),on=h++),O.relkind=="f"&&(l(e,`,
  CASE WHEN attfdwoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT pg_catalog.quote_ident(o\
ption_name) || ' ' || pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(attfdwoptions)), ', \
') || ')' END AS attfdwoptions`),rn=h++),a&&(l(e,`,
  a.attstorage`),ln=h++,E.sversion>=14e4&&!E.hide_compression&&(O.relkind=="r"||O.relkind=="p"||O.relkind=="m")&&(l(e,`,\

  a.attcompression AS attcompression`),En=h++),(O.relkind=="r"||O.relkind=="i"||O.relkind=="I"||O.relkind=="m"||O.relkind==
"f"||O.relkind=="p")&&(l(e,`,
  CASE WHEN a.attstattarget=-1 THEN NULL ELSE a.attstattarget END AS attstattarget`),cn=h++),(O.relkind=="r"||O.relkind==
"v"||O.relkind=="m"||O.relkind=="f"||O.relkind=="c"||O.relkind=="p")&&(l(e,`,
  pg_catalog.col_description(a.attrelid, a.attnum)`),pn=h++)),l(e,`
FROM pg_catalog.pg_attribute a`),T(e,`
WHERE a.attrelid = '%s' AND a.attnum > 0 AND NOT a.attisdropped`,n),l(e,`
ORDER BY a.attnum;`),c=await C(e.data),!c)return i;switch(On=B(c),O.relkind){case"r":O.relpersistence=="u"?f(m,'Unlogged\
 table "%s.%s"',t,s):f(m,'Table "%s.%s"',t,s);break;case"v":f(m,'View "%s.%s"',t,s);break;case"m":f(m,'Materialized view\
 "%s.%s"',t,s);break;case"i":O.relpersistence=="u"?f(m,'Unlogged index "%s.%s"',t,s):f(m,'Index "%s.%s"',t,s);break;case"\
I":O.relpersistence=="u"?f(m,'Unlogged partitioned index "%s.%s"',t,s):f(m,'Partitioned index "%s.%s"',t,s);break;case"t":
f(m,'TOAST table "%s.%s"',t,s);break;case"c":f(m,'Composite type "%s.%s"',t,s);break;case"f":f(m,'Foreign table "%s.%s"',
t,s);break;case"p":O.relpersistence=="u"?f(m,'Unlogged partitioned table "%s.%s"',t,s):f(m,'Partitioned table "%s.%s"',t,
s);break;default:f(m,'?%c? "%s.%s"',O.relkind,t,s);break}for(h=0,D[h++]="Column",D[h++]="Type",Tn&&(D[h++]="Collation",D[h++]=
"Nullable",D[h++]="Default"),sn>=0&&(D[h++]="Key?"),on>=0&&(D[h++]="Definition"),rn>=0&&(D[h++]="FDW options"),ln>=0&&(D[h++]=
"Storage"),En>=0&&(D[h++]="Compression"),cn>=0&&(D[h++]="Stats target"),pn>=0&&(D[h++]="Description"),be(h<=ne(D)),an(A,
N,m.data,h,On),S=!0,p=0;p<h;p++)Te(A,D[p],!0,"l");for(p=0;p<On;p++){if(Q(A,_(c,p,se),!1,!1),Q(A,_(c,p,qe),!1,!1),Tn){let R,
I,y,W=!1;Q(A,_(c,p,Ve),!1,!1),Q(A,u(_(c,p,ke),"t")==0?"not null":"",!1,!1),R=_(c,p,Xe),I=_(c,p,je),R[0]=="a"?y="generate\
d always as identity":R[0]=="d"?y="generated by default as identity":I[0]=="s"?(y=gn("generated always as (%s) stored",_(
c,p,V)),W=!0):I[0]=="v"?(y=gn("generated always as (%s)",_(c,p,V)),W=!0):y=_(c,p,V),Q(A,y,!1,W)}if(sn>=0&&Q(A,_(c,p,sn),
!0,!1),on>=0&&Q(A,_(c,p,on),!1,!1),rn>=0&&Q(A,_(c,p,rn),!1,!1),ln>=0){let R=_(c,p,ln);Q(A,R[0]=="p"?"plain":R[0]=="m"?"m\
ain":R[0]=="x"?"extended":R[0]=="e"?"external":"???",!1,!1)}if(En>=0){let R=_(c,p,En);Q(A,R[0]=="p"?"pglz":R[0]=="l"?"lz\
4":R[0]==null?"":"???",!1,!1)}cn>=0&&Q(A,_(c,p,cn),!1,!1),pn>=0&&Q(A,_(c,p,pn),!1,!1)}if(O.ispartition){let R;if(f(e,`/*\
 %s */
`,"Get partitioning information for this partition"),l(e,`SELECT inhparent::pg_catalog.regclass,
  pg_catalog.pg_get_expr(c.relpartbound, c.oid),
  `),l(e,E.sversion>=14e4?"inhdetachpending":"false as inhdetachpending"),a&&l(e,`,
  pg_catalog.pg_get_partition_constraintdef(c.oid)`),T(e,`
FROM pg_catalog.pg_class c JOIN pg_catalog.pg_inherits i ON c.oid = inhrelid
WHERE c.oid = '%s';`,n),R=await C(e.data),!R)return i;if(B(R)>0){let I=_(R,0,0),y=_(R,0,1),W=_(R,0,2);if(f(v,"Partition \
of: %s %s%s",I,y,u(W,"t")==0?" DETACH PENDING":""),M(A,v.data),a){let k=o;oe(R,0,3)||(k=_(R,0,3)),k==o||k[0]==null?f(v,"\
No partition constraint"):f(v,"Partition constraint: %s",k),M(A,v.data)}}}if(O.relkind=="p"){let R;if(f(e,`/* %s */
`,"Get partitioning information for this table"),T(e,"SELECT pg_catalog.pg_get_partkeydef('%s'::pg_catalog.oid);",n),R=await C(
e.data),!R)return i;if(B(R)==1){let I=_(R,0,0);f(v,"Partition key: %s",I),M(A,v.data)}}if(O.relkind=="t"){let R;if(f(e,`\
/* %s */
`,"Get the table that owns this TOAST table"),T(e,`SELECT n.nspname, c.relname
FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
WHERE reltoastrelid = '%s';`,n),R=await C(e.data),!R)return i;if(B(R)==1){let I=_(R,0,0),y=_(R,0,1);f(v,'Owning table: "\
%s.%s"',I,y),M(A,v.data)}}if(O.relkind=="i"||O.relkind=="I"){let R;if(f(e,`/* %s */
`,"Get index details"),l(e,`SELECT i.indisunique, i.indisprimary, i.indisclustered, i.indisvalid,
  (NOT i.indimmediate) AND EXISTS (SELECT 1 FROM pg_catalog.pg_constraint WHERE conrelid = i.indrelid AND conindid = i.i\
ndexrelid AND contype IN ('p','u','x') AND condeferrable) AS condeferrable,
  (NOT i.indimmediate) AND EXISTS (SELECT 1 FROM pg_catalog.pg_constraint WHERE conrelid = i.indrelid AND conindid = i.i\
ndexrelid AND contype IN ('p','u','x') AND condeferred) AS condeferred,
`),E.sversion>=90400?l(e,`i.indisreplident,
`):l(e,`false AS indisreplident,
`),E.sversion>=15e4?l(e,`i.indnullsnotdistinct,
`):l(e,`false AS indnullsnotdistinct,
`),T(e,`  a.amname, c2.relname, pg_catalog.pg_get_expr(i.indpred, i.indrelid, true)
FROM pg_catalog.pg_index i, pg_catalog.pg_class c, pg_catalog.pg_class c2, pg_catalog.pg_am a
WHERE i.indexrelid = c.oid AND c.oid = '%s' AND c.relam = a.oid
AND i.indrelid = c2.oid;`,n),R=await C(e.data),R){if(B(R)!=1)return i;{let I=_(R,0,0),y=_(R,0,1),W=_(R,0,2),k=_(R,0,3),te=_(
R,0,4),De=_(R,0,5),_e=_(R,0,6),Je=_(R,0,7),Dt=_(R,0,8),bt=_(R,0,9),Xn=_(R,0,10);u(y,"t")==0?f(v,"primary key, "):u(I,"t")==
0?u(Je,"t")==0?f(v,"unique nulls not distinct, "):f(v,"unique, "):An(v),T(v,'%s, for table "%s.%s"',Dt,t,bt),we(Xn)&&T(v,
", predicate (%s)",Xn),u(W,"t")==0&&l(v,", clustered"),u(k,"t")!=0&&l(v,", invalid"),u(te,"t")==0&&l(v,", deferrable"),u(
De,"t")==0&&l(v,", initially deferred"),u(_e,"t")==0&&l(v,", replica identity"),M(A,v.data),O.relkind=="i"&&await Sn(A,O.
relkind,O.tablespace,!0)}}else return i}else if(O.relkind=="r"||O.relkind=="m"||O.relkind=="f"||O.relkind=="p"||O.relkind==
"I"||O.relkind=="t"){let R=o,I=0;if(O.hasindex){if(f(e,`/* %s */
`,"Get indexes for this table"),l(e,`SELECT c2.relname, i.indisprimary, i.indisunique, i.indisclustered, i.indisvalid, p\
g_catalog.pg_get_indexdef(i.indexrelid, 0, true),
  pg_catalog.pg_get_constraintdef(con.oid, true), contype, condeferrable, condeferred`),E.sversion>=90400?l(e,", i.indis\
replident"):l(e,", false AS indisreplident"),l(e,", c2.reltablespace"),E.sversion>=18e4?l(e,", con.conperiod"):l(e,", fa\
lse AS conperiod"),T(e,`
FROM pg_catalog.pg_class c, pg_catalog.pg_class c2, pg_catalog.pg_index i
  LEFT JOIN pg_catalog.pg_constraint con ON (conrelid = i.indrelid AND conindid = i.indexrelid AND contype IN ('p','u','\
x'))
WHERE c.oid = '%s' AND c.oid = i.indrelid AND i.indexrelid = c2.oid
ORDER BY i.indisprimary DESC, c2.relname;`,n),R=await C(e.data),R)I=B(R);else return i;if(I>0)for(M(A,"Indexes:"),p=0;p<
I;p++){if(f(e,'    "%s"',_(R,p,0)),u(_(R,p,7),"x")==0||u(_(R,p,12),"t")==0)T(e," %s",_(R,p,6));else{let y,W;u(_(R,p,1),"\
t")==0?l(e," PRIMARY KEY,"):u(_(R,p,2),"t")==0&&(u(_(R,p,7),"u")==0?l(e," UNIQUE CONSTRAINT,"):l(e," UNIQUE,")),y=_(R,p,
5),W=Ke(y," USING "),W!=o&&(y=W.slice(7)),T(e," %s",y),u(_(R,p,8),"t")==0&&l(e," DEFERRABLE"),u(_(R,p,9),"t")==0&&l(e," \
INITIALLY DEFERRED")}u(_(R,p,3),"t")==0&&l(e," CLUSTER"),u(_(R,p,4),"t")!=0&&l(e," INVALID"),u(_(R,p,10),"t")==0&&l(e," \
REPLICA IDENTITY"),M(A,e.data),await Sn(A,"i",Ln(_(R,p,11)),!1)}}if(O.checks){if(f(e,`/* %s */
`,"Get check constraints for this table"),T(e,`SELECT r.conname, pg_catalog.pg_get_constraintdef(r.oid, true)
FROM pg_catalog.pg_constraint r
WHERE r.conrelid = '%s' AND r.contype = 'c'
ORDER BY 1;`,n),R=await C(e.data),R)I=B(R);else return i;if(I>0)for(M(A,"Check constraints:"),p=0;p<I;p++)f(e,'    "%s" \
%s',_(R,p,0),_(R,p,1)),M(A,e.data)}if(f(e,`/* %s */
`,"Get foreign key constraints for this table"),E.sversion>=12e4&&(O.ispartition||O.relkind=="p")?T(e,`SELECT conrelid =\
 '%s'::pg_catalog.regclass AS sametable,
       conname,
       pg_catalog.pg_get_constraintdef(oid, true) AS condef,
       conrelid::pg_catalog.regclass AS ontable
  FROM pg_catalog.pg_constraint,
       pg_catalog.pg_partition_ancestors('%s')
 WHERE conrelid = relid AND contype = 'f' AND conparentid = 0
ORDER BY sametable DESC, conname;`,n,n):(T(e,`SELECT true as sametable, conname,
  pg_catalog.pg_get_constraintdef(r.oid, true) as condef,
  conrelid::pg_catalog.regclass AS ontable
FROM pg_catalog.pg_constraint r
WHERE r.conrelid = '%s' AND r.contype = 'f'
`,n),E.sversion>=12e4&&l(e,`     AND conparentid = 0
`),l(e,"ORDER BY conname")),R=await C(e.data),R)I=B(R);else return i;if(I>0){let y=ye(R,"sametable"),W=ye(R,"conname"),k=ye(
R,"condef"),te=ye(R,"ontable");for(M(A,"Foreign-key constraints:"),p=0;p<I;p++)u(_(R,p,y),"f")==0?f(e,'    TABLE "%s" CO\
NSTRAINT "%s" %s',_(R,p,te),_(R,p,W),_(R,p,k)):f(e,'    "%s" %s',_(R,p,W),_(R,p,k)),M(A,e.data)}if(f(e,`/* %s */
`,"Get foreign keys referencing this table"),E.sversion>=12e4?T(e,`SELECT conname, conrelid::pg_catalog.regclass AS onta\
ble,
       pg_catalog.pg_get_constraintdef(oid, true) AS condef
  FROM pg_catalog.pg_constraint c
 WHERE confrelid IN (SELECT pg_catalog.pg_partition_ancestors('%s')
                     UNION ALL VALUES ('%s'::pg_catalog.regclass))
       AND contype = 'f' AND conparentid = 0
ORDER BY conname;`,n,n):T(e,`SELECT conname, conrelid::pg_catalog.regclass AS ontable,
       pg_catalog.pg_get_constraintdef(oid, true) AS condef
  FROM pg_catalog.pg_constraint
 WHERE confrelid = %s AND contype = 'f'
ORDER BY conname;`,n),R=await C(e.data),R)I=B(R);else return i;if(I>0){let y=ye(R,"conname"),W=ye(R,"ontable"),k=ye(R,"c\
ondef");for(M(A,"Referenced by:"),p=0;p<I;p++)f(e,'    TABLE "%s" CONSTRAINT "%s" %s',_(R,p,W),_(R,p,y),_(R,p,k)),M(A,e.
data)}if(E.sversion>=90500){if(f(e,`/* %s */
`,"Get row-level policies for this table"),l(e,"SELECT pol.polname,"),E.sversion>=1e5?l(e,` pol.polpermissive,
`):l(e,` 't' as polpermissive,
`),T(e,`  CASE WHEN pol.polroles = '{0}' THEN NULL ELSE pg_catalog.array_to_string(array(select rolname from pg_catalog.\
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
WHERE pol.polrelid = '%s' ORDER BY 1;`,n),R=await C(e.data),R)I=B(R);else return i;for(O.rowsecurity&&!O.forcerowsecurity&&
I>0&&M(A,"Policies:"),O.rowsecurity&&O.forcerowsecurity&&I>0&&M(A,"Policies (forced row security enabled):"),O.rowsecurity&&
!O.forcerowsecurity&&I==0&&M(A,"Policies (row security enabled): (none)"),O.rowsecurity&&O.forcerowsecurity&&I==0&&M(A,"\
Policies (forced row security enabled): (none)"),!O.rowsecurity&&I>0&&M(A,"Policies (row security disabled):"),p=0;p<I;p++)
f(e,'    POLICY "%s"',_(R,p,0)),_(R,p,1)[0]=="f"&&l(e," AS RESTRICTIVE"),oe(R,p,5)||T(e," FOR %s",_(R,p,5)),oe(R,p,2)||T(
e,`
      TO %s`,_(R,p,2)),oe(R,p,3)||T(e,`
      USING (%s)`,_(R,p,3)),oe(R,p,4)||T(e,`
      WITH CHECK (%s)`,_(R,p,4)),M(A,e.data)}if(E.sversion>=14e4){if(f(e,`/* %s */
`,"Get extended statistics for this table"),T(e,`SELECT oid, stxrelid::pg_catalog.regclass, stxnamespace::pg_catalog.reg\
namespace::pg_catalog.text AS nsp, stxname,
pg_catalog.pg_get_statisticsobjdef_columns(oid) AS columns,
  'd' = any(stxkind) AS ndist_enabled,
  'f' = any(stxkind) AS deps_enabled,
  'm' = any(stxkind) AS mcv_enabled,
stxstattarget
FROM pg_catalog.pg_statistic_ext
WHERE stxrelid = '%s'
ORDER BY nsp, stxname;`,n),R=await C(e.data),R)I=B(R);else return i;if(I>0)for(M(A,"Statistics objects:"),p=0;p<I;p++){let y=!1,
W,k,te,De,_e;W=u(_(R,p,5),"t")==0,k=u(_(R,p,6),"t")==0,te=u(_(R,p,7),"t")==0,f(e,"    "),T(e,'"%s.%s"',_(R,p,2),_(R,p,3)),
De=W&&k&&te,_e=W||k||te,_e&&!De&&(l(e," ("),W&&(l(e,"ndistinct"),y=!0),k&&(T(e,"%sdependencies",y?", ":""),y=!0),te&&T(e,
"%smcv",y?", ":""),$(e,")")),T(e," ON %s FROM %s",_(R,p,4),_(R,p,1)),!oe(R,p,8)&&u(_(R,p,8),"-1")!=0&&T(e,"; STATISTICS \
%s",_(R,p,8)),M(A,e.data)}}else if(E.sversion>=1e5){if(f(e,`/* %s */
`,"Get extended statistics for this table"),l(e,`SELECT oid, stxrelid::pg_catalog.regclass, stxnamespace::pg_catalog.reg\
namespace AS nsp, stxname,
  (SELECT pg_catalog.string_agg(pg_catalog.quote_ident(attname),', ')
   FROM pg_catalog.unnest(stxkeys) s(attnum)
   JOIN pg_catalog.pg_attribute a ON (stxrelid = a.attrelid AND
        a.attnum = s.attnum AND NOT attisdropped)) AS columns,
  'd' = any(stxkind) AS ndist_enabled,
  'f' = any(stxkind) AS deps_enabled,
  'm' = any(stxkind) AS mcv_enabled,
`),E.sversion>=13e4?l(e,`  stxstattarget
`):l(e,`  -1 AS stxstattarget
`),T(e,`FROM pg_catalog.pg_statistic_ext
WHERE stxrelid = '%s'
ORDER BY 1;`,n),R=await C(e.data),R)I=B(R);else return i;if(I>0)for(M(A,"Statistics objects:"),p=0;p<I;p++){let y=!1;f(e,
"    "),T(e,'"%s.%s" (',_(R,p,2),_(R,p,3)),u(_(R,p,5),"t")==0&&(l(e,"ndistinct"),y=!0),u(_(R,p,6),"t")==0&&(T(e,"%sdepen\
dencies",y?", ":""),y=!0),u(_(R,p,7),"t")==0&&T(e,"%smcv",y?", ":""),T(e,") ON %s FROM %s",_(R,p,4),_(R,p,1)),u(_(R,p,8),
"-1")!=0&&T(e,"; STATISTICS %s",_(R,p,8)),M(A,e.data)}}if(O.hasrules&&O.relkind!="m"){if(f(e,`/* %s */
`,"Get rules for this relation"),T(e,`SELECT r.rulename, trim(trailing ';' from pg_catalog.pg_get_ruledef(r.oid, true)),\
 ev_enabled
FROM pg_catalog.pg_rewrite r
WHERE r.ev_class = '%s' ORDER BY 1;`,n),R=await C(e.data),R)I=B(R);else return i;if(I>0){let y,W;for(W=0;W<4;W++)for(y=!1,
p=0;p<I;p++){let k,te=!1;switch(W){case 0:_(R,p,2)[0]=="O"&&(te=!0);break;case 1:_(R,p,2)[0]=="D"&&(te=!0);break;case 2:
_(R,p,2)[0]=="A"&&(te=!0);break;case 3:_(R,p,2)[0]=="R"&&(te=!0);break}if(te){if(!y){switch(W){case 0:f(e,"Rules:");break;case 1:
f(e,"Disabled rules:");break;case 2:f(e,"Rules firing always:");break;case 3:f(e,"Rules firing on replica only:");break}
M(A,e.data),y=!0}k=_(R,p,1),k=k.slice(12),f(e,"    %s",k),M(A,e.data)}}}}if(E.sversion>=1e5){if(f(e,`/* %s */
`,"Get publications that publish this table"),E.sversion>=15e4?(T(e,`SELECT pubname
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
`,n,n,n),E.sversion>=19e4?T(e,` AND NOT pr.prexcept
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
ORDER BY 1;`,n,n,n):T(e,`UNION
SELECT pubname
		, NULL
		, NULL
FROM pg_catalog.pg_publication p
WHERE p.puballtables AND pg_catalog.pg_relation_is_publishable('%s')
ORDER BY 1;`,n)):T(e,`SELECT pubname
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
ORDER BY 1;`,n,n),R=await C(e.data),R)I=B(R);else return i;for(I>0&&M(A,"Included in publications:"),p=0;p<I;p++)f(e,'  \
  "%s"',_(R,p,0)),oe(R,p,2)||T(e," (%s)",_(R,p,2)),oe(R,p,1)||T(e," WHERE %s",_(R,p,1)),M(A,e.data)}if(E.sversion>=19e4){
if(f(e,`/* %s */
`,"Get publications that exclude this table"),T(e,`SELECT pubname
FROM pg_catalog.pg_publication p
JOIN pg_catalog.pg_publication_rel pr ON p.oid = pr.prpubid
WHERE (pr.prrelid = '%s' OR pr.prrelid = pg_catalog.pg_partition_root('%s'))
AND pr.prexcept
ORDER BY 1;`,n,n),R=await C(e.data),R)I=B(R);else return i;for(I>0&&M(A,"Excluded from publications:"),p=0;p<I;p++)f(e,'\
    "%s"',_(R,p,0)),M(A,e.data)}if(a){if(f(e,`/* %s */
`,"Get not-null constraints for this table"),T(e,`SELECT c.conname, a.attname, c.connoinherit,
  c.conislocal, c.coninhcount <> 0,
  c.convalidated
FROM pg_catalog.pg_constraint c JOIN
  pg_catalog.pg_attribute a ON
    (a.attrelid = c.conrelid AND a.attnum = c.conkey[1])
WHERE c.contype = 'n' AND
  c.conrelid = '%s'::pg_catalog.regclass
ORDER BY a.attnum`,n),R=await C(e.data),R)I=B(R);else return i;for(I>0&&M(A,"Not-null constraints:"),p=0;p<I;p++){let y=_(
R,p,3)[0]=="t",W=_(R,p,4)[0]=="t",k=_(R,p,5)[0]=="t";f(e,'    "%s" NOT NULL "%s"%s%s',_(R,p,0),_(R,p,1),_(R,p,2)[0]=="t"?
" NO INHERIT":y&&W?" (local, inherited)":W?" (inherited)":"",k?"":" NOT VALID"),M(A,e.data)}}}if((O.relkind=="v"||O.relkind==
"m")&&a){let R;if(f(e,`/* %s */
`,"Get view's definition"),T(e,"SELECT pg_catalog.pg_get_viewdef('%s'::pg_catalog.oid, true);",n),R=await C(e.data),!R)return i;
B(R)>0&&(d=_(R,0,0))}if(d!=o){let R=o;if(M(A,"View definition:"),M(A,d),O.hasrules){if(f(e,`/* %s */
`,"Get rules for this view"),T(e,`SELECT r.rulename, trim(trailing ';' from pg_catalog.pg_get_ruledef(r.oid, true))
FROM pg_catalog.pg_rewrite r
WHERE r.ev_class = '%s' AND r.rulename != '_RETURN' ORDER BY 1;`,n),R=await C(e.data),!R)return i;if(B(R)>0)for(M(A,"Rul\
es:"),p=0;p<B(R);p++){let I;I=_(R,p,1),I=I.slice(12),f(e," %s",I),M(A,e.data)}}}if(O.hastriggers){let R,I;if(f(e,`/* %s \
*/
`,"Get triggers for this relation"),l(e,`SELECT t.tgname, pg_catalog.pg_get_triggerdef(t.oid, true), t.tgenabled, t.tgis\
internal,
`),E.sversion>=13e4?l(e,`  CASE WHEN t.tgparentid != 0 THEN
    (SELECT u.tgrelid::pg_catalog.regclass
     FROM pg_catalog.pg_trigger AS u,
          pg_catalog.pg_partition_ancestors(t.tgrelid) WITH ORDINALITY AS a(relid, depth)
     WHERE u.tgname = t.tgname AND u.tgrelid = a.relid
           AND u.tgparentid = 0
     ORDER BY a.depth LIMIT 1)
  END AS parent
`):l(e,`  NULL AS parent
`),T(e,`FROM pg_catalog.pg_trigger t
WHERE t.tgrelid = '%s' AND `,n),E.sversion>=11e4&&E.sversion<15e4?l(e,`(NOT t.tgisinternal OR (t.tgisinternal AND t.tgen\
abled = 'D') 
    OR EXISTS (SELECT 1 FROM pg_catalog.pg_depend WHERE objid = t.oid 
        AND refclassid = 'pg_catalog.pg_trigger'::pg_catalog.regclass))`):l(e,"(NOT t.tgisinternal OR (t.tgisinternal AN\
D t.tgenabled = 'D'))"),l(e,`
ORDER BY 1;`),R=await C(e.data),R)I=B(R);else return i;if(I>0){let y,W;for(W=0;W<=4;W++)for(y=!1,p=0;p<I;p++){let k,te,De,
_e,Je;switch(_e=_(R,p,2),Je=_(R,p,3),k=!1,W){case 0:(_e[0]=="O"||_e[0]=="t")&&(k=!0);break;case 1:(_e[0]=="D"||_e[0]=="f")&&
Je[0]=="f"&&(k=!0);break;case 2:(_e[0]=="D"||_e[0]=="f")&&Je[0]=="t"&&(k=!0);break;case 3:_e[0]=="A"&&(k=!0);break;case 4:
_e[0]=="R"&&(k=!0);break}if(k!=!1){if(y==!1){switch(W){case 0:f(e,"Triggers:");break;case 1:f(e,"Disabled user triggers:");
break;case 2:f(e,"Disabled internal triggers:");break;case 3:f(e,"Triggers firing always:");break;case 4:f(e,"Triggers f\
iring on replica only:");break}M(A,e.data),y=!0}te=_(R,p,1),De=Ke(te," TRIGGER "),De!=o&&(te=De.slice(9)),f(e,"    %s",te),
oe(R,p,4)||T(e,", ON TABLE %s",_(R,p,4)),M(A,e.data)}}}}if(O.relkind=="r"||O.relkind=="m"||O.relkind=="f"||O.relkind=="p"||
O.relkind=="I"||O.relkind=="t"){let R,I,y;if(R=O.relkind=="p"||O.relkind=="I",O.relkind=="f"){let W;if(f(e,`/* %s */
`,"Get foreign server for this table"),T(e,`SELECT s.srvname,
  pg_catalog.array_to_string(ARRAY(
    SELECT pg_catalog.quote_ident(option_name) || ' ' || pg_catalog.quote_literal(option_value)
    FROM pg_catalog.pg_options_to_table(ftoptions)),  ', ')
FROM pg_catalog.pg_foreign_table f,
     pg_catalog.pg_foreign_server s
WHERE f.ftrelid = '%s' AND s.oid = f.ftserver;`,n),I=await C(e.data),I){if(B(I)!=1)return i}else return i;f(e,"Server: %\
s",_(I,0,0)),M(A,e.data),W=_(I,0,1),W!=o&&W[0]!=null&&(f(e,"FDW options: (%s)",W),M(A,e.data))}if(f(e,`/* %s */
`,"Get inheritance parent tables"),T(e,`SELECT c.oid::pg_catalog.regclass
FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i
WHERE c.oid = i.inhparent AND i.inhrelid = '%s'
  AND c.relkind != 'p' AND c.relkind != 'I'
ORDER BY inhseqno;`,n),I=await C(e.data),I){let W="Inherits";for(y=B(I),y>0&&(f(e,"%s:",W),M(A,e.data)),p=0;p<y;p++)f(e,
"    %s",_(I,p,0)),M(A,e.data)}else return i;if(f(e,`/* %s */
`,"Get child tables"),E.sversion>=14e4?T(e,`SELECT c.oid::pg_catalog.regclass, c.relkind, inhdetachpending, pg_catalog.p\
g_get_expr(c.relpartbound, c.oid)
FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i
WHERE c.oid = i.inhrelid AND i.inhparent = '%s'
ORDER BY pg_catalog.pg_get_expr(c.relpartbound, c.oid) = 'DEFAULT', c.oid::pg_catalog.regclass::pg_catalog.text;`,n):E.sversion>=
1e5?T(e,`SELECT c.oid::pg_catalog.regclass, c.relkind, false AS inhdetachpending, pg_catalog.pg_get_expr(c.relpartbound,\
 c.oid)
FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i
WHERE c.oid = i.inhrelid AND i.inhparent = '%s'
ORDER BY pg_catalog.pg_get_expr(c.relpartbound, c.oid) = 'DEFAULT', c.oid::pg_catalog.regclass::pg_catalog.text;`,n):T(e,
`SELECT c.oid::pg_catalog.regclass, c.relkind, false AS inhdetachpending, NULL
FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i
WHERE c.oid = i.inhrelid AND i.inhparent = '%s'
ORDER BY c.oid::pg_catalog.regclass::pg_catalog.text;`,n),I=await C(e.data),!I)return i;if(y=B(I),R&&y==0)f(e,"Number of\
 partitions: %d",y),M(A,e.data);else if(!a)y>0&&(R?f(e,"Number of partitions: %d (Use \\d+ to list them.)",y):f(e,"Numbe\
r of child tables: %d (Use \\d+ to list them.)",y),M(A,e.data));else{let W=R?"Partitions":"Child tables";for(y>0&&(f(e,"\
%s:",W),M(A,e.data)),p=0;p<y;p++){let k=_(I,p,1)[0];f(e,"    %s",_(I,p,0)),oe(I,p,3)||T(e," %s",_(I,p,3)),k=="p"||k=="I"?
l(e,", PARTITIONED"):k=="f"&&l(e,", FOREIGN"),u(_(I,p,2),"t")==0&&l(e," (DETACH PENDING)"),M(A,e.data)}}O.reloftype!=o&&
(f(e,"Typed table of type: %s",O.reloftype),M(A,e.data)),a&&(O.relkind=="r"||O.relkind=="m")&&O.relreplident!="i"&&(u(t,
"pg_catalog")!=0&&O.relreplident!="d"||u(t,"pg_catalog")==0&&O.relreplident!="n")&&(f(e,"%s: %s","Replica Identity",O.relreplident==
"f"?"FULL":O.relreplident=="n"?"NOTHING":"???"),M(A,e.data)),a&&O.relkind!="m"&&O.hasoids&&M(A,"Has OIDs: yes"),await Sn(
A,O.relkind,O.tablespace,!0),a&&O.relam!=o&&!E.hide_tableam&&(f(e,"Access method: %s",O.relam),M(A,e.data))}return a&&O.
reloptions!=o&&O.reloptions[0]!=null&&(f(e,"%s: %s","Options",O.reloptions),M(A,e.data)),tn(A,E.queryFout,!1,E.logfile),
i=!0,i}async function Sn(t,s,n,a){if((s=="r"||s=="m"||s=="i"||s=="p"||s=="I"||s=="t")&&n!=0){let i=o,e={};if(P(e),f(e,`/\
* %s */
`,"Get tablespace information for this relation"),T(e,`SELECT spcname FROM pg_catalog.pg_tablespace
WHERE oid = '%u';`,n),i=await C(e.data),!i)return;B(i)>0&&(a?(f(e,'Tablespace: "%s"',_(i,0,0)),M(t,e.data)):(f(e,"%s",t.
footer.data),T(e,', tablespace "%s"',_(i,0,0)),It(t,e.data)))}}async function Yn(t,s,n){let a={},i,e={},c=nn(E.popt.topt),
N=2,A=0,S,p,d="l",D;if(c.default_footer=!1,P(a),f(a,`/* %s */
`,"Get matching roles"),l(a,`SELECT r.rolname, r.rolsuper, r.rolinherit,
  r.rolcreaterole, r.rolcreatedb, r.rolcanlogin,
  r.rolconnlimit, r.rolvaliduntil`),s&&(l(a,`
, pg_catalog.shobj_description(r.oid, 'pg_authid') AS description`),N++),l(a,`
, r.rolreplication`),E.sversion>=90500&&l(a,`
, r.rolbypassrls`),l(a,`
FROM pg_catalog.pg_roles r
`),!n&&t==o&&l(a,`WHERE r.rolname !~ '^pg_'
`),!w(a,t,!1,!1,o,"r.rolname",o,o,o,1)||(l(a,"ORDER BY 1;"),i=await C(a.data),!i))return!1;for(A=B(i),D=[],an(e,c,"List \
of roles",N,A),Te(e,"Role name",!0,d),Te(e,"Attributes",!0,d),s&&Te(e,"Description",!0,d),S=0;S<A;S++)Q(e,_(i,S,0),!1,!1),
An(a),u(_(i,S,1),"t")==0&&Pe(a,"Superuser"),u(_(i,S,2),"t")!=0&&Pe(a,"No inheritance"),u(_(i,S,3),"t")==0&&Pe(a,"Create \
role"),u(_(i,S,4),"t")==0&&Pe(a,"Create DB"),u(_(i,S,5),"t")!=0&&Pe(a,"Cannot login"),u(_(i,S,s?9:8),"t")==0&&Pe(a,"Repl\
ication"),E.sversion>=90500&&u(_(i,S,s?10:9),"t")==0&&Pe(a,"Bypass RLS"),p=Zn(_(i,S,6)),p>=0&&(a.len>0&&$(a,`
`),p==0?l(a,"No connections"):T(a,zt("%d connection","%d connections",p),p)),u(_(i,S,7),"")!=0&&(a.len>0&&$(a,`
`),l(a,"Password valid until "),l(a,_(i,S,7))),D[S]=a.data,Q(e,D[S],!1,!1),s&&Q(e,_(i,S,8),!1,!1);return tn(e,E.queryFout,
!1,E.logfile),!0}function Pe(t,s){t.len>0&&l(t,", "),l(t,s)}async function Wa(t,s){let n={},a,i=q(E.popt),e={};return P(
n),f(n,`/* %s */
`,"Get per-database and per-role settings"),T(n,`SELECT rolname AS "%s", datname AS "%s",
pg_catalog.array_to_string(setconfig, E'\\n') AS "%s"
FROM pg_catalog.pg_db_role_setting s
LEFT JOIN pg_catalog.pg_database d ON d.oid = setdatabase
LEFT JOIN pg_catalog.pg_roles r ON r.oid = setrole
`,"Role","Database","Settings"),!w(n,t,!1,!1,o,"r.rolname",o,o,e,1)||!w(n,s,e.value,!1,o,"d.datname",o,o,o,1)||(l(n,"ORD\
ER BY 1, 2;"),a=await C(n.data),!a)?!1:(B(a)==0&&!E.quiet?t!=o&&s!=o?H('Did not find any settings for role "%s" and data\
base "%s".',t,s):t!=o?H('Did not find any settings for role "%s".',t):H("Did not find any settings."):(i.title="List of \
settings",i.translate_header=!0,Y(a,i,E.queryFout,!1,E.logfile)),!0)}async function xa(t,s){let n={},a,i=q(E.popt);return P(
n),f(n,`/* %s */
`,"Get matching role grants"),T(n,`SELECT m.rolname AS "%s", r.rolname AS "%s",
  pg_catalog.concat_ws(', ',
`,"Role name","Member of"),E.sversion>=16e4?l(n,`    CASE WHEN pam.admin_option THEN 'ADMIN' END,
    CASE WHEN pam.inherit_option THEN 'INHERIT' END,
    CASE WHEN pam.set_option THEN 'SET' END
`):l(n,`    CASE WHEN pam.admin_option THEN 'ADMIN' END,
    CASE WHEN m.rolinherit THEN 'INHERIT' END,
    'SET'
`),T(n,`  ) AS "%s",
  g.rolname AS "%s"
`,"Options","Grantor"),l(n,`FROM pg_catalog.pg_roles m
     JOIN pg_catalog.pg_auth_members pam ON (pam.member = m.oid)
     LEFT JOIN pg_catalog.pg_roles r ON (pam.roleid = r.oid)
     LEFT JOIN pg_catalog.pg_roles g ON (pam.grantor = g.oid)
`),!s&&t==o&&l(n,`WHERE m.rolname !~ '^pg_'
`),!w(n,t,!1,!1,o,"m.rolname",o,o,o,1)||(l(n,`ORDER BY 1, 2, 4;
`),a=await C(n.data),!a)?!1:(i.title="List of role grants",i.translate_header=!0,Y(a,i,E.queryFout,!1,E.logfile),!0)}async function qn(t,s,n,a){
let i=K(t,"t")!=o,e=K(t,"i")!=o,c=K(t,"v")!=o,N=K(t,"m")!=o,A=K(t,"s")!=o,S=K(t,"E")!=o,p,d={},D,m=q(E.popt),v,h=[!1,!1,
!0,!1,!1,!1,!1,!1,!1];return p=i+e+c+N+A+S,p==0&&(i=c=N=A=S=!0),P(d),f(d,`/* %s */
`,"Get matching relations"),T(d,`SELECT n.nspname as "%s",
  c.relname as "%s",
  CASE c.relkind WHEN 'r' THEN '%s' WHEN 'v' THEN '%s' WHEN 'm' THEN '%s' WHEN 'i' THEN '%s' WHEN 'S' THEN '%s' WHEN 't'\
 THEN '%s' WHEN 'f' THEN '%s' WHEN 'p' THEN '%s' WHEN 'I' THEN '%s' END as "%s",
  pg_catalog.pg_get_userbyid(c.relowner) as "%s"`,"Schema","Name","table","view","materialized view","index","sequence",
"TOAST table","foreign table","partitioned table","partitioned index","Type","Owner"),v=4,e&&(T(d,`,
  c2.relname as "%s"`,"Table"),v++),n&&(T(d,`,
  CASE c.relpersistence WHEN 'p' THEN '%s' WHEN 't' THEN '%s' WHEN 'u' THEN '%s' END as "%s"`,"permanent","temporary","u\
nlogged","Persistence"),h[v]=!0,E.sversion>=12e4&&!E.hide_tableam&&(i||N||e)&&T(d,`,
  am.amname as "%s"`,"Access method"),T(d,`,
  pg_catalog.pg_size_pretty(pg_catalog.pg_table_size(c.oid)) as "%s",
  pg_catalog.obj_description(c.oid, 'pg_class') as "%s"`,"Size","Description")),l(d,`
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace`),E.sversion>=12e4&&!E.hide_tableam&&(i||N||e)&&l(d,`\

     LEFT JOIN pg_catalog.pg_am am ON am.oid = c.relam`),e&&l(d,`
     LEFT JOIN pg_catalog.pg_index i ON i.indexrelid = c.oid
     LEFT JOIN pg_catalog.pg_class c2 ON i.indrelid = c2.oid`),l(d,`
WHERE c.relkind IN (`),i&&(l(d,"'r','p',"),(a||s!=o)&&l(d,"'t',")),c&&l(d,"'v',"),N&&l(d,"'m',"),e&&l(d,"'i','I',"),A&&l(
d,"'S',"),(a||s!=o)&&l(d,"'s',"),S&&l(d,"'f',"),l(d,"''"),l(d,`)
`),!a&&s==o&&l(d,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname !~ '^pg_toast'
      AND n.nspname <> 'information_schema'
`),!w(d,s,!0,!1,"n.nspname","c.relname",o,"pg_catalog.pg_table_is_visible(c.oid)",o,3)||(l(d,"ORDER BY 1,2;"),D=await C(
d.data),!D)?!1:(B(D)==0&&!E.quiet?s!=o?p!=1?H('Did not find any relations named "%s".',s):i?H('Did not find any tables n\
amed "%s".',s):e?H('Did not find any indexes named "%s".',s):c?H('Did not find any views named "%s".',s):N?H('Did not fi\
nd any materialized views named "%s".',s):A?H('Did not find any sequences named "%s".',s):S?H('Did not find any foreign \
tables named "%s".',s):yn('Did not find any ??? named "%s".',s):p!=1?H("Did not find any relations."):i?H("Did not find \
any tables."):e?H("Did not find any indexes."):c?H("Did not find any views."):N?H("Did not find any materialized views."):
A?H("Did not find any sequences."):S?H("Did not find any foreign tables."):yn("Did not find any ??? relations."):(m.title=
p!=1?"List of relations":i?"List of tables":e?"List of indexes":c?"List of views":N?"List of materialized views":A?"List\
 of sequences":S?"List of foreign tables":"List of ???",m.translate_header=!0,m.translate_columns=h,m.n_translate_columns=
ne(h),Y(D,m,E.queryFout,!1,E.logfile)),!0)}async function Ba(t,s,n){let a=K(t,"t")!=o,i=K(t,"i")!=o,e=K(t,"n")!=o,c={},N={},
A,S=q(E.popt),p=[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1],d,D=!1;if(E.sversion<1e5){let m="";return H("The server (version %s) doe\
s not support declarative table partitioning.",Ce(E.sversion,!1,m,Ue(m))),!0}return!a&&!i&&(a=i=!0),i&&!a?d="List of par\
titioned indexes":a&&!i?d="List of partitioned tables":(d="List of partitioned relations",D=!0),P(c),f(c,`/* %s */
`,"Get matching partitioned relations"),T(c,`SELECT n.nspname as "%s",
  c.relname as "%s",
  pg_catalog.pg_get_userbyid(c.relowner) as "%s"`,"Schema","Name","Owner"),D&&(T(c,`,
  CASE c.relkind WHEN 'p' THEN '%s' WHEN 'I' THEN '%s' END as "%s"`,"partitioned table","partitioned index","Type"),p[3]=
!0),(e||s!=o)&&T(c,`,
  inh.inhparent::pg_catalog.regclass as "%s"`,"Parent name"),i&&T(c,`,
 c2.oid::pg_catalog.regclass as "%s"`,"Table"),n&&(T(c,`,
  am.amname as "%s"`,"Access method"),e&&T(c,`,
  s.dps as "%s"`,"Leaf partition size"),T(c,`,
  s.tps as "%s"`,"Total size"),T(c,`,
  pg_catalog.obj_description(c.oid, 'pg_class') as "%s"`,"Description")),l(c,`
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace`),i&&l(c,`
     LEFT JOIN pg_catalog.pg_index i ON i.indexrelid = c.oid
     LEFT JOIN pg_catalog.pg_class c2 ON i.indrelid = c2.oid`),(e||s!=o)&&l(c,`
     LEFT JOIN pg_catalog.pg_inherits inh ON c.oid = inh.inhrelid`),n&&(l(c,`
     LEFT JOIN pg_catalog.pg_am am ON c.relam = am.oid`),E.sversion<12e4?l(c,`,
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
               FROM d) s`):l(c,`,
     LATERAL (SELECT pg_catalog.pg_size_pretty(sum(
                 CASE WHEN ppt.isleaf AND ppt.level = 1
                      THEN pg_catalog.pg_table_size(ppt.relid) ELSE 0 END)) AS dps,
                     pg_catalog.pg_size_pretty(sum(pg_catalog.pg_table_size(ppt.relid))) AS tps
              FROM pg_catalog.pg_partition_tree(c.oid) ppt) s`)),l(c,`
WHERE c.relkind IN (`),a&&l(c,"'p',"),i&&l(c,"'I',"),l(c,"''"),l(c,`)
`),l(c,!e&&s==o?` AND NOT c.relispartition
`:""),s==o&&l(c,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname !~ '^pg_toast'
      AND n.nspname <> 'information_schema'
`),!w(c,s,!0,!1,"n.nspname","c.relname",o,"pg_catalog.pg_table_is_visible(c.oid)",o,3)||(T(c,'ORDER BY "Schema", %s%s"Na\
me";',D?'"Type" DESC, ':"",e||s!=o?'"Parent name" NULLS FIRST, ':""),A=await C(c.data),!A)?!1:(P(N),l(N,d),S.title=N.data,
S.translate_header=!0,S.translate_columns=p,S.n_translate_columns=ne(p),Y(A,S,E.queryFout,!1,E.logfile),!0)}async function Ya(t,s,n){
let a={},i,e=q(E.popt);return P(a),f(a,`/* %s */
`,"Get matching procedural languages"),T(a,`SELECT l.lanname AS "%s",
       pg_catalog.pg_get_userbyid(l.lanowner) as "%s",
       l.lanpltrusted AS "%s"`,"Name","Owner","Trusted"),s&&(T(a,`,
       NOT l.lanispl AS "%s",
       l.lanplcallfoid::pg_catalog.regprocedure AS "%s",
       l.lanvalidator::pg_catalog.regprocedure AS "%s",
       l.laninline::pg_catalog.regprocedure AS "%s",
       `,"Internal language","Call handler","Validator","Inline handler"),Ae(a,"l.lanacl")),T(a,`,
       d.description AS "%s"
FROM pg_catalog.pg_language l
LEFT JOIN pg_catalog.pg_description d
  ON d.classoid = l.tableoid AND d.objoid = l.oid
  AND d.objsubid = 0
`,"Description"),t!=o&&!w(a,t,!1,!1,o,"l.lanname",o,o,o,2)||(!n&&t==o&&l(a,`WHERE l.lanplcallfoid != 0
`),l(a,"ORDER BY 1;"),i=await C(a.data),!i)?!1:(e.title="List of languages",e.translate_header=!0,Y(i,e,E.queryFout,!1,E.
logfile),!0)}async function qa(t,s,n){let a={},i,e=q(E.popt);return P(a),f(a,`/* %s */
`,"Get matching domains"),T(a,`SELECT n.nspname as "%s",
       t.typname as "%s",
       pg_catalog.format_type(t.typbasetype, t.typtypmod) as "%s",
       (SELECT c.collname FROM pg_catalog.pg_collation c, pg_catalog.pg_type bt
        WHERE c.oid = t.typcollation AND bt.oid = t.typbasetype AND t.typcollation <> bt.typcollation) as "%s",
       CASE WHEN t.typnotnull THEN 'not null' END as "%s",
       t.typdefault as "%s",
       pg_catalog.array_to_string(ARRAY(
         SELECT pg_catalog.pg_get_constraintdef(r.oid, true) FROM pg_catalog.pg_constraint r WHERE t.oid = r.contypid AN\
D r.contype = 'c' ORDER BY r.conname
       ), ' ') as "%s"`,"Schema","Name","Type","Collation","Nullable","Default","Check"),s&&(l(a,`,
  `),Ae(a,"t.typacl"),T(a,`,
       d.description as "%s"`,"Description")),l(a,`
FROM pg_catalog.pg_type t
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
`),s&&l(a,`     LEFT JOIN pg_catalog.pg_description d ON d.classoid = t.tableoid AND d.objoid = t.oid AND d.objsubid = 0\

`),l(a,`WHERE t.typtype = 'd'
`),!n&&t==o&&l(a,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!w(a,t,!0,!1,"n.nspname","t.typname",o,"pg_catalog.pg_type_is_visible(t.oid)",o,3)||(l(a,"ORDER BY 1, 2;"),i=await C(
a.data),!i)?!1:(e.title="List of domains",e.translate_header=!0,Y(i,e,E.queryFout,!1,E.logfile),!0)}async function ka(t,s,n){
let a={},i,e=q(E.popt),c=[!1,!1,!1,!1,!0,!1];return P(a),f(a,`/* %s */
`,"Get matching conversions"),T(a,`SELECT n.nspname AS "%s",
       c.conname AS "%s",
       pg_catalog.pg_encoding_to_char(c.conforencoding) AS "%s",
       pg_catalog.pg_encoding_to_char(c.contoencoding) AS "%s",
       CASE WHEN c.condefault THEN '%s'
       ELSE '%s' END AS "%s"`,"Schema","Name","Source","Destination","yes","no","Default?"),s&&T(a,`,
       d.description AS "%s"`,"Description"),l(a,`
FROM pg_catalog.pg_conversion c
     JOIN pg_catalog.pg_namespace n ON n.oid = c.connamespace
`),s&&l(a,`LEFT JOIN pg_catalog.pg_description d ON d.classoid = c.tableoid
          AND d.objoid = c.oid AND d.objsubid = 0
`),l(a,`WHERE true
`),!n&&t==o&&l(a,`  AND n.nspname <> 'pg_catalog'
  AND n.nspname <> 'information_schema'
`),!w(a,t,!0,!1,"n.nspname","c.conname",o,"pg_catalog.pg_conversion_is_visible(c.oid)",o,3)||(l(a,"ORDER BY 1, 2;"),i=await C(
a.data),!i)?!1:(e.title="List of conversions",e.translate_header=!0,e.translate_columns=c,e.n_translate_columns=ne(c),Y(
i,e,E.queryFout,!1,E.logfile),!0)}async function Va(t,s,n){let a={},i,e=q(E.popt);return P(a),f(a,`/* %s */
`,"Get matching configuration parameters"),T(a,'SELECT s.name AS "%s", pg_catalog.current_setting(s.name) AS "%s"',"Para\
meter","Value"),s&&(T(a,', s.vartype AS "%s", s.context AS "%s", ',"Type","Context"),E.sversion>=15e4?Ae(a,"p.paracl"):T(
a,'NULL AS "%s"',"Access privileges")),l(a,`
FROM pg_catalog.pg_settings s
`),s&&E.sversion>=15e4&&l(a,`  LEFT JOIN pg_catalog.pg_parameter_acl p
  ON pg_catalog.lower(s.name) = p.parname
`),t!=o?Vn(E.db,a,t,!1,!1,o,"pg_catalog.lower(s.name)",o,o,o,o):l(a,`WHERE s.source <> 'default' AND
      s.setting IS DISTINCT FROM s.boot_val
`),l(a,"ORDER BY 1;"),i=await C(a.data),i?(t!=o?e.title="List of configuration parameters":e.title="List of non-default \
configuration parameters",e.translate_header=!0,Y(i,e,E.queryFout,!1,E.logfile),!0):!1}async function Xa(t,s){let n={},a,
i=q(E.popt),e=[!1,!1,!1,!0,!1,!1,!1];if(E.sversion<90300){let c="";return H("The server (version %s) does not support ev\
ent triggers.",Ce(E.sversion,!1,c,Ue(c))),!0}return P(n),f(n,`/* %s */
`,"Get matching event triggers"),T(n,`SELECT evtname as "%s", evtevent as "%s", pg_catalog.pg_get_userbyid(e.evtowner) a\
s "%s",
 case evtenabled when 'O' then '%s'  when 'R' then '%s'  when 'A' then '%s'  when 'D' then '%s' end as "%s",
 e.evtfoid::pg_catalog.regproc as "%s", pg_catalog.array_to_string(array(select x from pg_catalog.unnest(evttags) as t(x\
)), ', ') as "%s"`,"Name","Event","Owner","enabled","replica","always","disabled","Enabled","Function","Tags"),s&&T(n,`,\

pg_catalog.obj_description(e.oid, 'pg_event_trigger') as "%s"`,"Description"),l(n,`
FROM pg_catalog.pg_event_trigger e `),!w(n,t,!1,!1,o,"evtname",o,o,o,1)||(l(n,"ORDER BY 1"),a=await C(n.data),!a)?!1:(i.
title="List of event triggers",i.translate_header=!0,i.translate_columns=e,i.n_translate_columns=ne(e),Y(a,i,E.queryFout,
!1,E.logfile),!0)}async function ja(t,s){let n={},a,i=q(E.popt);if(E.sversion<1e5){let e="";return H("The server (versio\
n %s) does not support extended statistics.",Ce(E.sversion,!1,e,Ue(e))),!0}return P(n),f(n,`/* %s */
`,"Get matching extended statistics"),T(n,`SELECT 
es.stxnamespace::pg_catalog.regnamespace::pg_catalog.text AS "%s", 
es.stxname AS "%s", 
`,"Schema","Name"),E.sversion>=14e4?T(n,`pg_catalog.format('%%s FROM %%s', 
  pg_catalog.pg_get_statisticsobjdef_columns(es.oid), 
  es.stxrelid::pg_catalog.regclass) AS "%s"`,"Definition"):T(n,`pg_catalog.format('%%s FROM %%s', 
  (SELECT pg_catalog.string_agg(pg_catalog.quote_ident(a.attname),', ') 
   FROM pg_catalog.unnest(es.stxkeys) s(attnum) 
   JOIN pg_catalog.pg_attribute a 
   ON (es.stxrelid = a.attrelid 
   AND a.attnum = s.attnum 
   AND NOT a.attisdropped)), 
es.stxrelid::pg_catalog.regclass) AS "%s"`,"Definition"),T(n,`,
CASE WHEN 'd' = any(es.stxkind) THEN 'defined' 
END AS "%s", 
CASE WHEN 'f' = any(es.stxkind) THEN 'defined' 
END AS "%s"`,"Ndistinct","Dependencies"),E.sversion>=12e4&&T(n,`,
CASE WHEN 'm' = any(es.stxkind) THEN 'defined' 
END AS "%s" `,"MCV"),s&&T(n,`, 
pg_catalog.obj_description(oid, 'pg_statistic_ext') AS "%s"
`,"Description"),l(n,` 
FROM pg_catalog.pg_statistic_ext es 
`),!w(n,t,!1,!1,"es.stxnamespace::pg_catalog.regnamespace::pg_catalog.text","es.stxname",o,"pg_catalog.pg_statistics_obj\
_is_visible(es.oid)",o,3)||(l(n,"ORDER BY 1, 2;"),a=await C(n.data),!a)?!1:(i.title="List of extended statistics",i.translate_header=
!0,Y(a,i,E.queryFout,!1,E.logfile),!0)}async function Ja(t,s){let n={},a,i=q(E.popt),e=[!1,!1,!1,!0,!0,!1];return P(n),f(
n,`/* %s */
`,"Get matching casts"),T(n,`SELECT pg_catalog.format_type(castsource, NULL) AS "%s",
       pg_catalog.format_type(casttarget, NULL) AS "%s",
`,"Source type","Target type"),T(n,`       CASE WHEN c.castmethod = '%c' THEN '(binary coercible)'
            WHEN c.castmethod = '%c' THEN '(with inout)'
            ELSE p.proname
       END AS "%s",
`,Ht,Mt,"Function"),T(n,`       CASE WHEN c.castcontext = '%c' THEN '%s'
            WHEN c.castcontext = '%c' THEN '%s'
            ELSE '%s'
       END AS "%s"`,wt,"no",yt,"in assignment","yes","Implicit?"),s&&T(n,`,
       CASE WHEN p.proleakproof THEN '%s'
            ELSE '%s'
       END AS "%s",
       d.description AS "%s"`,"yes","no","Leakproof?","Description"),l(n,`
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
`),s&&l(n,`     LEFT JOIN pg_catalog.pg_description d
     ON d.classoid = c.tableoid AND d.objoid = c.oid AND d.objsubid = 0
`),l(n,"WHERE ( (true"),!w(n,t,!0,!1,"ns.nspname","ts.typname","pg_catalog.format_type(ts.oid, NULL)","pg_catalog.pg_typ\
e_is_visible(ts.oid)",o,3)||(l(n,") OR (true"),!w(n,t,!0,!1,"nt.nspname","tt.typname","pg_catalog.format_type(tt.oid, NU\
LL)","pg_catalog.pg_type_is_visible(tt.oid)",o,3))||(l(n,`) )
ORDER BY 1, 2;`),a=await C(n.data),!a)?!1:(i.title="List of casts",i.translate_header=!0,i.translate_columns=e,i.n_translate_columns=
ne(e),Y(a,i,E.queryFout,!1,E.logfile),!0)}async function Ka(t,s,n){let a={},i,e=q(E.popt),c=[!1,!1,!1,!1,!1,!1,!1,!0,!1];
return P(a),f(a,`/* %s */
`,"Get matching collations"),T(a,`SELECT
  n.nspname AS "%s",
  c.collname AS "%s",
`,"Schema","Name"),E.sversion>=1e5?T(a,`  CASE c.collprovider WHEN 'd' THEN 'default' WHEN 'b' THEN 'builtin' WHEN 'c' T\
HEN 'libc' WHEN 'i' THEN 'icu' END AS "%s",
`,"Provider"):T(a,`  'libc' AS "%s",
`,"Provider"),T(a,`  c.collcollate AS "%s",
  c.collctype AS "%s",
`,"Collate","Ctype"),E.sversion>=17e4?T(a,`  c.colllocale AS "%s",
`,"Locale"):E.sversion>=15e4?T(a,`  c.colliculocale AS "%s",
`,"Locale"):T(a,`  c.collcollate AS "%s",
`,"Locale"),E.sversion>=16e4?T(a,`  c.collicurules AS "%s",
`,"ICU Rules"):T(a,`  NULL AS "%s",
`,"ICU Rules"),E.sversion>=12e4?T(a,`  CASE WHEN c.collisdeterministic THEN '%s' ELSE '%s' END AS "%s"`,"yes","no","Dete\
rministic?"):T(a,`  '%s' AS "%s"`,"yes","Deterministic?"),s&&T(a,`,
  pg_catalog.obj_description(c.oid, 'pg_collation') AS "%s"`,"Description"),l(a,`
FROM pg_catalog.pg_collation c, pg_catalog.pg_namespace n
WHERE n.oid = c.collnamespace
`),!n&&t==o&&l(a,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),l(a,`      AND c.collencoding IN (-1, pg_catalog.pg_char_to_encoding(pg_catalog.getdatabaseencoding()))
`),!w(a,t,!0,!1,"n.nspname","c.collname",o,"pg_catalog.pg_collation_is_visible(c.oid)",o,3)||(l(a,"ORDER BY 1, 2;"),i=await C(
a.data),!i)?!1:(e.title="List of collations",e.translate_header=!0,e.translate_columns=c,e.n_translate_columns=ne(c),Y(i,
e,E.queryFout,!1,E.logfile),!0)}async function za(t,s,n){let a={},i,e=q(E.popt),c=0,N=o;if(P(a),f(a,`/* %s */
`,"Get matching schemas"),T(a,`SELECT n.nspname AS "%s",
  pg_catalog.pg_get_userbyid(n.nspowner) AS "%s"`,"Name","Owner"),s&&(l(a,`,
  `),Ae(a,"n.nspacl"),T(a,`,
  pg_catalog.obj_description(n.oid, 'pg_namespace') AS "%s"`,"Description")),l(a,`
FROM pg_catalog.pg_namespace n
`),!n&&t==o&&l(a,`WHERE n.nspname !~ '^pg_' AND n.nspname <> 'information_schema'
`),!w(a,t,!n&&t==o,!1,o,"n.nspname",o,o,o,2)||(l(a,"ORDER BY 1;"),i=await C(a.data),!i))return!1;if(e.title="List of sch\
emas",e.translate_header=!0,t!=o&&E.sversion>=15e4){let A,S;if(f(a,`/* %s */
`,"Get publications that publish this schema"),T(a,`SELECT pubname 
FROM pg_catalog.pg_publication p
     JOIN pg_catalog.pg_publication_namespace pn ON p.oid = pn.pnpubid
     JOIN pg_catalog.pg_namespace n ON n.oid = pn.pnnspid 
WHERE n.nspname = '%s'
ORDER BY 1`,t),A=await C(a.data),A)c=B(A);else return!1;if(c>0){for(N=[],N[0]="Included in publications:",S=0;S<c;S++)f(
a,'    "%s"',_(A,S,0)),N[S+1]=a.data;N[S+1]=o,e.footers=N}}return Y(i,e,E.queryFout,!1,E.logfile),!0}async function Qa(t,s){
let n={},a,i=q(E.popt);return s?await $a(t):(P(n),f(n,`/* %s */
`,"Get matching text search parsers"),T(n,`SELECT
  n.nspname as "%s",
  p.prsname as "%s",
  pg_catalog.obj_description(p.oid, 'pg_ts_parser') as "%s"
FROM pg_catalog.pg_ts_parser p
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.prsnamespace
`,"Schema","Name","Description"),!w(n,t,!1,!1,"n.nspname","p.prsname",o,"pg_catalog.pg_ts_parser_is_visible(p.oid)",o,3)||
(l(n,"ORDER BY 1, 2;"),a=await C(n.data),!a)?!1:(i.title="List of text search parsers",i.translate_header=!0,Y(a,i,E.queryFout,
!1,E.logfile),!0))}async function $a(t){let s={},n,a;if(P(s),f(s,`/* %s */
`,"Get matching text search parsers"),l(s,`SELECT p.oid,
  n.nspname,
  p.prsname
FROM pg_catalog.pg_ts_parser p
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.prsnamespace
`),!w(s,t,!1,!1,"n.nspname","p.prsname",o,"pg_catalog.pg_ts_parser_is_visible(p.oid)",o,3)||(l(s,"ORDER BY 1, 2;"),n=await C(
s.data),!n))return!1;if(B(n)==0)return E.quiet||(t!=o?H('Did not find any text search parser named "%s".',t):H("Did not \
find any text search parsers.")),!1;for(a=0;a<B(n);a++){let i,e=o,c;if(i=_(n,a,0),oe(n,a,1)||(e=_(n,a,1)),c=_(n,a,2),!await Za(
i,e,c)||J)return!1}return!0}async function Za(t,s,n){let a={},i,e={},c=q(E.popt),N=[!0,!1,!1];return P(a),f(a,`/* %s */
`,"Get text search parser details"),T(a,`SELECT '%s' AS "%s",
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
 WHERE p.oid = '%s';`,"Start parse","Method","Function","Description",t,"Get next token",t,"End parse",t,"Get headline",
t,"Get token types",t),i=await C(a.data),!i||(P(e),s!=o?f(e,'Text search parser "%s.%s"',s,n):f(e,'Text search parser "%\
s"',n),c.title=e.data,c.footers=o,c.topt.default_footer=!1,c.translate_header=!0,c.translate_columns=N,c.n_translate_columns=
ne(N),Y(i,c,E.queryFout,!1,E.logfile),P(a),f(a,`/* %s */
`,"Get text search parser token types"),T(a,`SELECT t.alias as "%s",
  t.description as "%s"
FROM pg_catalog.ts_token_type( '%s'::pg_catalog.oid ) as t
ORDER BY 1;`,"Token name","Description",t),i=await C(a.data),!i)?!1:(s!=o?f(e,'Token types for parser "%s.%s"',s,n):f(e,
'Token types for parser "%s"',n),c.title=e.data,c.footers=o,c.topt.default_footer=!0,c.translate_header=!0,c.translate_columns=
o,c.n_translate_columns=0,Y(i,c,E.queryFout,!1,E.logfile),!0)}async function et(t,s){let n={},a,i=q(E.popt);return P(n),
f(n,`/* %s */
`,"Get matching text search dictionaries"),T(n,`SELECT
  n.nspname as "%s",
  d.dictname as "%s",
`,"Schema","Name"),s&&T(n,`  ( SELECT COALESCE(nt.nspname, '(null)')::pg_catalog.text || '.' || t.tmplname FROM
    pg_catalog.pg_ts_template t
    LEFT JOIN pg_catalog.pg_namespace nt ON nt.oid = t.tmplnamespace
    WHERE d.dicttemplate = t.oid ) AS  "%s",
  d.dictinitoption as "%s",
`,"Template","Init options"),T(n,`  pg_catalog.obj_description(d.oid, 'pg_ts_dict') as "%s"
`,"Description"),l(n,`FROM pg_catalog.pg_ts_dict d
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = d.dictnamespace
`),!w(n,t,!1,!1,"n.nspname","d.dictname",o,"pg_catalog.pg_ts_dict_is_visible(d.oid)",o,3)||(l(n,"ORDER BY 1, 2;"),a=await C(
n.data),!a)?!1:(i.title="List of text search dictionaries",i.translate_header=!0,Y(a,i,E.queryFout,!1,E.logfile),!0)}async function nt(t,s){
let n={},a,i=q(E.popt);return P(n),f(n,`/* %s */
`,"Get matching text search templates"),s?T(n,`SELECT
  n.nspname AS "%s",
  t.tmplname AS "%s",
  t.tmplinit::pg_catalog.regproc AS "%s",
  t.tmpllexize::pg_catalog.regproc AS "%s",
  pg_catalog.obj_description(t.oid, 'pg_ts_template') AS "%s"
`,"Schema","Name","Init","Lexize","Description"):T(n,`SELECT
  n.nspname AS "%s",
  t.tmplname AS "%s",
  pg_catalog.obj_description(t.oid, 'pg_ts_template') AS "%s"
`,"Schema","Name","Description"),l(n,`FROM pg_catalog.pg_ts_template t
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.tmplnamespace
`),!w(n,t,!1,!1,"n.nspname","t.tmplname",o,"pg_catalog.pg_ts_template_is_visible(t.oid)",o,3)||(l(n,"ORDER BY 1, 2;"),a=
await C(n.data),!a)?!1:(i.title="List of text search templates",i.translate_header=!0,Y(a,i,E.queryFout,!1,E.logfile),!0)}
async function at(t,s){let n={},a,i=q(E.popt);return s?await tt(t):(P(n),f(n,`/* %s */
`,"Get matching text search configurations"),T(n,`SELECT
   n.nspname as "%s",
   c.cfgname as "%s",
   pg_catalog.obj_description(c.oid, 'pg_ts_config') as "%s"
FROM pg_catalog.pg_ts_config c
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.cfgnamespace
`,"Schema","Name","Description"),!w(n,t,!1,!1,"n.nspname","c.cfgname",o,"pg_catalog.pg_ts_config_is_visible(c.oid)",o,3)||
(l(n,"ORDER BY 1, 2;"),a=await C(n.data),!a)?!1:(i.title="List of text search configurations",i.translate_header=!0,Y(a,
i,E.queryFout,!1,E.logfile),!0))}async function tt(t){let s={},n,a;if(P(s),f(s,`/* %s */
`,"Get matching text search configurations"),l(s,`SELECT c.oid, c.cfgname,
   n.nspname,
   p.prsname,
   np.nspname as pnspname
FROM pg_catalog.pg_ts_config c
   LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.cfgnamespace,
 pg_catalog.pg_ts_parser p
   LEFT JOIN pg_catalog.pg_namespace np ON np.oid = p.prsnamespace
WHERE  p.oid = c.cfgparser
`),!w(s,t,!0,!1,"n.nspname","c.cfgname",o,"pg_catalog.pg_ts_config_is_visible(c.oid)",o,3)||(l(s,"ORDER BY 3, 2;"),n=await C(
s.data),!n))return!1;if(B(n)==0)return E.quiet||(t!=o?H('Did not find any text search configuration named "%s".',t):H("D\
id not find any text search configurations.")),!1;for(a=0;a<B(n);a++){let i,e,c=o,N,A=o;if(i=_(n,a,0),e=_(n,a,1),oe(n,a,
2)||(c=_(n,a,2)),N=_(n,a,3),oe(n,a,4)||(A=_(n,a,4)),!await st(i,c,e,A,N)||J)return!1}return!0}async function st(t,s,n,a,i){
let e={},c={},N,A=q(E.popt);return P(e),f(e,`/* %s */
`,"Get text search configuration details"),T(e,`SELECT
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
ORDER BY 1;`,"Token","Dictionaries",t),N=await C(e.data),N?(P(c),s!=o?T(c,'Text search configuration "%s.%s"',s,n):T(c,'\
Text search configuration "%s"',n),a!=o?T(c,`
Parser: "%s.%s"`,a,i):T(c,`
Parser: "%s"`,i),A.title=c.data,A.footers=o,A.topt.default_footer=!1,A.translate_header=!0,Y(N,A,E.queryFout,!1,E.logfile),
!0):!1}async function it(t,s){let n={},a,i=q(E.popt);return P(n),f(n,`/* %s */
`,"Get matching foreign-data wrappers"),T(n,`SELECT fdw.fdwname AS "%s",
  pg_catalog.pg_get_userbyid(fdw.fdwowner) AS "%s",
  fdw.fdwhandler::pg_catalog.regproc AS "%s",
  fdw.fdwvalidator::pg_catalog.regproc AS "%s"`,"Name","Owner","Handler","Validator"),s&&(l(n,`,
  `),Ae(n,"fdwacl"),T(n,`,
 CASE WHEN fdwoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(opt\
ion_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(fdwoptions)),  ', '\
) || ')'   END AS "%s",
  d.description AS "%s" `,"FDW options","Description")),l(n,`
FROM pg_catalog.pg_foreign_data_wrapper fdw
`),s&&l(n,`LEFT JOIN pg_catalog.pg_description d
       ON d.classoid = fdw.tableoid AND d.objoid = fdw.oid AND d.objsubid = 0
`),!w(n,t,!1,!1,o,"fdwname",o,o,o,1)||(l(n,"ORDER BY 1;"),a=await C(n.data),!a)?!1:(i.title="List of foreign-data wrappe\
rs",i.translate_header=!0,Y(a,i,E.queryFout,!1,E.logfile),!0)}async function ot(t,s){let n={},a,i=q(E.popt);return P(n),
f(n,`/* %s */
`,"Get matching foreign servers"),T(n,`SELECT s.srvname AS "%s",
  pg_catalog.pg_get_userbyid(s.srvowner) AS "%s",
  f.fdwname AS "%s"`,"Name","Owner","Foreign-data wrapper"),s&&(l(n,`,
  `),Ae(n,"s.srvacl"),T(n,`,
  s.srvtype AS "%s",
  s.srvversion AS "%s",
  CASE WHEN srvoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(op\
tion_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(srvoptions)),  ', \
') || ')'   END AS "%s",
  d.description AS "%s"`,"Type","Version","FDW options","Description")),l(n,`
FROM pg_catalog.pg_foreign_server s
     JOIN pg_catalog.pg_foreign_data_wrapper f ON f.oid=s.srvfdw
`),s&&l(n,`LEFT JOIN pg_catalog.pg_description d
       ON d.classoid = s.tableoid AND d.objoid = s.oid AND d.objsubid = 0
`),!w(n,t,!1,!1,o,"s.srvname",o,o,o,1)||(l(n,"ORDER BY 1;"),a=await C(n.data),!a)?!1:(i.title="List of foreign servers",
i.translate_header=!0,Y(a,i,E.queryFout,!1,E.logfile),!0)}async function rt(t,s){let n={},a,i=q(E.popt);return P(n),f(n,
`/* %s */
`,"Get matching user mappings"),T(n,`SELECT um.srvname AS "%s",
  um.usename AS "%s"`,"Server","User name"),s&&T(n,`,
 CASE WHEN umoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(opti\
on_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(umoptions)),  ', ') \
|| ')'   END AS "%s"`,"FDW options"),l(n,`
FROM pg_catalog.pg_user_mappings um
`),!w(n,t,!1,!1,o,"um.srvname","um.usename",o,o,1)||(l(n,"ORDER BY 1, 2;"),a=await C(n.data),!a)?!1:(i.title="List of us\
er mappings",i.translate_header=!0,Y(a,i,E.queryFout,!1,E.logfile),!0)}async function lt(t,s){let n={},a,i=q(E.popt);return P(
n),f(n,`/* %s */
`,"Get matching foreign tables"),T(n,`SELECT n.nspname AS "%s",
  c.relname AS "%s",
  s.srvname AS "%s"`,"Schema","Table","Server"),s&&T(n,`,
 CASE WHEN ftoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(opti\
on_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(ftoptions)),  ', ') \
|| ')'   END AS "%s",
  d.description AS "%s"`,"FDW options","Description"),l(n,`
FROM pg_catalog.pg_foreign_table ft
  INNER JOIN pg_catalog.pg_class c ON c.oid = ft.ftrelid
  INNER JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
  INNER JOIN pg_catalog.pg_foreign_server s ON s.oid = ft.ftserver
`),s&&l(n,`   LEFT JOIN pg_catalog.pg_description d
          ON d.classoid = c.tableoid AND d.objoid = c.oid AND d.objsubid = 0
`),!w(n,t,!1,!1,"n.nspname","c.relname",o,"pg_catalog.pg_table_is_visible(c.oid)",o,3)||(l(n,"ORDER BY 1, 2;"),a=await C(
n.data),!a)?!1:(i.title="List of foreign tables",i.translate_header=!0,Y(a,i,E.queryFout,!1,E.logfile),!0)}async function Et(t){
let s={},n,a=q(E.popt);return P(s),f(s,`/* %s */
`,"Get matching installed extensions"),T(s,`SELECT e.extname AS "%s", e.extversion AS "%s", ae.default_version AS "%s",n\
.nspname AS "%s", d.description AS "%s"
FROM pg_catalog.pg_extension e LEFT JOIN pg_catalog.pg_namespace n ON n.oid = e.extnamespace LEFT JOIN pg_catalog.pg_des\
cription d ON d.objoid = e.oid AND d.classoid = 'pg_catalog.pg_extension'::pg_catalog.regclass LEFT JOIN pg_catalog.pg_a\
vailable_extensions() ae(name, default_version, comment) ON ae.name = e.extname
`,"Name","Version","Default version","Schema","Description"),!w(s,t,!1,!1,o,"e.extname",o,o,o,1)||(l(s,"ORDER BY 1;"),n=
await C(s.data),!n)?!1:(a.title="List of installed extensions",a.translate_header=!0,Y(n,a,E.queryFout,!1,E.logfile),!0)}
async function ct(t){let s={},n,a;if(P(s),f(s,`/* %s */
`,"Get matching installed extensions"),l(s,`SELECT e.extname, e.oid
FROM pg_catalog.pg_extension e
`),!w(s,t,!1,!1,o,"e.extname",o,o,o,1)||(l(s,"ORDER BY 1;"),n=await C(s.data),!n))return!1;if(B(n)==0)return E.quiet||(t!=
o?H('Did not find any extension named "%s".',t):H("Did not find any extensions.")),!1;for(a=0;a<B(n);a++){let i,e;if(i=_(
n,a,0),e=_(n,a,1),!await pt(i,e)||J)return!1}return!0}async function pt(t,s){let n={},a,i={},e=q(E.popt);return P(n),f(n,
`/* %s */
`,"Get installed extension's contents"),T(n,`SELECT pg_catalog.pg_describe_object(classid, objid, 0) AS "%s"
FROM pg_catalog.pg_depend
WHERE refclassid = 'pg_catalog.pg_extension'::pg_catalog.regclass AND refobjid = '%s' AND deptype = 'e'
ORDER BY 1;`,"Object description",s),a=await C(n.data),a?(P(i),f(i,'Objects in extension "%s"',t),e.title=i.data,e.translate_header=
!0,Y(a,e,E.queryFout,!1,E.logfile),!0):!1}function w(t,s,n,a,i,e,c,N,A,S){let p={},d={},D;if(P(p),D=Vn(E.db,t,s,n,a,i,e,
c,N,p,d),A!=o&&(A.value=D),d.value>=S)return H("improper qualified name (too many dotted names): %s",s),!1;if(S>1&&d.value==
S-1){if(ea(E.db)==o)return H("You are currently not connected to a database."),!1;if(u(ea(E.db),p.data)!=0)return H("cro\
ss-database references are not implemented: %s",s),!1}return!0}async function Tt(t){let s={},n,a=q(E.popt),i=[!1,!1,!1,!1,
!1,!1,!1,!1,!1,!1];if(E.sversion<1e5){let e="";return H("The server (version %s) does not support publications.",Ce(E.sversion,
!1,e,Ue(e))),!0}return P(s),f(s,`/* %s */
`,"Get matching publications"),T(s,`SELECT pubname AS "%s",
  pg_catalog.pg_get_userbyid(pubowner) AS "%s",
  puballtables AS "%s"`,"Name","Owner","All tables"),E.sversion>=19e4&&T(s,`,
  puballsequences AS "%s"`,"All sequences"),T(s,`,
  pubinsert AS "%s",
  pubupdate AS "%s",
  pubdelete AS "%s"`,"Inserts","Updates","Deletes"),E.sversion>=11e4&&T(s,`,
  pubtruncate AS "%s"`,"Truncates"),E.sversion>=18e4&&T(s,`,
 (CASE pubgencols
    WHEN '%c' THEN 'none'
    WHEN '%c' THEN 'stored'
   END) AS "%s"`,Kn,zn,"Generated columns"),E.sversion>=13e4&&T(s,`,
  pubviaroot AS "%s"`,"Via root"),l(s,`
FROM pg_catalog.pg_publication
`),!w(s,t,!1,!1,o,"pubname",o,o,o,1)||(l(s,"ORDER BY 1;"),n=await C(s.data),!n)?!1:(a.title="List of publications",a.translate_header=
!0,a.translate_columns=i,a.n_translate_columns=ne(i),Y(n,a,E.queryFout,!1,E.logfile),!0)}async function dn(t,s,n,a){let i,
e=0,c=0;if(i=await C(t.data),i)e=B(i);else return!1;for(e>0&&M(a,s),c=0;c<e;c++)n?f(t,'    "%s"',_(i,c,0)):(f(t,'    "%s\
.%s"',_(i,c,0),_(i,c,1)),oe(i,c,3)||T(t," (%s)",_(i,c,3)),oe(i,c,2)||T(t," WHERE %s",_(i,c,2))),M(a,t.data);return!0}async function Rt(t){
let s={},n,a,i,e,c,N,A=6,S=1,p={},d={};if(E.sversion<1e5){let D="";return H("The server (version %s) does not support pu\
blications.",Ce(E.sversion,!1,D,Ue(D))),!0}if(N=E.sversion>=19e4,i=E.sversion>=11e4,e=E.sversion>=18e4,c=E.sversion>=13e4,
P(s),f(s,`/* %s */
`,"Get details about matching publications"),l(s,`SELECT oid, pubname,
  pg_catalog.pg_get_userbyid(pubowner) AS owner,
  puballtables`),N?l(s,", puballsequences"):l(s,", false AS puballsequences"),l(s,", pubinsert, pubupdate, pubdelete"),i?
l(s,", pubtruncate"):l(s,", false AS pubtruncate"),e?T(s,`, (CASE pubgencols
    WHEN '%c' THEN 'none'
    WHEN '%c' THEN 'stored'
   END) AS "%s"
`,Kn,zn,"Generated columns"):l(s,", 'none' AS pubgencols"),c?l(s,", pubviaroot"):l(s,", false AS pubviaroot"),l(s,", pg_\
catalog.obj_description(oid, 'pg_publication')"),l(s,`
FROM pg_catalog.pg_publication
`),!w(s,t,!1,!1,o,"pubname",o,o,o,1)||(l(s,"ORDER BY 2;"),a=await C(s.data),!a))return!1;if(B(a)==0)return E.quiet||(t!=
o?H('Did not find any publication named "%s".',t):H("Did not find any publications.")),!1;for(N&&A++,i&&A++,e&&A++,c&&A++,
n=0;n<B(a);n++){let D="l",m=_(a,n,0),v=_(a,n,1),h=u(_(a,n,3),"t")==0,se=nn(E.popt.topt);if(P(p),f(p,"Publication %s",v),
an(d,se,p.data,A,S),Te(d,"Owner",!0,D),Te(d,"All tables",!0,D),N&&Te(d,"All sequences",!0,D),Te(d,"Inserts",!0,D),Te(d,"\
Updates",!0,D),Te(d,"Deletes",!0,D),i&&Te(d,"Truncates",!0,D),e&&Te(d,"Generated columns",!0,D),c&&Te(d,"Via root",!0,D),
Te(d,"Description",!0,D),Q(d,_(a,n,2),!1,!1),Q(d,_(a,n,3),!1,!1),N&&Q(d,_(a,n,4),!1,!1),Q(d,_(a,n,5),!1,!1),Q(d,_(a,n,6),
!1,!1),Q(d,_(a,n,7),!1,!1),i&&Q(d,_(a,n,8),!1,!1),e&&Q(d,_(a,n,9),!1,!1),c&&Q(d,_(a,n,10),!1,!1),Q(d,_(a,n,11),!1,!1),h){
if(E.sversion>=19e4&&(f(s,`/* %s */
`,"Get tables excluded by this publication"),T(s,`SELECT n.nspname || '.' || c.relname
FROM pg_catalog.pg_class c
     JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
     JOIN pg_catalog.pg_publication_rel pr ON c.oid = pr.prrelid
WHERE pr.prpubid = '%s' AND pr.prexcept
ORDER BY 1`,m),!await dn(s,"Except tables:",!0,d)))return!1}else if(f(s,`/* %s */
`,"Get tables published by this publication"),l(s,"SELECT n.nspname, c.relname"),E.sversion>=15e4?(l(s,", pg_catalog.pg_\
get_expr(pr.prqual, c.oid)"),l(s,`, (CASE WHEN pr.prattrs IS NOT NULL THEN
     pg_catalog.array_to_string(      ARRAY(SELECT attname
              FROM
                pg_catalog.generate_series(0, pg_catalog.array_upper(pr.prattrs::pg_catalog.int2[], 1)) s,
                pg_catalog.pg_attribute
        WHERE attrelid = c.oid AND attnum = prattrs[s]), ', ')
       ELSE NULL END)`)):l(s,", NULL, NULL"),T(s,`
FROM pg_catalog.pg_class c,
     pg_catalog.pg_namespace n,
     pg_catalog.pg_publication_rel pr
WHERE c.relnamespace = n.oid
  AND c.oid = pr.prrelid
  AND pr.prpubid = '%s'
`,m),E.sversion>=19e4&&l(s,`  AND NOT pr.prexcept
`),l(s,"ORDER BY 1,2"),!await dn(s,"Tables:",!1,d)||E.sversion>=15e4&&(f(s,`/* %s */
`,"Get schemas published by this publication"),T(s,`SELECT n.nspname
FROM pg_catalog.pg_namespace n
     JOIN pg_catalog.pg_publication_namespace pn ON n.oid = pn.pnnspid
WHERE pn.pnpubid = '%s'
ORDER BY 1`,m),!await dn(s,"Tables from schemas:",!0,d)))return!1;tn(d,E.queryFout,!1,E.logfile)}return!0}async function _t(t,s){
let n={},a,i=q(E.popt),e=[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1];if(E.sversion<1e5){let c="";return H(
"The server (version %s) does not support subscriptions.",Ce(E.sversion,!1,c,Ue(c))),!0}return P(n),f(n,`/* %s */
`,"Get matching subscriptions"),T(n,`SELECT subname AS "%s"
,  pg_catalog.pg_get_userbyid(subowner) AS "%s"
,  subenabled AS "%s"
,  subpublications AS "%s"
`,"Name","Owner","Enabled","Publication"),s&&(E.sversion>=14e4&&(T(n,`, subbinary AS "%s"
`,"Binary"),E.sversion>=16e4?T(n,`, (CASE substream
    WHEN 'f' THEN 'off'
    WHEN 't' THEN 'on'
    WHEN 'p' THEN 'parallel'
   END) AS "%s"
`,"Streaming"):T(n,`, substream AS "%s"
`,"Streaming")),E.sversion>=15e4&&T(n,`, subtwophasestate AS "%s"
, subdisableonerr AS "%s"
`,"Two-phase commit","Disable on error"),E.sversion>=16e4&&T(n,`, suborigin AS "%s"
, subpasswordrequired AS "%s"
, subrunasowner AS "%s"
`,"Origin","Password required","Run as owner?"),E.sversion>=17e4&&T(n,`, subfailover AS "%s"
`,"Failover"),E.sversion>=19e4&&(T(n,`, (select srvname from pg_catalog.pg_foreign_server where oid=subserver) AS "%s"
`,"Server"),T(n,`, subretaindeadtuples AS "%s"
`,"Retain dead tuples"),T(n,`, submaxretention AS "%s"
`,"Max retention duration"),T(n,`, subretentionactive AS "%s"
`,"Retention active")),T(n,`,  subsynccommit AS "%s"
,  subconninfo AS "%s"
`,"Synchronous commit","Conninfo"),E.sversion>=19e4&&T(n,`, subwalrcvtimeout AS "%s"
`,"Receiver timeout"),E.sversion>=15e4&&T(n,`, subskiplsn AS "%s"
`,"Skip LSN"),T(n,`,  pg_catalog.obj_description(oid, 'pg_subscription') AS "%s"
`,"Description")),l(n,`FROM pg_catalog.pg_subscription
WHERE subdbid = (SELECT oid
                 FROM pg_catalog.pg_database
                 WHERE datname = pg_catalog.current_database())`),!w(n,t,!0,!1,o,"subname",o,o,o,1)||(l(n,"ORDER BY 1;"),
a=await C(n.data),!a)?!1:(i.title="List of subscriptions",i.translate_header=!0,i.translate_columns=e,i.n_translate_columns=
ne(e),Y(a,i,E.queryFout,!1,E.logfile),!0)}function Ae(t,s){T(t,`CASE WHEN pg_catalog.array_length(%s, 1) = 0 THEN '%s' E\
LSE pg_catalog.array_to_string(%s, E'\\n') END AS "%s"`,s,"(none)",s,"Access privileges")}async function At(t,s,n){let a={},
i,e=q(E.popt),c={value:!1},N=[!1,!1,!1,!1,!1,!1,!1];return P(a),f(a,`/* %s */
`,"Get matching operator classes"),T(a,`SELECT
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
  END) AS "%s"`,"AM","Input type","Storage type","Operator class","yes","no","Default?"),n&&T(a,`,
  CASE
    WHEN pg_catalog.pg_opfamily_is_visible(of.oid)
    THEN pg_catalog.format('%%I', of.opfname)
    ELSE pg_catalog.format('%%I.%%I', ofn.nspname, of.opfname)
  END AS "%s",
 pg_catalog.pg_get_userbyid(c.opcowner) AS "%s"
`,"Operator family","Owner"),l(a,`
FROM pg_catalog.pg_opclass c
  LEFT JOIN pg_catalog.pg_am am on am.oid = c.opcmethod
  LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.opcnamespace
  LEFT JOIN pg_catalog.pg_type t ON t.oid = c.opcintype
  LEFT JOIN pg_catalog.pg_namespace tn ON tn.oid = t.typnamespace
`),n&&l(a,`  LEFT JOIN pg_catalog.pg_opfamily of ON of.oid = c.opcfamily
  LEFT JOIN pg_catalog.pg_namespace ofn ON ofn.oid = of.opfnamespace
`),t!=o&&!w(a,t,!1,!1,o,"am.amname",o,o,c,1)||s!=o&&!w(a,s,c.value,!1,"tn.nspname","t.typname","pg_catalog.format_type(t\
.oid, NULL)","pg_catalog.pg_type_is_visible(t.oid)",o,3)||(l(a,"ORDER BY 1, 2, 4;"),i=await C(a.data),!i)?!1:(e.title="L\
ist of operator classes",e.translate_header=!0,e.translate_columns=N,e.n_translate_columns=ne(N),Y(i,e,E.queryFout,!1,E.
logfile),!0)}async function gt(t,s,n){let a={},i,e=q(E.popt),c={value:!1},N=[!1,!1,!1,!1];if(P(a),f(a,`/* %s */
`,"Get matching operator families"),T(a,`SELECT
  am.amname AS "%s",
  CASE
    WHEN pg_catalog.pg_opfamily_is_visible(f.oid)
    THEN pg_catalog.format('%%I', f.opfname)
    ELSE pg_catalog.format('%%I.%%I', n.nspname, f.opfname)
  END AS "%s",
  (SELECT
     pg_catalog.string_agg(pg_catalog.format_type(oc.opcintype, NULL), ', ')
   FROM pg_catalog.pg_opclass oc
   WHERE oc.opcfamily = f.oid) "%s"`,"AM","Operator family","Applicable types"),n&&T(a,`,
  pg_catalog.pg_get_userbyid(f.opfowner) AS "%s"
`,"Owner"),l(a,`
FROM pg_catalog.pg_opfamily f
  LEFT JOIN pg_catalog.pg_am am on am.oid = f.opfmethod
  LEFT JOIN pg_catalog.pg_namespace n ON n.oid = f.opfnamespace
`),t!=o&&!w(a,t,!1,!1,o,"am.amname",o,o,c,1))return!1;if(s!=o){if(T(a,`  %s EXISTS (
    SELECT 1
    FROM pg_catalog.pg_type t
    JOIN pg_catalog.pg_opclass oc ON oc.opcintype = t.oid
    LEFT JOIN pg_catalog.pg_namespace tn ON tn.oid = t.typnamespace
    WHERE oc.opcfamily = f.oid
`,c.value?"AND":"WHERE"),!w(a,s,!0,!1,"tn.nspname","t.typname","pg_catalog.format_type(t.oid, NULL)","pg_catalog.pg_type\
_is_visible(t.oid)",o,3))return!1;l(a,`  )
`)}return l(a,"ORDER BY 1, 2;"),i=await C(a.data),i?(e.title="List of operator families",e.translate_header=!0,e.translate_columns=
N,e.n_translate_columns=ne(N),Y(i,e,E.queryFout,!1,E.logfile),!0):!1}async function Nt(t,s,n){let a={},i,e=q(E.popt),c={
value:!1},N=[!1,!1,!1,!1,!1,!1,!0];return P(a),f(a,`/* %s */
`,"Get operators of matching operator families"),T(a,`SELECT
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
`,"AM","Operator family","Operator","Strategy","ordering","search","Purpose"),n&&T(a,`, ofs.opfname AS "%s",
  CASE
    WHEN p.proleakproof THEN '%s'
    ELSE '%s'
  END AS "%s"
`,"Sort opfamily","yes","no","Leakproof?"),l(a,`FROM pg_catalog.pg_amop o
  LEFT JOIN pg_catalog.pg_opfamily of ON of.oid = o.amopfamily
  LEFT JOIN pg_catalog.pg_am am ON am.oid = of.opfmethod AND am.oid = o.amopmethod
  LEFT JOIN pg_catalog.pg_namespace nsf ON of.opfnamespace = nsf.oid
`),n&&l(a,`  LEFT JOIN pg_catalog.pg_opfamily ofs ON ofs.oid = o.amopsortfamily
  LEFT JOIN pg_catalog.pg_operator op ON op.oid = o.amopopr
  LEFT JOIN pg_catalog.pg_proc p ON p.oid = op.oprcode
`),t!=o&&!w(a,t,!1,!1,o,"am.amname",o,o,c,1)||s!=o&&!w(a,s,c.value,!1,"nsf.nspname","of.opfname",o,o,o,3)||(l(a,`ORDER B\
Y 1, 2,
  o.amoplefttype = o.amoprighttype DESC,
  pg_catalog.format_type(o.amoplefttype, NULL),
  pg_catalog.format_type(o.amoprighttype, NULL),
  o.amopstrategy;`),i=await C(a.data),!i)?!1:(e.title="List of operators of operator families",e.translate_header=!0,e.translate_columns=
N,e.n_translate_columns=ne(N),Y(i,e,E.queryFout,!1,E.logfile),!0)}async function ft(t,s,n){let a={},i,e=q(E.popt),c={value:!1},
N=[!1,!1,!1,!1,!1,!1];return P(a),f(a,`/* %s */
`,"Get support functions of matching operator families"),T(a,`SELECT
  am.amname AS "%s",
  CASE
    WHEN pg_catalog.pg_opfamily_is_visible(of.oid)
    THEN pg_catalog.format('%%I', of.opfname)
    ELSE pg_catalog.format('%%I.%%I', ns.nspname, of.opfname)
  END AS "%s",
  pg_catalog.format_type(ap.amproclefttype, NULL) AS "%s",
  pg_catalog.format_type(ap.amprocrighttype, NULL) AS "%s",
  ap.amprocnum AS "%s"
`,"AM","Operator family","Registered left type","Registered right type","Number"),n?T(a,`, ap.amproc::pg_catalog.regproc\
edure AS "%s"
`,"Function"):T(a,`, p.proname AS "%s"
`,"Function"),l(a,`FROM pg_catalog.pg_amproc ap
  LEFT JOIN pg_catalog.pg_opfamily of ON of.oid = ap.amprocfamily
  LEFT JOIN pg_catalog.pg_am am ON am.oid = of.opfmethod
  LEFT JOIN pg_catalog.pg_namespace ns ON of.opfnamespace = ns.oid
  LEFT JOIN pg_catalog.pg_proc p ON ap.amproc = p.oid
`),t!=o&&!w(a,t,!1,!1,o,"am.amname",o,o,c,1)||s!=o&&!w(a,s,c.value,!1,"ns.nspname","of.opfname",o,o,o,3)||(l(a,`ORDER BY\
 1, 2,
  ap.amproclefttype = ap.amprocrighttype DESC,
  3, 4, 5;`),i=await C(a.data),!i)?!1:(e.title="List of support functions of operator families",e.translate_header=!0,e.
translate_columns=N,e.n_translate_columns=ne(N),Y(i,e,E.queryFout,!1,E.logfile),!0)}async function kn(t){let s={},n,a=q(
E.popt);return P(s),f(s,`/* %s */
`,"Get large objects"),T(s,`SELECT oid as "%s",
  pg_catalog.pg_get_userbyid(lomowner) as "%s",
  `,"ID","Owner"),t&&(Ae(s,"lomacl"),l(s,`,
  `)),T(s,`pg_catalog.obj_description(oid, 'pg_largeobject') as "%s"
FROM pg_catalog.pg_largeobject_metadata
ORDER BY oid`,"Description"),n=await C(s.data),n?(a.title="Large objects",a.translate_header=!0,Y(n,a,E.queryFout,!1,E.logfile),
!0):!1}let mt=0;function Ce(t,s,n,a){return t>=1e5?s?n=Ee("%d.%d",Math.trunc(t/1e4),t%1e4):n=Ee("%d",Math.trunc(t/1e4)):
s?n=Ee("%d.%d.%d",Math.trunc(t/1e4),Math.trunc(t/100)%100,t%100):n=Ee("%d.%d",Math.trunc(t/1e4),Math.trunc(t/100)%100),n}
function St(t,s,n,a,i){let e={},c={},N;if(!Ct(s,e,c))return!1;for(N=0;N<c.value;N++){let A=e.value[N],S,p,d;S=A,p=K(A,"="),
p!=o?(A=A.slice(0,A.length-p.length),S=A,d=p.slice(1)):d="",N>0&&l(t,", "),T(t,"%s%s=",n,Ge(S)),u(Ge(d),d)==0?l(t,d):Dn(
t,d,a,i)}return!0}function Vn(t,s,n,a,i,e,c,N,A,S,p){let d={},D={},m=!1,v={};return p==o&&(p=v),p.value=0,n==o?(A!=o&&(l(
s,a?"  AND ":"WHERE "),a=!0,m=!0,T(s,`%s
`,A)),m):(P(d),P(D),dt(ia(t),e!=o?S:o,e!=o?d:o,D,n,i,!0,p),c!=o&&D.len>2&&u(D.data,"^(.*)$")!=0&&(l(s,a?"  AND ":"WHERE "),
a=!0,m=!0,N!=o?(T(s,"(%s OPERATOR(pg_catalog.~) ",c),Be(s,D.data,t),ze(t)>=12e4&&l(s," COLLATE pg_catalog.default"),T(s,
`
        OR %s OPERATOR(pg_catalog.~) `,N),Be(s,D.data,t),ze(t)>=12e4&&l(s," COLLATE pg_catalog.default"),l(s,`)
`)):(T(s,"%s OPERATOR(pg_catalog.~) ",c),Be(s,D.data,t),ze(t)>=12e4&&l(s," COLLATE pg_catalog.default"),$(s,`
`))),e!=o&&d.len>2?u(d.data,"^(.*)$")!=0&&e!=o&&(l(s,a?"  AND ":"WHERE "),a=!0,m=!0,T(s,"%s OPERATOR(pg_catalog.~) ",e),
Be(s,d.data,t),ze(t)>=12e4&&l(s," COLLATE pg_catalog.default"),$(s,`
`)):A!=o&&(l(s,a?"  AND ":"WHERE "),a=!0,m=!0,T(s,`%s
`,A)),m)}function dt(t,s,n,a,i,e,c,N){let A=[{},{},{}],S={},p,d,D,m,v,h;for(be(i!=o),be(a!=o),be(s==o||n!=o),be(N!=o),N.
value=0,m=!1,h=i,s!=o?d=2:n!=o?d=1:d=0,p=0,c?(v=!0,P(S)):v=!1,P(A[p]),l(A[p],"^(");h[0];){let se=h[0];if(se=='"')m&&h[1]==
'"'?($(A[p],'"'),v&&$(S,'"'),h=h.slice(1)):m=!m,h=h.slice(1);else if(!m&&$t(se))$(A[p],Cn(se)),v&&$(S,Cn(se)),h=h.slice(
1);else if(!m&&se=="*")l(A[p],".*"),v&&$(S,"*"),h=h.slice(1);else if(!m&&se=="?")$(A[p],"."),v&&$(S,"?"),h=h.slice(1);else if(!m&&
se==".")v=!1,N&&N.value++,p<d?(l(A[p],")$"),p++,P(A[p]),l(A[p],"^("),h=h.slice(1)):($(A[p],h[0]),h=h.slice(1));else if(se==
"$")l(A[p],"\\$"),v&&$(S,"$"),h=h.slice(1);else for(((m||e)&&K("|*+?()[]{}.^$\\",se)!=o||se=="["&&h[1]=="]")&&$(A[p],"\\"),
D=es(h,t);D--;)v&&$(S,h[0]),$(A[p],h[0]),h=h.slice(1)}l(A[p],")$"),a&&(l(a,A[p].data),p--),n&&p>=0&&(l(n,A[p].data),p--),
s&&p>=0&&(c?l(s,S.data):l(s,A[p].data))}function Y(t,s,n,a,i){let e={},c,N,A;if(!J){for(an(e,s.topt,s.title,oa(t),B(t)),
be(s.translate_columns==o||s.n_translate_columns>=e.ncolumns),c=0;c<e.ncolumns;c++)Te(e,ra(t,c),s.translate_header,Ot(na(
t,c)));for(N=0;N<e.nrows;N++)for(A=0;A<e.ncolumns;A++){let S,p=!1,d;oe(t,N,A)?S=s.nullPrint!=o?s.nullPrint:"":na(t,A)==16?
S=_(t,N,A)[0]=="t"?s.truePrint!=o?s.truePrint:"t":s.falsePrint!=o?s.falsePrint:"f":(S=_(t,N,A),e.aligns[A]=="r"&&s.topt.
numericLocale&&(S=S,p=!0)),d=s.translate_columns&&s.translate_columns[A],Q(e,S,d,p)}if(s.footers){let S;for(S=0;s.footers[S]!=
o;S++)M(e,s.footers[S])}tn(e,n,a,i)}}function Ot(t){let s;switch(t){case 21:case 23:case 20:case 700:case 701:case 1700:case 26:case 6437:case 28:case 5069:case 29:case 790:
s="r";break;default:s="l";break}return s}let ut=["abort","absent","absolute","access","action","add","admin","after","ag\
gregate","all","also","alter","always","analyse","analyze","and","any","array","as","asc","asensitive","assertion","assi\
gnment","asymmetric","at","atomic","attach","attribute","authorization","backward","before","begin","between","bigint","\
binary","bit","boolean","both","breadth","by","cache","call","called","cascade","cascaded","case","cast","catalog","chai\
n","char","character","characteristics","check","checkpoint","class","close","cluster","coalesce","collate","collation",
"column","columns","comment","comments","commit","committed","compression","concurrently","conditional","configuration",
"conflict","connection","constraint","constraints","content","continue","conversion","copy","cost","create","cross","csv",
"cube","current","current_catalog","current_date","current_role","current_schema","current_time","current_timestamp","cu\
rrent_user","cursor","cycle","data","database","day","deallocate","dec","decimal","declare","default","defaults","deferr\
able","deferred","definer","delete","delimiter","delimiters","depends","depth","desc","detach","dictionary","disable","d\
iscard","distinct","do","document","domain","double","drop","each","else","empty","enable","encoding","encrypted","end",
"enforced","enum","error","escape","event","except","exclude","excluding","exclusive","execute","exists","explain","expr\
ession","extension","external","extract","false","family","fetch","filter","finalize","first","float","following","for",
"force","foreign","format","forward","freeze","from","full","function","functions","generated","global","grant","granted",
"greatest","group","grouping","groups","handler","having","header","hold","hour","identity","if","ignore","ilike","immed\
iate","immutable","implicit","import","in","include","including","increment","indent","index","indexes","inherit","inher\
its","initially","inline","inner","inout","input","insensitive","insert","instead","int","integer","intersect","interval",
"into","invoker","is","isnull","isolation","join","json","json_array","json_arrayagg","json_exists","json_object","json_\
objectagg","json_query","json_scalar","json_serialize","json_table","json_value","keep","key","keys","label","language",
"large","last","lateral","leading","leakproof","least","left","level","like","limit","listen","load","local","localtime",
"localtimestamp","location","lock","locked","logged","lsn","mapping","match","matched","materialized","maxvalue","merge",
"merge_action","method","minute","minvalue","mode","month","move","name","names","national","natural","nchar","nested","\
new","next","nfc","nfd","nfkc","nfkd","no","none","normalize","normalized","not","nothing","notify","notnull","nowait","\
null","nullif","nulls","numeric","object","objects","of","off","offset","oids","old","omit","on","only","operator","opti\
on","options","or","order","ordinality","others","out","outer","over","overlaps","overlay","overriding","owned","owner",
"parallel","parameter","parser","partial","partition","passing","password","path","period","placing","plan","plans","pol\
icy","position","preceding","precision","prepare","prepared","preserve","primary","prior","privileges","procedural","pro\
cedure","procedures","program","publication","quote","quotes","range","read","real","reassign","recursive","ref","refere\
nces","referencing","refresh","reindex","relative","release","rename","repack","repeatable","replace","replica","reset",
"respect","restart","restrict","return","returning","returns","revoke","right","role","rollback","rollup","routine","rou\
tines","row","rows","rule","savepoint","scalar","schema","schemas","scroll","search","second","security","select","seque\
nce","sequences","serializable","server","session","session_user","set","setof","sets","share","show","similar","simple",
"skip","smallint","snapshot","some","source","sql","stable","standalone","start","statement","statistics","stdin","stdou\
t","storage","stored","strict","string","strip","subscription","substring","support","symmetric","sysid","system","syste\
m_user","table","tables","tablesample","tablespace","target","temp","template","temporary","text","then","ties","time","\
timestamp","to","trailing","transaction","transform","treat","trigger","trim","true","truncate","trusted","type","types",
"uescape","unbounded","uncommitted","unconditional","unencrypted","union","unique","unknown","unlisten","unlogged","unti\
l","update","user","using","vacuum","valid","validate","validator","value","values","varchar","variadic","varying","verb\
ose","version","view","views","virtual","volatile","wait","when","where","whitespace","window","with","within","without",
"work","wrapper","write","xml","xmlattributes","xmlconcat","xmlelement","xmlexists","xmlforest","xmlnamespaces","xmlpars\
e","xmlpi","xmlroot","xmlserialize","xmltable","year","yes","zone"],Lt=[r,r,r,r,r,r,r,r,r,b,r,r,r,b,b,b,b,b,b,b,r,r,r,b,
r,r,r,r,ee,r,r,r,F,F,ee,F,F,b,r,r,r,r,r,r,r,b,b,r,r,F,F,r,b,r,r,r,r,F,b,ee,b,r,r,r,r,r,r,ee,r,r,r,r,b,r,r,r,r,r,r,b,ee,r,
r,r,b,b,b,ee,b,b,b,r,r,r,r,r,r,F,F,r,b,r,b,r,r,r,r,r,r,r,b,r,r,r,r,b,b,r,r,r,r,r,b,r,r,r,r,b,r,r,r,r,r,b,r,r,r,r,F,r,r,r,
r,F,b,r,b,r,r,r,F,r,b,r,b,r,r,ee,b,ee,r,r,r,r,b,r,F,b,F,r,r,b,r,r,r,r,r,r,ee,r,r,r,r,b,r,r,r,r,r,r,r,r,b,r,ee,F,r,r,r,r,
F,F,b,F,b,r,ee,ee,r,ee,F,F,F,F,F,F,F,F,F,F,F,r,r,r,r,r,r,r,b,b,r,F,ee,r,ee,b,r,r,r,b,b,r,r,r,r,r,r,r,r,r,r,r,F,r,r,r,r,r,
r,r,r,F,ee,F,r,r,r,r,r,r,r,r,F,F,r,b,r,r,ee,r,b,F,r,F,r,r,r,r,b,r,r,r,b,b,r,r,r,b,b,r,r,F,ee,r,ee,F,r,r,r,r,r,r,r,r,r,r,
r,r,b,r,r,r,F,r,F,r,r,r,b,r,r,r,r,r,r,r,r,r,r,r,F,r,r,r,b,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,b,r,r,ee,r,r,r,r,r,F,r,r,r,r,r,r,
r,r,r,r,b,r,r,r,r,r,b,r,F,r,r,r,ee,r,r,F,r,b,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,F,r,b,r,r,b,b,r,ee,r,r,r,r,r,r,b,r,F,F,b,b,r,
r,F,r,F,b,r,r,r,r,r,r,r,r,r,b,b,r,r,r,r,r,b,b,r,r,r,r,r,F,F,b,r,ee,r,r,r,r,r,r,b,b,r,b,b,r,r,r,r,r,r,F,F,F,F,F,F,F,F,F,F,
F,r,r,r];function q(t){return{...t,topt:nn(t.topt)}}function nn(t){return{...t,fieldSep:{...t.fieldSep},recordSep:{...t.
recordSep}}}function an(t,s,n,a,i){t.opt=s,t.title=n,t.ncolumns=a,t.nrows=i,t.headers=[],t.cells=[],t.footers=o,t.aligns=
[]}function Te(t,s,n,a){n&&(s=$n(s)),t.headers.push(s),t.header=s,t.aligns.push(a),t.align=a}function Q(t,s,n,a){n&&(s=$n(
s)),t.cells.push(s),t.cell=s}function M(t,s){t.footers==o&&(t.footers=[]),t.footers.push(s),t.footer={data:s}}function It(t,s){
t.footers&&t.footers.pop(),M(t,s)}function tn(t,s,n,a){fe({...t})}function Ct(t,s,n){let a,i,e;if(a=we(t),s.value=o,n.value=
0,a<2||t[0]!="{"||t[a-1]!="}")return!1;let c=s.value=[],N=0;for(N++,e=0;t[N]!="}";){if(t[N]==o)return!1;for(i="";t[N]!="\
}"&&t[N]!=",";){if(t[N]==o)return!1;if(t[N]!='"')i+=t[N++];else{for(N++;t[N]!='"';){if(t[N]==o||t[N]=="\\"&&(N++,t[N]==o))
return!1;i+=t[N++]}N++}}c[e]=i,t[N]==","&&N++,e++}return t[N+1]&&t[N+1]!=o?!1:(n.value=e,!0)}function Ge(t){let s={};P(s);
let n=!1;if(mt?n=!0:t[0]>="a"&&t[0]<="z"||t[0]=="_"?/[^a-z0-9_]/.test(t)&&(n=!0):n=!0,!n){let a=ut.indexOf(t);a>=0&&Lt[a]!=
r&&(n=!0)}return n?($(s,'"'),$(s,t.replace(/"/g,'""')),$(s,'"')):l(s,t),s.data}let E;try{let t=["?","h","help"].includes(
aa([...Z]));if(!j&&!t){let s=await C("SHOW server_version_num",!0);j=parseInt(s.rows[0][0],10)}if(E={sversion:j,cur_cmd_interactive:!1,
queryFout:Me,logfile:o,echo_hidden:x?Bt:Qn,db:{dbName:L,sversion:j,std_strings:z,status:ta,encoding:Ft},popt:{topt:{default_footer:!0,
expanded:0},nullPrint:""}},await _a(Z,{},xe(),xe()),t)return!1}catch(t){return fe("ERROR:  "+t.message),J?null:!1}return!0}
return{promise:le().finally(Le),cancel:Ne}}function Nn(g,L,U,G="",x=""){let j=Math.max(0,L-we(g));return U==="r"?G+" ".repeat(
j)+g+x:U==="c"?G+" ".repeat(Math.floor(j/2))+g+" ".repeat(Math.ceil(j/2))+x:G+g+" ".repeat(j)+x}function sa(g,L){let U=0,
G=g.length,x=[];for(;U<G;)x.push(g.slice(U,U+=L));return x}function In(g){let L=-1,U=0,G=1,x=0;for(;(L=g.indexOf(`
`,L+1))!==-1;)L-U>x&&(x=L-U),U=L+1,G++;return g.length-U>x&&(x=g.length-U),{count:G,longest:x}}function ge(g,L){return g=
g.replace(/[<>&'"]/g,U=>({"<":"&lt;",">":"&gt;","&":"&amp;","'":"&apos;",'"':"&quot;"})[U]),L&&(g=g.replace(/ /g,"&nbsp;").
replace(/\n/g,"<br />")),g}function Xt(g){let{ncolumns:L,nrows:U,headers:G,cells:x}=g;if(x.length===0)return`(${U} row${U===
1?"":"s"})`;let j=G.map(In),z=j.reduce((Z,ie)=>Z>ie.longest?Z:ie.longest,0),X=x.map(In),J=X.reduce((Z,ie)=>Z>ie.longest?
Z:ie.longest,0),Ne=3,re=U===0?0:13+(Math.log10(g.nrows)|0),Re=Math.max(z+Ne+J,re),Le=Re-z-Ne,fe="";for(let Z=0,ie=x.length,
Ie=0;Z<ie;Z++){let Se=Z%L;if(Se===0){Ie++;let ae=`-[ RECORD ${Ie} ]`;ae.length<z+1&&(ae+="-".repeat(z-ae.length+1)),ae.length<
z+2&&(ae+="+"),ae.length<Re&&(ae+="-".repeat(Re-ae.length)),fe+=`
${ae}`}let Qe=G[Se].split(`
`),$e=Qe.length,Ze=x[Z].split(`
`),fn=Ze.length,C=Math.max($e,fn);for(let ae=0;ae<C;ae++)fe+=`
`+Nn(Qe[ae]??"",z)+($e>ae+1?"+":" ")+"| "+Nn(Ze[ae]??"",Le)+(fn>ae+1?"+":"")}let ce=g.footers?g.footers.filter(ue):[],le=ce.
length>0?`

`+ce.join(`
`):"";return`${g.title}${fe}${le}`}function jt(g){if(g.opt.expanded)return Xt(g);let{ncolumns:L,nrows:U,aligns:G}=g,x=[...g.
headers,...g.cells].map(In),{colWidths:j,rowHeights:z}=x.reduce((ce,le,He)=>{let Z=Math.floor(He/g.ncolumns),ie=He%g.ncolumns;
return le.longest>ce.colWidths[ie]&&(ce.colWidths[ie]=le.longest),le.count>ce.rowHeights[Z]&&(ce.rowHeights[Z]=le.count),
ce},{colWidths:new Array(L).fill(0),rowHeights:new Array(U+1).fill(1)}),X=j.reduce((ce,le)=>ce+le,0)+L*2+(L-1),J=Nn(g.title,
X,"c"),Ne=[g.headers,null,...sa(g.cells,L)],re=Ne.map((ce,le)=>{if(le===1)return g.headers.map((Z,ie)=>"-".repeat(j[ie%L]+
2)).join("+");le>1&&le--;let He=ce.map(Z=>Z.split(`
`));return new Array(z[le]).fill("").map((Z,ie)=>He.map((Ie,Se)=>Nn(Ie[ie]??"",j[Se],le===0?"c":G[Se]," ",Ie[ie+1]===void 0?
" ":"+")).join("|")).join(`
`)}).join(`
`),Re=g.footers?g.footers.filter(ue):[],Le=Re.length>0?`
`+Re.join(`
`):g.opt.default_footer?`
(${U} row${U===1?"":"s"})`:"";return`${J}
${re}${Le}`}function Jt(g){let{ncolumns:L,cells:U,headers:G}=g,x=`<table><tr><th align="left" colspan="2">${ge(g.title)}\
</th></tr>`,j=G.map(X=>ge(X,!0));for(let X=0,J=U.length,Ne=0;X<J;X++){let re=X%L;re===0&&(Ne++,x+=`<tr><th align="left" \
colspan="2">RECORD ${Ne}</th></tr>`);let Re=j[re],Le=ge(U[X],!0);x+=`<tr><td valign="top">${Re}</td><td valign="top">${Le}\
</td></tr>`}x+="</table>";let z=g.footers?g.footers.filter(ue):[];return z.length>0&&(z.length>1&&z.some(X=>/^\s/.test(X))?
x+="<dl>"+z.map(X=>/^\s/.test(X)?`<dd>${ge(X.trim(),!0)}</dd>`:`<dt>${ge(X,!0)}</dt>`).join("")+"</dl>":x+=z.map(X=>`<p>${ge(
X,!0)}</p>`).join("")),x}function Kt(g){if(g.opt.expanded)return Jt(g);let L=`<table><tr><th valign="top" style="text-al\
ign: center;" colspan="${g.ncolumns}">${ge(g.title)}</th></tr><tr>`;for(let G of g.headers)L+=`<th valign="top" style="t\
ext-align: center;">${ge(G)}</th>`;L+="</tr>";for(let G of sa(g.cells,g.ncolumns))L+="<tr>"+G.map((x,j)=>`<td valign="to\
p" style="text-align: ${g.aligns[j]==="c"?"center":g.aligns[j]==="r"?"right":"left"}">${ge(x).replace(/\n/g,"<br>")}</td\
>`).join(`
`)+"</tr>";L+="</table>";let U=g.footers?g.footers.filter(ue):[];return U.length>0?U.length>1&&U.some(G=>/^\s/.test(G))?
L+="<dl>"+U.map(G=>/^\s/.test(G)?`<dd>${ge(G.trim(),!0)}</dd>`:`<dt>${ge(G,!0)}</dt>`).join("")+"</dl>":L+=U.map(G=>`<p>${ge(
G,!0)}</p>`).join(""):g.opt.default_footer&&(L+=`<p>(${g.nrows} row${g.nrows===1?"":"s"})</p>`),L}function be(g){if(!g)throw new Error(
`Assertion failed (value: ${g})`)}var zt=(g,L,U)=>U===1?g:L;var $n=ue;function Ke(g,L){let U=g.indexOf(L);return U===-1?o:g.slice(U)}var K=Ke;function we(g){return g.length}function he(g,L,U){
if(typeof g!="string"||typeof L!="string")throw new Error("Not a string");return g.length>U&&(g=g.slice(0,U)),L.length>U&&
(L=L.slice(0,U)),g<L?-1:g>L?1:0}function u(g,L){return he(g,L,1/0)}function Qt(g,L){let U=we(g);for(let G=0;G<U;G++)if(L.
indexOf(g[G])===-1)return G;return U}function Zn(g){return parseInt(g,10)}function Ln(g){return parseInt(g,10)}function $t(g){
let L=g.charCodeAt(0);return L>=65&&L<=90}function ne(g){return g.length}function Cn(g){return g.toLowerCase()}function Zt(g,L){
return u(g.toLowerCase(),L.toLowerCase())}function es(g,L){return 1}function Ue(g){return 0}function P(g){g.data="",g.len=0}function xe(){let g={};return P(g),g}var An=P;function l(g,L){g.
data+=L,g.len=g.data.length}var $=l;function T(g,L,...U){let G=Ee(L,...U);l(g,G)}function f(g,L,...U){P(g),T(g,L,...U)}function Dn(g,L,U,G){
l(g,"'"+L.replace(G?/'/g:/['\\]/g,"$&$&")+"'")}function Be(g,L,U){if(K(L,"\\")!=o&&ze(U)<19e4){g.len>0&&g.data[g.len-1]!=
" "&&$(g," "),$(g,ht),Dn(g,L,ia(U),!1);return}Dn(g,L,U.encoding,U.std_strings)}function Ee(g,...L){let U="",G=0,x=0,j;for(;(j=
g.indexOf("%",x))!==-1;){let z=0,X=!1;U+=g.slice(x,j),x=j+1;let J=g[x++];if(J==="%"&&(U+="%"),J==="*"&&(z=parseInt(L[G++],
10),J=g[x++]),J==="-"&&(X=!0,J=g[x++]),J>="0"&&J<="9"&&(z=parseInt(J,10),J=g[x++]),J==="s"||J==="c"||J==="d"||J==="u"){let Ne=String(
L[G++]),re=z-Ne.length;X===!1&&re>0&&(U+=" ".repeat(re)),U+=Ne,X===!0&&re>0&&(U+=" ".repeat(re))}}return U+=g.slice(x),U}
var gn=Ee;function ea(g){return g?g.dbName:o}function ze(g){return!g||g.status===vt?0:g.sversion}function ia(g){return!g||
g.status!=ta?-1:g.client_encoding}function B(g){return g.rowCount}function oa(g){return g.fields.length}function ra(g,L){
return g.fields[L].name}function na(g,L){return g.fields[L].dataTypeID}function oe(g,L,U){return g.rows[L][U]===null?1:0}
function _(g,L,U){let G=g.rows[L][U];return String(G===null?"":G)}function ye(g,L){let U,G,x,j,z;if(!g||L==o||L[0]==o)return-1;
for(U=!1,x="",G=0,z=we(L);G<z;G++){let X=L[G];U?X=='"'?L[G+1]=='"'?(x+='"',G++):U=!1:x+=X:X=='"'?U=!0:(X=Cn(X),x+=X)}for(j=
0,z=oa(g);j<z;j++)if(u(x,ra(g,j))==0)return j;return-1}function aa(g){let[L]=g[0].slice(g[1]).match(/^[^\s\\]*/);return g[1]+=
L.length,L}function ue(g){return g}export{ls as describe,rs as describeDataToHtml,os as describeDataToString,ge as htmlEscape};
