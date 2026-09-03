var Ue=[["ABORT","abort the current transaction","sql-abort","ABORT [ WORK | TRANSACTION ] [ AND [ NO ] CHAIN ]"],["ALTE\
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
  PROPERTY GRAPH object_name |
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
    RESET ALL`],["ALTER PROPERTY GRAPH","change the definition of an SQL-property graph","sql-alter-property-graph",`ALT\
ER PROPERTY GRAPH name ADD
    [ {VERTEX|NODE} TABLES ( vertex_table_definition [, ...] ) ]
    [ {EDGE|RELATIONSHIP} TABLES ( edge_table_definition [, ...] ) ]

ALTER PROPERTY GRAPH name DROP
    {VERTEX|NODE} TABLES ( vertex_table_alias [, ...] ) [ CASCADE | RESTRICT ]

ALTER PROPERTY GRAPH name DROP
    {EDGE|RELATIONSHIP} TABLES ( edge_table_alias [, ...] ) [ CASCADE | RESTRICT ]

ALTER PROPERTY GRAPH name ALTER
    {VERTEX|NODE|EDGE|RELATIONSHIP} TABLE element_table_alias
    { ADD LABEL label_name [ NO PROPERTIES | PROPERTIES ALL COLUMNS | PROPERTIES ( { expression [ AS property_name ] } [\
, ...] ) ] } [ ... ]

ALTER PROPERTY GRAPH name ALTER
    {VERTEX|NODE|EDGE|RELATIONSHIP} TABLE element_table_alias
    DROP LABEL label_name [ CASCADE | RESTRICT ]

ALTER PROPERTY GRAPH name ALTER
    {VERTEX|NODE|EDGE|RELATIONSHIP} TABLE element_table_alias
    ALTER LABEL label_name ADD PROPERTIES ( { expression [ AS property_name ] } [, ...] )

ALTER PROPERTY GRAPH name ALTER
    {VERTEX|NODE|EDGE|RELATIONSHIP} TABLE element_table_alias
    ALTER LABEL label_name DROP PROPERTIES ( property_name [, ...] ) [ CASCADE | RESTRICT ]

ALTER PROPERTY GRAPH name OWNER TO { new_owner | CURRENT_USER | SESSION_USER }
ALTER PROPERTY GRAPH name RENAME TO new_name
ALTER PROPERTY GRAPH [ IF EXISTS ] name SET SCHEMA new_schema`],["ALTER PUBLICATION","change the definition of a publica\
tion","sql-alterpublication",`ALTER PUBLICATION name ADD publication_object [, ...]
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
ALTER TABLE [ IF EXISTS ] name
    MERGE PARTITIONS (partition_name1, partition_name2 [, ...]) INTO partition_name
ALTER TABLE [ IF EXISTS ] name
    SPLIT PARTITION partition_name INTO
        (PARTITION partition_name1 { FOR VALUES partition_bound_spec | DEFAULT },
         PARTITION partition_name2 { FOR VALUES partition_bound_spec | DEFAULT } [, ...])

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
  PROPERTY GRAPH object_name
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
  } ...`],["CREATE PROPERTY GRAPH","define a new SQL-property graph","sql-create-property-graph",`CREATE [ TEMP | TEMPOR\
ARY ] PROPERTY GRAPH name
    [ {VERTEX|NODE} TABLES ( vertex_table_definition [, ...] ) ]
    [ {EDGE|RELATIONSHIP} TABLES ( edge_table_definition [, ...] ) ]

where vertex_table_definition is:

    vertex_table_name [ AS alias ] [ KEY ( column_name [, ...] ) ] [ element_table_label_and_properties ]

and edge_table_definition is:

    edge_table_name [ AS alias ] [ KEY ( column_name [, ...] ) ]
        SOURCE [ KEY ( column_name [, ...] ) REFERENCES ] source_table [ ( column_name [, ...] ) ]
        DESTINATION [ KEY ( column_name [, ...] ) REFERENCES ] dest_table [ ( column_name [, ...] ) ]
        [ element_table_label_and_properties ]

and element_table_label_and_properties is either:

    NO PROPERTIES | PROPERTIES ALL COLUMNS | PROPERTIES ( { expression [ AS property_name ] } [, ...] )

or:

   { { LABEL label_name | DEFAULT LABEL } [ NO PROPERTIES | PROPERTIES ALL COLUMNS | PROPERTIES ( { expression [ AS prop\
erty_name ] } [, ...] ) ] } [...]`],["CREATE PUBLICATION","define a new publication","sql-createpublication",`CREATE PUB\
LICATION name
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
DELETE FROM [ ONLY ] table_name [ * ]
    [ FOR PORTION OF range_column_name for_portion_of_target ]
    [ [ AS ] alias ]
    [ USING from_item [, ...] ]
    [ WHERE condition | WHERE CURRENT OF cursor_name ]
    [ RETURNING [ WITH ( { OLD | NEW } AS output_alias [, ...] ) ]
                { * | output_expression [ [ AS ] output_name ] } [, ...] ]

where for_portion_of_target is:

{ FROM start_time TO end_time |
  ( portion ) }`],["DISCARD","discard session state","sql-discard","DISCARD { ALL | PLANS | SEQUENCES | TEMPORARY | TEMP\
 }"],["DO","execute an anonymous code block","sql-do","DO [ LANGUAGE lang_name ] code"],["DROP ACCESS METHOD","remove an\
 access method","sql-drop-access-method","DROP ACCESS METHOD [ IF EXISTS ] name [ CASCADE | RESTRICT ]"],["DROP AGGREGAT\
E","remove an aggregate function","sql-dropaggregate",`DROP AGGREGATE [ IF EXISTS ] name ( aggregate_signature ) [, ...]\
 [ CASCADE | RESTRICT ]

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
    [ CASCADE | RESTRICT ]`],["DROP PROPERTY GRAPH","remove an SQL-property graph","sql-drop-property-graph","DROP PROPE\
RTY GRAPH [ IF EXISTS ] name [, ...] [ CASCADE | RESTRICT ]"],["DROP PUBLICATION","remove a publication","sql-droppublic\
ation","DROP PUBLICATION [ IF EXISTS ] name [, ...] [ CASCADE | RESTRICT ]"],["DROP ROLE","remove a database role","sql-\
droprole","DROP ROLE [ IF EXISTS ] name [, ...]"],["DROP ROUTINE","remove a routine","sql-droproutine",`DROP ROUTINE [ I\
F EXISTS ] name [ ( [ [ argmode ] [ argname ] argtype [, ...] ] ) ] [, ...]
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

GRANT { SELECT | ALL [ PRIVILEGES ] }
    ON PROPERTY GRAPH graph_name [, ...]
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
    { SELECT | ALL [ PRIVILEGES ] }
    ON PROPERTY GRAPH graph_name [, ...]
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
    GRAPH_TABLE ( graph_name MATCH graph_pattern COLUMNS ( { expression [ AS name ] } [, ...] ) ) [ [ AS ] alias [ ( col\
umn_alias [, ...] ) ] ]
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
    GRAPH_TABLE ( graph_name MATCH graph_pattern COLUMNS ( { expression [ AS name ] } [, ...] ) ) [ [ AS ] alias [ ( col\
umn_alias [, ...] ) ] ]
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
UPDATE [ ONLY ] table_name [ * ]
    [ FOR PORTION OF range_column_name for_portion_of_target ]
    [ [ AS ] alias ]
    SET { column_name = { expression | DEFAULT } |
          ( column_name [, ...] ) = [ ROW ] ( { expression | DEFAULT } [, ...] ) |
          ( column_name [, ...] ) = ( sub-SELECT )
        } [, ...]
    [ FROM from_item [, ...] ]
    [ WHERE condition | WHERE CURRENT OF cursor_name ]
    [ RETURNING [ WITH ( { OLD | NEW } AS output_alias [, ...] ) ]
                { * | output_expression [ [ AS ] output_name ] } [, ...] ]

where for_portion_of_target is:

{ FROM start_time TO end_time |
  ( portion ) }`],["VACUUM","garbage-collect and optionally analyze a database","sql-vacuum",`VACUUM [ ( option [, ...] \
) ] [ table_and_columns [, ...] ]

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
    [ FETCH { FIRST | NEXT } [ count ] { ROW | ROWS } ONLY ]`],["WAIT FOR","wait for WAL to reach a target LSN","sql-wai\
t-for",`WAIT FOR LSN 'lsn'
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
    GRAPH_TABLE ( graph_name MATCH graph_pattern COLUMNS ( { expression [ AS name ] } [, ...] ) ) [ [ AS ] alias [ ( col\
umn_alias [, ...] ) ] ]
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

TABLE [ ONLY ] table_name [ * ]`]];var Wa=0,E=null,va=100,Ba="E",Ya=0,en=0,nn=1,ce=0,Tn=2,We=5,Ie=0,An=4,xa=6,bn=0,qa=1,Va="b",ka="i",Xa="a",ja="e",Ja="r",
Ka="S",za="f",Qa="T",Za="n",$a="L",et="a",nt="d",at="s",tt="v",Re="r",de="i",it="S",ve="t",Be="v",Ee="m",Rn="c",_e="f",le="\
p",Ae="I",st="g",dn="n",Ln="s",ot=20,rt=21,Et=23,lt=26,ct=28,pt=29,Tt=5069,Rt=700,_t=701,At=790,gt=1700;function bt(g){return typeof g==
"string"?g:St(g)}function Ut(g){return typeof g=="string"?`<p>${me(g,!0)}</p>`:mt(g)}function Pt(g,C,D,P,B=!1,q=null,V=1,ne=X=>`\
https://www.postgresql.org/docs/19/${X}.html`){let X=!1;function De(){X=!0,P=()=>{}}function Te(){if(X)throw new Error("\
cancelled")}async function on(){let qe=g.match(/^\\([?hdzsl]\S*)(.*)/);if(!qe)return P(`unsupported command: ${g}`),!1;let[
,J,oe]=qe;if(J=J.replace(/^lo_list/,"dl"),J=J.replace(/^z/,"dp"),J==="?")return P(It),!1;if(J==="h"){let o=(oe??"").trim().
toUpperCase().replace(/\s+/g," ");if(o==="")return P(`Available help:
`+Ue.map(s=>s[0]).join(`
`)),!1;{let s=o==="*"?Ue:Ue.filter(n=>n[0]===o);if(s.length===0&&(s=Ue.filter(n=>n[0].startsWith(o))),s.length===0){let n=o.
split(" ");for(let a=n.length;a>0;a--){let i=n.slice(0,a).join(" ");if(s=Ue.filter(e=>e[0].startsWith(i)),s.length>0)break}}
if(s.length===0)return P(`No help available for "${oe.trim()}".
Try \\h with no arguments to see available help.`),!1;for(let n of s)P(`Command:     ${n[0]}
Description: ${n[1]}
Syntax:
${n[3]}

URL: ${ne(n[2])}`);return!1}}let u=async(o,s=!1)=>{Te(),B&&!s&&P(`/**** INTERNAL QUERY ****/
${o}
/************************/`);let n=await D(o);return Te(),n},c;try{if(!q){let i=await u("SHOW server_version_num",!0);q=
parseInt(i.rows[0][0],10)}c={sversion:q,db:{dbName:C,sversion:q,std_strings:V,status:bn,encoding:xa},popt:{topt:{default_footer:!0},
nullPrint:""}};let o=[oe,0],s=await(J[0]==="d"?xn(o,!0,J):J[0]==="s"?J[1]==="f"||J[1]==="v"?wn(o,!0,J,J[1]==="f"):ce:J[0]===
"l"?Yn(o,!0,J):ce);(J.startsWith("dx")?J.slice(2):J).indexOf("x")!==-1&&P("Note: expanded output using x is not supporte\
d"),s===ce&&P(`invalid command \\${J}`);let n,a=[];for(;n=ue(o,Ie,E,!0);)a.push(ae('\\%s: extra argument "%s" ignored',J,
n));a.length>0&&P(a.join(`
`))}catch(o){return P("ERROR:  "+o.message),X?null:!1}function H(o,...s){P(ae(o,...s))}function F(o,s,n,a,i,e,l,m,S,T){let h={},
d={},L;if(b(h),L=ye(c.db,o,s,n,a,i,e,l,m,h,d),d=d.value,S&&(S.value=L),d>=T)return H("improper qualified name (too many \
dotted names): %s",s),!1;if(T>1&&d==T-1){if(Dn(c.db)==E)return H("You are currently not connected to a database."),!1;if(y(
Dn(c.db),h.data)!=0)return H("cross-database references are not implemented: %s",s),!1}return!0}function ye(o,s,n,a,i,e,l,m,S,T,h){
let d={},L={},O=!1;return h||(h={}),h.value=0,n==E?(S&&(r(s,a?"  AND ":"WHERE "),a=!0,O=!0,p(s,`%s
`,S)),O):(b(d),b(L),Ve(Pn(o),e?T:E,e?d:E,L,n,i,!0,h),l&&L.len>2&&y(L.data,"^(.*)$")!=0&&(r(s,a?"  AND ":"WHERE "),a=!0,O=
!0,m?(p(s,"(%s OPERATOR(pg_catalog.~) ",l),Fe(s,L.data,o),Ye(o)>=12e4&&r(s," COLLATE pg_catalog.default"),p(s,`
        OR %s OPERATOR(pg_catalog.~) `,m),Fe(s,L.data,o),Ye(o)>=12e4&&r(s," COLLATE pg_catalog.default"),r(s,`)
`)):(p(s,"%s OPERATOR(pg_catalog.~) ",l),Fe(s,L.data,o),Ye(o)>=12e4&&r(s," COLLATE pg_catalog.default"),j(s,`
`))),e&&d.len>2?y(d.data,"^(.*)$")!=0&&e&&(r(s,a?"  AND ":"WHERE "),a=!0,O=!0,p(s,"%s OPERATOR(pg_catalog.~) ",e),Fe(s,d.
data,o),Ye(o)>=12e4&&r(s," COLLATE pg_catalog.default"),j(s,`
`)):S&&(r(s,a?"  AND ":"WHERE "),a=!0,O=!0,p(s,`%s
`,S)),O)}function Ve(o,s,n,a,i,e,l,m){let S=[{},{},{}],T=0,h={},d={},L={},O,M,z;Pe(i),Pe(a),Pe(!s||n),Pe(m),m.value=0,O=
!1,z=i,s?L=2:n?L=1:L=0,d=S[T],l?(M=!0,b(h)):M=!1,b(d),r(d,"^(");let K=0,Q;for(;(Q=z[K])!=E;)Q=='"'?(O&&z[K+1]=='"'?(j(d,
'"'),M&&j(h,'"'),K++):O=!O,K++):!O&&dt(Q)?(j(d,gn(Q)),M&&j(h,gn(Q)),K++):!O&&Q=="*"?(r(d,".*"),M&&j(h,"*"),K++):!O&&Q=="\
?"?(j(d,"."),M&&j(h,"?"),K++):!O&&Q=="."?(M=!1,m.value++,T<L?(r(d,")$"),d=S[++T],b(d),r(d,"^("),K++):(j(d,Q),K++)):Q=="$"?
(r(d,"\\$"),M&&j(h,"$"),K++):(((O||e)&&Z("|*+?()[]{}.^$\\",Q)!=E||Q=="["&&z[K+1]=="]")&&j(d,"\\"),M&&j(h,Q),j(d,Q),K++);
r(d,")$"),a&&(r(a,d.data),d=S[--T]),n&&T>=0&&(r(n,d.data),d=S[--T]),s&&T>=0&&(l?r(s,h.data):r(s,d.data))}function yn(o){
let s;switch(o){case rt:case Et:case ot:case Rt:case _t:case gt:case lt:case ct:case Tt:case pt:case At:s="r";break;default:
s="l";break}return s}function v(o,s,n,a,i){let e={},l,m,S;for(ke(e,s.topt,s.title,Fn(o),W(o)),Pe(s.translate_columns==E||
s.translate_columns==null||s.n_translate_columns>=e.ncolumns),l=0;l<e.ncolumns;l++)ie(e,hn(o,l),s.translate_header,yn(ut(
o,l)));for(m=0;m<e.nrows;m++)for(S=0;S<e.ncolumns;S++){let T,h=!1,d;te(o,m,S)?T=s.nullPrint?s.nullPrint:"":(T=A(o,m,S),e.
aligns[S]=="r"&&s.topt.numericLocale&&(T=format_numeric_locale(T),h=!0)),d=s.translate_columns&&s.translate_columns[S],k(
e,T,d,h)}if(s.footers)for(let T of s.footers)w(e,T);Xe(e,n,a,i)}function ke(o,s,n,a,i){o.opt=s,o.title=n,o.ncolumns=a,o.
nrows=i,o.headers=[],o.cells=[],o.footers=E,o.aligns=[]}function ie(o,s,n,a){n&&(s=R(s)),o.headers.push(s),o.header=s,o.
aligns.push(a),o.align=a}function k(o,s,n,a){n&&(s=R(s)),o.cells.push(s),o.cell=s}function w(o,s){o.footers==E&&(o.footers=
[]),o.footers.push(s),o.footer=s}function Hn(o,s){o.footers&&o.footers.pop(),w(o,s)}function Xe(o,s,n,a){P({...o})}async function wn(o,s,n,a){
let i=Tn,e=Z(n,"+")!=E,l={},m,S={value:Ya},T=a?en:nn;return b(l),m=ue(o,An,E,!0),m?await Gn(T,m,S)&&await Wn(T,S.value,l)?
e?Mn(l.data,a):P(l.data):i=We:(H(a?"function name is required":"view name is required"),i=We),i}function Mn(o,s){let n=s,
a=0,i="";o=o.trimEnd().split(`
`);for(let e of o)n&&(he(e,"AS ",3)==0||he(e,"BEGIN ",6)==0||he(e,"RETURN ",7)==0)&&(n=!1),n||a++,n?i+=ae(`        %s
`,e):i+=ae(`%-7d %s
`,a,e);P(i)}async function Gn(o,s,n){let a=!0,i={};b(i);let e;switch(o){case en:N(i,`/* %s */
`,R("Get function's OID")),r(i,"SELECT "),Fe(i,s,c.db),p(i,"::pg_catalog.%s::pg_catalog.oid",Z(s,"(")!==E?"regprocedure":
"regproc");break;case nn:N(i,`/* %s */
`,R("Get view's OID")),r(i,"SELECT "),Fe(i,s,c.db),r(i,"::pg_catalog.regclass::pg_catalog.oid");break}try{e=await u(i.data),
e&&W(e)==1?n.value=_n(A(e,0,0)):(H("Error when querying"),a=!1)}catch(l){H("ERROR:  "+l.message),a=!1}return a}async function Wn(o,s,n){
let a=!0,i={};b(i);let e;switch(o){case en:N(i,`/* %s */
`,R("Get function's definition")),p(i,"SELECT pg_catalog.pg_get_functiondef(%u)",s);break;case nn:N(i,`/* %s */
`,R("Get view's definition and details")),c.sversion>=90400?p(i,"SELECT nspname, relname, relkind, pg_catalog.pg_get_vie\
wdef(c.oid, true), pg_catalog.array_remove(pg_catalog.array_remove(c.reloptions,'check_option=local'),'check_option=casc\
aded') AS reloptions, CASE WHEN 'check_option=local' = ANY (c.reloptions) THEN 'LOCAL'::text WHEN 'check_option=cascaded\
' = ANY (c.reloptions) THEN 'CASCADED'::text ELSE NULL END AS checkoption FROM pg_catalog.pg_class c LEFT JOIN pg_catalo\
g.pg_namespace n ON c.relnamespace = n.oid WHERE c.oid = %u",s):p(i,"SELECT nspname, relname, relkind, pg_catalog.pg_get\
_viewdef(c.oid, true), c.reloptions AS reloptions, NULL AS checkoption FROM pg_catalog.pg_class c LEFT JOIN pg_catalog.p\
g_namespace n ON c.relnamespace = n.oid WHERE c.oid = %u",s);break}if(e=await u(i.data),e&&W(e)==1){switch(an(n),o){case en:
r(n,A(e,0,0));break;case nn:let l=A(e,0,0),m=A(e,0,1),S=A(e,0,2),T=A(e,0,3),h=A(e,0,4),d=A(e,0,5);switch(S[0]){case Be:r(
n,"CREATE OR REPLACE VIEW ");break;default:H('"%s.%s" is not a view',l,m),a=!1;break}p(n,"%s.",be(l)),r(n,be(m)),h!=E&&Ce(
h)>2&&(r(n,`
 WITH (`),vn(n,h,"",c.encoding,c.db.standard_strings)||(H("could not parse reloptions array"),a=!1),j(n,")")),p(n,` AS
%s`,T),n.len>0&&n.data[n.len-1]==";"&&(n.data=n.data.slice(0,n.len-1)),d&&d[0]!=E&&p(n,`
 WITH %s CHECK OPTION`,d);break}n.len>0&&n.data[n.len-1]!=`
`&&j(n,`
`)}else H("Error when querying"),a=!1;return a}function vn(o,s,n,a,i){let e=[],l={},m;if(!Bn(s,e,l))return!1;for(l=l.value,
m=0;m<l;m++){let S=e[m],[T,h]=S.split("=");h??(h=""),m>0&&r(o,", "),p(o,"%s%s=",n,be(T)),y(be(h),h)==0?r(o,h):Nn(o,h,a,i)}
return!0}function Bn(o,s,n){let a,i,e;if(a=Ce(o),n.value=0,a<2||o[0]!="{"||o[a-1]!="}")return!1;let l=0;for(l++,e=0;o[l]!=
"}";){if(o[l]==E)return!1;for(i="";o[l]!="}"&&o[l]!=",";){if(o[l]==E)return!1;if(o[l]!='"')i+=o[l++];else{for(l++;o[l]!=
'"';){if(o[l]==E||o[l]=="\\"&&(l++,o[l]==E))return!1;i+=o[l++]}l++}}s[e]=i,o[l]==","&&l++,e++}return o[l+1]&&o[l+1]!=E?!1:
(n.value=e,!0)}function be(o){let s={};b(s);let n=!1;return Wa?n=!0:o[0]>="a"&&o[0]<="z"||o[0]=="_"?/[^a-z0-9_]/.test(o)&&
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
xmltable"]).has(o)&&(n=!0),n?(j(s,'"'),j(s,o.replace(/"/g,'""')),j(s,'"')):r(s,o),s.data}async function Yn(o,s,n){let a,
i,e;return i=ue(o,Ie,E,!0),e=Z(n,"+")!=E,a=await qn(i,e),a?Tn:We}async function xn(o,s,n){let a=Tn,i=!0,e,l,m;switch(e=ue(
o,Ie,E,!0),l=Z(n,"+")!=E,m=Z(n,"S")!=E,n[1]){case void 0:case"+":case"S":e?i=await $n(e,l,m):i=await fn("tvmsEG",E,l,m);
break;case"A":{let S=E;switch(e&&n[2]!=E&&n[2]!="+"&&(S=ue(o,Ie,E,!0)),n[2]){case void 0:case"+":i=await kn(e,l);break;case"\
c":i=await Fa(e,S,l);break;case"f":i=await ha(e,S,l);break;case"o":i=await ya(e,S,l);break;case"p":i=await Ha(e,S,l);break;default:
a=ce;break}}break;case"a":i=await Vn(e,l,m);break;case"b":i=await Xn(e,l);break;case"c":he(n,"dconfig",7)==0?i=await ra(
e,l,m):i=await oa(e,l,m);break;case"C":i=await ca(e,l);break;case"d":he(n,"ddp",3)==0?i=await Qn(e):i=await Zn(e,m);break;case"\
D":i=await sa(e,l,m);break;case"f":switch(n[2]){case void 0:case"+":case"S":case"a":case"n":case"p":case"t":case"w":i=await Sn(
o,n,e,l,m);break;default:a=ce;break}break;case"g":i=await mn(e,l,m);break;case"l":i=await wa(l);break;case"L":i=await ia(
e,l,m);break;case"n":i=await Ta(e,l,m);break;case"o":i=await Sn(o,n,e,l,m);break;case"O":i=await pa(e,l,m);break;case"p":
i=await zn(e,m);break;case"P":switch(n[2]){case void 0:case"+":case"t":case"i":case"n":i=await ta(n.slice(2),e,l);break;default:
a=ce;break}break;case"T":i=await Jn(e,l,m);break;case"t":case"v":case"m":case"i":case"s":case"E":case"G":i=await fn(n[1],
e,l,m);break;case"r":if(n[2]=="d"&&n[3]=="s"){let S=E;e&&(S=ue(o,Ie,E,!0)),i=await na(e,S)}else n[2]=="g"?i=await aa(e,m):
a=ce;break;case"R":switch(n[2]){case"p":l?i=await Ua(e):i=await ba(e);break;case"s":i=await Pa(e,l);break;default:a=ce}break;case"\
u":i=await mn(e,l,m);break;case"F":switch(n[2]){case void 0:case"+":i=await Sa(e,l);break;case"p":i=await Ra(e,l);break;case"\
d":i=await ga(e,l);break;case"t":i=await Na(e,l);break;default:a=ce;break}break;case"e":switch(n[2]){case"s":i=await da(
e,l);break;case"u":i=await La(e,l);break;case"w":i=await Oa(e,l);break;case"t":i=await ua(e,l);break;default:a=ce;break}
break;case"x":l?i=await Ca(e):i=await Ia(e);break;case"X":i=await la(e,l);break;case"y":i=await Ea(e,l);break;default:a=
ce}return i||(a=We),a}async function Sn(o,s,n,a,i){let e,l=[],m=0;if(n){let S;for(;(S=ue(o,Ie,E,!0))!=E&&(l[m++]=S,!(m>=
va)););}return s[1]=="f"?e=await jn(s.slice(2),n,l,m,a,i):e=await Kn(n,l,m,a,i),e}async function qn(o,s){let n,a={},i=c.
popt;return b(a),N(a,`/* %s */
`,R("Get matching databases")),p(a,`SELECT
  d.datname as "%s",
  pg_catalog.pg_get_userbyid(d.datdba) as "%s",
  pg_catalog.pg_encoding_to_char(d.encoding) as "%s",
`,t("Name"),t("Owner"),t("Encoding")),c.sversion>=15e4?p(a,`  CASE d.datlocprovider WHEN 'b' THEN 'builtin' WHEN 'c' THE\
N 'libc' WHEN 'i' THEN 'icu' END AS "%s",
`,t("Locale Provider")):p(a,`  'libc' AS "%s",
`,t("Locale Provider")),p(a,`  d.datcollate as "%s",
  d.datctype as "%s",
`,t("Collate"),t("Ctype")),c.sversion>=17e4?p(a,`  d.datlocale as "%s",
`,t("Locale")):c.sversion>=15e4?p(a,`  d.daticulocale as "%s",
`,t("Locale")):p(a,`  NULL as "%s",
`,t("Locale")),c.sversion>=16e4?p(a,`  d.daticurules as "%s",
`,t("ICU Rules")):p(a,`  NULL as "%s",
`,t("ICU Rules")),r(a,"  "),re(a,"d.datacl"),s&&p(a,`,
  CASE WHEN pg_catalog.has_database_privilege(d.datname, 'CONNECT')
       %s       THEN pg_catalog.pg_size_pretty(pg_catalog.pg_database_size(d.datname))
       ELSE 'No Access'
  END as "%s",
  t.spcname as "%s",
  pg_catalog.shobj_description(d.oid, 'pg_database') as "%s"`,c.sversion>=1e5?`OR pg_catalog.pg_has_role('pg_read_all_st\
ats', 'USAGE')
`:"",t("Size"),t("Tablespace"),t("Description")),r(a,`
FROM pg_catalog.pg_database d
`),s&&r(a,`  JOIN pg_catalog.pg_tablespace t on d.dattablespace = t.oid
`),o&&!F(a,o,!1,!1,E,"d.datname",E,E,E,1)||(r(a,"ORDER BY 1;"),n=await u(a.data),!n)?!1:(i.nullPrint=E,i.title=R("List o\
f databases"),i.translate_header=!0,v(n,i,c.queryFout,!1,c.logfile),!0)}async function Vn(o,s,n){let a={},i,e=c.popt;return b(
a),N(a,`/* %s */
`,R("Get matching aggregates")),p(a,`SELECT n.nspname as "%s",
  p.proname AS "%s",
  pg_catalog.format_type(p.prorettype, NULL) AS "%s",
  CASE WHEN p.pronargs = 0
    THEN CAST('*' AS pg_catalog.text)
    ELSE pg_catalog.pg_get_function_arguments(p.oid)
  END AS "%s",
`,t("Schema"),t("Name"),t("Result data type"),t("Argument data types")),c.sversion>=11e4?p(a,`  pg_catalog.obj_descripti\
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
`),!F(a,o,!0,!1,"n.nspname","p.proname",E,"pg_catalog.pg_function_is_visible(p.oid)",E,3)||(r(a,"ORDER BY 1, 2, 4;"),i=await u(
a.data),!i)?!1:(e.nullPrint=E,e.title=R("List of aggregate functions"),e.translate_header=!0,v(i,e,c.queryFout,!1,c.logfile),
!0)}async function kn(o,s){let n={},a,i=c.popt,e=[!1,!0,!1,!1];if(c.sversion<90600){let l;return H("The server (version \
%s) does not support access methods.",Se(c.sversion,!1,l,Ne(l))),!0}return b(n),N(n,`/* %s */
`,R("Get matching access methods")),p(n,`SELECT amname AS "%s",
  CASE amtype WHEN 'i' THEN '%s' WHEN 't' THEN '%s' END AS "%s"`,t("Name"),t("Index"),t("Table"),t("Type")),s&&p(n,`,
  amhandler AS "%s",
  pg_catalog.obj_description(oid, 'pg_am') AS "%s"`,t("Handler"),t("Description")),r(n,`
FROM pg_catalog.pg_am
`),!F(n,o,!1,!1,E,"amname",E,E,E,1)||(r(n,"ORDER BY 1;"),a=await u(n.data),!a)?!1:(i.nullPrint=E,i.title=R("List of acce\
ss methods"),i.translate_header=!0,i.translate_columns=e,i.n_translate_columns=$(e),v(a,i,c.queryFout,!1,c.logfile),!0)}
async function Xn(o,s){let n={},a,i=c.popt;return b(n),N(n,`/* %s */
`,R("Get matching tablespaces")),p(n,`SELECT spcname AS "%s",
  pg_catalog.pg_get_userbyid(spcowner) AS "%s",
  pg_catalog.pg_tablespace_location(oid) AS "%s"`,t("Name"),t("Owner"),t("Location")),s&&(r(n,`,
  `),re(n,"spcacl"),p(n,`,
  spcoptions AS "%s",
  pg_catalog.pg_size_pretty(pg_catalog.pg_tablespace_size(oid)) AS "%s",
  pg_catalog.shobj_description(oid, 'pg_tablespace') AS "%s"`,t("Options"),t("Size"),t("Description"))),r(n,`
FROM pg_catalog.pg_tablespace
`),!F(n,o,!1,!1,E,"spcname",E,E,E,1)||(r(n,"ORDER BY 1;"),a=await u(n.data),!a)?!1:(i.nullPrint=E,i.title=R("List of tab\
lespaces"),i.translate_header=!0,v(a,i,c.queryFout,!1,c.logfile),!0)}async function jn(o,s,n,a,i,e){let l="anptwSx+",m=Z(
o,"a")!=E,S=Z(o,"n")!=E,T=Z(o,"p")!=E,h=Z(o,"t")!=E,d=Z(o,"w")!=E,L,O={},M,z=c.popt,K=[!1,!1,!1,!1,!0,!0,!0,!1,!0,!0,!1,
!1,!1,!1],Q=[!1,!1,!1,!1,!0,!0,!1,!0,!0,!1,!1,!1,!1];if(Ce(o)!=ft(o,l))return H(`\\df only takes [${l}] as options`),!0;
if(T&&c.sversion<11e4){let x;return H('\\df does not take a "%c" option with server version %s',"p",Se(c.sversion,!1,x,Ne(
x))),!0}!m&&!S&&!T&&!h&&!d&&(m=S=h=d=!0,c.sversion>=11e4&&(T=!0)),b(O),N(O,`/* %s */
`,R("Get matching functions")),p(O,`SELECT n.nspname as "%s",
  p.proname as "%s",
`,t("Schema"),t("Name")),c.sversion>=11e4?p(O,`  pg_catalog.pg_get_function_result(p.oid) as "%s",
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
 END as "%s"`,t("Result data type"),t("Argument data types"),t("agg"),t("window"),t("trigger"),t("func"),t("Type")),i&&(p(
O,`,
 CASE
  WHEN p.provolatile = 'i' THEN '%s'
  WHEN p.provolatile = 's' THEN '%s'
  WHEN p.provolatile = 'v' THEN '%s'
 END as "%s"`,t("immutable"),t("stable"),t("volatile"),t("Volatility")),c.sversion>=90600&&p(O,`,
 CASE
  WHEN p.proparallel = 'r' THEN '%s'
  WHEN p.proparallel = 's' THEN '%s'
  WHEN p.proparallel = 'u' THEN '%s'
 END as "%s"`,t("restricted"),t("safe"),t("unsafe"),t("Parallel")),p(O,`,
 pg_catalog.pg_get_userbyid(p.proowner) as "%s",
 CASE WHEN prosecdef THEN '%s' ELSE '%s' END AS "%s",
 CASE WHEN p.proleakproof THEN '%s' ELSE '%s' END as "%s"`,t("Owner"),t("definer"),t("invoker"),t("Security"),t("yes"),t(
"no"),t("Leakproof?")),r(O,`,
 `),re(O,"p.proacl"),p(O,`,
 l.lanname as "%s"`,t("Language")),p(O,`,
 CASE WHEN l.lanname IN ('internal', 'c') THEN p.prosrc END as "%s"`,t("Internal name")),p(O,`,
 pg_catalog.obj_description(p.oid, 'pg_proc') as "%s"`,t("Description"))),r(O,`
FROM pg_catalog.pg_proc p
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
`);for(let x=0;x<a;x++)p(O,`     LEFT JOIN pg_catalog.pg_type t%d ON t%d.oid = p.proargtypes[%d]
     LEFT JOIN pg_catalog.pg_namespace nt%d ON nt%d.oid = t%d.typnamespace
`,x,x,x,x,x,x);if(i&&r(O,`     LEFT JOIN pg_catalog.pg_language l ON l.oid = p.prolang
`),L=!1,!(S&&m&&T&&h&&d))if(S)m||(L?r(O,"      AND "):(r(O,"WHERE "),L=!0),c.sversion>=11e4?r(O,`p.prokind <> 'a'
`):r(O,`NOT p.proisagg
`)),!T&&c.sversion>=11e4&&(L?r(O,"      AND "):(r(O,"WHERE "),L=!0),r(O,`p.prokind <> 'p'
`)),h||(L?r(O,"      AND "):(r(O,"WHERE "),L=!0),r(O,`p.prorettype <> 'pg_catalog.trigger'::pg_catalog.regtype
`)),d||(L?r(O,"      AND "):(r(O,"WHERE "),L=!0),c.sversion>=11e4?r(O,`p.prokind <> 'w'
`):r(O,`NOT p.proiswindow
`));else{let x=!1;r(O,`WHERE (
       `),L=!0,m&&(c.sversion>=11e4?r(O,`p.prokind = 'a'
`):r(O,`p.proisagg
`),x=!0),h&&(x&&r(O,"       OR "),r(O,`p.prorettype = 'pg_catalog.trigger'::pg_catalog.regtype
`),x=!0),T&&(x&&r(O,"       OR "),r(O,`p.prokind = 'p'
`),x=!0),d&&(x&&r(O,"       OR "),c.sversion>=11e4?r(O,`p.prokind = 'w'
`):r(O,`p.proiswindow
`)),r(O,`      )
`)}if(!F(O,s,L,!1,"n.nspname","p.proname",E,"pg_catalog.pg_function_is_visible(p.oid)",E,3))return!1;for(let x=0;x<a;x++)
if(y(n[x],"-")!=0){let He,we,Me,Oe;if(He=ae("nt%d.nspname",x),we=ae("t%d.typname",x),Me=ae("pg_catalog.format_type(t%d.o\
id, NULL)",x),Oe=ae("pg_catalog.pg_type_is_visible(t%d.oid)",x),!F(O,En(n[x]),!0,!1,He,we,Me,Oe,E,3))return!1}else p(O,`\
  AND t%d.typname IS NULL
`,x);return!e&&!s&&r(O,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),r(O,"ORDER BY 1, 2, 4;"),M=await u(O.data),M?(z.nullPrint=E,z.title=R("List of functions"),z.translate_header=!0,c.sversion>=
90600?(z.translate_columns=K,z.n_translate_columns=$(K)):(z.translate_columns=Q,z.n_translate_columns=$(Q)),v(M,z,c.queryFout,
!1,c.logfile),!0):!1}async function Jn(o,s,n){let a={},i,e=c.popt;return b(a),N(a,`/* %s */
`,R("Get matching types")),p(a,`SELECT n.nspname as "%s",
  pg_catalog.format_type(t.oid, NULL) AS "%s",
`,t("Schema"),t("Name")),s&&(p(a,`  t.typname AS "%s",
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
`,t("Internal name"),t("Size"),t("Elements"),t("Owner")),re(a,"t.typacl"),r(a,`,
  `)),p(a,`  pg_catalog.obj_description(t.oid, 'pg_type') as "%s"
`,t("Description")),r(a,`FROM pg_catalog.pg_type t
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
`),r(a,"WHERE (t.typrelid = 0 "),r(a,`OR (SELECT c.relkind = 'c' FROM pg_catalog.pg_class c WHERE c.oid = t.typrelid))
`),(o==E||sn(o,"[]")==E)&&r(a,`  AND NOT EXISTS(SELECT 1 FROM pg_catalog.pg_type el WHERE el.oid = t.typelem AND el.typa\
rray = t.oid)
`),!n&&!o&&r(a,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!F(a,En(o),!0,!1,"n.nspname","t.typname","pg_catalog.format_type(t.oid, NULL)","pg_catalog.pg_type_is_visible(t.oid)",
E,3)||(r(a,"ORDER BY 1, 2;"),i=await u(a.data),!i)?!1:(e.nullPrint=E,e.title=R("List of data types"),e.translate_header=
!0,v(i,e,c.queryFout,!1,c.logfile),!0)}function En(o){let s=["decimal","numeric","float","double precision","int","integ\
er","bool[]","boolean[]","decimal[]","numeric[]","float[]","double precision[]","float4[]","real[]","float8[]","double p\
recision[]","int[]","integer[]","int2[]","smallint[]","int4[]","integer[]","int8[]","bigint[]","time[]","time without ti\
me zone[]","timetz[]","time with time zone[]","timestamp[]","timestamp without time zone[]","timestamptz[]","timestamp w\
ith time zone[]","varbit[]","bit varying[]","varchar[]","character varying[]",E];if(o==E)return E;for(let n=0;s[n]!=E;n+=
2)if(Lt(o,s[n])==0)return s[n+1];return o}async function Kn(o,s,n,a,i){let e={},l,m=c.popt,S=[!1,!1,!1,!1,!1,!1,!0,!1];if(b(
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
`),!i&&!o&&r(e,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!F(e,o,!i&&!o,!0,"n.nspname","o.oprname",E,"pg_catalog.pg_operator_is_visible(o.oid)",E,3))return!1;n==1&&r(e,`  AND \
o.oprleft = 0
`);for(let T=0;T<n;T++)if(y(s[T],"-")!=0){let h,d,L,O;if(h=ae("nt%d.nspname",T),d=ae("t%d.typname",T),L=ae("pg_catalog.f\
ormat_type(t%d.oid, NULL)",T),O=ae("pg_catalog.pg_type_is_visible(t%d.oid)",T),!F(e,En(s[T]),!0,!1,h,d,L,O,E,3))return!1}else
p(e,`  AND t%d.typname IS NULL
`,T);return r(e,"ORDER BY 1, 2, 3, 4;"),l=await u(e.data),l?(m.nullPrint=E,m.title=R("List of operators"),m.translate_header=
!0,m.translate_columns=S,m.n_translate_columns=$(S),v(l,m,c.queryFout,!1,c.logfile),!0):!1}async function zn(o,s){let n={},
a,i=c.popt,e=[!1,!1,!0,!1,!1,!1];return b(n),N(n,`/* %s */
`,R("Get access privileges of matching relations")),p(n,`SELECT n.nspname as "%s",
  c.relname as "%s",
  CASE c.relkind WHEN 'r' THEN '%s' WHEN 'v' THEN '%s' WHEN 'm' THEN '%s' WHEN 'S' THEN '%s' WHEN 'f' THEN '%s' WHEN 'g'\
 THEN '%s' WHEN 'p' THEN '%s' END as "%s",
  `,t("Schema"),t("Name"),t("table"),t("view"),t("materialized view"),t("sequence"),t("foreign table"),t("property graph"),
t("partitioned table"),t("Type")),re(n,"c.relacl"),p(n,`,
  pg_catalog.array_to_string(ARRAY(
    SELECT attname || E':\\n  ' || pg_catalog.array_to_string(attacl, E'\\n  ')
    FROM pg_catalog.pg_attribute a
    WHERE attrelid = c.oid AND NOT attisdropped AND attacl IS NOT NULL
  ), E'\\n') AS "%s"`,t("Column privileges")),c.sversion>=90500&&c.sversion<1e5&&p(n,`,
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
    AS "%s"`,t("Policies")),c.sversion>=1e5&&p(n,`,
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
WHERE c.relkind IN ('r','v','m','S','f','g','p')
`),!s&&!o&&r(n,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!F(n,o,!0,!1,"n.nspname","c.relname",E,"pg_catalog.pg_table_is_visible(c.oid)",E,3)||(r(n,"ORDER BY 1, 2;"),a=await u(
n.data),!a)?!1:(i.nullPrint=E,N(n,R("Access privileges")),i.title=n.data,i.translate_header=!0,i.translate_columns=e,i.n_translate_columns=
$(e),v(a,i,c.queryFout,!1,c.logfile),!0)}async function Qn(o){let s={},n,a=c.popt,i=[!1,!1,!0,!1];return b(s),N(s,`/* %s\
 */
`,R("Get matching default ACLs")),p(s,`SELECT pg_catalog.pg_get_userbyid(d.defaclrole) AS "%s",
  n.nspname AS "%s",
  CASE d.defaclobjtype     WHEN '%c' THEN '%s' WHEN '%c' THEN '%s' WHEN '%c' THEN '%s'    WHEN '%c' THEN '%s' WHEN '%c' \
THEN '%s' WHEN '%c' THEN '%s' END AS "%s",
  `,t("Owner"),t("Schema"),Ja,t("table"),Ka,t("sequence"),za,t("function"),Qa,t("type"),Za,t("schema"),$a,t("large objec\
t"),t("Type")),re(s,"d.defaclacl"),r(s,`
FROM pg_catalog.pg_default_acl d
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = d.defaclnamespace
`),!F(s,o,!1,!1,E,"n.nspname","pg_catalog.pg_get_userbyid(d.defaclrole)",E,E,3)||(r(s,"ORDER BY 1, 2, 3;"),n=await u(s.data),
!n)?!1:(a.nullPrint=E,N(s,R("Default access privileges")),a.title=s.data,a.translate_header=!0,a.translate_columns=i,a.n_translate_columns=
$(i),v(n,a,c.queryFout,!1,c.logfile),!0)}async function Zn(o,s){let n={},a,i=c.popt,e=[!1,!1,!0,!1];return b(n),N(n,`/* \
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
`,t("table constraint")),!s&&!o&&r(n,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!F(n,o,!s&&!o,!1,"n.nspname","pgc.conname",E,"pg_catalog.pg_table_is_visible(c.oid)",E,3)||(p(n,`UNION ALL
  SELECT pgc.oid as oid, pgc.tableoid AS tableoid,
  n.nspname as nspname,
  CAST(pgc.conname AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_constraint pgc
    JOIN pg_catalog.pg_type t ON t.oid = pgc.contypid
    LEFT JOIN pg_catalog.pg_namespace n     ON n.oid = t.typnamespace
`,t("domain constraint")),!s&&!o&&r(n,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!F(n,o,!s&&!o,!1,"n.nspname","pgc.conname",E,"pg_catalog.pg_type_is_visible(t.oid)",E,3))||(p(n,`UNION ALL
  SELECT o.oid as oid, o.tableoid as tableoid,
  n.nspname as nspname,
  CAST(o.opcname AS pg_catalog.text) as name,
  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_opclass o
    JOIN pg_catalog.pg_am am ON o.opcmethod = am.oid
    JOIN pg_catalog.pg_namespace n ON n.oid = o.opcnamespace
`,t("operator class")),!s&&!o&&r(n,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!F(n,o,!0,!1,"n.nspname","o.opcname",E,"pg_catalog.pg_opclass_is_visible(o.oid)",E,3))||(p(n,`UNION ALL
  SELECT opf.oid as oid, opf.tableoid as tableoid,
  n.nspname as nspname,
  CAST(opf.opfname AS pg_catalog.text) AS name,
  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_opfamily opf
    JOIN pg_catalog.pg_am am ON opf.opfmethod = am.oid
    JOIN pg_catalog.pg_namespace n ON opf.opfnamespace = n.oid
`,t("operator family")),!s&&!o&&r(n,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!F(n,o,!0,!1,"n.nspname","opf.opfname",E,"pg_catalog.pg_opfamily_is_visible(opf.oid)",E,3))||(p(n,`UNION ALL
  SELECT r.oid as oid, r.tableoid as tableoid,
  n.nspname as nspname,
  CAST(r.rulename AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_rewrite r
       JOIN pg_catalog.pg_class c ON c.oid = r.ev_class
       LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
  WHERE r.rulename != '_RETURN'
`,t("rule")),!s&&!o&&r(n,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!F(n,o,!0,!1,"n.nspname","r.rulename",E,"pg_catalog.pg_table_is_visible(c.oid)",E,3))||(p(n,`UNION ALL
  SELECT t.oid as oid, t.tableoid as tableoid,
  n.nspname as nspname,
  CAST(t.tgname AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object
  FROM pg_catalog.pg_trigger t
       JOIN pg_catalog.pg_class c ON c.oid = t.tgrelid
       LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
`,t("trigger")),!s&&!o&&r(n,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!F(n,o,!s&&!o,!1,"n.nspname","t.tgname",E,"pg_catalog.pg_table_is_visible(c.oid)",E,3))||(r(n,`) AS tt
  JOIN pg_catalog.pg_description d ON (tt.oid = d.objoid AND tt.tableoid = d.classoid AND d.objsubid = 0)
`),r(n,"ORDER BY 1, 2, 3;"),a=await u(n.data),!a)?!1:(i.nullPrint=E,i.title=R("Object descriptions"),i.translate_header=
!0,i.translate_columns=e,i.n_translate_columns=$(e),v(a,i,c.queryFout,!1,c.logfile),!0)}async function $n(o,s,n){let a={},
i,e;if(b(a),N(a,`/* %s */
`,R("Get matching relations to describe")),r(a,`SELECT c.oid,
  n.nspname,
  c.relname
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
`),!n&&!o&&r(a,`WHERE n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!F(a,o,!n&&!o,!1,"n.nspname","c.relname",E,"pg_catalog.pg_table_is_visible(c.oid)",E,3)||(r(a,"ORDER BY 2, 3;"),i=await u(
a.data),!i))return!1;if(W(i)==0)return c.quiet||(o?H('Did not find any relation named "%s".',o):H("Did not find any rela\
tions.")),!1;for(e=0;e<W(i);e++){let l,m,S;if(l=A(i,e,0),m=A(i,e,1),S=A(i,e,2),!await ea(m,S,l,s)||X)return!1}return!0}async function ea(o,s,n,a){
let i=!1,e={},l=E,m=c.popt.topt,S={},T,h=E,d=[],L={},O={},M,z=-1,K=-1,Q=-1,x=-1,He=-1,we=-1,Me=-1,Oe=-1,je=-1,Je=-1,Ke=-1,
ze=-1,Qe=-1,Ze=-1,pn,f={},$e=!1;if(m.default_footer=!1,m.expanded=!1,b(e),b(L),b(O),N(e,`/* %s */
`,R("Get general information about one relation")),c.sversion>=12e4?p(e,`SELECT c.relchecks, c.relkind, c.relhasindex, c\
.relhasrules, c.relhastriggers, c.relrowsecurity, c.relforcerowsecurity, false AS relhasoids, c.relispartition, %s, c.re\
ltablespace, CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersisten\
ce, c.relreplident, am.amname
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
LEFT JOIN pg_catalog.pg_am am ON (c.relam = am.oid)
WHERE c.oid = '%s';`,a?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",n):c.sversion>=1e5?p(e,`SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, c.relrowse\
curity, c.relforcerowsecurity, c.relhasoids, c.relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN '' EL\
SE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
WHERE c.oid = '%s';`,a?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",n):c.sversion>=90500?p(e,`SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, c.relrow\
security, c.relforcerowsecurity, c.relhasoids, false as relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 T\
HEN '' ELSE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident
FROM pg_catalog.pg_class c
 LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)
WHERE c.oid = '%s';`,a?`pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.\
reloptions) x), ', ')
`:"''",n):c.sversion>=90400?p(e,`SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, false, f\
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
`:"''",n),l=await u(e.data),!l)return i;if(W(l)==0)return c.quiet||H("Did not find any relation with OID %s.",n),i;if(f.
checks=In(A(l,0,0)),f.relkind=A(l,0,1),f.hasindex=y(A(l,0,2),"t")==0,f.hasrules=y(A(l,0,3),"t")==0,f.hastriggers=y(A(l,0,
4),"t")==0,f.rowsecurity=y(A(l,0,5),"t")==0,f.forcerowsecurity=y(A(l,0,6),"t")==0,f.hasoids=y(A(l,0,7),"t")==0,f.ispartition=
y(A(l,0,8),"t")==0,f.reloptions=pe(A(l,0,9)),f.tablespace=_n(A(l,0,10)),f.reloftype=y(A(l,0,11),"")!=0?pe(A(l,0,11)):E,f.
relpersistence=A(l,0,12),f.relreplident=c.sversion>=90400?A(l,0,13):"d",c.sversion>=12e4?f.relam=te(l,0,14)?E:pe(A(l,0,14)):
f.relam=E,l=E,f.relkind==it){let _=E,I=c.popt,U=[E,E,E];if(N(e,`/* %s */
`,R("Get sequence information")),c.sversion>=1e5?(p(e,`SELECT pg_catalog.format_type(seqtypid, NULL) AS "%s",
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
be(o)),p(e,".%s;",be(s))),l=await u(e.data),!l)return i;if(N(e,`/* %s */
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
 AND d.deptype IN ('a', 'i')`,n),_=await u(e.data),_){if(W(_)==1)switch(A(_,0,1)[0]){case"a":U[0]=tn(R("Owned by: %s"),A(
_,0,0));break;case"i":U[0]=tn(R("Sequence for identity column: %s"),A(_,0,0));break}}else return i;if(c.sversion>=19e4&&
(N(e,`/* %s */
`,R("Get publications containing this sequence")),p(e,`SELECT pubname FROM pg_catalog.pg_publication p
WHERE p.puballsequences
 AND pg_catalog.pg_relation_is_publishable('%s')
ORDER BY 1`,n),_=await u(e.data),_)){let G=W(_);if(G>0){for(N(O,R("Included in publications:")),T=0;T<G;T++)p(O,`
    "%s"`,A(_,T,0));U[0]==E?U[0]=pe(O.data):U[1]=pe(O.data),an(O)}}return f.relpersistence=="u"?N(L,R('Unlogged sequence\
 "%s.%s"'),o,s):N(L,R('Sequence "%s.%s"'),o,s),I.footers=U,I.topt.default_footer=!1,I.title=L.data,I.translate_header=!0,
