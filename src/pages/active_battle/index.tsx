/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getActiveBattleIds } from '../../services';

const ActiveBattle = () => {
  const navigate = useNavigate();

  const getActiveBattle = async () => {
    try {
      const res = await getActiveBattleIds();
      if (res.data.data && res.data.data.length > 0) {
        navigate(`battle/${res.data.data[0]}`);
        return;
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
