import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubsector } from 'app/shared/model/subsector.model';

@Component({
  selector: 'jhi-subsector-detail',
  templateUrl: './subsector-detail.component.html'
})
export class SubsectorDetailComponent implements OnInit {
  subsector: ISubsector;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ subsector }) => {
      this.subsector = subsector;
    });
  }

  previousState() {
    window.history.back();
  }
}
