import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsurancefinderComponent } from './insurancefinder/insurancefinder.component';
import { DoctorProfileComponent } from './components/doctor-profile/doctor-profile.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { HomeComponent } from './components/home/home.component';
import { ForumComponent } from './forum/forum.component';
import { QuestionitemComponent } from './questionitem/questionitem.component';
import { InsuranceitemComponent } from './insuranceitem/insuranceitem.component';

const routes: Routes = [
  { path: 'doctor', component: DoctorProfileComponent },
  { path: 'consult', component: DoctorComponent },
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'insurance', component: InsurancefinderComponent},
  { path: 'forum', component: ForumComponent},
  {path: 'question/:id', component: QuestionitemComponent},
  {path: 'insurance/:username/:age/:email/:gender/:salary', component: InsuranceitemComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
