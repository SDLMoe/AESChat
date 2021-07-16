import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SnackbarService } from '../snackbar.service';


@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {

  @Input() title?: string;
  @Input() bindValue?: string;
  @Output() bindValueChange = new EventEmitter<string>();

  constructor(public snackbarService: SnackbarService) { }

  ngOnInit(): void {
  }

  ngDoCheck() {
    this.bindValueChange.emit(this.bindValue);
  }

}
