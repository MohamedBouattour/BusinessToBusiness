import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Casb2BSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

import { JhMaterialModule } from 'app/shared/jh-material.module';
@NgModule({
  imports: [JhMaterialModule, Casb2BSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [JhMaterialModule, Casb2BSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Casb2BSharedModule {
  static forRoot() {
    return {
      ngModule: Casb2BSharedModule
    };
  }
}
