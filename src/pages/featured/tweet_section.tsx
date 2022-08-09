import styled from 'styled-components';

import { useTheme } from '../../contexts/theme_context';
import { TWEET_LIST } from '../../mocks/tweets';
import TweetList from './tweet_list';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3rem;

  ${({ theme }) => `${theme.media_width.upToMedium} {
    flex-direction: column;
  }`}
`;

const TweetSection: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Container>
      <TweetList color={theme.colors.red1} tweets={TWEET_LIST} />
      <div style={{ minWidth: '10rem', minHeight: '10rem' }} />
      <TweetList color={theme.colors.blue1} tweets={TWEET_LIST} />
    </Container>
  );
};

export default TweetSection;
