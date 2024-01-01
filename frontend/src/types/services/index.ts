export interface IParams {
  [key: string]: any;
}

export interface IGenericOptions {
  url: string;
  params?: IParams;
  options?: RequestInit;
}

export interface IErrorResponse { // *This can depending on your backend server error response
  status: string;
  message: string;
}