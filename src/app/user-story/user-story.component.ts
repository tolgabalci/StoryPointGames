import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from "ng2-bs3-modal/components/modal";

@Component({
  selector: 'app-user-story',
  templateUrl: './user-story.component.html',
  styleUrls: ['./user-story.component.css']
})
export class UserStoryComponent implements OnInit {

  constructor() { }

  @ViewChild('modal')
  modal: ModalComponent;
  open() {
    this.modal.open();
  }

  ngOnInit() {
  }

}
