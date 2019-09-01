import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISector } from 'app/shared/model/sector.model';
import { AccountService } from 'app/core';
import { SectorService } from './sector.service';

@Component({
  selector: 'jhi-sector',
  templateUrl: './sector.component.html'
})
export class SectorComponent implements OnInit, OnDestroy {
  sectors: ISector[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected sectorService: SectorService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.sectorService
      .query()
      .pipe(
        filter((res: HttpResponse<ISector[]>) => res.ok),
        map((res: HttpResponse<ISector[]>) => res.body)
      )
      .subscribe(
        (res: ISector[]) => {
          this.sectors = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSectors();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISector) {
    return item.id;
  }

  registerChangeInSectors() {
    this.eventSubscriber = this.eventManager.subscribe('sectorListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
