import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@euskalfic/core/services/core-config.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Camera, CameraResponse } from '../models';


@Injectable({
  providedIn: 'root'
})
export class CameraService {

  baseURL: string = this._coreConfig.baseEndpoint;
  type: string = 'cameras';


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getCameras(page: number): Observable<{cameras: Camera[], totalCount: number}> {
    return this.http.get<CameraResponse>(`${this.baseURL}${this.type}?_page=${page}`).pipe(
      map((response) => {
        const { cameras = null, totalItems:totalCount = 0 } = response || {};
        return { cameras: cameras || [], totalCount }
      }),
      catchError((error) => {
        return throwError(() => error)
      })
    );
  }

  getCamerasByIdSource(page: number, sourceId: string): Observable<{cameras: Camera[], totalCount: number}> {
    return this.http.get<CameraResponse>(`${this.baseURL}${this.type}/bySource/${sourceId}?_page=${page}`).pipe(
      map((response) => {
        const { cameras = null, totalItems:totalCount = 0 } = response || {};
        return { cameras: cameras || [], totalCount }
      }),
      catchError((error) => {
        return throwError(() => error)
      })
    );
  }

  getCameraById(cameraId: number, sourceId: number): Observable<Camera> {
    return this.http.get<Camera>(`${this.baseURL}${this.type}/${cameraId}/${sourceId}`).pipe(
      map((camera) => camera || {}),
      catchError((error) => {
        return throwError(() => error)
      })
    );
  }


}
