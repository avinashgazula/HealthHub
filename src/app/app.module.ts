import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Angular Material imports
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogshomeComponent } from './components/blogshome/blogshome.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DoctorDetailsComponent } from './components/doctor-details/doctor-details.component';
import { DoctorProfileComponent } from './components/doctor-profile/doctor-profile.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { FooterComponent } from './components/footer/footer.component';
import { ForumComponent } from './components/forum/forum.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeCareComponent } from './components/home-care/home-care.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { InsurancefinderComponent } from './components/insurancefinder/insurancefinder.component';
import { InsuranceitemComponent } from './components/insuranceitem/insuranceitem.component';
import { LoginComponent } from './components/login/login.component';
import { MedicalHistoryComponent } from './components/medical-history/medical-history.component';
import { MedicineDeliveryComponent } from './components/medicine-delivery/medicine-delivery.component';
import { MyOrdersComponent } from './components/medicine-delivery/my-orders/my-orders.component';
import { QuestionitemComponent } from './components/questionitem/questionitem.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ScheduleCareComponent } from './components/schedule-care/schedule-care.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SuggestdoctorComponent } from './components/suggestdoctor/suggestdoctor.component';
import { ViewDoctorAppointmentsComponent } from './components/view-doctor-appointments/view-doctor-appointments.component';
import { AuthGuard } from './guard/auth.guard';
import { InsuranceService } from './services/insurance/insurance.service';
import { LoginService } from './services/login/login.service';
import { NotificationService } from './services/notifications/notification.service';
import { RegistrationService } from './services/registration/registration.service';
import { SuggestDoctorService } from './services/suggestdoctor/suggestdoctor.service';



@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        LoginComponent,
        RegisterComponent,
        DoctorComponent,
        DoctorProfileComponent,
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
        ResetPasswordComponent,
        SearchResultComponent,
        MyOrdersComponent,
        FeedbackComponent,
        MedicalHistoryComponent,
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
    providers: [AuthGuard, InsuranceService, RegistrationService, LoginService, SuggestDoctorService, NotificationService],
    bootstrap: [AppComponent],
    entryComponents: [LoginComponent, RegisterComponent]
})
export class AppModule { }
