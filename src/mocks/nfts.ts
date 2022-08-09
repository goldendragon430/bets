/* eslint-disable import/prefer-default-export */
import NftImg1 from '../assets/images/nft1.jpeg';
import NftImg2 from '../assets/images/nft2.png';

export const NFT_LIST1 = new Array(10).fill(1).map((_, key) => ({ mint: key, image: NftImg1 }));
export const NFT_LIST2 = new Array(10).fill(1).map((_, key) => ({ mint: key, image: NftImg2 }));
