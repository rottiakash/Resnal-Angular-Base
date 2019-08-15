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
import * as XLSX from 'xlsx';
import { HttpHeaders, HttpClient } from "@angular/common/http";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  @ViewChild("canvas") canvas: ElementRef;
  @ViewChild("fcdgraph") fcdgraph: ElementRef;
  @ViewChild("table") table: ElementRef;
  fcdchart = []
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
  seriesData = [];
  constructor(
    private apiservice: ApiService,
    private chartservice: ChartService,
    private data : DataService,
    private http: HttpClient
  ) {}

  ngOnInit() {}
  reload(){
    window.location.reload();
  }
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
  exportAsExcel()
    {
      console.log("Not yet implemented:-"+this.batch+":"+this.sem);
      window.open("http://127.0.0.1:8000/test", "_blank");

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
    this.data.currentMessage.subscribe(message => { this.seriesData = message.split(',').map(Number);
    console.log(this.seriesData);     
    this.fcdgraph = new Chart("fcdgraph", {
      type: 'bar',
      data: {
        labels: ['FCD', 'FC', 'SC', 'P', 'F'],
        datasets: [{
            data: this.seriesData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      legend:{
        display:false
      }
    }
    });
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
