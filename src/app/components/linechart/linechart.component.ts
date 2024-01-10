import { Component, Input, HostListener } from '@angular/core';

interface LineChartData {
  name: string;
  series: { value: number; name: string }[];
}

@Component({
  selector: 'app-linechart',
  template: `
    <ngx-charts-line-chart
      [results]="data"
      [view]="chartView"
      [gradient]="false"
      [xAxis]="true"
      [yAxis]="true"
    >
    </ngx-charts-line-chart>
  `,
})
export class LinechartComponent {
  @Input() data: LineChartData[] = [];
  chartView: [number, number] = [500, 300];

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.adjustChartSize();
  }

  private adjustChartSize(): void {
    // Détecter si la largeur de l'écran est inférieure à 600px
    const isMobile = window.innerWidth < 600;

    // Ajuster la taille du graphique en conséquence
    this.chartView = isMobile ? [300, 200] : [500, 300];
  }
}
