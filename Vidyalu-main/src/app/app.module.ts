import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CountdownModule } from 'ngx-countdown';

import { DataTablesModule } from 'angular-datatables';

import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxPageScrollModule } from 'ngx-page-scroll';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
])
import { 
  OwlDateTimeModule, 
  OwlNativeDateTimeModule 
} from 'ng-pick-datetime';

import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { OtpComponent } from './pages/otp/otp.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { BannerComponent } from './pages/banner/banner.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';
import { CounselorListComponent } from './pages/counselor-list/counselor-list.component';
import { ApplicationStep1Component } from './pages/teacher/application-step1/application-step1.component';
import { ApplicationStep2Component } from './pages/teacher/application-step2/application-step2.component';
import { ApplicationStep3Component } from './pages/teacher/application-step3/application-step3.component';
import { AppStep1Component } from './pages/counselor/app-step1/app-step1.component';
import { AppStep2Component } from './pages/counselor/app-step2/app-step2.component';
import { AppStep3Component } from './pages/counselor/app-step3/app-step3.component';
import { CreateCourseComponent } from './pages/create-course/create-course.component';
import { CreateSessionComponent } from './pages/create-session/create-session.component';
import { OnlineTestComponent } from './pages/online-test/online-test.component';
import { StudentProfileComponent } from './pages/student-profile/student-profile.component';
import { TeacherProfileComponent } from './pages/teacher-profile/teacher-profile.component';
import { CounselorProfileComponent } from './pages/counselor-profile/counselor-profile.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { PaymentHistoryComponent } from './pages/payment-history/payment-history.component';
import { AddBankAccountComponent } from './pages/add-bank-account/add-bank-account.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { FinalResultComponent } from './pages/final-result/final-result.component';
import { InactiveCoursesComponent } from './pages/inactive-courses/inactive-courses.component';
import { StudentRecordsComponent } from './pages/student-records/student-records.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { HelpComponent } from './pages/help/help.component';
import { TermsOfUseComponent } from './pages/terms-of-use/terms-of-use.component';
import { AccessibilityPolicyComponent } from './pages/accessibility-policy/accessibility-policy.component';
import { TrademarkPolicyComponent } from './pages/trademark-policy/trademark-policy.component';

