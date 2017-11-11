import { Component,OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { GLOBAL} from '../../../services/global';
import { Animal} from '../../../models/animal';
import { AnimalService} from '../../../services/animal.service';
import { UserService} from '../../../services/user.service';
import { fadeLateral} from '../../animation';

@Component({
  selector: 'admin-list',
  templateUrl: './list.component.html',
  providers: [AnimalService,UserService],
  animations: [fadeLateral]
})
export class ListComponent implements OnInit{
  public title:string;
  public url = GLOBAL.url;
  //numbers = new Array(8);
  public animals: Animal[];
  public token;
  public busqueda:string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _animaService: AnimalService,
    private _userService: UserService
  ){
    this.title = 'Listado';
    this.url = GLOBAL.url;
    this.token = this._userService.getToken();
  }

  ngOnInit(){
    this.getAnimals();
  }

  getAnimals(){
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

  deleteAnimal(id){
    $('#myModal-'+id).modal('hide');
    this._animaService.deleteAnimal(this.token,id).subscribe(
      response => {
        if(!response.animal){
          alert('Error en el servidor...animal remove no encotrado');
        }
        this.getAnimals();
      },
      error => {
        alert('Error en el servidor');
      }
    );
  }
}
