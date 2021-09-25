abstract class Reply {
  constructor(
    private statusCode: number,
    private error: Object | null,
    private message: string,
    private data: Object
  ) {}
}

interface ICreated {
  message: string
  data: Object
}
export class SuccessReply extends Reply {
  constructor(statusCode: number, message: string, data: Object) {
    super(statusCode, null, message, data)
  }

  static Created({ message, data }: ICreated): Reply {
    return new SuccessReply(201, message, data)
  }
}
