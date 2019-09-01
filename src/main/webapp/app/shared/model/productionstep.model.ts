import { IBusiness } from 'app/shared/model/business.model';

export interface IProductionstep {
  id?: number;
  name?: string;
  business?: IBusiness;
}

export class Productionstep implements IProductionstep {
  constructor(public id?: number, public name?: string, public business?: IBusiness) {}
}
