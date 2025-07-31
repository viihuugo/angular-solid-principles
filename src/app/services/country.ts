import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Country {
  name: { common: string };
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol: string }>;
  languageValues?: string[];
  formattedCurrencies?: string[];
  capital?: string;
  area?: number;
  population?: number;
  subregion?: string;
  flags?: { png: string; svg: string };
}

@Injectable({
  providedIn: 'root'
})
export class Country {
  private http = inject(HttpClient);

  getCountry(name: string): Observable<Country[]> {
    return this.http.get<Country[]>(`https://restcountries.com/v3.1/name/${name}`).pipe(
      map(countries => countries.map(country => this.transformCountry(country)))
    );
  }

  private transformCountry(country: Country): Country {
    if (country.languages) {
      country.languageValues = Object.values(country.languages);
    }

    if (country.currencies) {
      country.formattedCurrencies = Object.entries(country.currencies)
        .map(([code, currency]) => `${currency.name} (${currency.symbol}) (${code})`);
    }

    return country;
  }
}
