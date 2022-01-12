import { RouterModule, Routes } from '@angular/router';

import { AppLayoutComponent } from './layouts/app-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { RedirectGuard } from './guards/redirect-guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // canActivate: [RedirectGuard],
    redirectTo : '',
  },
  {
    path: 'app',
    component: AppLayoutComponent,
    // canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/page.module').then((m) => m.PageModule),
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
