import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    isActive: boolean = false;
    showMenu: string = '';
    pushRightClass: string = 'push-right';
    // need to update
     meniItem=[
        {
            "name":"Dashboard",
            "link":"dashboard",
            "icon":"fa fa-tachometer",
            "hide":[]
        },{
            "name":"Posts",
            "link":"post",
            "icon":"fa fa-clipboard",
            "hide":['editer']
        },
        {
            "name":"Pages",
            "link":"page",
            "icon":"fa fa-file",
            "hide":[]
        },
        {
            "name":"Sections",
            "link":"sections",
            "icon":"fa fa-suitcase",
            "hide":['editer']
        },
        {
            "name":"Menu",
            "link":"menu",
            "icon":"fa fa-bars",
            "hide":[]
        },
        {
            "name":"Banner",
            "link":"banner",
            "icon":"fa fa-picture-o",
            "hide":[]
        },
        {
            "name":"Services",
            "link":"service",
            "icon":"fa fa-clipboard",
            "hide":[]
        },
        {
            "name":"Projets",
            "link":"project",
            "icon":"fa fa-folder-o",
            "hide":[]
        },
        {
            "name":"Partners",
            "link":"partners",
            "icon":"fa fa-handshake-o",
            "hide":[]
        },
        {
            "name":"Teams",
            "link":"teams",
            "icon":"fa fa-users",
            "hide":[]
        },
        {
            "name":"Testimonial",
            "link":"testimonials",
            "icon":"fa fa-pencil",
            "hide":[]
        },
        {
            "name":"Users",
            "link":"user",
            "icon":"fa fa-user",
            "hide":[]
        },
        {
            "name":"Settings",
            "link":"app-settings",
            "icon":"fa fa-wrench",
            "hide":[]
        }
    ]
    constructor(private authServ:AuthService) {
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }


    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }
}
