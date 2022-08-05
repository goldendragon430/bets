/* eslint-disable react/jsx-props-no-spreading */
import styled from 'styled-components';

import Button from './button';
import { Typography, TypographyType } from './typography';

const Container = styled.div`
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.black};
  display: flex;
  align-items: center;
`;

const CustomInput = styled.input`
  width: 100%;
  height: 100%;
  background: transparent;
  outline: none;
  border: none;
  font-size: ${({ theme }) => theme.typography.regular.fontSize};
  padding: 1rem;
`;

const MaxButton = styled(Button)`
  background: transparent;
  color: ${({ theme }) => theme.colors.red1};
  padding-left: 1rem;
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onMax?: () => void;
}

const Input: React.FC<InputProps> = ({ style, className, onMax, ...props }) => (
  <Container className={className} style={style}>
    <CustomInput {...props} />
    {onMax && (
      <>
        <Typography type={TypographyType.BOLD_TITLE}>|</Typography>
        <MaxButton onClick={onMax}>MAX</MaxButton>
      </>
    )}
  </Container>
);

export default Input;
