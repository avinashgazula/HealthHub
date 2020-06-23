import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorProfileComponent } from './components/doctor-profile/doctor-profile.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { HomeComponent } from './components/home/home.component';
import { MedicineDeliveryComponent } from './components/medicine-delivery/medicine-delivery.component';
import { HomeCareComponent } from './components/home-care/home-care.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';


const routes: Routes = [
  { path: 'doctor', component: DoctorProfileComponent },
  { path: 'consult', component: DoctorComponent },
  { path: 'orderMedicine', component: MedicineDeliveryComponent},
  { path: 'homeCare', component: HomeCareComponent},
  { path: 'aboutUs', component: AboutUsComponent},
  { path: 'contactUs', component: ContactUsComponent},
  { path: '', pathMatch: 'full', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
