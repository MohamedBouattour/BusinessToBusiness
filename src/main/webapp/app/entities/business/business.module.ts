import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { Casb2BSharedModule } from 'app/shared';
import {
  BusinessComponent,
  BusinessDetailComponent,
  BusinessUpdateComponent,
  BusinessDeletePopupComponent,
  BusinessDeleteDialogComponent,
  businessRoute,
  businessPopupRoute
} from './';

const ENTITY_STATES = [...businessRoute, ...businessPopupRoute];

@NgModule({
  imports: [Casb2BSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    BusinessComponent,
    BusinessDetailComponent,
    BusinessUpdateComponent,
    BusinessDeleteDialogComponent,
    BusinessDeletePopupComponent
  ],
  entryComponents: [BusinessComponent, BusinessUpdateComponent, BusinessDeleteDialogComponent, BusinessDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Casb2BBusinessModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
