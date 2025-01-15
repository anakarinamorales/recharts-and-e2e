import Chart from '@/components/Chart/MultipleMeters';
import PageLayout from '@/components/PageLayout';
import { useMetersContext } from '@/context/useMetersContext';

export default function Home() {
  const { meters, queryError } = useMetersContext();

  return (
    <PageLayout>
      <h1>Overview</h1>
      {!meters && !queryError && <div>Loading...</div>}
      {!queryError && <Chart />}
    </PageLayout>
  );
}
