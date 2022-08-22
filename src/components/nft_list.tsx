/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';

import { NFTMetadata } from '../types';

const Container = styled.div<{ color: string }>`
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  height: 25rem;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, ${({ color }) => color} 100%);
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;

  // -ms-overflow-style: none; /* Internet Explorer 10+ */
  // scrollbar-width: none; /* Firefox */
  // &::-webkit-scrollbar {
  //   display: none; /* Safari and Chrome */
  // }

  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #ffffff10;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #fff;
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
`;

const NftItem = styled.div`
  position: relative;
  width: 10rem;
  height: 10rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0.5rem;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 0.75rem;
  overflow: hidden;
`;

const NftImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const NftSelected = styled.div<{ staked?: boolean; color: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 3px solid ${({ color }) => color};
  border-radius: 0.75rem;
  ${({ staked, color }) =>
    staked &&
    `
    box-shadow: inset 0px 4px 222px ${`${color}88`};
    filter: drop-shadow(0px 4px 11px ${color});
  `}
`;

interface INftList {
  color: string;
  nfts: NFTMetadata[];
  selectedNfts: NFTMetadata[];
  onSelect: (metadata: NFTMetadata) => void;
}

const NftList: React.FC<INftList> = ({ color, nfts, selectedNfts, onSelect }) => {
  const getImageUrl = (url: string) => {
    if (url.startsWith('ipfs://')) {
      return url.replace('ipfs://', 'https://ipfs.io/ipfs/');
    }
    return url;
  };

  return (
    <Container color={color}>
      {nfts.map((metadata, index) => (
        <NftItem key={index} onClick={() => onSelect(metadata)}>
          <NftImage alt="" src={getImageUrl(metadata.rawMetadata?.image || '')} />
          {(metadata.staked || selectedNfts.findIndex((item) => item.tokenId === metadata.tokenId) > -1) && (
            <NftSelected color={color} staked={metadata.staked} />
          )}
        </NftItem>
      ))}
    </Container>
  );
};

export default NftList;
