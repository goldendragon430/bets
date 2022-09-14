/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';

import { Typography, TypographyType } from '../../components/common/typography';
import { useTheme } from '../../contexts/theme_context';
import { BattleDetailType } from '../../types';
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
  align-items: center;
  border-bottom: 1px solid ${({ color }) => color};
`;

const TeamLogo = styled.img<{ color: string }>`
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  filter: drop-shadow(0px 0px 0.6875rem ${({ color }) => color});
  margin-right: 1rem;
`;

const ContentText = styled(Typography)`
  // white-space: nowrap;
`;

interface IEventList extends BattleDetailType {
  color: string;
}

const EventList: React.FC<IEventList> = ({ battleEvents, battleInfo, color }) => {
  const { theme } = useTheme();

  return (
    <Container>
      <Wrapper color={color}>
        {[...battleEvents].reverse().map((event, key) => (
          <EventItem color={color} key={key}>
            {battleInfo && (
              <TeamLogo
                alt=""
                color={!event.side ? theme.colors.orange1 : theme.colors.blue1}
                src={!event.side ? battleInfo.projectL.logo : battleInfo.projectR.logo}
              />
            )}

            <ContentText type={TypographyType.REGULAR}>
              Alpha {getShortWalletAddress(event.user)}
              {event.action === 'Betted' ? ' placed a bet' : ' staked NFT(s)'}
            </ContentText>
          </EventItem>
        ))}
      </Wrapper>
    </Container>
  );
};

export default EventList;
