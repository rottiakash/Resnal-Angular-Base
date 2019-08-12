import {Component, OnInit, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import { Student } from '../../models/student.model';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs';
import {DataService} from '../../services/data.service';
@Component({
  selector: 'app-fcd-table',
  templateUrl: './fcdtable.component.html',
  styleUrls: ['./fcdtable.component.css']
})
export class FCDtableComponent implements OnInit {
  dataSource;
  fcdn = 0;
  scn = 0;
  fcn = 0;
  pn = 0;
  fn = 0;
  sendstr;
  private serviceUrl = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['name', 'usn', 'section', 'intmarks', 'extmarks', 'totalmarks', 'gpa'];
  constructor(private http: HttpClient, private data: DataService) { }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    this.data.currentMessage.subscribe(message => {this.serviceUrl = message; console.log(this.serviceUrl);   this.getStudent().subscribe((students: Student[]) => {
      this.dataSource = new MatTableDataSource(students);
      this.dataSource.paginator = this.paginator;
      this.fcdn = 0;
      this.scn = 0;
      this.fcn = 0;
      this.pn = 0;
      this.fn = 0;
      students.forEach(i => {
        if (i.FCD === 'FCD') {
          this.fcdn += 1;
        } else if (i.FCD === 'FC') {
          this.fcn += 1;
        } else if (i.FCD === 'SC') {
          this.scn += 1;
        } else if (i.FCD === 'P') {
          this.pn += 1;
        } else {
          this.fn += 1;
        }
      });
      this.sendstr = this.fcdn + ',' + this.fcn + ',' + this.scn + ',' + this.pn + ',' + this.fn;
      this.data.changeMessage(this.sendstr);
      if (this.fcdn === 0) {
        window.alert('No data found. Please check the input');
      }
    }); });
    this.getStudent().subscribe((students: Student[]) => {
      this.dataSource = new MatTableDataSource(students);
      this.dataSource.paginator = this.paginator;
   });
  }
  getStudent(): Observable<Student[]> {
    return this.http.get<Student[]>(this.serviceUrl);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
