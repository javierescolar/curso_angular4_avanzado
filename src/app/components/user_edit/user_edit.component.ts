import {Component, OnInit} from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {User} from '../../models/user';
import {GLOBAL} from '../../services/global';
import {UserService} from '../../services/user.service';
import {UploadService} from '../../services/upload.service';

@Component({
  selector: 'user_edit',
  templateUrl: './user_edit.component.html',
  providers: [UserService,UploadService]
})

export class UserEditComponent implements OnInit {

  public title: string;
  public identity: string;
  public token: string;
  public user;
  public status: string;
  public url:string

  constructor(
    private _userService: UserService,
    private _uploadService:UploadService
  ){
    this.title = 'Actualizar mis datos';
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
    this.user = this.identity;
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    console.log('User_Edit componenet cargado!');
  }

  onSubmit(){

    this._userService.updateUser(this.user).subscribe(
      response => {
        if(!response.user){
          this.status = 'error';
        } else {
          localStorage.setItem('identity',JSON.stringify(this.user));
          this.status = 'success';
          //subida de la imagen
          this._uploadService.makeFileRequest(this.url+'/upload-image-user/'+this.user._id,[],this.filesUpload,this.token, 'image')
            .then((result:any)=>{
              this.user.image = result.user.image;
              console.log(result);
              localStorage.setItem('identity',JSON.stringify(this.user));
            })
        }
      },
      error => {
        var errorMessage = <any>error;
        if(errorMessage != null){
          this.status = 'error';
        }
      }

    );
  }

  public filesUpload: Array<File>;
  fileChangeEvent(fileInput:any){
    this.filesUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesUpload);
  }
}
