var xe=[["ABORT","abort the current transaction","sql-abort","ABORT [ WORK | TRANSACTION ] [ AND [ NO ] CHAIN ]"],["ALTE\
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

TABLE [ ONLY ] table_name [ * ]`]];var o=null,wt=100,Ht="E",Mt=0,Gt=6,An=0,gn=1,$n="S",Zn="M",vt="a",Wt="e",xt="b",Bt="i",ea="n",na="s",r=0,y=1,ee=2,U=3,Yt=3,
la=0,qt=1,Dn=2,kt=7,ue=0,Vt=1,He=2,Se=5,de=0,Be=4,aa=0,Xt=1,jt=2,Jt="19rc2",Kt="19",zt=`Help
  \\? [commands]          show help on backslash commands
  \\h [NAME]              help on syntax of SQL commands, * for all commands

Informational
  (options: S = show system objects, x = expanded mode, + = additional detail)
  \\d[Sx+]                list tables, views, and sequences
  \\d[Sx+]  NAME          describe table, view, sequence, or index
                         (x applies only to sequences)
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

`;function Ti(g){return typeof g=="string"?g:$t(g)}function Ri(g){return typeof g=="string"?`<p>${me(g,!0)}</p>`:ei(g)}function _i(g,u,P,W,{
echoHidden:B=!1,serverVersion:K=null,standardConformingStrings:z=!0,docsURLTemplate:j=ae=>`https://www.postgresql.org/do\
cs/${Qe(Jt,"devel")?"devel":Kt}/${ae}.html`,multipleCommands:ne=!1}={}){let ae=!1;function ge(){ae=!0,W=()=>{}}function Ne(){
if(ae)throw new Error("cancelled")}let Oe=null;function Pe(){Oe!==null&&W(Oe.replace(/\n+$/,"")),Oe=null}function ie(Z){
Pe(),W(Z)}function le(Z){Oe=(Oe??"")+Z}async function Fe(){let Z=g.trimStart();if(Z[0]!=="\\")return{success:!0,remainder:Z,
commands:0};let _e=[Z.slice(1),0];function ye(t,i){let n=(t??"").trim().toUpperCase().replace(/\s+/g," ");if(n===""){ie(
`Available help:
`+xe.map(s=>s[0]).join(`
`));return}let a=n==="*"?xe:xe.filter(s=>s[0]===n);if(a.length===0&&(a=xe.filter(s=>s[0].startsWith(n))),a.length===0){let s=n.
split(" ");for(let e=s.length;e>0;e--){let c=s.slice(0,e).join(" ");if(a=xe.filter(N=>N[0].startsWith(c)),a.length>0)break}}
if(a.length===0){ie(`No help available for "${t.trim()}".
Try \\h with no arguments to see available help.`);return}for(let s of a)ie(`Command:     ${s[0]}
Description: ${s[1]}
Syntax:
${s[3]}

URL: ${j(s[2])}`)}let Sn=t=>Mn(zt,ve),Ie=t=>()=>(M("\\%s is not supported",t),!1),Ze=Ie("? options"),Fn=Ie("? variables"),
en=Ie("lo_export"),nn=Ie("lo_import"),dn=Ie("lo_unlink"),Ee=Le,b=async(t,i=!1)=>{Ne(),B&&!i&&ie(`/**** INTERNAL QUERY **\
**/
${t}
/************************/`);let n=await P(t);return Ne(),n};async function yn(t,i){Ne();try{return{...await P(i),status:Dn}}catch(n){
return{status:kt,errorFields:{[$n]:"ERROR",[Zn]:n.message}}}finally{Ne()}}let wn=t=>t.status,Hn=(t,i)=>t.errorFields?.[i]??
o,Ra=()=>z,ve={write:le},Mn=(t,i)=>i.write(t),an=(t,i,...n)=>t.write(pe(i,...n)),_a=(t,...i)=>an(ve,t,...i),ri=Le,li=Le,
Aa=(t,i)=>ve,M=(t,...i)=>le(pe(t,...i)+`
`),Gn=M,ga=M,vn=M,Wn=t=>!0,Na=Le,Ei=Le;function Te(t,i,n,a){if(i!==de&&i!==Be)throw new Error(`scan type ${i} not implem\
ented`);let[s]=t,e=/[ \t\n\r\f\v]/,c=t[1],N="",A=0,m=0,p,S=()=>(M("unterminated quoted string"),t[1]=s.length,o);for(;e.
test(s[c]??"");)c++;if(i===Be)N=s.slice(c),c=s.length,a&&(N=N.replace(/[; \t\n\r\f\v]+$/,""));else{for(;;){let D=s.slice(
c);if(D===""||e.test(D[0])||D[0]==="\\")break;if(D[0]==="'"){A="'",m=0,c++;let f=[],v=I=>{f.length>0&&(N+=new TextDecoder().
decode(new Uint8Array(f)),f=[]),N+=I};for(;;){let I=s.slice(c);if(I==="")return S();if(I.startsWith("''"))v("'"),c+=2;else if(I[0]===
"'"){v(""),c++;break}else(p=I.match(/^\\[ntbrf]/))?(v({n:`
`,t:"	",b:"\b",r:"\r",f:"\f"}[p[0][1]]),c+=2):(p=I.match(/^\\([0-7]{1,3})/))?(f.push(parseInt(p[1],8)&255),c+=p[0].length):
(p=I.match(/^\\x([0-9A-Fa-f]{1,2})/))?(f.push(parseInt(p[1],16)),c+=p[0].length):(p=I.match(/^\\(.)/))?(v(p[1]),c+=2):(v(
I[0]),c++)}}else if(D[0]==='"'){let f=s.indexOf('"',c+1);if(f===-1)return S();A='"',m=0,N+=s.slice(c,f+1),c=f+1}else(p=D.
match(/^:(?:[A-Za-z\u0080-\uFFFF_0-9]+|'[A-Za-z\u0080-\uFFFF_0-9]+'|"[A-Za-z\u0080-\uFFFF_0-9]+")/))?(N+=p[0],c+=p[0].length,
m=0):(p=D.match(/^:\{\?[A-Za-z\u0080-\uFFFF_0-9]+\}/))?(N+="FALSE",c+=p[0].length):(N+=D[0],c++,m++)}if(a)for(;m-- >0&&N.
endsWith(";");)N=N.slice(0,-1)}return N=N.split("\0")[0],t[1]=c,n!=o&&(n.value=A),N===""&&A===0?o:N}let fa=!1;async function ma(t,i,n,a){
let s,e,c;if(be(t!=o),be(i!=o),e=ra(t),e==o?s=Se:fa&&O(e,"unrestrict")!=0?(M("backslash commands are restricted; only \\u\
nrestrict is allowed"),s=Se):s=await Sa(e,t,i,n,a),s==ue&&(M("invalid command \\%s",e),E.cur_cmd_interactive&&ga("Try \\?\
 for help."),s=Se),s!=Se){let N=Wn(i);for(Na(i,Yt);(c=Te(t,de,o,!1))!=o;)N&&vn('\\%s: extra argument "%s" ignored',e,c)}else
for(;(c=Te(t,Be,o,!1))!=o;);return oi(t),E.queryFout,s}async function Sa(t,i,n,a,s){let e,c=Wn(n);return E.cur_cmd_interactive&&
!c&&!Da(t)&&vn("\\%s command ignored; use \\endif or Ctrl-C to exit current \\if block",t),t[0]=="d"?e=await da(i,c,t):O(
t,"h")==0||O(t,"help")==0?e=Oa(i,c):O(t,"l")==0||O(t,"list")==0||O(t,"lx")==0||O(t,"listx")==0||O(t,"l+")==0||O(t,"list+")==
0||O(t,"lx+")==0||O(t,"listx+")==0||O(t,"l+x")==0||O(t,"list+x")==0?e=await ua(i,c,t):he(t,"lo_",3)==0?e=await La(i,c,t):
O(t,"sf")==0||O(t,"sf+")==0?e=await Bn(i,c,t,!0):O(t,"sv")==0||O(t,"sv+")==0?e=await Bn(i,c,t,!1):O(t,"z")==0||O(t,"zS")==
0||O(t,"zx")==0||O(t,"zSx")==0||O(t,"zxS")==0?e=await Ia(i,c,t):O(t,"?")==0?e=Ca(i,c):e=ue,e==Vt&&ba(a,s),e}async function da(t,i,n){
let a=He,s=!0;if(i){let e,c,N,A;switch(e=Te(t,de,o,!0),c=J(n,"+")!=o,N=J(n,"S")!=o,A=E.popt.topt.expanded,n[1]!=null&&J(
n.slice(2),"x")!=o&&(E.popt.topt.expanded=1),n[1]){case void 0:case"+":case"S":e!=o?s=await Ya(e,c,N):s=await jn("tvmsE",
o,c,N);break;case"A":{let m=o;switch(e!=o&&n[2]!=null&&n[2]!="+"&&n[2]!="x"&&(m=Te(t,de,o,!0)),n[2]){case void 0:case"+":case"\
x":s=await wa(e,c);break;case"c":s=await St(e,m,c);break;case"f":s=await dt(e,m,c);break;case"o":s=await Ot(e,m,c);break;case"\
p":s=await ut(e,m,c);break;default:a=ue;break}}break;case"a":s=await ya(e,c,N);break;case"b":s=await Ha(e,c);break;case"\
c":he(n,"dconfig",7)==0?s=await za(e,c,N):s=await Ka(e,c,N);break;case"C":s=await Za(e,c);break;case"d":he(n,"ddp",3)==0?
s=await xa(e):s=await Ba(e,N);break;case"D":s=await Ja(e,c,N);break;case"f":switch(n[2]){case void 0:case"+":case"S":case"\
a":case"n":case"p":case"t":case"w":case"x":s=await xn(t,n,e,c,N);break;default:a=ue;break}break;case"g":s=await Xn(e,c,N);
break;case"l":s=await Jn(c);break;case"L":s=await ja(e,c,N);break;case"n":s=await nt(e,c,N);break;case"o":s=await xn(t,n,
e,c,N);break;case"O":s=await et(e,c,N);break;case"p":s=await Vn(e,N);break;case"P":switch(n[2]){case void 0:case"+":case"\
t":case"i":case"n":case"x":s=await Xa(n.slice(2),e,c);break;default:a=ue;break}break;case"T":s=await Ga(e,c,N);break;case"\
t":case"v":case"m":case"i":case"s":case"E":s=await jn(n.slice(1),e,c,N);break;case"r":if(n[2]=="d"&&n[3]=="s"){let m=o;e!=
o&&(m=Te(t,de,o,!0)),s=await ka(e,m)}else n[2]=="g"?s=await Va(e,N):a=ue;break;case"R":switch(n[2]){case"p":c?s=await ft(
e):s=await Nt(e);break;case"s":s=await mt(e,c);break;default:a=ue}break;case"u":s=await Xn(e,c,N);break;case"F":switch(n[2]){case void 0:case"\
+":case"x":s=await rt(e,c);break;case"p":s=await at(e,c);break;case"d":s=await st(e,c);break;case"t":s=await ot(e,c);break;default:
a=ue;break}break;case"e":switch(n[2]){case"s":s=await pt(e,c);break;case"u":s=await Tt(e,c);break;case"w":s=await ct(e,c);
break;case"t":s=await Rt(e,c);break;default:a=ue;break}break;case"x":c?s=await At(e):s=await _t(e);break;case"X":s=await $a(
e,c);break;case"y":s=await Qa(e,c);break;default:a=ue}E.popt.topt.expanded=A}else ke(t);return s||(a=Se),a}async function xn(t,i,n,a,s){
let e,c=[],N=0;if(n!=o){let A;for(;(A=Te(t,de,o,!0))!=o&&(c[N++]=A,!(N>=wt)););}return i[1]=="f"?e=await Ma(i.slice(2),n,
c,N,a,s):e=await va(n,c,N,a,s),e}function Oa(t,i){if(i){let n=Te(t,Be,o,!0);ye(n,E.popt.topt.pager)}else Yn(t);return He}
async function ua(t,i,n){let a=!0;if(i){let s,e,c;s=Te(t,de,o,!0),e=J(n,"+")!=o,c=E.popt.topt.expanded,J(n,"x")!=o&&(E.popt.
topt.expanded=1),a=await Wa(s,e),E.popt.topt.expanded=c}else ke(t);return a?He:Se}async function La(t,i,n){let a=He,s=!0;
if(i){let e={},c={};if(e.value=Te(t,de,o,!0),c.value=Te(t,de,o,!0),O(n.slice(3),"export")==0)e.value==o||c.value==o?(M("\
\\%s: missing required argument",n),s=!1):s=en(e.value,c.value);else if(O(n.slice(3),"import")==0)e.value==o?(M("\\%s: mi\
ssing required argument",n),s=!1):s=nn(e.value,c.value);else if(he(n.slice(3),"list",4)==0){let N,A;N=J(n,"+")!=o,A=E.popt.
topt.expanded,J(n,"x")!=o&&(E.popt.topt.expanded=1),s=await Jn(N),E.popt.topt.expanded=A}else O(n.slice(3),"unlink")==0?
e.value==o?(M("\\%s: missing required argument",n),s=!1):s=dn(e.value):a=ue}else ke(t);return s||(a=Se),a}async function Bn(t,i,n,a){
let s=He;if(i){let e=J(n,"+")!=o,c,N,A={value:Mt},m=a?An:gn;if(c=Ye(),N=Te(t,Be,o,!0),N==o)M(a?"function name is require\
d":"view name is required"),s=Se;else if(!await Ua(m,N,A))s=Se;else if(!await ha(m,A.value,c))s=Se;else{let p,S;if(E.queryFout==
ve){let D=Pa(c);p=Aa(D,E.popt.topt),S=!0}else p=E.queryFout,S=!1;e?Fa(p,c.data,a):Mn(c.data,p)}}else Yn(t);return s}async function Ia(t,i,n){
let a=!0;if(i){let s,e,c;s=Te(t,de,o,!0),e=J(n,"S")!=o,c=E.popt.topt.expanded,J(n,"x")!=o&&(E.popt.topt.expanded=1),a=await Vn(
s,e),E.popt.topt.expanded=c}else ke(t);return a?He:Se}function Ca(t,i){if(i){let n=Te(t,de,o,!1);n==o||O(n,"commands")==
0?Sn(E.popt.topt.pager):O(n,"options")==0?Ze(E.popt.topt.pager):O(n,"variables")==0?Fn(E.popt.topt.pager):Sn(E.popt.topt.
pager)}else ke(t);return He}function ke(t){let i;for(;(i=Te(t,de,o,!1))!=o;);}function Yn(t){let i=Te(t,Be,o,!1)}function Da(t){
return O(t,"if")==0||O(t,"elif")==0||O(t,"else")==0||O(t,"endif")==0}function ba(t,i){return t&&t.len==0?(l(t,i.data),!0):
!1}function qn(t){return!(E.echo_hidden!=aa&&(_a(`/**** INTERNAL QUERY ****/
%s
/************************/

`,t),E.logfile&&(an(E.logfile,`/**** INTERNAL QUERY ****/
%s
/************************/

`,t),E.logfile),E.echo_hidden==jt))}async function Ua(t,i,n){let a=!0,s=Ye(),e;switch(t){case An:L(s,"Get function's OID"),
l(s,"SELECT "),qe(s,i,E.db),T(s,"::pg_catalog.%s::pg_catalog.oid",J(i,"(")!=o?"regprocedure":"regproc");break;case gn:L(
s,"Get view's OID"),l(s,"SELECT "),qe(s,i,E.db),l(s,"::pg_catalog.regclass::pg_catalog.oid");break}return qn(s.data)?(e=
await yn(E.db,s.data),wn(e)==Dn&&Y(e)==1?n.value=bn(_(e,0,0)):(kn(e),a=!1),a):!1}async function ha(t,i,n){let a=!0,s=Ye(),
e;switch(t){case An:L(s,"Get function's definition"),T(s,"SELECT pg_catalog.pg_get_functiondef(%u)",i);break;case gn:L(s,
"Get view's definition and details"),E.sversion>=90400?T(s,"SELECT nspname, relname, relkind, pg_catalog.pg_get_viewdef(\
c.oid, true), pg_catalog.array_remove(pg_catalog.array_remove(c.reloptions,'check_option=local'),'check_option=cascaded'\
) AS reloptions, CASE WHEN 'check_option=local' = ANY (c.reloptions) THEN 'LOCAL'::text WHEN 'check_option=cascaded' = A\
NY (c.reloptions) THEN 'CASCADED'::text ELSE NULL END AS checkoption FROM pg_catalog.pg_class c LEFT JOIN pg_catalog.pg_\
namespace n ON c.relnamespace = n.oid WHERE c.oid = %u",i):T(s,"SELECT nspname, relname, relkind, pg_catalog.pg_get_view\
def(c.oid, true), c.reloptions AS reloptions, NULL AS checkoption FROM pg_catalog.pg_class c LEFT JOIN pg_catalog.pg_nam\
espace n ON c.relnamespace = n.oid WHERE c.oid = %u",i);break}if(!qn(s.data))return!1;if(e=await yn(E.db,s.data),wn(e)==
Dn&&Y(e)==1){switch(Nn(n),t){case An:l(n,_(e,0,0));break;case gn:{let c=_(e,0,0),N=_(e,0,1),A=_(e,0,2),m=_(e,0,3),p=_(e,
0,4),S=_(e,0,5);A[0]==="v"?l(n,"CREATE OR REPLACE VIEW "):(M('"%s.%s" is not a view',c,N),a=!1),T(n,"%s.",We(c)),l(n,We(
N)),p!=o&&Ge(p)>2&&(l(n,`
 WITH (`),It(n,p,"",E.encoding,Ra())||(M("could not parse reloptions array"),a=!1),$(n,")")),T(n,` AS
%s`,m),n.len>0&&n.data[n.len-1]==";"&&(n.data=n.data.slice(0,--n.len)),S!=o&&S[0]!=null&&T(n,`
 WITH %s CHECK OPTION`,S)}break}n.len>0&&n.data[n.len-1]!=`
`&&$(n,`
`)}else kn(e),a=!1;return a}function Pa(t){let i=0,n=t.data;for(;n[0]!=null&&(i++,n=J(n,`
`),n!=o);)n=n.slice(1);return i}function Fa(t,i,n){let a=n,s=0;for(;i[0]!=null;){let e;if(a&&(he(i,"AS ",3)==0||he(i,"BE\
GIN ",6)==0||he(i,"RETURN ",7)==0)&&(a=!1),a||s++,e=J(i,`
`),e!=o&&(i=i.slice(0,i.length-e.length)),a?an(t,`        %s
`,i):an(t,`%-7d %s
`,s,i),e==o)break;i=e=e.slice(1)}}function kn(t){let i,n;i=Ye(),n=Hn(t,$n),n!=o?h(i,"%s:  ",n):h(i,"ERROR:  "),n=Hn(t,Zn),
n!=o?l(i,n):l(i,"(not available)"),$(i,`
`),M("%s",i.data)}async function ya(t,i,n){let a={},s,e=k(E.popt);return F(a),L(a,"Get matching aggregates"),T(a,`SELECT\
 n.nspname as "%s",
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
`),!H(a,t,!0,!1,"n.nspname","p.proname",o,"pg_catalog.pg_function_is_visible(p.oid)",o,3)||(l(a,"ORDER BY 1, 2, 4;"),s=await b(
a.data),!s)?!1:(e.title="List of aggregate functions",e.translate_header=!0,q(s,e,E.queryFout,!1,E.logfile),!0)}async function wa(t,i){
let n={},a,s=k(E.popt),e=[!1,!0,!1,!1];if(E.sversion<90600){let c="";return M("The server (version %s) does not support \
access methods.",Ce(E.sversion,!1,c,Ue(c))),!0}return F(n),L(n,"Get matching access methods"),T(n,`SELECT amname AS "%s"\
,
  CASE amtype WHEN 'i' THEN '%s' WHEN 't' THEN '%s' END AS "%s"`,"Name","Index","Table","Type"),i&&T(n,`,
  amhandler AS "%s",
  pg_catalog.obj_description(oid, 'pg_am') AS "%s"`,"Handler","Description"),l(n,`
FROM pg_catalog.pg_am
`),!H(n,t,!1,!1,o,"amname",o,o,o,1)||(l(n,"ORDER BY 1;"),a=await b(n.data),!a)?!1:(s.title="List of access methods",s.translate_header=
!0,s.translate_columns=e,s.n_translate_columns=te(e),q(a,s,E.queryFout,!1,E.logfile),!0)}async function Ha(t,i){let n={},
a,s=k(E.popt);return F(n),L(n,"Get matching tablespaces"),T(n,`SELECT spcname AS "%s",
  pg_catalog.pg_get_userbyid(spcowner) AS "%s",
  pg_catalog.pg_tablespace_location(oid) AS "%s"`,"Name","Owner","Location"),i&&(l(n,`,
  `),fe(n,"spcacl"),T(n,`,
  spcoptions AS "%s",
  pg_catalog.pg_size_pretty(pg_catalog.pg_tablespace_size(oid)) AS "%s",
  pg_catalog.shobj_description(oid, 'pg_tablespace') AS "%s"`,"Options","Size","Description")),l(n,`
FROM pg_catalog.pg_tablespace
`),!H(n,t,!1,!1,o,"spcname",o,o,o,1)||(l(n,"ORDER BY 1;"),a=await b(n.data),!a)?!1:(s.title="List of tablespaces",s.translate_header=
!0,q(a,s,E.queryFout,!1,E.logfile),!0)}async function Ma(t,i,n,a,s,e){let c="anptwSx+",N=J(t,"a")!=o,A=J(t,"n")!=o,m=J(t,
"p")!=o,p=J(t,"t")!=o,S=J(t,"w")!=o,D,f={},v,I=k(E.popt),re=[!1,!1,!1,!1,!0,!0,!0,!1,!0,!0,!1,!1,!1,!1],Ve=[!1,!1,!1,!1,
!0,!0,!1,!0,!0,!1,!1,!1,!1];if(Ge(t)!=ai(t,c))return M("\\df only takes [%s] as options",c),!0;if(m&&E.sversion<11e4){let X="";
return M('\\df does not take a "%c" option with server version %s',"p",Ce(E.sversion,!1,X,Ue(X))),!0}!N&&!A&&!m&&!p&&!S&&
(N=A=p=S=!0,E.sversion>=11e4&&(m=!0)),F(f),L(f,"Get matching functions"),T(f,`SELECT n.nspname as "%s",
  p.proname as "%s",
`,"Schema","Name"),E.sversion>=11e4?T(f,`  pg_catalog.pg_get_function_result(p.oid) as "%s",
  pg_catalog.pg_get_function_arguments(p.oid) as "%s",
 CASE p.prokind
  WHEN 'a' THEN '%s'
  WHEN 'w' THEN '%s'
  WHEN 'p' THEN '%s'
  ELSE '%s'
 END as "%s"`,"Result data type","Argument data types","agg","window","proc","func","Type"):T(f,`  pg_catalog.pg_get_fun\
ction_result(p.oid) as "%s",
  pg_catalog.pg_get_function_arguments(p.oid) as "%s",
 CASE
  WHEN p.proisagg THEN '%s'
  WHEN p.proiswindow THEN '%s'
  WHEN p.prorettype = 'pg_catalog.trigger'::pg_catalog.regtype THEN '%s'
  ELSE '%s'
 END as "%s"`,"Result data type","Argument data types","agg","window","trigger","func","Type"),s&&(T(f,`,
 CASE
  WHEN p.provolatile = 'i' THEN '%s'
  WHEN p.provolatile = 's' THEN '%s'
  WHEN p.provolatile = 'v' THEN '%s'
 END as "%s"`,"immutable","stable","volatile","Volatility"),E.sversion>=90600&&T(f,`,
 CASE
  WHEN p.proparallel = 'r' THEN '%s'
  WHEN p.proparallel = 's' THEN '%s'
  WHEN p.proparallel = 'u' THEN '%s'
 END as "%s"`,"restricted","safe","unsafe","Parallel"),T(f,`,
 pg_catalog.pg_get_userbyid(p.proowner) as "%s",
 CASE WHEN prosecdef THEN '%s' ELSE '%s' END AS "%s",
 CASE WHEN p.proleakproof THEN '%s' ELSE '%s' END as "%s"`,"Owner","definer","invoker","Security","yes","no","Leakproof?"),
l(f,`,
 `),fe(f,"p.proacl"),T(f,`,
 l.lanname as "%s"`,"Language"),T(f,`,
 CASE WHEN l.lanname IN ('internal', 'c') THEN p.prosrc END as "%s"`,"Internal name"),T(f,`,
 pg_catalog.obj_description(p.oid, 'pg_proc') as "%s"`,"Description")),l(f,`
FROM pg_catalog.pg_proc p
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
`);for(let X=0;X<a;X++)T(f,`     LEFT JOIN pg_catalog.pg_type t%d ON t%d.oid = p.proargtypes[%d]
     LEFT JOIN pg_catalog.pg_namespace nt%d ON nt%d.oid = t%d.typnamespace
`,X,X,X,X,X,X);if(s&&l(f,`     LEFT JOIN pg_catalog.pg_language l ON l.oid = p.prolang
`),D=!1,!(A&&N&&m&&p&&S))if(A)N||(D?l(f,"      AND "):(l(f,"WHERE "),D=!0),E.sversion>=11e4?l(f,`p.prokind <> 'a'
`):l(f,`NOT p.proisagg
`)),!m&&E.sversion>=11e4&&(D?l(f,"      AND "):(l(f,"WHERE "),D=!0),l(f,`p.prokind <> 'p'
`)),p||(D?l(f,"      AND "):(l(f,"WHERE "),D=!0),l(f,`p.prorettype <> 'pg_catalog.trigger'::pg_catalog.regtype
`)),S||(D?l(f,"      AND "):(l(f,"WHERE "),D=!0),E.sversion>=11e4?l(f,`p.prokind <> 'w'
`):l(f,`NOT p.proiswindow
`));else{let X=!1;l(f,`WHERE (
       `),D=!0,N&&(E.sversion>=11e4?l(f,`p.prokind = 'a'
`):l(f,`p.proisagg
`),X=!0),p&&(X&&l(f,"       OR "),l(f,`p.prorettype = 'pg_catalog.trigger'::pg_catalog.regtype
`),X=!0),m&&(X&&l(f,"       OR "),l(f,`p.prokind = 'p'
`),X=!0),S&&(X&&l(f,"       OR "),E.sversion>=11e4?l(f,`p.prokind = 'w'
`):l(f,`p.proiswindow
`)),l(f,`      )
`)}if(!H(f,i,D,!1,"n.nspname","p.proname",o,"pg_catalog.pg_function_is_visible(p.oid)",o,3))return!1;for(let X=0;X<a;X++)
if(O(n[X],"-")!=0){let Xe="",je="",Je="",Ke="";if(Xe=pe("nt%d.nspname",X),je=pe("t%d.typname",X),Je=pe("pg_catalog.forma\
t_type(t%d.oid, NULL)",X),Ke=pe("pg_catalog.pg_type_is_visible(t%d.oid)",X),!H(f,On(n[X]),!0,!1,Xe,je,Je,Ke,o,3))return!1}else
T(f,`  AND t%d.typname IS NULL
`,X);return!e&&i==o&&l(f,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),l(f,"ORDER BY 1, 2, 4;"),v=await b(f.data),v?(I.title="List of functions",I.translate_header=!0,E.sversion>=90600?(I.
translate_columns=re,I.n_translate_columns=te(re)):(I.translate_columns=Ve,I.n_translate_columns=te(Ve)),q(v,I,E.queryFout,
!1,E.logfile),!0):!1}async function Ga(t,i,n){let a={},s,e=k(E.popt);return F(a),L(a,"Get matching types"),T(a,`SELECT n\
.nspname as "%s",
  pg_catalog.format_type(t.oid, NULL) AS "%s",
`,"Schema","Name"),i&&(T(a,`  t.typname AS "%s",
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
`,"Internal name","Size","Elements","Owner"),fe(a,"t.typacl"),l(a,`,
  `)),T(a,`  pg_catalog.obj_description(t.oid, 'pg_type') as "%s"
`,"Description"),l(a,`FROM pg_catalog.pg_type t
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
`),l(a,"WHERE (t.typrelid = 0 "),l(a,`OR (SELECT c.relkind = 'c' FROM pg_catalog.pg_class c WHERE c.oid = t.typrelid))
`),(t==o||Qe(t,"[]")==o)&&l(a,`  AND NOT EXISTS(SELECT 1 FROM pg_catalog.pg_type el WHERE el.oid = t.typelem AND el.typa\
rray = t.oid)
`),!n&&t==o&&l(a,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!H(a,On(t),!0,!1,"n.nspname","t.typname","pg_catalog.format_type(t.oid, NULL)","pg_catalog.pg_type_is_visible(t.oid)",
o,3)||(l(a,"ORDER BY 1, 2;"),s=await b(a.data),!s)?!1:(e.title="List of data types",e.translate_header=!0,q(s,e,E.queryFout,
!1,E.logfile),!0)}function On(t){let i=["decimal","numeric","float","double precision","int","integer","bool[]","boolean\
[]","decimal[]","numeric[]","float[]","double precision[]","float4[]","real[]","float8[]","double precision[]","int[]","\
integer[]","int2[]","smallint[]","int4[]","integer[]","int8[]","bigint[]","time[]","time without time zone[]","timetz[]",
"time with time zone[]","timestamp[]","timestamp without time zone[]","timestamptz[]","timestamp with time zone[]","varb\
it[]","bit varying[]","varchar[]","character varying[]",o];if(t==o)return o;for(let n=0;i[n]!=o;n+=2)if(ii(t,i[n])==0)return i[n+
1];return t}async function va(t,i,n,a,s){let e={},c,N=k(E.popt),A=[!1,!1,!1,!1,!1,!1,!0,!1];if(F(e),L(e,"Get matching op\
erators"),T(e,`SELECT n.nspname as "%s",
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
`),!s&&t==o&&l(e,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!H(e,t,!s&&t==o,!0,"n.nspname","o.oprname",o,"pg_catalog.pg_operator_is_visible(o.oid)",o,3))return!1;n==1&&l(e,`  AN\
D o.oprleft = 0
`);for(let m=0;m<n;m++)if(O(i[m],"-")!=0){let p="",S="",D="",f="";if(p=pe("nt%d.nspname",m),S=pe("t%d.typname",m),D=pe("\
pg_catalog.format_type(t%d.oid, NULL)",m),f=pe("pg_catalog.pg_type_is_visible(t%d.oid)",m),!H(e,On(i[m]),!0,!1,p,S,D,f,o,
3))return!1}else T(e,`  AND t%d.typname IS NULL
`,m);return l(e,"ORDER BY 1, 2, 3, 4;"),c=await b(e.data),c?(N.title="List of operators",N.translate_header=!0,N.translate_columns=
A,N.n_translate_columns=te(A),q(c,N,E.queryFout,!1,E.logfile),!0):!1}async function Wa(t,i){let n,a={},s=k(E.popt);return F(
a),L(a,"Get matching databases"),T(a,`SELECT
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
`,"ICU Rules"),l(a,"  "),fe(a,"d.datacl"),i&&T(a,`,
  CASE WHEN pg_catalog.has_database_privilege(d.datname, 'CONNECT')
       %s       THEN pg_catalog.pg_size_pretty(pg_catalog.pg_database_size(d.datname))
       ELSE 'No Access'
  END as "%s",
  t.spcname as "%s",
  pg_catalog.shobj_description(d.oid, 'pg_database') as "%s"`,E.sversion>=1e5?`OR pg_catalog.pg_has_role('pg_read_all_st\
ats', 'USAGE')
`:"","Size","Tablespace","Description"),l(a,`
FROM pg_catalog.pg_database d
`),i&&l(a,`  JOIN pg_catalog.pg_tablespace t on d.dattablespace = t.oid
`),t!=o&&!H(a,t,!1,!1,o,"d.datname",o,o,o,1)||(l(a,"ORDER BY 1;"),n=await b(a.data),!n)?!1:(s.title="List of databases",
s.translate_header=!0,q(n,s,E.queryFout,!1,E.logfile),!0)}async function Vn(t,i){let n={},a,s=k(E.popt),e=[!1,!1,!0,!1,!1,
!1];return F(n),L(n,"Get access privileges of matching relations"),T(n,`SELECT n.nspname as "%s",
  c.relname as "%s",
  CASE c.relkind WHEN 'r' THEN '%s' WHEN 'v' THEN '%s' WHEN 'm' THEN '%s' WHEN 'S' THEN '%s' WHEN 'f' THEN '%s' WHEN 'p'\
 THEN '%s' END as "%s",
  `,"Schema","Name","table","view","materialized view","sequence","foreign table","partitioned table","Type"),fe(n,"c.re\
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
`),!i&&t==o&&l(n,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!H(n,t,!0,!1,"n.nspname","c.relname",o,"pg_catalog.pg_table_is_visible(c.oid)",o,3)||(l(n,"ORDER BY 1, 2;"),a=await b(
n.data),!a)?!1:(h(n,"Access privileges"),s.title=n.data,s.translate_header=!0,s.translate_columns=e,s.n_translate_columns=
te(e),q(a,s,E.queryFout,!1,E.logfile),!0)}async function xa(t){let i={},n,a=k(E.popt),s=[!1,!1,!0,!1];return F(i),L(i,"G\
et matching default ACLs"),T(i,`SELECT pg_catalog.pg_get_userbyid(d.defaclrole) AS "%s",
  n.nspname AS "%s",
  CASE d.defaclobjtype     WHEN '%c' THEN '%s' WHEN '%c' THEN '%s' WHEN '%c' THEN '%s'    WHEN '%c' THEN '%s' WHEN '%c' \
THEN '%s' WHEN '%c' THEN '%s' END AS "%s",
  `,"Owner","Schema","r","table","S","sequence","f","function","T","type","n","schema","L","large object","Type"),fe(i,"\
d.defaclacl"),l(i,`
FROM pg_catalog.pg_default_acl d
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = d.defaclnamespace
`),!H(i,t,!1,!1,o,"n.nspname","pg_catalog.pg_get_userbyid(d.defaclrole)",o,o,3)||(l(i,"ORDER BY 1, 2, 3;"),n=await b(i.data),
!n)?!1:(h(i,"Default access privileges"),a.title=i.data,a.translate_header=!0,a.translate_columns=s,a.n_translate_columns=
te(s),q(n,a,E.queryFout,!1,E.logfile),!0)}async function Ba(t,i){let n={},a,s=k(E.popt),e=[!1,!1,!0,!1];return F(n),L(n,
"Get matching object comments"),T(n,`SELECT DISTINCT tt.nspname AS "%s", tt.name AS "%s", tt.object AS "%s", d.descripti\
on AS "%s"
FROM (
`,"Schema","Name","Object","Description"),T(n,`  SELECT pgc.oid as oid, pgc.tableoid AS tableoid,
  n.nspname as nspname,
  CAST(pgc.conname AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_constraint pgc
    JOIN pg_catalog.pg_class c ON c.oid = pgc.conrelid
    LEFT JOIN pg_catalog.pg_namespace n     ON n.oid = c.relnamespace
`,"table constraint"),!i&&t==o&&l(n,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!H(n,t,!i&&t==o,!1,"n.nspname","pgc.conname",o,"pg_catalog.pg_table_is_visible(c.oid)",o,3)||(T(n,`UNION ALL
  SELECT pgc.oid as oid, pgc.tableoid AS tableoid,
  n.nspname as nspname,
  CAST(pgc.conname AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_constraint pgc
    JOIN pg_catalog.pg_type t ON t.oid = pgc.contypid
    LEFT JOIN pg_catalog.pg_namespace n     ON n.oid = t.typnamespace
`,"domain constraint"),!i&&t==o&&l(n,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!H(n,t,!i&&t==o,!1,"n.nspname","pgc.conname",o,"pg_catalog.pg_type_is_visible(t.oid)",o,3))||(T(n,`UNION ALL
  SELECT o.oid as oid, o.tableoid as tableoid,
  n.nspname as nspname,
  CAST(o.opcname AS pg_catalog.text) as name,
  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_opclass o
    JOIN pg_catalog.pg_am am ON o.opcmethod = am.oid
    JOIN pg_catalog.pg_namespace n ON n.oid = o.opcnamespace
`,"operator class"),!i&&t==o&&l(n,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!H(n,t,!0,!1,"n.nspname","o.opcname",o,"pg_catalog.pg_opclass_is_visible(o.oid)",o,3))||(T(n,`UNION ALL
  SELECT opf.oid as oid, opf.tableoid as tableoid,
  n.nspname as nspname,
  CAST(opf.opfname AS pg_catalog.text) AS name,
  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_opfamily opf
    JOIN pg_catalog.pg_am am ON opf.opfmethod = am.oid
    JOIN pg_catalog.pg_namespace n ON opf.opfnamespace = n.oid
`,"operator family"),!i&&t==o&&l(n,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!H(n,t,!0,!1,"n.nspname","opf.opfname",o,"pg_catalog.pg_opfamily_is_visible(opf.oid)",o,3))||(T(n,`UNION ALL
  SELECT r.oid as oid, r.tableoid as tableoid,
  n.nspname as nspname,
  CAST(r.rulename AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_rewrite r
       JOIN pg_catalog.pg_class c ON c.oid = r.ev_class
       LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
  WHERE r.rulename != '_RETURN'
`,"rule"),!i&&t==o&&l(n,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!H(n,t,!0,!1,"n.nspname","r.rulename",o,"pg_catalog.pg_table_is_visible(c.oid)",o,3))||(T(n,`UNION ALL
  SELECT t.oid as oid, t.tableoid as tableoid,
  n.nspname as nspname,
  CAST(t.tgname AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_trigger t
       JOIN pg_catalog.pg_class c ON c.oid = t.tgrelid
       LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
`,"trigger"),!i&&t==o&&l(n,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!H(n,t,!i&&t==o,!1,"n.nspname","t.tgname",o,"pg_catalog.pg_table_is_visible(c.oid)",o,3))||(l(n,`) AS tt
  JOIN pg_catalog.pg_description d ON (tt.oid = d.objoid AND tt.tableoid = d.classoid AND d.objsubid = 0)
`),l(n,"ORDER BY 1, 2, 3;"),a=await b(n.data),!a)?!1:(s.title="Object descriptions",s.translate_header=!0,s.translate_columns=
e,s.n_translate_columns=te(e),q(a,s,E.queryFout,!1,E.logfile),!0)}async function Ya(t,i,n){let a={},s,e;if(F(a),L(a,"Get\
 matching relations to describe"),l(a,`SELECT c.oid,
  n.nspname,
  c.relname
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
`),!n&&t==o&&l(a,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!H(a,t,!n&&t==o,!1,"n.nspname","c.relname",o,"pg_catalog.pg_table_is_visible(c.oid)",o,3)||(l(a,"ORDER BY 2, 3;"),s=await b(
a.data),!s))return!1;if(Y(s)==0)return E.quiet||(t!=o?M('Did not find any relation named "%s".',t):M("Did not find any r\
elations.")),!1;for(e=0;e<Y(s);e++){let c,N,A;if(c=_(s,e,0),N=_(s,e,1),A=_(s,e,2),!await qa(N,A,c,i)||ae)return!1}return!0}
async function qa(t,i,n,a){let s=!1,e={},c=o,N=tn(E.popt.topt),A={},m=!1,p,S=o,D=[],f={},v={},I,re=-1,Ve=-1,X=-1,Xe=-1,je=-1,
Je=-1,Ke=-1,rn=-1,ln=-1,En=-1,cn=-1,pn=-1,Tn=-1,Rn=-1,Cn,d={},_n=!1;if(N.default_footer=!1,N.expanded=!1,F(e),F(f),F(v),
L(e,"Get general information about one relation"),E.sversion>=12e4?T(e,`SELECT c.relchecks, c.relkind, c.relhasindex, c.\
relhasrules, c.relhastriggers, c.relrowsecurity, c.relforcerowsecurity, false AS relhasoids, c.relispartition, %s, c.rel\
tablespace, CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersistenc\
e, c.relreplident, am.amname
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
`:"''",n),c=await b(e.data),!c)return s;if(Y(c)==0)return E.quiet||M("Did not find any relation with OID %s.",n),s;if(d.
checks=ia(_(c,0,0)),d.relkind=_(c,0,1)[0],d.hasindex=O(_(c,0,2),"t")==0,d.hasrules=O(_(c,0,3),"t")==0,d.hastriggers=O(_(
c,0,4),"t")==0,d.rowsecurity=O(_(c,0,5),"t")==0,d.forcerowsecurity=O(_(c,0,6),"t")==0,d.hasoids=O(_(c,0,7),"t")==0,d.ispartition=
O(_(c,0,8),"t")==0,d.reloptions=_(c,0,9),d.tablespace=bn(_(c,0,10)),d.reloftype=O(_(c,0,11),"")!=0?_(c,0,11):o,d.relpersistence=
_(c,0,12)[0],d.relreplident=E.sversion>=90400?_(c,0,13)[0]:"d",E.sversion>=12e4?d.relam=ce(c,0,14)?o:_(c,0,14):d.relam=o,
c=o,d.relkind=="S"){let R=o,C=k(E.popt),w=[o,o,o];if(L(e,"Get sequence information"),E.sversion>=1e5?(T(e,`SELECT pg_cat\
alog.format_type(seqtypid, NULL) AS "%s",
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
`,"Type","Start","Minimum","Maximum","Increment","yes","no","Cycles?","Cache"),T(e,"FROM %s",We(t)),T(e,".%s;",We(i))),c=
await b(e.data),!c)return s;if(L(e,"Get the column that owns this sequence"),T(e,`SELECT pg_catalog.quote_ident(nspname)\
 || '.' ||
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
 AND d.deptype IN ('a', 'i')`,n),R=await b(e.data),R){if(Y(R)==1)switch(_(R,0,1)[0]){case"a":w[0]=fn("Owned by: %s",_(R,
0,0));break;case"i":w[0]=fn("Sequence for identity column: %s",_(R,0,0));break}}else return s;if(E.sversion>=19e4&&(L(e,
"Get publications containing this sequence"),T(e,`SELECT pubname FROM pg_catalog.pg_publication p
WHERE p.puballsequences
 AND pg_catalog.pg_relation_is_publishable('%s')
ORDER BY 1`,n),R=await b(e.data),R)){let x=Y(R);if(x>0){for(h(v,"Included in publications:"),p=0;p<x;p++)T(v,`
    "%s"`,_(R,p,0));w[0]==o?w[0]=v.data:w[1]=v.data,Nn(v)}}return d.relpersistence=="u"?h(f,'Unlogged sequence "%s.%s"',
t,i):h(f,'Sequence "%s.%s"',t,i),C.footers=w,C.topt.default_footer=!1,C.title=f.data,C.translate_header=!0,q(c,C,E.queryFout,
!1,E.logfile),s=!0,s}if((d.relkind=="r"||d.relkind=="v"||d.relkind=="m"||d.relkind=="f"||d.relkind=="c"||d.relkind=="p")&&
(_n=!0),I=0,L(e,"Get per-column information for one relation"),l(e,"SELECT a.attname"),re=I++,l(e,`,
  pg_catalog.format_type(a.atttypid, a.atttypmod)`),Ve=I++,_n&&(l(e,`,
  (SELECT pg_catalog.pg_get_expr(d.adbin, d.adrelid, true)
   FROM pg_catalog.pg_attrdef d
   WHERE d.adrelid = a.attrelid AND d.adnum = a.attnum AND a.atthasdef),
  a.attnotnull`),X=I++,Xe=I++,l(e,`,
  (SELECT c.collname FROM pg_catalog.pg_collation c, pg_catalog.pg_type t
   WHERE c.oid = a.attcollation AND t.oid = a.atttypid AND a.attcollation <> t.typcollation) AS attcollation`),je=I++,E.
sversion>=1e5?l(e,`,
  a.attidentity`):l(e,`,
  ''::pg_catalog.char AS attidentity`),Je=I++,E.sversion>=12e4?l(e,`,
  a.attgenerated`):l(e,`,
  ''::pg_catalog.char AS attgenerated`),Ke=I++),(d.relkind=="i"||d.relkind=="I")&&(E.sversion>=11e4&&(T(e,`,
  CASE WHEN a.attnum <= (SELECT i.indnkeyatts FROM pg_catalog.pg_index i WHERE i.indexrelid = '%s') THEN '%s' ELSE '%s' \
END AS is_key`,n,"yes","no"),rn=I++),l(e,`,
  pg_catalog.pg_get_indexdef(a.attrelid, a.attnum, TRUE) AS indexdef`),ln=I++),d.relkind=="f"&&(l(e,`,
  CASE WHEN attfdwoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT pg_catalog.quote_ident(o\
ption_name) || ' ' || pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(attfdwoptions)), ', \
') || ')' END AS attfdwoptions`),En=I++),a&&(l(e,`,
  a.attstorage`),cn=I++,E.sversion>=14e4&&!E.hide_compression&&(d.relkind=="r"||d.relkind=="p"||d.relkind=="m")&&(l(e,`,\

  a.attcompression AS attcompression`),pn=I++),(d.relkind=="r"||d.relkind=="i"||d.relkind=="I"||d.relkind=="m"||d.relkind==
"f"||d.relkind=="p")&&(l(e,`,
  CASE WHEN a.attstattarget=-1 THEN NULL ELSE a.attstattarget END AS attstattarget`),Tn=I++),(d.relkind=="r"||d.relkind==
"v"||d.relkind=="m"||d.relkind=="f"||d.relkind=="c"||d.relkind=="p")&&(l(e,`,
  pg_catalog.col_description(a.attrelid, a.attnum)`),Rn=I++)),l(e,`
FROM pg_catalog.pg_attribute a`),T(e,`
WHERE a.attrelid = '%s' AND a.attnum > 0 AND NOT a.attisdropped`,n),l(e,`
ORDER BY a.attnum;`),c=await b(e.data),!c)return s;switch(Cn=Y(c),d.relkind){case"r":d.relpersistence=="u"?h(f,'Unlogged\
 table "%s.%s"',t,i):h(f,'Table "%s.%s"',t,i);break;case"v":h(f,'View "%s.%s"',t,i);break;case"m":h(f,'Materialized view\
 "%s.%s"',t,i);break;case"i":d.relpersistence=="u"?h(f,'Unlogged index "%s.%s"',t,i):h(f,'Index "%s.%s"',t,i);break;case"\
I":d.relpersistence=="u"?h(f,'Unlogged partitioned index "%s.%s"',t,i):h(f,'Partitioned index "%s.%s"',t,i);break;case"t":
h(f,'TOAST table "%s.%s"',t,i);break;case"c":h(f,'Composite type "%s.%s"',t,i);break;case"f":h(f,'Foreign table "%s.%s"',
t,i);break;case"p":d.relpersistence=="u"?h(f,'Unlogged partitioned table "%s.%s"',t,i):h(f,'Partitioned table "%s.%s"',t,
i);break;default:h(f,'?%c? "%s.%s"',d.relkind,t,i);break}for(I=0,D[I++]="Column",D[I++]="Type",_n&&(D[I++]="Collation",D[I++]=
"Nullable",D[I++]="Default"),rn>=0&&(D[I++]="Key?"),ln>=0&&(D[I++]="Definition"),En>=0&&(D[I++]="FDW options"),cn>=0&&(D[I++]=
"Storage"),pn>=0&&(D[I++]="Compression"),Tn>=0&&(D[I++]="Stats target"),Rn>=0&&(D[I++]="Description"),be(I<=te(D)),sn(A,
N,f.data,I,Cn),m=!0,p=0;p<I;p++)Re(A,D[p],!0,"l");for(p=0;p<Cn;p++){if(Q(A,_(c,p,re),!1,!1),Q(A,_(c,p,Ve),!1,!1),_n){let R,
C,w,x=!1;Q(A,_(c,p,je),!1,!1),Q(A,O(_(c,p,Xe),"t")==0?"not null":"",!1,!1),R=_(c,p,Je),C=_(c,p,Ke),R[0]=="a"?w="generate\
d always as identity":R[0]=="d"?w="generated by default as identity":C[0]=="s"?(w=fn("generated always as (%s) stored",_(
c,p,X)),x=!0):C[0]=="v"?(w=fn("generated always as (%s)",_(c,p,X)),x=!0):w=_(c,p,X),Q(A,w,!1,x)}if(rn>=0&&Q(A,_(c,p,rn),
!0,!1),ln>=0&&Q(A,_(c,p,ln),!1,!1),En>=0&&Q(A,_(c,p,En),!1,!1),cn>=0){let R=_(c,p,cn);Q(A,R[0]=="p"?"plain":R[0]=="m"?"m\
ain":R[0]=="x"?"extended":R[0]=="e"?"external":"???",!1,!1)}if(pn>=0){let R=_(c,p,pn);Q(A,R[0]=="p"?"pglz":R[0]=="l"?"lz\
4":R[0]==null?"":"???",!1,!1)}Tn>=0&&Q(A,_(c,p,Tn),!1,!1),Rn>=0&&Q(A,_(c,p,Rn),!1,!1)}if(d.ispartition){let R;if(L(e,"Ge\
t partitioning information for this partition"),l(e,`SELECT inhparent::pg_catalog.regclass,
  pg_catalog.pg_get_expr(c.relpartbound, c.oid),
  `),l(e,E.sversion>=14e4?"inhdetachpending":"false as inhdetachpending"),a&&l(e,`,
  pg_catalog.pg_get_partition_constraintdef(c.oid)`),T(e,`
FROM pg_catalog.pg_class c JOIN pg_catalog.pg_inherits i ON c.oid = inhrelid
WHERE c.oid = '%s';`,n),R=await b(e.data),!R)return s;if(Y(R)>0){let C=_(R,0,0),w=_(R,0,1),x=_(R,0,2);if(h(v,"Partition \
of: %s %s%s",C,w,O(x,"t")==0?" DETACH PENDING":""),G(A,v.data),a){let V=o;ce(R,0,3)||(V=_(R,0,3)),V==o||V[0]==null?h(v,"\
No partition constraint"):h(v,"Partition constraint: %s",V),G(A,v.data)}}}if(d.relkind=="p"){let R;if(L(e,"Get partition\
ing information for this table"),T(e,"SELECT pg_catalog.pg_get_partkeydef('%s'::pg_catalog.oid);",n),R=await b(e.data),!R)
return s;if(Y(R)==1){let C=_(R,0,0);h(v,"Partition key: %s",C),G(A,v.data)}}if(d.relkind=="t"){let R;if(L(e,"Get the tab\
le that owns this TOAST table"),T(e,`SELECT n.nspname, c.relname
FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
WHERE reltoastrelid = '%s';`,n),R=await b(e.data),!R)return s;if(Y(R)==1){let C=_(R,0,0),w=_(R,0,1);h(v,'Owning table: "\
%s.%s"',C,w),G(A,v.data)}}if(d.relkind=="i"||d.relkind=="I"){let R;if(L(e,"Get index details"),l(e,`SELECT i.indisunique\
, i.indisprimary, i.indisclustered, i.indisvalid,
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
AND i.indrelid = c2.oid;`,n),R=await b(e.data),R){if(Y(R)!=1)return s;{let C=_(R,0,0),w=_(R,0,1),x=_(R,0,2),V=_(R,0,3),se=_(
R,0,4),De=_(R,0,5),Ae=_(R,0,6),ze=_(R,0,7),Ft=_(R,0,8),yt=_(R,0,9),Qn=_(R,0,10);O(w,"t")==0?h(v,"primary key, "):O(C,"t")==
0?O(ze,"t")==0?h(v,"unique nulls not distinct, "):h(v,"unique, "):Nn(v),T(v,'%s, for table "%s.%s"',Ft,t,yt),Ge(Qn)&&T(v,
", predicate (%s)",Qn),O(x,"t")==0&&l(v,", clustered"),O(V,"t")!=0&&l(v,", invalid"),O(se,"t")==0&&l(v,", deferrable"),O(
De,"t")==0&&l(v,", initially deferred"),O(Ae,"t")==0&&l(v,", replica identity"),G(A,v.data),d.relkind=="i"&&await un(A,d.
relkind,d.tablespace,!0)}}else return s}else if(d.relkind=="r"||d.relkind=="m"||d.relkind=="f"||d.relkind=="p"||d.relkind==
"I"||d.relkind=="t"){let R=o,C=0;if(d.hasindex){if(L(e,"Get indexes for this table"),l(e,`SELECT c2.relname, i.indisprim\
ary, i.indisunique, i.indisclustered, i.indisvalid, pg_catalog.pg_get_indexdef(i.indexrelid, 0, true),
  pg_catalog.pg_get_constraintdef(con.oid, true), contype, condeferrable, condeferred`),E.sversion>=90400?l(e,", i.indis\
replident"):l(e,", false AS indisreplident"),l(e,", c2.reltablespace"),E.sversion>=18e4?l(e,", con.conperiod"):l(e,", fa\
lse AS conperiod"),T(e,`
FROM pg_catalog.pg_class c, pg_catalog.pg_class c2, pg_catalog.pg_index i
  LEFT JOIN pg_catalog.pg_constraint con ON (conrelid = i.indrelid AND conindid = i.indexrelid AND contype IN ('p','u','\
x'))
WHERE c.oid = '%s' AND c.oid = i.indrelid AND i.indexrelid = c2.oid
ORDER BY i.indisprimary DESC, c2.relname;`,n),R=await b(e.data),R)C=Y(R);else return s;if(C>0)for(G(A,"Indexes:"),p=0;p<
C;p++){if(h(e,'    "%s"',_(R,p,0)),O(_(R,p,7),"x")==0||O(_(R,p,12),"t")==0)T(e," %s",_(R,p,6));else{let w,x;O(_(R,p,1),"\
t")==0?l(e," PRIMARY KEY,"):O(_(R,p,2),"t")==0&&(O(_(R,p,7),"u")==0?l(e," UNIQUE CONSTRAINT,"):l(e," UNIQUE,")),w=_(R,p,
5),x=Qe(w," USING "),x!=o&&(w=x.slice(7)),T(e," %s",w),O(_(R,p,8),"t")==0&&l(e," DEFERRABLE"),O(_(R,p,9),"t")==0&&l(e," \
INITIALLY DEFERRED")}O(_(R,p,3),"t")==0&&l(e," CLUSTER"),O(_(R,p,4),"t")!=0&&l(e," INVALID"),O(_(R,p,10),"t")==0&&l(e," \
REPLICA IDENTITY"),G(A,e.data),await un(A,"i",bn(_(R,p,11)),!1)}}if(d.checks){if(L(e,"Get check constraints for this tab\
le"),T(e,`SELECT r.conname, pg_catalog.pg_get_constraintdef(r.oid, true)
FROM pg_catalog.pg_constraint r
WHERE r.conrelid = '%s' AND r.contype = 'c'
ORDER BY 1;`,n),R=await b(e.data),R)C=Y(R);else return s;if(C>0)for(G(A,"Check constraints:"),p=0;p<C;p++)h(e,'    "%s" \
%s',_(R,p,0),_(R,p,1)),G(A,e.data)}if(L(e,"Get foreign key constraints for this table"),E.sversion>=12e4&&(d.ispartition||
d.relkind=="p")?T(e,`SELECT conrelid = '%s'::pg_catalog.regclass AS sametable,
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
`),l(e,"ORDER BY conname")),R=await b(e.data),R)C=Y(R);else return s;if(C>0){let w=Me(R,"sametable"),x=Me(R,"conname"),V=Me(
R,"condef"),se=Me(R,"ontable");for(G(A,"Foreign-key constraints:"),p=0;p<C;p++)O(_(R,p,w),"f")==0?h(e,'    TABLE "%s" CO\
NSTRAINT "%s" %s',_(R,p,se),_(R,p,x),_(R,p,V)):h(e,'    "%s" %s',_(R,p,x),_(R,p,V)),G(A,e.data)}if(L(e,"Get foreign keys\
 referencing this table"),E.sversion>=12e4?T(e,`SELECT conname, conrelid::pg_catalog.regclass AS ontable,
       pg_catalog.pg_get_constraintdef(oid, true) AS condef
  FROM pg_catalog.pg_constraint c
 WHERE confrelid IN (SELECT pg_catalog.pg_partition_ancestors('%s')
                     UNION ALL VALUES ('%s'::pg_catalog.regclass))
       AND contype = 'f' AND conparentid = 0
ORDER BY conname;`,n,n):T(e,`SELECT conname, conrelid::pg_catalog.regclass AS ontable,
       pg_catalog.pg_get_constraintdef(oid, true) AS condef
  FROM pg_catalog.pg_constraint
 WHERE confrelid = %s AND contype = 'f'
ORDER BY conname;`,n),R=await b(e.data),R)C=Y(R);else return s;if(C>0){let w=Me(R,"conname"),x=Me(R,"ontable"),V=Me(R,"c\
ondef");for(G(A,"Referenced by:"),p=0;p<C;p++)h(e,'    TABLE "%s" CONSTRAINT "%s" %s',_(R,p,x),_(R,p,w),_(R,p,V)),G(A,e.
data)}if(E.sversion>=90500){if(L(e,"Get row-level policies for this table"),l(e,"SELECT pol.polname,"),E.sversion>=1e5?l(
e,` pol.polpermissive,
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
WHERE pol.polrelid = '%s' ORDER BY 1;`,n),R=await b(e.data),R)C=Y(R);else return s;for(d.rowsecurity&&!d.forcerowsecurity&&
C>0&&G(A,"Policies:"),d.rowsecurity&&d.forcerowsecurity&&C>0&&G(A,"Policies (forced row security enabled):"),d.rowsecurity&&
!d.forcerowsecurity&&C==0&&G(A,"Policies (row security enabled): (none)"),d.rowsecurity&&d.forcerowsecurity&&C==0&&G(A,"\
Policies (forced row security enabled): (none)"),!d.rowsecurity&&C>0&&G(A,"Policies (row security disabled):"),p=0;p<C;p++)
h(e,'    POLICY "%s"',_(R,p,0)),_(R,p,1)[0]=="f"&&l(e," AS RESTRICTIVE"),ce(R,p,5)||T(e," FOR %s",_(R,p,5)),ce(R,p,2)||T(
e,`
      TO %s`,_(R,p,2)),ce(R,p,3)||T(e,`
      USING (%s)`,_(R,p,3)),ce(R,p,4)||T(e,`
      WITH CHECK (%s)`,_(R,p,4)),G(A,e.data)}if(E.sversion>=14e4){if(L(e,"Get extended statistics for this table"),T(e,`\
SELECT oid, stxrelid::pg_catalog.regclass, stxnamespace::pg_catalog.regnamespace::pg_catalog.text AS nsp, stxname,
pg_catalog.pg_get_statisticsobjdef_columns(oid) AS columns,
  'd' = any(stxkind) AS ndist_enabled,
  'f' = any(stxkind) AS deps_enabled,
  'm' = any(stxkind) AS mcv_enabled,
stxstattarget
FROM pg_catalog.pg_statistic_ext
WHERE stxrelid = '%s'
ORDER BY nsp, stxname;`,n),R=await b(e.data),R)C=Y(R);else return s;if(C>0)for(G(A,"Statistics objects:"),p=0;p<C;p++){let w=!1,
x,V,se,De,Ae;x=O(_(R,p,5),"t")==0,V=O(_(R,p,6),"t")==0,se=O(_(R,p,7),"t")==0,h(e,"    "),T(e,'"%s.%s"',_(R,p,2),_(R,p,3)),
De=x&&V&&se,Ae=x||V||se,Ae&&!De&&(l(e," ("),x&&(l(e,"ndistinct"),w=!0),V&&(T(e,"%sdependencies",w?", ":""),w=!0),se&&T(e,
"%smcv",w?", ":""),$(e,")")),T(e," ON %s FROM %s",_(R,p,4),_(R,p,1)),!ce(R,p,8)&&O(_(R,p,8),"-1")!=0&&T(e,"; STATISTICS \
%s",_(R,p,8)),G(A,e.data)}}else if(E.sversion>=1e5){if(L(e,"Get extended statistics for this table"),l(e,`SELECT oid, st\
xrelid::pg_catalog.regclass, stxnamespace::pg_catalog.regnamespace AS nsp, stxname,
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
ORDER BY 1;`,n),R=await b(e.data),R)C=Y(R);else return s;if(C>0)for(G(A,"Statistics objects:"),p=0;p<C;p++){let w=!1;h(e,
"    "),T(e,'"%s.%s" (',_(R,p,2),_(R,p,3)),O(_(R,p,5),"t")==0&&(l(e,"ndistinct"),w=!0),O(_(R,p,6),"t")==0&&(T(e,"%sdepen\
dencies",w?", ":""),w=!0),O(_(R,p,7),"t")==0&&T(e,"%smcv",w?", ":""),T(e,") ON %s FROM %s",_(R,p,4),_(R,p,1)),O(_(R,p,8),
"-1")!=0&&T(e,"; STATISTICS %s",_(R,p,8)),G(A,e.data)}}if(d.hasrules&&d.relkind!="m"){if(L(e,"Get rules for this relatio\
n"),T(e,`SELECT r.rulename, trim(trailing ';' from pg_catalog.pg_get_ruledef(r.oid, true)), ev_enabled
FROM pg_catalog.pg_rewrite r
WHERE r.ev_class = '%s' ORDER BY 1;`,n),R=await b(e.data),R)C=Y(R);else return s;if(C>0){let w,x;for(x=0;x<4;x++)for(w=!1,
p=0;p<C;p++){let V,se=!1;switch(x){case 0:_(R,p,2)[0]=="O"&&(se=!0);break;case 1:_(R,p,2)[0]=="D"&&(se=!0);break;case 2:
_(R,p,2)[0]=="A"&&(se=!0);break;case 3:_(R,p,2)[0]=="R"&&(se=!0);break}if(se){if(!w){switch(x){case 0:h(e,"Rules:");break;case 1:
h(e,"Disabled rules:");break;case 2:h(e,"Rules firing always:");break;case 3:h(e,"Rules firing on replica only:");break}
G(A,e.data),w=!0}V=_(R,p,1),V=V.slice(12),h(e,"    %s",V),G(A,e.data)}}}}if(E.sversion>=1e5){if(L(e,"Get publications th\
at publish this table"),E.sversion>=15e4?(T(e,`SELECT pubname
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
ORDER BY 1;`,n,n),R=await b(e.data),R)C=Y(R);else return s;for(C>0&&G(A,"Included in publications:"),p=0;p<C;p++)h(e,'  \
  "%s"',_(R,p,0)),ce(R,p,2)||T(e," (%s)",_(R,p,2)),ce(R,p,1)||T(e," WHERE %s",_(R,p,1)),G(A,e.data)}if(E.sversion>=19e4){
if(L(e,"Get publications that exclude this table"),T(e,`SELECT pubname
FROM pg_catalog.pg_publication p
JOIN pg_catalog.pg_publication_rel pr ON p.oid = pr.prpubid
WHERE (pr.prrelid = '%s' OR pr.prrelid = pg_catalog.pg_partition_root('%s'))
AND pr.prexcept
ORDER BY 1;`,n,n),R=await b(e.data),R)C=Y(R);else return s;for(C>0&&G(A,"Excluded from publications:"),p=0;p<C;p++)h(e,'\
    "%s"',_(R,p,0)),G(A,e.data)}if(a){if(L(e,"Get not-null constraints for this table"),T(e,`SELECT c.conname, a.attname\
, c.connoinherit,
  c.conislocal, c.coninhcount <> 0,
  c.convalidated
FROM pg_catalog.pg_constraint c JOIN
  pg_catalog.pg_attribute a ON
    (a.attrelid = c.conrelid AND a.attnum = c.conkey[1])
WHERE c.contype = 'n' AND
  c.conrelid = '%s'::pg_catalog.regclass
ORDER BY a.attnum`,n),R=await b(e.data),R)C=Y(R);else return s;for(C>0&&G(A,"Not-null constraints:"),p=0;p<C;p++){let w=_(
R,p,3)[0]=="t",x=_(R,p,4)[0]=="t",V=_(R,p,5)[0]=="t";h(e,'    "%s" NOT NULL "%s"%s%s',_(R,p,0),_(R,p,1),_(R,p,2)[0]=="t"?
" NO INHERIT":w&&x?" (local, inherited)":x?" (inherited)":"",V?"":" NOT VALID"),G(A,e.data)}}}if((d.relkind=="v"||d.relkind==
"m")&&a){let R;if(L(e,"Get view's definition"),T(e,"SELECT pg_catalog.pg_get_viewdef('%s'::pg_catalog.oid, true);",n),R=
await b(e.data),!R)return s;Y(R)>0&&(S=_(R,0,0))}if(S!=o){let R=o;if(G(A,"View definition:"),G(A,S),d.hasrules){if(L(e,"\
Get rules for this view"),T(e,`SELECT r.rulename, trim(trailing ';' from pg_catalog.pg_get_ruledef(r.oid, true))
FROM pg_catalog.pg_rewrite r
WHERE r.ev_class = '%s' AND r.rulename != '_RETURN' ORDER BY 1;`,n),R=await b(e.data),!R)return s;if(Y(R)>0)for(G(A,"Rul\
es:"),p=0;p<Y(R);p++){let C;C=_(R,p,1),C=C.slice(12),h(e," %s",C),G(A,e.data)}}}if(d.hastriggers){let R,C;if(L(e,"Get tr\
iggers for this relation"),l(e,`SELECT t.tgname, pg_catalog.pg_get_triggerdef(t.oid, true), t.tgenabled, t.tgisinternal,\

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
ORDER BY 1;`),R=await b(e.data),R)C=Y(R);else return s;if(C>0){let w,x;for(x=0;x<=4;x++)for(w=!1,p=0;p<C;p++){let V,se,De,
Ae,ze;switch(Ae=_(R,p,2),ze=_(R,p,3),V=!1,x){case 0:(Ae[0]=="O"||Ae[0]=="t")&&(V=!0);break;case 1:(Ae[0]=="D"||Ae[0]=="f")&&
ze[0]=="f"&&(V=!0);break;case 2:(Ae[0]=="D"||Ae[0]=="f")&&ze[0]=="t"&&(V=!0);break;case 3:Ae[0]=="A"&&(V=!0);break;case 4:
Ae[0]=="R"&&(V=!0);break}if(V!=!1){if(w==!1){switch(x){case 0:h(e,"Triggers:");break;case 1:h(e,"Disabled user triggers:");
break;case 2:h(e,"Disabled internal triggers:");break;case 3:h(e,"Triggers firing always:");break;case 4:h(e,"Triggers f\
iring on replica only:");break}G(A,e.data),w=!0}se=_(R,p,1),De=Qe(se," TRIGGER "),De!=o&&(se=De.slice(9)),h(e,"    %s",se),
ce(R,p,4)||T(e,", ON TABLE %s",_(R,p,4)),G(A,e.data)}}}}if(d.relkind=="r"||d.relkind=="m"||d.relkind=="f"||d.relkind=="p"||
d.relkind=="I"||d.relkind=="t"){let R,C,w;if(R=d.relkind=="p"||d.relkind=="I",d.relkind=="f"){let x;if(L(e,"Get foreign \
server for this table"),T(e,`SELECT s.srvname,
  pg_catalog.array_to_string(ARRAY(
    SELECT pg_catalog.quote_ident(option_name) || ' ' || pg_catalog.quote_literal(option_value)
    FROM pg_catalog.pg_options_to_table(ftoptions)),  ', ')
FROM pg_catalog.pg_foreign_table f,
     pg_catalog.pg_foreign_server s
WHERE f.ftrelid = '%s' AND s.oid = f.ftserver;`,n),C=await b(e.data),C){if(Y(C)!=1)return s}else return s;h(e,"Server: %\
s",_(C,0,0)),G(A,e.data),x=_(C,0,1),x!=o&&x[0]!=null&&(h(e,"FDW options: (%s)",x),G(A,e.data))}if(L(e,"Get inheritance p\
arent tables"),T(e,`SELECT c.oid::pg_catalog.regclass
FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i
WHERE c.oid = i.inhparent AND i.inhrelid = '%s'
  AND c.relkind != 'p' AND c.relkind != 'I'
ORDER BY inhseqno;`,n),C=await b(e.data),C){let x="Inherits";for(w=Y(C),w>0&&(h(e,"%s:",x),G(A,e.data)),p=0;p<w;p++)h(e,
"    %s",_(C,p,0)),G(A,e.data)}else return s;if(L(e,"Get child tables"),E.sversion>=14e4?T(e,`SELECT c.oid::pg_catalog.r\
egclass, c.relkind, inhdetachpending, pg_catalog.pg_get_expr(c.relpartbound, c.oid)
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
ORDER BY c.oid::pg_catalog.regclass::pg_catalog.text;`,n),C=await b(e.data),!C)return s;if(w=Y(C),R&&w==0)h(e,"Number of\
 partitions: %d",w),G(A,e.data);else if(!a)w>0&&(R?h(e,"Number of partitions: %d (Use \\d+ to list them.)",w):h(e,"Numbe\
r of child tables: %d (Use \\d+ to list them.)",w),G(A,e.data));else{let x=R?"Partitions":"Child tables";for(w>0&&(h(e,"\
%s:",x),G(A,e.data)),p=0;p<w;p++){let V=_(C,p,1)[0];h(e,"    %s",_(C,p,0)),ce(C,p,3)||T(e," %s",_(C,p,3)),V=="p"||V=="I"?
l(e,", PARTITIONED"):V=="f"&&l(e,", FOREIGN"),O(_(C,p,2),"t")==0&&l(e," (DETACH PENDING)"),G(A,e.data)}}d.reloftype!=o&&
(h(e,"Typed table of type: %s",d.reloftype),G(A,e.data)),a&&(d.relkind=="r"||d.relkind=="m")&&d.relreplident!="i"&&(O(t,
"pg_catalog")!=0&&d.relreplident!="d"||O(t,"pg_catalog")==0&&d.relreplident!="n")&&(h(e,"%s: %s","Replica Identity",d.relreplident==
"f"?"FULL":d.relreplident=="n"?"NOTHING":"???"),G(A,e.data)),a&&d.relkind!="m"&&d.hasoids&&G(A,"Has OIDs: yes"),await un(
A,d.relkind,d.tablespace,!0),a&&d.relam!=o&&!E.hide_tableam&&(h(e,"Access method: %s",d.relam),G(A,e.data))}return a&&d.
reloptions!=o&&d.reloptions[0]!=null&&(h(e,"%s: %s","Options",d.reloptions),G(A,e.data)),on(A,E.queryFout,!1,E.logfile),
s=!0,s}async function un(t,i,n,a){if((i=="r"||i=="m"||i=="i"||i=="p"||i=="I"||i=="t")&&n!=0){let s=o,e={};if(F(e),L(e,"G\
et tablespace information for this relation"),T(e,`SELECT spcname FROM pg_catalog.pg_tablespace
WHERE oid = '%u';`,n),s=await b(e.data),!s)return;Y(s)>0&&(a?(h(e,'Tablespace: "%s"',_(s,0,0)),G(t,e.data)):(h(e,"%s",t.
footer.data),T(e,', tablespace "%s"',_(s,0,0)),ht(t,e.data)))}}async function Xn(t,i,n){let a={},s,e={},c=tn(E.popt.topt),
N=2,A=0,m,p,S="l",D;if(c.default_footer=!1,F(a),L(a,"Get matching roles"),l(a,`SELECT r.rolname, r.rolsuper, r.rolinheri\
t,
  r.rolcreaterole, r.rolcreatedb, r.rolcanlogin,
  r.rolconnlimit, r.rolvaliduntil`),i&&(l(a,`
, pg_catalog.shobj_description(r.oid, 'pg_authid') AS description`),N++),l(a,`
, r.rolreplication`),E.sversion>=90500&&l(a,`
, r.rolbypassrls`),l(a,`
FROM pg_catalog.pg_roles r
`),!n&&t==o&&l(a,`WHERE r.rolname !~ '^pg_'
`),!H(a,t,!1,!1,o,"r.rolname",o,o,o,1)||(l(a,"ORDER BY 1;"),s=await b(a.data),!s))return!1;for(A=Y(s),D=[],sn(e,c,"List \
of roles",N,A),Re(e,"Role name",!0,S),Re(e,"Attributes",!0,S),i&&Re(e,"Description",!0,S),m=0;m<A;m++)Q(e,_(s,m,0),!1,!1),
Nn(a),O(_(s,m,1),"t")==0&&we(a,"Superuser"),O(_(s,m,2),"t")!=0&&we(a,"No inheritance"),O(_(s,m,3),"t")==0&&we(a,"Create \
role"),O(_(s,m,4),"t")==0&&we(a,"Create DB"),O(_(s,m,5),"t")!=0&&we(a,"Cannot login"),O(_(s,m,i?9:8),"t")==0&&we(a,"Repl\
ication"),E.sversion>=90500&&O(_(s,m,i?10:9),"t")==0&&we(a,"Bypass RLS"),p=ia(_(s,m,6)),p>=0&&(a.len>0&&$(a,`
`),p==0?l(a,"No connections"):T(a,ni("%d connection","%d connections",p),p)),O(_(s,m,7),"")!=0&&(a.len>0&&$(a,`
`),l(a,"Password valid until "),l(a,_(s,m,7))),D[m]=a.data,Q(e,D[m],!1,!1),i&&Q(e,_(s,m,8),!1,!1);return on(e,E.queryFout,
!1,E.logfile),!0}function we(t,i){t.len>0&&l(t,", "),l(t,i)}async function ka(t,i){let n={},a,s=k(E.popt),e={};return F(
n),L(n,"Get per-database and per-role settings"),T(n,`SELECT rolname AS "%s", datname AS "%s",
pg_catalog.array_to_string(setconfig, E'\\n') AS "%s"
FROM pg_catalog.pg_db_role_setting s
LEFT JOIN pg_catalog.pg_database d ON d.oid = setdatabase
LEFT JOIN pg_catalog.pg_roles r ON r.oid = setrole
`,"Role","Database","Settings"),!H(n,t,!1,!1,o,"r.rolname",o,o,e,1)||!H(n,i,e.value,!1,o,"d.datname",o,o,o,1)||(l(n,"ORD\
ER BY 1, 2;"),a=await b(n.data),!a)?!1:(Y(a)==0&&!E.quiet?t!=o&&i!=o?M('Did not find any settings for role "%s" and data\
base "%s".',t,i):t!=o?M('Did not find any settings for role "%s".',t):M("Did not find any settings."):(s.title="List of \
settings",s.translate_header=!0,q(a,s,E.queryFout,!1,E.logfile)),!0)}async function Va(t,i){let n={},a,s=k(E.popt);return F(
n),L(n,"Get matching role grants"),T(n,`SELECT m.rolname AS "%s", r.rolname AS "%s",
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
`),!i&&t==o&&l(n,`WHERE m.rolname !~ '^pg_'
`),!H(n,t,!1,!1,o,"m.rolname",o,o,o,1)||(l(n,`ORDER BY 1, 2, 4;
`),a=await b(n.data),!a)?!1:(s.title="List of role grants",s.translate_header=!0,q(a,s,E.queryFout,!1,E.logfile),!0)}async function jn(t,i,n,a){
let s=J(t,"t")!=o,e=J(t,"i")!=o,c=J(t,"v")!=o,N=J(t,"m")!=o,A=J(t,"s")!=o,m=J(t,"E")!=o,p,S={},D,f=k(E.popt),v,I=[!1,!1,
!0,!1,!1,!1,!1,!1,!1];return p=s+e+c+N+A+m,p==0&&(s=c=N=A=m=!0),F(S),L(S,"Get matching relations"),T(S,`SELECT n.nspname\
 as "%s",
  c.relname as "%s",
  CASE c.relkind WHEN 'r' THEN '%s' WHEN 'v' THEN '%s' WHEN 'm' THEN '%s' WHEN 'i' THEN '%s' WHEN 'S' THEN '%s' WHEN 't'\
 THEN '%s' WHEN 'f' THEN '%s' WHEN 'p' THEN '%s' WHEN 'I' THEN '%s' END as "%s",
  pg_catalog.pg_get_userbyid(c.relowner) as "%s"`,"Schema","Name","table","view","materialized view","index","sequence",
"TOAST table","foreign table","partitioned table","partitioned index","Type","Owner"),v=4,e&&(T(S,`,
  c2.relname as "%s"`,"Table"),v++),n&&(T(S,`,
  CASE c.relpersistence WHEN 'p' THEN '%s' WHEN 't' THEN '%s' WHEN 'u' THEN '%s' END as "%s"`,"permanent","temporary","u\
nlogged","Persistence"),I[v]=!0,E.sversion>=12e4&&!E.hide_tableam&&(s||N||e)&&T(S,`,
  am.amname as "%s"`,"Access method"),T(S,`,
  pg_catalog.pg_size_pretty(pg_catalog.pg_table_size(c.oid)) as "%s",
  pg_catalog.obj_description(c.oid, 'pg_class') as "%s"`,"Size","Description")),l(S,`
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace`),E.sversion>=12e4&&!E.hide_tableam&&(s||N||e)&&l(S,`\

     LEFT JOIN pg_catalog.pg_am am ON am.oid = c.relam`),e&&l(S,`
     LEFT JOIN pg_catalog.pg_index i ON i.indexrelid = c.oid
     LEFT JOIN pg_catalog.pg_class c2 ON i.indrelid = c2.oid`),l(S,`
WHERE c.relkind IN (`),s&&(l(S,"'r','p',"),(a||i!=o)&&l(S,"'t',")),c&&l(S,"'v',"),N&&l(S,"'m',"),e&&l(S,"'i','I',"),A&&l(
S,"'S',"),(a||i!=o)&&l(S,"'s',"),m&&l(S,"'f',"),l(S,"''"),l(S,`)
`),!a&&i==o&&l(S,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname !~ '^pg_toast'
      AND n.nspname <> 'information_schema'
`),!H(S,i,!0,!1,"n.nspname","c.relname",o,"pg_catalog.pg_table_is_visible(c.oid)",o,3)||(l(S,"ORDER BY 1,2;"),D=await b(
S.data),!D)?!1:(Y(D)==0&&!E.quiet?i!=o?p!=1?M('Did not find any relations named "%s".',i):s?M('Did not find any tables n\
amed "%s".',i):e?M('Did not find any indexes named "%s".',i):c?M('Did not find any views named "%s".',i):N?M('Did not fi\
nd any materialized views named "%s".',i):A?M('Did not find any sequences named "%s".',i):m?M('Did not find any foreign \
tables named "%s".',i):Gn('Did not find any ??? named "%s".',i):p!=1?M("Did not find any relations."):s?M("Did not find \
any tables."):e?M("Did not find any indexes."):c?M("Did not find any views."):N?M("Did not find any materialized views."):
A?M("Did not find any sequences."):m?M("Did not find any foreign tables."):Gn("Did not find any ??? relations."):(f.title=
p!=1?"List of relations":s?"List of tables":e?"List of indexes":c?"List of views":N?"List of materialized views":A?"List\
 of sequences":m?"List of foreign tables":"List of ???",f.translate_header=!0,f.translate_columns=I,f.n_translate_columns=
te(I),q(D,f,E.queryFout,!1,E.logfile)),!0)}async function Xa(t,i,n){let a=J(t,"t")!=o,s=J(t,"i")!=o,e=J(t,"n")!=o,c={},N={},
A,m=k(E.popt),p=[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1],S,D=!1;if(E.sversion<1e5){let f="";return M("The server (version %s) doe\
s not support declarative table partitioning.",Ce(E.sversion,!1,f,Ue(f))),!0}return!a&&!s&&(a=s=!0),s&&!a?S="List of par\
titioned indexes":a&&!s?S="List of partitioned tables":(S="List of partitioned relations",D=!0),F(c),L(c,"Get matching p\
artitioned relations"),T(c,`SELECT n.nspname as "%s",
  c.relname as "%s",
  pg_catalog.pg_get_userbyid(c.relowner) as "%s"`,"Schema","Name","Owner"),D&&(T(c,`,
  CASE c.relkind WHEN 'p' THEN '%s' WHEN 'I' THEN '%s' END as "%s"`,"partitioned table","partitioned index","Type"),p[3]=
!0),(e||i!=o)&&T(c,`,
  inh.inhparent::pg_catalog.regclass as "%s"`,"Parent name"),s&&T(c,`,
 c2.oid::pg_catalog.regclass as "%s"`,"Table"),n&&(T(c,`,
  am.amname as "%s"`,"Access method"),e&&T(c,`,
  s.dps as "%s"`,"Leaf partition size"),T(c,`,
  s.tps as "%s"`,"Total size"),T(c,`,
  pg_catalog.obj_description(c.oid, 'pg_class') as "%s"`,"Description")),l(c,`
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace`),s&&l(c,`
     LEFT JOIN pg_catalog.pg_index i ON i.indexrelid = c.oid
     LEFT JOIN pg_catalog.pg_class c2 ON i.indrelid = c2.oid`),(e||i!=o)&&l(c,`
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
WHERE c.relkind IN (`),a&&l(c,"'p',"),s&&l(c,"'I',"),l(c,"''"),l(c,`)
`),l(c,!e&&i==o?` AND NOT c.relispartition
`:""),i==o&&l(c,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname !~ '^pg_toast'
      AND n.nspname <> 'information_schema'
`),!H(c,i,!0,!1,"n.nspname","c.relname",o,"pg_catalog.pg_table_is_visible(c.oid)",o,3)||(T(c,'ORDER BY "Schema", %s%s"Na\
me";',D?'"Type" DESC, ':"",e||i!=o?'"Parent name" NULLS FIRST, ':""),A=await b(c.data),!A)?!1:(F(N),l(N,S),m.title=N.data,
m.translate_header=!0,m.translate_columns=p,m.n_translate_columns=te(p),q(A,m,E.queryFout,!1,E.logfile),!0)}async function ja(t,i,n){
let a={},s,e=k(E.popt);return F(a),L(a,"Get matching procedural languages"),T(a,`SELECT l.lanname AS "%s",
       pg_catalog.pg_get_userbyid(l.lanowner) as "%s",
       l.lanpltrusted AS "%s"`,"Name","Owner","Trusted"),i&&(T(a,`,
       NOT l.lanispl AS "%s",
       l.lanplcallfoid::pg_catalog.regprocedure AS "%s",
       l.lanvalidator::pg_catalog.regprocedure AS "%s",
       l.laninline::pg_catalog.regprocedure AS "%s",
       `,"Internal language","Call handler","Validator","Inline handler"),fe(a,"l.lanacl")),T(a,`,
       d.description AS "%s"
FROM pg_catalog.pg_language l
LEFT JOIN pg_catalog.pg_description d
  ON d.classoid = l.tableoid AND d.objoid = l.oid
  AND d.objsubid = 0
`,"Description"),t!=o&&!H(a,t,!1,!1,o,"l.lanname",o,o,o,2)||(!n&&t==o&&l(a,`WHERE l.lanplcallfoid != 0
`),l(a,"ORDER BY 1;"),s=await b(a.data),!s)?!1:(e.title="List of languages",e.translate_header=!0,q(s,e,E.queryFout,!1,E.
logfile),!0)}async function Ja(t,i,n){let a={},s,e=k(E.popt);return F(a),L(a,"Get matching domains"),T(a,`SELECT n.nspna\
me as "%s",
       t.typname as "%s",
       pg_catalog.format_type(t.typbasetype, t.typtypmod) as "%s",
       (SELECT c.collname FROM pg_catalog.pg_collation c, pg_catalog.pg_type bt
        WHERE c.oid = t.typcollation AND bt.oid = t.typbasetype AND t.typcollation <> bt.typcollation) as "%s",
       CASE WHEN t.typnotnull THEN 'not null' END as "%s",
       t.typdefault as "%s",
       pg_catalog.array_to_string(ARRAY(
         SELECT pg_catalog.pg_get_constraintdef(r.oid, true) FROM pg_catalog.pg_constraint r WHERE t.oid = r.contypid AN\
D r.contype = 'c' ORDER BY r.conname
       ), ' ') as "%s"`,"Schema","Name","Type","Collation","Nullable","Default","Check"),i&&(l(a,`,
  `),fe(a,"t.typacl"),T(a,`,
       d.description as "%s"`,"Description")),l(a,`
FROM pg_catalog.pg_type t
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
`),i&&l(a,`     LEFT JOIN pg_catalog.pg_description d ON d.classoid = t.tableoid AND d.objoid = t.oid AND d.objsubid = 0\

`),l(a,`WHERE t.typtype = 'd'
`),!n&&t==o&&l(a,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!H(a,t,!0,!1,"n.nspname","t.typname",o,"pg_catalog.pg_type_is_visible(t.oid)",o,3)||(l(a,"ORDER BY 1, 2;"),s=await b(
a.data),!s)?!1:(e.title="List of domains",e.translate_header=!0,q(s,e,E.queryFout,!1,E.logfile),!0)}async function Ka(t,i,n){
let a={},s,e=k(E.popt),c=[!1,!1,!1,!1,!0,!1];return F(a),L(a,"Get matching conversions"),T(a,`SELECT n.nspname AS "%s",
       c.conname AS "%s",
       pg_catalog.pg_encoding_to_char(c.conforencoding) AS "%s",
       pg_catalog.pg_encoding_to_char(c.contoencoding) AS "%s",
       CASE WHEN c.condefault THEN '%s'
       ELSE '%s' END AS "%s"`,"Schema","Name","Source","Destination","yes","no","Default?"),i&&T(a,`,
       d.description AS "%s"`,"Description"),l(a,`
FROM pg_catalog.pg_conversion c
     JOIN pg_catalog.pg_namespace n ON n.oid = c.connamespace
`),i&&l(a,`LEFT JOIN pg_catalog.pg_description d ON d.classoid = c.tableoid
          AND d.objoid = c.oid AND d.objsubid = 0
`),l(a,`WHERE true
`),!n&&t==o&&l(a,`  AND n.nspname <> 'pg_catalog'
  AND n.nspname <> 'information_schema'
`),!H(a,t,!0,!1,"n.nspname","c.conname",o,"pg_catalog.pg_conversion_is_visible(c.oid)",o,3)||(l(a,"ORDER BY 1, 2;"),s=await b(
a.data),!s)?!1:(e.title="List of conversions",e.translate_header=!0,e.translate_columns=c,e.n_translate_columns=te(c),q(
s,e,E.queryFout,!1,E.logfile),!0)}async function za(t,i,n){let a={},s,e=k(E.popt);return F(a),L(a,"Get matching configur\
ation parameters"),T(a,'SELECT s.name AS "%s", pg_catalog.current_setting(s.name) AS "%s"',"Parameter","Value"),i&&(T(a,
', s.vartype AS "%s", s.context AS "%s", ',"Type","Context"),E.sversion>=15e4?fe(a,"p.paracl"):T(a,'NULL AS "%s"',"Acces\
s privileges")),l(a,`
FROM pg_catalog.pg_settings s
`),i&&E.sversion>=15e4&&l(a,`  LEFT JOIN pg_catalog.pg_parameter_acl p
  ON pg_catalog.lower(s.name) = p.parname
`),t!=o?Kn(E.db,a,t,!1,!1,o,"pg_catalog.lower(s.name)",o,o,o,o):l(a,`WHERE s.source <> 'default' AND
      s.setting IS DISTINCT FROM s.boot_val
`),l(a,"ORDER BY 1;"),s=await b(a.data),s?(t!=o?e.title="List of configuration parameters":e.title="List of non-default \
configuration parameters",e.translate_header=!0,q(s,e,E.queryFout,!1,E.logfile),!0):!1}async function Qa(t,i){let n={},a,
s=k(E.popt),e=[!1,!1,!1,!0,!1,!1,!1];if(E.sversion<90300){let c="";return M("The server (version %s) does not support ev\
ent triggers.",Ce(E.sversion,!1,c,Ue(c))),!0}return F(n),L(n,"Get matching event triggers"),T(n,`SELECT evtname as "%s",\
 evtevent as "%s", pg_catalog.pg_get_userbyid(e.evtowner) as "%s",
 case evtenabled when 'O' then '%s'  when 'R' then '%s'  when 'A' then '%s'  when 'D' then '%s' end as "%s",
 e.evtfoid::pg_catalog.regproc as "%s", pg_catalog.array_to_string(array(select x from pg_catalog.unnest(evttags) as t(x\
)), ', ') as "%s"`,"Name","Event","Owner","enabled","replica","always","disabled","Enabled","Function","Tags"),i&&T(n,`,\

pg_catalog.obj_description(e.oid, 'pg_event_trigger') as "%s"`,"Description"),l(n,`
FROM pg_catalog.pg_event_trigger e `),!H(n,t,!1,!1,o,"evtname",o,o,o,1)||(l(n,"ORDER BY 1"),a=await b(n.data),!a)?!1:(s.
title="List of event triggers",s.translate_header=!0,s.translate_columns=e,s.n_translate_columns=te(e),q(a,s,E.queryFout,
!1,E.logfile),!0)}async function $a(t,i){let n={},a,s=k(E.popt);if(E.sversion<1e5){let e="";return M("The server (versio\
n %s) does not support extended statistics.",Ce(E.sversion,!1,e,Ue(e))),!0}return F(n),L(n,"Get matching extended statis\
tics"),T(n,`SELECT 
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
END AS "%s" `,"MCV"),i&&T(n,`, 
pg_catalog.obj_description(oid, 'pg_statistic_ext') AS "%s"
`,"Description"),l(n,` 
FROM pg_catalog.pg_statistic_ext es 
`),!H(n,t,!1,!1,"es.stxnamespace::pg_catalog.regnamespace::pg_catalog.text","es.stxname",o,"pg_catalog.pg_statistics_obj\
_is_visible(es.oid)",o,3)||(l(n,"ORDER BY 1, 2;"),a=await b(n.data),!a)?!1:(s.title="List of extended statistics",s.translate_header=
!0,q(a,s,E.queryFout,!1,E.logfile),!0)}async function Za(t,i){let n={},a,s=k(E.popt),e=[!1,!1,!1,!0,!0,!1];return F(n),L(
n,"Get matching casts"),T(n,`SELECT pg_catalog.format_type(castsource, NULL) AS "%s",
       pg_catalog.format_type(casttarget, NULL) AS "%s",
`,"Source type","Target type"),T(n,`       CASE WHEN c.castmethod = '%c' THEN '(binary coercible)'
            WHEN c.castmethod = '%c' THEN '(with inout)'
            ELSE p.proname
       END AS "%s",
`,xt,Bt,"Function"),T(n,`       CASE WHEN c.castcontext = '%c' THEN '%s'
            WHEN c.castcontext = '%c' THEN '%s'
            ELSE '%s'
       END AS "%s"`,Wt,"no",vt,"in assignment","yes","Implicit?"),i&&T(n,`,
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
`),i&&l(n,`     LEFT JOIN pg_catalog.pg_description d
     ON d.classoid = c.tableoid AND d.objoid = c.oid AND d.objsubid = 0
`),l(n,"WHERE ( (true"),!H(n,t,!0,!1,"ns.nspname","ts.typname","pg_catalog.format_type(ts.oid, NULL)","pg_catalog.pg_typ\
e_is_visible(ts.oid)",o,3)||(l(n,") OR (true"),!H(n,t,!0,!1,"nt.nspname","tt.typname","pg_catalog.format_type(tt.oid, NU\
LL)","pg_catalog.pg_type_is_visible(tt.oid)",o,3))||(l(n,`) )
ORDER BY 1, 2;`),a=await b(n.data),!a)?!1:(s.title="List of casts",s.translate_header=!0,s.translate_columns=e,s.n_translate_columns=
te(e),q(a,s,E.queryFout,!1,E.logfile),!0)}async function et(t,i,n){let a={},s,e=k(E.popt),c=[!1,!1,!1,!1,!1,!1,!1,!0,!1];
return F(a),L(a,"Get matching collations"),T(a,`SELECT
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
rministic?"):T(a,`  '%s' AS "%s"`,"yes","Deterministic?"),i&&T(a,`,
  pg_catalog.obj_description(c.oid, 'pg_collation') AS "%s"`,"Description"),l(a,`
FROM pg_catalog.pg_collation c, pg_catalog.pg_namespace n
WHERE n.oid = c.collnamespace
`),!n&&t==o&&l(a,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),l(a,`      AND c.collencoding IN (-1, pg_catalog.pg_char_to_encoding(pg_catalog.getdatabaseencoding()))
`),!H(a,t,!0,!1,"n.nspname","c.collname",o,"pg_catalog.pg_collation_is_visible(c.oid)",o,3)||(l(a,"ORDER BY 1, 2;"),s=await b(
a.data),!s)?!1:(e.title="List of collations",e.translate_header=!0,e.translate_columns=c,e.n_translate_columns=te(c),q(s,
e,E.queryFout,!1,E.logfile),!0)}async function nt(t,i,n){let a={},s,e=k(E.popt),c=0,N=o;if(F(a),L(a,"Get matching schema\
s"),T(a,`SELECT n.nspname AS "%s",
  pg_catalog.pg_get_userbyid(n.nspowner) AS "%s"`,"Name","Owner"),i&&(l(a,`,
  `),fe(a,"n.nspacl"),T(a,`,
  pg_catalog.obj_description(n.oid, 'pg_namespace') AS "%s"`,"Description")),l(a,`
FROM pg_catalog.pg_namespace n
`),!n&&t==o&&l(a,`WHERE n.nspname !~ '^pg_' AND n.nspname <> 'information_schema'
`),!H(a,t,!n&&t==o,!1,o,"n.nspname",o,o,o,2)||(l(a,"ORDER BY 1;"),s=await b(a.data),!s))return!1;if(e.title="List of sch\
emas",e.translate_header=!0,t!=o&&E.sversion>=15e4){let A,m;if(L(a,"Get publications that publish this schema"),T(a,`SEL\
ECT pubname 
FROM pg_catalog.pg_publication p
     JOIN pg_catalog.pg_publication_namespace pn ON p.oid = pn.pnpubid
     JOIN pg_catalog.pg_namespace n ON n.oid = pn.pnnspid 
WHERE n.nspname = '%s'
ORDER BY 1`,t),A=await b(a.data),A)c=Y(A);else return!1;if(c>0){for(N=[],N[0]="Included in publications:",m=0;m<c;m++)h(
a,'    "%s"',_(A,m,0)),N[m+1]=a.data;N[m+1]=o,e.footers=N}}return q(s,e,E.queryFout,!1,E.logfile),!0}async function at(t,i){
let n={},a,s=k(E.popt);return i?await tt(t):(F(n),L(n,"Get matching text search parsers"),T(n,`SELECT
  n.nspname as "%s",
  p.prsname as "%s",
  pg_catalog.obj_description(p.oid, 'pg_ts_parser') as "%s"
FROM pg_catalog.pg_ts_parser p
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.prsnamespace
`,"Schema","Name","Description"),!H(n,t,!1,!1,"n.nspname","p.prsname",o,"pg_catalog.pg_ts_parser_is_visible(p.oid)",o,3)||
(l(n,"ORDER BY 1, 2;"),a=await b(n.data),!a)?!1:(s.title="List of text search parsers",s.translate_header=!0,q(a,s,E.queryFout,
!1,E.logfile),!0))}async function tt(t){let i={},n,a;if(F(i),L(i,"Get matching text search parsers"),l(i,`SELECT p.oid,
  n.nspname,
  p.prsname
FROM pg_catalog.pg_ts_parser p
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.prsnamespace
`),!H(i,t,!1,!1,"n.nspname","p.prsname",o,"pg_catalog.pg_ts_parser_is_visible(p.oid)",o,3)||(l(i,"ORDER BY 1, 2;"),n=await b(
i.data),!n))return!1;if(Y(n)==0)return E.quiet||(t!=o?M('Did not find any text search parser named "%s".',t):M("Did not \
find any text search parsers.")),!1;for(a=0;a<Y(n);a++){let s,e=o,c;if(s=_(n,a,0),ce(n,a,1)||(e=_(n,a,1)),c=_(n,a,2),!await it(
s,e,c)||ae)return!1}return!0}async function it(t,i,n){let a={},s,e={},c=k(E.popt),N=[!0,!1,!1];return F(a),L(a,"Get text\
 search parser details"),T(a,`SELECT '%s' AS "%s",
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
t,"Get token types",t),s=await b(a.data),!s||(F(e),i!=o?h(e,'Text search parser "%s.%s"',i,n):h(e,'Text search parser "%\
s"',n),c.title=e.data,c.footers=o,c.topt.default_footer=!1,c.translate_header=!0,c.translate_columns=N,c.n_translate_columns=
te(N),q(s,c,E.queryFout,!1,E.logfile),F(a),L(a,"Get text search parser token types"),T(a,`SELECT t.alias as "%s",
  t.description as "%s"
FROM pg_catalog.ts_token_type( '%s'::pg_catalog.oid ) as t
ORDER BY 1;`,"Token name","Description",t),s=await b(a.data),!s)?!1:(i!=o?h(e,'Token types for parser "%s.%s"',i,n):h(e,
'Token types for parser "%s"',n),c.title=e.data,c.footers=o,c.topt.default_footer=!0,c.translate_header=!0,c.translate_columns=
o,c.n_translate_columns=0,q(s,c,E.queryFout,!1,E.logfile),!0)}async function st(t,i){let n={},a,s=k(E.popt);return F(n),
L(n,"Get matching text search dictionaries"),T(n,`SELECT
  n.nspname as "%s",
  d.dictname as "%s",
`,"Schema","Name"),i&&T(n,`  ( SELECT COALESCE(nt.nspname, '(null)')::pg_catalog.text || '.' || t.tmplname FROM
    pg_catalog.pg_ts_template t
    LEFT JOIN pg_catalog.pg_namespace nt ON nt.oid = t.tmplnamespace
    WHERE d.dicttemplate = t.oid ) AS  "%s",
  d.dictinitoption as "%s",
`,"Template","Init options"),T(n,`  pg_catalog.obj_description(d.oid, 'pg_ts_dict') as "%s"
`,"Description"),l(n,`FROM pg_catalog.pg_ts_dict d
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = d.dictnamespace
`),!H(n,t,!1,!1,"n.nspname","d.dictname",o,"pg_catalog.pg_ts_dict_is_visible(d.oid)",o,3)||(l(n,"ORDER BY 1, 2;"),a=await b(
n.data),!a)?!1:(s.title="List of text search dictionaries",s.translate_header=!0,q(a,s,E.queryFout,!1,E.logfile),!0)}async function ot(t,i){
let n={},a,s=k(E.popt);return F(n),L(n,"Get matching text search templates"),i?T(n,`SELECT
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
`),!H(n,t,!1,!1,"n.nspname","t.tmplname",o,"pg_catalog.pg_ts_template_is_visible(t.oid)",o,3)||(l(n,"ORDER BY 1, 2;"),a=
await b(n.data),!a)?!1:(s.title="List of text search templates",s.translate_header=!0,q(a,s,E.queryFout,!1,E.logfile),!0)}
async function rt(t,i){let n={},a,s=k(E.popt);return i?await lt(t):(F(n),L(n,"Get matching text search configurations"),
T(n,`SELECT
   n.nspname as "%s",
   c.cfgname as "%s",
   pg_catalog.obj_description(c.oid, 'pg_ts_config') as "%s"
FROM pg_catalog.pg_ts_config c
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.cfgnamespace
`,"Schema","Name","Description"),!H(n,t,!1,!1,"n.nspname","c.cfgname",o,"pg_catalog.pg_ts_config_is_visible(c.oid)",o,3)||
(l(n,"ORDER BY 1, 2;"),a=await b(n.data),!a)?!1:(s.title="List of text search configurations",s.translate_header=!0,q(a,
s,E.queryFout,!1,E.logfile),!0))}async function lt(t){let i={},n,a;if(F(i),L(i,"Get matching text search configurations"),
l(i,`SELECT c.oid, c.cfgname,
   n.nspname,
   p.prsname,
   np.nspname as pnspname
FROM pg_catalog.pg_ts_config c
   LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.cfgnamespace,
 pg_catalog.pg_ts_parser p
   LEFT JOIN pg_catalog.pg_namespace np ON np.oid = p.prsnamespace
WHERE  p.oid = c.cfgparser
`),!H(i,t,!0,!1,"n.nspname","c.cfgname",o,"pg_catalog.pg_ts_config_is_visible(c.oid)",o,3)||(l(i,"ORDER BY 3, 2;"),n=await b(
i.data),!n))return!1;if(Y(n)==0)return E.quiet||(t!=o?M('Did not find any text search configuration named "%s".',t):M("D\
id not find any text search configurations.")),!1;for(a=0;a<Y(n);a++){let s,e,c=o,N,A=o;if(s=_(n,a,0),e=_(n,a,1),ce(n,a,
2)||(c=_(n,a,2)),N=_(n,a,3),ce(n,a,4)||(A=_(n,a,4)),!await Et(s,c,e,A,N)||ae)return!1}return!0}async function Et(t,i,n,a,s){
let e={},c={},N,A=k(E.popt);return F(e),L(e,"Get text search configuration details"),T(e,`SELECT
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
ORDER BY 1;`,"Token","Dictionaries",t),N=await b(e.data),N?(F(c),i!=o?T(c,'Text search configuration "%s.%s"',i,n):T(c,'\
Text search configuration "%s"',n),a!=o?T(c,`
Parser: "%s.%s"`,a,s):T(c,`
Parser: "%s"`,s),A.title=c.data,A.footers=o,A.topt.default_footer=!1,A.translate_header=!0,q(N,A,E.queryFout,!1,E.logfile),
!0):!1}async function ct(t,i){let n={},a,s=k(E.popt);return F(n),L(n,"Get matching foreign-data wrappers"),T(n,`SELECT f\
dw.fdwname AS "%s",
  pg_catalog.pg_get_userbyid(fdw.fdwowner) AS "%s",
  fdw.fdwhandler::pg_catalog.regproc AS "%s",
  fdw.fdwvalidator::pg_catalog.regproc AS "%s"`,"Name","Owner","Handler","Validator"),i&&(l(n,`,
  `),fe(n,"fdwacl"),T(n,`,
 CASE WHEN fdwoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(opt\
ion_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(fdwoptions)),  ', '\
) || ')'   END AS "%s",
  d.description AS "%s" `,"FDW options","Description")),l(n,`
FROM pg_catalog.pg_foreign_data_wrapper fdw
`),i&&l(n,`LEFT JOIN pg_catalog.pg_description d
       ON d.classoid = fdw.tableoid AND d.objoid = fdw.oid AND d.objsubid = 0
`),!H(n,t,!1,!1,o,"fdwname",o,o,o,1)||(l(n,"ORDER BY 1;"),a=await b(n.data),!a)?!1:(s.title="List of foreign-data wrappe\
rs",s.translate_header=!0,q(a,s,E.queryFout,!1,E.logfile),!0)}async function pt(t,i){let n={},a,s=k(E.popt);return F(n),
L(n,"Get matching foreign servers"),T(n,`SELECT s.srvname AS "%s",
  pg_catalog.pg_get_userbyid(s.srvowner) AS "%s",
  f.fdwname AS "%s"`,"Name","Owner","Foreign-data wrapper"),i&&(l(n,`,
  `),fe(n,"s.srvacl"),T(n,`,
  s.srvtype AS "%s",
  s.srvversion AS "%s",
  CASE WHEN srvoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(op\
tion_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(srvoptions)),  ', \
') || ')'   END AS "%s",
  d.description AS "%s"`,"Type","Version","FDW options","Description")),l(n,`
FROM pg_catalog.pg_foreign_server s
     JOIN pg_catalog.pg_foreign_data_wrapper f ON f.oid=s.srvfdw
`),i&&l(n,`LEFT JOIN pg_catalog.pg_description d
       ON d.classoid = s.tableoid AND d.objoid = s.oid AND d.objsubid = 0
`),!H(n,t,!1,!1,o,"s.srvname",o,o,o,1)||(l(n,"ORDER BY 1;"),a=await b(n.data),!a)?!1:(s.title="List of foreign servers",
s.translate_header=!0,q(a,s,E.queryFout,!1,E.logfile),!0)}async function Tt(t,i){let n={},a,s=k(E.popt);return F(n),L(n,
"Get matching user mappings"),T(n,`SELECT um.srvname AS "%s",
  um.usename AS "%s"`,"Server","User name"),i&&T(n,`,
 CASE WHEN umoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(opti\
on_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(umoptions)),  ', ') \
|| ')'   END AS "%s"`,"FDW options"),l(n,`
FROM pg_catalog.pg_user_mappings um
`),!H(n,t,!1,!1,o,"um.srvname","um.usename",o,o,1)||(l(n,"ORDER BY 1, 2;"),a=await b(n.data),!a)?!1:(s.title="List of us\
er mappings",s.translate_header=!0,q(a,s,E.queryFout,!1,E.logfile),!0)}async function Rt(t,i){let n={},a,s=k(E.popt);return F(
n),L(n,"Get matching foreign tables"),T(n,`SELECT n.nspname AS "%s",
  c.relname AS "%s",
  s.srvname AS "%s"`,"Schema","Table","Server"),i&&T(n,`,
 CASE WHEN ftoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(opti\
on_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(ftoptions)),  ', ') \
|| ')'   END AS "%s",
  d.description AS "%s"`,"FDW options","Description"),l(n,`
FROM pg_catalog.pg_foreign_table ft
  INNER JOIN pg_catalog.pg_class c ON c.oid = ft.ftrelid
  INNER JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
  INNER JOIN pg_catalog.pg_foreign_server s ON s.oid = ft.ftserver
`),i&&l(n,`   LEFT JOIN pg_catalog.pg_description d
          ON d.classoid = c.tableoid AND d.objoid = c.oid AND d.objsubid = 0
`),!H(n,t,!1,!1,"n.nspname","c.relname",o,"pg_catalog.pg_table_is_visible(c.oid)",o,3)||(l(n,"ORDER BY 1, 2;"),a=await b(
n.data),!a)?!1:(s.title="List of foreign tables",s.translate_header=!0,q(a,s,E.queryFout,!1,E.logfile),!0)}async function _t(t){
let i={},n,a=k(E.popt);return F(i),L(i,"Get matching installed extensions"),T(i,`SELECT e.extname AS "%s", e.extversion \
AS "%s", ae.default_version AS "%s",n.nspname AS "%s", d.description AS "%s"
FROM pg_catalog.pg_extension e LEFT JOIN pg_catalog.pg_namespace n ON n.oid = e.extnamespace LEFT JOIN pg_catalog.pg_des\
cription d ON d.objoid = e.oid AND d.classoid = 'pg_catalog.pg_extension'::pg_catalog.regclass LEFT JOIN pg_catalog.pg_a\
vailable_extensions() ae(name, default_version, comment) ON ae.name = e.extname
`,"Name","Version","Default version","Schema","Description"),!H(i,t,!1,!1,o,"e.extname",o,o,o,1)||(l(i,"ORDER BY 1;"),n=
await b(i.data),!n)?!1:(a.title="List of installed extensions",a.translate_header=!0,q(n,a,E.queryFout,!1,E.logfile),!0)}
async function At(t){let i={},n,a;if(F(i),L(i,"Get matching installed extensions"),l(i,`SELECT e.extname, e.oid
FROM pg_catalog.pg_extension e
`),!H(i,t,!1,!1,o,"e.extname",o,o,o,1)||(l(i,"ORDER BY 1;"),n=await b(i.data),!n))return!1;if(Y(n)==0)return E.quiet||(t!=
o?M('Did not find any extension named "%s".',t):M("Did not find any extensions.")),!1;for(a=0;a<Y(n);a++){let s,e;if(s=_(
n,a,0),e=_(n,a,1),!await gt(s,e)||ae)return!1}return!0}async function gt(t,i){let n={},a,s={},e=k(E.popt);return F(n),L(
n,"Get installed extension's contents"),T(n,`SELECT pg_catalog.pg_describe_object(classid, objid, 0) AS "%s"
FROM pg_catalog.pg_depend
WHERE refclassid = 'pg_catalog.pg_extension'::pg_catalog.regclass AND refobjid = '%s' AND deptype = 'e'
ORDER BY 1;`,"Object description",i),a=await b(n.data),a?(F(s),h(s,'Objects in extension "%s"',t),e.title=s.data,e.translate_header=
!0,q(a,e,E.queryFout,!1,E.logfile),!0):!1}function H(t,i,n,a,s,e,c,N,A,m){let p={},S={},D;if(F(p),D=Kn(E.db,t,i,n,a,s,e,
c,N,p,S),A!=o&&(A.value=D),S.value>=m)return M("improper qualified name (too many dotted names): %s",i),!1;if(m>1&&S.value==
m-1){if(sa(E.db)==o)return M("You are currently not connected to a database."),!1;if(O(sa(E.db),p.data)!=0)return M("cro\
ss-database references are not implemented: %s",i),!1}return!0}async function Nt(t){let i={},n,a=k(E.popt),s=[!1,!1,!1,!1,
!1,!1,!1,!1,!1,!1];if(E.sversion<1e5){let e="";return M("The server (version %s) does not support publications.",Ce(E.sversion,
!1,e,Ue(e))),!0}return F(i),L(i,"Get matching publications"),T(i,`SELECT pubname AS "%s",
  pg_catalog.pg_get_userbyid(pubowner) AS "%s",
  puballtables AS "%s"`,"Name","Owner","All tables"),E.sversion>=19e4&&T(i,`,
  puballsequences AS "%s"`,"All sequences"),T(i,`,
  pubinsert AS "%s",
  pubupdate AS "%s",
  pubdelete AS "%s"`,"Inserts","Updates","Deletes"),E.sversion>=11e4&&T(i,`,
  pubtruncate AS "%s"`,"Truncates"),E.sversion>=18e4&&T(i,`,
 (CASE pubgencols
    WHEN '%c' THEN 'none'
    WHEN '%c' THEN 'stored'
   END) AS "%s"`,ea,na,"Generated columns"),E.sversion>=13e4&&T(i,`,
  pubviaroot AS "%s"`,"Via root"),l(i,`
FROM pg_catalog.pg_publication
`),!H(i,t,!1,!1,o,"pubname",o,o,o,1)||(l(i,"ORDER BY 1;"),n=await b(i.data),!n)?!1:(a.title="List of publications",a.translate_header=
!0,a.translate_columns=s,a.n_translate_columns=te(s),q(n,a,E.queryFout,!1,E.logfile),!0)}async function Ln(t,i,n,a){let s,
e=0,c=0;if(s=await b(t.data),s)e=Y(s);else return!1;for(e>0&&G(a,i),c=0;c<e;c++)n?h(t,'    "%s"',_(s,c,0)):(h(t,'    "%s\
.%s"',_(s,c,0),_(s,c,1)),ce(s,c,3)||T(t," (%s)",_(s,c,3)),ce(s,c,2)||T(t," WHERE %s",_(s,c,2))),G(a,t.data);return!0}async function ft(t){
let i={},n,a,s,e,c,N,A=6,m=1,p={},S={};if(E.sversion<1e5){let D="";return M("The server (version %s) does not support pu\
blications.",Ce(E.sversion,!1,D,Ue(D))),!0}if(N=E.sversion>=19e4,s=E.sversion>=11e4,e=E.sversion>=18e4,c=E.sversion>=13e4,
F(i),L(i,"Get details about matching publications"),l(i,`SELECT oid, pubname,
  pg_catalog.pg_get_userbyid(pubowner) AS owner,
  puballtables`),N?l(i,", puballsequences"):l(i,", false AS puballsequences"),l(i,", pubinsert, pubupdate, pubdelete"),s?
l(i,", pubtruncate"):l(i,", false AS pubtruncate"),e?T(i,`, (CASE pubgencols
    WHEN '%c' THEN 'none'
    WHEN '%c' THEN 'stored'
   END) AS "%s"
`,ea,na,"Generated columns"):l(i,", 'none' AS pubgencols"),c?l(i,", pubviaroot"):l(i,", false AS pubviaroot"),l(i,", pg_\
catalog.obj_description(oid, 'pg_publication')"),l(i,`
FROM pg_catalog.pg_publication
`),!H(i,t,!1,!1,o,"pubname",o,o,o,1)||(l(i,"ORDER BY 2;"),a=await b(i.data),!a))return!1;if(Y(a)==0)return E.quiet||(t!=
o?M('Did not find any publication named "%s".',t):M("Did not find any publications.")),!1;for(N&&A++,s&&A++,e&&A++,c&&A++,
n=0;n<Y(a);n++){let D="l",f=_(a,n,0),v=_(a,n,1),I=O(_(a,n,3),"t")==0,re=tn(E.popt.topt);if(F(p),h(p,"Publication %s",v),
sn(S,re,p.data,A,m),Re(S,"Owner",!0,D),Re(S,"All tables",!0,D),N&&Re(S,"All sequences",!0,D),Re(S,"Inserts",!0,D),Re(S,"\
Updates",!0,D),Re(S,"Deletes",!0,D),s&&Re(S,"Truncates",!0,D),e&&Re(S,"Generated columns",!0,D),c&&Re(S,"Via root",!0,D),
Re(S,"Description",!0,D),Q(S,_(a,n,2),!1,!1),Q(S,_(a,n,3),!1,!1),N&&Q(S,_(a,n,4),!1,!1),Q(S,_(a,n,5),!1,!1),Q(S,_(a,n,6),
!1,!1),Q(S,_(a,n,7),!1,!1),s&&Q(S,_(a,n,8),!1,!1),e&&Q(S,_(a,n,9),!1,!1),c&&Q(S,_(a,n,10),!1,!1),Q(S,_(a,n,11),!1,!1),I){
if(E.sversion>=19e4&&(L(i,"Get tables excluded by this publication"),T(i,`SELECT n.nspname || '.' || c.relname
FROM pg_catalog.pg_class c
     JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
     JOIN pg_catalog.pg_publication_rel pr ON c.oid = pr.prrelid
WHERE pr.prpubid = '%s' AND pr.prexcept
ORDER BY 1`,f),!await Ln(i,"Except tables:",!0,S)))return!1}else if(L(i,"Get tables published by this publication"),l(i,
"SELECT n.nspname, c.relname"),E.sversion>=15e4?(l(i,", pg_catalog.pg_get_expr(pr.prqual, c.oid)"),l(i,`, (CASE WHEN pr.\
prattrs IS NOT NULL THEN
     pg_catalog.array_to_string(      ARRAY(SELECT attname
              FROM
                pg_catalog.generate_series(0, pg_catalog.array_upper(pr.prattrs::pg_catalog.int2[], 1)) s,
                pg_catalog.pg_attribute
        WHERE attrelid = c.oid AND attnum = prattrs[s]), ', ')
       ELSE NULL END)`)):l(i,", NULL, NULL"),T(i,`
FROM pg_catalog.pg_class c,
     pg_catalog.pg_namespace n,
     pg_catalog.pg_publication_rel pr
WHERE c.relnamespace = n.oid
  AND c.oid = pr.prrelid
  AND pr.prpubid = '%s'
`,f),E.sversion>=19e4&&l(i,`  AND NOT pr.prexcept
`),l(i,"ORDER BY 1,2"),!await Ln(i,"Tables:",!1,S)||E.sversion>=15e4&&(L(i,"Get schemas published by this publication"),
T(i,`SELECT n.nspname
FROM pg_catalog.pg_namespace n
     JOIN pg_catalog.pg_publication_namespace pn ON n.oid = pn.pnnspid
WHERE pn.pnpubid = '%s'
ORDER BY 1`,f),!await Ln(i,"Tables from schemas:",!0,S)))return!1;on(S,E.queryFout,!1,E.logfile)}return!0}async function mt(t,i){
let n={},a,s=k(E.popt),e=[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1];if(E.sversion<1e5){let c="";return M(
"The server (version %s) does not support subscriptions.",Ce(E.sversion,!1,c,Ue(c))),!0}return F(n),L(n,"Get matching su\
bscriptions"),T(n,`SELECT subname AS "%s"
,  pg_catalog.pg_get_userbyid(subowner) AS "%s"
,  subenabled AS "%s"
,  subpublications AS "%s"
`,"Name","Owner","Enabled","Publication"),i&&(E.sversion>=14e4&&(T(n,`, subbinary AS "%s"
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
                 WHERE datname = pg_catalog.current_database())`),!H(n,t,!0,!1,o,"subname",o,o,o,1)||(l(n,"ORDER BY 1;"),
a=await b(n.data),!a)?!1:(s.title="List of subscriptions",s.translate_header=!0,s.translate_columns=e,s.n_translate_columns=
te(e),q(a,s,E.queryFout,!1,E.logfile),!0)}function fe(t,i){T(t,`CASE WHEN pg_catalog.array_length(%s, 1) = 0 THEN '%s' E\
LSE pg_catalog.array_to_string(%s, E'\\n') END AS "%s"`,i,"(none)",i,"Access privileges")}async function St(t,i,n){let a={},
s,e=k(E.popt),c={value:!1},N=[!1,!1,!1,!1,!1,!1,!1];return F(a),L(a,"Get matching operator classes"),T(a,`SELECT
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
`),t!=o&&!H(a,t,!1,!1,o,"am.amname",o,o,c,1)||i!=o&&!H(a,i,c.value,!1,"tn.nspname","t.typname","pg_catalog.format_type(t\
.oid, NULL)","pg_catalog.pg_type_is_visible(t.oid)",o,3)||(l(a,"ORDER BY 1, 2, 4;"),s=await b(a.data),!s)?!1:(e.title="L\
ist of operator classes",e.translate_header=!0,e.translate_columns=N,e.n_translate_columns=te(N),q(s,e,E.queryFout,!1,E.
logfile),!0)}async function dt(t,i,n){let a={},s,e=k(E.popt),c={value:!1},N=[!1,!1,!1,!1];if(F(a),L(a,"Get matching oper\
ator families"),T(a,`SELECT
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
`),t!=o&&!H(a,t,!1,!1,o,"am.amname",o,o,c,1))return!1;if(i!=o){if(T(a,`  %s EXISTS (
    SELECT 1
    FROM pg_catalog.pg_type t
    JOIN pg_catalog.pg_opclass oc ON oc.opcintype = t.oid
    LEFT JOIN pg_catalog.pg_namespace tn ON tn.oid = t.typnamespace
    WHERE oc.opcfamily = f.oid
`,c.value?"AND":"WHERE"),!H(a,i,!0,!1,"tn.nspname","t.typname","pg_catalog.format_type(t.oid, NULL)","pg_catalog.pg_type\
_is_visible(t.oid)",o,3))return!1;l(a,`  )
`)}return l(a,"ORDER BY 1, 2;"),s=await b(a.data),s?(e.title="List of operator families",e.translate_header=!0,e.translate_columns=
N,e.n_translate_columns=te(N),q(s,e,E.queryFout,!1,E.logfile),!0):!1}async function Ot(t,i,n){let a={},s,e=k(E.popt),c={
value:!1},N=[!1,!1,!1,!1,!1,!1,!0];return F(a),L(a,"Get operators of matching operator families"),T(a,`SELECT
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
`),t!=o&&!H(a,t,!1,!1,o,"am.amname",o,o,c,1)||i!=o&&!H(a,i,c.value,!1,"nsf.nspname","of.opfname",o,o,o,3)||(l(a,`ORDER B\
Y 1, 2,
  o.amoplefttype = o.amoprighttype DESC,
  pg_catalog.format_type(o.amoplefttype, NULL),
  pg_catalog.format_type(o.amoprighttype, NULL),
  o.amopstrategy;`),s=await b(a.data),!s)?!1:(e.title="List of operators of operator families",e.translate_header=!0,e.translate_columns=
N,e.n_translate_columns=te(N),q(s,e,E.queryFout,!1,E.logfile),!0)}async function ut(t,i,n){let a={},s,e=k(E.popt),c={value:!1},
N=[!1,!1,!1,!1,!1,!1];return F(a),L(a,"Get support functions of matching operator families"),T(a,`SELECT
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
`),t!=o&&!H(a,t,!1,!1,o,"am.amname",o,o,c,1)||i!=o&&!H(a,i,c.value,!1,"ns.nspname","of.opfname",o,o,o,3)||(l(a,`ORDER BY\
 1, 2,
  ap.amproclefttype = ap.amprocrighttype DESC,
  3, 4, 5;`),s=await b(a.data),!s)?!1:(e.title="List of support functions of operator families",e.translate_header=!0,e.
translate_columns=N,e.n_translate_columns=te(N),q(s,e,E.queryFout,!1,E.logfile),!0)}async function Jn(t){let i={},n,a=k(
E.popt);return F(i),L(i,"Get large objects"),T(i,`SELECT oid as "%s",
  pg_catalog.pg_get_userbyid(lomowner) as "%s",
  `,"ID","Owner"),t&&(fe(i,"lomacl"),l(i,`,
  `)),T(i,`pg_catalog.obj_description(oid, 'pg_largeobject') as "%s"
FROM pg_catalog.pg_largeobject_metadata
ORDER BY oid`,"Description"),n=await b(i.data),n?(a.title="Large objects",a.translate_header=!0,q(n,a,E.queryFout,!1,E.logfile),
!0):!1}let Lt=0;function Ce(t,i,n,a){return t>=1e5?i?n=pe("%d.%d",Math.trunc(t/1e4),t%1e4):n=pe("%d",Math.trunc(t/1e4)):
i?n=pe("%d.%d.%d",Math.trunc(t/1e4),Math.trunc(t/100)%100,t%100):n=pe("%d.%d",Math.trunc(t/1e4),Math.trunc(t/100)%100),n}
function It(t,i,n,a,s){let e={},c={},N;if(!Pt(i,e,c))return!1;for(N=0;N<c.value;N++){let A=e.value[N],m,p,S;m=A,p=J(A,"="),
p!=o?(A=A.slice(0,A.length-p.length),m=A,S=p.slice(1)):S="",N>0&&l(t,", "),T(t,"%s%s=",n,We(m)),O(We(S),S)==0?l(t,S):Pn(
t,S,a,s)}return!0}function Kn(t,i,n,a,s,e,c,N,A,m,p){let S={},D={},f=!1,v={};return p==o&&(p=v),p.value=0,n==o?(A!=o&&(l(
i,a?"  AND ":"WHERE "),a=!0,f=!0,T(i,`%s
`,A)),f):(F(S),F(D),Ct(ca(t),e!=o?m:o,e!=o?S:o,D,n,s,!0,p),c!=o&&D.len>2&&O(D.data,"^(.*)$")!=0&&(l(i,a?"  AND ":"WHERE "),
a=!0,f=!0,N!=o?(T(i,"(%s OPERATOR(pg_catalog.~) ",c),qe(i,D.data,t),$e(t)>=12e4&&l(i," COLLATE pg_catalog.default"),T(i,
`
        OR %s OPERATOR(pg_catalog.~) `,N),qe(i,D.data,t),$e(t)>=12e4&&l(i," COLLATE pg_catalog.default"),l(i,`)
`)):(T(i,"%s OPERATOR(pg_catalog.~) ",c),qe(i,D.data,t),$e(t)>=12e4&&l(i," COLLATE pg_catalog.default"),$(i,`
`))),e!=o&&S.len>2?O(S.data,"^(.*)$")!=0&&e!=o&&(l(i,a?"  AND ":"WHERE "),a=!0,f=!0,T(i,"%s OPERATOR(pg_catalog.~) ",e),
qe(i,S.data,t),$e(t)>=12e4&&l(i," COLLATE pg_catalog.default"),$(i,`
`)):A!=o&&(l(i,a?"  AND ":"WHERE "),a=!0,f=!0,T(i,`%s
`,A)),f)}function Ct(t,i,n,a,s,e,c,N){let A=[{},{},{}],m={},p,S,D,f,v,I;for(be(s!=o),be(a!=o),be(i==o||n!=o),be(N!=o),N.
value=0,f=!1,I=s,i!=o?S=2:n!=o?S=1:S=0,p=0,c?(v=!0,F(m)):v=!1,F(A[p]),l(A[p],"^(");I[0];){let re=I[0];if(re=='"')f&&I[1]==
'"'?($(A[p],'"'),v&&$(m,'"'),I=I.slice(1)):f=!f,I=I.slice(1);else if(!f&&ti(re))$(A[p],hn(re)),v&&$(m,hn(re)),I=I.slice(
1);else if(!f&&re=="*")l(A[p],".*"),v&&$(m,"*"),I=I.slice(1);else if(!f&&re=="?")$(A[p],"."),v&&$(m,"?"),I=I.slice(1);else if(!f&&
re==".")v=!1,N&&N.value++,p<S?(l(A[p],")$"),p++,F(A[p]),l(A[p],"^("),I=I.slice(1)):($(A[p],I[0]),I=I.slice(1));else if(re==
"$")l(A[p],"\\$"),v&&$(m,"$"),I=I.slice(1);else for(((f||e)&&J("|*+?()[]{}.^$\\",re)!=o||re=="["&&I[1]=="]")&&$(A[p],"\\"),
D=si(I,t);D--;)v&&$(m,I[0]),$(A[p],I[0]),I=I.slice(1)}l(A[p],")$"),a&&(l(a,A[p].data),p--),n&&p>=0&&(l(n,A[p].data),p--),
i&&p>=0&&(c?l(i,m.data):l(i,A[p].data))}function L(t,i){h(t,`/* %s */
`,i)}function q(t,i,n,a,s){let e={},c,N,A;if(!ae){for(sn(e,i.topt,i.title,pa(t),Y(t)),be(i.translate_columns==o||i.n_translate_columns>=
e.ncolumns),c=0;c<e.ncolumns;c++)Re(e,Ta(t,c),i.translate_header,Dt(oa(t,c)));for(N=0;N<e.nrows;N++)for(A=0;A<e.ncolumns;A++){
let m,p=!1,S;ce(t,N,A)?m=i.nullPrint!=o?i.nullPrint:"":oa(t,A)==16?m=_(t,N,A)[0]=="t"?i.truePrint!=o?i.truePrint:"t":i.falsePrint!=
o?i.falsePrint:"f":(m=_(t,N,A),e.aligns[A]=="r"&&i.topt.numericLocale&&(m=m,p=!0)),S=i.translate_columns&&i.translate_columns[A],
Q(e,m,S,p)}if(i.footers){let m;for(m=0;i.footers[m]!=o;m++)G(e,i.footers[m])}on(e,n,a,s)}}function Dt(t){let i;switch(t){case 21:case 23:case 20:case 700:case 701:case 1700:case 26:case 6437:case 28:case 5069:case 29:case 790:
i="r";break;default:i="l";break}return i}let bt=["abort","absent","absolute","access","action","add","admin","after","ag\
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
e","xmlpi","xmlroot","xmlserialize","xmltable","year","yes","zone"],Ut=[r,r,r,r,r,r,r,r,r,U,r,r,r,U,U,U,U,U,U,U,r,r,r,U,
r,r,r,r,ee,r,r,r,y,y,ee,y,y,U,r,r,r,r,r,r,r,U,U,r,r,y,y,r,U,r,r,r,r,y,U,ee,U,r,r,r,r,r,r,ee,r,r,r,r,U,r,r,r,r,r,r,U,ee,r,
r,r,U,U,U,ee,U,U,U,r,r,r,r,r,r,y,y,r,U,r,U,r,r,r,r,r,r,r,U,r,r,r,r,U,U,r,r,r,r,r,U,r,r,r,r,U,r,r,r,r,r,U,r,r,r,r,y,r,r,r,
r,y,U,r,U,r,r,r,y,r,U,r,U,r,r,ee,U,ee,r,r,r,r,U,r,y,U,y,r,r,U,r,r,r,r,r,r,ee,r,r,r,r,U,r,r,r,r,r,r,r,r,U,r,ee,y,r,r,r,r,
y,y,U,y,U,r,ee,ee,r,ee,y,y,y,y,y,y,y,y,y,y,y,r,r,r,r,r,r,r,U,U,r,y,ee,r,ee,U,r,r,r,U,U,r,r,r,r,r,r,r,r,r,r,r,y,r,r,r,r,r,
r,r,r,y,ee,y,r,r,r,r,r,r,r,r,y,y,r,U,r,r,ee,r,U,y,r,y,r,r,r,r,U,r,r,r,U,U,r,r,r,U,U,r,r,y,ee,r,ee,y,r,r,r,r,r,r,r,r,r,r,
r,r,U,r,r,r,y,r,y,r,r,r,U,r,r,r,r,r,r,r,r,r,r,r,y,r,r,r,U,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,U,r,r,ee,r,r,r,r,r,y,r,r,r,r,r,r,
r,r,r,r,U,r,r,r,r,r,U,r,y,r,r,r,ee,r,r,y,r,U,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,y,r,U,r,r,U,U,r,ee,r,r,r,r,r,r,U,r,y,y,U,U,r,
r,y,r,y,U,r,r,r,r,r,r,r,r,r,U,U,r,r,r,r,r,U,U,r,r,r,r,r,y,y,U,r,ee,r,r,r,r,r,r,U,U,r,U,U,r,r,r,r,r,r,y,y,y,y,y,y,y,y,y,y,
y,r,r,r];function k(t){return{...t,topt:tn(t.topt)}}function tn(t){return{...t,fieldSep:{...t.fieldSep},recordSep:{...t.
recordSep}}}function sn(t,i,n,a,s){t.opt=i,t.title=n,t.ncolumns=a,t.nrows=s,t.headers=[],t.cells=[],t.footers=o,t.aligns=
[]}function Re(t,i,n,a){n&&(i=ta(i)),t.headers.push(i),t.header=i,t.aligns.push(a),t.align=a}function Q(t,i,n,a){n&&(i=ta(
i)),t.cells.push(i),t.cell=i}function G(t,i){t.footers==o&&(t.footers=[]),t.footers.push(i),t.footer={data:i}}function ht(t,i){
t.footers&&t.footers.pop(),G(t,i)}function on(t,i,n,a){ie({...t})}function Pt(t,i,n){let a,s,e;if(a=Ge(t),i.value=o,n.value=
0,a<2||t[0]!="{"||t[a-1]!="}")return!1;let c=i.value=[],N=0;for(N++,e=0;t[N]!="}";){if(t[N]==o)return!1;for(s="";t[N]!="\
}"&&t[N]!=",";){if(t[N]==o)return!1;if(t[N]!='"')s+=t[N++];else{for(N++;t[N]!='"';){if(t[N]==o||t[N]=="\\"&&(N++,t[N]==o))
return!1;s+=t[N++]}N++}}c[e]=s,t[N]==","&&N++,e++}return t[N+1]&&t[N+1]!=o?!1:(n.value=e,!0)}function We(t){let i={};F(i);
let n=!1;if(Lt?n=!0:t[0]>="a"&&t[0]<="z"||t[0]=="_"?/[^a-z0-9_]/.test(t)&&(n=!0):n=!0,!n){let a=bt.indexOf(t);a>=0&&Ut[a]!=
r&&(n=!0)}return n?($(i,'"'),$(i,t.replace(/"/g,'""')),$(i,'"')):l(i,t),i.data}let E,zn=!0,In=0;try{E={sversion:K,cur_cmd_interactive:!1,
queryFout:ve,logfile:o,echo_hidden:B?Xt:aa,db:{dbName:u,sversion:K,std_strings:z,status:la,encoding:Gt},popt:{topt:{default_footer:!0,
expanded:0},nullPrint:""}};let[t]=_e;for(;;){let i=["?","h","help"].includes(ra([..._e]));if(!E.sversion&&!i){let n=await b(
"SHOW server_version_num",!0);E.sversion=E.db.sversion=parseInt(n.rows[0][0],10)}for(In++,await ma(_e,{},Ye(),Ye())===Se&&
(zn=!1);/\s/.test(t[_e[1]]??"");)_e[1]++;if(!ne||t[_e[1]]!=="\\")break;_e[1]++}return{success:zn,remainder:t.slice(_e[1]),
commands:In}}catch(t){return ie("ERROR:  "+t.message),ae?null:{success:!1,remainder:"",commands:In}}}return{promise:Fe().
finally(Pe),cancel:ge}}function mn(g,u,P,W="",B=""){let K=Math.max(0,u-Ge(g));return P==="r"?W+" ".repeat(K)+g+B:P==="c"?
W+" ".repeat(Math.floor(K/2))+g+" ".repeat(Math.ceil(K/2))+B:W+g+" ".repeat(K)+B}function Ea(g,u){let P=0,W=g.length,B=[];
for(;P<W;)B.push(g.slice(P,P+=u));return B}function Un(g){let u=-1,P=0,W=1,B=0;for(;(u=g.indexOf(`
`,u+1))!==-1;)u-P>B&&(B=u-P),P=u+1,W++;return g.length-P>B&&(B=g.length-P),{count:W,longest:B}}function me(g,u){return g=
g.replace(/[<>&'"]/g,P=>({"<":"&lt;",">":"&gt;","&":"&amp;","'":"&apos;",'"':"&quot;"})[P]),u&&(g=g.replace(/ /g,"&nbsp;").
replace(/\n/g,"<br />")),g}function Qt(g){let{ncolumns:u,nrows:P,headers:W,cells:B}=g;if(B.length===0)return`(${P} row${P===
1?"":"s"})`;let K=W.map(Un),z=K.reduce((oe,Z)=>oe>Z.longest?oe:Z.longest,0),j=B.map(Un),ne=j.reduce((oe,Z)=>oe>Z.longest?
oe:Z.longest,0),ae=3,ge=P===0?0:13+(Math.log10(g.nrows)|0),Ne=Math.max(z+ae+ne,ge),Oe=Ne-z-ae,Pe="";for(let oe=0,Z=B.length,
_e=0;oe<Z;oe++){let ye=oe%u;if(ye===0){_e++;let Ee=`-[ RECORD ${_e} ]`;Ee.length<z+1&&(Ee+="-".repeat(z-Ee.length+1)),Ee.
length<z+2&&(Ee+="+"),Ee.length<Ne&&(Ee+="-".repeat(Ne-Ee.length)),Pe+=`
${Ee}`}let Ie=W[ye].split(`
`),Ze=Ie.length,en=B[oe].split(`
`),nn=en.length,dn=Math.max(Ze,nn);for(let Ee=0;Ee<dn;Ee++)Pe+=`
`+mn(Ie[Ee]??"",z)+(Ze>Ee+1?"+":" ")+"| "+mn(en[Ee]??"",Oe)+(nn>Ee+1?"+":"")}let ie=g.footers?g.footers.filter(Le):[],le=ie.
length>0?`

`+ie.join(`
`):"";return`${g.title}${Pe}${le}`}function $t(g){if(g.opt.expanded)return Qt(g);let{ncolumns:u,nrows:P,aligns:W}=g,B=[...g.
headers,...g.cells].map(Un),{colWidths:K,rowHeights:z}=B.reduce((ie,le,Fe)=>{let oe=Math.floor(Fe/g.ncolumns),Z=Fe%g.ncolumns;
return le.longest>ie.colWidths[Z]&&(ie.colWidths[Z]=le.longest),le.count>ie.rowHeights[oe]&&(ie.rowHeights[oe]=le.count),
ie},{colWidths:new Array(u).fill(0),rowHeights:new Array(P+1).fill(1)}),j=K.reduce((ie,le)=>ie+le,0)+u*2+(u-1),ne=mn(g.title,
j,"c"),ae=[g.headers,null,...Ea(g.cells,u)],ge=ae.map((ie,le)=>{if(le===1)return g.headers.map((oe,Z)=>"-".repeat(K[Z%u]+
2)).join("+");le>1&&le--;let Fe=ie.map(oe=>oe.split(`
`));return new Array(z[le]).fill("").map((oe,Z)=>Fe.map((_e,ye)=>mn(_e[Z]??"",K[ye],le===0?"c":W[ye]," ",_e[Z+1]===void 0?
" ":"+")).join("|")).join(`
`)}).join(`
`),Ne=g.footers?g.footers.filter(Le):[],Oe=Ne.length>0?`
`+Ne.join(`
`):g.opt.default_footer?`
(${P} row${P===1?"":"s"})`:"";return`${ne}
${ge}${Oe}`}function Zt(g){let{ncolumns:u,cells:P,headers:W}=g,B=`<table><tr><th align="left" colspan="2">${me(g.title)}\
</th></tr>`,K=W.map(j=>me(j,!0));for(let j=0,ne=P.length,ae=0;j<ne;j++){let ge=j%u;ge===0&&(ae++,B+=`<tr><th align="left\
" colspan="2">RECORD ${ae}</th></tr>`);let Ne=K[ge],Oe=me(P[j],!0);B+=`<tr><td valign="top">${Ne}</td><td valign="top">${Oe}\
</td></tr>`}B+="</table>";let z=g.footers?g.footers.filter(Le):[];return z.length>0&&(z.length>1&&z.some(j=>/^\s/.test(j))?
B+="<dl>"+z.map(j=>/^\s/.test(j)?`<dd>${me(j.trim(),!0)}</dd>`:`<dt>${me(j,!0)}</dt>`).join("")+"</dl>":B+=z.map(j=>`<p>${me(
j,!0)}</p>`).join("")),B}function ei(g){if(g.opt.expanded)return Zt(g);let u=`<table><tr><th valign="top" style="text-al\
ign: center;" colspan="${g.ncolumns}">${me(g.title)}</th></tr><tr>`;for(let W of g.headers)u+=`<th valign="top" style="t\
ext-align: center;">${me(W)}</th>`;u+="</tr>";for(let W of Ea(g.cells,g.ncolumns))u+="<tr>"+W.map((B,K)=>`<td valign="to\
p" style="text-align: ${g.aligns[K]==="c"?"center":g.aligns[K]==="r"?"right":"left"}">${me(B).replace(/\n/g,"<br>")}</td\
>`).join(`
`)+"</tr>";u+="</table>";let P=g.footers?g.footers.filter(Le):[];return P.length>0?P.length>1&&P.some(W=>/^\s/.test(W))?
u+="<dl>"+P.map(W=>/^\s/.test(W)?`<dd>${me(W.trim(),!0)}</dd>`:`<dt>${me(W,!0)}</dt>`).join("")+"</dl>":u+=P.map(W=>`<p>${me(
W,!0)}</p>`).join(""):g.opt.default_footer&&(u+=`<p>(${g.nrows} row${g.nrows===1?"":"s"})</p>`),u}function be(g){if(!g)throw new Error(
`Assertion failed (value: ${g})`)}var ni=(g,u,P)=>P===1?g:u;var ta=Le;function Qe(g,u){let P=g.indexOf(u);return P===-1?o:g.slice(P)}var J=Qe;function Ge(g){return g.length}function he(g,u,P){
if(typeof g!="string"||typeof u!="string")throw new Error("Not a string");return g.length>P&&(g=g.slice(0,P)),u.length>P&&
(u=u.slice(0,P)),g<u?-1:g>u?1:0}function O(g,u){return he(g,u,1/0)}function ai(g,u){let P=Ge(g);for(let W=0;W<P;W++)if(u.
indexOf(g[W])===-1)return W;return P}function ia(g){return parseInt(g,10)}function bn(g){return parseInt(g,10)}function ti(g){
let u=g.charCodeAt(0);return u>=65&&u<=90}function te(g){return g.length}function hn(g){return g.toLowerCase()}function ii(g,u){
return O(g.toLowerCase(),u.toLowerCase())}function si(g,u){return 1}function Ue(g){return 0}function F(g){g.data="",g.len=0}function Ye(){let g={};return F(g),g}var Nn=F;function l(g,u){g.
data+=u,g.len=g.data.length}var $=l;function T(g,u,...P){let W=pe(u,...P);l(g,W)}function h(g,u,...P){F(g),T(g,u,...P)}function Pn(g,u,P,W){
l(g,"'"+u.replace(W?/'/g:/['\\]/g,"$&$&")+"'")}function qe(g,u,P){if(J(u,"\\")!=o&&$e(P)<19e4){g.len>0&&g.data[g.len-1]!=
" "&&$(g," "),$(g,Ht),Pn(g,u,ca(P),!1);return}Pn(g,u,P.encoding,P.std_strings)}function pe(g,...u){let P="",W=0,B=0,K;for(;(K=
g.indexOf("%",B))!==-1;){let z=0,j=!1;P+=g.slice(B,K),B=K+1;let ne=g[B++];if(ne==="%"&&(P+="%"),ne==="*"&&(z=parseInt(u[W++],
10),ne=g[B++]),ne==="-"&&(j=!0,ne=g[B++]),ne>="0"&&ne<="9"&&(z=parseInt(ne,10),ne=g[B++]),ne==="s"||ne==="c"||ne==="d"||
ne==="u"){let ae=String(u[W++]),ge=z-ae.length;j===!1&&ge>0&&(P+=" ".repeat(ge)),P+=ae,j===!0&&ge>0&&(P+=" ".repeat(ge))}}
return P+=g.slice(B),P}var fn=pe;function sa(g){return g?g.dbName:o}function $e(g){return!g||g.status===qt?0:g.sversion}
function ca(g){return!g||g.status!=la?-1:g.client_encoding}function Y(g){return g.rowCount}function pa(g){return g.fields.
length}function Ta(g,u){return g.fields[u].name}function oa(g,u){return g.fields[u].dataTypeID}function ce(g,u,P){return g.
rows[u][P]===null?1:0}function _(g,u,P){let W=g.rows[u][P];return String(W===null?"":W)}function Me(g,u){let P,W,B,K,z;if(!g||
u==o||u[0]==o)return-1;for(P=!1,B="",W=0,z=Ge(u);W<z;W++){let j=u[W];P?j=='"'?u[W+1]=='"'?(B+='"',W++):P=!1:B+=j:j=='"'?
P=!0:(j=hn(j),B+=j)}for(K=0,z=pa(g);K<z;K++)if(O(B,Ta(g,K))==0)return K;return-1}function ra(g){let[u]=g[0].slice(g[1]).
match(/^[^\s\\]*/);return g[1]+=u.length,u}function oi(g){g[0].startsWith("\\\\",g[1])&&(g[1]+=2)}function Le(g){return g}export{_i as describe,Ri as describeDataToHtml,Ti as describeDataToString,me as htmlEscape};
