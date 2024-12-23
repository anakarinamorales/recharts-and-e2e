import SingleMeterChart from '@/components/Chart/SingleMeterChart';
import PageLayout from '@/components/PageLayout';
import { useMetersContext } from '@/context/useMetersContext';

export default function Home() {
  const { meters, queryError } = useMetersContext();

  // console.log();

  return (
    <PageLayout>
      <h1>Overview</h1>
      {!meters && !queryError && <div>Loading...</div>}
      {!queryError &&
        meters?.map((meter) => (
          <>
            <h2>{ meter.name}</h2>
            <SingleMeterChart key={meter.name + meter.id} meter={meter} />
          </>
        ))}
    </PageLayout>
  );
}
