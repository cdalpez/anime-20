import { Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { NgClass } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { MenuItem } from 'primeng/api';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Button } from 'primeng/button';
import { UserService } from '../../../services/user-service';
import { AuthService } from '../../../services/auth-service';
import { catchError, finalize, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [
    MenubarModule,
    BadgeModule,
    AvatarModule,
    NgClass,
    Ripple,
    RouterLink,
    RouterLinkActive,
    Button,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnDestroy {
  private readonly routerService = inject(Router);
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);

  private readonly destroy$ = new Subject<void>();

  isLogoutLoading = signal<boolean>(false);

  username = computed(() => this.userService.currentUser()?.username);
  // username = this.userService.currentUser()?.username;

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        routerLink: '/private/home',
        icon: 'pi pi-home',
      },
    ];
  }

  onLogout() {
    const route = this.routerService.createUrlTree(['public']);

    // Navigate pusha la nuova rotta a quelle già esistenti
    /* this.routerService.navigate('') */

    // navigateByUrl "crea" un path assoluto
    this.isLogoutLoading.set(true);
    this.authService
      .logout()
      .pipe(
        finalize(() => {
          this.isLogoutLoading.set(false);
          this.routerService.navigateByUrl(route);
        }),
        catchError((err) => {
          this.isLogoutLoading.set(false);
          return err;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
