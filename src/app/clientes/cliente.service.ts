import { Injectable } from '@angular/core';
import { Cliente } from './cliente.js';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

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

      tap(response =>{
        console.log('ClienteService: tap 1');

        let clientes = response as Cliente[];
        clientes.forEach(cliente =>{
          console.log(cliente.nombre);
        })
      }),
      map(response => {
        let clientes = response as Cliente[];

        return clientes.map(cliente =>{
          cliente.nombre = cliente.nombre.toUpperCase();
          //let datePipe = new DatePipe('es');
          //cliente.createAt = datePipe.transform(cliente.createAt,'EEEE dd/MMMM/yyyy');//formatDate(cliente.createAt,'dd-MM-yyyy','en-US');
          return cliente;
        })
      }),
      tap(response =>{
        console.log('ClienteService: tap 2');
        response.forEach(cliente =>{
          console.log(cliente.nombre);
        })
      })
    )
  }

  //?Crud - Create  
  create(cliente: Cliente): Observable<any> {
    return this.http.post<any>(`${this.urlEndpoint}/`, cliente, { headers: this.httpHeaders })
      .pipe(catchError(e => {

        if(e.status==400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      }))
  }

  //?Retorna al Cliente por el id para trabajar con update
  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`)
    .pipe(catchError(e => {
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
        if(e.status==400){
          return throwError(e);
        }
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