v(l,I,c.queryFout,!1,c.logfile),i=!0,i}if(f.relkind==st){let _=c.popt,I=[E,E,E];if(N(e,`/* %s */
`,R("Get property graph information")),p(e,`SELECT e.pgealias AS "%s",
     pg_catalog.quote_ident(n.nspname) || '.' ||
          pg_catalog.quote_ident(c.relname) AS "%s",
     case e.pgekind when 'v' then 'vertex'
                    when 'e' then 'edge' end AS "%s",
     s.pgealias as "%s",
     d.pgealias as "%s"
 FROM pg_catalog.pg_propgraph_element e
      INNER JOIN pg_catalog.pg_class c ON c.oid = e.pgerelid
      INNER JOIN pg_catalog.pg_namespace n ON c.relnamespace = n.oid
      LEFT JOIN pg_catalog.pg_propgraph_element s ON e.pgesrcvertexid = s.oid
      LEFT JOIN pg_catalog.pg_propgraph_element d ON e.pgedestvertexid = d.oid
 WHERE e.pgepgid = '%s'
 ORDER BY e.pgealias`,t("Element Alias"),t("Element Table"),t("Element Kind"),t("Source Vertex Alias"),t("Destination Ve\
rtex Alias"),n),l=await u(e.data),!l)return i;if(N(L,R('Property Graph "%s.%s"'),o,s),a){let U;N(e,`/* %s */
`,R("Get property graph definition")),p(e,"SELECT pg_catalog.pg_get_propgraphdef('%s'::pg_catalog.oid);",n),U=await u(e.
data),U&&W(U)>0&&(I[0]=pe(R("Property graph definition:")),I[1]=pe(A(U,0,0)))}return _.footers=I,_.topt.default_footer=!1,
_.title=L.data,_.translate_header=!0,v(l,_,c.queryFout,!1,c.logfile),i=!0,i}if((f.relkind==Re||f.relkind==Be||f.relkind==
Ee||f.relkind==_e||f.relkind==Rn||f.relkind==le)&&($e=!0),M=0,N(e,`/* %s */
`,R("Get per-column information for one relation")),r(e,"SELECT a.attname"),z=M++,r(e,`,
  pg_catalog.format_type(a.atttypid, a.atttypmod)`),K=M++,$e&&(r(e,`,
  (SELECT pg_catalog.pg_get_expr(d.adbin, d.adrelid, true)
   FROM pg_catalog.pg_attrdef d
   WHERE d.adrelid = a.attrelid AND d.adnum = a.attnum AND a.atthasdef),
  a.attnotnull`),Q=M++,x=M++,r(e,`,
  (SELECT c.collname FROM pg_catalog.pg_collation c, pg_catalog.pg_type t
   WHERE c.oid = a.attcollation AND t.oid = a.atttypid AND a.attcollation <> t.typcollation) AS attcollation`),He=M++,c.
sversion>=1e5?r(e,`,
  a.attidentity`):r(e,`,
  ''::pg_catalog.char AS attidentity`),we=M++,c.sversion>=12e4?r(e,`,
  a.attgenerated`):r(e,`,
  ''::pg_catalog.char AS attgenerated`),Me=M++),(f.relkind==de||f.relkind==Ae)&&(c.sversion>=11e4&&(p(e,`,
  CASE WHEN a.attnum <= (SELECT i.indnkeyatts FROM pg_catalog.pg_index i WHERE i.indexrelid = '%s') THEN '%s' ELSE '%s' \
END AS is_key`,n,t("yes"),t("no")),Oe=M++),r(e,`,
  pg_catalog.pg_get_indexdef(a.attrelid, a.attnum, TRUE) AS indexdef`),je=M++),f.relkind==_e&&(r(e,`,
  CASE WHEN attfdwoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT pg_catalog.quote_ident(o\
ption_name) || ' ' || pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(attfdwoptions)), ', \
') || ')' END AS attfdwoptions`),Je=M++),a&&(r(e,`,
  a.attstorage`),Ke=M++,c.sversion>=14e4&&!c.hide_compression&&(f.relkind==Re||f.relkind==le||f.relkind==Ee)&&(r(e,`,
  a.attcompression AS attcompression`),ze=M++),(f.relkind==Re||f.relkind==de||f.relkind==Ae||f.relkind==Ee||f.relkind==_e||
f.relkind==le)&&(r(e,`,
  CASE WHEN a.attstattarget=-1 THEN NULL ELSE a.attstattarget END AS attstattarget`),Qe=M++),(f.relkind==Re||f.relkind==
Be||f.relkind==Ee||f.relkind==_e||f.relkind==Rn||f.relkind==le)&&(r(e,`,
  pg_catalog.col_description(a.attrelid, a.attnum)`),Ze=M++)),r(e,`
FROM pg_catalog.pg_attribute a`),p(e,`
WHERE a.attrelid = '%s' AND a.attnum > 0 AND NOT a.attisdropped`,n),r(e,`
ORDER BY a.attnum;`),l=await u(e.data),!l)return i;switch(pn=W(l),f.relkind){case Re:f.relpersistence=="u"?N(L,R('Unlogg\
ed table "%s.%s"'),o,s):N(L,R('Table "%s.%s"'),o,s);break;case Be:N(L,R('View "%s.%s"'),o,s);break;case Ee:N(L,R('Materi\
alized view "%s.%s"'),o,s);break;case de:f.relpersistence=="u"?N(L,R('Unlogged index "%s.%s"'),o,s):N(L,R('Index "%s.%s"'),
o,s);break;case Ae:f.relpersistence=="u"?N(L,R('Unlogged partitioned index "%s.%s"'),o,s):N(L,R('Partitioned index "%s.%\
s"'),o,s);break;case ve:N(L,R('TOAST table "%s.%s"'),o,s);break;case Rn:N(L,R('Composite type "%s.%s"'),o,s);break;case _e:
N(L,R('Foreign table "%s.%s"'),o,s);break;case le:f.relpersistence=="u"?N(L,R('Unlogged partitioned table "%s.%s"'),o,s):
N(L,R('Partitioned table "%s.%s"'),o,s);break;default:N(L,'?%c? "%s.%s"',f.relkind,o,s);break}for(M=0,d[M++]=t("Column"),
d[M++]=t("Type"),$e&&(d[M++]=t("Collation"),d[M++]=t("Nullable"),d[M++]=t("Default")),Oe>=0&&(d[M++]=t("Key?")),je>=0&&(d[M++]=
t("Definition")),Je>=0&&(d[M++]=t("FDW options")),Ke>=0&&(d[M++]=t("Storage")),ze>=0&&(d[M++]=t("Compression")),Qe>=0&&(d[M++]=
t("Stats target")),Ze>=0&&(d[M++]=t("Description")),Pe(M<=$(d)),ke(S,m,L.data,M,pn),T=0;T<M;T++)ie(S,d[T],!0,"l");for(T=
0;T<pn;T++){if(k(S,A(l,T,z),!1,!1),k(S,A(l,T,K),!1,!1),$e){let _,I,U,G=!1;k(S,A(l,T,He),!1,!1),k(S,y(A(l,T,x),"t")==0?"n\
ot null":"",!1,!1),_=A(l,T,we),I=A(l,T,Me),_[0]==et?U="generated always as identity":_[0]==nt?U="generated by default as\
 identity":I[0]==at?(U=tn("generated always as (%s) stored",A(l,T,Q)),G=!0):I[0]==tt?(U=tn("generated always as (%s)",A(
l,T,Q)),G=!0):U=A(l,T,Q),k(S,U,!1,G)}if(Oe>=0&&k(S,A(l,T,Oe),!0,!1),je>=0&&k(S,A(l,T,je),!1,!1),Je>=0&&k(S,A(l,T,Je),!1,
!1),Ke>=0){let _=A(l,T,Ke);k(S,_[0]=="p"?"plain":_[0]=="m"?"main":_[0]=="x"?"extended":_[0]=="e"?"external":"???",!1,!1)}
if(ze>=0){let _=A(l,T,ze);k(S,_[0]=="p"?"pglz":_[0]=="l"?"lz4":_[0]==E?"":"???",!1,!1)}Qe>=0&&k(S,A(l,T,Qe),!1,!1),Ze>=0&&
k(S,A(l,T,Ze),!1,!1)}if(f.ispartition){let _;if(N(e,`/* %s */
`,R("Get partitioning information for this partition")),r(e,`SELECT inhparent::pg_catalog.regclass,
  pg_catalog.pg_get_expr(c.relpartbound, c.oid),
  `),r(e,c.sversion>=14e4?"inhdetachpending":"false as inhdetachpending"),a&&r(e,`,
  pg_catalog.pg_get_partition_constraintdef(c.oid)`),p(e,`
FROM pg_catalog.pg_class c JOIN pg_catalog.pg_inherits i ON c.oid = inhrelid
WHERE c.oid = '%s';`,n),_=await u(e.data),!_)return i;if(W(_)>0){let I=A(_,0,0),U=A(_,0,1),G=A(_,0,2);if(N(O,R("Partitio\
n of: %s %s%s"),I,U,y(G,"t")==0?" DETACH PENDING":""),w(S,O.data),a){let Y=E;te(_,0,3)||(Y=A(_,0,3)),Y==E||Y[0]==E?N(O,R(
"No partition constraint")):N(O,R("Partition constraint: %s"),Y),w(S,O.data)}}}if(f.relkind==le){let _;if(N(e,`/* %s */
`,R("Get partitioning information for this table")),p(e,"SELECT pg_catalog.pg_get_partkeydef('%s'::pg_catalog.oid);",n),
_=await u(e.data),!_)return i;if(W(_)==1){let I=A(_,0,0);N(O,R("Partition key: %s"),I),w(S,O.data)}}if(f.relkind==ve){let _;
if(N(e,`/* %s */
`,R("Get the table that owns this TOAST table")),p(e,`SELECT n.nspname, c.relname
FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
WHERE reltoastrelid = '%s';`,n),_=await u(e.data),!_)return i;if(W(_)==1){let I=A(_,0,0),U=A(_,0,1);N(O,R('Owning table:\
 "%s.%s"'),I,U),w(S,O.data)}}if(f.relkind==de||f.relkind==Ae){let _;if(N(e,`/* %s */
`,R("Get index details")),r(e,`SELECT i.indisunique, i.indisprimary, i.indisclustered, i.indisvalid,
  (NOT i.indimmediate) AND EXISTS (SELECT 1 FROM pg_catalog.pg_constraint WHERE conrelid = i.indrelid AND conindid = i.i\
ndexrelid AND contype IN ('p','u','x') AND condeferrable) AS condeferrable,
  (NOT i.indimmediate) AND EXISTS (SELECT 1 FROM pg_catalog.pg_constraint WHERE conrelid = i.indrelid AND conindid = i.i\
ndexrelid AND contype IN ('p','u','x') AND condeferred) AS condeferred,
`),c.sversion>=90400?r(e,`i.indisreplident,
`):r(e,`false AS indisreplident,
`),c.sversion>=15e4?r(e,`i.indnullsnotdistinct,
`):r(e,`false AS indnullsnotdistinct,
`),p(e,`  a.amname, c2.relname, pg_catalog.pg_get_expr(i.indpred, i.indrelid, true)
FROM pg_catalog.pg_index i, pg_catalog.pg_class c, pg_catalog.pg_class c2, pg_catalog.pg_am a
WHERE i.indexrelid = c.oid AND c.oid = '%s' AND c.relam = a.oid
AND i.indrelid = c2.oid;`,n),_=await u(e.data),_){if(W(_)!=1)return i;{let I=A(_,0,0),U=A(_,0,1),G=A(_,0,2),Y=A(_,0,3),ee=A(
_,0,4),ge=A(_,0,5),se=A(_,0,6),Ge=A(_,0,7),Ma=A(_,0,8),Ga=A(_,0,9),On=A(_,0,10);y(U,"t")==0?N(O,R("primary key, ")):y(I,
"t")==0?y(Ge,"t")==0?N(O,R("unique nulls not distinct, ")):N(O,R("unique, ")):an(O),p(O,R('%s, for table "%s.%s"'),Ma,o,
Ga),Ce(On)&&p(O,R(", predicate (%s)"),On),y(G,"t")==0&&r(O,R(", clustered")),y(Y,"t")!=0&&r(O,R(", invalid")),y(ee,"t")==
0&&r(O,R(", deferrable")),y(ge,"t")==0&&r(O,R(", initially deferred")),y(se,"t")==0&&r(O,R(", replica identity")),w(S,O.
data),f.relkind==de&&await ln(S,f.relkind,f.tablespace,!0)}}else return i}else if(f.relkind==Re||f.relkind==Ee||f.relkind==
_e||f.relkind==le||f.relkind==Ae||f.relkind==ve){let _=E,I=0;if(f.hasindex){if(N(e,`/* %s */
`,R("Get indexes for this table")),r(e,`SELECT c2.relname, i.indisprimary, i.indisunique, i.indisclustered, i.indisvalid\
, pg_catalog.pg_get_indexdef(i.indexrelid, 0, true),
  pg_catalog.pg_get_constraintdef(con.oid, true), contype, condeferrable, condeferred`),c.sversion>=90400?r(e,", i.indis\
replident"):r(e,", false AS indisreplident"),r(e,", c2.reltablespace"),c.sversion>=18e4?r(e,", con.conperiod"):r(e,", fa\
lse AS conperiod"),p(e,`
FROM pg_catalog.pg_class c, pg_catalog.pg_class c2, pg_catalog.pg_index i
  LEFT JOIN pg_catalog.pg_constraint con ON (conrelid = i.indrelid AND conindid = i.indexrelid AND contype IN ('p','u','\
x'))
WHERE c.oid = '%s' AND c.oid = i.indrelid AND i.indexrelid = c2.oid
ORDER BY i.indisprimary DESC, c2.relname;`,n),_=await u(e.data),_)I=W(_);else return i;if(I>0)for(w(S,R("Indexes:")),T=0;T<
I;T++){if(N(e,'    "%s"',A(_,T,0)),y(A(_,T,7),"x")==0||y(A(_,T,12),"t")==0)p(e," %s",A(_,T,6));else{let U,G;y(A(_,T,1),"\
t")==0?r(e," PRIMARY KEY,"):y(A(_,T,2),"t")==0&&(y(A(_,T,7),"u")==0?r(e," UNIQUE CONSTRAINT,"):r(e," UNIQUE,")),U=A(_,T,
5),G=sn(U," USING "),G!=E&&(U=U.slice(G+7)),p(e," %s",U),y(A(_,T,8),"t")==0&&r(e," DEFERRABLE"),y(A(_,T,9),"t")==0&&r(e,
" INITIALLY DEFERRED")}y(A(_,T,3),"t")==0&&r(e," CLUSTER"),y(A(_,T,4),"t")!=0&&r(e," INVALID"),y(A(_,T,10),"t")==0&&r(e,
" REPLICA IDENTITY"),w(S,e.data),await ln(S,de,_n(A(_,T,11)),!1)}}if(f.checks){if(N(e,`/* %s */
`,R("Get check constraints for this table")),p(e,`SELECT r.conname, pg_catalog.pg_get_constraintdef(r.oid, true)
FROM pg_catalog.pg_constraint r
WHERE r.conrelid = '%s' AND r.contype = 'c'
ORDER BY 1;`,n),_=await u(e.data),_)I=W(_);else return i;if(I>0)for(w(S,R("Check constraints:")),T=0;T<I;T++)N(e,'    "%\
s" %s',A(_,T,0),A(_,T,1)),w(S,e.data)}if(N(e,`/* %s */
`,R("Get foreign key constraints for this table")),c.sversion>=12e4&&(f.ispartition||f.relkind==le)?p(e,`SELECT conrelid\
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
`,n),c.sversion>=12e4&&p(e,`     AND conparentid = 0
`),p(e,"ORDER BY conname")),_=await u(e.data),_)I=W(_);else return i;if(I>0){let U=Le(_,"sametable"),G=Le(_,"conname"),Y=Le(
_,"condef"),ee=Le(_,"ontable");for(w(S,R("Foreign-key constraints:")),T=0;T<I;T++)y(A(_,T,U),"f")==0?N(e,'    TABLE "%s"\
 CONSTRAINT "%s" %s',A(_,T,ee),A(_,T,G),A(_,T,Y)):N(e,'    "%s" %s',A(_,T,G),A(_,T,Y)),w(S,e.data)}if(N(e,`/* %s */
`,R("Get foreign keys referencing this table")),c.sversion>=12e4?p(e,`SELECT conname, conrelid::pg_catalog.regclass AS o\
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
ORDER BY conname;`,n),_=await u(e.data),_)I=W(_);else return i;if(I>0){let U=Le(_,"conname"),G=Le(_,"ontable"),Y=Le(_,"c\
ondef");for(w(S,R("Referenced by:")),T=0;T<I;T++)N(e,'    TABLE "%s" CONSTRAINT "%s" %s',A(_,T,G),A(_,T,U),A(_,T,Y)),w(S,
e.data)}if(c.sversion>=90500){if(N(e,`/* %s */
`,R("Get row-level policies for this table")),r(e,"SELECT pol.polname,"),c.sversion>=1e5?r(e,` pol.polpermissive,
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
WHERE pol.polrelid = '%s' ORDER BY 1;`,n),_=await u(e.data),_)I=W(_);else return i;for(f.rowsecurity&&!f.forcerowsecurity&&
I>0&&w(S,R("Policies:")),f.rowsecurity&&f.forcerowsecurity&&I>0&&w(S,R("Policies (forced row security enabled):")),f.rowsecurity&&
!f.forcerowsecurity&&I==0&&w(S,R("Policies (row security enabled): (none)")),f.rowsecurity&&f.forcerowsecurity&&I==0&&w(
S,R("Policies (forced row security enabled): (none)")),!f.rowsecurity&&I>0&&w(S,R("Policies (row security disabled):")),
T=0;T<I;T++)N(e,'    POLICY "%s"',A(_,T,0)),A(_,T,1)=="f"&&r(e," AS RESTRICTIVE"),te(_,T,5)||p(e," FOR %s",A(_,T,5)),te(
_,T,2)||p(e,`
      TO %s`,A(_,T,2)),te(_,T,3)||p(e,`
      USING (%s)`,A(_,T,3)),te(_,T,4)||p(e,`
      WITH CHECK (%s)`,A(_,T,4)),w(S,e.data)}if(c.sversion>=14e4){if(N(e,`/* %s */
`,R("Get extended statistics for this table")),p(e,`SELECT oid, stxrelid::pg_catalog.regclass, stxnamespace::pg_catalog.\
regnamespace::pg_catalog.text AS nsp, stxname,
pg_catalog.pg_get_statisticsobjdef_columns(oid) AS columns,
  'd' = any(stxkind) AS ndist_enabled,
  'f' = any(stxkind) AS deps_enabled,
  'm' = any(stxkind) AS mcv_enabled,
stxstattarget
FROM pg_catalog.pg_statistic_ext
WHERE stxrelid = '%s'
ORDER BY nsp, stxname;`,n),_=await u(e.data),_)I=W(_);else return i;if(I>0)for(w(S,R("Statistics objects:")),T=0;T<I;T++){
let U=!1,G,Y,ee,ge,se;G=y(A(_,T,5),"t")==0,Y=y(A(_,T,6),"t")==0,ee=y(A(_,T,7),"t")==0,N(e,"    "),p(e,'"%s.%s"',A(_,T,2),
A(_,T,3)),ge=G&&Y&&ee,se=G||Y||ee,se&&!ge&&(r(e," ("),G&&(r(e,"ndistinct"),U=!0),Y&&(p(e,"%sdependencies",U?", ":""),U=!0),
ee&&p(e,"%smcv",U?", ":""),j(e,")")),p(e," ON %s FROM %s",A(_,T,4),A(_,T,1)),!te(_,T,8)&&y(A(_,T,8),"-1")!=0&&p(e,"; STA\
TISTICS %s",A(_,T,8)),w(S,e.data)}}else if(c.sversion>=1e5){if(N(e,`/* %s */
`,R("Get extended statistics for this table")),r(e,`SELECT oid, stxrelid::pg_catalog.regclass, stxnamespace::pg_catalog.\
regnamespace AS nsp, stxname,
  (SELECT pg_catalog.string_agg(pg_catalog.quote_ident(attname),', ')
   FROM pg_catalog.unnest(stxkeys) s(attnum)
   JOIN pg_catalog.pg_attribute a ON (stxrelid = a.attrelid AND
        a.attnum = s.attnum AND NOT attisdropped)) AS columns,
  'd' = any(stxkind) AS ndist_enabled,
  'f' = any(stxkind) AS deps_enabled,
  'm' = any(stxkind) AS mcv_enabled,
`),c.sversion>=13e4?r(e,`  stxstattarget
`):r(e,`  -1 AS stxstattarget
`),p(e,`FROM pg_catalog.pg_statistic_ext
WHERE stxrelid = '%s'
ORDER BY 1;`,n),_=await u(e.data),_)I=W(_);else return i;if(I>0)for(w(S,R("Statistics objects:")),T=0;T<I;T++){let U=!1;
N(e,"    "),p(e,'"%s.%s" (',A(_,T,2),A(_,T,3)),y(A(_,T,5),"t")==0&&(r(e,"ndistinct"),U=!0),y(A(_,T,6),"t")==0&&(p(e,"%sd\
ependencies",U?", ":""),U=!0),y(A(_,T,7),"t")==0&&p(e,"%smcv",U?", ":""),p(e,") ON %s FROM %s",A(_,T,4),A(_,T,1)),y(A(_,
T,8),"-1")!=0&&p(e,"; STATISTICS %s",A(_,T,8)),w(S,e.data)}}if(f.hasrules&&f.relkind!=Ee){if(N(e,`/* %s */
`,R("Get rules for this relation")),p(e,`SELECT r.rulename, trim(trailing ';' from pg_catalog.pg_get_ruledef(r.oid, true\
)), ev_enabled
FROM pg_catalog.pg_rewrite r
WHERE r.ev_class = '%s' ORDER BY 1;`,n),_=await u(e.data),_)I=W(_);else return i;if(I>0){let U,G;for(G=0;G<4;G++)for(U=!1,
T=0;T<I;T++){let Y,ee=!1;switch(G){case 0:A(_,T,2)=="O"&&(ee=!0);break;case 1:A(_,T,2)=="D"&&(ee=!0);break;case 2:A(_,T,
2)=="A"&&(ee=!0);break;case 3:A(_,T,2)=="R"&&(ee=!0);break}if(ee){if(!U){switch(G){case 0:N(e,R("Rules:"));break;case 1:
N(e,R("Disabled rules:"));break;case 2:N(e,R("Rules firing always:"));break;case 3:N(e,R("Rules firing on replica only:"));
break}w(S,e.data),U=!0}Y=A(_,T,1),Y=Y.slice(12),N(e,"    %s",Y),w(S,e.data)}}}}if(c.sversion>=1e5){if(N(e,`/* %s */
`,R("Get publications that publish this table")),c.sversion>=15e4?(p(e,`SELECT pubname
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
`,n,n,n),c.sversion>=19e4?p(e,` AND NOT pr.prexcept
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
ORDER BY 1;`,n,n),_=await u(e.data),_)I=W(_);else return i;for(I>0&&w(S,R("Included in publications:")),T=0;T<I;T++)N(e,
'    "%s"',A(_,T,0)),te(_,T,2)||p(e," (%s)",A(_,T,2)),te(_,T,1)||p(e," WHERE %s",A(_,T,1)),w(S,e.data)}if(c.sversion>=19e4){
if(N(e,`/* %s */
`,R("Get publications that exclude this table")),p(e,`SELECT pubname
FROM pg_catalog.pg_publication p
JOIN pg_catalog.pg_publication_rel pr ON p.oid = pr.prpubid
WHERE (pr.prrelid = '%s' OR pr.prrelid = pg_catalog.pg_partition_root('%s'))
AND pr.prexcept
ORDER BY 1;`,n,n),_=await u(e.data),_)I=W(_);else return i;for(I>0&&w(S,R("Excluded from publications:")),T=0;T<I;T++)N(
e,'    "%s"',A(_,T,0)),w(S,e.data)}if(a){if(N(e,`/* %s */
`,R("Get not-null constraints for this table")),p(e,`SELECT c.conname, a.attname, c.connoinherit,
  c.conislocal, c.coninhcount <> 0,
  c.convalidated
FROM pg_catalog.pg_constraint c JOIN
  pg_catalog.pg_attribute a ON
    (a.attrelid = c.conrelid AND a.attnum = c.conkey[1])
WHERE c.contype = 'n' AND
  c.conrelid = '%s'::pg_catalog.regclass
ORDER BY a.attnum`,n),_=await u(e.data),_)I=W(_);else return i;for(I>0&&w(S,R("Not-null constraints:")),T=0;T<I;T++){let U=A(
_,T,3)[0]=="t",G=A(_,T,4)[0]=="t",Y=A(_,T,5)[0]=="t";N(e,'    "%s" NOT NULL "%s"%s%s',A(_,T,0),A(_,T,1),A(_,T,2)[0]=="t"?
" NO INHERIT":U&&G?R(" (local, inherited)"):G?R(" (inherited)"):"",Y?"":" NOT VALID"),w(S,e.data)}}}if((f.relkind==Be||f.
relkind==Ee)&&a){let _;if(N(e,`/* %s */
`,R("Get view's definition")),p(e,"SELECT pg_catalog.pg_get_viewdef('%s'::pg_catalog.oid, true);",n),_=await u(e.data),!_)
return i;W(_)>0&&(h=pe(A(_,0,0)))}if(h){let _=E;if(w(S,R("View definition:")),w(S,h),f.hasrules){if(N(e,`/* %s */
`,R("Get rules for this view")),p(e,`SELECT r.rulename, trim(trailing ';' from pg_catalog.pg_get_ruledef(r.oid, true))
FROM pg_catalog.pg_rewrite r
WHERE r.ev_class = '%s' AND r.rulename != '_RETURN' ORDER BY 1;`,n),_=await u(e.data),!_)return i;if(W(_)>0)for(w(S,R("R\
ules:")),T=0;T<W(_);T++){let I;I=A(_,T,1),I=I.slice(12),N(e," %s",I),w(S,e.data)}}}if(f.hastriggers){let _,I;if(N(e,`/* \
%s */
`,R("Get triggers for this relation")),r(e,`SELECT t.tgname, pg_catalog.pg_get_triggerdef(t.oid, true), t.tgenabled, t.t\
gisinternal,
`),c.sversion>=13e4?r(e,`  CASE WHEN t.tgparentid != 0 THEN
    (SELECT u.tgrelid::pg_catalog.regclass
     FROM pg_catalog.pg_trigger AS u,
          pg_catalog.pg_partition_ancestors(t.tgrelid) WITH ORDINALITY AS a(relid, depth)
     WHERE u.tgname = t.tgname AND u.tgrelid = a.relid
           AND u.tgparentid = 0
     ORDER BY a.depth LIMIT 1)
  END AS parent
`):r(e,`  NULL AS parent
`),p(e,`FROM pg_catalog.pg_trigger t
WHERE t.tgrelid = '%s' AND `,n),c.sversion>=11e4&&c.sversion<15e4?r(e,`(NOT t.tgisinternal OR (t.tgisinternal AND t.tgen\
abled = 'D') 
    OR EXISTS (SELECT 1 FROM pg_catalog.pg_depend WHERE objid = t.oid 
        AND refclassid = 'pg_catalog.pg_trigger'::pg_catalog.regclass))`):r(e,"(NOT t.tgisinternal OR (t.tgisinternal AN\
D t.tgenabled = 'D'))"),r(e,`
ORDER BY 1;`),_=await u(e.data),_)I=W(_);else return i;if(I>0){let U,G;for(G=0;G<=4;G++)for(U=!1,T=0;T<I;T++){let Y,ee,ge,
se,Ge;switch(se=A(_,T,2),Ge=A(_,T,3),Y=!1,G){case 0:(se=="O"||se=="t")&&(Y=!0);break;case 1:(se=="D"||se=="f")&&Ge=="f"&&
(Y=!0);break;case 2:(se=="D"||se=="f")&&Ge=="t"&&(Y=!0);break;case 3:se=="A"&&(Y=!0);break;case 4:se=="R"&&(Y=!0);break}
if(Y!=!1){if(U==!1){switch(G){case 0:N(e,R("Triggers:"));break;case 1:N(e,R("Disabled user triggers:"));break;case 2:N(e,
R("Disabled internal triggers:"));break;case 3:N(e,R("Triggers firing always:"));break;case 4:N(e,R("Triggers firing on \
replica only:"));break}w(S,e.data),U=!0}ee=A(_,T,1),ge=sn(ee," TRIGGER "),ge!=E&&(ee=ee.slice(ge+9)),N(e,"    %s",ee),te(
_,T,4)||p(e,", ON TABLE %s",A(_,T,4)),w(S,e.data)}}}}if(f.relkind==Re||f.relkind==Ee||f.relkind==_e||f.relkind==le||f.relkind==
Ae||f.relkind==ve){let _,I,U;if(_=f.relkind==le||f.relkind==Ae,f.relkind==_e){let G;if(N(e,`/* %s */
`,R("Get foreign server for this table")),p(e,`SELECT s.srvname,
  pg_catalog.array_to_string(ARRAY(
    SELECT pg_catalog.quote_ident(option_name) || ' ' || pg_catalog.quote_literal(option_value)
    FROM pg_catalog.pg_options_to_table(ftoptions)),  ', ')
FROM pg_catalog.pg_foreign_table f,
     pg_catalog.pg_foreign_server s
WHERE f.ftrelid = '%s' AND s.oid = f.ftserver;`,n),I=await u(e.data),I){if(W(I)!=1)return i}else return i;N(e,R("Server:\
 %s"),A(I,0,0)),w(S,e.data),G=A(I,0,1),G&&G[0]!=E&&(N(e,R("FDW options: (%s)"),G),w(S,e.data))}if(N(e,`/* %s */
`,R("Get inheritance parent tables")),p(e,`SELECT c.oid::pg_catalog.regclass
FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i
WHERE c.oid = i.inhparent AND i.inhrelid = '%s'
  AND c.relkind != 'p' AND c.relkind != 'I'
ORDER BY inhseqno;`,n),I=await u(e.data),I){let G=R("Inherits");for(U=W(I),U>0&&(N(e,"%s:",G),w(S,e.data)),T=0;T<U;T++)N(
e,"    %s",A(I,T,0)),w(S,e.data)}else return i;if(N(e,`/* %s */
`,R("Get child tables")),c.sversion>=14e4?p(e,`SELECT c.oid::pg_catalog.regclass, c.relkind, inhdetachpending, pg_catalo\
g.pg_get_expr(c.relpartbound, c.oid)
FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i
WHERE c.oid = i.inhrelid AND i.inhparent = '%s'
ORDER BY pg_catalog.pg_get_expr(c.relpartbound, c.oid) = 'DEFAULT', c.oid::pg_catalog.regclass::pg_catalog.text;`,n):c.sversion>=
1e5?p(e,`SELECT c.oid::pg_catalog.regclass, c.relkind, false AS inhdetachpending, pg_catalog.pg_get_expr(c.relpartbound,\
 c.oid)
FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i
WHERE c.oid = i.inhrelid AND i.inhparent = '%s'
ORDER BY pg_catalog.pg_get_expr(c.relpartbound, c.oid) = 'DEFAULT', c.oid::pg_catalog.regclass::pg_catalog.text;`,n):p(e,
`SELECT c.oid::pg_catalog.regclass, c.relkind, false AS inhdetachpending, NULL
FROM pg_catalog.pg_class c, pg_catalog.pg_inherits i
WHERE c.oid = i.inhrelid AND i.inhparent = '%s'
ORDER BY c.oid::pg_catalog.regclass::pg_catalog.text;`,n),I=await u(e.data),!I)return i;if(U=W(I),_&&U==0)N(e,R("Number \
of partitions: %d"),U),w(S,e.data);else if(!a)U>0&&(_?N(e,R("Number of partitions: %d (Use \\d+ to list them.)"),U):N(e,
R("Number of child tables: %d (Use \\d+ to list them.)"),U),w(S,e.data));else{let G=R(_?"Partitions":"Child tables");for(U>
0&&(N(e,"%s:",G),w(S,e.data)),T=0;T<U;T++){let Y=A(I,T,1);N(e,"    %s",A(I,T,0)),te(I,T,3)||p(e," %s",A(I,T,3)),Y==le||Y==
Ae?r(e,", PARTITIONED"):Y==_e&&r(e,", FOREIGN"),y(A(I,T,2),"t")==0&&r(e," (DETACH PENDING)"),w(S,e.data)}}if(f.reloftype&&
(N(e,R("Typed table of type: %s"),f.reloftype),w(S,e.data)),a&&(f.relkind==Re||f.relkind==Ee)&&f.relreplident!="i"&&(y(o,
"pg_catalog")!=0&&f.relreplident!="d"||y(o,"pg_catalog")==0&&f.relreplident!="n")){let G=R("Replica Identity");N(e,"%s: \
%s",G,f.relreplident=="f"?"FULL":f.relreplident=="n"?"NOTHING":"???"),w(S,e.data)}a&&f.relkind!=Ee&&f.hasoids&&w(S,R("Ha\
s OIDs: yes")),await ln(S,f.relkind,f.tablespace,!0),a&&f.relam!=E&&!c.hide_tableam&&(N(e,R("Access method: %s"),f.relam),
w(S,e.data))}if(a&&f.reloptions&&f.reloptions[0]!=E){let _=R("Options");N(e,"%s: %s",_,f.reloptions),w(S,e.data)}return Xe(
S,c.queryFout,!1,c.logfile),i=!0,i}async function ln(o,s,n,a){if((s==Re||s==Ee||s==de||s==le||s==Ae||s==ve)&&n!=0){let i=E,
e={};if(b(e),N(e,`/* %s */
`,R("Get tablespace information for this relation")),p(e,`SELECT spcname FROM pg_catalog.pg_tablespace
WHERE oid = '%u';`,n),i=await u(e.data),!i)return;W(i)>0&&(a?(N(e,R('Tablespace: "%s"'),A(i,0,0)),w(o,e.data)):(N(e,"%s",
o.footer),p(e,R(', tablespace "%s"'),A(i,0,0)),Hn(o,e.data)))}}async function mn(o,s,n){let a={},i,e={},l=c.popt.topt,m=2,
S=0,T,h,d="l",L;if(l.default_footer=!1,b(a),N(a,`/* %s */
`,R("Get matching roles")),r(a,`SELECT r.rolname, r.rolsuper, r.rolinherit,
  r.rolcreaterole, r.rolcreatedb, r.rolcanlogin,
  r.rolconnlimit, r.rolvaliduntil`),s&&(r(a,`
, pg_catalog.shobj_description(r.oid, 'pg_authid') AS description`),m++),r(a,`
, r.rolreplication`),c.sversion>=90500&&r(a,`
, r.rolbypassrls`),r(a,`
FROM pg_catalog.pg_roles r
`),!n&&!o&&r(a,`WHERE r.rolname !~ '^pg_'
`),!F(a,o,!1,!1,E,"r.rolname",E,E,E,1)||(r(a,"ORDER BY 1;"),i=await u(a.data),!i))return!1;for(S=W(i),L=[],ke(e,l,R("Lis\
t of roles"),m,S),ie(e,t("Role name"),!0,d),ie(e,t("Attributes"),!0,d),s&&ie(e,t("Description"),!0,d),T=0;T<S;T++)k(e,A(
i,T,0),!1,!1),an(a),y(A(i,T,1),"t")==0&&fe(a,R("Superuser")),y(A(i,T,2),"t")!=0&&fe(a,R("No inheritance")),y(A(i,T,3),"t")==
0&&fe(a,R("Create role")),y(A(i,T,4),"t")==0&&fe(a,R("Create DB")),y(A(i,T,5),"t")!=0&&fe(a,R("Cannot login")),y(A(i,T,s?
9:8),"t")==0&&fe(a,R("Replication")),c.sversion>=90500&&y(A(i,T,s?10:9),"t")==0&&fe(a,R("Bypass RLS")),h=In(A(i,T,6)),h>=
0&&(a.len>0&&j(a,`
`),h==0?r(a,R("No connections")):p(a,ngettext("%d connection","%d connections",h),h)),y(A(i,T,7),"")!=0&&(a.len>0&&j(a,`\

`),r(a,R("Password valid until ")),r(a,A(i,T,7))),L[T]=pe(a.data),k(e,L[T],!1,!1),s&&k(e,A(i,T,8),!1,!1);return Xe(e,c.queryFout,
!1,c.logfile),!0}function fe(o,s){o.len>0&&r(o,", "),r(o,s)}async function na(o,s){let n={},a,i=c.popt,e={};return b(n),
N(n,`/* %s */
`,R("Get per-database and per-role settings")),p(n,`SELECT rolname AS "%s", datname AS "%s",
pg_catalog.array_to_string(setconfig, E'\\n') AS "%s"
FROM pg_catalog.pg_db_role_setting s
LEFT JOIN pg_catalog.pg_database d ON d.oid = setdatabase
LEFT JOIN pg_catalog.pg_roles r ON r.oid = setrole
`,t("Role"),t("Database"),t("Settings")),!F(n,o,!1,!1,E,"r.rolname",E,E,e,1)||!F(n,s,e.value,!1,E,"d.datname",E,E,E,1)||
(r(n,"ORDER BY 1, 2;"),a=await u(n.data),!a)?!1:(W(a)==0&&!c.quiet?o&&s?H('Did not find any settings for role "%s" and d\
atabase "%s".',o,s):o?H('Did not find any settings for role "%s".',o):H("Did not find any settings."):(i.nullPrint=E,i.title=
R("List of settings"),i.translate_header=!0,v(a,i,c.queryFout,!1,c.logfile)),!0)}async function aa(o,s){let n={},a,i=c.popt;
return b(n),N(n,`/* %s */
`,R("Get matching role grants")),p(n,`SELECT m.rolname AS "%s", r.rolname AS "%s",
  pg_catalog.concat_ws(', ',
`,t("Role name"),t("Member of")),c.sversion>=16e4?r(n,`    CASE WHEN pam.admin_option THEN 'ADMIN' END,
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
`),!s&&!o&&r(n,`WHERE m.rolname !~ '^pg_'
`),!F(n,o,!1,!1,E,"m.rolname",E,E,E,1)||(r(n,`ORDER BY 1, 2, 4;
`),a=await u(n.data),!a)?!1:(i.nullPrint=E,i.title=R("List of role grants"),i.translate_header=!0,v(a,i,c.queryFout,!1,c.
logfile),!0)}async function fn(o,s,n,a){let i=Z(o,"t")!=E,e=Z(o,"i")!=E,l=Z(o,"v")!=E,m=Z(o,"m")!=E,S=Z(o,"s")!=E,T=Z(o,
"E")!=E,h=Z(o,"G")!=E,d,L={},O,M=c.popt,z,K=[!1,!1,!0,!1,!1,!1,!1,!1,!1];return d=i+e+l+m+S+T+h,d==0&&(i=l=m=S=T=h=!0),b(
L),N(L,`/* %s */
`,R("Get matching relations")),p(L,`SELECT n.nspname as "%s",
  c.relname as "%s",
  CASE c.relkind WHEN 'r' THEN '%s' WHEN 'v' THEN '%s' WHEN 'm' THEN '%s' WHEN 'i' THEN '%s' WHEN 'S' THEN '%s' WHEN 't'\
 THEN '%s' WHEN 'f' THEN '%s' WHEN 'p' THEN '%s' WHEN 'I' THEN '%s' WHEN 'g' THEN '%s' END as "%s",
  pg_catalog.pg_get_userbyid(c.relowner) as "%s"`,t("Schema"),t("Name"),t("table"),t("view"),t("materialized view"),t("i\
ndex"),t("sequence"),t("TOAST table"),t("foreign table"),t("partitioned table"),t("partitioned index"),t("property graph"),
t("Type"),t("Owner")),z=4,e&&(p(L,`,
  c2.relname as "%s"`,t("Table")),z++),n&&(p(L,`,
  CASE c.relpersistence WHEN 'p' THEN '%s' WHEN 't' THEN '%s' WHEN 'u' THEN '%s' END as "%s"`,t("permanent"),t("temporar\
y"),t("unlogged"),t("Persistence")),K[z]=!0,c.sversion>=12e4&&!c.hide_tableam&&(i||m||e)&&p(L,`,
  am.amname as "%s"`,t("Access method")),p(L,`,
  pg_catalog.pg_size_pretty(pg_catalog.pg_table_size(c.oid)) as "%s",
  pg_catalog.obj_description(c.oid, 'pg_class') as "%s"`,t("Size"),t("Description"))),r(L,`
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace`),c.sversion>=12e4&&!c.hide_tableam&&(i||m||e)&&r(L,`\

     LEFT JOIN pg_catalog.pg_am am ON am.oid = c.relam`),e&&r(L,`
     LEFT JOIN pg_catalog.pg_index i ON i.indexrelid = c.oid
     LEFT JOIN pg_catalog.pg_class c2 ON i.indrelid = c2.oid`),r(L,`
WHERE c.relkind IN (`),i&&(r(L,"'r','p',"),(a||s)&&r(L,"'t',")),l&&r(L,"'v',"),m&&r(L,"'m',"),e&&r(L,"'i','I',"),S&&r(L,
"'S',"),(a||s)&&r(L,"'s',"),T&&r(L,"'f',"),h&&r(L,"'g',"),r(L,"''"),r(L,`)
`),!a&&!s&&r(L,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname !~ '^pg_toast'
      AND n.nspname <> 'information_schema'
`),!F(L,s,!0,!1,"n.nspname","c.relname",E,"pg_catalog.pg_table_is_visible(c.oid)",E,3)||(r(L,"ORDER BY 1,2;"),O=await u(
L.data),!O)?!1:(W(O)==0&&!c.quiet?s?d!=1?H('Did not find any relations named "%s".',s):i?H('Did not find any tables name\
d "%s".',s):e?H('Did not find any indexes named "%s".',s):l?H('Did not find any views named "%s".',s):m?H('Did not find \
any materialized views named "%s".',s):S?H('Did not find any sequences named "%s".',s):T?H('Did not find any foreign tab\
les named "%s".',s):h?H('Did not find any property graphs named "%s".',s):pg_log_error_internal('Did not find any ??? na\
med "%s".',s):d!=1?H("Did not find any relations."):i?H("Did not find any tables."):e?H("Did not find any indexes."):l?H(
"Did not find any views."):m?H("Did not find any materialized views."):S?H("Did not find any sequences."):T?H("Did not f\
ind any foreign tables."):h?H("Did not find any property graphs."):pg_log_error_internal("Did not find any ??? relations\
."):(M.nullPrint=E,M.title=d!=1?R("List of relations"):i?R("List of tables"):e?R("List of indexes"):l?R("List of views"):
m?R("List of materialized views"):S?R("List of sequences"):T?R("List of foreign tables"):h?R("List of property graphs"):
"List of ???",M.translate_header=!0,M.translate_columns=K,M.n_translate_columns=$(K),v(O,M,c.queryFout,!1,c.logfile)),!0)}
async function ta(o,s,n){let a=Z(o,"t")!=E,i=Z(o,"i")!=E,e=Z(o,"n")!=E,l={},m={},S,T=c.popt,h=[!1,!1,!1,!1,!1,!1,!1,!1,!1,
!1],d,L=!1;if(c.sversion<1e5){let O;return H("The server (version %s) does not support declarative table partitioning.",
Se(c.sversion,!1,O,Ne(O))),!0}return!a&&!i&&(a=i=!0),i&&!a?d=R("List of partitioned indexes"):a&&!i?d=R("List of partiti\
oned tables"):(d=R("List of partitioned relations"),L=!0),b(l),N(l,`/* %s */
`,R("Get matching partitioned relations")),p(l,`SELECT n.nspname as "%s",
  c.relname as "%s",
  pg_catalog.pg_get_userbyid(c.relowner) as "%s"`,t("Schema"),t("Name"),t("Owner")),L&&(p(l,`,
  CASE c.relkind WHEN 'p' THEN '%s' WHEN 'I' THEN '%s' END as "%s"`,t("partitioned table"),t("partitioned index"),t("Typ\
e")),h[3]=!0),(e||s)&&p(l,`,
  inh.inhparent::pg_catalog.regclass as "%s"`,t("Parent name")),i&&p(l,`,
 c2.oid::pg_catalog.regclass as "%s"`,t("Table")),n&&(p(l,`,
  am.amname as "%s"`,t("Access method")),e&&p(l,`,
  s.dps as "%s"`,t("Leaf partition size")),p(l,`,
  s.tps as "%s"`,t("Total size")),p(l,`,
  pg_catalog.obj_description(c.oid, 'pg_class') as "%s"`,t("Description"))),r(l,`
FROM pg_catalog.pg_class c
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace`),i&&r(l,`
     LEFT JOIN pg_catalog.pg_index i ON i.indexrelid = c.oid
     LEFT JOIN pg_catalog.pg_class c2 ON i.indrelid = c2.oid`),(e||s)&&r(l,`
     LEFT JOIN pg_catalog.pg_inherits inh ON c.oid = inh.inhrelid`),n&&(r(l,`
     LEFT JOIN pg_catalog.pg_am am ON c.relam = am.oid`),c.sversion<12e4?r(l,`,
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
               FROM d) s`):r(l,`,
     LATERAL (SELECT pg_catalog.pg_size_pretty(sum(
                 CASE WHEN ppt.isleaf AND ppt.level = 1
                      THEN pg_catalog.pg_table_size(ppt.relid) ELSE 0 END)) AS dps,
                     pg_catalog.pg_size_pretty(sum(pg_catalog.pg_table_size(ppt.relid))) AS tps
              FROM pg_catalog.pg_partition_tree(c.oid) ppt) s`)),r(l,`
WHERE c.relkind IN (`),a&&r(l,"'p',"),i&&r(l,"'I',"),r(l,"''"),r(l,`)
`),r(l,!e&&!s?` AND NOT c.relispartition
`:""),s||r(l,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname !~ '^pg_toast'
      AND n.nspname <> 'information_schema'
`),!F(l,s,!0,!1,"n.nspname","c.relname",E,"pg_catalog.pg_table_is_visible(c.oid)",E,3)||(p(l,'ORDER BY "Schema", %s%s"Na\
me";',L?'"Type" DESC, ':"",e||s?'"Parent name" NULLS FIRST, ':""),S=await u(l.data),!S)?!1:(b(m),r(m,d),T.nullPrint=E,T.
title=m.data,T.translate_header=!0,T.translate_columns=h,T.n_translate_columns=$(h),v(S,T,c.queryFout,!1,c.logfile),!0)}
async function ia(o,s,n){let a={},i,e=c.popt;return b(a),N(a,`/* %s */
`,R("Get matching procedural languages")),p(a,`SELECT l.lanname AS "%s",
       pg_catalog.pg_get_userbyid(l.lanowner) as "%s",
       l.lanpltrusted AS "%s"`,t("Name"),t("Owner"),t("Trusted")),s&&(p(a,`,
       NOT l.lanispl AS "%s",
       l.lanplcallfoid::pg_catalog.regprocedure AS "%s",
       l.lanvalidator::pg_catalog.regprocedure AS "%s",
       l.laninline::pg_catalog.regprocedure AS "%s",
       `,t("Internal language"),t("Call handler"),t("Validator"),t("Inline handler")),re(a,"l.lanacl")),p(a,`,
       d.description AS "%s"
FROM pg_catalog.pg_language l
LEFT JOIN pg_catalog.pg_description d
  ON d.classoid = l.tableoid AND d.objoid = l.oid
  AND d.objsubid = 0
`,t("Description")),o&&!F(a,o,!1,!1,E,"l.lanname",E,E,E,2)||(!n&&!o&&r(a,`WHERE l.lanplcallfoid != 0
`),r(a,"ORDER BY 1;"),i=await u(a.data),!i)?!1:(e.nullPrint=E,e.title=R("List of languages"),e.translate_header=!0,v(i,e,
c.queryFout,!1,c.logfile),!0)}async function sa(o,s,n){let a={},i,e=c.popt;return b(a),N(a,`/* %s */
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
       ), ' ') as "%s"`,t("Schema"),t("Name"),t("Type"),t("Collation"),t("Nullable"),t("Default"),t("Check")),s&&(r(a,`,\

  `),re(a,"t.typacl"),p(a,`,
       d.description as "%s"`,t("Description"))),r(a,`
FROM pg_catalog.pg_type t
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
`),s&&r(a,`     LEFT JOIN pg_catalog.pg_description d ON d.classoid = t.tableoid AND d.objoid = t.oid AND d.objsubid = 0\

`),r(a,`WHERE t.typtype = 'd'
`),!n&&!o&&r(a,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),!F(a,o,!0,!1,"n.nspname","t.typname",E,"pg_catalog.pg_type_is_visible(t.oid)",E,3)||(r(a,"ORDER BY 1, 2;"),i=await u(
a.data),!i)?!1:(e.nullPrint=E,e.title=R("List of domains"),e.translate_header=!0,v(i,e,c.queryFout,!1,c.logfile),!0)}async function oa(o,s,n){
let a={},i,e=c.popt,l=[!1,!1,!1,!1,!0,!1];return b(a),N(a,`/* %s */
`,R("Get matching conversions")),p(a,`SELECT n.nspname AS "%s",
       c.conname AS "%s",
       pg_catalog.pg_encoding_to_char(c.conforencoding) AS "%s",
       pg_catalog.pg_encoding_to_char(c.contoencoding) AS "%s",
       CASE WHEN c.condefault THEN '%s'
       ELSE '%s' END AS "%s"`,t("Schema"),t("Name"),t("Source"),t("Destination"),t("yes"),t("no"),t("Default?")),s&&p(a,
`,
       d.description AS "%s"`,t("Description")),r(a,`
FROM pg_catalog.pg_conversion c
     JOIN pg_catalog.pg_namespace n ON n.oid = c.connamespace
`),s&&r(a,`LEFT JOIN pg_catalog.pg_description d ON d.classoid = c.tableoid
          AND d.objoid = c.oid AND d.objsubid = 0
`),r(a,`WHERE true
`),!n&&!o&&r(a,`  AND n.nspname <> 'pg_catalog'
  AND n.nspname <> 'information_schema'
`),!F(a,o,!0,!1,"n.nspname","c.conname",E,"pg_catalog.pg_conversion_is_visible(c.oid)",E,3)||(r(a,"ORDER BY 1, 2;"),i=await u(
a.data),!i)?!1:(e.nullPrint=E,e.title=R("List of conversions"),e.translate_header=!0,e.translate_columns=l,e.n_translate_columns=
$(l),v(i,e,c.queryFout,!1,c.logfile),!0)}async function ra(o,s,n){let a={},i,e=c.popt;return b(a),N(a,`/* %s */
`,R("Get matching configuration parameters")),p(a,'SELECT s.name AS "%s", pg_catalog.current_setting(s.name) AS "%s"',t(
"Parameter"),t("Value")),s&&(p(a,', s.vartype AS "%s", s.context AS "%s", ',t("Type"),t("Context")),c.sversion>=15e4?re(
a,"p.paracl"):p(a,'NULL AS "%s"',t("Access privileges"))),r(a,`
FROM pg_catalog.pg_settings s
`),s&&c.sversion>=15e4&&r(a,`  LEFT JOIN pg_catalog.pg_parameter_acl p
  ON pg_catalog.lower(s.name) = p.parname
`),o?ye(c.db,a,o,!1,!1,E,"pg_catalog.lower(s.name)",E,E,E,E):r(a,`WHERE s.source <> 'default' AND
      s.setting IS DISTINCT FROM s.boot_val
`),r(a,"ORDER BY 1;"),i=await u(a.data),i?(e.nullPrint=E,o?e.title=R("List of configuration parameters"):e.title=R("List\
 of non-default configuration parameters"),e.translate_header=!0,v(i,e,c.queryFout,!1,c.logfile),!0):!1}async function Ea(o,s){
let n={},a,i=c.popt,e=[!1,!1,!1,!0,!1,!1,!1];if(c.sversion<90300){let l;return H("The server (version %s) does not suppo\
rt event triggers.",Se(c.sversion,!1,l,Ne(l))),!0}return b(n),N(n,`/* %s */
`,R("Get matching event triggers")),p(n,`SELECT evtname as "%s", evtevent as "%s", pg_catalog.pg_get_userbyid(e.evtowner\
) as "%s",
 case evtenabled when 'O' then '%s'  when 'R' then '%s'  when 'A' then '%s'  when 'D' then '%s' end as "%s",
 e.evtfoid::pg_catalog.regproc as "%s", pg_catalog.array_to_string(array(select x from pg_catalog.unnest(evttags) as t(x\
)), ', ') as "%s"`,t("Name"),t("Event"),t("Owner"),t("enabled"),t("replica"),t("always"),t("disabled"),t("Enabled"),t("F\
unction"),t("Tags")),s&&p(n,`,
pg_catalog.obj_description(e.oid, 'pg_event_trigger') as "%s"`,t("Description")),r(n,`
FROM pg_catalog.pg_event_trigger e `),!F(n,o,!1,!1,E,"evtname",E,E,E,1)||(r(n,"ORDER BY 1"),a=await u(n.data),!a)?!1:(i.
nullPrint=E,i.title=R("List of event triggers"),i.translate_header=!0,i.translate_columns=e,i.n_translate_columns=$(e),v(
a,i,c.queryFout,!1,c.logfile),!0)}async function la(o,s){let n={},a,i=c.popt;if(c.sversion<1e5){let e;return H("The serv\
er (version %s) does not support extended statistics.",Se(c.sversion,!1,e,Ne(e))),!0}return b(n),N(n,`/* %s */
`,R("Get matching extended statistics")),p(n,`SELECT 
es.stxnamespace::pg_catalog.regnamespace::pg_catalog.text AS "%s", 
es.stxname AS "%s", 
`,t("Schema"),t("Name")),c.sversion>=14e4?p(n,`pg_catalog.format('%%s FROM %%s', 
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
END AS "%s"`,t("Ndistinct"),t("Dependencies")),c.sversion>=12e4&&p(n,`,
CASE WHEN 'm' = any(es.stxkind) THEN 'defined' 
END AS "%s" `,t("MCV")),s&&p(n,`, 
pg_catalog.obj_description(oid, 'pg_statistic_ext') AS "%s"
`,t("Description")),r(n,` 
FROM pg_catalog.pg_statistic_ext es 
`),!F(n,o,!1,!1,"es.stxnamespace::pg_catalog.regnamespace::pg_catalog.text","es.stxname",E,"pg_catalog.pg_statistics_obj\
_is_visible(es.oid)",E,3)||(r(n,"ORDER BY 1, 2;"),a=await u(n.data),!a)?!1:(i.nullPrint=E,i.title=R("List of extended st\
atistics"),i.translate_header=!0,v(a,i,c.queryFout,!1,c.logfile),!0)}async function ca(o,s){let n={},a,i=c.popt,e=[!1,!1,
!1,!0,!0,!1];return b(n),N(n,`/* %s */
`,R("Get matching casts")),p(n,`SELECT pg_catalog.format_type(castsource, NULL) AS "%s",
       pg_catalog.format_type(casttarget, NULL) AS "%s",
`,t("Source type"),t("Target type")),p(n,`       CASE WHEN c.castmethod = '%c' THEN '(binary coercible)'
            WHEN c.castmethod = '%c' THEN '(with inout)'
            ELSE p.proname
       END AS "%s",
`,Va,ka,t("Function")),p(n,`       CASE WHEN c.castcontext = '%c' THEN '%s'
            WHEN c.castcontext = '%c' THEN '%s'
            ELSE '%s'
       END AS "%s"`,ja,t("no"),Xa,t("in assignment"),t("yes"),t("Implicit?")),s&&p(n,`,
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
`),s&&r(n,`     LEFT JOIN pg_catalog.pg_description d
     ON d.classoid = c.tableoid AND d.objoid = c.oid AND d.objsubid = 0
`),r(n,"WHERE ( (true"),!F(n,o,!0,!1,"ns.nspname","ts.typname","pg_catalog.format_type(ts.oid, NULL)","pg_catalog.pg_typ\
e_is_visible(ts.oid)",E,3)||(r(n,") OR (true"),!F(n,o,!0,!1,"nt.nspname","tt.typname","pg_catalog.format_type(tt.oid, NU\
LL)","pg_catalog.pg_type_is_visible(tt.oid)",E,3))||(r(n,`) )
ORDER BY 1, 2;`),a=await u(n.data),!a)?!1:(i.nullPrint=E,i.title=R("List of casts"),i.translate_header=!0,i.translate_columns=
e,i.n_translate_columns=$(e),v(a,i,c.queryFout,!1,c.logfile),!0)}async function pa(o,s,n){let a={},i,e=c.popt,l=[!1,!1,!1,
!1,!1,!1,!1,!0,!1];return b(a),N(a,`/* %s */
`,R("Get matching collations")),p(a,`SELECT
  n.nspname AS "%s",
  c.collname AS "%s",
`,t("Schema"),t("Name")),c.sversion>=1e5?p(a,`  CASE c.collprovider WHEN 'd' THEN 'default' WHEN 'b' THEN 'builtin' WHEN\
 'c' THEN 'libc' WHEN 'i' THEN 'icu' END AS "%s",
`,t("Provider")):p(a,`  'libc' AS "%s",
`,t("Provider")),p(a,`  c.collcollate AS "%s",
  c.collctype AS "%s",
`,t("Collate"),t("Ctype")),c.sversion>=17e4?p(a,`  c.colllocale AS "%s",
`,t("Locale")):c.sversion>=15e4?p(a,`  c.colliculocale AS "%s",
`,t("Locale")):p(a,`  c.collcollate AS "%s",
`,t("Locale")),c.sversion>=16e4?p(a,`  c.collicurules AS "%s",
`,t("ICU Rules")):p(a,`  NULL AS "%s",
`,t("ICU Rules")),c.sversion>=12e4?p(a,`  CASE WHEN c.collisdeterministic THEN '%s' ELSE '%s' END AS "%s"`,t("yes"),t("n\
o"),t("Deterministic?")):p(a,`  '%s' AS "%s"`,t("yes"),t("Deterministic?")),s&&p(a,`,
  pg_catalog.obj_description(c.oid, 'pg_collation') AS "%s"`,t("Description")),r(a,`
FROM pg_catalog.pg_collation c, pg_catalog.pg_namespace n
WHERE n.oid = c.collnamespace
`),!n&&!o&&r(a,`      AND n.nspname <> 'pg_catalog'
      AND n.nspname <> 'information_schema'
`),r(a,`      AND c.collencoding IN (-1, pg_catalog.pg_char_to_encoding(pg_catalog.getdatabaseencoding()))
`),!F(a,o,!0,!1,"n.nspname","c.collname",E,"pg_catalog.pg_collation_is_visible(c.oid)",E,3)||(r(a,"ORDER BY 1, 2;"),i=await u(
a.data),!i)?!1:(e.nullPrint=E,e.title=R("List of collations"),e.translate_header=!0,e.translate_columns=l,e.n_translate_columns=
$(l),v(i,e,c.queryFout,!1,c.logfile),!0)}async function Ta(o,s,n){let a={},i,e=c.popt,l=0,m=E;if(b(a),N(a,`/* %s */
`,R("Get matching schemas")),p(a,`SELECT n.nspname AS "%s",
  pg_catalog.pg_get_userbyid(n.nspowner) AS "%s"`,t("Name"),t("Owner")),s&&(r(a,`,
  `),re(a,"n.nspacl"),p(a,`,
  pg_catalog.obj_description(n.oid, 'pg_namespace') AS "%s"`,t("Description"))),r(a,`
FROM pg_catalog.pg_namespace n
`),!n&&!o&&r(a,`WHERE n.nspname !~ '^pg_' AND n.nspname <> 'information_schema'
`),!F(a,o,!n&&!o,!1,E,"n.nspname",E,E,E,2)||(r(a,"ORDER BY 1;"),i=await u(a.data),!i))return!1;if(e.nullPrint=E,e.title=
R("List of schemas"),e.translate_header=!0,o&&c.sversion>=15e4){let S,T;if(N(a,`/* %s */
`,R("Get publications that publish this schema")),p(a,`SELECT pubname 
FROM pg_catalog.pg_publication p
     JOIN pg_catalog.pg_publication_namespace pn ON p.oid = pn.pnpubid
     JOIN pg_catalog.pg_namespace n ON n.oid = pn.pnnspid 
WHERE n.nspname = '%s'
ORDER BY 1`,o),S=await u(a.data),S)l=W(S);else return!1;if(l>0){for(m=[],m[0]=pe(R("Included in publications:")),T=0;T<l;T++)
N(a,'    "%s"',A(S,T,0)),m[T+1]=pe(a.data);m[T+1]=E,e.footers=m}}return v(i,e,c.queryFout,!1,c.logfile),!0}async function Ra(o,s){
let n={},a,i=c.popt;return s?await _a(o):(b(n),N(n,`/* %s */
`,R("Get matching text search parsers")),p(n,`SELECT
  n.nspname as "%s",
  p.prsname as "%s",
  pg_catalog.obj_description(p.oid, 'pg_ts_parser') as "%s"
FROM pg_catalog.pg_ts_parser p
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.prsnamespace
`,t("Schema"),t("Name"),t("Description")),!F(n,o,!1,!1,"n.nspname","p.prsname",E,"pg_catalog.pg_ts_parser_is_visible(p.o\
id)",E,3)||(r(n,"ORDER BY 1, 2;"),a=await u(n.data),!a)?!1:(i.nullPrint=E,i.title=R("List of text search parsers"),i.translate_header=
!0,v(a,i,c.queryFout,!1,c.logfile),!0))}async function _a(o){let s={},n,a;if(b(s),N(s,`/* %s */
`,R("Get matching text search parsers")),r(s,`SELECT p.oid,
  n.nspname,
  p.prsname
FROM pg_catalog.pg_ts_parser p
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.prsnamespace
`),!F(s,o,!1,!1,"n.nspname","p.prsname",E,"pg_catalog.pg_ts_parser_is_visible(p.oid)",E,3)||(r(s,"ORDER BY 1, 2;"),n=await u(
s.data),!n))return!1;if(W(n)==0)return c.quiet||(o?H('Did not find any text search parser named "%s".',o):H("Did not fin\
d any text search parsers.")),!1;for(a=0;a<W(n);a++){let i,e=E,l;if(i=A(n,a,0),te(n,a,1)||(e=A(n,a,1)),l=A(n,a,2),!await Aa(
i,e,l)||X)return!1}return!0}async function Aa(o,s,n){let a={},i,e={},l=c.popt,m=[!0,!1,!1];return b(a),N(a,`/* %s */
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
o,t("Get headline"),o,t("Get token types"),o),i=await u(a.data),!i||(l.nullPrint=E,b(e),s?N(e,R('Text search parser "%s.\
%s"'),s,n):N(e,R('Text search parser "%s"'),n),l.title=e.data,l.footers=E,l.topt.default_footer=!1,l.translate_header=!0,
l.translate_columns=m,l.n_translate_columns=$(m),v(i,l,c.queryFout,!1,c.logfile),b(a),N(a,`/* %s */
`,R("Get text search parser token types")),p(a,`SELECT t.alias as "%s",
  t.description as "%s"
FROM pg_catalog.ts_token_type( '%s'::pg_catalog.oid ) as t
ORDER BY 1;`,t("Token name"),t("Description"),o),i=await u(a.data),!i)?!1:(l.nullPrint=E,s?N(e,R('Token types for parser\
 "%s.%s"'),s,n):N(e,R('Token types for parser "%s"'),n),l.title=e.data,l.footers=E,l.topt.default_footer=!0,l.translate_header=
!0,l.translate_columns=E,l.n_translate_columns=0,v(i,l,c.queryFout,!1,c.logfile),!0)}async function ga(o,s){let n={},a,i=c.
popt;return b(n),N(n,`/* %s */
`,R("Get matching text search dictionaries")),p(n,`SELECT
  n.nspname as "%s",
  d.dictname as "%s",
`,t("Schema"),t("Name")),s&&p(n,`  ( SELECT COALESCE(nt.nspname, '(null)')::pg_catalog.text || '.' || t.tmplname FROM
    pg_catalog.pg_ts_template t
    LEFT JOIN pg_catalog.pg_namespace nt ON nt.oid = t.tmplnamespace
    WHERE d.dicttemplate = t.oid ) AS  "%s",
  d.dictinitoption as "%s",
`,t("Template"),t("Init options")),p(n,`  pg_catalog.obj_description(d.oid, 'pg_ts_dict') as "%s"
`,t("Description")),r(n,`FROM pg_catalog.pg_ts_dict d
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = d.dictnamespace
`),!F(n,o,!1,!1,"n.nspname","d.dictname",E,"pg_catalog.pg_ts_dict_is_visible(d.oid)",E,3)||(r(n,"ORDER BY 1, 2;"),a=await u(
n.data),!a)?!1:(i.nullPrint=E,i.title=R("List of text search dictionaries"),i.translate_header=!0,v(a,i,c.queryFout,!1,c.
logfile),!0)}async function Na(o,s){let n={},a,i=c.popt;return b(n),N(n,`/* %s */
`,R("Get matching text search templates")),s?p(n,`SELECT
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
`),!F(n,o,!1,!1,"n.nspname","t.tmplname",E,"pg_catalog.pg_ts_template_is_visible(t.oid)",E,3)||(r(n,"ORDER BY 1, 2;"),a=
await u(n.data),!a)?!1:(i.nullPrint=E,i.title=R("List of text search templates"),i.translate_header=!0,v(a,i,c.queryFout,
!1,c.logfile),!0)}async function Sa(o,s){let n={},a,i=c.popt;return s?await ma(o):(b(n),N(n,`/* %s */
`,R("Get matching text search configurations")),p(n,`SELECT
   n.nspname as "%s",
   c.cfgname as "%s",
   pg_catalog.obj_description(c.oid, 'pg_ts_config') as "%s"
FROM pg_catalog.pg_ts_config c
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.cfgnamespace
`,t("Schema"),t("Name"),t("Description")),!F(n,o,!1,!1,"n.nspname","c.cfgname",E,"pg_catalog.pg_ts_config_is_visible(c.o\
id)",E,3)||(r(n,"ORDER BY 1, 2;"),a=await u(n.data),!a)?!1:(i.nullPrint=E,i.title=R("List of text search configurations"),
i.translate_header=!0,v(a,i,c.queryFout,!1,c.logfile),!0))}async function ma(o){let s={},n,a;if(b(s),N(s,`/* %s */
`,R("Get matching text search configurations")),r(s,`SELECT c.oid, c.cfgname,
   n.nspname,
   p.prsname,
   np.nspname as pnspname
FROM pg_catalog.pg_ts_config c
   LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.cfgnamespace,
 pg_catalog.pg_ts_parser p
   LEFT JOIN pg_catalog.pg_namespace np ON np.oid = p.prsnamespace
WHERE  p.oid = c.cfgparser
`),!F(s,o,!0,!1,"n.nspname","c.cfgname",E,"pg_catalog.pg_ts_config_is_visible(c.oid)",E,3)||(r(s,"ORDER BY 3, 2;"),n=await u(
s.data),!n))return!1;if(W(n)==0)return c.quiet||(o?H('Did not find any text search configuration named "%s".',o):H("Did \
not find any text search configurations.")),!1;for(a=0;a<W(n);a++){let i,e,l=E,m,S=E;if(i=A(n,a,0),e=A(n,a,1),te(n,a,2)||
(l=A(n,a,2)),m=A(n,a,3),te(n,a,4)||(S=A(n,a,4)),!await fa(i,l,e,S,m)||X)return!1}return!0}async function fa(o,s,n,a,i){let e={},
l={},m,S=c.popt;return b(e),N(e,`/* %s */
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
ORDER BY 1;`,t("Token"),t("Dictionaries"),o),m=await u(e.data),m?(b(l),s?p(l,R('Text search configuration "%s.%s"'),s,n):
p(l,R('Text search configuration "%s"'),n),a?p(l,R(`
Parser: "%s.%s"`),a,i):p(l,R(`
Parser: "%s"`),i),S.nullPrint=E,S.title=l.data,S.footers=E,S.topt.default_footer=!1,S.translate_header=!0,v(m,S,c.queryFout,
!1,c.logfile),!0):!1}async function Oa(o,s){let n={},a,i=c.popt;return b(n),N(n,`/* %s */
`,R("Get matching foreign-data wrappers")),p(n,`SELECT fdw.fdwname AS "%s",
  pg_catalog.pg_get_userbyid(fdw.fdwowner) AS "%s",
  fdw.fdwhandler::pg_catalog.regproc AS "%s",
  fdw.fdwvalidator::pg_catalog.regproc AS "%s"`,t("Name"),t("Owner"),t("Handler"),t("Validator")),s&&(r(n,`,
  `),re(n,"fdwacl"),p(n,`,
 CASE WHEN fdwoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(opt\
ion_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(fdwoptions)),  ', '\
) || ')'   END AS "%s",
  d.description AS "%s" `,t("FDW options"),t("Description"))),r(n,`
FROM pg_catalog.pg_foreign_data_wrapper fdw
`),s&&r(n,`LEFT JOIN pg_catalog.pg_description d
       ON d.classoid = fdw.tableoid AND d.objoid = fdw.oid AND d.objsubid = 0
`),!F(n,o,!1,!1,E,"fdwname",E,E,E,1)||(r(n,"ORDER BY 1;"),a=await u(n.data),!a)?!1:(i.nullPrint=E,i.title=R("List of for\
eign-data wrappers"),i.translate_header=!0,v(a,i,c.queryFout,!1,c.logfile),!0)}async function da(o,s){let n={},a,i=c.popt;
return b(n),N(n,`/* %s */
`,R("Get matching foreign servers")),p(n,`SELECT s.srvname AS "%s",
  pg_catalog.pg_get_userbyid(s.srvowner) AS "%s",
  f.fdwname AS "%s"`,t("Name"),t("Owner"),t("Foreign-data wrapper")),s&&(r(n,`,
  `),re(n,"s.srvacl"),p(n,`,
  s.srvtype AS "%s",
  s.srvversion AS "%s",
  CASE WHEN srvoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(op\
tion_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(srvoptions)),  ', \
') || ')'   END AS "%s",
  d.description AS "%s"`,t("Type"),t("Version"),t("FDW options"),t("Description"))),r(n,`
