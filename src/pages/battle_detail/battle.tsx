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
  // max-width: 100%;
  // width: 150vh;
  background: ${({ theme }) => theme.colors.black};
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ theme }) => `${theme.media_width.upToExtraLarge} {
    padding: 0 15%;
  }`};
`;

const BattlePage: React.FC<BattleDetailType> = (props) => {
  const { battleInfo } = props;

  return (
    <Container>
      <ClaimSection {...props} />
      <FeaturedFight {...props} />
      {battleInfo && <MintNFT battleInfo={battleInfo} />}
      <SocialSection />
    </Container>
  );
};

export default BattlePage;
