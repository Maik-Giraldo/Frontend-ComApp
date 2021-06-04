import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {debounceTime} from 'rxjs/operators'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.search.valueChanges
    .pipe(
      debounceTime(300)
    )
    .subscribe(value=>this.searchEmitter.emit(value));


    this.tipo.valueChanges
    .pipe(
      debounceTime(300)
    )
    .subscribe(value=>this.tipochEmitter.emit(value));
  }



  search = new FormControl('')

  tipo = new FormControl('')

  @Output('search') searchEmitter = new EventEmitter<string>();

  @Output('tipo') tipochEmitter = new EventEmitter<string>();


}
