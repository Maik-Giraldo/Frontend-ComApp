import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterId'
})
export class FilterIdPipe implements PipeTransform {

  transform(lista: any[], texto: string): any[] {

    if(!texto) return lista;
    return lista.filter(pedido => pedido.id_mesa.toString().includes(texto.toUpperCase()));

  }

}
