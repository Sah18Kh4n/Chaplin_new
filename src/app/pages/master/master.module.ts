import { HomeComponent } from './home/home.component';
import { MasterRoutingModule } from './master-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { TemplatesComponent } from './templates/templates.component';
import { GamesComponent } from './games/games.component';
import { SupplyChainNetworkComponent } from './supply-chain-network/supply-chain-network.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    HomeComponent,
    TemplatesComponent,
    GamesComponent,
    SupplyChainNetworkComponent,
    DashboardComponent
  ],
  imports: [
    SharedModule,
    MasterRoutingModule
  ]
})
export class MasterModule { }
