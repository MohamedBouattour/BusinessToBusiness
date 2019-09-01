import { ISubsector } from 'app/shared/model/subsector.model';

export interface ISector {
  id?: number;
  name?: string;
  subsectors?: ISubsector[];
}

export class Sector implements ISector {
  constructor(public id?: number, public name?: string, public subsectors?: ISubsector[]) {}
}
