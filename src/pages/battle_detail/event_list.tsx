/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import ArrowIcon from '../../assets/images/arrow.svg';
import EthIcon from '../../assets/images/eth_icon.svg';
import { Typography, TypographyType } from '../../components/common/typography';
import { useTheme } from '../../contexts/theme_context';
import { BattleDetailType, BattleEvent } from '../../types';
import { formatTime, getShortWalletAddress } from '../../utils';
import { getChanceValue } from '../../utils/battle';

const Container = styled.div`
  width: 100%;
  height: 30rem;
  border-top: 1px solid ${({ theme }) => theme.colors.white};
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, ${({ theme }) => `${theme.colors.grey2}88`} 100%);
  overflow-x: hidden;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #ffffff10;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #fff;
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
`;

const EventItemWrapper = styled.div`
  width: 100%;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey2};
`;

const EventItem = styled.div<{ flexEnd?: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  ${({ flexEnd }) => flexEnd && `justify-content: flex-end; text-align: right`}
`;

const ItemWrapper = styled(EventItem)`
  width: 100%;
  justify-content: space-between;

  ${({ theme }) => `${theme.media_width.upToSmall} {
    flex-direction: column;
    align-items: flex-start;
  }`};
`;

const StatsWrapper = styled(EventItem)`
  flex: 3;
  justify-content: space-between;

  ${({ theme }) => `${theme.media_width.upToSmall} {
    width: 100%;
    border-top: 1px solid ${theme.colors.grey2};

    >:first-child {
      justify-content: flex-start !important;
      text-align: left !important;
    }
  }`};
`;

const TeamLogo = styled.img<{ color: string }>`
  width: 2rem;
  height: 2rem;
  min-width: 2rem;
  min-height: 2rem;
  border-radius: 0.5rem;
  filter: drop-shadow(0px 0px 0.2rem ${({ color }) => color});
  margin-right: 1rem;

  ${({ theme }) => `${theme.media_width.upToSmall} {
    width: 3rem;
    height: 3rem;
    min-width: 3rem;
    min-height: 3rem;
  }`};
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

  return (
    <Container>
      {data.map((event, key) => (
        <EventItemWrapper key={key}>
          <TeamLogo
            alt=""
            color={!event.side ? theme.colors.orange1 : theme.colors.blue1}
            src={!event.side ? battleInfo?.projectL.logo : battleInfo?.projectR.logo}
          />

          <ItemWrapper>
            <EventItem style={{ flex: 2 }}>
              <ContentText type={TypographyType.REGULAR}>
                {getShortWalletAddress(event.userInfo?.username || event.user)}
                {event.action === 'Betted' ? ' placed a bet' : ' staked NFT(s)'}
              </ContentText>
            </EventItem>

            <StatsWrapper>
              <EventItem flexEnd>
                <ContentText type={TypographyType.REGULAR}>
                  {event.amount.toLocaleString()}
                  {event.action === 'Betted' ? <EthImg alt="" src={EthIcon} /> : ' NFT(s)'}
                </ContentText>
              </EventItem>

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

              <EventItem flexEnd>
                <ContentText type={TypographyType.REGULAR}>{formatTime(new Date(event.timestamp))} ago</ContentText>
              </EventItem>
            </StatsWrapper>
          </ItemWrapper>
        </EventItemWrapper>
      ))}
    </Container>
  );
};

export default EventList;
