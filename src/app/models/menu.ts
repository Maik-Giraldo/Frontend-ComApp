export class Menu {
  _identificacion?: string
  id_platillo!: number;
  platillo!: string;
  descripcion!: string;
  precio_unitario!: number;
  tipo!: number;
  contador?: number;
  img!:any;
}

export class Send {
  menu : Menu[];
  id_mesa : number;
}

export class Contador{
  contador!: number;
}
export class Sendid {
  id_mesa : number;
}

export class Cliente {
  nombre!: String;
  documento!: String;
  telefono!: String;
  correo!: String;

}

export class contacto {
  asunto!: String;
  nombre!: String;
  correo!: String;
  telefono!: String;
  descripcion!: String;
}


