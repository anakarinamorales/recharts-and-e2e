import { RefObject, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { getTzDate } from '@/utils';
import { updateMeterData } from '@/pages/api/metersData';
import { useMetersContext } from '@/context/useMetersContext';
import Button from '@/components/Button';
import Dialog, { toggleDialog } from '@/components/ModalDialog';

import type { MeterIntervalFormInputs, Notification } from './types';

import styles from '@/components/MeterIntervalForm/MeterIntervalForm.module.css';

export enum FORM_INPUTS {
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
  const meter = meters?.find((item) => item.id === router.query.id) || null; // selects the meter related to this page

  //form events/data
  const { register, handleSubmit, getValues, setValue, reset } =
    useForm<MeterIntervalFormInputs>();

  const notificationRef = useRef<HTMLDialogElement | null>(null); // used to manage the notification dialog
  const [notification, setNotification] = useState<Notification>(() => ({})); // stores the message (success/ error) used by the notification dialog

  const onSubmit: SubmitHandler<MeterIntervalFormInputs> = async () => {
    try {
      // gets the values from the form timestamp input & kwh input
      const timestamp = new Date(getValues(FORM_INPUTS.DATETIME)).getTime();
      const kwh = getValues(FORM_INPUTS.KWH);

      // calling the api to add the interval data
      await updateMeterData(
        JSON.stringify({
          kwh,
          timestamp,
        }),
        router.query.id as string
      );

      reset(); // resets form data when finished
      setMeterDataWasUpdated(true); // flags the useMetersContext to update itseft with the new data (useEffect)
      // notificationRef?.current?.value = 'New interval added with success!';
      setNotification({ message: 'New interval added with success!' }); // changes the notification message
      toggleDialog(notificationRef); // opens the notification dialog with the success message
    } catch (error) {
      console.error(error);
      setNotification({ message: `Oops! Error while adding interval.` }); // if there was an error fetching the data, changes the notification message
      toggleDialog(notificationRef); // opens the notification dialog with the error message
    }
  };

  // function used for the button "now" in the form
  // fills in the date input with the current date/time
  function setDateToNow() {
    const tzDate = getTzDate(new Date());

    // input type="datetime-local" expects "yyyy-MM-ddTHH:mm:ss"
    setValue('datetime', tzDate.replace(' ', 'T'));
  }

  return (
    <Dialog
      ref={dialogRef}
      toggleDialog={() => {
        toggleDialog(dialogRef);
      }}
    >
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Adding new interval to {meter?.name}</h1>
        <label className={styles.kwhLabel} htmlFor={FORM_INPUTS.KWH}>
          Consupmtion (kwh)
        </label>
        <input
          autoFocus
          className={styles.kwhInput}
          id={FORM_INPUTS.KWH}
          type='number'
          {...register(FORM_INPUTS.KWH, {
            required: 'Consumption cannot be empty',
          })}
        />
        <label className={styles.datetimeLabel} htmlFor={FORM_INPUTS.DATETIME}>
          Date
        </label>
        <input
          className={styles.datetimeInput}
          id={FORM_INPUTS.DATETIME}
          max='2100-12-31'
          min='1970-01-01'
          step='1'
          type='datetime-local'
          {...register(FORM_INPUTS.DATETIME, {
            required: 'Date cannot be empty',
          })}
        />
        <Button className={styles.nowBtn} onClick={setDateToNow} type='button'>
          Now
        </Button>
        <Button className={styles.submitBtn} type='submit'>
          Submit
        </Button>
        <Dialog
          ref={notificationRef}
          toggleDialog={() => {
            toggleDialog(notificationRef);
          }}
        >
          {notification.message}
        </Dialog>
      </form>
    </Dialog>
  );
}
