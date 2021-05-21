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


import {  CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';

import { SidebarModule } from 'ng-sidebar';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatInputModule} from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
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
    SidebarComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SidebarModule.forRoot(),
    BrowserAnimationsModule,
    MatInputModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatBadgeModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
