import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

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
            "name":"Posts",
            "link":"post",
            "icon":"fa fa-file"
        },
        {
            "name":"Pages",
            "link":"page",
            "icon":"fa fa-file"
        },
        {
            "name":"Sections",
            "link":"sections",
            "icon":"fa fa-suitcase"
        },
        {
            "name":"Menu",
            "link":"menu",
            "icon":"fa fa-bars"
        },
        {
            "name":"Banner",
            "link":"banner",
            "icon":"fa fa-picture-o"
        },
        {
            "name":"Projets",
            "link":"projets",
            "icon":"fa fa-folder-o"
        },
        {
            "name":"Testimonial",
            "link":"testimonial",
            "icon":"fa fa-pencil-square-o"
        },
        {
            "name":"Appearance",
            "link":"Appearance",
            "icon":"fa fa-eye"
        }
    ]
    constructor() {
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
