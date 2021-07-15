import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {

  @Input() title?: string;
  @Input() bindValue?: string;
  @Output() bindValueChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck() {
    this.bindValueChange.emit(this.bindValue);
  }

}
