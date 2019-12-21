import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent  {

  clientes:Cliente[]=[
    {id:1,nombre:'david',apellido:'saldivar',email:'david@cliente.com',createAt:'2018-12-11'}
  ];


  constructor() { }


}
