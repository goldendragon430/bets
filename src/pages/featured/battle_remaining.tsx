/* eslint-disable no-console */
import React from 'react';

import styled from 'styled-components';

import FrameImg from '../../assets/images/frame.svg';
import { Typography, TypographyType } from '../../components/common/typography';

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;

  ${({ theme }) => `${theme.media_width.upToSmall} {
    zoom: 70%;
  }`}
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Frame = styled.div`
  width: 15rem;
  height: 12.5rem;
  background: url(${FrameImg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const NumberText = styled(Typography)`
  -webkit-text-stroke: 0.25rem ${({ theme }) => theme.colors.purple1};
  text-shadow: 0px 0px 2rem ${({ theme }) => theme.colors.purple1}, 0px 0px 2rem ${({ theme }) => theme.colors.purple1};
`;

const BattleRemaining: React.FC = () => (
  <Container>
    <Typography shadow type={TypographyType.BOLD_TITLE}>
      Battle Remaining
    </Typography>

    <Wrapper>
      <Frame>
        <NumberText shadow type={TypographyType.BOLD_HEADING}>
          1
        </NumberText>
        <Typography type={TypographyType.REGULAR}>DAYS</Typography>
      </Frame>

      <Frame>
        <NumberText shadow type={TypographyType.BOLD_HEADING}>
          10
        </NumberText>
        <Typography type={TypographyType.REGULAR}>HOURS</Typography>
      </Frame>

      <Frame>
        <NumberText shadow type={TypographyType.BOLD_HEADING}>
          23
        </NumberText>
        <Typography type={TypographyType.REGULAR}>MIN</Typography>
      </Frame>

      <Frame>
        <NumberText shadow type={TypographyType.BOLD_HEADING}>
          38
        </NumberText>
        <Typography type={TypographyType.REGULAR}>SEC</Typography>
      </Frame>
    </Wrapper>
  </Container>
);

export default BattleRemaining;
