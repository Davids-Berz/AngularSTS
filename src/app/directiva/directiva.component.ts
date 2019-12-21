import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent {

  listaCurso: string[]=['TypeScript','JavaScript','Java SE','C#','PHP'];
  habilitar: boolean=false;

  
  constructor() { }

  setHabilitar(): void{
    this.habilitar = (this.habilitar==true)?false:true;
  }
  setHabilitarButton():string{
    return this.habilitar==true?'Ocultar':'Mostrar';
  }
  setHabilitarClass():string{
    return this.habilitar==true?'btn btn-primary':'btn btn-secondary';
  }
}
