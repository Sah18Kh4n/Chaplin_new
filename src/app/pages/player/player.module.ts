import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { PlayerRoutingModule } from './player-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { SupplyChainNetworkComponent } from './supply-chain-network/supply-chain-network.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    HomeComponent,
    SupplyChainNetworkComponent,
    DashboardComponent
  ],
  imports: [
    SharedModule,
    PlayerRoutingModule
  ]
})
export class PlayerModule { }
