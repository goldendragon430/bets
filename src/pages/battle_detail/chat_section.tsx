import styled from 'styled-components';

import Roomlio from '../../components/roomlio';

const Container = styled.div<{ visible: boolean }>`
  width: 100%;
  height: 30rem;
  overflow: hidden;

  ${({ visible }) => !visible && `display: none;`}
`;

interface IChatSection {
  visible: boolean;
}

const ChatSection: React.FC<IChatSection> = ({ visible }) => (
  <Container visible={visible}>
    <Roomlio />
  </Container>
);

export default ChatSection;
