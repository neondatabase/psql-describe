
export function describe(
  cmd: string,
  dbName: string,
  runQuery: (sql: string) => any,
  outputFn: (item: string | Record<string, any>) => void,
  echoHidden?: boolean,
  sversion?: number | null,
  std_strings?: boolean,
  docsURLTemplate?: (id: string) => string,
  multipleCommands?: boolean,
): {
  promise: Promise<DescribeResult | null>;
  cancel: () => void;
};

export interface DescribeResult {
  success: boolean;   // false if any command failed
  remainder: string;  // what wasn't run, from its first non-whitespace character (e.g. SQL), or ''
  commands: number;   // how many backslash commands ran (including any that failed)
}

export function describeDataToString(item: string | Record<string, any>): string;
export function describeDataToHtml(item: string | Record<string, any>): string;
export function htmlEscape(str: string, convertWhitespace: boolean): string;
