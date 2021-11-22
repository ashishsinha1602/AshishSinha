import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { OtpComponent } from './pages/otp/otp.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';
// import { CounselorListComponent } from './pages/counselor-list/counselor-list.component';
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

import { Layouts } from './app.component';

import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
// import { AdminSignupComponent } from './admin/admin-signup/admin-signup.component';
// import { AdminForgotPasswordComponent } from './admin/admin-forgot-password/admin-forgot-password.component';
import { AdminOtpComponent } from './admin/admin-otp/admin-otp.component';
// import { AdminResetPasswordComponent } from './admin/admin-reset-password/admin-reset-password.component';
import { StudentListComponent } from './admin/student-list/student-list.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { TeacherGuard } from './pages/teacher/guard/teacher.guard';
import { AdminGuardGuard } from './admin/admin-guard/admin-guard.guard';
import { StudentGuard } from './pages/student/guard/student.guard';
import { CounsellorGuard } from './pages/counsellor/guard/counsellor.guard';
import { TeacherListComponent } from './admin/teacher-list/teacher-list.component';
import { CounsellorListComponent } from './admin/counsellor-list/counsellor-list.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { RoleComponent } from './pages/role/role.component';
import { CompetencyAreaComponent } from './admin/competency-area/competency-area.component';
import { SearchResultComponent } from './pages/search-result/search-result.component';
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
import { CounsellorEditSessionComponent } from './pages/counsellor-edit-session/counsellor-edit-session.component';
import { AdminCourseListComponent } from './admin/admin-course-list/admin-course-list.component';
import { AdminSessionListComponent } from './admin/admin-session-list/admin-session-list.component';
import { StudentStep1Component } from './pages/student/student-step1/student-step1.component';
import { StudentEditProfileComponent } from './pages/student-edit-profile/student-edit-profile.component';
import { StudentSessionDetailsComponent } from './pages/student-session-details/student-session-details.component';
import { TeacherBasedCourseListComponent } from './pages/teacher-based-course-list/teacher-based-course-list.component';


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/home" },

  {
    path: "login",
    component: LoginComponent,
    data: { layout: Layouts.header },
  },
  {
    path: "signup",
    component: SignupComponent,
    data: { layout: Layouts.header },
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
    data: { layout: Layouts.header },
  },
  {
    path: "otp-verification",
    component: OtpComponent,
    data: { layout: Layouts.header },
  },
  // { path: "reset-password/:uid/:token", 
  {
    path: "reset-password",
    component: ResetPasswordComponent,
    data: { layout: Layouts.header },
  },
  {
    path: "home",
    component: HomeComponent,
    data: { layout: Layouts.header },
  },
  {
    path: "course-list",
    component: CourseListComponent,
    data: { layout: Layouts.header },
  },
  {
    path: "course-details",
    component: CourseDetailsComponent,
    data: { layout: Layouts.header },
  },
  // {
  //   path: "counsellor-list",
  //   component: CounselorListComponent,
  //   data: { layout: Layouts.adminheader },
  //   canActivate: [CounsellorGuard],
  // },
  {
    path: "teacher/application-step1",
    component: ApplicationStep1Component,
    data: { layout: Layouts.header },
    canActivate: [TeacherGuard],
  },
  {
    path: "teacher/application-step2",
    component: ApplicationStep2Component,
    data: { layout: Layouts.header },
  },
  {
    path: "teacher/application-step3",
    component: ApplicationStep3Component,
    data: { layout: Layouts.header },
  },
  {
    path: "counsellor/application-step1",
    component: AppStep1Component,
    data: { layout: Layouts.header },
  },
  {
    path: "counsellor/application-step2",
    component: AppStep2Component,
    data: { layout: Layouts.header },
  },
  {
    path: "counsellor/application-step3",
    component: AppStep3Component,
    data: { layout: Layouts.header },
  }, 
  {
    path: "counsellor/create-counselling-session",
    component: CreateCounselingSessionComponent,
    data: { layout: Layouts.adminheader }, 
  },
  {
    path: "create-course",
    component: CreateCourseComponent,
    data: { layout: Layouts.header },
  },
  {
    path: "create-session",
    component: CreateSessionComponent,
    data: { layout: Layouts.header },
  },
  {
    path: "online-test",
    component: OnlineTestComponent,
    data: { layout: Layouts.header },
  },
  {
    path: "student/student-profile",
    component: StudentProfileComponent,
    data: { layout: Layouts.adminheader },
    canActivate: [StudentGuard],
  },
  {
    path: "teacher/teacher-profile",
    component: TeacherProfileComponent,
    data: { layout: Layouts.adminheader },
    canActivate: [TeacherGuard],
  },
  {
    path: "counsellor/counsellor-profile",
    component: CounselorProfileComponent,
    data: { layout: Layouts.adminheader },
    canActivate: [CounsellorGuard],
  },
  {
    path: "payment",
    component: PaymentComponent,
    data: { layout: Layouts.header },
  },
  {
    path: "payment-history",
    component: PaymentHistoryComponent,
    data: { layout: Layouts.header },
  },
  {
    path: "add-bank-account",
    component: AddBankAccountComponent,
    data: { layout: Layouts.header },
  },
  {
    path: "notifications",
    component: NotificationsComponent,
    data: { layout: Layouts.header },
  },
  {
    path: "final-result",
    component: FinalResultComponent,
    data: { layout: Layouts.header },
  },
  {
    path: "inactive-courses",
    component: InactiveCoursesComponent,
    data: { layout: Layouts.header },
  },
  {
    path: "student-records",
    component: StudentRecordsComponent,
    data: { layout: Layouts.header },
  },
  {
    path: "contact-us",
    component: ContactUsComponent,
    data: { layout: Layouts.header },
  },
  {
    path: "about-us",
    component: AboutUsComponent,
    data: { layout: Layouts.header },
  },
  {
    path: "privacy-policy",
    component: PrivacyPolicyComponent,
    data: { layout: Layouts.header },
  },
  {
    path: "help",
    component: HelpComponent,
    data: { layout: Layouts.header },
  },
  {
    path: "terms-of-use",
    component: TermsOfUseComponent,
    data: { layout: Layouts.header },
  },
  {
    path: "accessibility-policy",
    component: AccessibilityPolicyComponent,
    data: { layout: Layouts.header },
  },
  {
    path: "trademark-policy",
    component: TrademarkPolicyComponent,
    data: { layout: Layouts.header },
  },
  {
    path: "admin",
    component: AdminLoginComponent,
    // data: { layout: Layouts.adminheader },
  },
  // {
  //   path: "admin/signup",
  //   component: AdminSignupComponent,
  //   data: { layout: Layouts.adminheader },
  // },
  // { path: "admin/forgot-password", 
  //   component: AdminForgotPasswordComponent,
  //   // data: { layout: Layouts.adminheader }, 
  // },
  {
    path: "admin/otp-verification",
    component: AdminOtpComponent,
    // data: { layout: Layouts.adminheader }, 
  },
  // { path: "admin/admin-reset-password", 
  //   component: AdminResetPasswordComponent,
  //   // data: { layout: Layouts.adminheader }, 
  // },
  {
    path: "admin/dashboard",
    component: DashboardComponent,
    data: { layout: Layouts.adminheader },
    canActivate: [AdminGuardGuard],
  },
  {
    path: "admin/student-list",
    component: StudentListComponent,
    data: { layout: Layouts.adminheader },
    canActivate: [AdminGuardGuard]
  },
  {
    path: "admin/profile",
    component: AdminProfileComponent,
    data: { layout: Layouts.adminheader },
  },
  {
    path: "admin/teacher-list",
    component: TeacherListComponent,
    data: { layout: Layouts.adminheader },
    canActivate: [AdminGuardGuard]
  },
  {
    path: "admin/counsellor-list",
    component: CounsellorListComponent,
    data: { layout: Layouts.adminheader },
    canActivate: [AdminGuardGuard]
  },
  {
    path: "email-verification",
    component: EmailVerificationComponent,
    data: { layout: Layouts.header },
  },
  {
    path: "role",
    component: RoleComponent,
    data: { layout: Layouts.header },
  },
  {
    path: "admin/competency-area",
    component: CompetencyAreaComponent,
    data: { layout: Layouts.adminheader },
    canActivate: [AdminGuardGuard]
  },
  {
    path: "counsellor-search-list",
    component: SearchResultComponent,
    data: { layout: Layouts.adminheader },
  },
  {
    path: "teacher/edit-teacher-profile",
    component: UpdateProfileComponent,
    data: { layout: Layouts.adminheader },
    canActivate: [TeacherGuard]
  },
  {
    path: "counsellor/edit-counsellor-profile",
    component: UpdateProfileCounselorComponent,
    data: { layout: Layouts.adminheader },
    canActivate: [CounsellorGuard]
  },
  {
    path: "teacher/create-course",
    component: TeacherCreateCourseComponent,
    data: { layout: Layouts.adminheader },
    canActivate: [TeacherGuard]
  },
  {
    path: "teacher/course-list",
    component: TeacherCourseListComponent,
    data: { layout: Layouts.adminheader },
    canActivate: [TeacherGuard]
  },
  {
    path: "counsellor/session-list",
    component: CounsellorSessionComponent,
    data: { layout: Layouts.adminheader },
    canActivate: [CounsellorGuard]
  },
  {
    path: "teacher/dashboard",
    component: TeacherDashboardComponent,
    data: { layout: Layouts.adminheader },
  },
  {
    path: "teacher/booking-history",
    component: TeacherBookingHistoryComponent,
    data: { layout: Layouts.adminheader },
  },
  {
    path: "teacher/student-management",
    component: TeacherStudentMngComponent,
    data: { layout: Layouts.adminheader },
  },
  {
    path: "teacher/bank-details",
    component: TeacherBankDetailsComponent,
    data: { layout: Layouts.adminheader },
  },
  {
    path: "teacher/video-conference",
    component: TeacherVconferenceComponent,
    data: { layout: Layouts.adminheader },
  },
  {
    path: "teacher/help-support",
    component: TeacherHelpComponent,
    data: { layout: Layouts.adminheader },
  },
  {
    path: "teacher/chat",
    component: ChatTeacherComponent,
    data: { layout: Layouts.adminheader },
  },
  {
    path: "counsellor/dashboard",
    component: CounsellorDashboardComponent,
    data: { layout: Layouts.adminheader },
  },
  {
    path: "counsellor/booking-history",
    component: CounsellorBookingHistoryComponent,
    data: { layout: Layouts.adminheader },
  },
  {
    path: "counsellor/student-management",
    component: CounsellorStudentMngComponent,
    data: { layout: Layouts.adminheader },
  },
  {
    path: "counsellor/bank-details",
    component: CounsellorBankDetailsComponent,
    data: { layout: Layouts.adminheader },
  },
  {
    path: "counsellor/video-conference",
    component: CounsellorVconferenceComponent,
    data: { layout: Layouts.adminheader },
  },
  {
    path: "counsellor/help-support",
    component: CounsellorHelpComponent,
    data: { layout: Layouts.adminheader },
  },
  {
    path: "counsellor/chat",
    component: ChatCounsellorComponent,
    data: { layout: Layouts.adminheader },
  },
  {
    path: "student/dashboard",
    component: StudentDashboardComponent,
    data: { layout: Layouts.adminheader },
  },
  {
    path: "student/courses-purchased",
    component: StudentPurchaseCourseComponent,
    data: { layout: Layouts.adminheader },
  },
  {
    path: "student/courses-list",
    component: StudentCourseListComponent,
    data: { layout: Layouts.adminheader },
  },
  {
    path: "student/session-list",
    component: StudentSessionListComponent,
    data: { layout: Layouts.adminheader },
  },
  {
    path: "student/student-booking-history",
    component: StudentBookingHistoryComponent,
    data: { layout: Layouts.adminheader },
  },
  {
    path: "student/student-video-conference",
    component: StudentVconferenceComponent,
    data: { layout: Layouts.adminheader },
  },
  {
    path: "student/student-help-support",
    component: StudentHelpComponent,
    data: { layout: Layouts.adminheader },
  },
  {
    path: "student/chat",
    component: ChatComponent,
    data: { layout: Layouts.adminheader },
  },
  {
    path: "purchase-course-details",
    component: CourseDetailsAdminComponent,
    data: { layout: Layouts.adminheader },
  },
  {
    path: "teacher/edit-course",
    component: TeacherEditCourseComponent,
    data: { layout: Layouts.adminheader },
    canActivate: [TeacherGuard]
  },
  {
    path: "counsellor/edit-session",
    component: CounsellorEditSessionComponent,
    data: { layout: Layouts.adminheader },
    canActivate: [CounsellorGuard]
  },
  {
    path: "admin/course-list",
    component: AdminCourseListComponent,
    data: { layout: Layouts.adminheader },
    canActivate: [AdminGuardGuard]
  },
  {
    path: "admin/session-list",
    component: AdminSessionListComponent,
    data: { layout: Layouts.adminheader },
    canActivate: [AdminGuardGuard]
  },
  {
    path: "student/application-step1",
    component: StudentStep1Component,
    data: { layout: Layouts.header },
    canActivate: [StudentGuard]
  },
  {
    path: "student/edit-student-profile",
    component: StudentEditProfileComponent,
    data: { layout: Layouts.adminheader },
    canActivate: [StudentGuard]
  },
  {
    path: "student/session-details",
    component: StudentSessionDetailsComponent,
    data: { layout: Layouts.adminheader },
  },
  {
    path: "teacher-course-list",
    component: TeacherBasedCourseListComponent,
    data: { layout: Layouts.adminheader },
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