FROM pg_catalog.pg_foreign_server s
     JOIN pg_catalog.pg_foreign_data_wrapper f ON f.oid=s.srvfdw
`),s&&r(n,`LEFT JOIN pg_catalog.pg_description d
       ON d.classoid = s.tableoid AND d.objoid = s.oid AND d.objsubid = 0
`),!F(n,o,!1,!1,E,"s.srvname",E,E,E,1)||(r(n,"ORDER BY 1;"),a=await u(n.data),!a)?!1:(i.nullPrint=E,i.title=R("List of f\
oreign servers"),i.translate_header=!0,v(a,i,c.queryFout,!1,c.logfile),!0)}async function La(o,s){let n={},a,i=c.popt;return b(
n),N(n,`/* %s */
`,R("Get matching user mappings")),p(n,`SELECT um.srvname AS "%s",
  um.usename AS "%s"`,t("Server"),t("User name")),s&&p(n,`,
 CASE WHEN umoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(opti\
on_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(umoptions)),  ', ') \
|| ')'   END AS "%s"`,t("FDW options")),r(n,`
FROM pg_catalog.pg_user_mappings um
`),!F(n,o,!1,!1,E,"um.srvname","um.usename",E,E,1)||(r(n,"ORDER BY 1, 2;"),a=await u(n.data),!a)?!1:(i.nullPrint=E,i.title=
R("List of user mappings"),i.translate_header=!0,v(a,i,c.queryFout,!1,c.logfile),!0)}async function ua(o,s){let n={},a,i=c.
popt;return b(n),N(n,`/* %s */
`,R("Get matching foreign tables")),p(n,`SELECT n.nspname AS "%s",
  c.relname AS "%s",
  s.srvname AS "%s"`,t("Schema"),t("Table"),t("Server")),s&&p(n,`,
 CASE WHEN ftoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(opti\
on_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(ftoptions)),  ', ') \
|| ')'   END AS "%s",
  d.description AS "%s"`,t("FDW options"),t("Description")),r(n,`
