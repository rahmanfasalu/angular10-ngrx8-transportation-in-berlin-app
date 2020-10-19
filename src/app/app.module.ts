import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TravelModule } from './@modules/travel/travel.module';

import { ShellComponent } from './@modules/home/shell.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AboutUsComponent } from './@modules/about-us/about-us.component';

@NgModule({
  declarations: [AppComponent, ShellComponent, AboutUsComponent],
  imports: [
    CoreModule,
    SharedModule,
    AppRoutingModule,
    TravelModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'Berlin Travel planner',
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
