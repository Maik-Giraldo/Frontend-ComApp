import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarritoGuardService } from '../services/carrito-guard.service';

@Component({
  selector: 'app-lectura',
  templateUrl: './lectura.component.html',
  styleUrls: ['./lectura.component.css']
})
export class LecturaComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute, 
    private carrito1 : CarritoGuardService
  ) { }

  private id_mesa = '';

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id_mesa = params.get('id_mesa');
      this.carrito1.changeIdmesa( this.id_mesa.toString())
    });
  }

}
