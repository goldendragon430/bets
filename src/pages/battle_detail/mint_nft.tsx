import { useState } from 'react';
import { toast } from 'react-toastify';

import styled from 'styled-components';

import Button from '../../components/common/button';
import { useTheme } from '../../contexts/theme_context';
import { useWallet } from '../../contexts/wallet_context';
import { useNFTContract } from '../../hooks/useContract';
import { BattleInfo } from '../../types';

const Container = styled.div`
  width: 100%;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MintButton = styled(Button)`
  margin: 1rem;
`;

interface IMintNFT {
  battleInfo: BattleInfo;
  updateUserNftList: () => void;
}

const MintNFT: React.FC<IMintNFT> = ({ battleInfo, updateUserNftList }) => {
  const { account } = useWallet();
  const { theme } = useTheme();
  const teamAContract = useNFTContract(battleInfo.projectL.contract);
  const teamBContract = useNFTContract(battleInfo.projectR.contract);

  const [loadingA, setLoadingA] = useState(false);
  const [loadingB, setLoadingB] = useState(false);

  const mintNft = async (side: boolean) => {
    if (!account) {
      toast.error('Please connect wallet');
      return;
    }

    const contract = !side ? teamAContract : teamBContract;

    if (!side) {
      setLoadingA(true);
    } else {
      setLoadingB(true);
    }

    try {
      if (contract) {
        await contract.estimateGas.mint();
        const tx = await contract.mint();
        const receipt = await tx.wait();
        if (receipt.status) {
          toast.success(' Mint success');
          updateUserNftList();
        } else {
          toast.error('Mint error');
        }
      }
    } catch (err: any) {
      toast.error(err.reason || err.error?.message || err.message);
    }

    if (!side) {
      setLoadingA(false);
    } else {
      setLoadingB(false);
    }
  };

  return (
    <Container>
      <MintButton color={theme.colors.orange1} disabled={loadingA || !account} onClick={() => mintNft(false)} shadow>
        {loadingA ? 'Minting...' : `Mint ${battleInfo.projectL.displayName}`}
      </MintButton>
      <MintButton color={theme.colors.blue1} disabled={loadingB || !account} onClick={() => mintNft(true)} shadow>
        {loadingB ? 'Minting...' : `Mint ${battleInfo.projectR.displayName}`}
      </MintButton>
    </Container>
  );
};

export default MintNFT;
