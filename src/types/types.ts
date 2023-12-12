export interface IRequestParams {
  url: string;
  query: string;
  headers: Record<string, string>;
  variables: Record<string, string>;
}

export interface IResponseResultData {
  data: unknown;
}
