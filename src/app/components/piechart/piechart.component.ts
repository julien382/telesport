import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

interface PieChartData {
  name: string; 
  value: number;
}

@Component({
  selector: 'app-piechart',
  template: `
    <ngx-charts-pie-chart
      [results]="data"
      [view]="[300, 300]" 
      [gradient]="false"
      (select)="onSelect($event)"
      [legend]="false"
    >
    </ngx-charts-pie-chart>
  `,
})
export class PiechartComponent {
  @Input() data: PieChartData[] = [];

  constructor(private router: Router) {}

  onSelect(event: { name: string }): void {
    if (event.name) {
      // Naviguer vers la page de détail avec le nom du pays comme paramètre
      this.router.navigate(['/detail', event.name]);
    }
  }
}