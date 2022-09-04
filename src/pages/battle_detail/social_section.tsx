// import { useState } from 'react';

import styled from 'styled-components';

import { useTheme } from '../../contexts/theme_context';
import { BattleEvent } from '../../types';
import EventList from './event_list';
import TweetSection from './tweet_section';

const Container = styled.div`
  width: 100%;
  padding: 4rem;
  display: flex;
  justify-content: space-between;

  ${({ theme }) => `${theme.media_width.upToMedium} {
    flex-direction: column;
    align-items: center;
  }`};
`;

const Wrapper = styled.div`
  flex: 1;

  ${({ theme }) => `${theme.media_width.upToMedium} {
    width: 100%;
  }`};
`;

interface ISocialSection {
  battleEvents: BattleEvent[];
}

const SocialSection: React.FC<ISocialSection> = ({ battleEvents }) => {
  const { theme } = useTheme();

  return (
    <Container>
      <Wrapper>
        <EventList battleEvents={battleEvents} color={theme.colors.green2} />
      </Wrapper>

      <div style={{ minWidth: '2rem', minHeight: '2rem' }} />

      <Wrapper>
        <TweetSection color={theme.colors.green2} />
      </Wrapper>
    </Container>
  );
};
export default SocialSection;
