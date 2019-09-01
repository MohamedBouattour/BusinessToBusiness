import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISubsector } from 'app/shared/model/subsector.model';

type EntityResponseType = HttpResponse<ISubsector>;
type EntityArrayResponseType = HttpResponse<ISubsector[]>;

@Injectable({ providedIn: 'root' })
export class SubsectorService {
  public resourceUrl = SERVER_API_URL + 'api/subsectors';

  constructor(protected http: HttpClient) {}

  create(subsector: ISubsector): Observable<EntityResponseType> {
    return this.http.post<ISubsector>(this.resourceUrl, subsector, { observe: 'response' });
  }

  update(subsector: ISubsector): Observable<EntityResponseType> {
    return this.http.put<ISubsector>(this.resourceUrl, subsector, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISubsector>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISubsector[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
