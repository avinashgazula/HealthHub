import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BlogComponent } from './components/blog/blog.component';
import { RegisterComponent } from './components/register/register.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire'
import { AngularFireStorageModule, AngularFireStorageReference, AngularFireUploadTask } from "@angular/fire/storage";

//Angular Material imports
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DoctorComponent } from './components/doctor/doctor.component';
import { DoctorProfileComponent } from './components/doctor-profile/doctor-profile.component';
import { HomeComponent } from './components/home/home.component';
import { MedicineDeliveryComponent } from './components/medicine-delivery/medicine-delivery.component';
import { HomeCareComponent } from './components/home-care/home-care.component';
import { ScheduleCareComponent } from './components/schedule-care/schedule-care.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { BlogshomeComponent } from './components/blogshome/blogshome.component';
import { ViewDoctorAppointmentsComponent } from './components/view-doctor-appointments/view-doctor-appointments.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { InsurancefinderComponent } from './components/insurancefinder/insurancefinder.component';
import { InsuranceService } from './services/insurance/insurance.service';
import { ForumComponent } from './components/forum/forum.component';
import { QuestionitemComponent } from './components/questionitem/questionitem.component';
import { InsuranceitemComponent } from './components/insuranceitem/insuranceitem.component';
import { SuggestdoctorComponent } from './components/suggestdoctor/suggestdoctor.component';

import { RegistrationService } from './services/registration/registration.service';
import { LoginService } from './services/login/login.service';
import { DoctorDetailsComponent } from './components/doctor-details/doctor-details.component';

import { environment } from '../environments/environment'
import { NgxPaginationModule } from 'ngx-pagination';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SuggestDoctorService } from './services/suggestdoctor/suggestdoctor.service';
import { CdkScrollableModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    DoctorComponent,
    DoctorProfileComponent,
    HomeComponent,
    MedicineDeliveryComponent,
    HomeCareComponent,
    ScheduleCareComponent,
    AboutUsComponent,
    ContactUsComponent,
    InsurancefinderComponent,
    FooterComponent,
    BlogComponent,
    HomepageComponent,
    ForumComponent,
    QuestionitemComponent,
    InsuranceitemComponent,
    BlogshomeComponent,
    ViewDoctorAppointmentsComponent,
    EditProfileComponent,
    SuggestdoctorComponent,
    DoctorDetailsComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule,
    MatBadgeModule,
    NgxPaginationModule,
    CdkScrollableModule,
  ],
  providers: [InsuranceService, RegistrationService, LoginService, SuggestDoctorService],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, RegisterComponent]
})
export class AppModule { }
