import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Productionstep } from 'app/shared/model/productionstep.model';
import { ProductionstepService } from './productionstep.service';
import { ProductionstepComponent } from './productionstep.component';
import { ProductionstepDetailComponent } from './productionstep-detail.component';
import { ProductionstepUpdateComponent } from './productionstep-update.component';
import { ProductionstepDeletePopupComponent } from './productionstep-delete-dialog.component';
import { IProductionstep } from 'app/shared/model/productionstep.model';

@Injectable({ providedIn: 'root' })
export class ProductionstepResolve implements Resolve<IProductionstep> {
  constructor(private service: ProductionstepService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductionstep> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Productionstep>) => response.ok),
        map((productionstep: HttpResponse<Productionstep>) => productionstep.body)
      );
    }
    return of(new Productionstep());
  }
}

export const productionstepRoute: Routes = [
  {
    path: '',
    component: ProductionstepComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'casb2BApp.productionstep.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProductionstepDetailComponent,
    resolve: {
      productionstep: ProductionstepResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'casb2BApp.productionstep.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProductionstepUpdateComponent,
    resolve: {
      productionstep: ProductionstepResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'casb2BApp.productionstep.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProductionstepUpdateComponent,
    resolve: {
      productionstep: ProductionstepResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'casb2BApp.productionstep.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const productionstepPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ProductionstepDeletePopupComponent,
    resolve: {
      productionstep: ProductionstepResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'casb2BApp.productionstep.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
