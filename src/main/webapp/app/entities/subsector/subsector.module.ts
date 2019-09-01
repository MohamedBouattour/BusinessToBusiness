import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { Casb2BSharedModule } from 'app/shared';
import {
  SubsectorComponent,
  SubsectorDetailComponent,
  SubsectorUpdateComponent,
  SubsectorDeletePopupComponent,
  SubsectorDeleteDialogComponent,
  subsectorRoute,
  subsectorPopupRoute
} from './';

const ENTITY_STATES = [...subsectorRoute, ...subsectorPopupRoute];

@NgModule({
  imports: [Casb2BSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SubsectorComponent,
    SubsectorDetailComponent,
    SubsectorUpdateComponent,
    SubsectorDeleteDialogComponent,
    SubsectorDeletePopupComponent
  ],
  entryComponents: [SubsectorComponent, SubsectorUpdateComponent, SubsectorDeleteDialogComponent, SubsectorDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Casb2BSubsectorModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
