import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  load: boolean = true;

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private client: ClientService) { }

    get correo() { return this.form.get('correo'); }
    get password() { return this.form.get('password'); }
    get password2() { return this.form.get('password2')}
    get rol() { return this.form.get('rol')}

  ngOnInit(): void {
    this.form = this.fb.group({
      correo: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2:['', [Validators.required, Validators.minLength(8)]],
      rol : ['', [Validators.required]],

    });
  }



  async onSubmit() {

    if(this.form.value.password === this.form.value.password2){
      if (this.form.valid) {

        this.load = false;
        this.client.postRequest(`${environment.BASE_API}/user/register`,{
          correo: this.form.value.correo,
          password: this.form.value.password,
          rol: this.form.value.rol,

        }).subscribe(

          (response: any) => {
            console.log(response);


            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Registro correcto',
              showConfirmButton: false,
              timer: 8000
            })
            window.location.reload();



        },
        (error) => {
          this.load = true;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '',
            footer: ''
          })
        })


      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registro fallido',
          text: 'Por favor rellena todos los campos requeridos',
        })
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las contraseñas no coinciden',
      })
    }
  }
}
