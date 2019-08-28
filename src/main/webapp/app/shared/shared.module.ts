import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Casb2BSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [Casb2BSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [Casb2BSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Casb2BSharedModule {
  static forRoot() {
    return {
      ngModule: Casb2BSharedModule
    };
  }
}
