import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISector } from 'app/shared/model/sector.model';
import { SectorService } from './sector.service';

@Component({
  selector: 'jhi-sector-delete-dialog',
  templateUrl: './sector-delete-dialog.component.html'
})
export class SectorDeleteDialogComponent {
  sector: ISector;

  constructor(protected sectorService: SectorService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.sectorService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'sectorListModification',
        content: 'Deleted an sector'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-sector-delete-popup',
  template: ''
})
export class SectorDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ sector }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SectorDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.sector = sector;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/sector', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/sector', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
