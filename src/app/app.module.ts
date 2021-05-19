import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { ListarMenuComponent } from './listar-menu/listar-menu.component';
import { CrearMenuComponent } from './crear-menu/crear-menu.component';
import { MandarMenuComponent } from './mandar-menu/mandar-menu.component';
import { EditarMenuComponent } from './editar-menu/editar-menu.component';
import { CarritoComponent } from './carrito/carrito.component';
import { LecturaComponent } from './lectura/lectura.component';
import { PersonalCocinaComponent } from './personal-cocina/personal-cocina.component';
import { FilterPipe } from './pipe/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    QrcodeComponent,
    LoginAdminComponent,
    NavbarComponent,
    RegisterComponent,
    ListarMenuComponent,
    CrearMenuComponent,
    MandarMenuComponent,
    EditarMenuComponent,
    CarritoComponent,
    LecturaComponent,
    PersonalCocinaComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
