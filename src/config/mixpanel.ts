/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import mixpanel from 'mixpanel-browser';

export const MIXPANEL_EVENT_NAMES = {
  PLACE_BET: 'PLACE_BET',
  STAKE_NFT: 'STAKE_NFT',
};

class MixpanelTracker {
  public mp: any;

  constructor() {
    if (this.isMixpanelEnabled()) {
      this.mp = undefined;
      mixpanel.init(process.env.REACT_APP_MIX_PANEL_TOKEN || '', { debug: true });
      this.mp = mixpanel;
    } else {
      this.mp = undefined;
    }
  }

  isMixpanelEnabled = () => process.env.REACT_APP_MIX_PANEL_TOKEN !== undefined;

  track = (eventName: keyof typeof MIXPANEL_EVENT_NAMES, payload: any) => {
    if (this.mp) {
      this.mp.track(MIXPANEL_EVENT_NAMES[eventName], payload);
    }
  };
}

export const mixpanelTracker = new MixpanelTracker();
