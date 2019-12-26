import { Injectable } from '@angular/core';
import { Cliente } from './cliente.js';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ClienteService {

  //EndPoint
  private urlEndpoint : string ='http://localhost:8080/clientes'
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

  //?Retorna al Cliente por el id para trabajar con update
  getCliente(id:any): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`)
  }

  //?Crud - Update
  update(cliente:Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndpoint}/${cliente.id}`,cliente, {headers:this.httpHeaders})
  }

  //?Crud - Delete
  delete(id:number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`, {headers:this.httpHeaders})
  }

}
