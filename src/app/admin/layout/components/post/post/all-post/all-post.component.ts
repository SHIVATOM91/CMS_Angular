import { Router } from '@angular/router';
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

  constructor(private _service: PostService, private router: Router) { }


  ngOnInit() {
    this.getAllPosts();
  }

  getAllPosts(){
    this._service.get().subscribe(response => {
      this.postList = response as PostObject[];
    })
  }

  onRowSelect(){
    if(this.selected.length > 0)
      this.router.navigate(['admin/dashboard/post/latest/update', this.selected[0].id ] , { skipLocationChange:true})
  }

}

export class PostObject{
  id: any;
  title: any;
  description: any;
  image: any;
}