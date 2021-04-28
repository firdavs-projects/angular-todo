import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {RegisterPageComponent} from './pages/register-page/register-page.component';
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AuthGuard} from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: '', component: NavbarComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomePageComponent, canActivate: [AuthGuard]},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
