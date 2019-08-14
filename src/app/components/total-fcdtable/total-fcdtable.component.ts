import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { TotalFCD } from '../../models/TotalFCD.model';

@Component({
  selector: 'app-total-fcdtable',
  templateUrl: './total-fcdtable.component.html',
  styleUrls: ['./total-fcdtable.component.scss']
})
export class TotalFcdtableComponent implements OnInit {
  dataSource;
  fcdn = 0;
  scn = 0;
  fcn = 0;
  pn = 0;
  fn = 0;
  sendstr;
  private serviceUrl = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['name', 'usn', 'sem', 'gpa', 'FCD'];
  constructor(private http: HttpClient, private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => {this.serviceUrl = message; console.log(this.serviceUrl);   this.getStudent().subscribe((students: TotalFCD[]) => {
      this.dataSource = new MatTableDataSource(students);
      this.dataSource.paginator = this.paginator;
      this.fcdn = 0;
      this.scn = 0;
      this.fcn = 0;
      this.pn = 0;
      this.fn = 0;
      students.forEach(i => {
        if (i.totalFCD === 'FCD') {
          this.fcdn += 1;
        } else if (i.totalFCD === 'FC') {
          this.fcn += 1;
        } else if (i.totalFCD === 'SC') {
          this.scn += 1;
        } else if (i.totalFCD === 'P') {
          this.pn += 1;
        } else if(i.totalFCD === 'F') {
          this.fn += 1;
        }
      });
      this.sendstr = this.fcdn + ',' + this.fcn + ',' + this.scn + ',' + this.pn + ',' + this.fn;
      this.data.changeMessage(this.sendstr);
    }); });
    this.getStudent().subscribe((students: TotalFCD[]) => {
      this.dataSource = new MatTableDataSource(students);
      this.dataSource.paginator = this.paginator;
   });
  }
  getStudent(): Observable<TotalFCD[]> {
    return this.http.get<TotalFCD[]>(this.serviceUrl);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
