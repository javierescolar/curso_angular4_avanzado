import { Component, OnInit, DoCheck} from '@angular/core';

@Component({
  selector: 'main-email',
  template: `
    <div class='panel panel-default'>
      <h2>{{title}}</h2>
      <guardar-email></guardar-email>
      <mostrar-email></mostrar-email>
    </div>
  `
})
export class MainEmailComponent implements OnInit{
  title = 'Modulo de Emails';

  ngOnInit(){
    console.log("modulo main email cargado correctamente");
  }
}
