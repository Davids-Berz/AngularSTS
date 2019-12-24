import { Injectable } from '@angular/core';
import { CLIENTES} from './clientes.json';
import { Cliente } from './cliente.js';
import { Observable, of } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  //!EndPoint findAll
  private urlEndpoint : string ='http://localhost:8080/clientes/';

  constructor(private http: HttpClient) { }

  //Metodo FindAll
  getClientes(): Observable<Cliente[]>{
    //return of(CLIENTES);
    //?return this.http.get<Cliente[]>(this.urlEndpoint);
    return this.http.get(this.urlEndpoint).pipe(
      map( response => response as Cliente[])
    )
  }
}
