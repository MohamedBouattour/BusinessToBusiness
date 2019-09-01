/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { Casb2BTestModule } from '../../../test.module';
import { ProductionstepUpdateComponent } from 'app/entities/productionstep/productionstep-update.component';
import { ProductionstepService } from 'app/entities/productionstep/productionstep.service';
import { Productionstep } from 'app/shared/model/productionstep.model';

describe('Component Tests', () => {
  describe('Productionstep Management Update Component', () => {
    let comp: ProductionstepUpdateComponent;
    let fixture: ComponentFixture<ProductionstepUpdateComponent>;
    let service: ProductionstepService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Casb2BTestModule],
        declarations: [ProductionstepUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProductionstepUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductionstepUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductionstepService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Productionstep(123);
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
        const entity = new Productionstep();
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
