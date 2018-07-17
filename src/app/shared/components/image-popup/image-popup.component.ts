import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-popup',
  templateUrl: './image-popup.component.html',
  styleUrls: ['./image-popup.component.css']
})
export class ImagePopupComponent implements OnInit {
  imgUrl=environment.imgUrl;
  url;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
