import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { NgModule, LOCALE_ID, Inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'

import localeDECH from '@angular/common/locales/de-CH';
import localeFR from '@angular/common/locales/fr';
import localeZHHANS from '@angular/common/locales/zh-Hans';

import { TranslateModule, TranslateService } from '@ngx-translate/core'

import { AppComponent } from './app.component';
import { NgxDatePipe } from './ngx-date.pipe';

registerLocaleData(localeDECH, 'de-CH');
registerLocaleData(localeFR, 'fr');
registerLocaleData(localeZHHANS, 'zh-Hans');

@NgModule({
  declarations: [
    AppComponent,
    NgxDatePipe
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private translateService: TranslateService
  ) {
    translateService.setDefaultLang(locale);
    translateService.addLangs(['en-US', 'de-CH', 'fr', 'zh-Hans']);
  }
}
