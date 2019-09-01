import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, AccountService, Account } from 'app/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IBusiness, Business } from 'app/shared/model/business.model';
import { ISector, Sector } from 'app/shared/model/sector.model';
import { BusinessService } from '../entities/business/business.service';
import { SectorService } from '../entities/sector/sector.service';
import { FormControl } from '@angular/forms';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
  account: Account;
  modalRef: NgbModalRef;
  displayedColumns: string[] = ['id', 'raisonSociale', 'subsector.name', 'fixe', 'region.name'];
  businesses: IBusiness[];
  dataSource: any;
  myControl = new FormControl();
  options: ISector[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  filteredOptions: Observable<IBusiness[]>;

  constructor(
    private jhiAlertService: JhiAlertService,
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private eventManager: JhiEventManager,
    private businessService: BusinessService,
    private sectorService: SectorService
  ) {
    this.businessService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IBusiness[]>) => mayBeOk.ok),
        map((response: HttpResponse<IBusiness[]>) => response.body)
      )
      .subscribe(
        (res: IBusiness[]) => {
          this.businesses = res;
          this.dataSource = new MatTableDataSource(this.businesses);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.sectorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISector[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISector[]>) => response.body)
      )
      .subscribe(
        (res: ISector[]) => {
          this.options = res;
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => (typeof value === 'string' ? value : value.name)),
            map(name => (name ? this._filter(name) : this.options.slice()))
          );
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.accountService.identity().then((account: Account) => {
      this.account = account;
    });
    this.registerAuthenticationSuccess();
  }
  displayFn(sector?: ISector): string | undefined {
    return sector ? sector.name : undefined;
  }
  private _filter(name: string): ISector[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  registerAuthenticationSuccess() {
    this.eventManager.subscribe('authenticationSuccess', message => {
      this.accountService.identity().then(account => {
        this.account = account;
      });
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }
  onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  select(option: ISector) {
    this.businessService
      .findBySector(option.id)
      .pipe(
        filter((res: HttpResponse<IBusiness[]>) => res.ok),
        map((res: HttpResponse<IBusiness[]>) => res.body)
      )
      .subscribe(
        (res: IBusiness[]) => {
          this.businesses = res;
          this.dataSource = new MatTableDataSource(this.businesses);
          //this.dataSource.paginator = this.paginator;
          //this.dataSource.sort = this.sort;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }
}
