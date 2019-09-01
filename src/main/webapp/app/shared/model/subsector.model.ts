import { ISector } from 'app/shared/model/sector.model';
import { IBusiness } from 'app/shared/model/business.model';

export interface ISubsector {
  id?: number;
  name?: string;
  sector?: ISector;
  businesses?: IBusiness[];
}

export class Subsector implements ISubsector {
  constructor(public id?: number, public name?: string, public sector?: ISector, public businesses?: IBusiness[]) {}
}
