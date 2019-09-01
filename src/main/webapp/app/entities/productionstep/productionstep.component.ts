import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProductionstep } from 'app/shared/model/productionstep.model';
import { AccountService } from 'app/core';
import { ProductionstepService } from './productionstep.service';

@Component({
  selector: 'jhi-productionstep',
  templateUrl: './productionstep.component.html'
})
export class ProductionstepComponent implements OnInit, OnDestroy {
  productionsteps: IProductionstep[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected productionstepService: ProductionstepService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.productionstepService
      .query()
      .pipe(
        filter((res: HttpResponse<IProductionstep[]>) => res.ok),
        map((res: HttpResponse<IProductionstep[]>) => res.body)
      )
      .subscribe(
        (res: IProductionstep[]) => {
          this.productionsteps = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInProductionsteps();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IProductionstep) {
    return item.id;
  }

  registerChangeInProductionsteps() {
    this.eventSubscriber = this.eventManager.subscribe('productionstepListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
