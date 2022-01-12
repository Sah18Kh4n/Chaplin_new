import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { AppLayoutComponent } from './../layouts/app-layout.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ChartModule } from 'angular-highcharts';
import { CommonModule } from '@angular/common';
import { CountDownComponent } from './components/count-down/count-down.component';
import { CustomSelectComponent } from './components/custom-select/custom-select.component';
import {DpDatePickerModule} from 'ng2-date-picker';
import { FooterComponent } from './../layouts/footer/footer.component';
import { GameInputAreaComponent } from './components/game-input-area/game-input-area.component';
import { HeaderComponent } from './../layouts/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { MapComponent } from './components/map/map.component';
import { MasterBarItemComponent } from './components/master-bar-item/master-bar-item.component';
import { ModalComponent } from './components/modal/modal.component';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './../layouts/not-found/not-found.component';
import { PlayerBarItemComponent } from './components/player-bar-item/player-bar-item.component';
import { PopupComponent } from './components/popup/popup.component';
import { ProgressbarComponent } from './components/progressbar/progressbar.component';
import { RatingComponent } from './components/rating/rating.component';
import { RouterModule } from '@angular/router';
import { TextDetailComponent } from './components/text-detail/text-detail.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppLayoutComponent,
    FooterComponent,
    HeaderComponent,
    NotFoundComponent,   
    CarouselComponent,
    ProgressbarComponent,
    CountDownComponent,
    MasterBarItemComponent,
    PlayerBarItemComponent,
    TextDetailComponent,
    ModalComponent,
    MapComponent,
    PopupComponent,
    LineChartComponent,
    RatingComponent,
    GameInputAreaComponent,
    CustomSelectComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DpDatePickerModule,
    ChartModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    AngularSvgIconModule.forRoot(),
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule,
    AngularSvgIconModule,
    DpDatePickerModule,
    ChartModule,
    AppLayoutComponent,
    FooterComponent,
    HeaderComponent,   
    NotFoundComponent,   
    CarouselComponent,
    ProgressbarComponent,
    CountDownComponent,
    MasterBarItemComponent,
    PlayerBarItemComponent,
    TextDetailComponent,
    ModalComponent,
    MapComponent,
    PopupComponent,
    LineChartComponent,
    RatingComponent,
    GameInputAreaComponent,
    CustomSelectComponent
  ],
})
export class SharedModule {}
