import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IBusiness, Business } from 'app/shared/model/business.model';
import { BusinessService } from './business.service';
import { ISector } from 'app/shared/model/sector.model';
import { SectorService } from 'app/entities/sector';
import { ICountry } from 'app/shared/model/country.model';
import { CountryService } from 'app/entities/country';

@Component({
  selector: 'jhi-business-update',
  templateUrl: './business-update.component.html'
})
export class BusinessUpdateComponent implements OnInit {
  isSaving: boolean;

  sectors: ISector[];

  countrys: ICountry[];

  editForm = this.fb.group({
    id: [],
    raisonSociale: [null, [Validators.required]],
    nom: [null, [Validators.required]],
    prenom: [null, [Validators.required]],
    matriculeFiscale: [null, [Validators.required]],
    adresse: [null, [Validators.required]],
    email: [null, [Validators.required]],
    siteweb: [null, [Validators.required]],
    cp: [null, [Validators.required]],
    telecom: [],
    ooredoo: [],
    orange: [],
    fixe: [],
    fixe2: [],
    fax: [],
    motivation: [],
    isLocal: [null, [Validators.required]],
    subsector: [],
    region: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected businessService: BusinessService,
    protected sectorService: SectorService,
    protected regionService: CountryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ business }) => {
      this.updateForm(business);
    });
    this.sectorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISector[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISector[]>) => response.body)
      )
      .subscribe((res: ISector[]) => (this.sectors = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.regionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICountry[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICountry[]>) => response.body)
      )
      .subscribe((res: ICountry[]) => (this.countrys = res), (res: HttpErrorResponse) => this.onError(res.message));
  }
  updateForm(business: IBusiness) {
    this.editForm.patchValue({
      id: business.id,
      raisonSociale: business.raisonSociale,
      nom: business.nom,
      prenom: business.prenom,
      matriculeFiscale: business.matriculeFiscale,
      adresse: business.adresse,
      email: business.email,
      siteweb: business.siteweb,
      cp: business.cp,
      telecom: business.telecom,
      ooredoo: business.ooredoo,
      orange: business.orange,
      fixe: business.fixe,
      fixe2: business.fixe2,
      fax: business.fax,
      motivation: business.motivation,
      isLocal: business.isLocal,
      subsector: business.subsector,
      region: business.region
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const business = this.createFromForm();
    if (business.id !== undefined) {
      this.subscribeToSaveResponse(this.businessService.update(business));
    } else {
      this.subscribeToSaveResponse(this.businessService.create(business));
    }
  }

  private createFromForm(): IBusiness {
    return {
      ...new Business(),
      id: this.editForm.get(['id']).value,
      raisonSociale: this.editForm.get(['raisonSociale']).value,
      nom: this.editForm.get(['nom']).value,
      prenom: this.editForm.get(['prenom']).value,
      matriculeFiscale: this.editForm.get(['matriculeFiscale']).value,
      adresse: this.editForm.get(['adresse']).value,
      email: this.editForm.get(['email']).value,
      siteweb: this.editForm.get(['siteweb']).value,
      cp: this.editForm.get(['cp']).value,
      telecom: this.editForm.get(['telecom']).value,
      ooredoo: this.editForm.get(['ooredoo']).value,
      orange: this.editForm.get(['orange']).value,
      fixe: this.editForm.get(['fixe']).value,
      fixe2: this.editForm.get(['fixe2']).value,
      fax: this.editForm.get(['fax']).value,
      motivation: this.editForm.get(['motivation']).value,
      isLocal: this.editForm.get(['isLocal']).value,
      subsector: this.editForm.get(['subsector']).value,
      region: this.editForm.get(['region']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBusiness>>) {
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

  trackSubsectorById(index: number, item: ISector) {
    return item.id;
  }

  trackRegionById(index: number, item: ICountry) {
    return item.id;
  }
}
