import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from "@angular/core";
import { ApiSecService } from "../apisec.service";
import { ChartSecService } from "../chartsec.service";
import { ChartSubService } from "../chartsub.service";
import { Chart } from "chart.js";
import { DataService } from "../services/data.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"]
})
export class UserProfileComponent implements OnInit,OnDestroy {
  ngOnDestroy(){
    if(this.fcdgraph2)
    {
      console.log("Destory");
      this.fcdgraph2.destroy();
      this.canvas2.destroy();
    }
  }
  results = [];
  charts = [];
  charts1 = [];
  sem;
  sems = [];
  batch;
  batchs = [2015, 2016, 2017, 2018];
  sec;
  secs = ["A", "B", "C"];
  sub;
  subs = [];
  year = new Date().getFullYear();
  n;
  i;
  passCount = 0;
  failCount = 0;
  passSubACount = 0;
  failSubACount = 0;
  passSubBCount = 0;
  failSubBCount = 0;
  passSubCCount = 0;
  failSubCCount = 0;
  pass1Count = 0;
  fail1Count = 0;
  chart = [];
  chart1 = [];
  seriesData = [];
  fcdgraph2;
  canvas2;
  constructor(
    private apisecservice: ApiSecService,
    private chartservice: ChartSecService,
    private chartsubservice: ChartSubService,
    private data: DataService,
    private http:HttpClient
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
    if (batch === "2018") {
      this.sems = [];
      this.n = (this.year - batch) * 2;
      for (this.i = 1; this.i <= this.n; this.i++) {
        this.sems.push(this.i);
      }
    }
    this.batch = batch;
  }
  exportAsExcel()
  {
    var scode = this.sub.substr(0,this.sub.indexOf(' '));
    window.open("https://resnalbackend.herokuapp.com/genXL/?sec="+this.sec+"&scode="+scode+"&batch="+this.batch, "_blank");
  }
  reload(){
    window.location.reload();
  }
  setSem(sem) {
    this.sem = sem;
    if (this.batch == 2015 && this.sem == 8) {
      this.subs = [
        "15CS81 (INTERNET OF THINGS AND APPLICATIONS)",
        "15CS82 (BIG DATA ANALYTICS)",
        "15CS84 (INTERNSHIP/PROFESSIONAL PRACTICE)",
        "15CS834 (SYSTEM MODELING AND SIMULATION)",
        "15CS832 (MODERN INTERFACE DESIGN)",
        "15CSP85 (PROJECT WORK PHASE II)",
        "15CSS86 (SEMINAR)"
      ];
    }
    if (this.batch == 2017 && this.sem == 1) {
      this.subs = [
        "17MAT11 (ENGINEERING MATHEMATICS-I)",
        "17PHY12 (ENGINEERING PHYSICS)",
        "17CIV13 (ELEMENTS OF CIVIL ENGG. & MECHANICS)",
        "17EME14 (ELEMENTS OF MECHANICAL ENGINEERING)",
        "17ELE15 (BASIC ELECTRICAL ENGINEERING)",
        "17WSL16 (WORKSHOP PRACTICE)",
        "17PHYL17 (ENGINEERING PHYSICS LAB.)"
      ];
    }
    if (this.batch == 2016 && this.sem == 6) {
      this.subs = [
        "15CS61 (CRYPTOGRAPHY, NETWORK SECURITY AND CYBER LAW)",
        "15CS62 (COMPUTER GRAPHICS AND VISUALIZATION)",
        "15CS63 (SYSTEM SOFTWARE AND COMPILER DESIGN)",
        "15CS64 (OPERATING SYSTEMS)",
        "15CS651 (DATA MINING AND DATA WAREHOUSING)",
        "15CS653 (Operation Research)",
        "15MAT661 (Linear Algebra)",
        "15CS664 (PYTHON APPLICATION PROGRAMMING)",
        "15CSL67 (SYSTEM SOFTWARE & OPERATING SYSTEM LAB)",
        "15CSL68 (COMP. GRAPHICS LABORATORY WITH MINI PROJECT)",
        "15IM663 (Value engineering)"
      ];
    }
    if(this.batch == 2017 && this.sem == 4){
      this.subs = [
        "17MAT41 (ENGINEERING MATHEMATICS - IV)",
        "17CS42 (OBJECT ORIENTED CONCEPTS)",
        "17CS43 (DESIGN AND ANALYSIS OF ALGORITHMS)",
        "17CS44 (MICROPROCESSORS AND MICROCONTROLLERS)",
        "17CS45	 (SOFTWARE ENGINEERING)",
        "17CS46 (DATA COMMUNICATION)",
        "17CSL47 (DESIGN AND ANALYSIS OF ALGORITHMS LABORATORY)",
        "17CSL48 (MICROPROCESSORS LABORATORY)",
        "17CPH49 (CONSTITUTION OF INDIA, PROFESSIONAL ETHICS AND HUMAN RIGHTS)",
        "17MATDIP41 (Additional Mathematics-II)"
      ];
    }
    if (this.batch == 2015 && this.sem == 7) {
      this.subs = [
        "15CS71 (WEB TECHNOLOGY AND ITS APPLICATIONS)",
        "15CS72 (ADVANCED COMPUTER ARCHITECTURES)",
        "15CS73 (MACHINE LEARNING)",
        "15CS744 (UNIX SYSTEM PROGRAMMING)",
        "15CS754 (STORAGE AREA NETWORKS)",
        "15CSL76 (MACHINE LEARNING  LABORATORY)",
        "15CSL77 (WEB TECHNOLOGY LABORATORY  WITH MINI PROJECT)",
        "15CSP78 (PROJECT PHASE 1 + SEMINAR)"
      ];
    }
    if (this.batch == 2016 && this.sem == 5) {
      this.subs = [
        "15CS51 (MANAGEMENT AND ENTREPRENEURSHIP FOR IT INDUSTRY)",
        "15CS52 (COMPUTER NETWORKS)",
        "15CS53 (DATABASE MANAGEMENT SYSTEM)",
        "15CS54 (AUTOMATA THEORY AND COMPUTABILITY)",
        "15CS553 (ADVANCED JAVA AND J2EE)",
        "15CSL57 (COMPUTER NETWORK LAB)",
        "15CSL58 (DBMS LABORATORY WITH MIN PROJECT)",
        "15PHY561 (LASER PHYSICS AND NON LINEAR OPTICS)",
        "15ME562 (ENERGY AND ENVIRONMENT)",
        "15CS564 (DOT NET FRAMEWORK FOR APPLICATION DEVELOPMENT)",
        "15CS562 (ARTIFICIAL INTELLIGENCE)"
      ];
    }
    if(this.batch == 2017 && this.sem == 3){
      this.subs = [
        "17MAT31 (ENGINEERING MATHEMATICS - III)",
        "17CS32 (ANALOG AND DIGITAL ELECTRONICS)",
        "17CS33 (DATA STRUCTURES AND APPLICATIONS)",
        "17CS34 (COMPUTER ORGANIZATION)",
        "17CS35	 (UNIX AND SHELL PROGRAMMING)",
        "17CS36 (DISCRETE MATHEMATICAL STRUCTURES)",
        "17CSL37 (ANALOG AND DIGITAL ELECTRONICS LABORATORY)",
        "17CSL38 (DATA STRUCTURES LABORATORY)",
        "17KKX39 (KANNADA)"
      ];
    }
    if(this.batch == 2018 && this.sem == 2){
      this.subs = [
        "18MAT21 (ADVANCED CALCULUS AND NUMERICAL METHODS)",
        "18CHE22 (ENGINEERING CHEMISTRY)",
        "18CPS23 (C PROGRAMMING FOR PROBLEM SOLVING)",
        "18ELN24 (BASIC ELECTRONICS)",
        "18ME25	 (ELEMENTS OF MECHANICAL ENGINEERING)",
        "18CHEL26 (ENGINEERING CHEMISTRY LABORATORY)",
        "18CPL27 (C PROGRAMMING LABORATORY)",
        "18EGH28 (TECHNICAL ENGLISH-II)"
      ];
    }
    if (this.batch == 2016 && this.sem == 4) {
      this.subs = [
        "15MAT41 (ENGINEERING-MATHEMATICS)",
        "15CS42 (SE)",
        "15CS43 (DAA)",
        "15CS44 (MP&MC)",
        "15CS45 (OOC)",
        "15CS46 (DC)",
        "15CSL47 (DAA-LAB)",
        "15CSL48 (MP&MC-LAB)"
      ];
    } else if (this.batch == 2015 && this.sem == 6) {
      this.subs = [
        "15CS61 (Cryptography)",
        "15CS62 (CG)",
        "15CS63 (System-Software-and-Compiler-Design)",
        "15CS64 (Operating Systems)",
        "15CS651 (Data-Mining)",
        "15CS653 (OR)",
        "15CS661 (MAD)",
        "15CS664 (Python)",
        "15CSL67 (SS&OS-LAB)",
        "15CSL68 (CG-Laboratory)"
      ];
    } else if (this.batch == 2017 && this.sem == 2) {
      this.subs = [
        "17PCD23 (CCP)",
        "17MAT21 (Mat-2)",
        "17ELN25 (ELN)",
        "17CPL26 (CCP-LAB)",
        "17CHEL27 (CHEM-LAB)",
        "17CHE22 (CHEM)",
        "17CED24 (CAED)"
      ];
    }
  }
  setSec(sec) {
    this.sec = sec;
  }
  setSub(sub) {
    this.sub = sub;
  }
  api() {
    console.log(this.batch, this.sem, this.sec, this.sub);
    var gen: string;
    var sub: string = this.sub;
    var scode = sub.substr(0,sub.indexOf(' '));
    if(this.sec==undefined)
      gen = 'https://resnalbackend.herokuapp.com/getfcd/?&sc=' + scode + '&batch=' + this.batch;
    else
      gen = 'https://resnalbackend.herokuapp.com/secfcd/?sec=' + this.sec + '&scode=' + scode + '&batch=' + this.batch;
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
    this.apisecservice
      .getResultSec(this.batch, this.sem, this.sec)
      .subscribe(result => {
        this.results = result;
        // console.log(result);
      });
      this.data.currentMessage.subscribe(message => { this.seriesData = message.split(',').map(Number);
      console.log(this.seriesData);    
      if(this.fcdgraph2) this.fcdgraph2.destroy(); 
      this.fcdgraph2 = new Chart("fcdgraph2", {
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
      this.passCount = this.seriesData[0]+this.seriesData[1]+this.seriesData[2]+this.seriesData[3];
      this.failCount = this.seriesData[4];
      if(this.canvas2) this.canvas2.destroy();
      this.canvas2 = new Chart("canvas2", {
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
            text: this.sub,
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