FROM pg_catalog.pg_foreign_table ft
  INNER JOIN pg_catalog.pg_class c ON c.oid = ft.ftrelid
  INNER JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
  INNER JOIN pg_catalog.pg_foreign_server s ON s.oid = ft.ftserver
`),s&&r(n,`   LEFT JOIN pg_catalog.pg_description d
          ON d.classoid = c.tableoid AND d.objoid = c.oid AND d.objsubid = 0
`),!F(n,o,!1,!1,"n.nspname","c.relname",E,"pg_catalog.pg_table_is_visible(c.oid)",E,3)||(r(n,"ORDER BY 1, 2;"),a=await u(
n.data),!a)?!1:(i.nullPrint=E,i.title=R("List of foreign tables"),i.translate_header=!0,v(a,i,c.queryFout,!1,c.logfile),
!0)}async function Ia(o){let s={},n,a=c.popt;return b(s),N(s,`/* %s */
`,R("Get matching installed extensions")),p(s,`SELECT e.extname AS "%s", e.extversion AS "%s", ae.default_version AS "%s\
",n.nspname AS "%s", d.description AS "%s"
FROM pg_catalog.pg_extension e LEFT JOIN pg_catalog.pg_namespace n ON n.oid = e.extnamespace LEFT JOIN pg_catalog.pg_des\
cription d ON d.objoid = e.oid AND d.classoid = 'pg_catalog.pg_extension'::pg_catalog.regclass LEFT JOIN pg_catalog.pg_a\
vailable_extensions() ae(name, default_version, comment) ON ae.name = e.extname
`,t("Name"),t("Version"),t("Default version"),t("Schema"),t("Description")),!F(s,o,!1,!1,E,"e.extname",E,E,E,1)||(r(s,"O\
RDER BY 1;"),n=await u(s.data),!n)?!1:(a.nullPrint=E,a.title=R("List of installed extensions"),a.translate_header=!0,v(n,
a,c.queryFout,!1,c.logfile),!0)}async function Ca(o){let s={},n,a;if(b(s),N(s,`/* %s */
`,R("Get matching installed extensions")),r(s,`SELECT e.extname, e.oid
FROM pg_catalog.pg_extension e
`),!F(s,o,!1,!1,E,"e.extname",E,E,E,1)||(r(s,"ORDER BY 1;"),n=await u(s.data),!n))return!1;if(W(n)==0)return c.quiet||(o?
H('Did not find any extension named "%s".',o):H("Did not find any extensions.")),!1;for(a=0;a<W(n);a++){let i,e;if(i=A(n,
a,0),e=A(n,a,1),!await Da(i,e)||X)return!1}return!0}async function Da(o,s){let n={},a,i={},e=c.popt;return b(n),N(n,`/* \
%s */
`,R("Get installed extension's contents")),p(n,`SELECT pg_catalog.pg_describe_object(classid, objid, 0) AS "%s"
FROM pg_catalog.pg_depend
WHERE refclassid = 'pg_catalog.pg_extension'::pg_catalog.regclass AND refobjid = '%s' AND deptype = 'e'
ORDER BY 1;`,t("Object description"),s),a=await u(n.data),a?(e.nullPrint=E,b(i),N(i,R('Objects in extension "%s"'),o),e.
title=i.data,e.translate_header=!0,v(a,e,c.queryFout,!1,c.logfile),!0):!1}async function ba(o){let s={},n,a=c.popt,i=[!1,
!1,!1,!1,!1,!1,!1,!1,!1,!1];if(c.sversion<1e5){let e;return H("The server (version %s) does not support publications.",Se(
c.sversion,!1,e,Ne(e))),!0}return b(s),N(s,`/* %s */
`,R("Get matching publications")),p(s,`SELECT pubname AS "%s",
  pg_catalog.pg_get_userbyid(pubowner) AS "%s",
  puballtables AS "%s"`,t("Name"),t("Owner"),t("All tables")),c.sversion>=19e4&&p(s,`,
  puballsequences AS "%s"`,t("All sequences")),p(s,`,
  pubinsert AS "%s",
  pubupdate AS "%s",
  pubdelete AS "%s"`,t("Inserts"),t("Updates"),t("Deletes")),c.sversion>=11e4&&p(s,`,
  pubtruncate AS "%s"`,t("Truncates")),c.sversion>=18e4&&p(s,`,
 (CASE pubgencols
    WHEN '%c' THEN 'none'
    WHEN '%c' THEN 'stored'
   END) AS "%s"`,dn,Ln,t("Generated columns")),c.sversion>=13e4&&p(s,`,
  pubviaroot AS "%s"`,t("Via root")),r(s,`
