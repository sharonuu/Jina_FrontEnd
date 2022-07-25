export interface AxiosRes<T = any> {
  code: number;
  data: T;
  msg: string
}