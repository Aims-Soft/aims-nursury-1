import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './pipe-filter/pipe-search';

@NgModule({
  imports: [CommonModule],
  declarations:[SearchPipe],
  exports:[SearchPipe],
})
export class SharedInterfaceModule {}
