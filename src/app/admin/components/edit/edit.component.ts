import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { GLOBAL} from '../../../services/global';
import { Animal} from '../../../models/animal';
import { AnimalService} from '../../../services/animal.service';
import { UserService} from '../../../services/user.service';
import { UploadService} from '../../../services/upload.service';
import { fadeLateral} from '../../animation';

@Component({
  selector: 'admin-edit',
  templateUrl: '../add/add.component.html',
  providers: [UserService,AnimalService,UploadService],
  animations: [fadeLateral]
})
export class EditComponent implements OnInit{
  public title:string;
  public animal:Animal;
  public identity;
  public token;
  public url: string;
  public status;
  public is_edit:boolean;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService:UserService,
    private _animaService: AnimalService,
    private _uploadService: UploadService
  ){
    this.title = 'Editar';
    this.url = GLOBAL.url;
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
    this.is_edit = true;
    this.animal = new Animal('','','',2017,'','');
  }

  ngOnInit(){
    console.log('Edit add componenet cargado!');
    this.getAnimal();
  }

  onSubmit(){
    var id = this.animal._id;
    this._animaService.editAnimal(this.token,this.animal,id).subscribe(
      response => {
        if(!response.animal){
          this.status = 'error';
        }else {
          this.status = 'success';
          this.animal = response.animal;
          //subida de la imagen
          if(!this.filesUpload){
              this._router.navigate(['/animal/',this.animal._id]);
          } else {
            this._uploadService.makeFileRequest(this.url+'/upload-image-animal/'+this.animal._id,[],this.filesUpload,this.token, 'image')
              .then((result:any)=>{
                this.animal.image = result.animal.image;
                console.log(result);
                this._router.navigate(['/animal/',this.animal._id]);
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
