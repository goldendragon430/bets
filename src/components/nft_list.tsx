/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';

const Container = styled.div<{ color: string }>`
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  height: 25rem;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, ${({ color }) => color} 100%);
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
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
`;

const NftImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const NftSelected = styled.div<{ color: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 3px solid ${({ color }) => color};
  box-shadow: inset 0px 4px 222px ${({ color }) => `${color}88`};
  filter: drop-shadow(0px 4px 11px ${({ color }) => color});
`;

interface INftList {
  color: string;
  nfts: any[];
  selectedNfts: any[];
  onSelect: (metadata: any) => void;
}

const NftList: React.FC<INftList> = ({ color, nfts, selectedNfts, onSelect }) => (
  <Container color={color}>
    {nfts.map((metadata, index) => (
      <NftItem key={index} onClick={() => onSelect(metadata)}>
        <NftImage alt="" src={metadata.image} />
        {selectedNfts.findIndex((item) => item.mint === metadata.mint) > -1 && <NftSelected color={color} />}
      </NftItem>
    ))}
  </Container>
);

export default NftList;
