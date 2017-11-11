import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animation';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {GLOBAL} from '../../services/global';

@Component({
  selector: 'keepers',
  templateUrl: './keepers.component.html',
  animations: [fadeIn],
  providers: [UserService]
})
export class KeepersComponent implements OnInit {
  public title:string;
  public keepers: User[];
  public url:string;

  constructor(private _userService:UserService){
    this.title = 'Cuidadores';
    this.url = GLOBAL.url;

  }
  ngOnInit(){
    console.log('keepers component cargado');
    this.getKeepers();
  }

  getKeepers(){
    this._userService.getKeepers().subscribe(
      response =>{
        console.log(response);
        if(!response.keepers){
          console.log(response);
          console.log("No hay keepers");
        } else {
          this.keepers = response.keepers;
        }
      },
      error => {
        console.log("Error en el subscribe");
        console.log(<any>error);
      }
    );
  }

}
