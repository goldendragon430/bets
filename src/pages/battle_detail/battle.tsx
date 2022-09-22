/* eslint-disable import/no-cycle */
import React from 'react';

import styled from 'styled-components';

import { BattleDetailType } from '../../types';
import ClaimSection from './claim_section';
import FeaturedFight from './featured_fight';
import MintNFT from './mint_nft';
import SocialSection from './social_section';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ theme }) => `${theme.media_width.upToExtraLarge} {
    padding: 0 15%;
  }`};
`;

const BattlePage: React.FC<BattleDetailType> = (props) => (
  // const { battleInfo, updateUserNftList } = props;

  <Container>
    <ClaimSection {...props} />
    <FeaturedFight {...props} />
    {/* {process.env.REACT_APP_NETWORK !== 'mainnet' && battleInfo && (
        <MintNFT battleInfo={battleInfo} updateUserNftList={updateUserNftList} />
      )} */}
    <SocialSection {...props} />
  </Container>
);
export default BattlePage;
