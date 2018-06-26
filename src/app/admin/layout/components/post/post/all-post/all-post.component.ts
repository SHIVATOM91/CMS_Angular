import { PostService } from './../../../../../../shared/services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {
  editing = {};
  selected = [];
  columns = [
    { prop: 'title' },
    { name: 'Description' },
    { name: 'Image' }
  ];
  postList: Array<PostObject>;

  constructor(private _service: PostService) { }


  ngOnInit() {
    this.getAllPosts();
  }

  getAllPosts(){
    this._service.get().subscribe(response => {
      this.postList = response as PostObject[];
    })
  }

}

export class PostObject{
  id: any;
  title: any;
  description: any;
  image: any;
}
