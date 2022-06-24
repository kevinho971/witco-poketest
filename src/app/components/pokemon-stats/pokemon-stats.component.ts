import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets, ChartType, RadialChartOptions} from "chart.js";
import {Colors, Label} from "ng2-charts";

@Component({
  selector: 'pokemon-stats',
  templateUrl: './pokemon-stats.component.html',
  styleUrls: ['./pokemon-stats.component.scss']
})
export class PokemonStatsComponent implements OnInit {
  @Input() labels: string[] = [];
  @Input() stats: number[] = [];

  public radarChartOptions: RadialChartOptions = {
    responsive: true,
    title: {
      fontColor: 'white'
    },
    legend: {
      display: false
    },
    scale: {
      pointLabels: {
        fontColor: 'white'
      },
      ticks: {
        display: false,
        stepSize: 10,
        suggestedMin: 40,
        suggestedMax: 100
      }
    },
  };
  public radarChartLabels: Label[] = [];

  public radarChartData: ChartDataSets[] = [
    { data: [], label: 'Statistiques' }
  ];
  public radarChartType: ChartType = 'radar';
  public radarChartColor: Colors[] = [{
    pointBackgroundColor: 'white'
  }];

  constructor() { }

  ngOnInit(): void {
    this.radarChartLabels = this.labels;
    this.radarChartData[0].data = this.stats;
  }

}
