import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild
} from "@angular/core";
import { ApiService } from "../api.service";
import { ChartService } from "../chart.service";
import { Chart } from "chart.js";
import { DataService } from "../services/data.service";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  @ViewChild("canvas") canvas: ElementRef;
  results = [];
  charts = [];
  sem;
  sems = [];
  batch;
  batchs = [2015, 2016, 2017];
  year = new Date().getFullYear();
  n;
  i;
  l;
  len = [];
  length;
  rank;
  passCount = 0;
  failCount = 0;
  chart = [];
  constructor(
    private apiservice: ApiService,
    private chartservice: ChartService,
    private data : DataService
  ) {}

  ngOnInit() {}
  setBatch(batch) {
    console.log(batch);
    if (batch === "2015") {
      this.sems = [];
      this.n = (this.year - batch) * 2;
      for (this.i = 1; this.i <= this.n; this.i++) {
        this.sems.push(this.i);
      }
    }
    if (batch === "2016") {
      this.sems = [];
      this.n = (this.year - batch) * 2;
      for (this.i = 1; this.i <= this.n; this.i++) {
        this.sems.push(this.i);
      }
    }
    if (batch === "2017") {
      this.sems = [];
      this.n = (this.year - batch) * 2;
      for (this.i = 1; this.i <= this.n; this.i++) {
        this.sems.push(this.i);
      }
    }
    this.batch = batch;
  }
  setSem(sem) {
    this.sem = sem;
  }
  api() {
    console.log(this.batch, this.sem);
    var gen: string;
    gen = 'http://127.0.0.1:8000/totalfcd/?batch=' + this.batch + '&sem=' + this.sem;
    this.data.changeMessage(gen);
    this.apiservice.getResult(this.batch, this.sem).subscribe(result => {
      this.results = result;
      this.length = this.results.length;
    });
    this.chartservice.getChart(this.batch, this.sem).subscribe(char => {
      this.charts = char;
      console.log(char);
      for (var j = 0; j < char.failCount.length; j++) {
        this.failCount++;
      }
      for (var k = 0; k < char.passCount.length; k++) {
        this.passCount++;
      }

      console.log(this.failCount);
      console.log(this.passCount);
      this.chart = new Chart("canvas", {
        type: "pie", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data: {
          labels: ["Fail(%)", "Pass(%)"],
          datasets: [
            {
              data: [this.failCount, this.passCount],
              //backgroundColor:'green',
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)"
              ],
              borderWidth: 1,
              borderColor: "#777",
              hoverBorderWidth: 3,
              hoverBorderColor: "#000"
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: "Pass/Fail Count",
            fontSize: 25
          },
          legend: {
            display: true,
            position: "right",
            labels: {
              fontColor: "#000"
            }
          },
          layout: {
            padding: {
              left: 50,
              right: 0,
              bottom: 0,
              top: 0
            }
          },
          tooltips: {
            enabled: true
          }
        }
      });
    });
    this.passCount = 0;
    this.failCount = 0;
    for (this.i = 1; this.i <= this.length; this.i++) {
      this.len.push(this.i);
    }
    console.log(this.len);
  }
}
