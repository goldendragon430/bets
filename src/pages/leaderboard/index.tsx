/* eslint-disable no-console */
import { useEffect, useMemo, useState } from 'react';
import { Column } from 'react-table';

import styled from 'styled-components';

import Table from '../../components/common/table';
import { getLeaderboard } from '../../services';
import { getShortWalletAddress } from '../../utils';

const Container = styled.div`
  width: 100%;
  padding: 2rem;
`;

const Leaderboard = () => {
  const columns: Column[] = useMemo(
    () => [
      {
        Header: 'Rank',
        width: 40,
        accessor: (_, index) => <span>{(index + 1).toLocaleString()}</span>,
      },
      {
        Header: 'User',
        accessor: 'user',
        width: 120,
        Cell: ({ value }) => <span>{getShortWalletAddress(value)}</span>,
      },
      {
        Header: '$ABP',
        accessor: 'amount',
        width: 80,
        Cell: ({ value }) => <span>{value.toLocaleString()}</span>,
      },
    ],
    []
  );

  const [data, setData] = useState<any[]>([]);

  const updateLeaderboardData = async () => {
    try {
      const res = await getLeaderboard();
      if (res.data.data) {
        setData(res.data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    updateLeaderboardData();
  }, []);

  return (
    <Container>
      <Table columns={columns} data={data} itemSize="6rem" />
    </Container>
  );
};

export default Leaderboard;
