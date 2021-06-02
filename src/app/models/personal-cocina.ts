export class PersonalCocina {
  _identificacion!: string;
  fechaHora!: Date;
  id_pedido!: number;
  id_mesa!: number;
  estado!: string;
  detalle_pedido!: detalle_pedido[]
}

export class detalle_pedido {
  _identificacion!: string;
  id_pedido!:number;
  id_platillo!: number;
  platillo_cantidad!: number;
  precio_total_platillo!: number;
  detalle_platillo: detale_platillo[]

}

export class detale_platillo {

  _identificacion!: string;
  id_platillo!: number;
  platillo!: string;
  descripcion!: string;
  precio_unitario!: number;
  tipo!: number;
}

export class Pedido {
  fechaHora!: Date;
  id_pedido!: number;
  id_mesa!: number;
}

