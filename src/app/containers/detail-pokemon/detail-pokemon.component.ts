import {Component, OnInit} from '@angular/core';
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
  stats: any[] = [];
  subscriptions: Subscription[] = [];
  loadData: boolean = true;
  labels: string[] = [];
  baseStat: number[] = [];

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
      }, error => {
        console.log('Error Occurred:', error)
      }, () => {
        this.pokemon.stats.map((stat: any) => {
          this.stats = [...this.stats, stat];
        })
        this.setValueToChart();
      });
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription ? subscription.unsubscribe() : 0);
  }

  setValueToChart() {
   this.stats.map(stat => {
      this.labels = [...this.labels, stat.stat.name];
      this.baseStat = [...this.baseStat, stat.base_stat];
    })
    this.loadData = false;
  }

  getType(pokemon: any): string {
    return this.pokemonService.getType(pokemon);
  }
}
