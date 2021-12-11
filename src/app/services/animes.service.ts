import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Anime } from '../Model/Anime';

@Injectable({
  providedIn: 'root'
})
export class AnimesService {
  /*
  * URL base del ms de animes de springboot
  */
  private baseUrl = 'http://localhost:8090/animes';

  private headers: HttpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private httpClient: HttpClient) { 
  }

  /*
  * Función que permite consumir el servicio para consultar animes
  */
  consultarAnimes(): Observable<Anime[]> {
      //return this.httpClient.get<Anime[]>(this.baseUrl + '/consultarAnimes');
      return this.httpClient.get<Anime[]>(`${this.baseUrl}/consultarAnimes`);
  }

  /*
  * Función que permite consumir el servicio para guardar animes
  * @param anime anime a guardar
  */
  guardarAnime(anime: Anime): Observable<Anime>{
      return this.httpClient.post<Anime>(`${this.baseUrl}/guardarAnime`, anime, {headers: this.headers});
  }

  /*
  * Función que permite consumir el servicio para actualizar animes
  * @param anime anime a guardar
  */
    actualizarAnime(anime: Anime): Observable<Anime>{
      return this.httpClient.put<Anime>(`${this.baseUrl}/actualizarAnime`, anime, {headers: this.headers});
  }

  /*
  * Función que permite consumir el servicio para eliminar animes
  * @param id del anime a eliminar
  */
    eliminarAnime(id: number): Observable<void>{
      return this.httpClient.delete<void>(`${this.baseUrl}/eliminarAnime/${id}`);
  }
}
