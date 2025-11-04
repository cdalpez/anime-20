import { Component, inject } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { NgClass } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { MenuItem } from 'primeng/api';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { Button } from "primeng/button";

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule, BadgeModule, AvatarModule, NgClass, Ripple, RouterLink, RouterLinkActive, Button],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  private readonly routerService = inject(Router);

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

  onLogout() {

    const route = this.routerService.createUrlTree(['./public']); 

    // Navigate pusha la nuova rotta a quelle già esistenti
    /* this.routerService.navigate('') */

    // navigateByUrl "crea" un path assoluto
    this.routerService.navigateByUrl(route); 
  }
}
