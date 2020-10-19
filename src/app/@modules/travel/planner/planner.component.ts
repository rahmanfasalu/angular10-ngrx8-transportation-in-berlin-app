import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

import { Store } from '@ngrx/store';
import { Journey, Stop } from 'app/interfaces';
import { Observable, Subscription } from 'rxjs';

import { selectAllJournies, selectAllStops, State } from '../state';
import { JourneyActions, LocationActions } from '../state/actions';
import { getTime } from '../../../utils/app.util';
import * as _ from 'underscore';
import {
  faBus,
  faShip,
  faSubway,
  faTram,
  faShippingFast,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/storage.service';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlannerComponent implements OnInit {
  // subscription
  stopSubscription: Subscription;
  journeySubscription: Subscription;

  // icons
  faBus = faBus;
  faShip = faShip;
  faSubway = faSubway;
  faTram = faTram;
  faShippingFast = faShippingFast;
  faClock = faClock;

  // get time from data
  getTime = getTime;

  // stop suggrstion
  stops: Stop[] = [];
  journeys: Journey[];

  // current search type
  searchType: string = '';

  // selected stops
  selectedToStop: Stop;
  selectedFromStop: Stop;

  // form fields
  search = {
    toStop: '',
    fromStop: '',
  };

  // fav lists
  saveToFavourite = true;
  showFavList = false;
  favouriteLists = [];

  constructor(
    private store: Store<State>,
    private route: Router,
    private _cd: ChangeDetectorRef,
    private localStorageService: LocalStorageService
  ) {
    this.favouriteLists = this.localStorageService.getFavList();
    this.onSearchChange = _.debounce(this.onSearchChange, 500);
  }

  // subscribe on init
  ngOnInit(): void {
    this.stopSubscription = this.store
      .select(selectAllStops)
      .subscribe((data) => {
        this.stops = data;
        this._cd.detectChanges();
      });

    this.journeySubscription = this.store
      .select(selectAllJournies)
      .subscribe((data) => {
        this.journeys = data;
        this._cd.detectChanges();
      });
  }

  // search routs
  searchRouts(): void {
    // reset search results
    this.store.dispatch(LocationActions.searchStopsReset());
    if (this.formValid()) {
      // save to local storage
      if (this.saveToFavourite) {
        this.localStorageService.storeOnLocalStorage(
          this.selectedFromStop,
          this.selectedToStop
        );
      }

      this.store.dispatch(
        JourneyActions.searchJourney({
          from: this.selectedFromStop,
          to: this.selectedToStop,
        })
      );
    }
  }

  // select stops
  selectStop(event: any, stop: Stop): void {
    event.preventDefault();
    if (this.searchType == 'fromStop') {
      this.selectedFromStop = stop;
      this.search.fromStop = stop.name;
    } else {
      this.selectedToStop = stop;
      this.search.toStop = stop.name;
    }
  }

  onSearchChange(query: string, type: string): void {
    if (query) {
      this.showFavList = false;
      this.searchType = type;
      this.store.dispatch(LocationActions.searchStops({ query: query }));
    } else {
      this.onFocusEvent();
    }
  }

  gotoDetails(evt: any, id: number) {
    evt.stopPropagation();
    this.route.navigate(['travel/details', id]);
  }

  onFocusEvent() {
    if (!this.search.fromStop && !this.search.toStop) {
      this.showFavList = true;
    }
  }

  chooseThisRoute({ from, to }: { from: Stop; to: Stop }) {
    this.selectedFromStop = from;
    this.selectedToStop = to;

    this.search.fromStop = from.name;
    this.search.toStop = to.name;
  }

  formValid(): boolean {
    return !!this.selectedFromStop && !!this.selectedToStop;
  }
  ngOnDestroy() {
    this.stopSubscription.unsubscribe();
    this.journeySubscription.unsubscribe();
  }
}
