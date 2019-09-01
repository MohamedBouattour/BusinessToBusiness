import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Subsector } from 'app/shared/model/subsector.model';
import { SubsectorService } from './subsector.service';
import { SubsectorComponent } from './subsector.component';
import { SubsectorDetailComponent } from './subsector-detail.component';
import { SubsectorUpdateComponent } from './subsector-update.component';
import { SubsectorDeletePopupComponent } from './subsector-delete-dialog.component';
import { ISubsector } from 'app/shared/model/subsector.model';

@Injectable({ providedIn: 'root' })
export class SubsectorResolve implements Resolve<ISubsector> {
  constructor(private service: SubsectorService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISubsector> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Subsector>) => response.ok),
        map((subsector: HttpResponse<Subsector>) => subsector.body)
      );
    }
    return of(new Subsector());
  }
}

export const subsectorRoute: Routes = [
  {
    path: '',
    component: SubsectorComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'casb2BApp.subsector.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SubsectorDetailComponent,
    resolve: {
      subsector: SubsectorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'casb2BApp.subsector.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SubsectorUpdateComponent,
    resolve: {
      subsector: SubsectorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'casb2BApp.subsector.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SubsectorUpdateComponent,
    resolve: {
      subsector: SubsectorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'casb2BApp.subsector.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const subsectorPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SubsectorDeletePopupComponent,
    resolve: {
      subsector: SubsectorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'casb2BApp.subsector.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
