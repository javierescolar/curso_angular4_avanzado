import { Component, OnInit } from '@angular/core';


@Component({
  selector:'tienda',
  templateUrl:'./tienda.component.html',
  styleUrls:['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  public titulo;
  public nombreDelParque: string;
  public miParque;
  
  constructor(){
    this.titulo = "esta es la tienda";
  }

  ngOnInit(){
    $('#textojq').hide();
    $('#botonjq').click(()=> {
      $('#textojq').slideToggle();
    });
    $('#caja').dotdotdot();
  }
  mostrarNombre(){
    console.log(this.nombreDelParque);
  }

  verDatosParque(event){
    console.log(event);
    this.miParque = event;
  }

  textoRichEditor(contenido){
    console.log(contenido);
  }
}
