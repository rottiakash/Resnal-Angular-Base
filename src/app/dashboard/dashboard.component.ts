import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnDestroy
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
export class DashboardComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    if(this.fcdgraph||this.canvas)
    {
      console.log("Destroy");
      this.fcdgraph.destroy();
      this.canvas.destroy();
    }
  }
  fcdchart = []
  results = [];
  charts = [];
  sem;
  sems = [];
  batch;
  batchs = [2015, 2016, 2017, 2018];
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
  fcdgraph;
  canvas;
  constructor(
    private apiservice: ApiService,
    private chartservice: ChartService,
    private data : DataService,
    private http: HttpClient
  ) {}
  exportAsExcel()
  {
    window.open("/api/genXLDash/?batch="+this.batch+"&sem="+this.sem+"&pc="+this.passCount+"&fc="+this.failCount, "_blank");
  }
  exportAllAsExcel()
  {
    window.open("/api/genallXL/?batch="+this.batch+"&sem="+this.sem, "_blank");
  }
  reload(){
    window.location.reload();
  }
  ngOnInit() {
    this.http.get("/api/wake", {observe: 'response'})
  .subscribe(response => {

    // You can access status:
    console.log(response.status);
    if(response.status==200)
    {
      console.log("Dyno is now Awake");
    }

    // Or any other header:
    console.log(response.headers.get('X-Custom-Header'));
  });
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
    if (batch === "2018") {
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
    gen = '/api/totalfcd/?batch=' + this.batch + '&sem=' + this.sem;
    this.data.changeMessage(gen);
    this.http.get(gen, {observe: 'response'})
  .subscribe(response => {

    // You can access status:
    console.log(response.status);
    if(response.status==204)
    {
      window.alert("No data avaliable");
    }

    // Or any other header:
    console.log(response.headers.get('X-Custom-Header'));
  });
    this.apiservice.getResult(this.batch, this.sem).subscribe(result => {
      this.results = result;
      this.length = this.results.length;
    });
    this.data.currentMessage.subscribe(message => { this.seriesData = message.split(',').map(Number);
    console.log(this.seriesData);
    this.passCount = this.seriesData[4];
    this.failCount = this.seriesData[5];
    this.seriesData.pop();
    this.seriesData.pop();
    if(this.fcdgraph) this.fcdgraph.destroy();    
    this.fcdgraph = new Chart("fcdgraph", {
      type: 'bar',
      data: {
        labels: ['FCD', 'FC', 'SC', 'P'],
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
    if(this.canvas) this.canvas.destroy();
    this.canvas = new Chart("canvas", {
      type: "pie", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data: {
        labels: ["Fail", "Pass"],
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
  }
}
