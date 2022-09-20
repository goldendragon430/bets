/* eslint-disable no-console */
import { useEffect, useMemo, useState } from 'react';
import { Column } from 'react-table';

import styled from 'styled-components';

import AbpIcon from '../../assets/images/abp_icon.svg';
import EthIcon from '../../assets/images/eth_icon.svg';
import Button from '../../components/common/button';
import Table from '../../components/common/table';
import { Typography, TypographyType } from '../../components/common/typography';
import { getLeaderboard } from '../../services';
import { getShortWalletAddress } from '../../utils';

const Container = styled.div`
  width: 100%;
  padding: 2rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountWrapper = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 2rem;
    margin-right: 0.5rem;
  }
`;

const TabButton = styled(Button)<{ isActive: boolean }>`
  margin-left: 1rem;
  font-size: 1.5rem;
  ${({ isActive }) => !isActive && `opacity: 0.5;`}
`;

const Leaderboard = () => {
  const columns: Column[] = useMemo(
    () => [
      {
        Header: 'RANK',
        width: 40,
        accessor: (_, index) => <span>{(index + 1).toLocaleString()}</span>,
      },
      {
        Header: 'USER',
        accessor: 'user',
        width: 120,
        Cell: ({ value }) => <span>{getShortWalletAddress(value)}</span>,
      },
      {
        Header: 'WINS',
        accessor: 'ethAmount',
        width: 80,
        Cell: ({ value }) => (
          <AmountWrapper>
            <img alt="" src={EthIcon} />
            <span>{value.toLocaleString()}</span>
          </AmountWrapper>
        ),
      },
      {
        Header: '$ABP',
        accessor: 'abpAmount',
        width: 80,
        Cell: ({ value }) => (
          <AmountWrapper>
            <img alt="" src={AbpIcon} />
            <span>{value.toLocaleString()}</span>
          </AmountWrapper>
        ),
      },
    ],
    []
  );

  const [sortByAbp, setSortByAbp] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [dispData, setDispData] = useState<any[]>([]);

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

  useEffect(() => {
    const newData = [...data].sort((a, b) => (sortByAbp ? b.abpAmount - a.abpAmount : b.ethAmount - a.ethAmount));
    setDispData(newData);
  }, [data, sortByAbp]);

  return (
    <Container>
      <Wrapper style={{ marginBottom: '1rem' }}>
        <Typography shadow type={TypographyType.BOLD_SUBTITLE}>
          Leaderboard
        </Typography>

        <Wrapper>
          <TabButton isActive={!sortByAbp} onClick={() => setSortByAbp(false)}>
            Sort by winnings
          </TabButton>
          <TabButton isActive={sortByAbp} onClick={() => setSortByAbp(true)}>
            Sort by ABP Rank
          </TabButton>
        </Wrapper>
      </Wrapper>

      <Table columns={columns} data={dispData} itemSize="5rem" />
    </Container>
  );
};

export default Leaderboard;
