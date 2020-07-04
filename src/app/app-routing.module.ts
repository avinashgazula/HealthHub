import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { MedicineDeliveryComponent } from './components/medicine-delivery/medicine-delivery.component';
import { HomeCareComponent } from './components/home-care/home-care.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { BlogshomeComponent } from './components/blogshome/blogshome.component';
import { BlogComponent } from './components/blog/blog.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ViewDoctorAppointmentsComponent } from './components/view-doctor-appointments/view-doctor-appointments.component';
import { InsurancefinderComponent } from './components/insurancefinder/insurancefinder.component';
import { DoctorProfileComponent } from './components/doctor-profile/doctor-profile.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { HomeComponent } from './components/home/home.component';
import { ForumComponent } from './components/forum/forum.component';
import { QuestionitemComponent } from './components/questionitem/questionitem.component';
import { InsuranceitemComponent } from './components/insuranceitem/insuranceitem.component';
import { SuggestdoctorComponent } from './components/suggestdoctor/suggestdoctor.component';

const routes: Routes = [
  { path: 'doctor', component: DoctorProfileComponent },
  { path: 'consult', component: DoctorComponent },
  { path: 'single-blog', component: BlogComponent },
  { path: 'orderMedicine', component: MedicineDeliveryComponent },
  { path: 'homeCare', component: HomeCareComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: '', pathMatch: 'full', component: HomepageComponent },
  { path: 'insurance', component: InsurancefinderComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'question/:id', component: QuestionitemComponent },
  { path: 'insurance/:username/:age/:email/:gender/:salary', component: InsuranceitemComponent },
  { path: 'doctor', component: DoctorProfileComponent },
  { path: 'consult', component: DoctorComponent },
  { path: 'blogs', component: BlogshomeComponent },
  { path: 'view-doctor-appointments', component: ViewDoctorAppointmentsComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'suggest', component: SuggestdoctorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
