import { Directive, inject, input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective implements OnInit {

  private viewContainer = inject(ViewContainerRef);   // Generare nuovo contenuto
  private templateRef = inject(TemplateRef);          // per riferimento

  appHasPermission = input.required<string>(); 

  // Record specifica che stiamo creando un oggetto di tipo "key: value"
  private readonly userRoles: Record<string, string[]> = {
    guest: [],
    user: ['read'], 
    admin: ['read', 'edit'],
  }; 

  currentUserRole: 'guest' | 'user' | 'admin' = 'admin'; 

  constructor() { 

  }

  ngOnInit(): void {
    this.checkPermission(); 
  }

  private checkPermission() {
    const requiredRole = this.appHasPermission(); 

    if (this.hasPermission(requiredRole)) {
      this.viewContainer.createEmbeddedView(this.templateRef); 
    }
  }

  private hasPermission(requiredRole: string): boolean {
    
    if (!this.userRoles[requiredRole]) {
      console.warn(`Il ruolo richiesto non è presente tra i ruoli disponibili ${requiredRole}`); 
      return false;
    }

    const currentUserPermission = this.userRoles[this.currentUserRole]; 
    const requiredPermission = this.userRoles[requiredRole];  

    
    return requiredPermission.every(permission => currentUserPermission.includes(permission)); 

  }

}
