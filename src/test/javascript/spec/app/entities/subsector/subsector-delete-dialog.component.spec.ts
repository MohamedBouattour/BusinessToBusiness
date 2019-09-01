/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Casb2BTestModule } from '../../../test.module';
import { SubsectorDeleteDialogComponent } from 'app/entities/subsector/subsector-delete-dialog.component';
import { SubsectorService } from 'app/entities/subsector/subsector.service';

describe('Component Tests', () => {
  describe('Subsector Management Delete Component', () => {
    let comp: SubsectorDeleteDialogComponent;
    let fixture: ComponentFixture<SubsectorDeleteDialogComponent>;
    let service: SubsectorService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Casb2BTestModule],
        declarations: [SubsectorDeleteDialogComponent]
      })
        .overrideTemplate(SubsectorDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SubsectorDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubsectorService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
