export class NotionSdkError extends Error {
  code: string;

  constructor(code: string) {
    super(code);
    this.code = code;
    this.name = 'NotionSdkError';
  }
}