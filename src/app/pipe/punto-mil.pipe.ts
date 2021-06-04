import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'puntoMil'
})
export class PuntoMilPipe implements PipeTransform {

  public transform(value: any) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");;
}

  // transform(value: unknown, ...args: unknown[]): unknown {

  //   const precio = value.toString();

  //   const arrPrecio = precio.split("");

  //   let counter = -1;

  //   let result = "";

  //   for (let i = arrPrecio.length; i >= 0; i--) {
  //       counter % 3 == 0 && counter != 0 ? arrPrecio[i] ? result += "." + arrPrecio[i] : true : arrPrecio[i] ? result += arrPrecio[i] : true;

  //       counter++;
  //   };

  //   const resultadoFinal = result.split("").reverse().join("");

  //   return resultadoFinal;
  // }

}
