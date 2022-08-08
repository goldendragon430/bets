import styled from 'styled-components';

const Button = styled.button<{ color?: string }>`
  color: ${({ theme, color }) => color || theme.colors.white};
  background: transparent;
  border: 2px solid ${({ theme, color }) => color || theme.colors.white};
  border-radius: 0.75rem;
  padding: 0.8rem 1.2rem;
  font-family: ${({ theme }) => theme.typography.regular.fontFamily};
  font-weight: ${({ theme }) => theme.typography.regular.fontWeight};
  font-style: ${({ theme }) => theme.typography.regular.fontStyle};
  font-size: ${({ theme }) => theme.typography.regular.fontSize};
  line-height: ${({ theme }) => theme.typography.regular.fontSize};
  text-transform: uppercase;
  text-shadow: 0px 0px 11px ${({ theme, color }) => color || theme.colors.white};
  filter: drop-shadow(0px 0px 11px ${({ theme, color }) => color || theme.colors.white});
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export default Button;
