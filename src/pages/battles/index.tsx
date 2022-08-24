/* eslint-disable no-console */
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { getBattleHistory } from '../../services';
import { BattleInfo } from '../../types';
import BattleItem from './battle_item';

const Container = styled.div`
  width: 100%;
  padding: 2rem;
`;

const Battles = () => {
  const [battles, setBattles] = useState<BattleInfo[]>([]);

  const updateBattles = async () => {
    try {
      const res = await getBattleHistory();
      if (res.data.data) {
        setBattles(res.data.data.reverse());
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    updateBattles();
  }, []);

  return (
    <Container>
      {battles.map((battle) => (
        <BattleItem battleInfo={battle} key={battle.id} />
      ))}
    </Container>
  );
};

export default Battles;
