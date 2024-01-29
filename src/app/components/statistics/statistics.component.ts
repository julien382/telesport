import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-statistics',
  template: `
  <div class="containerNumberOfJos">
    <p class="textDataOutPieChart">{{ title }}</p>
    <p class="countDataOutPieChart">{{ data }}</p>
  </div>
`,  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent {
  @Input() title: string = '';
  @Input() data: number | null | undefined;
}
