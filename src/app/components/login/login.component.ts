import {Component, OnInit} from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {User} from '../../models/user';
import {GLOBAL} from '../../services/global';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers:[UserService]
})

export class LoginComponent implements OnInit {
  public title;
  public user:User;
  public identity:any;
  public token:any;
  public status:string

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UserService
  ) {
    this.title = 'Login';
    this.user = new User('','','','','','ROLE_USER','');
  }

  ngOnInit(){
    console.log("login componenet cargado!!");

  }

  onSubmit(){
    //logear el usuario para conseguir el objeto
    this._userService.singUp(this.user).subscribe(
      response => {
        this.identity = response.user;

        if(!this.identity || !this.identity._id){
          alert("El usuario no se ha registrado correctamente");
        } else {
          delete this.identity.password;
          localStorage.setItem('identity',JSON.stringify(this.identity));
          //segunda peticio para conseguir el  token
          this._userService.singUp(this.user,'true').subscribe(
            response => {
              this.token = response.token;
              if(this.token.length <= 0){
                alert("el token no se ha generado");
              } else {
                localStorage.setItem('token',this.token);
                this.status = 'success';
                this._router.navigate(['/']);
              }
            },
            error => {
              console.log(<any>error);

            }
          )

        }
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
      }
    )

  }

}
