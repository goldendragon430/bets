/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import mixpanel from 'mixpanel-browser';

import { SupportedChainId } from '../constants/chains';

export const MIXPANEL_EVENT_NAMES = {
  PLACE_BET: 'PLACE_BET',
  STAKE_NFT: 'STAKE_NFT',
};

class MixpanelTracker {
  public mp: any;

  constructor(mixPanelToken: string) {
    this.mp = undefined;
    mixpanel.init(mixPanelToken, { debug: true });
    this.mp = mixpanel;
  }

  track = (eventName: keyof typeof MIXPANEL_EVENT_NAMES, payload: any) => {
    if (this.mp) {
      this.mp.track(MIXPANEL_EVENT_NAMES[eventName], payload);
    }
  };
}

export const mixpanelTracker: { [chainId: number]: MixpanelTracker } = {
  [SupportedChainId.MAINNET]: new MixpanelTracker(process.env.REACT_APP_MIX_PANEL_TOKEN_MAIN || ''),
  [SupportedChainId.GOERLI]: new MixpanelTracker(process.env.REACT_APP_MIX_PANEL_TOKEN_GOERLI || ''),
};