FROM pg_catalog.pg_publication
`),!F(s,o,!1,!1,E,"pubname",E,E,E,1)||(r(s,"ORDER BY 1;"),n=await u(s.data),!n)?!1:(a.title=R("List of publications"),a.
translate_header=!0,a.translate_columns=i,a.n_translate_columns=$(i),v(n,a,c.queryFout,!1,c.logfile),!0)}async function cn(o,s,n,a){
let i,e=0,l=0;if(i=await u(o.data),i)e=W(i);else return!1;for(e>0&&w(a,s),l=0;l<e;l++)n?N(o,'    "%s"',A(i,l,0)):(N(o,' \
   "%s.%s"',A(i,l,0),A(i,l,1)),te(i,l,3)||p(o," (%s)",A(i,l,3)),te(i,l,2)||p(o," WHERE %s",A(i,l,2))),w(a,o.data);return!0}
async function Ua(o){let s={},n,a,i,e,l,m,S=6,T=1,h={},d={};if(c.sversion<1e5){let L;return H("The server (version %s) d\
oes not support publications.",Se(c.sversion,!1,L,Ne(L))),!0}if(m=c.sversion>=19e4,i=c.sversion>=11e4,e=c.sversion>=18e4,
l=c.sversion>=13e4,b(s),N(s,`/* %s */
`,R("Get details about matching publications")),r(s,`SELECT oid, pubname,
  pg_catalog.pg_get_userbyid(pubowner) AS owner,
  puballtables`),m?r(s,", puballsequences"):r(s,", false AS puballsequences"),r(s,", pubinsert, pubupdate, pubdelete"),i?
r(s,", pubtruncate"):r(s,", false AS pubtruncate"),e?p(s,`, (CASE pubgencols
    WHEN '%c' THEN 'none'
    WHEN '%c' THEN 'stored'
   END) AS "%s"
