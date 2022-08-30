/* eslint-disable no-console */
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { Typography, TypographyType } from '../../components/common/typography';
import { getBattleHistory } from '../../services';
import { BattleInfo } from '../../types';
import { isInProgress } from '../../utils';
import BattleItem from './battle_item';

const Container = styled.div`
  width: 100%;
  padding: 2rem;
`;

const Title = styled(Typography)`
  margin: 1rem;
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
      <Title shadow type={TypographyType.BOLD_SUBTITLE}>
        Ongoing
      </Title>
      {battles
        .filter((battle) => isInProgress(new Date(battle.startDate), new Date(battle.endDate)))
        .map((battle) => (
          <BattleItem battleInfo={battle} key={battle.id} />
        ))}

      <Title shadow type={TypographyType.BOLD_SUBTITLE}>
        Completed
      </Title>
      {battles
        .filter((battle) => new Date(battle.endDate) < new Date())
        .map((battle) => (
          <BattleItem battleInfo={battle} key={battle.id} />
        ))}

      <Title shadow type={TypographyType.BOLD_SUBTITLE}>
        Upcoming
      </Title>
      {battles
        .filter((battle) => new Date(battle.startDate) > new Date())
        .map((battle) => (
          <BattleItem battleInfo={battle} key={battle.id} />
        ))}
    </Container>
  );
};

export default Battles;
