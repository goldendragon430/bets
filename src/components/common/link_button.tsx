import styled from 'styled-components';

const StyledLink = styled.a<{ disabled?: boolean }>`
  text-decoration: none;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text1};

  &:active,
  &:hover {
    color: ${({ theme }) => theme.colors.text1};
  }

  ${({ disabled }) =>
    disabled &&
    `
    cursor: not-allowed;
    opacity: 0.5;
  `}
`;

const StyledButton = styled.button`
  text-decoration: none;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text1};
  cursor: pointer;
  border: none;
  outline: none;
  background: transparent;

  &:active,
  &:hover {
    color: ${({ theme }) => theme.colors.text1};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

interface ILinkButton {
  href?: string;
  disabled?: boolean;
  children: any;
}

const LinkButton: React.FC<ILinkButton> = ({ href, disabled, children }) =>
  href ? (
    <StyledLink disabled={disabled} href={href} target="_blank">
      {children}
    </StyledLink>
  ) : (
    <StyledButton disabled={disabled}>{children}</StyledButton>
  );

export default LinkButton;
