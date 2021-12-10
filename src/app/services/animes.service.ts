import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private httpClient: HttpClient) { 
  }

  /*
  * Función que permite consumir el servicio para consultar animes
  */
  consultarAnimes(): Observable<Anime[]> {
      //return this.httpClient.get<Anime[]>(this.baseUrl + '/consultarAnimes');
      return this.httpClient.get<Anime[]>(`${this.baseUrl}/consultarAnimes`);
  }
}
