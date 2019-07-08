import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  today = new Date();
  currentLocaleNg: string;
  currentLocaleNgx$: Observable<string>;

  languageChoices: string[];

  form: FormGroup;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private translateService: TranslateService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.currentLocaleNg = this.locale;

    const defaultLangEvt = {
      lang: this.translateService.getDefaultLang(),
    };

    this.currentLocaleNgx$ = this.translateService.onLangChange.pipe(
      startWith(defaultLangEvt),
      map((data) => data.lang)
    );

    this.languageChoices = this.translateService.getLangs();

    this.form = this.fb.group({
      formLang: [defaultLangEvt.lang],
    })
  }

  saveForm(form: FormGroup) {
    const formLang: string = form.value['formLang'];
    this.translateService.use(formLang);
  }
}
