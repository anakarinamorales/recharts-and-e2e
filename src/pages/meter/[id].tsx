import { useRef } from 'react';
import { useRouter } from 'next/router';

import { toggleDialog } from '@/components/ModalDialog';
import { useMetersContext } from '@/context/useMetersContext';
import Button from '@/components/Button';
import MeterIntervalForm from '@/components/MeterIntervalForm';
import PageLayout from '@/components/PageLayout';
import SingleMeterChart from '@/components/Chart/SingleMeterChart';

export default function MeterData() {
  const router = useRouter();
  const { meters } = useMetersContext();
  const meter = meters?.find((item) => item.id === router.query.id) || null;
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <PageLayout>
      <h1>Meter Data</h1>
      <Button
        type='button'
        onClick={() => {
          toggleDialog(dialogRef);
        }}
      >
        Update meter data
      </Button>
      <MeterIntervalForm dialogRef={dialogRef} />
      {meters && !meter ? (
        <span>
          Oops! We are currently unable to find the meter you requested.
        </span>
      ) : (
        <SingleMeterChart meter={meter} />
      )}
    </PageLayout>
  );
}
