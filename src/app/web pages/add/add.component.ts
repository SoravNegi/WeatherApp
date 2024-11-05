import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription, first } from 'rxjs';
import { WeatherService } from '../../services/weather.service';

interface Country {
  capital: string;
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent implements OnInit, OnDestroy {
  http = inject(HttpClient);
  weather = inject(WeatherService);
  // fb = inject(FbService);

  temp?: number;
  city = 'Rome';
  state?: string;
  capitals: string[] = [];
  selectedCity = '';
  cardCity?: string;
  showNote = false;
  followedCM = false;
  sub1!: Subscription;

  //----
  cityInput: string = '';
  suggestions: any[] = [];
  allCities: any[] = [];

  ngOnInit() {
    // getting the city placeID
    this.weather.getWeather(this.city).subscribe((payload) => {
      this.state = payload.weather[0].main;
      this.temp = Math.ceil(Number(payload.main.temp));
    });

    // this.http
    //   .get<Country[]>('https://restcountries.com/v2/all')
    //   .pipe(first())
    //   .subscribe((countries) => {
    //     countries.forEach((country) => {
    //       if (country.capital && country.capital.length) {
    //         this.capitals.push(country.capital);
    //       }
    //     });
    //     this.capitals.sort();
    //   });

    this.sub1 = this.weather.getCities().subscribe((cities) => {
      Object.values(cities).forEach((city) => {
        if (city.name === 'Rome') {
          this.followedCM = true;
        }
      });
    });
  }

  // selectCity(city: string | { leading: number }) {
  //   if (typeof city === 'string' && this.capitals.includes(city)) {
  //     this.cardCity = city;
  //     this.showNote = false;
  //   } else if (typeof city === 'object' && city.leading > 0) {
  //     this.showNote = true;
  //   }
  // }
  selectCity(city?: string) {
    if (this.selectedCity && typeof city === 'string') {
      this.weather.addCity(this.selectedCity);
      this.selectedCity = ''; // Clear the input after adding
      this.suggestions = []; // Clear suggestions
      this.showNote = false;
      this.cardCity = city;
    } else {
      this.showNote = true;
    }
  }

  addCityOfTheMonth() {
    this.weather.addCity('Rome', { followedCM: this.followedCM });
  }
  //     .subscribe(() => {
  //     this.followedCM = true;
  //   });
  // }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

  onInputChange() {
    this.suggestions = this.allCities.filter((city) =>
      city.name.toLowerCase().includes(this.selectedCity.toLowerCase())
    );
  }

  // addCity() {
  //   if (this.selectedCity) {
  //     this.weather.addCity(this.selectedCity);
  //     this.selectedCity = ''; // Clear the input after adding
  //     this.suggestions = []; // Clear suggestions
  //   }
  // }
}
