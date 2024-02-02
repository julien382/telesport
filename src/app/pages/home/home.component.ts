import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import Olympic from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';


interface ChartValue {
  name: string;
  value: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<Olympic[]> = of([]);
  public chartValues$: Observable<ChartValue[]> = of([]);
  public totalGames: number = 0;
  private olympicsSubscription: Subscription | undefined;
  
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    // Charger les données olympiques au moment de l'initialisation
    this.olympics$ = this.olympicService.getOlympics();

    // Calculer le nombre total de Jeux olympiques (années uniques)
    this.olympicsSubscription = this.olympics$.subscribe(data => {
      const uniqueYears = [...new Set(data.flatMap(item => item.participations.map(p => p.year)))];
      this.totalGames = uniqueYears.length;
    });

    this.chartValues$ = this.olympics$.pipe(
      map((countries) => {
        const result: ChartValue[] = [];
        countries.forEach((country) => {
          // Calculer le total des médailles pour le pays actuel
          const totalMedals = country.participations.reduce((value, participation) => {
            return value + participation.medalsCount;
          }, 0);
          // Ajouter le résultat au tableau
          result.push({
            name: country.country,
            value: totalMedals,
          });
        });
        // Retourner le tableau de résultats
        return result;
      })
    );
  }
  ngOnDestroy(): void {
    // Se désabonner de l'observable lors de la destruction du composant
    console.log("execution de la methode ngOnDestroy");

    if (this.olympicsSubscription) {
      this.olympicsSubscription.unsubscribe();
    }
  }
}