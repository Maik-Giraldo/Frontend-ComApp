import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lectura',
  templateUrl: './lectura.component.html',
  styleUrls: ['./lectura.component.css']
})
export class LecturaComponent implements OnInit {

  constructor(
    private router: Router, private activatedRoute: ActivatedRoute,
  ) { }

  private id_mesa = '';

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id_mesa = params.get('id_mesa');
      localStorage.setItem('id_mesa', this.id_mesa.toString());
      this.router.navigate(['/']);

    });
  }

}
