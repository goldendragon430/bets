import { toast } from 'react-toastify';

import styled from 'styled-components';

import Button from '../../components/common/button';
import { useBet } from '../../contexts/bet_context';
import { useTheme } from '../../contexts/theme_context';
import { useWallet } from '../../contexts/wallet_context';
import { useNFTContract } from '../../hooks/useContract';
import { BattleInfo } from '../../types';

const Container = styled.div`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MintButton = styled(Button)`
  margin: 1rem;
`;

interface IMintContent {
  battleInfo: BattleInfo;
}

const MintContent: React.FC<IMintContent> = ({ battleInfo }) => {
  const { account } = useWallet();
  const { theme } = useTheme();
  const teamAContract = useNFTContract(battleInfo.projectL.contract);
  const teamBContract = useNFTContract(battleInfo.projectR.contract);

  const mintNft = async (side: boolean) => {
    if (!account) {
      toast.error('Please connect wallet');
      return;
    }

    const contract = side ? teamAContract : teamBContract;

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
  };

  return (
    <Container>
      <MintButton color={theme.colors.red1} onClick={() => mintNft(true)} shadow>
        Mint for Team A
      </MintButton>
      <MintButton color={theme.colors.blue1} onClick={() => mintNft(false)} shadow>
        Mint for Team B
      </MintButton>
    </Container>
  );
};

const MintNFT = () => {
  const { battleInfo } = useBet();

  return battleInfo ? <MintContent battleInfo={battleInfo} /> : null;
};

export default MintNFT;
