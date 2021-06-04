import { Pipe, PipeTransform ,Input} from '@angular/core';


@Pipe({
  name: 'filter',


})
export class FilterPipe implements PipeTransform {




  transform(lista: any[], fecha: string): any[] {

    var dateDay = new Date().toString();
    console.log(dateDay.slice(9,-50))

    var fecha=dateDay.slice(9,-50)

    if(!fecha) return lista;
    return lista.filter(pedido => pedido.fechaHora.toString().includes(fecha.toUpperCase()));

  }


}
