import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAdminComponent } from './login-admin/login-admin.component';

import { QrcodeComponent } from './qrcode/qrcode.component';

import { AllGuard } from './guardias/all.guard';
import { ListarMenuComponent } from './listar-menu/listar-menu.component';
import { CrearMenuComponent } from './crear-menu/crear-menu.component';
import { MandarMenuComponent } from './mandar-menu/mandar-menu.component';
import { CarritoComponent } from './carrito/carrito.component';
import { LecturaComponent } from './lectura/lectura.component';
import { PersonalCocinaComponent } from './personal-cocina/personal-cocina.component';
import { FacturasComponent } from './facturas/facturas.component';
import { ManagerGuard } from './guardias/manager.guard';
import { RegisterComponent } from './register/register.component';
import { StaffGuard } from './guardias/staff.guard';
import { CarritoGuard } from './guardias/carrito.guard';



const routes: Routes = [
  {path: 'qrcode', component: QrcodeComponent, },
  {path: 'login', component: LoginAdminComponent},
  {path: 'register', component: RegisterComponent, canActivate: [AllGuard] },
  {path: '', component: ListarMenuComponent},
  {path: 'crearMenu', component: CrearMenuComponent, canActivate: [AllGuard]},
  {path: 'editarMenu', component: CrearMenuComponent, canActivate: [AllGuard] },
  {path: 'eliminarMenu', component: CrearMenuComponent, canActivate: [AllGuard]},
  {path: 'mandarMenu', component: MandarMenuComponent,  canActivate: [ManagerGuard]},
  {path: 'carrito', component: CarritoComponent, canActivate: [CarritoGuard]},
  {path: 'facturas', component: PersonalCocinaComponent,canActivate: [StaffGuard]},
  {path: 'facturasClientes', component: FacturasComponent,canActivate: [StaffGuard]},
  {path: 'lectura/:id_mesa', component: LecturaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
