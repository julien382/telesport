import { Component, Input, TemplateRef } from '@angular/core';
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
      <ng-template #tooltipTemplate let-model="model">
        
        <div class="allTooltip">
          <div class="custom-tooltip">
            <span>{{ model.name }}</span>
            <div class="row">
              <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path fill="#ffffff" d="M4.1 38.2C1.4 34.2 0 29.4 0 24.6C0 11 11 0 24.6 0H133.9c11.2 0 21.7 5.9 27.4 15.5l68.5 114.1c-48.2 6.1-91.3 28.6-123.4 61.9L4.1 38.2zm503.7 0L405.6 191.5c-32.1-33.3-75.2-55.8-123.4-61.9L350.7 15.5C356.5 5.9 366.9 0 378.1 0H487.4C501 0 512 11 512 24.6c0 4.8-1.4 9.6-4.1 13.6zM80 336a176 176 0 1 1 352 0A176 176 0 1 1 80 336zm184.4-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1L168 298.9c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z"/></svg>
              <span>{{ model.value }}</span>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" classname="triangle-icon" height="16" width="10" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#00838f" d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
        </div>

      </ng-template>
    </ngx-charts-pie-chart>
  `,
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent {
  @Input() data: PieChartData[] = [];
  tooltipTemplate: TemplateRef<any> | null = null;

  constructor(private router: Router) {}

  onSelect(event: any): void {
    if (event.name) {
      // Naviguer vers la page de détail avec le nom du pays comme paramètre
      this.router.navigate(['/detail', event.name]);
    }
  }
}
