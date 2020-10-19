import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './@modules/about-us/about-us.component';
import { ShellComponent } from './@modules/home/shell.component';
import { PageNotFoundComponent } from './shared/components/PageNotFound/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'travel',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./@modules/travel/travel.module').then((m) => m.TravelModule),
      },
      { path: 'about-us', component: AboutUsComponent },
      { path: '', redirectTo: 'travel', pathMatch: 'full' },
    ],
  },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
