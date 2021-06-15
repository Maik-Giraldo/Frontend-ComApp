export class Carrito {
  _identificacion!: string;
  id_platillo!: number;
  platillo!: string;
  descripcion!: string;
  precio_unitario!: number;
  tipo!: number;
  id_mesa!: number;
  cantidad? : number;
}

export interface respuestaCarrito {
  transaccion : boolean,
  data : Carrito[]
}

