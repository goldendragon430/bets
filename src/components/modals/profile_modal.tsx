/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useRef, useState } from 'react';

import { Modal } from 'antd';
import styled from 'styled-components';

import EditIcon from '../../assets/images/edit.svg';
import EthIcon from '../../assets/images/eth_icon.svg';
import SaveIcon from '../../assets/images/save.svg';
import { useProfile } from '../../contexts/profile_context';
import { useTheme } from '../../contexts/theme_context';
import { useWallet } from '../../contexts/wallet_context';
import { NFTMetadata } from '../../types';
import { getNftImageUrl, getShortWalletAddress } from '../../utils';
import Button from '../common/button';
import ProfileImage from '../common/profile_image';
import { Typography, TypographyType } from '../common/typography';
import NftList from '../nft_list';

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

  ${({ theme }) => `${theme.media_width.upToSmall} {
    flex-direction: column;
  }`};
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

const UserProfileImage = styled(ProfileImage)`
  position: absolute;
  width: 8rem;
  height: 8rem;
  min-width: 8rem;
  min-height: 8rem;
  left: -4rem;
  filter: drop-shadow(0px 0px 0.6875rem ${({ theme }) => theme.colors.white});
  border-width: 0.25rem;
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

const NftActionButton = styled(Button)`
  flex: 1;
  margin-top: 1rem;
`;

const WalletAddress = styled(Typography)`
  font-size: 1rem;
  font-style: italic;
  color: grey;
`;

interface IProfileModal {
  visible: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<IProfileModal> = ({ visible, onClose }) => {
  const { account } = useWallet();
  const { theme } = useTheme();
  const {
    username,
    selNft,
    winnerRank,
    abpRank,
    battlesInProgress,
    battlesWon,
    totalEthEarned,
    userNfts,
    updateProfile,
  } = useProfile();

  const [name, setName] = useState(username);
  const [isEdit, setEdit] = useState(false);
  const [showNft, setShowNft] = useState(false);
  const [selectedNft, setSelectedNft] = useState<NFTMetadata | undefined>(selNft);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setShowNft(false);
  }, [visible]);

  useEffect(() => {
    setName(username);
  }, [username]);

  useEffect(() => {
    setSelectedNft(selNft);
  }, [selNft]);

  const handleEditName = () => {
    inputRef.current?.focus();
    setEdit(true);
  };

  const handleSaveName = async () => {
    if (name !== username) {
      const res = await updateProfile(name, selNft);
      if (!res) {
        setName(username);
      }
    }
    setEdit(false);
  };

  const handleSaveNft = async () => {
    const res = await updateProfile(username, selectedNft);
    if (res) {
      setShowNft(false);
    }
  };

  const handleSelectNft = (metadata: NFTMetadata) => {
    if (
      selectedNft &&
      selectedNft.contract.address.toLowerCase() === metadata.contract.address.toLowerCase() &&
      selectedNft.tokenId === metadata.tokenId
    ) {
      setSelectedNft(undefined);
    } else {
      setSelectedNft(metadata);
    }
  };

  const handleCloseNft = () => {
    setShowNft(false);
    setSelectedNft(selNft);
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
      {!showNft ? (
        <Container>
          <Content>
            <Row>
              <ProfileNameWrapper>
                <UserProfileImage
                  onClick={() => setShowNft(true)}
                  userImg={selNft && getNftImageUrl(selNft.rawMetadata?.image || '')}
                />
                <div>
                  <Flex>
                    <ProfileInput
                      onChange={(e) => setName(e.target.value)}
                      readOnly={!isEdit}
                      ref={inputRef}
                      value={name}
                    />
                    {!isEdit ? (
                      <EditButton alt="" onClick={handleEditName} src={EditIcon} />
                    ) : (
                      <EditButton alt="" onClick={handleSaveName} src={SaveIcon} />
                    )}
                  </Flex>
                  <div>
                    <WalletAddress type={TypographyType.REGULAR}>{getShortWalletAddress(account || '')}</WalletAddress>
                  </div>
                </div>
              </ProfileNameWrapper>
            </Row>
            <Row>
              <NumberWrapper>
                <Typography type={TypographyType.BOLD_SUBTITLE}>
                  {winnerRank > 0 ? winnerRank.toLocaleString() : 'Unavailable'}
                </Typography>
              </NumberWrapper>
              <Typography type={TypographyType.REGULAR}>WINNERS RANK</Typography>
            </Row>
            <Row>
              <NumberWrapper>
                <Typography type={TypographyType.BOLD_SUBTITLE}>
                  {abpRank > 0 ? abpRank.toLocaleString() : 'Unavailable'}
                </Typography>
              </NumberWrapper>
              <Typography type={TypographyType.REGULAR}>ABP RANK</Typography>
            </Row>
          </Content>

          <div style={{ minWidth: '1rem', minHeight: '1rem' }} />

          <Content>
            <StatsWrapper>
              <StatsRow>
                <Typography type={TypographyType.REGULAR}>Battles in process</Typography>
                <Typography type={TypographyType.REGULAR}>{battlesInProgress.toLocaleString()}</Typography>
              </StatsRow>

              <StatsRow>
                <Typography type={TypographyType.REGULAR}>Battles won</Typography>
                <Typography type={TypographyType.REGULAR}>{battlesWon.toLocaleString()}</Typography>
              </StatsRow>

              <StatsRow>
                <Typography type={TypographyType.REGULAR}>Total Eth Earned</Typography>
                <Flex>
                  <EthImg alt="" src={EthIcon} />
                  <Typography type={TypographyType.REGULAR}>{totalEthEarned.toLocaleString()}</Typography>
                </Flex>
              </StatsRow>
            </StatsWrapper>
          </Content>
        </Container>
      ) : (
        <>
          <NftList
            color={theme.colors.red1}
            nfts={userNfts}
            onSelect={handleSelectNft}
            selectedNfts={selectedNft ? [selectedNft] : []}
          />
          <Flex style={{ width: '100%' }}>
            <NftActionButton color={theme.colors.red1} onClick={handleCloseNft}>
              Cancel
            </NftActionButton>
            <div style={{ minWidth: '1rem' }} />
            <NftActionButton color={theme.colors.blue1} onClick={handleSaveNft}>
              Save
            </NftActionButton>
          </Flex>
        </>
      )}
    </ModalWrapper>
  );
};

export default ProfileModal;
