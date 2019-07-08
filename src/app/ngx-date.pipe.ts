import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Pipe({name: 'ngxDate'})
export class NgxDatePipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: any, format = 'mediumDate'): Observable<string> {
    const defaultLangEvt = {
      lang: this.translateService.getDefaultLang(),
    };

    return this.translateService.onLangChange.pipe(
      startWith(defaultLangEvt),
      map((evt) => formatDate(value, format, evt.lang))
    )
  }
}
