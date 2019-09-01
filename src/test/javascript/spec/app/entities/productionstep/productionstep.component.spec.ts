/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Casb2BTestModule } from '../../../test.module';
import { ProductionstepComponent } from 'app/entities/productionstep/productionstep.component';
import { ProductionstepService } from 'app/entities/productionstep/productionstep.service';
import { Productionstep } from 'app/shared/model/productionstep.model';

describe('Component Tests', () => {
  describe('Productionstep Management Component', () => {
    let comp: ProductionstepComponent;
    let fixture: ComponentFixture<ProductionstepComponent>;
    let service: ProductionstepService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Casb2BTestModule],
        declarations: [ProductionstepComponent],
        providers: []
      })
        .overrideTemplate(ProductionstepComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductionstepComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductionstepService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Productionstep(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.productionsteps[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
