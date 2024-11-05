import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

interface City {
  added: string;
  name: string; // The name of the city
  followedCM: boolean; // Indicates if the city is followed
  maxTemp: number | null; // Maximum temperature
  minTemp: number | null; // Minimum temperature
  state: string | null; // State of the city
  temp: number | null; // Current temperature
  cityAdded: boolean; // Indicates if the city has been added
}

interface AddCityOptions {
  followedCM?: boolean;
  maxTemp?: number | null;
  minTemp?: number | null;
  state?: string | null;
  temp?: number | null;
  cityAdded?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = 'assets/jsons/cities.json'; // Path to your JSON file
  private cities: City[] = [];
  private citiesSubject = new BehaviorSubject<City[]>(this.cities);

  cities$ = this.citiesSubject.asObservable();

  // addCity(city: string) {
  //   if (!this.cities.includes(city)) {
  //     this.cities.push(city);
  //     this.citiesSubject.next(this.cities);
  //   }
  // }
  addCity(cityName: string, options?: AddCityOptions) {
    const {
      followedCM = false,
      maxTemp = null,
      minTemp = null,
      state = null,
      temp = null,
      cityAdded = false,
    } = options || {};
    // Check if the city is already in the list
    if (
      !this.cities.some(
        (city) => city.name.toLowerCase() === cityName.toLowerCase()
      )
    ) {
      const newCity: City = {
        name: cityName,
        followedCM: followedCM ?? false,
        maxTemp: maxTemp ?? null,
        minTemp: minTemp ?? null,
        state: state ?? null,
        temp: temp ?? null,
        cityAdded: cityAdded || false, // Indicates that the city has been added
        added: new Date().toISOString(), // Set to current date in ISO format
      };
      // Add the new city to the list
      this.cities.push(newCity);
      this.citiesSubject.next(this.cities); // Notify subscribers
    }
  }

  constructor(private http: HttpClient) {}

  getCities(): Observable<City[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getWeather(cityName: string): Observable<any> {
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(
        map((cities) =>
          cities.find(
            (city) => city.name.toLowerCase() === cityName.toLowerCase()
          )
        )
      );
  }
}
