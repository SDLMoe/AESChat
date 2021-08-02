import { Directive, HostListener, Output, EventEmitter } from "@angular/core";

@Directive({
  selector: "[dropzone]"
})
export class DropzoneDirective {
  @Output() dropped = new EventEmitter<FileList>();
  @Output() hovered = new EventEmitter<boolean>();

  @HostListener("drop", ["$event"])
  onDrop($event: any) {
    $event.preventDefault();
    this.dropped.emit($event.dataTransfer.files);
    this.hovered.emit(false);
  }

  @HostListener("dragover", ["$event"])
  onDragOver($event: any) {
    $event.preventDefault();
    this.hovered.emit(true);
  }

  @HostListener("dragleave", ["$event"])
  onDragLeave($event: any) {
    $event.preventDefault();
    this.hovered.emit(false);
  }

  @HostListener("window:paste", ["$event"])
  onPaste(e: any) {
    var items = (e.clipboardData || (<any>window).clipboardData).items;
    var file = null;
    if (items && items.length) {
        for (var i = 0; i < items.length; i++) {
          file = items[i].getAsFile();
          break;
        }
    } else {
        return;
    }
    if (!file) {
        return;
    }
    this.dropped.emit(file);
  }
}