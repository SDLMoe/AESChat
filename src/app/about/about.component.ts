import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  date = new Date(document.lastModified);
  buildtime = new Intl.DateTimeFormat(
    'ja-JP-u-ca-iso8601',
    {
      timeZone: 'Hongkong', timeZoneName: 'long',
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      hour12: true
    }).format(this.date)

  constructor() { }
  ngOnInit() { }
}
