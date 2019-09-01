import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Sector } from 'app/shared/model/sector.model';
import { SectorService } from './sector.service';
import { SectorComponent } from './sector.component';
import { SectorDetailComponent } from './sector-detail.component';
import { SectorUpdateComponent } from './sector-update.component';
import { SectorDeletePopupComponent } from './sector-delete-dialog.component';
import { ISector } from 'app/shared/model/sector.model';

@Injectable({ providedIn: 'root' })
export class SectorResolve implements Resolve<ISector> {
  constructor(private service: SectorService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISector> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Sector>) => response.ok),
        map((sector: HttpResponse<Sector>) => sector.body)
      );
    }
    return of(new Sector());
  }
}

export const sectorRoute: Routes = [
  {
    path: '',
    component: SectorComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'casb2BApp.sector.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SectorDetailComponent,
    resolve: {
      sector: SectorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'casb2BApp.sector.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SectorUpdateComponent,
    resolve: {
      sector: SectorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'casb2BApp.sector.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SectorUpdateComponent,
    resolve: {
      sector: SectorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'casb2BApp.sector.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const sectorPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SectorDeletePopupComponent,
    resolve: {
      sector: SectorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'casb2BApp.sector.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
