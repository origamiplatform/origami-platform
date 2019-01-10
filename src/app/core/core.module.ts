import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { LayoutEffects } from './effects/layout.effects';

import { SharedModule } from '@shared/shared.module';
import { ComponentsModule } from './components/components.module';

import { MainComponent } from './containers/main/main.component';

export const CONTAINERS = [
  MainComponent
];

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    EffectsModule.forFeature([LayoutEffects]),
  ],
  declarations: CONTAINERS,
  exports: CONTAINERS,
})
export class CoreModule { }
