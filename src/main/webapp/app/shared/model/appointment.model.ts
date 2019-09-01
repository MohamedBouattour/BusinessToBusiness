import { Moment } from 'moment';

export const enum EtatAppointment {
  Active = 'Active',
  EnAttente = 'EnAttente',
  Annuler = 'Annuler',
  Reporte = 'Reporte'
}

export interface IAppointment {
  id?: number;
  date?: Moment;
  time?: string;
  location?: string;
  numTable?: number;
  etat?: EtatAppointment;
  host?: number;
  guest?: number;
}

export class Appointment implements IAppointment {
  constructor(
    public id?: number,
    public date?: Moment,
    public time?: string,
    public location?: string,
    public numTable?: number,
    public etat?: EtatAppointment,
    public host?: number,
    public guest?: number
  ) {}
}
