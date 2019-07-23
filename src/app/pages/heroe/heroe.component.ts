import { Component, OnInit } from '@angular/core';
import {HeroeModel} from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();
  constructor(
    private route: ActivatedRoute,
    private heroesService: HeroesService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if ( id !== 'nuevo') {
      this.heroesService.getHeroe( id ).subscribe( (response: HeroeModel) => {
        this.heroe = response;
        this.heroe.id = id;
      });
    }
  }
  guardar( form: NgForm ) {
    if (form.invalid) {
      console.log('formulario no valido');
      return;
    }
    Swal.fire({
      title: 'Espere',
      text: 'Guardando Informacion',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    let peticion: Observable<any>;
    if (this.heroe.id) {
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroesService.crearHeroe(this.heroe);
    }
    peticion.subscribe( response => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizo correctamente',
        type: 'success'
      });
    });
  }

}
