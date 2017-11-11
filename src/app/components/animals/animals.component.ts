import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animation';
import {Animal} from '../../models/animal';
import {AnimalService} from '../../services/animal.service';
import { GLOBAL} from '../../services/global';
@Component({
  selector: 'animals',
  templateUrl: './animals.component.html',
  animations: [fadeIn],
  providers: [AnimalService]
})
export class AnimalsComponent implements OnInit {
  public title:string;
  public animals;
  public url:string;


  constructor(private _animalService: AnimalService){
    this.title = 'Animales';
  }
  ngOnInit(){
    console.log('animals component cargado');
    this.animals = this.getAnimals();
    this.url = GLOBAL.url;
  }

  getAnimals(){
    this._animalService.getAnimals().subscribe(
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
