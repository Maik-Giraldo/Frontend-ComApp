import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAdminComponent } from './login-admin/login-admin.component';

import { QrcodeComponent } from './qrcode/qrcode.component';
import { RegisterComponent } from './register/register.component';
import { AllGuard } from './guardias/all.guard';

const routes: Routes = [
  {path: '', component: QrcodeComponent},
  {path: 'login', component: LoginAdminComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
