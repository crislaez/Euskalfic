import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@euskalfic/core/services/core-config.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Source } from '../models';


@Injectable({
  providedIn: 'root'
})
export class SourceService {

  baseURL: string = this._coreConfig.baseEndpoint;
  type: string = 'sources';


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getSources(): Observable<{sources: Source[]}> {
    return this.http.get<Source[]>(`${this.baseURL}${this.type}`).pipe(
      map((sources) => {
        return { sources: sources || [] }
      }),
      catchError((error) => {
        return throwError(() => error)
      })
    );
  }


}
