import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAdminComponent } from './login-admin/login-admin.component';

import { QrcodeComponent } from './qrcode/qrcode.component';
import { RegisterComponent } from './register/register.component';
import { AllGuard } from './guardias/all.guard';
import { ListarMenuComponent } from './listar-menu/listar-menu.component';
import { CrearMenuComponent } from './crear-menu/crear-menu.component';
import { MandarMenuComponent } from './mandar-menu/mandar-menu.component';
import { CarritoComponent } from './carrito/carrito.component';


const routes: Routes = [
  {path: 'qrcode', component: QrcodeComponent, canActivate: [AllGuard]},
  {path: 'login', component: LoginAdminComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: ListarMenuComponent},
  {path: 'crearMenu', component: CrearMenuComponent, canActivate: [AllGuard]},
  {path: 'editarMenu', component: CrearMenuComponent, canActivate: [AllGuard]},
  {path: 'eliminarMenu', component: CrearMenuComponent, canActivate: [AllGuard]},
  {path: 'mandarMenu', component: MandarMenuComponent, canActivate: [AllGuard]},
  {path: 'carrito', component: CarritoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
