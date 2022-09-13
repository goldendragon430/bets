/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Modal } from 'antd';
import styled from 'styled-components';

import { SECONDARY_MARKETS, SecondaryMarketInfo } from '../../constants/markets';
import { useWallet } from '../../contexts/wallet_context';
import { useNFTContract } from '../../hooks/useContract';
import { NFTMetadata } from '../../types';
import Button from '../common/button';
import { Typography, TypographyType } from '../common/typography';
import NftList from '../nft_list';

const ModalWrapper = styled(Modal)<{ color: string }>`
  color: ${({ theme }) => theme.colors.text1};
  overflow: hidden;

  .ant-modal-content {
    border: 0.25rem solid ${({ color }) => color};
    border-radius: 0.75rem;
    // box-shadow: 0px 0px 1rem ${({ color }) => color};
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
      padding: 2rem;
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
  nftContractAddress: string;
  nfts: NFTMetadata[];
  endTime: string;
  onStake: (tokenIds: number[]) => void;
}

const StakeModal: React.FC<IStakeModal> = ({
  visible,
  onClose,
  color,
  nftContractAddress,
  nfts,
  fontColor,
  endTime,
  onStake,
}) => {
  const { account } = useWallet();
  const nftContract = useNFTContract(nftContractAddress);

  const [statLoading, setStatLoading] = useState(true);
  const [openMarket, setOpenMarket] = useState<SecondaryMarketInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const [selectedNfts, setSelectedNfts] = useState<NFTMetadata[]>([]);

  useEffect(() => {
    setSelectedNfts([]);
  }, [nfts]);

  const updateStats = useCallback(async () => {
    setStatLoading(true);

    let market: SecondaryMarketInfo | null = null;

    if (nftContract && account) {
      for (const item of SECONDARY_MARKETS) {
        try {
          const res = await nftContract.isApprovedForAll(account, item.contractAddress);
          if (res) {
            market = item;
            break;
          }
        } catch (err: any) {
          console.error(err.reason || err.error?.message || err.message);
        }
      }
    }

    setOpenMarket(market);
    setStatLoading(false);
  }, [nftContract, account]);

  useEffect(() => {
    updateStats();
  }, [nftContract, account]);

  const handleSelect = (metadata: NFTMetadata) => {
    if (loading) {
      return;
    }
    const exist = selectedNfts.findIndex((item) => item.tokenId === metadata.tokenId) > -1;
    const res = selectedNfts.filter((item) => item.tokenId !== metadata.tokenId);
    if (!exist && !metadata.staked) {
      res.push(metadata);
    }
    setSelectedNfts(res);
  };

  const handleSelectAll = () => {
    const unstakedNfts = nfts.filter((item) => !item.staked);
    if (unstakedNfts.length === selectedNfts.length) {
      setSelectedNfts([]);
    } else {
      setSelectedNfts(unstakedNfts);
    }
  };

  const handleStake = async () => {
    setLoading(true);
    await onStake(selectedNfts.map((item) => Number(item.tokenId)));
    setLoading(false);
  };

  const handleRevoke = async (approve: boolean) => {
    setApproveLoading(true);

    if (nftContract && account) {
      try {
        await nftContract.estimateGas.setApprovalForAll(
          openMarket?.contractAddress || SECONDARY_MARKETS[0].contractAddress,
          approve
        );
        const tx = await nftContract.setApprovalForAll(
          openMarket?.contractAddress || SECONDARY_MARKETS[0].contractAddress,
          approve
        );
        const receipt = await tx.wait();
        if (receipt.status) {
          toast.success(approve ? 'Approve Success' : 'Revoke success');
          updateStats();
        } else {
          toast.error(approve ? 'Approve error' : 'Revoke error');
        }
      } catch (err: any) {
        toast.error(err.reason || err.error?.message || err.message);
      }
    }

    setApproveLoading(false);
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
      {!statLoading && (
        <>
          {!openMarket && (
            <ButtonWrapper>
              <Button
                color={color}
                disabled={new Date(endTime) < new Date() || loading || approveLoading}
                fontColor={fontColor}
                onClick={handleSelectAll}
              >
                Select All
              </Button>
              <div style={{ minWidth: '2rem' }} />
              <Button
                color={color}
                disabled={new Date(endTime) < new Date() || loading || selectedNfts.length === 0 || approveLoading}
                fontColor={fontColor}
                onClick={handleStake}
              >
                {loading ? 'Staking...' : 'Stake'}
              </Button>
            </ButtonWrapper>
          )}

          <ButtonWrapper>
            {openMarket && (
              <Button
                color={color}
                disabled={new Date(endTime) < new Date() || loading || approveLoading}
                fontColor={fontColor}
                onClick={() => handleRevoke(false)}
              >
                {approveLoading ? 'Revoking...' : `Revoke ${openMarket.name}`}
              </Button>
            )}
          </ButtonWrapper>
        </>
      )}
    </ModalWrapper>
  );
};

export default StakeModal;
