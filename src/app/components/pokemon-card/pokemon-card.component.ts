import {Component, Input, OnInit} from '@angular/core';
import {PokemonService} from "../../services/pokemon.service";

@Component({
  selector: 'pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemons: any;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
  }

  getType(pokemon: any): string {
    return this.pokemonService.getType(pokemon);
  }

}
