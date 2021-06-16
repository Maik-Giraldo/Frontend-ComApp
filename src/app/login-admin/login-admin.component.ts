import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AuthService } from '../Services/auth.service';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  form: FormGroup;
  load: boolean = true;

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private client: ClientService,
    public auth: AuthService) { }

    get correo() { return this.form.get('correo'); }
    get password() { return this.form.get('password'); }

  ngOnInit(): void {
    this.form = this.fb.group({
      correo: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async onSubmit() {


    if (this.form.valid) {

      this.load = false;
      this.client.postRequest(`${environment.BASE_API}/admin/login`,{
        correo: this.form.value.correo,
        password: this.form.value.password
      }).subscribe(

        (response: any) => {
          this.load = true;
          console.log(response);

          this.auth.login(response.token)

          this.auth.loginmanager(response.rol)

          this.auth.loginadmin(response.rol)



          Swal.fire({
            toast: true,
            icon: 'success',
            title: 'Has iniciado sesión correctamente',
            showConfirmButton: true,
            confirmButtonText: `Ok`
          }).then((result) => {
            //Read more about isConfirmed, isDenied below
            if (result.isConfirmed) {
              this.route.navigate( ['/'])
            }
          })


      },
      (error) => {
        this.load = true;
        console.log(error.status);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Correo o contraseña incorrecta',
        }).then((result) => {
          //Read more about isConfirmed, isDenied below
          if (result.isConfirmed) {
            this.route.navigate( ['/login'])
          }
        })

      })



    } else {

      console.log("Form error");
    }



  }


  }

