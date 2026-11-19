
export function describe(
  cmd: string,
  dbName: string,
  runQuery: (sql: string) => any,
  outputFn: (item: string | Record<string, any>) => void,
  options?: DescribeOptions,
): {
  promise: Promise<DescribeResult | null>;
  cancel: () => void;
};

export interface DescribeOptions {
  echoHidden?: boolean;                     // output the SQL queries too, as psql -E does (default: false)
  serverVersion?: number | null;            // as SHOW server_version_num gives (default: null, to query for it)
  standardConformingStrings?: boolean;      // as SHOW standard_conforming_strings gives (default: true)
  docsURLTemplate?: (id: string) => string; // a docs page ID's URL, for \h (default: postgresql.org's, for 19)
  multipleCommands?: boolean;               // run every backslash command in cmd, not just the first (default: false)
}

export interface DescribeResult {
  success: boolean;   // false if any command failed
  remainder: string;  // what wasn't run, from its first non-whitespace character (e.g. SQL), or ''
  commands: number;   // how many backslash commands ran (including any that failed)
}

export function describeDataToString(item: string | Record<string, any>): string;
export function describeDataToHtml(item: string | Record<string, any>): string;
export function htmlEscape(str: string, convertWhitespace: boolean): string;
