/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { BusinessService } from 'app/entities/business/business.service';
import { IBusiness, Business } from 'app/shared/model/business.model';

describe('Service Tests', () => {
  describe('Business Service', () => {
    let injector: TestBed;
    let service: BusinessService;
    let httpMock: HttpTestingController;
    let elemDefault: IBusiness;
    let expectedResult;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(BusinessService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Business(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        false
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Business', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new Business(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Business', async () => {
        const returnedFromService = Object.assign(
          {
            raisonSociale: 'BBBBBB',
            nom: 'BBBBBB',
            prenom: 'BBBBBB',
            matriculeFiscale: 'BBBBBB',
            adresse: 'BBBBBB',
            email: 'BBBBBB',
            siteweb: 'BBBBBB',
            cp: 1,
            telecom: 1,
            ooredoo: 1,
            orange: 1,
            fixe: 1,
            fixe2: 1,
            fax: 1,
            motivation: 1,
            isLocal: true
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Business', async () => {
        const returnedFromService = Object.assign(
          {
            raisonSociale: 'BBBBBB',
            nom: 'BBBBBB',
            prenom: 'BBBBBB',
            matriculeFiscale: 'BBBBBB',
            adresse: 'BBBBBB',
            email: 'BBBBBB',
            siteweb: 'BBBBBB',
            cp: 1,
            telecom: 1,
            ooredoo: 1,
            orange: 1,
            fixe: 1,
            fixe2: 1,
            fax: 1,
            motivation: 1,
            isLocal: true
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Business', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
