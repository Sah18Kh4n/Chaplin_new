import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input('heading') heading: string;
  @Input('show') visible: boolean = false;
  @Output('handleClose') handleClose = new EventEmitter();
  // public visible = true;
  constructor() {
    console.log("SHOW", this.visible)
  }

  ngOnInit(): void {}

  onClose() {
    this.handleClose.emit();
  }
}
