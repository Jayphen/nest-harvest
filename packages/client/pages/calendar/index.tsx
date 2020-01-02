import { NextPage } from 'next';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { fetchWrapper } from '../../utils/fetchWrapper';
import { css } from 'astroturf';

css`
  :global {
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      background: #f7f4fa;
    }
  }
`;

const styles = css`
  .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1em;
    max-width: 80em;

    > div {
      padding: 1em;
      background: white;
      border-radius: 10px;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.01), 0 2px 2px rgba(0, 0, 0, 0.01), 0 4px 4px rgba(0, 0, 0, 0.01), 0 6px 8px rgba(0, 0, 0, 0.01),
        0 8px 16px rgba(0, 0, 0, 0.01);
    }
  }
`;

type Props = {
  months: any[];
  pathname: string;
  passedThisMonth: { days: number; hours: number };
};

const WithInitialProps: NextPage<Props> = ({ months, passedThisMonth, pathname }) => (
  <Layout title="Users List | Next.js + TypeScript Example">
    API: {process.env.API}
    <p>You are currently on: {pathname}</p>
    <div className={styles.wrapper}>
      {months.map(month => {
        return (
          <div>
            <strong>
              {month.monthName} - {month.workDays} days
            </strong>
            <br />
            Work hours: {month.workHours}
            <br />
            Worked: {month.totalHours}
            <br />
            Difference:{' '}
            <span style={{ color: month.overtime ? 'red' : 'green' }}>
              {month.overtime ? '+' : ''}
              {month.difference}
            </span>
            {month.isCurrentMonth && (
              <>
                <br />
                <br />
                {passedThisMonth.days} work days have passed and you've worked {month.totalHours} hours.
                {passedThisMonth.hours < month.totalHours && (
                  <>
                    <br />
                    That's {(month.totalHours - passedThisMonth.hours).toPrecision(2)} hours overtime. Maybe you should take a break!
                  </>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
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
  const passedThisMonth: { days: number; hours: number } = await fetchWrapper(`${API}/calendar/days-passed`);

  months = months.map((month, index) => ({
    ...month,
    totalHours: totals[index],
    overtime: totals[index] > month.workHours,
    difference: (totals[index] - month.workHours).toPrecision(4),
  }));

  return { months, passedThisMonth, pathname };
};

export default WithInitialProps;
