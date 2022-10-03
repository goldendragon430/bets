/* eslint-disable no-nested-ternary */
import Countdown from 'react-countdown';

import styled from 'styled-components';

import { useTheme } from '../../contexts/theme_context';
import { BattleInfo } from '../../types';
import { Typography, TypographyType } from './typography';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NumberTextWrapper = styled(Typography)<{ textColor: string }>`
  -webkit-text-stroke: 2px ${({ textColor }) => textColor};
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
  padding: 0.8rem 0;
`;

interface INumberText extends React.InputHTMLAttributes<HTMLDivElement> {
  winnerSet: boolean;
  winner: boolean;
  battleInfo: BattleInfo | null;
  refundStatus: boolean;
}

const NumberText: React.FC<INumberText> = ({ winnerSet, winner, battleInfo, refundStatus, ...props }) => {
  const { theme } = useTheme();
  return (
    <Container {...props}>
      <NumberTextWrapper
        textColor={winnerSet ? (winner ? theme.colors.blue1 : theme.colors.orange1) : theme.colors.white}
        type={TypographyType.BOLD_SUBTITLE}
      >
        {refundStatus ? (
          <span>Refund Active</span>
        ) : !battleInfo || new Date(battleInfo.startDate) > new Date() ? (
          <span>Not Started</span>
        ) : (
          <Countdown date={new Date(battleInfo.endDate)}>
            <span>
              {winnerSet
                ? !winner
                  ? `${battleInfo?.projectL.displayName} wins`
                  : `${battleInfo?.projectR.displayName} wins`
                : 'Finalizing...'}
            </span>
          </Countdown>
        )}
      </NumberTextWrapper>
    </Container>
  );
};

export default NumberText;
