import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ISector, Sector } from 'app/shared/model/sector.model';
import { SectorService } from './sector.service';

@Component({
  selector: 'jhi-sector-update',
  templateUrl: './sector-update.component.html'
})
export class SectorUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]]
  });

  constructor(protected sectorService: SectorService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ sector }) => {
      this.updateForm(sector);
    });
  }

  updateForm(sector: ISector) {
    this.editForm.patchValue({
      id: sector.id,
      name: sector.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const sector = this.createFromForm();
    if (sector.id !== undefined) {
      this.subscribeToSaveResponse(this.sectorService.update(sector));
    } else {
      this.subscribeToSaveResponse(this.sectorService.create(sector));
    }
  }

  private createFromForm(): ISector {
    return {
      ...new Sector(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISector>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
