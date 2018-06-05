import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  closeResult: string;
  menuList=[
    { "title" :"Menu 1" , "link":"page 1"},
    { "title" :"Menu 2" , "link":"page 2"},
    { "title" :"Menu 3" , "link":"page 3"},
    { "title" :"Menu 4" , "link":"page 4"},
 
  ];
  pageList=[
    { "title" :"page 1"},
    { "title" :"page 2"},
    { "title" :"page 3"},
    { "title" :"page 4"},
    { "title" :"page 5"},
    { "title" :"page 6"},
    { "title" :"page 7"},
    { "title" :"page 8"},
    { "title" :"page 9"}
  ];
  menuTittle="";
  menuLink="";
  constructor( private modalService: NgbModal ) { }

  ngOnInit() {
  }

 

  addToMenuList(formdata){
    this.menuList.push({ "title" :this.menuTittle , "link":this.menuLink});
    //
  }

  deleteMenu(index){
    let status= confirm("Are you sure want to delete menu");
    if(status){this.menuList.splice(index,1); return false}
    else return false;
  }

  editMenu(index ,content){
    this.menuTittle= this.menuList[index].title;
    this.menuLink=this.menuList[index].link;
    this.open(content);
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
