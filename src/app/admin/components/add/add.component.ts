import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { GLOBAL} from '../../../services/global';
import { Animal} from '../../../models/animal';
import { AnimalService} from '../../../services/animal.service';
import { UserService} from '../../../services/user.service';
import { UploadService} from '../../../services/upload.service';

@Component({
  selector: 'admin-add',
  templateUrl: './add.component.html',
  providers: [UserService,AnimalService,UploadService]
})
export class AddComponent implements OnInit{
  public title:string;
  public animal:Animal;
  public identity;
  public token;
  public url: string;
  public status;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService:UserService,
    private _animaService: AnimalService,
    private _uploadService: UploadService
  ){
    this.title = 'Dar de Alta';
    this.url = GLOBAL.url;
    this.animal = new Animal('','','',2017,'','');
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();

  }

  ngOnInit(){
    console.log('animal add componenet cargado!');
  }

  onSubmit(){
    this._animaService.addAnimal(this.token,this.animal).subscribe(
      response => {
        if(!response.animal){
          this.status = 'error';
        }else {
          this.status = 'success';
          this.animal = response.animal;
          //subida de la imagen
          if(!this.filesUpload){
              this._router.navigate(['admin-panel/listado']);
          } else {
            this._uploadService.makeFileRequest(this.url+'/upload-image-animal/'+this.animal._id,[],this.filesUpload,this.token, 'image')
              .then((result:any)=>{
                this.animal.image = result.animal.image;
                console.log(result);
                this._router.navigate(['admin-panel/listado']);
              })
          }

        }
      },
      error => {
        var errorMessage = <any>error;
        if(errorMessage != null){
          this.status = 'error';
        }
        console.log(<any>error);
      }
    );
  }

  public filesUpload: Array<File>;
  fileChangeEvent(fileInput:any){
    this.filesUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesUpload);
  }


}
