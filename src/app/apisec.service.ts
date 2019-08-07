import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";
import { Http } from "@angular/http";
@Injectable()
export class ApiSecService {
  results = [];
  url;
  constructor(public http: Http) {
    console.log("APi called");
    this.url = "http://127.0.0.1:8000/json/?batch=";
  }
  getResultSec(batch, sem, sec) {
    return this.http
      .get(this.url + batch + "&sem=" + sem + "&sec=" + sec)
      .map(res => res.json());
  }
}
