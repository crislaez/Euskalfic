import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@euskalfic/core/services/core-config.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Flow, FlowResponse } from '../models';


@Injectable({
  providedIn: 'root'
})
export class FlowService {

  baseURL: string = this._coreConfig.baseEndpoint;
  type: string = 'meters';


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getFlows(page: number): Observable<{flows: Flow[], totalCount: number}> {
    return this.http.get<FlowResponse>(`${this.baseURL}${this.type}?_page=${page}`).pipe(
      map((response) => {
        const { features = null, totalItems:totalCount = 0 } = response || {};
        return { flows: features || [], totalCount }
      }),
      catchError((error) => {
        return throwError(() => error)
      })
    );
  }

  getFlowsByIdSource(page: number, sourceId: string): Observable<{flows: Flow[], totalCount: number}> {
    return this.http.get<FlowResponse>(`${this.baseURL}${this.type}/bySource/${sourceId}?_page=${page}`).pipe(
      map((response) => {
        const { features = null, totalItems:totalCount = 0 } = response || {};
        return { flows: features || [], totalCount }
      }),
      catchError((error) => {
        return throwError(() => error)
      })
    );
  }

  getFlowById(meterId: number): Observable<Flow> {
    return this.http.get<Flow>(`${this.baseURL}${this.type}/${meterId}`).pipe(
      map((flow) => flow || {}),
      catchError((error) => {
        return throwError(() => error)
      })
    );
  }


}
