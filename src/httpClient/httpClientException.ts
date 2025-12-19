import type { IncomingHttpHeaders } from "http"


export interface ExceptionInterface {
  message: string;
  statusCode: number; 
  errorCode?: string;
  responseHeaders?: IncomingHttpHeaders;
  responseBody?: string;
}

export class HttpClientException extends Error {
  public statusCode = 500;
  public errorCode?: string;
  public responseHeaders?: IncomingHttpHeaders;
  public responseBody?: string;

  constructor(props: ExceptionInterface) {
    super(props.message);
    this.name = "HttpClientException";

    if(props.responseHeaders) this.responseHeaders = props.responseHeaders;
    if(props.responseBody) this.responseBody = props.responseBody;
    if(props.statusCode) this.statusCode = props.statusCode;
  }
}