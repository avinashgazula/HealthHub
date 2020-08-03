import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogshomeComponent } from './components/blogshome/blogshome.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DoctorDetailsComponent } from './components/doctor-details/doctor-details.component';
import { DoctorProfileComponent } from './components/doctor-profile/doctor-profile.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ForumComponent } from './components/forum/forum.component';
import { HomeCareComponent } from './components/home-care/home-care.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { InsurancefinderComponent } from './components/insurancefinder/insurancefinder.component';
import { InsuranceitemComponent } from './components/insuranceitem/insuranceitem.component';
import { MedicalHistoryComponent } from './components/medical-history/medical-history.component';
import { MedicineDeliveryComponent } from './components/medicine-delivery/medicine-delivery.component';
import { MyOrdersComponent } from './components/medicine-delivery/my-orders/my-orders.component';
import { QuestionitemComponent } from './components/questionitem/questionitem.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SuggestdoctorComponent } from './components/suggestdoctor/suggestdoctor.component';
import { WriteblogComponent } from './components/writeblog/Writeblog.component';
import { ViewDoctorAppointmentsComponent } from './components/view-doctor-appointments/view-doctor-appointments.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [

  { path: 'consult', component: DoctorComponent },
  { path: 'writeblog', component: WriteblogComponent },
  { path: 'doctor', component: DoctorProfileComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'single-blog', component: BlogComponent },
  { path: 'orderMedicine', component: MedicineDeliveryComponent, canActivate: [AuthGuard] },
  { path: 'my-orders', component: MyOrdersComponent },
  { path: 'homeCare', component: HomeCareComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: '', pathMatch: 'full', component: HomepageComponent },
  { path: 'insurance', component: InsurancefinderComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'question/:id/:category', component: QuestionitemComponent },
  { path: 'insurance/:username/:age/:email/:gender/:salary', component: InsuranceitemComponent },
  { path: 'consult', component: DoctorComponent },
  { path: 'blogs', component: BlogshomeComponent },
  { path: 'view-doctor-appointments', component: ViewDoctorAppointmentsComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'suggest', component: SuggestdoctorComponent, canActivate: [AuthGuard] },
  { path: 'details', component: DoctorDetailsComponent },
  { path: 'searchresult', component: SearchResultComponent },
  { path: 'medical-history', component: MedicalHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
