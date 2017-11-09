import { Component,OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { GLOBAL} from '../../services/global';
import { Animal} from '../../models/animal';
import { AnimalService} from '../../services/animal.service';

@Component({
  selector: 'animal-detail',
  templateUrl: './animal_detail.component.html',
  providers: [AnimalService]
})
export class AnimalDetailComponent implements OnInit{
  public title:string;
  public url:string;
  //numbers = new Array(8);
  public animal: Animal;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _animaService: AnimalService
  ){
    this.title = 'Listado';
    this.url = GLOBAL.url;

  }

  ngOnInit(){
    console.log("Animal Detail component cargado!");
    this.getAnimal();
  }

  getAnimal() {
    this._route.params.forEach((params:Params)=>{
      let id = params['id'];

      this._animaService.getAnimal(id).subscribe(
        response => {
          if(!response.animal){
            this._router.navigate(['/home']);
          } else {
            this.animal = response.animal;
          }
        },
        error => {
          console.log(<any>error);
          this._router.navigate(['/home']);
        }
      );
    })
  }
}
