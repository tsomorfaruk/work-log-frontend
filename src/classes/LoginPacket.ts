export class LoginPacket<T extends object> {
  private data: T;

  constructor(data: T) {
    this.data = data;
  }

  get(): T {
    return this.data;
  }
}
