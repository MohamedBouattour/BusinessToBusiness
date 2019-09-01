import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IAppointment, Appointment } from 'app/shared/model/appointment.model';
import { AppointmentService } from './appointment.service';

@Component({
  selector: 'jhi-appointment-update',
  templateUrl: './appointment-update.component.html'
})
export class AppointmentUpdateComponent implements OnInit {
  isSaving: boolean;
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    date: [null, [Validators.required]],
    time: [null, [Validators.required]],
    location: [null, [Validators.required]],
    numTable: [null, [Validators.required]],
    etat: [null, [Validators.required]],
    host: [null, [Validators.required]],
    guest: [null, [Validators.required]]
  });

  constructor(protected appointmentService: AppointmentService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ appointment }) => {
      this.updateForm(appointment);
    });
  }

  updateForm(appointment: IAppointment) {
    this.editForm.patchValue({
      id: appointment.id,
      date: appointment.date,
      time: appointment.time,
      location: appointment.location,
      numTable: appointment.numTable,
      etat: appointment.etat,
      host: appointment.host,
      guest: appointment.guest
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const appointment = this.createFromForm();
    if (appointment.id !== undefined) {
      this.subscribeToSaveResponse(this.appointmentService.update(appointment));
    } else {
      this.subscribeToSaveResponse(this.appointmentService.create(appointment));
    }
  }

  private createFromForm(): IAppointment {
    return {
      ...new Appointment(),
      id: this.editForm.get(['id']).value,
      date: this.editForm.get(['date']).value,
      time: this.editForm.get(['time']).value,
      location: this.editForm.get(['location']).value,
      numTable: this.editForm.get(['numTable']).value,
      etat: this.editForm.get(['etat']).value,
      host: this.editForm.get(['host']).value,
      guest: this.editForm.get(['guest']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppointment>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
