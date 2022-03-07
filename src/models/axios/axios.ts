export interface IResponse<T = any> {
  code: number | string;
  data: T;
  msg: string;
}

export interface RequestOptions {
  // Whether to process the request result
  isTransformResponse?: boolean;
}
