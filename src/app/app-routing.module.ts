import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAdminComponent } from './login-admin/login-admin.component';

import { QrcodeComponent } from './qrcode/qrcode.component';
import { RegisterComponent } from './register/register.component';
import { AllGuard } from './guardias/all.guard';
import { ListarMenuComponent } from './listar-menu/listar-menu.component';
import { CrearMenuComponent } from './crear-menu/crear-menu.component';
import { MandarMenuComponent } from './mandar-menu/mandar-menu.component';


const routes: Routes = [
  {path: '', component: QrcodeComponent},
  {path: 'login', component: LoginAdminComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'menu', component: ListarMenuComponent},
  {path: 'crearMenu', component: CrearMenuComponent},
  {path: 'mandarMenu', component: MandarMenuComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
