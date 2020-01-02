import { NextPage } from 'next';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { sampleFetchWrapper } from '../../utils/sample-api';

type Props = {
  months: any[];
  pathname: string;
};

const WithInitialProps: NextPage<Props> = ({ months, pathname }) => (
  <Layout title="Users List | Next.js + TypeScript Example">
    <h1>Users List</h1>
    <p>
      Example fetching data from inside <code>getInitialProps()</code>.
    </p>
    <p>You are currently on: {pathname}</p>
    {months.map(month => {
      return (
        <div style={{ marginBottom: '2em' }}>
          <strong>{month.monthName}</strong>
          <br />
          Work days: {month.workDays}
          <br />
          Work hours: {month.workHours}
          <br />
          Worked: {month.totalHours}
          <br />
          Difference: <span style={{ color: month.overtime ? 'red' : 'green' }}>{month.difference}</span>
        </div>
      );
    })}
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>

    <div>
      <h2>debug</h2>
      <pre>{JSON.stringify(months, null, 2)}</pre>
    </div>
  </Layout>
);

WithInitialProps.getInitialProps = async ({ pathname }) => {
  // Example for including initial props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  let months: any[] = await sampleFetchWrapper('http://localhost:3001/calendar');
  const totals: number[] = await sampleFetchWrapper('http://localhost:3001/time-entries/totals/2020');

  console.log(totals);
  months = months.map((month, index) => ({
    ...month,
    totalHours: totals[index],
    overtime: totals[index] > month.workHours,
    difference: (totals[index] - month.workHours).toPrecision(4),
  }));

  return { months, pathname };
};

export default WithInitialProps;
