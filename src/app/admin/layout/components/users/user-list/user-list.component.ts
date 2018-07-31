import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { UserService } from '../../../../../shared/services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomValidators } from 'ng2-validation';
import { ToastrService } from 'ngx-toastr';
import { AlertComponent } from '../../../../../shared/components/alert/alert.component';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {
  imgUrl=environment.imgUrl;
  userList;
  modalTitle;
  errorResponse;
  modalReference;
  userFlag=false;
  userForm:FormGroup;
  constructor( private userService: UserService , private auth:AuthService, private fb:FormBuilder, private router:Router, private modalService:NgbModal,private toastr: ToastrService) {
    let password = new FormControl('', Validators.required);
    let certainPassword = new FormControl('', CustomValidators.equalTo(password));
    this.userForm= this.fb.group({
        id:[''],
        fullName:['',Validators.required],
        roles:['',Validators.required],
        email:['',[Validators.required, CustomValidators.email]],
        password:password,
        password_confirmation:certainPassword
    })
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(){
    this.userService.get().subscribe(response=>{
      this.userList=response;
      if(this.auth.currentUser.roles!="admin")
      this.filterUser('editer');
      this.userFlag=true;
    })
  }

  addUser(content){

    this.userForm.reset();
    this.errorResponse='';
    this.modalTitle="Add User";
    this.modalReference=this.modalService.open(content)
  }

  editUser(rowIndex,content){
    this.userForm.setValue({
      id:this.userList[rowIndex].id,
      fullName:this.userList[rowIndex].name,
      roles:this.userList[rowIndex].roles,
      email:this.userList[rowIndex].email,
      password:'123123',
      password_confirmation:'123123'
    });
    this.modalTitle="Edit User";
    this.modalReference=this.modalService.open(content)
  }
  deleteUser(index,id){
    const modalRef = this.modalService.open(AlertComponent);
    modalRef.componentInstance.type = 'danger';
    modalRef.componentInstance.title = 'Are you sure?';
    modalRef.componentInstance.description = 'You want to delete this user';

    modalRef.result.then((result) => {
      if(result){
        this.userService.delete(id).subscribe(response=>{
          this.getAllUsers();
          console.log(this.getAllUsers())
        })
      }
    }, (reason) => {
     // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  updateUser(){
    this.userService.create(this.userForm.value).subscribe(response=>{
      if(this.modalTitle == 'Edit User')
        this.toastr.success('User updated Successfully.');
      else
        this.toastr.success('User updated Successfully.');
      this.userForm.reset();
      this.modalReference.close();
      this.getAllUsers();
    },error=>{
      if(error.error.email)
        this.errorResponse=error.error.email;
      else if(error.error.password)
        this.errorResponse=error.error.password;
    })
  }

  onRowSelect(rowIndex){
    this.router.navigate(['/admin/user-new', rowIndex] , { skipLocationChange:true})
  }

  filterUser(userRole) {
    const temp1 = this.userList.filter(function(d) {
      return d.roles==userRole;
    });
    this.userList = temp1;
  }
}
