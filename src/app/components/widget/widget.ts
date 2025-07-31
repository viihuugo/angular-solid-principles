import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Country } from '../../services/country';
import { FileExport } from '../../services/file-export';

@Component({
  selector: 'app-widget',
  imports: [AsyncPipe, DecimalPipe],
  templateUrl: './widget.html',
  styleUrl: './widget.scss'
})
export class Widget {

  private countryService = inject(Country);
  country$ = this.countryService.getCountry('brazil');

  private fileExportService = inject(FileExport);

  constructor() {}

  exportJson(): void {
    this.country$.subscribe(country => {
      this.fileExportService.exportJson(country, 'country.json');
    });
  }
}
