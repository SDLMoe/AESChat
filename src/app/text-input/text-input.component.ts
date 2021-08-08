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
  @Input() isLoading: boolean = false;
  @Output() bindValueChange = new EventEmitter<string>();

  constructor(public snackbarService: SnackbarService) { }

  ngOnInit(): void {
  }

  hyperLink() {
    let div: any = document.getElementById("plainText");
    console.log(div)
    // let re = /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/;
    // div.innerHTML = s.replace(re, "<a href='$1'>$1</a>");
  }


  update() {
    this.bindValueChange.emit(this.bindValue);
  }

  clearValue() {
    this.bindValue = "";
    this.update();
  }

}
