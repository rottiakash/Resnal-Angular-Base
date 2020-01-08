import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";
import { Http } from "@angular/http";
@Injectable()
export class ApiService {
  results = [];
  url;
  constructor(public http: Http) {
    console.log("APi called");
    this.url = "http://resnal.ml:1216/json/?batch=";
  }
  getResult(batch, sem) {
    return this.http
      .get(this.url + batch + "&sem=" + sem)
      .map(res => res.json());
  }
}
