/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
import { useEffect, useMemo, useState } from 'react';
import { Column } from 'react-table';

import styled from 'styled-components';

import AbpIcon from '../../assets/images/abp_icon.svg';
import EthIcon from '../../assets/images/eth_icon.svg';
import Button from '../../components/common/button';
import ProfileImage from '../../components/common/profile_image';
import Table from '../../components/common/table';
import { Typography, TypographyType } from '../../components/common/typography';
import { getLeaderboard } from '../../services';
import { getNftImageUrl, getShortWalletAddress } from '../../utils';

const Container = styled.div`
  width: 100%;
  padding: 2rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ theme }) => `${theme.media_width.upToSmall} {
    flex-direction: column;
  }`};
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

  ${({ theme }) => `${theme.media_width.upToSmall} {
    margin-left: 0;
    margin-top: 1rem;
    width: 100%;
  }`};
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const UserProfile = styled(ProfileImage)`
  min-width: 2.5rem !important;
  min-height: 2.5rem !important;
  width: 2.5rem !important;
  height: 2.5rem !important;
  margin-right: 1rem;
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
        width: 120,
        accessor: (info: any) => (
          <Flex>
            <UserProfile
              userImg={info.userInfo?.selectedNFT && getNftImageUrl(info.userInfo.selectedNFT.image || '')}
            />
            {getShortWalletAddress(info.userInfo?.username || info.user)}
          </Flex>
        ),
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
