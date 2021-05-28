import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  ClientService } from '../services/client.service';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {
  form: FormGroup;
  load: boolean = true;
  public image : string = ''

  public cargando : boolean = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private client: ClientService,
  ) { }

  // public id_mesa : number = 0;

  ngOnInit(): void {
    this.form= this.fb.group({
      id_mesa: ['', Validators.required],
      nombre: ['', Validators.required]
    });
  }

  async onSubmit(){
    if (this.form.valid){
      this.cargando = true;
      this.client.postRequest(`${environment.BASE_API}/suport/qrcode`,{
        id_mesa: this.form.value.id_mesa,
        nombre: this.form.value.nombre
      }).subscribe(
        (res:any) => {
          this.image = res.image;
          this.cargando = false;
        }
      )
    }
  }

}
