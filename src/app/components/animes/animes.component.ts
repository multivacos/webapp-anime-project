import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Anime } from 'src/app/Model/Anime';
import { AnimesService } from 'src/app/services/animes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-animes',
  templateUrl: './animes.component.html',
  styleUrls: ['./animes.component.css']
})
export class AnimesComponent implements OnInit {
  modalReference?: NgbModalRef;
  /*
  * Lista de animes a mostrar en la pantalla
  */
  public animes?: Anime[];
  public anime?: Anime;
  page = 1;
  pageSize = 7;
  collectionSize = 0;
  /*
  * Constructor default que inicializa el componente de animes
  * @param animeService
  */
  constructor(private animesService: AnimesService, private modalService: NgbModal ) { }

  ngOnInit(): void {
    this.consultarAnimes();
    this.anime = new Anime();
  }
  /*
  * Funcion para consultar los animes
  */
  consultarAnimes() {
    console.log('Consultando animes');
    this.animesService.consultarAnimes().subscribe(response => {
      console.log(response);
      this.animes = response;
      this.collectionSize = this.animes.length;
      this.animes = this.animes.map((anime, i) => ({ counter: i + 1, ...anime }))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    });
  }

  /*
  * Funcion que permite abrir una ventana modal a traves del componente
  */
  open(content: any) {
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalReference.result.then((result) =>{
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /*
  * Funcion que permite precargar el objeto anime a mostrarse en el modal
  * @param animeSelecionado anime seleccionado por el usuario
  */
  cargarAnime(animeSelecionado: Anime, content: any){
    this.anime = new Anime();
    this.anime.id = animeSelecionado.id;
    this.anime.nombre = animeSelecionado.nombre;
    this.anime.anio = animeSelecionado.anio;
    this.anime.fechaCreacion = animeSelecionado.fechaCreacion;

    this.open(content);
  }

  /*
  * Funcion que permite guardar un anime
  * @param data
  */
  guardarAnime(data: any){

    if (!this.anime?.id) {
      this.anime = new Anime();
      this.anime.nombre = data.nombre;
      this.anime.anio = data.anio;
  
      this.animesService.guardarAnime(this.anime).subscribe(response => {
        this.modalReference?.close();
        this.consultarAnimes();
      });
    } else {
      this.animesService.actualizarAnime(this.anime).subscribe(response => {
        this.modalReference?.close();
        this.consultarAnimes();
        this.anime = new Anime();
      });
    }
  }

  /*
  * Funcion que permite mostrar ventana de confirmacion para eliminar anime
  * @param anime
  */
  mostrarVentanaEliminar(anime: Anime){
    Swal.fire({
      title: "Confirmación",
      text: `¿Estás seguro de eliminar el anime ${anime.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.animesService.eliminarAnime(anime.id!).subscribe(response => {
          this.consultarAnimes();
          Swal.fire(
            'Ok!',
            `El anime ${anime.nombre} fue eliminado correctamente.`,
            'success'
          )
        });
      }
    })
  }
}
