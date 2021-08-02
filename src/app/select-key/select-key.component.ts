import { Component, OnInit } from '@angular/core';
import { KeySetManagerService } from '../key-set-manager.service';

@Component({
  selector: 'app-select-key',
  templateUrl: './select-key.component.html',
  styleUrls: ['./select-key.component.css']
})
export class SelectKeyComponent implements OnInit {

  constructor(
    public keySetManagerService: KeySetManagerService
  ) { }

  ngOnInit(): void {
  }

}
