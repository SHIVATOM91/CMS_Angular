import { Router } from '@angular/router';
import { PostService } from './../../../../../../shared/services/post.service';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImagePopupComponent } from '../../../../../../shared/components/image-popup/image-popup.component';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {
  editing = {};
  selected = [];
  imgUrl=environment.imgUrl;
  columns = [
    { prop: 'title' },
    { name: 'Description' },
    { name: 'Image' }
  ];
  postList: Array<PostObject>;

  constructor(private modalService:NgbModal , private _service: PostService, private router: Router) { }

  ngOnInit() {
    this.getAllPosts();
  }

  getAllPosts(){
    this._service.get().subscribe(response => {
      this.postList = response as PostObject[];
    })
  }

  enlargeImage(value){
    const modalRef = this.modalService.open(ImagePopupComponent);
    modalRef.componentInstance.url = value;
  }
    
  onRowSelect(){
    if(this.selected.length > 0)
      this.router.navigate(['admin/post/latest/update', this.selected[0].id ] , { skipLocationChange:true})
  }

}

export class PostObject{
  id: any;
  title: any;
  description: any;
  image: any;
}


