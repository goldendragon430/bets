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
}

const MintNFT: React.FC<IMintNFT> = ({ battleInfo }) => {
  const { account } = useWallet();
  const { theme } = useTheme();
  const teamAContract = useNFTContract(battleInfo.projectL.contract);
  const teamBContract = useNFTContract(battleInfo.projectR.contract);

  const [loading, setLoading] = useState(false);

  const mintNft = async (side: boolean) => {
    if (!account) {
      toast.error('Please connect wallet');
      return;
    }

    const contract = !side ? teamAContract : teamBContract;

    setLoading(true);

    try {
      if (contract) {
        await contract.estimateGas.mint();
        const tx = await contract.mint();
        const receipt = await tx.wait();
        if (receipt.status) {
          toast.success(' Mint success');
        } else {
          toast.error('Mint error');
        }
      }
    } catch (err: any) {
      toast.error(err.reason || err.error?.message || err.message);
    }

    setLoading(false);
  };

  return (
    <Container>
      <MintButton
        color={theme.colors.red1}
        disabled={loading}
        fontColor={theme.colors.white}
        onClick={() => mintNft(false)}
        shadow
      >
        {loading ? 'Minting...' : `Mint ${battleInfo.projectL.subName}`}
      </MintButton>
      <MintButton color={theme.colors.blue1} disabled={loading} onClick={() => mintNft(true)} shadow>
        {loading ? 'Minting...' : `Mint ${battleInfo.projectR.subName}`}
      </MintButton>
    </Container>
  );
};

export default MintNFT;
