import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class DataService {
  wordUrl: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getWord(query) {
    return this.http.get(this.wordUrl+ `/generate/word?difficulty=${query}`)
  }
}
