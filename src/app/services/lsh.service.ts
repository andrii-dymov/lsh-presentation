import { Injectable } from '@angular/core';
import { LSH } from '../lib/lsh';
import { MinHash } from '../lib/min-hash';

export interface IMatch {
  a: string[];
  b: string[];
  sim: number;
}

@Injectable()
export class LshService {
  private bandSize = 4;
  private minSimilarity = 0.3;
  private hashMap = {};
  private windowMap = {};
  private lsh: LSH;
  private lastId = 0;

  constructor() {
    this.lsh = new LSH(this.bandSize);
  }

  insertText(text: string): number {
    const id = this.lastId++;
    const window = this.tokenize(text);
    var hash = this.hashWindow(window);
    this.hashMap[id] = hash;
    this.windowMap[id] = window;
    this.lsh.insert('' + id, hash);
    return id;
  }

  findMatches(id: number): IMatch[] {
    const results = [];
    const matches = this.lsh.query(this.hashMap[id]);
    const a = this.windowMap[id];
    for (const m of matches) {
      const b = this.windowMap[m];
      if (a === b) continue;
      const sim = this.calcSimilarity(a, b);
      if (sim >= this.minSimilarity) {
        results.push({
          a,
          b: b.join(' '),
          sim: Math.round(sim * 10000) / 100,
        });
      }
    }
    return results;
  }

  private calcSimilarity(a: string[], b: string[]): number {
    const totalWords = a.length + b.length;
    let commonWords = 0;
    for (const wordA of a) {
      for (const wordB of b) {
        if (wordA === wordB) {
          commonWords += 2;
        }
      }
    }
    return commonWords / totalWords;
  }

  private tokenize(str: string): string[] {
    return str.toLowerCase().split(/\s+/);
  }

  private hashWindow(w: string[]): MinHash {
    const hash = new MinHash();
    for (const word of w) {
      hash.update(word);
    }
    return hash;
  }
}
