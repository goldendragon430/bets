/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';

import { Modal } from 'antd';
import styled from 'styled-components';

import Button from '../common/button';
import { Typography, TypographyType } from '../common/typography';
import NftList from '../nft_list';

const ModalWrapper = styled(Modal)<{ color: string }>`
  color: ${({ theme }) => theme.colors.text1};
  overflow: hidden;

  .ant-modal-content {
    border: 0.25rem solid ${({ color }) => color};
    border-radius: 0.75rem;
    box-shadow: 0px 0px 1rem ${({ color }) => color};
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
      border-bottom: 1px solid ${({ color }) => color};
    }

    .ant-modal-body {
      padding: 3rem;
      background: radial-gradient(
        50% 50% at 50.01% 50.01%,
        ${({ color }) => `${color}40`} 0%,
        ${({ color }) => `${color}20`} 50%,
        ${({ color }) => `${color}00`} 100%
      );
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

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 2rem;

  button {
    flex: 1;
  }
`;

interface IStakeModal {
  visible: boolean;
  onClose: () => void;
  color: string;
  fontColor: string;
  nfts: any[];
  onStake: () => void;
}

const StakeModal: React.FC<IStakeModal> = ({ visible, onClose, color, nfts, fontColor, onStake }) => {
  const [selectedNfts, setSelectedNfts] = useState<any[]>([]);

  useEffect(() => {
    setSelectedNfts([]);
  }, [nfts]);

  const handleSelect = (metadata: any) => {
    const exist = selectedNfts.findIndex((item) => item.mint === metadata.mint) > -1;
    const res = selectedNfts.filter((item) => item.mint !== metadata.mint);
    if (!exist) {
      res.push(metadata);
    }
    setSelectedNfts(res);
  };

  const handleSelectAll = () => {
    if (nfts.length === selectedNfts.length) {
      setSelectedNfts([]);
    } else {
      setSelectedNfts(nfts);
    }
  };

  return (
    <ModalWrapper
      centered
      color={color}
      footer={null}
      onCancel={onClose}
      title={
        <HeaderWrapper>
          <Typography type={TypographyType.REGULAR_TITLE}>Stake</Typography>
        </HeaderWrapper>
      }
      visible={visible}
      width="53rem"
    >
      <NftList color={color} nfts={nfts} onSelect={handleSelect} selectedNfts={selectedNfts} />
      <ButtonWrapper>
        <Button color={color} fontColor={fontColor} onClick={handleSelectAll}>
          Select All
        </Button>
        <div style={{ minWidth: '2rem' }} />
        <Button color={color} fontColor={fontColor} onClick={onStake}>
          Stake
        </Button>
      </ButtonWrapper>
    </ModalWrapper>
  );
};

export default StakeModal;
