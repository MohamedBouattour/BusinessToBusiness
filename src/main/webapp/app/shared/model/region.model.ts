import { ICountry } from 'app/shared/model/country.model';
import { IBusiness } from 'app/shared/model/business.model';

export interface IRegion {
  id?: number;
  name?: string;
  country?: ICountry;
  businesses?: IBusiness[];
}

export class Region implements IRegion {
  constructor(public id?: number, public name?: string, public country?: ICountry, public businesses?: IBusiness[]) {}
}
