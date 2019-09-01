import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'country',
        loadChildren: () => import('./country/country.module').then(m => m.Casb2BCountryModule)
      },
      {
        path: 'region',
        loadChildren: () => import('./region/region.module').then(m => m.Casb2BRegionModule)
      },
      {
        path: 'business',
        loadChildren: () => import('./business/business.module').then(m => m.Casb2BBusinessModule)
      },
      {
        path: 'appointment',
        loadChildren: () => import('./appointment/appointment.module').then(m => m.Casb2BAppointmentModule)
      },
      {
        path: 'productionstep',
        loadChildren: () => import('./productionstep/productionstep.module').then(m => m.Casb2BProductionstepModule)
      },
      {
        path: 'subsector',
        loadChildren: () => import('./subsector/subsector.module').then(m => m.Casb2BSubsectorModule)
      },
      {
        path: 'sector',
        loadChildren: () => import('./sector/sector.module').then(m => m.Casb2BSectorModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Casb2BEntityModule {}
