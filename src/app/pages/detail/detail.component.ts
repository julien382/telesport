// detail.component.ts

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';

interface ChartValue {
  name: string;
  value: number;
  numberEntries: number;
  medalsCount: number;
  athleteCount: number;
  medalsData: { name: string; series: {value: number; name: string}[] }; 
}


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  public chartValues: ChartValue[] = [];

  subscriptions: Subscription[] = [];

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  goBackToHome(): void {
    this.router.navigate(['/']); // Naviguer vers la route de la page d'accueil
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
  ngOnInit(): void {
    // Utiliser le paramètre de la route pour obtenir le nom du pays
    this.subscriptions.push(this.route.paramMap.pipe(
      // Utiliser switchMap pour gérer les opérations asynchrones
      switchMap(params => 
        // Appeler olympicService pour obtenir la liste des pays
        this.olympicService.getOlympics().pipe(
          // Vérifier si le pays existe dans la liste
          map(countries => {
            // Utiliser Array.prototype.some pour vérifier si le pays existe
            const countryExists = countries.some(country => country.country === params.get('country'));
            
            // Si le pays n'existe pas, rediriger vers la page "not-found"
            if (!countryExists) {
              this.router.navigate(['/not-found']);
              return null; // Retourner null pour éviter de poursuivre le traitement
            }

            return countries.find(country => country.country === params.get('country'));
          })
        )
      )
          ).subscribe(selectedCountryData => {
            // Affecter les valeurs du graphique en fonction des données du pays sélectionné
            this.chartValues = selectedCountryData ? [{
              name: selectedCountryData.country,
              value: selectedCountryData.participations.reduce((sum, participation) => sum + participation.medalsCount, 0),
              numberEntries: selectedCountryData.participations.length,
              medalsCount: selectedCountryData.participations.reduce((sum, participation) => sum + participation.medalsCount, 0),
              athleteCount: selectedCountryData.participations.reduce((sum, participation) => sum + participation.athleteCount, 0),
              medalsData: {
                name: selectedCountryData.country, 
                series: selectedCountryData.participations.map(participation => ({
                  value: participation.medalsCount,
                  name: participation.year.toString(),
              }))
            }}] : [];
    }));
  }
}
