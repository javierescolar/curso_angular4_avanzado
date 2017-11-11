import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AdminRoutingModule} from './admin-routing.module';
//componentes
import {MainComponent} from './components/main/main.component';
import {ListComponent} from './components/list/list.component';
import {EditComponent} from './components/edit/edit.component';
import {AddComponent} from './components/add/add.component';
//guards
import {AdminGuard} from '../guards/admin.guards';
//pipes
import {SearchPipe} from './pipes/search.pipe';

//animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    EditComponent,
    AddComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    AdminRoutingModule,
    BrowserAnimationsModule
  ],
  exports: [],
  providers: [AdminGuard]
})

export class AdminModule {}
