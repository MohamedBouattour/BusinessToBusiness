import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { Casb2BSharedModule } from 'app/shared';
import {
  ProductionstepComponent,
  ProductionstepDetailComponent,
  ProductionstepUpdateComponent,
  ProductionstepDeletePopupComponent,
  ProductionstepDeleteDialogComponent,
  productionstepRoute,
  productionstepPopupRoute
} from './';

const ENTITY_STATES = [...productionstepRoute, ...productionstepPopupRoute];

@NgModule({
  imports: [Casb2BSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProductionstepComponent,
    ProductionstepDetailComponent,
    ProductionstepUpdateComponent,
    ProductionstepDeleteDialogComponent,
    ProductionstepDeletePopupComponent
  ],
  entryComponents: [
    ProductionstepComponent,
    ProductionstepUpdateComponent,
    ProductionstepDeleteDialogComponent,
    ProductionstepDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Casb2BProductionstepModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
