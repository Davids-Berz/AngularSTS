import { Injectable } from '@angular/core';
import { Cliente } from './cliente.js';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class ClienteService {

  //EndPoint
  private urlEndpoint: string = 'http://localhost:8080/clientes'
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient,
    private router: Router) { }

  //?Crud - FindAll
  getClientes(): Observable<Cliente[]> {
    //return this.http.get<Cliente[]>(this.urlEndpoint);
    return this.http.get(this.urlEndpoint).pipe(
      map(response => response as Cliente[])
    )
  }

  //?Crud - Create  
  create(cliente: Cliente): Observable<any> {
    return this.http.post<any>(`${this.urlEndpoint}/`, cliente, { headers: this.httpHeaders })
      .pipe(catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      }))
  }

  //?Retorna al Cliente por el id para trabajar con update
  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  //?Crud - Update
  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndpoint}/${cliente.id}`, cliente, { headers: this.httpHeaders })
      .pipe(catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      }))
  }

  //?Crud - Delete
  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`, { headers: this.httpHeaders })
      .pipe(catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      }))
  }

}
