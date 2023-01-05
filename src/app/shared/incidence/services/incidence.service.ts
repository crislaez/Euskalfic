import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@euskalfic/core/services/core-config.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Incidence, IncidenceResponse } from '../models';


@Injectable({
  providedIn: 'root'
})
export class IncidenceService {

  baseURL: string = this._coreConfig.baseEndpoint;
  type: string = 'incidences';


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getIncidences(page: number): Observable<{incidences: Incidence[], totalCount: number}> {
    return this.http.get<IncidenceResponse>(`${this.baseURL}${this.type}?_page=${page}`).pipe(
      map((response): any => {
        const { incidences = null, totalItems:totalCount = 0 } = response || {};
        return { incidences: incidences || [], totalCount }
      }),
      catchError((error) => {
        return throwError(() => error)
      })
    );
  }

  getIncidencesByIdSource(page: number, sourceId: string): Observable<{incidences: Incidence[], totalCount: number}> {
    return this.http.get<IncidenceResponse>(`${this.baseURL}${this.type}/bySource/${sourceId}?_page=${page}`).pipe(
      map((response): any => {
        const { incidences = null, totalItems:totalCount = 0 } = response || {};
        return { incidences: incidences || [], totalCount }
      }),
      catchError((error) => {
        return throwError(() => error)
      })
    );
  }

  getIncidenceById(incidenceId: number, sourceId: number): Observable<Incidence> {
    return this.http.get<Incidence>(`${this.baseURL}${this.type}/${incidenceId}/${sourceId}`).pipe(
      map((incidence) => incidence || {}),
      catchError((error) => {
        return throwError(() => error)
      })
    );
  }


}
