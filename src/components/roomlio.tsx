/* eslint-disable func-names */
/* eslint-disable prefer-rest-params */
import React, { useCallback, useEffect } from 'react';

import styled from 'styled-components';

import { useWallet } from '../contexts/wallet_context';
import { getShortWalletAddress } from '../utils';

const Container = styled.div``;

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
        widgetID: 'wgt_cc3mtmgt91us00c3g29g',
        pk: 'J-uYxt6H8QHLEZ-1c25DJ3nDRXtfwZF7wMgZdvta-iaL',
        roomElementID: 'battle_chat',
        options: {
          embedPosition: 'bottomRight',
          collapsedMode: 'chip',
          collapsedModeOnlineLabel: 'Chat now!',
          showGreetingMessage: false,
          showRoomMemberList: false,
          styles: {
            '--rml-btn-primary-background-color': 'purple',
            '--rml-btn-primary-background-color-hover': 'darkPurple',
            '--rml-btn-primary-background-color-active': 'lightPurple',
            '--rml-btn-primary-text-color': '#fff',
            '--rml-btn-secondary-background-color': 'lightGray',
            '--rml-btn-secondary-background-color-hover': 'gray',
            '--rml-btn-secondary-background-color-active': '#222222',
            '--rml-btn-secondary-text-color': 'white',
            // '--rml-collapsed-background-color': 'rgba(255, 0, 0, 1)',
            // '--rml-collapsed-background-color-hover': 'darkRed',
            // '--rml-collapsed-background-color-active': '#8e4e4e',
            // '--rml-collapsed-text-color': 'rgb(255, 255, 255)',
            // '--rml-font-family': 'Courier, monospace, serif',
            '--rml-icon-theme': 'dark', // 'light' or 'dark'
            // '--rml-link-color': 'rgba(0, 255, 0, 1)',
            // '--rml-link-color-hover': 'darkGreen',
            '--rml-msg-text-color': 'white',
            '--rml-msg-background-color': 'black',
            '--rml-msg-background-color-hover': '#222',
            '--rml-msg-system-text-color': 'white',
            // '--rml-msg-system-text-background-color': 'gray',
            // '--rml-msg-system-text-font-family': 'Courier, monospace, serif',
            // '--rml-msg-system-text-font-size': '9px',
            // '--rml-msg-system-text-border-radius': '4px',
            '--rml-ui-chrome-background-color': 'black',
            '--rml-ui-chrome-text-color': 'white',
            // '--rml-unfocused-unread-background-color': 'red',
            // '--rml-unfocused-unread-color': 'black',
            // '--rml-side-by-side-them-text-color': 'white',
            // '--rml-side-by-side-them-link-color': '#ccc',
            // '--rml-side-by-side-them-background-color': '#ff0000',
            // '--rml-side-by-side-me-text-color': '#fff',
            '--rml-side-by-side-me-link-color': 'white',
            // '--rml-side-by-side-me-background-color': '#0000ff',
            // '--rml-side-by-side-border-radius': '4px',
            // '--rml-side-by-side-padding': '2px 6px',
          },
        },
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
