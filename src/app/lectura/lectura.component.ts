import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lectura',
  templateUrl: './lectura.component.html',
  styleUrls: ['./lectura.component.css']
})
export class LecturaComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  private id_mesa = 0;

  ngOnInit(): void {
    this.id_mesa = parseInt(window.location.href.slice(30));
    localStorage.setItem('id_mesa', this.id_mesa.toString());
    this.router.navigate(['/']);
    
  }

}
