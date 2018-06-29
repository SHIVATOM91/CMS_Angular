import { Router } from '@angular/router';
import { ProjectService } from './../../../../../../shared/services/project.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-project',
  templateUrl: './all-project.component.html',
  styleUrls: ['./all-project.component.css']
})
export class AllProjectComponent implements OnInit {
  editing = {};
  selected = [];
  columns = [
    { prop: 'title' },
    { name: 'Description' },
    { name: 'Image' }
  ];
  projectList: Array<ProjectObject>;

  constructor(private _service: ProjectService, private router: Router) { }


  ngOnInit() {
    this.getAllProjects();
  }

  getAllProjects(){
    this._service.get().subscribe(response => {
      this.projectList = response as ProjectObject[];
    })
  }

  onRowSelect(){
    if(this.selected.length > 0)
      this.router.navigate(['admin/project/latest/update', this.selected[0].id ] , { skipLocationChange:true})
  }

}

export class ProjectObject{
  id: any;
  title: any;
  description: any;
  image: any;
}
