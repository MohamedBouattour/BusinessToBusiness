import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProductionstep, Productionstep } from 'app/shared/model/productionstep.model';
import { ProductionstepService } from './productionstep.service';
import { IBusiness } from 'app/shared/model/business.model';
import { BusinessService } from 'app/entities/business';

@Component({
  selector: 'jhi-productionstep-update',
  templateUrl: './productionstep-update.component.html'
})
export class ProductionstepUpdateComponent implements OnInit {
  isSaving: boolean;

  businesses: IBusiness[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    business: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected productionstepService: ProductionstepService,
    protected businessService: BusinessService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ productionstep }) => {
      this.updateForm(productionstep);
    });
    this.businessService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IBusiness[]>) => mayBeOk.ok),
        map((response: HttpResponse<IBusiness[]>) => response.body)
      )
      .subscribe((res: IBusiness[]) => (this.businesses = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(productionstep: IProductionstep) {
    this.editForm.patchValue({
      id: productionstep.id,
      name: productionstep.name,
      business: productionstep.business
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const productionstep = this.createFromForm();
    if (productionstep.id !== undefined) {
      this.subscribeToSaveResponse(this.productionstepService.update(productionstep));
    } else {
      this.subscribeToSaveResponse(this.productionstepService.create(productionstep));
    }
  }

  private createFromForm(): IProductionstep {
    return {
      ...new Productionstep(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      business: this.editForm.get(['business']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductionstep>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackBusinessById(index: number, item: IBusiness) {
    return item.id;
  }
}
