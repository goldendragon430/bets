/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef, useState } from 'react';

import { Modal } from 'antd';
import styled from 'styled-components';

import EditIcon from '../../assets/images/edit.svg';
import EthIcon from '../../assets/images/eth_icon.svg';
import ProfileIcon from '../../assets/images/profile.svg';
import { useTheme } from '../../contexts/theme_context';
import { useWallet } from '../../contexts/wallet_context';
import { getShortWalletAddress } from '../../utils';
import { Typography, TypographyType } from '../common/typography';

const ModalWrapper = styled(Modal)<{ color: string }>`
  color: ${({ theme }) => theme.colors.text1};
  overflow: hidden;

  .ant-modal-content {
    border: 0.25rem solid ${({ color }) => color};
    border-radius: 0.75rem;
    // box-shadow: 0px 0px 1rem ${({ color }) => color};
    background: ${({ theme }) => theme.colors.black};

    .ant-modal-close {
      color: ${({ theme }) => theme.colors.white};
      top: 5px;

      .ant-modal-close-x {
        font-size: 24px;
      }
    }

    .ant-modal-header {
      background: transparent;
      border-bottom: 1px solid ${({ color }) => color};
    }

    .ant-modal-body {
      padding: 3rem;
      background: ${({ theme }) => theme.colors.black};
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

const Container = styled.div`
  width: 100%;
  background: linear-gradient(
    0deg,
    ${({ theme }) => theme.colors.grey2} 0%,
    ${({ theme }) => `${theme.colors.grey2}00`} 100%
  );
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  padding: 1rem;
`;

const Row = styled.div`
  width: 100%;
  margin: 1rem 0;
`;

const ProfileNameWrapper = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.black};
  padding: 0.5rem 1rem 0.5rem 5rem;
  margin-left: 4rem;
  margin-bottom: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProfileImgWrapper = styled.div`
  position: absolute;
  width: 8rem;
  height: 8rem;
  left: -4rem;
  border-radius: 50%;
  overflow: hidden;
  border: 0.25rem solid ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.grey2};
  cursor: pointer;
`;

const ProfileImg = styled.div<{ userImg?: string }>`
  width: 100%;
  height: 100%;
  background: ${({ userImg }) => (userImg ? `url(${userImg})` : `url(${ProfileIcon})`)};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const ProfileInput = styled.input`
  width: 100%;
  background: transparent;
  outline: none;
  border: none;
  font-family: ${({ theme }) => theme.typography.regular.fontFamily};
  font-weight: ${({ theme }) => theme.typography.regular.fontWeight};
  font-style: ${({ theme }) => theme.typography.regular.fontStyle};
  font-size: ${({ theme }) => theme.typography.regular.fontSize};
  line-height: ${({ theme }) => theme.typography.regular.lineHeight};
`;

const EditButton = styled.img`
  margin-left: 0.5rem;
  height: 2rem;
  cursor: pointer;
`;

const NumberWrapper = styled.div`
  background: ${({ theme }) => theme.colors.black};
  padding: 1rem;
  border-radius: 0.75rem;
  margin-bottom: 0.5rem;

  p {
    line-height: 100%;
  }
`;

const StatsWrapper = styled.div`
  width: 100%;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.grey3} 0%,
    ${({ theme }) => `${theme.colors.grey3}00`} 100%
  );
`;

const StatsRow = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const EthImg = styled.img`
  height: 2rem;
`;

interface IProfileModal {
  visible: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<IProfileModal> = ({ visible, onClose }) => {
  const { account } = useWallet();
  const { theme } = useTheme();

  const [username, setUsername] = useState('PROFILE NAME');
  const [isEdit, setEdit] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleEditName = () => {
    inputRef.current?.focus();
    setEdit(true);
  };

  const handleSaveName = () => {
    setEdit(false);
  };

  return (
    <ModalWrapper
      centered
      color={theme.colors.white}
      footer={null}
      onCancel={onClose}
      title={
        <HeaderWrapper>
          <Typography type={TypographyType.REGULAR_TITLE}>My Profile</Typography>
        </HeaderWrapper>
      }
      visible={visible}
      width="70rem"
    >
      <Container>
        <Content>
          <Row>
            <ProfileNameWrapper>
              <ProfileImgWrapper>
                <ProfileImg />
              </ProfileImgWrapper>
              <div>
                <ProfileInput
                  onBlur={handleSaveName}
                  onChange={(e) => setUsername(e.target.value)}
                  readOnly={!isEdit}
                  ref={inputRef}
                  value={username}
                />
                <Typography type={TypographyType.REGULAR}>{getShortWalletAddress(account || '')}</Typography>
              </div>
              {!isEdit && <EditButton alt="" onClick={handleEditName} src={EditIcon} />}
            </ProfileNameWrapper>
          </Row>
          <Row>
            <NumberWrapper>
              <Typography type={TypographyType.BOLD_TITLE}>346</Typography>
            </NumberWrapper>
            <Typography type={TypographyType.REGULAR}>WINNERS RANK</Typography>
          </Row>
          <Row>
            <NumberWrapper>
              <Typography type={TypographyType.BOLD_TITLE}>572</Typography>
            </NumberWrapper>
            <Typography type={TypographyType.REGULAR}>ABP RANK</Typography>
          </Row>
        </Content>

        <div style={{ minWidth: '1rem', minHeight: '1rem' }} />

        <Content>
          <StatsWrapper>
            <StatsRow>
              <Typography type={TypographyType.REGULAR}>Battles in process</Typography>
              <Typography type={TypographyType.REGULAR}>4</Typography>
            </StatsRow>

            <StatsRow>
              <Typography type={TypographyType.REGULAR}>Battles won</Typography>
              <Typography type={TypographyType.REGULAR}>15</Typography>
            </StatsRow>

            <StatsRow>
              <Typography type={TypographyType.REGULAR}>Total Eth Earned</Typography>
              <Flex>
                <EthImg alt="" src={EthIcon} />
                <Typography type={TypographyType.REGULAR}>543</Typography>
              </Flex>
            </StatsRow>
          </StatsWrapper>
        </Content>
      </Container>
    </ModalWrapper>
  );
};

export default ProfileModal;
