import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductionstep } from 'app/shared/model/productionstep.model';
import { ProductionstepService } from './productionstep.service';

@Component({
  selector: 'jhi-productionstep-delete-dialog',
  templateUrl: './productionstep-delete-dialog.component.html'
})
export class ProductionstepDeleteDialogComponent {
  productionstep: IProductionstep;

  constructor(
    protected productionstepService: ProductionstepService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.productionstepService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'productionstepListModification',
        content: 'Deleted an productionstep'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-productionstep-delete-popup',
  template: ''
})
export class ProductionstepDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ productionstep }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ProductionstepDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.productionstep = productionstep;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/productionstep', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/productionstep', { outlets: { popup: null } }]);
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
