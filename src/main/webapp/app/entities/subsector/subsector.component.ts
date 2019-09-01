import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISubsector } from 'app/shared/model/subsector.model';
import { AccountService } from 'app/core';
import { SubsectorService } from './subsector.service';

@Component({
  selector: 'jhi-subsector',
  templateUrl: './subsector.component.html'
})
export class SubsectorComponent implements OnInit, OnDestroy {
  subsectors: ISubsector[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected subsectorService: SubsectorService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.subsectorService
      .query()
      .pipe(
        filter((res: HttpResponse<ISubsector[]>) => res.ok),
        map((res: HttpResponse<ISubsector[]>) => res.body)
      )
      .subscribe(
        (res: ISubsector[]) => {
          this.subsectors = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSubsectors();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISubsector) {
    return item.id;
  }

  registerChangeInSubsectors() {
    this.eventSubscriber = this.eventManager.subscribe('subsectorListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
