import { NextPage } from 'next';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { fetchWrapper } from '../../utils/fetchWrapper';

type Props = {
  months: any[];
  pathname: string;
};

const WithInitialProps: NextPage<Props> = ({ months, pathname }) => (
  <Layout title="Users List | Next.js + TypeScript Example">
    API: {process.env.API}
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
  const { API } = process.env;

  let months: any[] = await fetchWrapper(`${API}/calendar`);
  const totals: number[] = await fetchWrapper(`${API}/time-entries/totals/2020`);

  months = months.map((month, index) => ({
    ...month,
    totalHours: totals[index],
    overtime: totals[index] > month.workHours,
    difference: (totals[index] - month.workHours).toPrecision(4),
  }));

  return { months, pathname };
};

export default WithInitialProps;
