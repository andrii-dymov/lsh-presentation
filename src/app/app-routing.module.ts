import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresentationComponent } from './components/presentation/presentation.component';
import { ComplexityComponent } from './components/slides/complexity/complexity.component';
import { DemoComponent } from './components/slides/demo/demo.component';
import { IntroComponent } from './components/slides/intro/intro.component';
import { ReferencesComponent } from './components/slides/references/references.component';
import { AlgorithmComponent } from './components/slides/algorithm/algorithm.component';
import { FamilyComponent } from './components/slides/family/family.component';
import { MinhashComponent } from './components/slides/minhash/minhash.component';
import { BucketsComponent } from './components/slides/buckets/buckets.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'slides', pathMatch: 'full' },
  {
    path: 'slides',
    component: PresentationComponent,
    children: [
      { path: '', redirectTo: 'intro', pathMatch: 'full' },
      { path: 'intro', component: IntroComponent },
      { path: 'family', component: FamilyComponent },
      { path: 'algorithm', component: AlgorithmComponent },
      { path: 'minhash', component: MinhashComponent },
      { path: 'buckets', component: BucketsComponent },
      { path: 'complexity', component: ComplexityComponent },
      { path: 'demo', component: DemoComponent },
      { path: 'references', component: ReferencesComponent },
    ],
  },
  { path: '**', redirectTo: 'slides' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
