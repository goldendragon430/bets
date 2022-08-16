/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useActiveWeb3React = () => {
  const interfaceContext = useWeb3React<Web3Provider>();
  return interfaceContext;
};

export default useActiveWeb3React;
