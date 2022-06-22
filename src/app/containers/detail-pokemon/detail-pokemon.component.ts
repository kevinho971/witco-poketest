import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {PokemonService} from "../../services/pokemon.service";

@Component({
  selector: 'detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['./detail-pokemon.component.scss']
})
export class DetailPokemonComponent implements OnInit {
  pokemon: any = null;

  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService) { }

  set subscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      if (this.pokemonService.pokemons.length) {
        this.pokemon = this.pokemonService.pokemons.find(i => i.name === params['name']);
      }

      this.subscription = this.pokemonService.get(params['name']).subscribe(response => {
        this.pokemon = response;
        console.log(response)
      }, error => console.log('Error Occurred:', error));
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription ? subscription.unsubscribe() : 0);
  }

  getType(pokemon: any): string {
    return this.pokemonService.getType(pokemon);
  }

  getId(url: string): number {
    const splitUrl = url.split('/')
    return +splitUrl[splitUrl.length - 2];
  }
}
