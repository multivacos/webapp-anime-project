import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimesComponent } from './components/animes/animes.component';

const routes: Routes = [
  {path: '', redirectTo: 'animes', pathMatch: 'full'},
  {path: 'animes', component: AnimesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
