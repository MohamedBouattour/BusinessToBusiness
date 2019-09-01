import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductionstep } from 'app/shared/model/productionstep.model';

@Component({
  selector: 'jhi-productionstep-detail',
  templateUrl: './productionstep-detail.component.html'
})
export class ProductionstepDetailComponent implements OnInit {
  productionstep: IProductionstep;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ productionstep }) => {
      this.productionstep = productionstep;
    });
  }

  previousState() {
    window.history.back();
  }
}
