/* eslint-disable react/no-array-index-key */
import { useMemo } from 'react';
import { Column } from 'react-table';

import styled from 'styled-components';

import EthIcon from '../../assets/images/eth_icon.svg';
import Table from '../../components/common/table';
import { Typography, TypographyType } from '../../components/common/typography';
import { useTheme } from '../../contexts/theme_context';
import { BattleDetailType } from '../../types';
import { formatTime, getShortWalletAddress } from '../../utils';

const Container = styled.div`
  width: 100%;
`;

const EventItem = styled.div`
  display: flex;
  align-items: center;
`;

const TeamLogo = styled.img<{ color: string }>`
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  filter: drop-shadow(0px 0px 0.2rem ${({ color }) => color});
  margin-right: 1rem;
`;

const ContentText = styled(Typography)`
  // white-space: nowrap;
`;

const EthImg = styled.img`
  height: 2rem;
`;

interface IEventList extends BattleDetailType {
  color: string;
}

const EventList: React.FC<IEventList> = ({ battleEvents, battleInfo }) => {
  const { theme } = useTheme();

  const columns: Column[] = useMemo(
    () => [
      {
        Header: 'Action',
        width: 120,
        accessor: (event: any) => (
          <EventItem>
            <TeamLogo
              alt=""
              color={!event.side ? theme.colors.orange1 : theme.colors.blue1}
              src={!event.side ? battleInfo?.projectL.logo : battleInfo?.projectR.logo}
            />
            <ContentText type={TypographyType.REGULAR}>
              Alpha {getShortWalletAddress(event.user)}
              {event.action === 'Betted' ? ' placed a bet' : ' staked NFT(s)'}
            </ContentText>
          </EventItem>
        ),
      },
      {
        Header: 'Amount',
        width: 40,
        accessor: (event: any) => (
          <EventItem>
            <ContentText type={TypographyType.REGULAR}>
              {event.amount.toLocaleString()}
              {event.action === 'Betted' ? <EthImg alt="" src={EthIcon} /> : ' NFT(s)'}
            </ContentText>
          </EventItem>
        ),
      },
      {
        Header: 'Time',
        width: 40,
        accessor: (event: any) => (
          <EventItem>
            <ContentText type={TypographyType.REGULAR}>{formatTime(new Date(event.timestamp))} ago</ContentText>
          </EventItem>
        ),
      },
    ],
    [battleInfo, theme]
  );

  return (
    <Container>
      <Table columns={columns} data={[...battleEvents].reverse()} hideHeader itemSize="5rem" />
    </Container>
  );
};

export default EventList;
