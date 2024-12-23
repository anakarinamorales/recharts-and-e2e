export enum FORM_INPUTS {
  DATETIME = 'datetime',
  KWH = 'kwh',
}

export type MeterIntervalFormInputs = {
  datetime: string;
  kwh: number;
};

export type Notification = { message?: string };
