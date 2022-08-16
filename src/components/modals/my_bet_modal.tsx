/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Modal } from 'antd';
import styled from 'styled-components';

import EthIcon from '../../assets/images/eth_icon.svg';
import { TeamInfo } from '../../types';
import Button from '../common/button';
import { Typography, TypographyType } from '../common/typography';

const ModalWrapper = styled(Modal)`
  color: ${({ theme }) => theme.colors.text1};
  overflow: hidden;

  .ant-modal-content {
    border: 0.25rem solid ${({ theme }) => theme.colors.white};
    border-radius: 0.75rem;
    box-shadow: 0px 0px 1rem ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.grey1};

    .ant-modal-close {
      color: ${({ theme }) => theme.colors.white};
      top: 5px;

      .ant-modal-close-x {
        font-size: 24px;
      }
    }

    .ant-modal-header {
      background: transparent;
      border-bottom: 1px solid ${({ theme }) => theme.colors.white};
    }

    .ant-modal-body {
      padding: 3rem;
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
`;

const TeamContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const TeamWrapper = styled.div``;

const TeamLogo = styled.img<{ color: string }>`
  width: 16rem;
  height: 16rem;
  border-radius: 0.75rem;
  filter: drop-shadow(0px 0px 0.6875rem ${({ color }) => color});
  margin-bottom: 1rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1rem;
`;

const TeamLogo2 = styled(TeamLogo)`
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
  margin-bottom: 0;
`;

const EthImg = styled.img`
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
`;

const BetButton = styled(Button)`
  margin: 2rem 0;
`;

interface IMyBetModal {
  visible: boolean;
  onClose: () => void;
  teamA: TeamInfo;
  teamB: TeamInfo;
}

const MyBetModal: React.FC<IMyBetModal> = ({ visible, onClose, teamA, teamB }) => (
  <ModalWrapper
    centered
    footer={null}
    onCancel={onClose}
    title={
      <HeaderWrapper>
        <Typography type={TypographyType.REGULAR_TITLE}>My Bet</Typography>
      </HeaderWrapper>
    }
    visible={visible}
    width="55rem"
  >
    <TeamContainer>
      {[teamA, teamB].map((team, key) => (
        <TeamWrapper key={key}>
          <TeamLogo alt="" color={team.color} src={team.logo} />
          <Wrapper>
            <TeamLogo2 alt="" color={team.color} src={team.logo} />
            <Typography type={TypographyType.REGULAR_TITLE}>{team.nftStaked.toLocaleString()}</Typography>
          </Wrapper>
          <Wrapper>
            <EthImg alt="" src={EthIcon} />
            <Typography type={TypographyType.REGULAR_TITLE}>{team.ethStaked.toLocaleString()}</Typography>
          </Wrapper>
        </TeamWrapper>
      ))}
    </TeamContainer>

    <BetButton>Bet on current game</BetButton>

    <Typography style={{ textTransform: 'uppercase' }} type={TypographyType.REGULAR}>
      find out more about bp <a>here</a>
    </Typography>
  </ModalWrapper>
);

export default MyBetModal;