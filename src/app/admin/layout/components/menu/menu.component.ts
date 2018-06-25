import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuService } from './../../../../shared/services/menu.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { isArray } from 'util';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  form: FormGroup;
  closeResult: string;
  menuList;
  pageList;

  editIndex;



  constructor( private modalService: NgbModal, private _menuServe: MenuService, private fb: FormBuilder) {

    this.form = this.fb.group({
      title: ['', [Validators.minLength(2), Validators.required]],
      linkType: ['custom'],
      customLink: [''],
      pageSlug: [''],
      menuType: ['primary'],
      parent_id: ['']
    });
  }

  ngOnInit() {
    this.editIndex=null;
    this.getAllMenu();
    this.getAllPages();

  }

  getAllMenu(){
    this._menuServe.get().subscribe(response=>{
       this.menuList = response;
       console.log(this.menuList);

    })
  }

  getAllPages(){
    this._menuServe.getPages().subscribe(response=>{
       this.pageList = response;

    })
  }

  openModal(content,index = null){
    if(index == null){
      this.editIndex=null;
      this.form.reset();
    }else{
      this.editIndex=index;
      let obj=this.editIndex;
      let editObj: Object;
      editObj={
        title: obj.title,
        linkType: obj.linkType,
        customLink: obj.customLink,
        pageSlug: obj.pageSlug,
        menuType: obj.menuType,
        parent_id: obj.parent_id,
      };
      this.form.setValue(editObj);
    }
    this.open(content);
  }

  addNewMenu(){
    if(!(this.form.invalid)){
      this._menuServe.create(this.form.value).subscribe(response=>{
        if(response.success == true){
          this.menuList.push(response.data);
          this.getAllMenu();
          this.form.reset();
        }else{
          console.log(response);
        }
      })
    }
  }

  editMenu(){
    if(!(this.form.invalid)){
      this._menuServe.update(this.editIndex.id, this.form.value).subscribe(response=>{
        this.editIndex=response.data;
        this.getAllMenu();
      })
    }
  }

  deleteMenu(index){
    let msg="Are you sure want to delete menu";
    if(isArray(index.children)){
      if(index.children.length > 0){
        msg="This menu has sub menu. Are you sure, you want to delete?";
      }
    }
    let status= confirm(msg);
    if(status){
      this._menuServe.delete(index.id).subscribe(response=>{
        this.getAllMenu();
      })

      return false
    }
    else
      return false;
  }


  /*  Modal */
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  /*  Modal End */

}
