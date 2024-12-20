import MultipleMetersChart from '@/components/Chart/MultipleMetersChart';
import PageLayout from '@/components/PageLayout';
import { useMetersContext } from '@/context/useMetersContext';

export default function Home() {
  const { meters, queryError } = useMetersContext();

  return (
    <PageLayout>
      <h1>Homepage</h1>
      {!meters && !queryError && <div>Loading...</div>}
      {!queryError && <MultipleMetersChart />}
    </PageLayout>
  );
}
