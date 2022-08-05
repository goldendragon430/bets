import styled from 'styled-components';

const Button = styled.button`
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.red1};
  border: none;
  border-radius: 12px;
  padding: 0.8rem 1.2rem;
  font-weight: ${({ theme }) => theme.typography.regular.fontWeight};
  font-size: ${({ theme }) => theme.typography.regular.fontSize};
  line-height: ${({ theme }) => theme.typography.regular.fontSize};
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
