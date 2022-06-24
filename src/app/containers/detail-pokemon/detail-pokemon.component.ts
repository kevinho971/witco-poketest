import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {PokemonService} from "../../services/pokemon.service";
import {ChartDataSets, ChartType, RadialChartOptions} from "chart.js";
import {Label} from "ng2-charts";

@Component({
  selector: 'detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['./detail-pokemon.component.scss']
})
export class DetailPokemonComponent implements OnInit {
  // Radar
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
    scale: {
      ticks: {
        stepSize: 10,
        suggestedMin: 40,
        suggestedMax: 100
      }
    }
  };
  public radarChartLabels: Label[] = [];

  public radarChartData: ChartDataSets[] = [
    { data: [], label: 'Statistiques' }
  ];
  public radarChartType: ChartType = 'radar';

  pokemon: any = null;
  stats: any[] = [];

  subscriptions: Subscription[] = [];
  loadData: boolean = true;

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
      }, error => {
        console.log('Error Occurred:', error)
      }, () => {
        this.pokemon.stats.map((stat: any) => {
          this.stats = [...this.stats, stat];
        })
        this.setValueToChart()
      });
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription ? subscription.unsubscribe() : 0);
  }

  setValueToChart() {
    let baseStat: any[] = []
   this.stats.map(stat => {
      this.radarChartLabels = [...this.radarChartLabels, stat.stat.name];
      baseStat = [...baseStat, stat.base_stat];
    })
    this.radarChartData[0].data = baseStat;
    this.loadData = false;
  }

  getType(pokemon: any): string {
    return this.pokemonService.getType(pokemon);
  }

  getId(url: string): number {
    const splitUrl = url.split('/')
    return +splitUrl[splitUrl.length - 2];
  }
}
