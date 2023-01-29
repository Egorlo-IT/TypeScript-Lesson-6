export class Hotel {
  constructor(
    private readonly provider: string,
    public readonly originalId: string,
    public readonly name: string,
    public readonly description: string,
    public readonly image: string,
    public readonly price: number,
    public readonly remoteness?: number
  ) {}
  get id() {
    return this.provider + "-" + this.originalId;
  }
  get providerName() {
    return this.provider;
  }
  public isProvidedBy(providerName: string): boolean {
    return this.provider === providerName;
  }
}
