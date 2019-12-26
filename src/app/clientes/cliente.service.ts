import { Injectable } from '@angular/core';
import { CLIENTES} from './clientes.json';
import { Cliente } from './cliente.js';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ClienteService {

  //EndPoint
  private urlEndpoint : string ='http://localhost:8080/clientes/'
  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'})

  constructor(private http: HttpClient) { }

  //?Crud - FindAll
  getClientes(): Observable<Cliente[]>{
    //return this.http.get<Cliente[]>(this.urlEndpoint);
    return this.http.get(this.urlEndpoint).pipe(
      map( response => response as Cliente[])
    )
  }

  //?Crud - Create  
  create(cliente:Cliente) : Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndpoint, cliente, {headers:this.httpHeaders} )
  }
}
