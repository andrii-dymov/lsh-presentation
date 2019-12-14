import { MinHash } from './min-hash';

export class LSH {
  private index: { [band: string]: string[] };

  constructor(private bandSize = 4) {
    this.index = {};
  }

  insert(key: string, minHash: MinHash) {
    const hashBands = this.getHashBands(minHash);
    hashBands.forEach(v => {
      if (!this.index[v]) {
        this.index[v] = [key];
        return;
      }
      this.index[v].push(key);
    });
  }

  query(minHash: MinHash): string[] {
    const matches = {};
    const hashBands = this.getHashBands(minHash);
    hashBands.forEach(band => {
      this.index[band].forEach(v => matches[v] = true);
    });
    return Object.keys(matches);
  }

  private getHashBands(minHash: MinHash): string[] {
    if (minHash.hashBands) return minHash.hashBands;
    minHash.hashBands = [];
    const hashValues = minHash.getHashValues();
    for (let i = 0; i < hashValues.length / this.bandSize; i++) {
      const start = i * this.bandSize;
      const end = start + this.bandSize;
      const band = hashValues.slice(start, end);
      minHash.hashBands.push(band.join('.'));
    }
    return minHash.hashBands;
  }
}
