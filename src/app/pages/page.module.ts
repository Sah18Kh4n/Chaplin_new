import { NgModule } from '@angular/core';
import { PageRoutingModule } from './page-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
  ],
  imports: [SharedModule, PageRoutingModule],
})
export class PageModule {}
