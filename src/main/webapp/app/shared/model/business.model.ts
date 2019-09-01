import { ISubsector } from 'app/shared/model/subsector.model';
import { IRegion } from 'app/shared/model/region.model';
import { IProductionstep } from 'app/shared/model/productionstep.model';

export interface IBusiness {
  id?: number;
  raisonSociale?: string;
  nom?: string;
  prenom?: string;
  matriculeFiscale?: string;
  adresse?: string;
  email?: string;
  siteweb?: string;
  cp?: number;
  telecom?: number;
  ooredoo?: number;
  orange?: number;
  fixe?: number;
  fixe2?: number;
  fax?: number;
  motivation?: number;
  isLocal?: boolean;
  subsector?: ISubsector;
  region?: IRegion;
  productionsteps?: IProductionstep[];
}

export class Business implements IBusiness {
  constructor(
    public id?: number,
    public raisonSociale?: string,
    public nom?: string,
    public prenom?: string,
    public matriculeFiscale?: string,
    public adresse?: string,
    public email?: string,
    public siteweb?: string,
    public cp?: number,
    public telecom?: number,
    public ooredoo?: number,
    public orange?: number,
    public fixe?: number,
    public fixe2?: number,
    public fax?: number,
    public motivation?: number,
    public isLocal?: boolean,
    public subsector?: ISubsector,
    public region?: IRegion,
    public productionsteps?: IProductionstep[]
  ) {
    this.isLocal = this.isLocal || false;
  }
}
