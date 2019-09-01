import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBusiness } from 'app/shared/model/business.model';
import { ISector } from 'app/shared/model/sector.model';

type EntityResponseType = HttpResponse<IBusiness>;
type EntityArrayResponseType = HttpResponse<IBusiness[]>;

@Injectable({ providedIn: 'root' })
export class BusinessService {
  public resourceUrl = SERVER_API_URL + 'api/businesses';

  constructor(protected http: HttpClient) {}

  create(business: IBusiness): Observable<EntityResponseType> {
    return this.http.post<IBusiness>(this.resourceUrl, business, { observe: 'response' });
  }

  update(business: IBusiness): Observable<EntityResponseType> {
    return this.http.put<IBusiness>(this.resourceUrl, business, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBusiness>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBusiness[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  findBySector(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<IBusiness[]>(`${this.resourceUrl}/getbysector/` + id, { observe: 'response' });
  }
}
