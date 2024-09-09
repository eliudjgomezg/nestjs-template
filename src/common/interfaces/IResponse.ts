export interface IResponse<T> {
  response: T
  metadata?: { count: number, pages: number }
}