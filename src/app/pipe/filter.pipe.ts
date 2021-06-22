import { Pipe, PipeTransform ,Input} from '@angular/core';


@Pipe({
  name: 'filter',


})
export class FilterPipe implements PipeTransform {




  transform(lista: any[], fecha: string): any[] {

    var dateDay = new Date().toString();


    var fecha=dateDay.slice(9,-50)




    function getDia(index){
      var dia = new Array(7);
      dia[0] = "Domingo";
      dia[1] = "Lunes";
      dia[2] = "Martes";
      dia[3] = "Miércoles";
      dia[4] = "Jueves";
      dia[5] = "Viernes";
      dia[6] = "Sábado";
    return dia[index];

  }

  var d = new Date();
  var n = getDia(d.getDay());

  var m = new Date().getDate();
  console.log(m)





    if(!m) return lista;
    return lista.filter(pedido => pedido.fechaHora.toString().includes(m.toString().toUpperCase()));

  }


}