`,dn,Ln,t("Generated columns")):r(s,", 'none' AS pubgencols"),l?r(s,", pubviaroot"):r(s,", false AS pubviaroot"),r(s,", \
pg_catalog.obj_description(oid, 'pg_publication')"),r(s,`
FROM pg_catalog.pg_publication
`),!F(s,o,!1,!1,E,"pubname",E,E,E,1)||(r(s,"ORDER BY 2;"),a=await u(s.data),!a))return!1;if(W(a)==0)return c.quiet||(o?H(
'Did not find any publication named "%s".',o):H("Did not find any publications.")),!1;for(m&&S++,i&&S++,e&&S++,l&&S++,n=
0;n<W(a);n++){let L="l",O=A(a,n,0),M=A(a,n,1),z=y(A(a,n,3),"t")==0,K=c.popt.topt;if(b(h),N(h,R("Publication %s"),M),ke(d,
K,h.data,S,T),ie(d,t("Owner"),!0,L),ie(d,t("All tables"),!0,L),m&&ie(d,t("All sequences"),!0,L),ie(d,t("Inserts"),!0,L),
ie(d,t("Updates"),!0,L),ie(d,t("Deletes"),!0,L),i&&ie(d,t("Truncates"),!0,L),e&&ie(d,t("Generated columns"),!0,L),l&&ie(
d,t("Via root"),!0,L),ie(d,t("Description"),!0,L),k(d,A(a,n,2),!1,!1),k(d,A(a,n,3),!1,!1),m&&k(d,A(a,n,4),!1,!1),k(d,A(a,
n,5),!1,!1),k(d,A(a,n,6),!1,!1),k(d,A(a,n,7),!1,!1),i&&k(d,A(a,n,8),!1,!1),e&&k(d,A(a,n,9),!1,!1),l&&k(d,A(a,n,10),!1,!1),
k(d,A(a,n,11),!1,!1),z){if(c.sversion>=19e4&&(N(s,`/* %s */
`,R("Get tables excluded by this publication")),p(s,`SELECT n.nspname || '.' || c.relname
FROM pg_catalog.pg_class c
     JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
     JOIN pg_catalog.pg_publication_rel pr ON c.oid = pr.prrelid
