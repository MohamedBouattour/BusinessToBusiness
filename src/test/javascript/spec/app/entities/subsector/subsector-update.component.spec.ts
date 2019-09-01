/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { Casb2BTestModule } from '../../../test.module';
import { SubsectorUpdateComponent } from 'app/entities/subsector/subsector-update.component';
import { SubsectorService } from 'app/entities/subsector/subsector.service';
import { Subsector } from 'app/shared/model/subsector.model';

describe('Component Tests', () => {
  describe('Subsector Management Update Component', () => {
    let comp: SubsectorUpdateComponent;
    let fixture: ComponentFixture<SubsectorUpdateComponent>;
    let service: SubsectorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Casb2BTestModule],
        declarations: [SubsectorUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SubsectorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SubsectorUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubsectorService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Subsector(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Subsector();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
