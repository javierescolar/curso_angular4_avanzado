import { Component, Input, Output, EventEmitter,
         OnChanges, SimpleChanges, OnInit,
         DoCheck, OnDestroy
} from '@angular/core';


@Component({
  selector:'parques',
  templateUrl:'./parques.component.html'
})
export class ParquesComponent implements OnChanges,OnInit,DoCheck, OnDestroy{
  @Input() nombre: string;
  @Input('metros_cuadrados') metros: number;
  public vegetacion: string;
  public abierto: boolean;

  @Output() pasameLosDatos = new EventEmitter();

  constructor(){
    this.nombre = "Parque natural para caballos";
    this.metros = 450;
    this.vegetacion ="Alta";
    this.abierto = false;
  }

  ngOnChanges(changes: SimpleChanges){
    //se ejecuta cada vez que haya un cambio en el componenete
    console.log("existen cambios en las propiedades");
    console.log(changes);
  }

  ngOnInit(){
    //se ejecuta una vez
    console.log("metodo on oinit lanzado");
  }

  ngDoCheck(){
    //se ejecuta después de init y se jecuta con canda evento
    //o carga de angular global
    console.log("El DoCheck se ha ejecutado");
  }

  ngOnDestroy(){
    console.log('Se va a eliminar el componenete');
  }

  emitirEvento(){
    this.pasameLosDatos.emit({
      'nombre': this.nombre,
      'metros': this.metros,
      'vegetacion':this.vegetacion,
      'abierto': this.abierto
    });
  }
}
