import HttpStatusCode from "./HttpStatusCode";

export class ResponseError {
  public status: HttpStatusCode;
  public message: string;

  constructor(status: HttpStatusCode, message: string) {
    this.status = status;
    this.message = message;
  }
}
