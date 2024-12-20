import Dialog, { toggleDialog } from '@/components/ModalDialog';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RefObject } from 'react';
import { useRouter } from 'next/router';
import { useMetersContext } from '@/context/useMetersContext';

import styles from './MeterIntervalForm.module.css';
import Button from '../Button';

type MeterIntervalFormInputs = {
  datetime: string;
  kwh: number;
};

enum FORM_INPUTS {
  DATETIME = 'datetime',
  KWH = 'kwh',
}

export default function MeterIntervalForm({
  dialogRef,
}: {
  dialogRef: RefObject<HTMLDialogElement | null>;
}) {
  const router = useRouter();
  const { meters, setMeterDataWasUpdated } = useMetersContext();
  const meter = meters?.find((item) => item.id === router.query.id) || null;
  const { register, handleSubmit, getValues, setValue, reset } =
    useForm<MeterIntervalFormInputs>();

  const updateMeterData = async () => {
    // hit api here sending datetime as isosString
    const datetime = new Date(getValues(FORM_INPUTS.DATETIME)).toISOString();
    const kwh = getValues(FORM_INPUTS.KWH);
    const interval = { kwh, datetime };

    if (router.query.id) {
      try {
        const res = await fetch(
          `http://localhost:3001/meters/${router.query.id}`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              kwh: Number(interval.kwh),
              datetime: interval.datetime,
            }),
          }
        );

        const data = await res.json();

        if (res.status === 404) {
          throw new Error(data.message);
        }

        return data;
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onSubmit: SubmitHandler<MeterIntervalFormInputs> = () => {
    const newData = updateMeterData();
    newData.then((res) => console.log(1111, res));
    reset(); // resets form data
    setMeterDataWasUpdated(true); // since we're using the data from the conxext, flags it to update itseft with the new data (no page reload needed)
  };

  function setDateToNow() {
    const now = new Date();
    const isoString = now.toISOString();
    setValue('datetime', isoString.substring(0, isoString.indexOf('T') + 9)); // + 9 to get the seconds too
  }

  return (
    <Dialog
      toggleDialog={() => {
        toggleDialog(dialogRef);
      }}
      ref={dialogRef}
    >
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Adding new interval to {meter?.name}</h1>
        <label className={styles.kwhLabel} htmlFor={FORM_INPUTS.KWH}>
          Consupmtion (kwh)
        </label>
        <input
          autoFocus
          className={styles.kwhInput}
          type='number'
          {...register(FORM_INPUTS.KWH, { required: true })}
        />
        <label className={styles.datetimeLabel} htmlFor={FORM_INPUTS.DATETIME}>
          Date
        </label>
        <input
          className={styles.datetimeInput}
          max='2100-12-31'
          min='1970-01-01'
          step='1'
          type='datetime-local'
          {...register(FORM_INPUTS.DATETIME)}
        />
        <Button className={styles.nowBtn} onClick={setDateToNow} type='button'>
          Now
        </Button>
        <Button className={styles.submitBtn} type='submit'>
          Submit
        </Button>
      </form>
    </Dialog>
  );
}
