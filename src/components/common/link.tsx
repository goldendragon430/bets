import styled from 'styled-components';

const StyledLink = styled.a`
  cursor: cursor;

  &:disabled {
    cursor: not-allowed;
  }
`;

export default StyledLink;
