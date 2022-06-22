import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListPokemonComponent} from "./containers/list-pokemon/list-pokemon.component";
import {DetailPokemonComponent} from "./containers/detail-pokemon/detail-pokemon.component";

const routes: Routes = [
  {path: '', component: ListPokemonComponent},
  { path: 'detail/:name', component: DetailPokemonComponent },
  {path: '**', component: ListPokemonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
