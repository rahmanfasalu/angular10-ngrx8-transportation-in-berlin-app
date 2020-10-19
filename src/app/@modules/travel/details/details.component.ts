import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Departure } from 'app/interfaces';
import { getTime } from 'app/utils/app.util';
import { Subscription, Observable } from 'rxjs';
import { selectDepartureDetails } from '../state';
import { StopsActions } from '../state/actions';
import { State } from '../state/app.state';

import {
  faBus,
  faShip,
  faSubway,
  faTram,
  faShippingFast,
  faClock,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit {
  // icons
  faBus = faBus;
  faShip = faShip;
  faSubway = faSubway;
  faTram = faTram;
  faShippingFast = faShippingFast;
  faClock = faClock;
  idParam: string;

  // stop subscription
  departureSubscription$: Subscription;
  private routeSub: Subscription;
  departureDetails: Departure[] = [];
  stopName: string;

  constructor(
    private store: Store<State>,
    private activatedRoute: ActivatedRoute,
    private _cd: ChangeDetectorRef
  ) {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.store.dispatch(
        StopsActions.loadStopDetails({
          id: params.id,
        })
      );
    });
  }

  // get time from data
  getTime = getTime;

  ngOnInit(): void {
    this.departureSubscription$ = this.store
      .select(selectDepartureDetails)
      .subscribe((data) => {
        this.departureDetails = data;
        if (this.departureDetails && this.departureDetails.length) {
          this.stopName = data[0].stop?.name;
        }
        this._cd.detectChanges();
      });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.departureSubscription$.unsubscribe();
  }
}
