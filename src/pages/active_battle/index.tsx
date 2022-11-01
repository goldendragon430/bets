/* eslint-disable no-plusplus */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { getBattleHistory } from '../../services';
import { BattleInfo, BattleStatus } from '../../types';
import { isInProgress } from '../../utils';

const ActiveBattle = () => {
  const navigate = useNavigate();
  const { chainId } = useActiveWeb3React();

  const getActiveBattle = async () => {
    try {
      const res = await getBattleHistory(chainId);
      if (res && res.data.data) {
        const battles = res.data.data as BattleInfo[];
        console.log(battles);
        for (let i = 0; i < battles.length; i++) {
          if (
            isInProgress(new Date(battles[i].startDate), new Date(battles[i].endDate)) &&
            battles[i].status !== BattleStatus.RefundSet
          ) {
            navigate(`battle/${battles[i].id}`);
            return;
          }
        }
        for (let i = 0; i < battles.length; i++) {
          if (new Date(battles[i].startDate) > new Date() && battles[i].status !== BattleStatus.RefundSet) {
            navigate(`battle/${battles[i].id}`);
            return;
          }
        }
        if (battles.length > 0) {
          navigate(`battle/${battles[battles.length - 1].id}`);
          return;
        }
      }
    } catch (err: any) {
      console.error(err.message);
    }
    navigate(`/events`);
  };

  useEffect(() => {
    getActiveBattle();
  }, []);

  return <div />;
};

export default ActiveBattle;
