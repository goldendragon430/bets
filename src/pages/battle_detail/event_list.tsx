/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';

import { Typography, TypographyType } from '../../components/common/typography';
import { BattleEvent } from '../../types';
import { getShortWalletAddress } from '../../utils';

const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled.div<{ color: string }>`
  width: 100%;
  height: 30rem;
  overflow-x: hidden;
  overflow-y: auto;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, ${({ color }) => `${color}88`} 100%);

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

const EventItem = styled.div<{ color: string }>`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem 3rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid ${({ color }) => color};
`;

const ContentText = styled(Typography)`
  // white-space: nowrap;
`;

const FilteredText = styled.span`
  color: ${({ theme }) => theme.colors.blue2};
`;

interface IEventList {
  battleEvents: BattleEvent[];
  color: string;
}

const EventList: React.FC<IEventList> = ({ battleEvents, color }) => (
  <Container>
    {/* <Typography shadow type={TypographyType.BOLD_SUBTITLE}>
      Events
    </Typography> */}

    <Wrapper color={color}>
      {[...battleEvents].reverse().map((event, key) => (
        <EventItem color={color} key={key}>
          <ContentText type={TypographyType.REGULAR}>
            <FilteredText>Alpha {getShortWalletAddress(event.user)}</FilteredText>
            {event.action === 'Betted' ? ' bets ' : ' stakes '}
            <FilteredText>{event.amount.toLocaleString()}</FilteredText>
            {event.action === 'Betted' ? ' ETH ' : ' NFT(s) '}
            on <FilteredText>{event.subTeamName}</FilteredText>
          </ContentText>
        </EventItem>
      ))}
    </Wrapper>
  </Container>
);

export default EventList;
