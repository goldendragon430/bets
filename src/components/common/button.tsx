import styled from 'styled-components';

const Button = styled.button<{ shadow?: boolean; color?: string; fontColor?: string }>`
  color: ${({ theme, fontColor }) => fontColor || theme.colors.black};
  background: ${({ theme, color }) => color || theme.colors.white};
  border: none;
  border-radius: 0.75rem;
  padding: 0.8rem 1.2rem;
  font-family: ${({ theme }) => theme.typography.regularTitle.fontFamily};
  font-weight: ${({ theme }) => theme.typography.regularTitle.fontWeight};
  font-style: ${({ theme }) => theme.typography.regularTitle.fontStyle};
  font-size: ${({ theme }) => theme.typography.regularTitle.fontSize};
  line-height: ${({ theme }) => theme.typography.regularTitle.fontSize};
  text-transform: uppercase;
  cursor: pointer;
  ${({ theme, color, shadow }) => shadow && `filter: drop-shadow(0px 0px 0.6875rem ${color || theme.colors.white});`}

  &:disabled {
    cursor: not-allowed;
  }
`;

export default Button;
