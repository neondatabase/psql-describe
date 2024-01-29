
export function describe(
  cmd: string,
  dbName: string,
  runQuery: (sql: string) => any,
  outputFn: (item: string | Record<string, any>) => void,
  echoHidden?: boolean,
  sversion?: number | null,
  std_strings?: boolean,
  docsURLTemplate?: (id: string) => string,
): {
  promise: Promise<boolean | null>;
  cancel: () => void;
};

export function describeDataToString(item: string | Record<string, any>): string;
export function describeDataToHtml(item: string | Record<string, any>): string;
