import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//Componentes
import { TiendaComponent } from './components/tienda/tienda.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { KeepersComponent } from './components/keepers/keepers.component';

const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'', redirectTo: 'home', pathMatch:'full'},
  {path:'home', component: HomeComponent},
  {path:'cuidadores', component: KeepersComponent},
  {path:'contacto', component: ContactComponent},
  {path:'animales', component: AnimalsComponent},
  {path:'tienda', component: TiendaComponent},
  {path:'**', component: HomeComponent}
];


export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);