import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminSignupComponent } from './admin/admin-signup/admin-signup.component';
import { AdminForgotPasswordComponent } from './admin/admin-forgot-password/admin-forgot-password.component';
import { AdminOtpComponent } from './admin/admin-otp/admin-otp.component';
import { AdminResetPasswordComponent } from './admin/admin-reset-password/admin-reset-password.component';
import { StudentListComponent } from './admin/student-list/student-list.component';
import { AdminHeaderComponent } from './layout/admin-header/admin-header.component';
import { AdminFooterComponent } from './layout/admin-footer/admin-footer.component';
import { AdminSidebarComponent } from './layout/admin-sidebar/admin-sidebar.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './dialog/dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TeacherListComponent } from './admin/teacher-list/teacher-list.component';
import { CounsellorListComponent } from './admin/counsellor-list/counsellor-list.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { environment } from '../environments/environment';
import { RoleComponent } from './pages/role/role.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CompetencyAreaComponent } from './admin/competency-area/competency-area.component';
import { SearchResultComponent } from './pages/search-result/search-result.component';
import { SchoolDetailsComponent } from './admin/school-details/school-details.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { UpdateProfileCounselorComponent } from './pages/update-profile-counselor/update-profile-counselor.component';
import { TeacherCreateCourseComponent } from './pages/teacher-create-course/teacher-create-course.component';
import { CreateCounselingSessionComponent } from './pages/create-counseling-session/create-counseling-session.component';
import { TeacherCourseListComponent } from './pages/teacher-course-list/teacher-course-list.component';
import { CounsellorSessionComponent } from './pages/counsellor-session/counsellor-session.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ChatTeacherComponent } from './pages/chat-teacher/chat-teacher.component';
import { ChatCounsellorComponent } from './pages/chat-counsellor/chat-counsellor.component';
import { TeacherDashboardComponent } from './pages/teacher-dashboard/teacher-dashboard.component';
import { TeacherBookingHistoryComponent } from './pages/teacher-booking-history/teacher-booking-history.component';
import { TeacherStudentMngComponent } from './pages/teacher-student-mng/teacher-student-mng.component';
import { TeacherBankDetailsComponent } from './pages/teacher-bank-details/teacher-bank-details.component';
import { TeacherVconferenceComponent } from './pages/teacher-vconference/teacher-vconference.component';
import { TeacherHelpComponent } from './pages/teacher-help/teacher-help.component';
import { CounsellorDashboardComponent } from './pages/counsellor-dashboard/counsellor-dashboard.component';
import { CounsellorBookingHistoryComponent } from './pages/counsellor-booking-history/counsellor-booking-history.component';
import { CounsellorStudentMngComponent } from './pages/counsellor-student-mng/counsellor-student-mng.component';
import { CounsellorBankDetailsComponent } from './pages/counsellor-bank-details/counsellor-bank-details.component';
import { CounsellorVconferenceComponent } from './pages/counsellor-vconference/counsellor-vconference.component';
import { CounsellorHelpComponent } from './pages/counsellor-help/counsellor-help.component';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { StudentPurchaseCourseComponent } from './pages/student-purchase-course/student-purchase-course.component';
import { StudentCourseListComponent } from './pages/student-course-list/student-course-list.component';
import { StudentSessionListComponent } from './pages/student-session-list/student-session-list.component';
import { StudentBookingHistoryComponent } from './pages/student-booking-history/student-booking-history.component';
import { StudentVconferenceComponent } from './pages/student-vconference/student-vconference.component';
import { StudentHelpComponent } from './pages/student-help/student-help.component';
import { CourseDetailsAdminComponent } from './pages/course-details-admin/course-details-admin.component';
import { TeacherEditCourseComponent } from './pages/teacher-edit-course/teacher-edit-course.component';
import { AngularWebStorageModule } from 'angular-web-storage';
import { CounsellorEditSessionComponent } from './pages/counsellor-edit-session/counsellor-edit-session.component';
import { AdminCourseListComponent } from './admin/admin-course-list/admin-course-list.component';
import { AdminSessionListComponent } from './admin/admin-session-list/admin-session-list.component';
import { StudentStep1Component } from './pages/student/student-step1/student-step1.component';
import { StudentEditProfileComponent } from './pages/student-edit-profile/student-edit-profile.component';
import { StudentSessionDetailsComponent } from './pages/student-session-details/student-session-details.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { TeacherBasedCourseListComponent } from './pages/teacher-based-course-list/teacher-based-course-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    OtpComponent,
    ResetPasswordComponent,
    BannerComponent,
    CourseListComponent,
    CourseDetailsComponent,
    CounselorListComponent,
    ApplicationStep1Component,
    ApplicationStep2Component,
    ApplicationStep3Component,
    AppStep1Component,
    AppStep2Component,
    AppStep3Component,
    CreateCourseComponent,
    OnlineTestComponent,
    StudentProfileComponent,
    TeacherProfileComponent,
    CounselorProfileComponent,
    PaymentComponent,
    PaymentHistoryComponent,
    AddBankAccountComponent,
    NotificationsComponent,
    CreateSessionComponent,
    FinalResultComponent,
    InactiveCoursesComponent,
    StudentRecordsComponent,
    ContactUsComponent,
    AboutUsComponent,
    PrivacyPolicyComponent,
    HelpComponent,
    TermsOfUseComponent,
    AccessibilityPolicyComponent,
    TrademarkPolicyComponent,
    DashboardComponent,
    AdminLoginComponent,
    AdminSignupComponent,
    AdminForgotPasswordComponent,
    AdminOtpComponent,
    AdminResetPasswordComponent,
    StudentListComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    AdminSidebarComponent,
    AdminProfileComponent,
    ConfirmDialogComponent,
    DialogComponent,
    TeacherListComponent,
    CounsellorListComponent,
    EmailVerificationComponent,
    RoleComponent,
    CompetencyAreaComponent,
    SearchResultComponent,
    SchoolDetailsComponent,
    UpdateProfileComponent,
    UpdateProfileCounselorComponent,
    TeacherCreateCourseComponent,
    CreateCounselingSessionComponent,
    TeacherCourseListComponent,
    CounsellorSessionComponent,
    ChatComponent,
    ChatTeacherComponent,
    ChatCounsellorComponent,
    TeacherDashboardComponent,
    StudentDashboardComponent,
    CounsellorDashboardComponent,
    TeacherBookingHistoryComponent,
    TeacherStudentMngComponent,
    TeacherBankDetailsComponent,
    TeacherVconferenceComponent,
    TeacherHelpComponent,
    CounsellorBookingHistoryComponent,
    CounsellorStudentMngComponent,
    CounsellorBankDetailsComponent,
    CounsellorVconferenceComponent,
    CounsellorHelpComponent,
    StudentPurchaseCourseComponent,
    StudentCourseListComponent,
    StudentSessionListComponent,
    StudentBookingHistoryComponent,
    StudentVconferenceComponent,
    StudentHelpComponent,
    TeacherEditCourseComponent,
    CounsellorEditSessionComponent,
    AdminCourseListComponent,
    AdminSessionListComponent,
    CourseDetailsAdminComponent,
    StudentStep1Component,
    StudentEditProfileComponent,
    StudentSessionDetailsComponent,
    TeacherBasedCourseListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    CountdownModule,
    FullCalendarModule,
    DataTablesModule,
    NgxPageScrollCoreModule,
    NgxPageScrollModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    SocialLoginModule,
    NgMultiSelectDropDownModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AngularWebStorageModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.google_client_id
              // '926115193796-i4tkhic0tr0nj0be13fsui1ca962qsg0.apps.googleusercontent.com',
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('3043181405911417')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
