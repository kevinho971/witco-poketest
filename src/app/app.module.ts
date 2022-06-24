import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListPokemonComponent } from './containers/list-pokemon/list-pokemon.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import {HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatChipsModule} from "@angular/material/chips";
import {FlexLayoutModule} from "@angular/flex-layout";
import { DetailPokemonComponent } from './containers/detail-pokemon/detail-pokemon.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ChartsModule} from "ng2-charts";

@NgModule({
  declarations: [
    AppComponent,
    ListPokemonComponent,
    PokemonCardComponent,
    DetailPokemonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
