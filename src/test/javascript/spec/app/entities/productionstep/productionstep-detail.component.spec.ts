/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Casb2BTestModule } from '../../../test.module';
import { ProductionstepDetailComponent } from 'app/entities/productionstep/productionstep-detail.component';
import { Productionstep } from 'app/shared/model/productionstep.model';

describe('Component Tests', () => {
  describe('Productionstep Management Detail Component', () => {
    let comp: ProductionstepDetailComponent;
    let fixture: ComponentFixture<ProductionstepDetailComponent>;
    const route = ({ data: of({ productionstep: new Productionstep(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Casb2BTestModule],
        declarations: [ProductionstepDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProductionstepDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductionstepDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.productionstep).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
