import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Camera } from '@euskalfic/shared/camera';
import { Flow } from '@euskalfic/shared/flow/models/index';
import { Incidence } from '@euskalfic/shared/incidence/models/index';
import { Source } from '@euskalfic/shared/source';
import { COLORS } from '@euskalfic/shared/utils/constant';
import { errorImage, sliceDate, sliceText } from '@euskalfic/shared/utils/funcionts';

@Component({
  selector: 'app-card',
  template:`
  <ion-card
    class="ion-activatable ripple-parent set-card"
    [ngStyle]="{'background':backgroundColor}"
    (click)="onClick()"
    >

    <div class="set-item displays-around" >
      <div class="set-item-title displays-center" >
        <div class="span-text text-color-light">
          <span class="span-bold">
          {{
            (
               from === 'cameras' ? $any(item)?.cameraName
             : from === 'incidences' ? $any(item)?.incidenceType
             : from === 'flows' ? $any(item)?.type
             : from === 'source' ? $any(item)?.descripcionEs
             : ''
            )
          }}
          </span>
        </div>
      </div>

      <ng-container *ngIf="from !== 'source'">
        <div class="set-item-types">
          <ion-chip class="text-color-light">
            <ion-label>
              {{
                  from === 'cameras' ? sliceText($any(item)?.address, 15)
                : from === 'incidences' ? $any(item)?.road
                : from === 'flows' ? $any(item)?.properties?.province
                : ''
              }}
            </ion-label>
          </ion-chip>
          <ion-chip class="text-color-light">
            <ion-label>
              {{
                (
                    from === 'cameras' ? $any(item)?.road
                  : from === 'incidences' ? sliceDate($any(item)?.startDate)
                  : from === 'flows' ? $any(item)?.properties?.municipality
                  : ''
                )
              }}
            </ion-label>
          </ion-chip>
        </div>

        <div class="set-item-avatar">
          <ion-avatar *ngIf="['cameras']?.includes(from)" slot="start">
            <ion-img loading="lazy" [src]="$any(item)?.urlImage || defaultImage" [alt]="$any(item)?.urlImage" (ionError)="errorImage($event)"></ion-img>
          </ion-avatar>

          <div *ngIf="['incidences','flows']?.includes(from)" class="icon-wrapper displays-center">
            <ion-chip *ngIf="['incidences']?.includes(from)" class="text-color-light"> <ion-label>{{ $any(item)?.autonomousRegion }}</ion-label></ion-chip>
            <ion-chip *ngIf="['incidences']?.includes(from)" class="text-color-light"> <ion-label>{{ $any(item)?.province }}</ion-label></ion-chip>
            <ion-chip *ngIf="['flows']?.includes(from)" class="text-color-light heigth-min"> <ion-label>{{ $any(item)?.properties?.description }}</ion-label></ion-chip>
          </div>
        </div>
      </ng-container>
    </div>

    <!-- RIPLE EFFECT  -->
    <ion-ripple-effect></ion-ripple-effect>
  </ion-card>
  `,
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {

  sliceText = sliceText;
  sliceDate = sliceDate;
  errorImage = errorImage;
  COLORS = COLORS;
  @Input() from!: 'cameras' | 'incidences' | 'flows' | 'source';
  @Input() item!: Camera | Incidence | Flow | Source;
  @Input() backgroundColor!: string;
  defaultImage: string = 'assets/images/image_not_found.png';


  constructor(
    private router: Router,
  ) { }


  onClick(): void {
    if(this.from === 'source') return;

    const { cameraId = null, incidenceId = null, sourceId = null, properties = null } = (this.item as any) || {};
    const { meterId = null } = properties || {};

    const url:string = {
      'cameras': `map/camera/${cameraId}/${sourceId}`,
      'incidences': `map/incidence/${incidenceId}/${sourceId}`,
      'flows': `map/flow/${meterId}`,
      'source': null
    }?.[this.from] || 'map/';

    this.router.navigate([url])
  }

}
