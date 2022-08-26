/* eslint-disable func-names */
/* eslint-disable prefer-rest-params */
import React, { useCallback, useEffect } from 'react';

import styled from 'styled-components';

import { useWallet } from '../contexts/wallet_context';
import { getShortWalletAddress } from '../utils';

const Container = styled.div`
  .room {
    background: black;
  }
  .room-sidebar-chip {
    display: none !important;
  }
`;

const Roomlio = () => {
  const { account } = useWallet();

  const updateUser = useCallback(() => {
    if (account) {
      if (!window.rmlLoaded) {
        window.rmlLoaded = true;
        window.rmlCalls = {};

        // Cannot be a ES6 arrow function.
        window.rml = function () {
          const ri = arguments[1].roomElementID;
          if (!window.rmlCalls[ri]) window.rmlCalls[ri] = [];
          window.rmlCalls[ri].push(arguments);
        };

        const s = document.createElement('script');
        s.setAttribute('src', 'https://embed.roomlio.com/embed.js');
        document.body.appendChild(s);
      }

      window.rml('config', {
        options: {
          embedPosition: 'inline',
          collapsedMode: 'none',
          greetingMessageUsername: 'Battle Chat',
          greetingMessage: 'Welcome. :wave: Type a message below!',
        },
        widgetID: 'wgt_cc3mtmgt91us00c3g29g',
        pk: 'J-uYxt6H8QHLEZ-1c25DJ3nDRXtfwZF7wMgZdvta-iaL',
        // Replace with the ID of the room-containing element.
        roomElementID: 'battle_chat',
      });

      window.rml('register', {
        options: {
          userID: account || 'guest',
          displayName: account ? `Alpha ${getShortWalletAddress(account)}` : 'Alpha Guest',
          roomKey: 'abc1234',
          roomName: 'battle_chat',
        },
        // Replace with the ID of the room-containing element.
        roomElementID: 'battle_chat',
      });
    }
  }, [account]);

  useEffect(() => {
    updateUser();
  }, [account, updateUser]);

  return <Container data-rml-room data-rml-version="09.mar.2020" id="battle_chat" />;
};

export default Roomlio;
