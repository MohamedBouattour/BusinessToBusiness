/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Casb2BTestModule } from '../../../test.module';
import { ProductionstepDeleteDialogComponent } from 'app/entities/productionstep/productionstep-delete-dialog.component';
import { ProductionstepService } from 'app/entities/productionstep/productionstep.service';

describe('Component Tests', () => {
  describe('Productionstep Management Delete Component', () => {
    let comp: ProductionstepDeleteDialogComponent;
    let fixture: ComponentFixture<ProductionstepDeleteDialogComponent>;
    let service: ProductionstepService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Casb2BTestModule],
        declarations: [ProductionstepDeleteDialogComponent]
      })
        .overrideTemplate(ProductionstepDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductionstepDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductionstepService);
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
