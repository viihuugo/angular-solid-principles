import { Component, inject } from '@angular/core';
import { Toolbar } from "./components/toolbar/toolbar";
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [Toolbar, AsyncPipe, DecimalPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'solid-principles';

  private http = inject(HttpClient);
  country$ = this.http.get<any>('https://restcountries.com/v3.1/name/brazil').pipe(
    map(countries => {
      if (countries && countries.length > 0) {
        const country = countries[0];

        if (country.languages) {
          country.languageValues = Object.values(country.languages);
        }

        if (country.currencies) {
          country.formattedCurrencies = Object.keys(country.currencies).map(currencyCode => {
            const currency = country.currencies[currencyCode];
            return `${currency.name} (${currency.symbol}) (${currencyCode})`;
          });
        }
      }
      return countries;
    })
  );

  constructor() {}

  exportJson(){
    this.country$.subscribe(country => {
      const dataStr = JSON.stringify(country, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'country.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }
}
