/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';

import Button from './button';

const Container = styled.div`
  background: ${({ theme }) => `${theme.colors.white}66`};
  border: 1px solid ${({ theme }) => `${theme.colors.white}5A`};
  box-shadow: 0px 0px 3px ${({ theme }) => theme.colors.white};
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToggleButton = styled(Button)<{ isActive?: boolean }>`
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border-radius: 0.25rem;
  background: ${({ theme, isActive }) => (isActive ? theme.colors.white : 'none')};

  img {
    max-height: 60%;
    max-width: 60%;
  }
`;

interface IToggle extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  contents: any[];
  onValueChange: (newValue: number) => void;
}

const Toggle: React.FC<IToggle> = ({ value, contents, onValueChange, ...props }) => (
  <Container {...props}>
    {contents.map((content, index) => (
      <ToggleButton isActive={value === index} key={index} onClick={() => onValueChange(index)}>
        {content}
      </ToggleButton>
    ))}
  </Container>
);

export default Toggle;
