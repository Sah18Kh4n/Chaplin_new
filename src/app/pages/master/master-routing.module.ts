import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { GamesComponent } from './games/games.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RoleGuard } from './../../guards/role.guard';
import { SupplyChainNetworkComponent } from './supply-chain-network/supply-chain-network.component';
import { TemplatesComponent } from './templates/templates.component';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  {
    path: '',
    // component: AppLayoutComponent,
    // canActivateChild: [AuthGuard],

    // canActivate: [RoleGuard],
    // data: {
    //   expectedRole: environment.roles.moderator,
    // },

    component: HomeComponent,
  },
  { path: 'templates', component: TemplatesComponent },
  { path: 'games', component: GamesComponent },
  { path: 'supply-chain-network', component: SupplyChainNetworkComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: '**',
    redirectTo: '/app/master',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterRoutingModule {}
