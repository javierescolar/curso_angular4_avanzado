import { Component,OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { GLOBAL} from '../../../services/global';
import { Animal} from '../../../models/animal';
import { AnimalService} from '../../../services/animal.service';

@Component({
  selector: 'admin-list',
  templateUrl: './list.component.html',
  providers: [AnimalService]
})
export class ListComponent implements OnInit{
  public title:string;
  public url = GLOBAL.url;
  //numbers = new Array(8);
  public animals: Animal[];
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _animaService: AnimalService
  ){
    this.title = 'Listado';
    this.url = GLOBAL.url;

  }

  ngOnInit(){
    this._animaService.getAnimals().subscribe(
      response =>{
        console.log(response);
        if(!response.animals){
          console.log("No hay animales");
        } else {
          this.animals = response.animals;
        }
      },
      error => {
        console.log("Error en el subscribe");
        console.log(<any>error);
      }
    );
  }
}
