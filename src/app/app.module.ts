import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { LshService } from './services/lsh.service';
import { ComplexityComponent } from './components/slides/complexity/complexity.component';
import { AppRoutingModule } from './app-routing.module';
import { DemoComponent } from './components/slides/demo/demo.component';
import { IntroComponent } from './components/slides/intro/intro.component';
import { ReferencesComponent } from './components/slides/references/references.component';
import { AlgorithmComponent } from './components/slides/algorithm/algorithm.component';
import { FamilyComponent } from './components/slides/family/family.component';
import { MinhashComponent } from './components/slides/minhash/minhash.component';
import { BucketsComponent } from './components/slides/buckets/buckets.component';

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  declarations: [AppComponent, PresentationComponent, ComplexityComponent, DemoComponent, IntroComponent, ReferencesComponent, AlgorithmComponent, FamilyComponent, MinhashComponent, BucketsComponent],
  bootstrap: [AppComponent],
  providers: [LshService],
})
export class AppModule {}
