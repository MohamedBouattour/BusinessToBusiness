/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Casb2BTestModule } from '../../../test.module';
import { AppointmentComponent } from 'app/entities/appointment/appointment.component';
import { AppointmentService } from 'app/entities/appointment/appointment.service';
import { Appointment } from 'app/shared/model/appointment.model';

describe('Component Tests', () => {
  describe('Appointment Management Component', () => {
    let comp: AppointmentComponent;
    let fixture: ComponentFixture<AppointmentComponent>;
    let service: AppointmentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Casb2BTestModule],
        declarations: [AppointmentComponent],
        providers: []
      })
        .overrideTemplate(AppointmentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AppointmentComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AppointmentService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Appointment(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.appointments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
