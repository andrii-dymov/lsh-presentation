export class MinHash {
  // next prime after 32 bit largest int
  private readonly prime = 4294967311;
  private readonly maxHash = Math.pow(2, 32) - 1;
  private hashValues: number[];
  private permA: number[] = [];
  private permB: number[] = [];
  public hashBands: string[];

  constructor(private numPerm = 128, private seed = 1) {
    this.hashValues = Array(this.numPerm).fill(this.maxHash);
    this.initPermutations();
  }

  getHashValues() {
    return this.hashValues;
  }

  // hash a string to a 32 bit unsigned int
  hash(str: string) {
    let hash = 0;
    if (str.length === 0) {
      return this.maxHash;
    }
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // convert to a 32bit integer
    }
    return hash + this.maxHash;
  }

  // update hashValues
  update(str: string) {
    this.hashValues = this.hashValues.map((v, i) => {
      const hash = (this.permA[i] * this.hash(str) + this.permB[i]) % this.prime;
      return Math.min(hash, v);
    });
  }

  private initPermutations() {
    const used = {};
    [this.permA, this.permB] = Array(2).fill(0).map(() =>
      Array(this.numPerm)
        .fill(0)
        .map(() => {
          let int = this.randInt();
          while (used[int]) int = this.randInt();
          used[int] = true;
          return int;
        })
    );
  }

  private randInt() {
    var x = Math.sin(this.seed++) * this.maxHash;
    return Math.floor((x - Math.floor(x)) * this.maxHash);
  }
}
