import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlannerComponent } from './planner/planner.component';
import { DetailsComponent } from './details/details.component';
import { TravelRoutingModule } from './travel-routing.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TravelEffects } from './state/effects/stops.effect';

import { reducers } from './state';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LocalStorageService } from './services/storage.service';
@NgModule({
  declarations: [PlannerComponent, DetailsComponent],
  imports: [
    FormsModule,
    CommonModule,
    FontAwesomeModule,
    TravelRoutingModule,
    StoreModule.forFeature('planner', reducers),
    EffectsModule.forFeature([TravelEffects]),
  ],
  providers: [LocalStorageService],
})
export class TravelModule {}
