import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProductionstep } from 'app/shared/model/productionstep.model';

type EntityResponseType = HttpResponse<IProductionstep>;
type EntityArrayResponseType = HttpResponse<IProductionstep[]>;

@Injectable({ providedIn: 'root' })
export class ProductionstepService {
  public resourceUrl = SERVER_API_URL + 'api/productionsteps';

  constructor(protected http: HttpClient) {}

  create(productionstep: IProductionstep): Observable<EntityResponseType> {
    return this.http.post<IProductionstep>(this.resourceUrl, productionstep, { observe: 'response' });
  }

  update(productionstep: IProductionstep): Observable<EntityResponseType> {
    return this.http.put<IProductionstep>(this.resourceUrl, productionstep, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProductionstep>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProductionstep[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
