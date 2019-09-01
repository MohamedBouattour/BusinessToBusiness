import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { Casb2BSharedModule } from 'app/shared';
import {
  SectorComponent,
  SectorDetailComponent,
  SectorUpdateComponent,
  SectorDeletePopupComponent,
  SectorDeleteDialogComponent,
  sectorRoute,
  sectorPopupRoute
} from './';

const ENTITY_STATES = [...sectorRoute, ...sectorPopupRoute];

@NgModule({
  imports: [Casb2BSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [SectorComponent, SectorDetailComponent, SectorUpdateComponent, SectorDeleteDialogComponent, SectorDeletePopupComponent],
  entryComponents: [SectorComponent, SectorUpdateComponent, SectorDeleteDialogComponent, SectorDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Casb2BSectorModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
