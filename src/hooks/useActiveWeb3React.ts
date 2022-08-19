/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line import/no-extraneous-dependencies
import { getDefaultProvider, Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useActiveWeb3React = () => {
  const interfaceContext = useWeb3React<Web3Provider>();
  if (interfaceContext.active) {
    return interfaceContext;
  }

  const library = getDefaultProvider('goerli');
  return { library, chainId: 5 } as Web3ReactContextInterface<Web3Provider>;
};

export default useActiveWeb3React;
