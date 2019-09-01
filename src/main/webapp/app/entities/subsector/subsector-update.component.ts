import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISubsector, Subsector } from 'app/shared/model/subsector.model';
import { SubsectorService } from './subsector.service';
import { ISector } from 'app/shared/model/sector.model';
import { SectorService } from 'app/entities/sector';

@Component({
  selector: 'jhi-subsector-update',
  templateUrl: './subsector-update.component.html'
})
export class SubsectorUpdateComponent implements OnInit {
  isSaving: boolean;

  sectors: ISector[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    sector: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected subsectorService: SubsectorService,
    protected sectorService: SectorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ subsector }) => {
      this.updateForm(subsector);
    });
    this.sectorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISector[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISector[]>) => response.body)
      )
      .subscribe((res: ISector[]) => (this.sectors = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(subsector: ISubsector) {
    this.editForm.patchValue({
      id: subsector.id,
      name: subsector.name,
      sector: subsector.sector
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const subsector = this.createFromForm();
    if (subsector.id !== undefined) {
      this.subscribeToSaveResponse(this.subsectorService.update(subsector));
    } else {
      this.subscribeToSaveResponse(this.subsectorService.create(subsector));
    }
  }

  private createFromForm(): ISubsector {
    return {
      ...new Subsector(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      sector: this.editForm.get(['sector']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubsector>>) {
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

  trackSectorById(index: number, item: ISector) {
    return item.id;
  }
}
