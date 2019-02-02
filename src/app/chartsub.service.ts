import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";
import { Http } from "@angular/http";
@Injectable()
export class ChartSubService {
  results = [];
  url;
  constructor(public http: Http) {
    console.log("APi called");
    this.url = "http://vkhand.pythonanywhere.com/ranalysis/?batch=";
  }
  getChartSub(batch, sem, scode) {
    return this.http
      .get(this.url + batch + "&sem=" + sem + "&scode=" + scode)
      .map(res => res.json());
  }
}
