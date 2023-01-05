import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraActions, fromCamera } from '@euskalfic/shared/camera';
import { Flow, FlowActions, fromFlow, FlowProperty, FlowGeometry } from '@euskalfic/shared/flow';
import { IncidenceActions, fromIncidence } from '@euskalfic/shared/incidence';
import { Incidence } from '@euskalfic/shared/incidence/models/index';
import { gotToTop, trackById } from '@euskalfic/shared/utils/funcionts';
import { concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Map, icon, marker, polyline, tileLayer } from 'leaflet';
import { Observable, Subject, map, takeUntil, tap } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-map',
  template:`
  <ion-content [fullscreen]="true" [scrollEvents]="true">

    <div class="empty-header components-background-primary">
    </div>

    <div class="container components-background-dark">
      <h1 class="text-color-dark">{{ 'COMMON.MAP' | translate }}
        {{ (
            getOption === 'incidence' ? 'COMMON.INCIDENCES'
          : getOption === 'camera' ? 'COMMON.CAMERAS'
          : getOption === 'flow' ? 'COMMON.FLOWS'
          : ''
        ) | translate }}
      </h1>
      <div class="empty-div"></div>

      <div class="map-wrapper">
        <div
          leaflet
          id="map">
        </div>
      </div>

    </div>

  </ion-content>
  `,
  styleUrls: ['./map.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapPage implements OnDestroy {

  gotToTop = gotToTop;
  trackById = trackById;

  private ngUnsubscribe$ = new Subject<void>();
  defaultIconMarker = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
  map: any;


  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) {
    this.route.params.pipe(
      takeUntil(this.ngUnsubscribe$),
      filter(({incidenceId = null, cameraId = null, meterId = null}) => (incidenceId || cameraId || meterId)), //idSource
      concatLatestFrom(() => [
        this.store.select(fromIncidence.selectSingleState),
        this.store.select(fromCamera.selectSingleState),
        this.store.select(fromFlow.selectSingleState)
      ]),
      tap(data => {
        const [ routerData = null, incidenceState = null, cameraState = null, flowState = null ] = data || [];
        const { incidenceId = null, cameraId = null, meterId = null, idSource:sourceId = null } = routerData || {};

        if(this.getOption === 'incidence' && !incidenceState?.[incidenceId]){
          this.store.dispatch(IncidenceActions.loadIncidence({incidenceId, sourceId}))
        }else if(this.getOption === 'camera' && !cameraState?.[cameraId]){
          this.store.dispatch(CameraActions.loadCamera({cameraId, sourceId}))
        }else if(this.getOption === 'flow' && !flowState?.[meterId]){
          this.store.dispatch(FlowActions.loadFlow({meterId}))
        }

      }),
      switchMap(data => {
        const [ routerData = null ] = data || [];
        const { incidenceId = null, cameraId = null, meterId = null } = routerData || {};

        return (this.getSelectors(incidenceId, cameraId, meterId) as any).pipe(
          tap(item => {
            // console.log(item)
            const { latitude = null, longitude = null } = (item as any) || {};
            if(!item) return;
            if(latitude?.toString() === '0.0' && longitude?.toString() === '0.0') return;

            setTimeout(() => {
              this.addMarker(Number(latitude || 0), Number(longitude || 0), item);

              if(this.getOption === 'flow'){
                const { geometry = null } = (item as Flow) || {};
                const { coordinates = null } = geometry || {};
                this.addLine(this.parseCoordinates(coordinates))
              }
            },1000);
          })
        )
      })
    ).subscribe();
  }


  ionViewDidEnter(): void{
    this.map = new Map('map').setView([43.2312,-2.9416], 13); // por defecto cerca de Bilbao 43.2312,-2.9416
    // tileLayer -> AGREGAR UNA CAPA
    tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map)
  }

  ngOnDestroy(): void{
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  // GET PARAMS OPTION
  get getOption(): 'incidence' | 'camera' | 'flow' {
    return this.route.snapshot.routeConfig?.path?.includes('incidence') ? 'incidence'
    : this.route.snapshot.routeConfig?.path?.includes('camera') ? 'camera'
    : this.route.snapshot.routeConfig?.path?.includes('flow') ? 'flow'
    : 'incidence';
  }

  // ADD ICON
  get setIcon(): any{
    return {
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: this.defaultIconMarker,
      shadowUrl: 'leaflet/marker-shadow.png'
    }
  }

  // ADD MARKER
  addMarker(lat:number, long:number, data:any): void{
    const popUp = {
      'camera': this.cameraPopUp(data),
      'incidence': this.incidencePopUp(data),
      'flow': this.flowPopUp(data)
    }?.[this.getOption] || 'Loading...';

    //MARACADOR y ABRIR POPUP
    const marketItem = marker(
      [lat, long],{
        icon: icon(this.setIcon)
      }
    ).addTo(this.map).bindPopup(popUp)
    //ZOOM y acercarse a ese marcador
    this.map.fitBounds([ [marketItem.getLatLng().lat, marketItem.getLatLng().lng] ]);
  }

  // ADD LINE
  addLine(coordinates: any): void{ //LatLngExpression[][]
    if(!coordinates) return;
    polyline(coordinates).addTo(this.map)
  }

  // CREATE INCIDENCE POPUP
  incidencePopUp(incidence: Incidence): string {
    const { autonomousRegion = null, cause = null, direction = null, incidenceLevel = null, incidenceType = null,
      latitude = null, longitude = null, pkEnd = null, pkStart = null, province = null, road = null, startDate = null} = incidence || {}
    return `
      <b>Region:</b> (${autonomousRegion || '-' })<br /><br />
      <b>Provincia:</b> ${province || '-'}<br />
      <b>Hora:</b> ${startDate || '-'}<br />
      <b>Nivel incidencia:</b> ${incidenceLevel || '-'}<br />
      <b>Tipo incidencia:</b> ${incidenceType || '-'} <br />
      <b>Carretera:</b> ${road || '-'}<br />
      <b>Direccion:</b> ${direction || '-'}<br />
      <b>PK inicial:</b> ${pkStart || '-'}<br />
      <b>PK final:</b> ${pkEnd || '-'}<br />
      <b>Causa:</b> ${cause || '-'}<br />
      <strong>Lat/Long:</strong> ${latitude || '-'}, ${longitude || '-'}
      <br /><br />
      <div class="text-right">
        ${this.setMapButton((latitude || '')?.toString(), (longitude || '')?.toString())}
      </div>
    `;
  }

  // CREATE INCIDENCE POPUP
  cameraPopUp(camera: Camera): string {
    const { address = null, cameraName = null, kilometer = null,latitude = null, longitude = null, road = null } = camera || {}
    return `
      <b>Ubicacion:</b> (${address || '-' })<br /><br />
      <b>Nombre camara:</b> ${cameraName || '-'}<br />
      <b>Kilometro:</b> ${kilometer || '-'}<br />
      <b>Carretera:</b> ${road || '-'}<br />
      <strong>Lat/Long:</strong> ${latitude || '-'}, ${longitude || '-'}
      <br /><br />
      <div class="text-right">
        ${this.setMapButton((latitude || '')?.toString(), (longitude || '')?.toString())}
      </div>
    `;
  }

  // CREATE INCIDENCE POPUP
  flowPopUp(flow: (FlowProperty & {geometry:FlowGeometry})): string {
    const { province = null, municipality = null, description = null,latitude = null, longitude = null, system = null } = flow || {}
    return `
      <b>Sistema:</b> (${system || '-' })<br /><br />
      <b>Provincia:</b> ${province || '-'}<br />
      <b>Direccion:</b> ${municipality || '-'}<br />
      <b>Descripción:</b> ${description || '-'}<br />
      <strong>Lat/Long:</strong> ${latitude || '-'}, ${longitude || '-'}
      <br /><br />
      <div class="text-right">
        ${this.setMapButton((latitude || '')?.toString(), (longitude || '')?.toString())}
      </div>
    `;
  }

  // GET SELECTORS
  getSelectors(incidenceId: number, cameraId: number, meterId: number): Observable<any> {
    return {
      'incidence': this.store.select(fromIncidence.selectSingleIncidence(incidenceId)),
      'camera': this.store.select(fromCamera.selectSingleCamera(cameraId)),
      'flow': this.store.select(fromFlow.selectSingleFlow(meterId)).pipe(map((flow) => ({...flow?.properties, geometry: flow?.geometry}))),
    }?.[this.getOption] || this.store.select(fromIncidence.selectSingleIncidence(incidenceId))
  }

  // PARSE COORDINATES
  parseCoordinates(coordinates: any[][] | null): number[][] {
    if(!coordinates) return [];
    const coords = coordinates?.length === 1 ? coordinates?.[0] : coordinates;

    return (coords || [])?.map(element => {
      const [long = null, lat = null] = element || []
      return [lat, long];
    });
  }

  // CREATE ANHOR STREETVIEW
  setMapButton(lat: string, lng: string): string {
    return `
      <a href="https://maps.google.com/maps?q=&layer=c&cbll=${lat},${lng}" target="_blank" title="Street view">
        <i class="pi pi-map-marker"></i>
        ver en Street View
      </a>
    `;
  }

}
