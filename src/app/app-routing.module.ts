import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresentationComponent } from './components/presentation/presentation.component';
import { ComplexityComponent } from 'src/app/components/slides/complexity/complexity.component';
import { DemoComponent } from 'src/app/components/slides/demo/demo.component';
import { IntroComponent } from 'src/app/components/slides/intro/intro.component';
import { ReferencesComponent } from 'src/app/components/slides/references/references.component';
import { AlgorithmComponent } from 'src/app/components/slides/algorithm/algorithm.component';
import { FamilyComponent } from 'src/app/components/slides/family/family.component';
import { MinhashComponent } from 'src/app/components/slides/minhash/minhash.component';
import { BucketsComponent } from 'src/app/components/slides/buckets/buckets.component';

const appRoutes: Routes = [
  {
    path: 'slides',
    component: PresentationComponent,
    children: [
      { path: 'intro', component: IntroComponent },
      { path: 'family', component: FamilyComponent },
      { path: 'algorithm', component: AlgorithmComponent },
      { path: 'minhash', component: MinhashComponent },
      { path: 'buckets', component: BucketsComponent },
      { path: 'complexity', component: ComplexityComponent },
      { path: 'demo', component: DemoComponent },
      { path: 'references', component: ReferencesComponent },
      { path: '', redirectTo: 'intro', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '/slides' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
