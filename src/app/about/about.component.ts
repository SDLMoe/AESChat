import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  // public getVersion(): Observable<any> {
  //   let json = this.http.get('./ngsw.json');
  //   let obj = JSON.parse(json);
  //   let version = obj.timestamp
  //   console.log(version)
  //   return json
  // }

  constructor(private http: HttpClient) {
  }
  ngOnInit() {
  }

}
