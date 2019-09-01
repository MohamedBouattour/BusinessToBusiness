import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAppointment } from 'app/shared/model/appointment.model';
import { AccountService } from 'app/core';
import { AppointmentService } from './appointment.service';

@Component({
  selector: 'jhi-appointment',
  templateUrl: './appointment.component.html'
})
export class AppointmentComponent implements OnInit, OnDestroy {
  appointments: IAppointment[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected appointmentService: AppointmentService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.appointmentService
      .query()
      .pipe(
        filter((res: HttpResponse<IAppointment[]>) => res.ok),
        map((res: HttpResponse<IAppointment[]>) => res.body)
      )
      .subscribe(
        (res: IAppointment[]) => {
          this.appointments = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAppointments();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAppointment) {
    return item.id;
  }

  registerChangeInAppointments() {
    this.eventSubscriber = this.eventManager.subscribe('appointmentListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