WHERE pr.prpubid = '%s' AND pr.prexcept
ORDER BY 1`,O),!await cn(s,R("Except tables:"),!0,d)))return!1}else if(N(s,`/* %s */
`,R("Get tables published by this publication")),r(s,"SELECT n.nspname, c.relname"),c.sversion>=15e4?(r(s,", pg_catalog.\
pg_get_expr(pr.prqual, c.oid)"),r(s,`, (CASE WHEN pr.prattrs IS NOT NULL THEN
     pg_catalog.array_to_string(      ARRAY(SELECT attname
              FROM
                pg_catalog.generate_series(0, pg_catalog.array_upper(pr.prattrs::pg_catalog.int2[], 1)) s,
                pg_catalog.pg_attribute
        WHERE attrelid = c.oid AND attnum = prattrs[s]), ', ')
       ELSE NULL END)`)):r(s,", NULL, NULL"),p(s,`
FROM pg_catalog.pg_class c,
     pg_catalog.pg_namespace n,
     pg_catalog.pg_publication_rel pr
WHERE c.relnamespace = n.oid
  AND c.oid = pr.prrelid
  AND pr.prpubid = '%s'
`,O),c.sversion>=19e4&&r(s,`  AND NOT pr.prexcept
`),r(s,"ORDER BY 1,2"),!await cn(s,R("Tables:"),!1,d)||c.sversion>=15e4&&(N(s,`/* %s */
`,R("Get schemas published by this publication")),p(s,`SELECT n.nspname
FROM pg_catalog.pg_namespace n
     JOIN pg_catalog.pg_publication_namespace pn ON n.oid = pn.pnnspid
