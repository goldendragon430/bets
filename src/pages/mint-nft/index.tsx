import styled from 'styled-components';

import Button from '../../components/common/button';
import { useTheme } from '../../contexts/theme_context';

const Container = styled.div`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MintButton = styled(Button)`
  margin: 1rem;
`;

const MintNFT = () => {
  const { theme } = useTheme();

  return (
    <Container>
      <MintButton color={theme.colors.red1}>Mint for Team A</MintButton>
      <MintButton color={theme.colors.blue1}>Mint for Team B</MintButton>
    </Container>
  );
};

export default MintNFT;
