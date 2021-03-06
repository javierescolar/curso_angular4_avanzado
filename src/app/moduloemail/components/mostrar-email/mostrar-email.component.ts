import { Component, OnInit, DoCheck} from '@angular/core';

@Component({
  selector: 'mostrar-email',
  template: `

    <div *ngIf="emailContacto">
      <h4>{{title}}</h4>
      <b>Email de Contacto:</b> {{emailContacto}}
      <button (click)="borrarEmail()">Eliminar email de cotacto</button>
    </div>
  `
})
export class MostrarEmailComponent implements OnInit, DoCheck{
  title = 'Mostrar Email';
  emailContacto: string;

  ngOnInit(){
    this.emailContacto = localStorage.getItem('emailContacto');
  }

  ngDoCheck(){
    this.emailContacto = localStorage.getItem('emailContacto');
  }

  borrarEmail(){
    localStorage.removeItem('emailContacto');
    localStorage.clear();
    this.emailContacto = null;
  }
}