WHERE pn.pnpubid = '%s'
ORDER BY 1`,O),!await cn(s,R("Tables from schemas:"),!0,d)))return!1;Xe(d,c.queryFout,!1,c.logfile)}return!0}async function Pa(o,s){
let n={},a,i=c.popt,e=[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1];if(c.sversion<1e5){let l;return H(
"The server (version %s) does not support subscriptions.",Se(c.sversion,!1,l,Ne(l))),!0}return b(n),N(n,`/* %s */
`,R("Get matching subscriptions")),p(n,`SELECT subname AS "%s"
,  pg_catalog.pg_get_userbyid(subowner) AS "%s"
,  subenabled AS "%s"
,  subpublications AS "%s"
`,t("Name"),t("Owner"),t("Enabled"),t("Publication")),s&&(c.sversion>=14e4&&(p(n,`, subbinary AS "%s"
`,t("Binary")),c.sversion>=16e4?p(n,`, (CASE substream
    WHEN 'f' THEN 'off'
    WHEN 't' THEN 'on'
    WHEN 'p' THEN 'parallel'
   END) AS "%s"
`,t("Streaming")):p(n,`, substream AS "%s"
`,t("Streaming"))),c.sversion>=15e4&&p(n,`, subtwophasestate AS "%s"
, subdisableonerr AS "%s"
`,t("Two-phase commit"),t("Disable on error")),c.sversion>=16e4&&p(n,`, suborigin AS "%s"
, subpasswordrequired AS "%s"
, subrunasowner AS "%s"
`,t("Origin"),t("Password required"),t("Run as owner?")),c.sversion>=17e4&&p(n,`, subfailover AS "%s"
`,t("Failover")),c.sversion>=19e4&&(p(n,`, (select srvname from pg_catalog.pg_foreign_server where oid=subserver) AS "%s\
"
`,t("Server")),p(n,`, subretaindeadtuples AS "%s"
`,t("Retain dead tuples")),p(n,`, submaxretention AS "%s"
`,t("Max retention duration")),p(n,`, subretentionactive AS "%s"
`,t("Retention active"))),p(n,`,  subsynccommit AS "%s"
,  subconninfo AS "%s"
`,t("Synchronous commit"),t("Conninfo")),c.sversion>=19e4&&p(n,`, subwalrcvtimeout AS "%s"
`,t("Receiver timeout")),c.sversion>=15e4&&p(n,`, subskiplsn AS "%s"
`,t("Skip LSN")),p(n,`,  pg_catalog.obj_description(oid, 'pg_subscription') AS "%s"
`,t("Description"))),r(n,`FROM pg_catalog.pg_subscription
WHERE subdbid = (SELECT oid
                 FROM pg_catalog.pg_database
                 WHERE datname = pg_catalog.current_database())`),!F(n,o,!0,!1,E,"subname",E,E,E,1)||(r(n,"ORDER BY 1;"),
a=await u(n.data),!a)?!1:(i.nullPrint=E,i.title=R("List of subscriptions"),i.translate_header=!0,i.translate_columns=e,i.
n_translate_columns=$(e),v(a,i,c.queryFout,!1,c.logfile),!0)}function re(o,s){p(o,`CASE WHEN pg_catalog.array_length(%s,\
 1) = 0 THEN '%s' ELSE pg_catalog.array_to_string(%s, E'\\n') END AS "%s"`,s,t("(none)"),s,t("Access privileges"))}async function Fa(o,s,n){
let a={},i,e=c.popt,l=!1,m=[!1,!1,!1,!1,!1,!1,!1];if(b(a),N(a,`/* %s */
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
`),o){if(l={value:l},!F(a,o,!1,!1,E,"am.amname",E,E,l,1))return!1;l=l.value}return s&&!F(a,s,l,!1,"tn.nspname","t.typnam\
e","pg_catalog.format_type(t.oid, NULL)","pg_catalog.pg_type_is_visible(t.oid)",E,3)||(r(a,"ORDER BY 1, 2, 4;"),i=await u(
a.data),!i)?!1:(e.nullPrint=E,e.title=R("List of operator classes"),e.translate_header=!0,e.translate_columns=m,e.n_translate_columns=
$(m),v(i,e,c.queryFout,!1,c.logfile),!0)}async function ha(o,s,n){let a={},i,e=c.popt,l=!1,m=[!1,!1,!1,!1];if(b(a),N(a,`\
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
`),o){if(l={value:l},!F(a,o,!1,!1,E,"am.amname",E,E,l,1))return!1;l=l.value}if(s){if(p(a,`  %s EXISTS (
    SELECT 1
    FROM pg_catalog.pg_type t
    JOIN pg_catalog.pg_opclass oc ON oc.opcintype = t.oid
    LEFT JOIN pg_catalog.pg_namespace tn ON tn.oid = t.typnamespace
    WHERE oc.opcfamily = f.oid
`,l?"AND":"WHERE"),!F(a,s,!0,!1,"tn.nspname","t.typname","pg_catalog.format_type(t.oid, NULL)","pg_catalog.pg_type_is_vi\
sible(t.oid)",E,3))return!1;r(a,`  )
`)}return r(a,"ORDER BY 1, 2;"),i=await u(a.data),i?(e.nullPrint=E,e.title=R("List of operator families"),e.translate_header=
!0,e.translate_columns=m,e.n_translate_columns=$(m),v(i,e,c.queryFout,!1,c.logfile),!0):!1}async function ya(o,s,n){let a={},
i,e=c.popt,l=!1,m=[!1,!1,!1,!1,!1,!1,!0];if(b(a),N(a,`/* %s */
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
`),o){if(l={value:l},!F(a,o,!1,!1,E,"am.amname",E,E,l,1))return!1;l=l.value}return s&&!F(a,s,l,!1,"nsf.nspname","of.opfn\
ame",E,E,E,3)||(r(a,`ORDER BY 1, 2,
  o.amoplefttype = o.amoprighttype DESC,
  pg_catalog.format_type(o.amoplefttype, NULL),
  pg_catalog.format_type(o.amoprighttype, NULL),
  o.amopstrategy;`),i=await u(a.data),!i)?!1:(e.nullPrint=E,e.title=R("List of operators of operator families"),e.translate_header=
!0,e.translate_columns=m,e.n_translate_columns=$(m),v(i,e,c.queryFout,!1,c.logfile),!0)}async function Ha(o,s,n){let a={},
i,e=c.popt,l=!1,m=[!1,!1,!1,!1,!1,!1];if(b(a),N(a,`/* %s */
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
`),o){if(l={value:l},!F(a,o,!1,!1,E,"am.amname",E,E,l,1))return!1;l=l.value}return s&&!F(a,s,l,!1,"ns.nspname","of.opfna\
me",E,E,E,3)||(r(a,`ORDER BY 1, 2,
  ap.amproclefttype = ap.amprocrighttype DESC,
  3, 4, 5;`),i=await u(a.data),!i)?!1:(e.nullPrint=E,e.title=R("List of support functions of operator families"),e.translate_header=
!0,e.translate_columns=m,e.n_translate_columns=$(m),v(i,e,c.queryFout,!1,c.logfile),!0)}async function wa(o){let s={},n,
a=c.popt;if(b(s),N(s,`/* %s */
`,R("Get large objects")),p(s,`SELECT oid as "%s",
  pg_catalog.pg_get_userbyid(lomowner) as "%s",
  `,t("ID"),t("Owner")),o&&(re(s,"lomacl"),r(s,`,
  `)),p(s,`pg_catalog.obj_description(oid, 'pg_largeobject') as "%s"
FROM pg_catalog.pg_largeobject_metadata
ORDER BY oid`,t("Description")),n=await u(s.data),!n)return!1;a.nullPrint=E,a.title=R("Large objects"),a.translate_header=
!0,v(n,a,c.queryFout,!1,c.logfile)}return!0}return{promise:on(),cancel:De}}function un(g,C,D,P="",B=""){let q=Math.max(0,
C-Ce(g));return D==="r"?P+" ".repeat(q)+g+B:D==="c"?P+" ".repeat(Math.floor(q/2))+g+" ".repeat(Math.ceil(q/2))+B:P+g+" ".
repeat(q)+B}function Un(g,C){let D=0,P=g.length,B=[];for(;D<P;)B.push(g.slice(D,D+=C));return B}function Nt(g){let C=-1,
D=0,P=1,B=0;for(;(C=g.indexOf(`
`,C+1))!==-1;)C-D>B&&(B=C-D),D=C+1,P++;return g.length-D>B&&(B=g.length-D),{count:P,longest:B}}function me(g,C){return g=
g.replace(/[<>&'"]/g,D=>({"<":"&lt;",">":"&gt;","&":"&amp;","'":"&apos;",'"':"&quot;"})[D]),C&&(g=g.replace(/ /g,"&nbsp;").
replace(/\n/g,"<br />")),g}function St(g,C){let{ncolumns:D,nrows:P,aligns:B}=g,q=[...g.headers,...g.cells].map(Nt),{colWidths:V,
rowHeights:ne}=q.reduce((oe,u,c)=>{let H=Math.floor(c/g.ncolumns),F=c%g.ncolumns;return u.longest>oe.colWidths[F]&&(oe.colWidths[F]=
u.longest),u.count>oe.rowHeights[H]&&(oe.rowHeights[H]=u.count),oe},{colWidths:new Array(D).fill(0),rowHeights:new Array(
P+1).fill(1)}),X=V.reduce((oe,u)=>oe+u,0)+D*2+(D-1),De=un(g.title,X,"c"),Te=[g.headers,null,...Un(g.cells,D)],on=Te.map(
(oe,u)=>{if(u===1)return g.headers.map((H,F)=>"-".repeat(V[F%D]+2)).join("+");u>1&&u--;let c=oe.map(H=>H.split(`
`));return new Array(ne[u]).fill("").map((H,F)=>c.map((ye,Ve)=>un(ye[F]??"",V[Ve],u===0?"c":B[Ve]," ",ye[F+1]===void 0?"\
 ":"+")).join("|")).join(`
`)}).join(`
`),rn=g.footers?g.footers.filter(xe):[],qe=rn.length>0?`
`+rn.join(`
`):g.opt.default_footer?`
(${P} row${P===1?"":"s"})`:"",J=`${De}
${on}${qe}`;return C&&(J=me(J)),J}function mt(g){let C=`<table><tr><th valign="top" style="text-align: center;" colspan=\
"${g.ncolumns}">${me(g.title)}</th></tr><tr>`;for(let P of g.headers)C+=`<th valign="top" style="text-align: center;">${me(
P)}</th>`;C+="</tr>";for(let P of Un(g.cells,g.ncolumns))C+="<tr>"+P.map((B,q)=>`<td valign="top" style="text-align: ${g.
aligns[q]==="c"?"center":g.aligns[q]==="r"?"right":"left"}">${me(B).replace(/\n/g,"<br>")}</td>`).join(`
`)+"</tr>";C+="</table>";let D=g.footers?g.footers.filter(xe):[];return D.length>0?D.length>1&&D.some(P=>/^\s/.test(P))?
C+="<dl>"+D.map(P=>/^\s/.test(P)?`<dd>${me(P.trim(),!0)}</dd>`:`<dt>${me(P,!0)}</dt>`).join("")+"</dl>":C+=D.map(P=>`<p>${me(
P,!0)}</p>`).join(""):g.opt.default_footer&&(C+=`<p>(${g.nrows} row${g.nrows===1?"":"s"})</p>`),C}function Pe(g){if(!g)throw new Error(
`Assertion failed (value: ${g})`)}var t=xe,pe=xe,R=xe;function sn(g,C){let D=g.indexOf(C);return D===-1?E:D}var Z=sn;function Ce(g){
return g.length}function he(g,C,D){if(typeof g!="string"||typeof C!="string")throw new Error("Not a string");return g.length>
D&&(g=g.slice(0,D)),C.length>D&&(C=C.slice(0,D)),g<C?-1:g>C?1:0}function y(g,C){return he(g,C,1/0)}function ft(g,C){let D=Ce(
g);for(let P=0;P<D;P++)if(C.indexOf(g[P])===-1)return P;return D}function In(g){return parseInt(g,10)}function _n(g){return parseInt(
g,10)}function Cn(g){return g===" "||g==="	"||g===`
`||g==="\r"}function Ot(g){return g==='"'||g==="'"}function dt(g){let C=g.charCodeAt(0);return C>=65&&C<=90}function $(g){
return g.length}function gn(g){return g.toLowerCase()}function Lt(g,C){return y(g.toLowerCase(),C.toLowerCase())}function Ne(g){return 0}function b(g){g.data="",g.len=0}var an=b;function r(g,C){g.data+=C,g.len=g.data.length}var j=r;function p(g,C,...D){
let P=ae(C,...D);r(g,P)}function N(g,C,...D){b(g),p(g,C,...D)}function Nn(g,C,D,P){let q="'"+C.replace(P?/[']/g:/['\\]/g,
"\\$&")+"'";r(g,q)}function Fe(g,C,D){if(Z(C,"\\")!=E&&Ye(D)<19e4){g.len>0&&g.data[g.len-1]!=" "&&j(g," "),j(g,Ba),Nn(g,
C,Pn(D),!1);return}Nn(g,C,D.encoding,D.std_strings)}function ae(g,...C){let D="",P=0,B=0,q;for(;(q=g.indexOf("%",B))!==-1;){
let V=0,ne=!1;D+=g.slice(B,q),B=q+1;let X=g[B++];if(X==="%"&&(D+="%"),X==="*"&&(V=parseInt(C[P++],10),X=g[B++]),X==="-"&&
(ne=!0,X=g[B++]),X>="0"&&X<="9"&&(V=parseInt(X,10),X=g[B++]),X==="s"||X==="c"||X==="d"||X==="u"){let De=String(C[P++]),Te=V-
De.length;ne===!1&&Te>0&&(D+=" ".repeat(Te)),D+=De,ne===!0&&Te>0&&(D+=" ".repeat(Te))}}return D+=g.slice(B),D}var tn=ae;
function Dn(g){return g?g.dbName:E}function Ye(g){return!g||g.status===qa?0:g.sversion}function Pn(g){return!g||g.status!=
bn?-1:g.client_encoding}function W(g){return g.rowCount}function Fn(g){return g.fields.length}function hn(g,C){return g.
fields[C].name}function ut(g,C){return g.fields[C].dataTypeID}function te(g,C,D){return g.rows[C][D]===null?1:0}function A(g,C,D){
let P=g.rows[C][D];return String(P===null?"":P)}function Le(g,C){let D,P,B,q,V;if(!g||C==E||C[0]==E)return-1;for(D=!1,B=
"",P=0,V=Ce(C);P<V;P++){let ne=C[P];D?ne=='"'?C[P+1]=='"'?(B+='"',P++):D=!1:B+=ne:ne=='"'?D=!0:(ne=gn(ne),B+=ne)}for(q=0,
V=Fn(g);q<V;q++)if(y(B,hn(g,q))==0)return q;return-1}function Se(g,C,D,P){return g>=1e5?C?D=ae("%d.%d",Math.floor(g/1e4),
g%1e4):D=ae("%d",g/1e4):C?D=ae("%d.%d.%d",Math.floor(g/1e4),Math.floor(g/100)%100,g%100):D=ae("%d.%d",Math.floor(g/1e4),
Math.floor(g/100)%100),D}function ue(g,C,D,P){if(C!==Ie&&C!==An)throw new Error(`scan type ${C} not implemented`);if(D!==
E)throw new Error("cannot return quote type");let B=[],q=P?/^(.*);*$/:/^(.*)$/,V;for(;;){if(V=g[0][g[1]],V==E)return E;if(!Cn(
V))break;g[1]++}if(C===An)return g[0].slice(g[1],g[1]=g[0].length);let ne="";for(;;){if(V=g[0][g[1]++],V==E)return B.length>
0?E:ne.match(q)[1];if(Ot(V))V===B[B.length-1]?B.pop():B.push(V),V==='"'&&(ne+=V);else{if(B.length===0&&Cn(V))return ne.match(
q)[1];ne+=V}}}function xe(g){return g}var It=`Help
  \\? [commands]          show help on backslash commands
  \\h [NAME]              help on syntax of SQL commands, * for all commands

Informational
  (options: S = show system objects, + = additional detail)
  \\d[S+]                 list tables, views, sequences, and property graphs
  \\d[S+]  NAME           describe table, view, sequence, index, or property graph
  \\da[S]  [PATTERN]      list aggregates
  \\dA[+]  [PATTERN]      list access methods
  \\dAc[+] [AMPTRN [TYPEPTRN]]  list operator classes
  \\dAf[+] [AMPTRN [TYPEPTRN]]  list operator families
  \\dAo[+] [AMPTRN [OPFPTRN]]   list operators of operator families
  \\dAp[+] [AMPTRN [OPFPTRN]]   list support functions of operator families
  \\db[+]  [PATTERN]      list tablespaces
  \\dc[S+] [PATTERN]      list conversions
  \\dconfig[+] [PATTERN]  list configuration parameters
  \\dC[+]  [PATTERN]      list casts
  \\dd[S]  [PATTERN]      show object descriptions not displayed elsewhere
  \\dD[S+] [PATTERN]      list domains
  \\ddp    [PATTERN]      list default privileges
  \\dE[S+] [PATTERN]      list foreign tables
  \\des[+] [PATTERN]      list foreign servers
  \\det[+] [PATTERN]      list foreign tables
  \\deu[+] [PATTERN]      list user mappings
  \\dew[+] [PATTERN]      list foreign-data wrappers
  \\df[anptw][S+] [FUNCPTRN [TYPEPTRN ...]]
                         list [only agg/normal/procedure/trigger/window] functions
  \\dF[+]  [PATTERN]      list text search configurations
  \\dFd[+] [PATTERN]      list text search dictionaries
  \\dFp[+] [PATTERN]      list text search parsers
  \\dFt[+] [PATTERN]      list text search templates
  \\dg[S+] [PATTERN]      list roles
  \\dG[S+] [PATTERN]      list property graphs
  \\di[S+] [PATTERN]      list indexes
  \\dl[+]                 list large objects, same as \\lo_list
  \\dL[S+] [PATTERN]      list procedural languages
  \\dm[S+] [PATTERN]      list materialized views
  \\dn[S+] [PATTERN]      list schemas
  \\do[S+] [OPPTRN [TYPEPTRN [TYPEPTRN]]]
                         list operators
  \\dO[S+] [PATTERN]      list collations
  \\dp[S]  [PATTERN]      list table, view, and sequence access privileges
  \\dP[itn+] [PATTERN]    list [only index/table] partitioned relations [n=nested]
  \\drds [ROLEPTRN [DBPTRN]] list per-database role settings
  \\drg[S] [PATTERN]      list role grants
  \\dRp[+] [PATTERN]      list replication publications
  \\dRs[+] [PATTERN]      list replication subscriptions
  \\ds[S+] [PATTERN]      list sequences
  \\dt[S+] [PATTERN]      list tables
  \\dT[S+] [PATTERN]      list data types
  \\du[S+] [PATTERN]      list roles
  \\dv[S+] [PATTERN]      list views
  \\dx[+]  [PATTERN]      list extensions
  \\dX[+]  [PATTERN]      list extended statistics
  \\dy[+]  [PATTERN]      list event triggers
  \\l[+]   [PATTERN]      list databases
  \\lo_list[+]            list large objects
  \\sf[+]  FUNCNAME       show a function's definition
  \\sv[+]  VIEWNAME       show a view's definition
  \\z[S]   [PATTERN]      same as \\dp
`;export{Pt as describe,Ut as describeDataToHtml,bt as describeDataToString};
