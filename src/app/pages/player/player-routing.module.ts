import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RoleGuard } from './../../guards/role.guard';
import { environment } from './../../../environments/environment';
import { SupplyChainNetworkComponent } from './supply-chain-network/supply-chain-network.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    // component: AppLayoutComponent,
    // canActivateChild: [AuthGuard],

    // canActivate: [RoleGuard],
    // data: {
    //   expectedRole: environment.roles.user,
    // },

    component: HomeComponent,
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'supply-chain-network', component: SupplyChainNetworkComponent },

  {
    path: '**',
    redirectTo: '/app/player',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerRoutingModule {}
