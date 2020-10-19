import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HTTPInterceptorService } from './services/http.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StorageServiceModule } from 'ngx-webstorage-service';
const IMPORT_MODULES: any[] = [
  BrowserModule,
  CommonModule,
  NgbModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  FontAwesomeModule,
  StorageServiceModule,
];

const INTERCEPTORS = [
  { provide: HTTP_INTERCEPTORS, useClass: HTTPInterceptorService, multi: true },
];

@NgModule({
  declarations: [],
  exports: [...IMPORT_MODULES],
  providers: [...INTERCEPTORS],
  imports: [...IMPORT_MODULES],
})

// Guards against creating multiple instances of assets intended to be singletons.
// Make sure that this module is just imported in AppModule once.
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
