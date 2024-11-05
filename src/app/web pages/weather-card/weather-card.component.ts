import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { UiService } from '../../services/ui.service';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.css',
})
export class WeatherCardComponent {
  weather = inject(WeatherService);
  router = inject(Router);
  ui = inject(UiService);
  // fb = inject(FbService);

  @Input() set city(city: string) {
    this.cityName = city;
    this.weather
      .getWeather(city)
      .pipe(first())
      .subscribe(
        (payload) => {
          console.log('payload-', payload);
          this.state = payload.weather[0].main;
          this.temp = Math.ceil(payload.main.temp);
          this.maxTemp = Math.round(payload.main.temp_max);
          this.minTemp = Math.round(payload.main.temp_mim);
        },
        (err) => {
          this.errorMessage = err.error.message;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      );
    // this.weather
    //   .getForecast(city)
    //   .pipe(first())
    //   .subscribe(
    //     (payload) => {
    //       this.maxTemp = Math.round(payload[0].main.temp);
    //       this.minTemp = Math.round(payload[0].main.temp);
    //       for (const res of payload) {
    //         if (
    //           new Date().toLocaleDateString('en-GB') ===
    //           new Date(res.dt_txt).toLocaleDateString('en-GB')
    //         ) {
    //           this.maxTemp =
    //             res.main.temp > this.maxTemp
    //               ? Math.round(res.main.temp)
    //               : this.maxTemp;
    //           this.minTemp =
    //             res.main.temp < this.minTemp
    //               ? Math.round(res.main.temp)
    //               : this.minTemp;
    //         }
    //       }
    //     },
    //     (err) => {
    //       this.errorMessage = err.error.message;
    //       setTimeout(() => {
    //         this.errorMessage = '';
    //       }, 3000);
    //     }
    //   );
  }

  @Input() addMode?: boolean;
  @Output() cityStored = new EventEmitter();

  citesWeather?: object;
  state?: string | null;
  temp?: number | null;
  maxTemp?: number | null;
  minTemp?: number | null;
  errorMessage?: string;
  cityName?: string | null;
  cityAdded = false;
  darkMode$ = this.ui.darkModeState.pipe(takeUntilDestroyed());

  openDetails() {
    if (!this.addMode) {
      this.router.navigateByUrl('/details/' + this.cityName);
    }
  }

  addCity() {
    if (!this.cityName) return;

    this.weather.addCity(this.cityName, {
      maxTemp: null,
      minTemp: null,
      state: null,
      temp: null,
      cityAdded: true,
    });
    this.cityStored.emit();
    setTimeout(() => (this.cityAdded = false), 2000);
  }
}
