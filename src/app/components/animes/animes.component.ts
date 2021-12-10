import { Component, OnInit } from '@angular/core';
import { Anime } from 'src/app/Model/Anime';
import { AnimesService } from 'src/app/services/animes.service';

@Component({
  selector: 'app-animes',
  templateUrl: './animes.component.html',
  styleUrls: ['./animes.component.css']
})
export class AnimesComponent implements OnInit {
  /*
  * Lista de animes a mostrar en la pantalla
  */
  public animes: Anime[] | undefined;
  /*
  * Constructor default que inicializa el componente de animes
  * @param animeService
  */
  constructor(private animesService: AnimesService) { }

  ngOnInit(): void {
    this.consultarAnimes();
  }
  /*
  * Funcion para consultar los animes
  */
  consultarAnimes(){
    console.log('Consultando animes');
    this.animesService.consultarAnimes().subscribe(response => {
      console.log(response);
      this.animes = response;
    });
  }

}
