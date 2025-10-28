import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { NgClass } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { MenuItem } from 'primeng/api';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule, BadgeModule, AvatarModule, NgClass, Ripple, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        routerLink: '/private/home',
        icon: 'pi pi-home',
      }
    ];
  }
}
