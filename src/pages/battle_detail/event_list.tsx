/* eslint-disable react/no-array-index-key */
import { useEffect, useMemo, useState } from 'react';
import { Column } from 'react-table';

import styled from 'styled-components';

import ArrowIcon from '../../assets/images/arrow.svg';
import EthIcon from '../../assets/images/eth_icon.svg';
import Table from '../../components/common/table';
import { Typography, TypographyType } from '../../components/common/typography';
import { useTheme } from '../../contexts/theme_context';
import { BattleDetailType, BattleEvent } from '../../types';
import { formatTime, getShortWalletAddress } from '../../utils';
import { getChanceValue } from '../../utils/battle';

const Container = styled.div`
  width: 100%;
`;

const EventItem = styled.div<{ flexEnd?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  ${({ flexEnd }) => flexEnd && `justify-content: flex-end; text-align: right`}
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

const ArrowImg = styled.div<{ side: boolean }>`
  height: 1rem;
  margin-left: 2rem;
  min-width: 42px;
  min-height: 27px;
  zoom: 0.5;

  background-color: ${({ theme, side }) => (!side ? theme.colors.orange1 : theme.colors.blue1)};
  -webkit-mask: url(${ArrowIcon}) no-repeat center;
  mask: url(${ArrowIcon}) no-repeat center;
`;

interface IEventList extends BattleDetailType {
  color: string;
}

interface BattleEventWithChance extends BattleEvent {
  totalBetAmountA: number;
  totalBetAmountB: number;
  totalNftStakedA: number;
  totalNftStakedB: number;
}

const EventList: React.FC<IEventList> = ({ battleEvents, battleInfo }) => {
  const { theme } = useTheme();

  const [data, setData] = useState<BattleEventWithChance[]>([]);

  useEffect(() => {
    let totalBetAmountA = 0;
    let totalBetAmountB = 0;
    let totalNftStakedA = 0;
    let totalNftStakedB = 0;
    const newData: BattleEventWithChance[] = [];

    battleEvents.forEach((event) => {
      if (event.action === 'Betted') {
        if (!event.side) {
          totalBetAmountA += event.amount;
        } else {
          totalBetAmountB += event.amount;
        }
      } else if (!event.side) {
        totalNftStakedA += event.amount;
      } else {
        totalNftStakedB += event.amount;
      }

      newData.push({ ...event, totalBetAmountA, totalBetAmountB, totalNftStakedA, totalNftStakedB });
    });

    setData([...newData].reverse());
  }, [battleEvents]);

  const columns: Column[] = useMemo(
    () => [
      {
        Header: 'Action',
        width: 250,
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
        width: 100,
        accessor: (event: any) => (
          <EventItem flexEnd>
            <ContentText type={TypographyType.REGULAR}>
              {event.amount.toLocaleString()}
              {event.action === 'Betted' ? <EthImg alt="" src={EthIcon} /> : ' NFT(s)'}
            </ContentText>
          </EventItem>
        ),
      },
      {
        Header: 'Chance',
        width: 100,
        accessor: (event: any) => (
          <EventItem flexEnd>
            <ContentText type={TypographyType.REGULAR}>
              {Math.round(
                getChanceValue(
                  event.totalBetAmountA,
                  event.totalBetAmountB,
                  event.totalNftStakedA,
                  event.totalNftStakedB,
                  event.side
                ) * 100
              )}
              %
            </ContentText>
            <ArrowImg side={event.side} />
          </EventItem>
        ),
      },
      {
        Header: 'Time',
        width: 100,
        accessor: (event: any) => (
          <EventItem flexEnd>
            <ContentText type={TypographyType.REGULAR}>{formatTime(new Date(event.timestamp))} ago</ContentText>
          </EventItem>
        ),
      },
    ],
    [battleInfo, theme]
  );

  return (
    <Container>
      <Table columns={columns} data={data} hideHeader itemSize="5rem" />
    </Container>
  );
};

export default EventList;
