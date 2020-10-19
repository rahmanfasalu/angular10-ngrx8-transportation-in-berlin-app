import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SHARED_COMPONENTS } from './components';

@NgModule({
  declarations: [...SHARED_COMPONENTS],
  imports: [RouterModule],
  exports: [...SHARED_COMPONENTS],
})
export class SharedModule {}
