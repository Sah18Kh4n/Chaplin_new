import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { NotFoundComponent } from './../layouts/not-found/not-found.component';
import { RoleGuard } from './../guards/role.guard';
import { environment } from './../../environments/environment';

const routes: Routes = [
  {
    path: 'master',
    // canActivate: [RoleGuard],
    // data: {
    //   expectedRole: environment.roles.moderator,
    // },
    loadChildren: () =>
      import('./master/master.module').then((m) => m.MasterModule),
  },
  {
    path: 'player',
    // canActivate: [RoleGuard],
    // data: {
    //   expectedRole: environment.roles.user,
    // },
    loadChildren: () =>
      import('./player/player.module').then((m) => m.PlayerModule),
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
