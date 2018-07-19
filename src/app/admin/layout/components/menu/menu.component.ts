import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { MenuService } from './../../../../shared/services/menu.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { isArray } from 'util';
import { ToastrService } from 'ngx-toastr';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  encapsulation:ViewEncapsulation.None,
})
export class MenuComponent implements OnInit {
  form: FormGroup;
  closeResult: string;
  menuList;
  modalTitle;
  pageList;
  editIndex;

  constructor( private modalService: NgbModal, private _menuServe: MenuService, private fb: FormBuilder, private toastr: ToastrService, ) {

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

  filterMenu(event){
    this.selectedMenuId=event.target.value;
  }

  getAllMenu(){
    this._menuServe.get().subscribe(response=>{
       this.menuList = response;
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
      let data=this.selectedMenuId;
      this.form.reset();
      this.selectedMenuId=data;
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
          let data=this.selectedMenuId;
          this.form.reset();
          this.selectedMenuId=data;
        }else{
          console.log(response);
        }
        this.toastr.success('Menu published Successfully.');
      },
      error=>{
        this.toastr.error('There is some error in creating the Menu.');
      })
    }
  }

  editMenu(){
    if(!(this.form.invalid)){
      this._menuServe.update(this.editIndex.id, this.form.value).subscribe(response=>{
        this.editIndex=response.data;
        this.getAllMenu();
        this.toastr.success('Menu Updated Successfully.');
      },
      error=>{
        this.toastr.error('There is some error in Updating the Menu.');
      })
    }
  }

  deleteMenu(index)
  {
    // let msg="Are you sure want to delete menu";
    // if(isArray(index.children)){
    //   if(index.children.length > 0){
    //     msg="This menu has sub menu. Are you sure, you want to delete?";
    //   }
    // }
    // let status= confirm(msg);
    // if(status){
    //   this._menuServe.delete(index.id).subscribe(response=>{
    //     this.getAllMenu();
    //   })
    //   return false
    // }
    // else
    //   return false;

    const modalRef = this.modalService.open(AlertComponent);
    modalRef.componentInstance.type = 'danger';
    modalRef.componentInstance.title = 'Are you sure?';
    modalRef.componentInstance.description = 'You want to delete this menu';
    modalRef.result.then((result) => {
      if(result){
        this._menuServe.delete(index.id).subscribe(response=>{
          this.getAllMenu();
        })
      }
    }, (reason) => {
     // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  checkForValidation(){
    return (this.form.invalid  ||  ((this.form.get('linkType').value=='custom')?this.form.get('customLink').value==null:this.form.get('pageSlug').value==null) )
     // return true;
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

  set selectedMenuId(val){
    this.form.get('menuType').setValue(val);
  }

  get selectedMenuId(){
    return this.form.get('menuType').value;
  }

}
