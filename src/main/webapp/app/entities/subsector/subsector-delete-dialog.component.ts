import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISubsector } from 'app/shared/model/subsector.model';
import { SubsectorService } from './subsector.service';

@Component({
  selector: 'jhi-subsector-delete-dialog',
  templateUrl: './subsector-delete-dialog.component.html'
})
export class SubsectorDeleteDialogComponent {
  subsector: ISubsector;

  constructor(protected subsectorService: SubsectorService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.subsectorService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'subsectorListModification',
        content: 'Deleted an subsector'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-subsector-delete-popup',
  template: ''
})
export class SubsectorDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ subsector }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SubsectorDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.subsector = subsector;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/subsector', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/subsector', { outlets: { popup: null } }]);
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
