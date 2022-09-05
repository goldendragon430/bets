/* eslint-disable no-console */
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import Button from '../../components/common/button';
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

const MoreButton = styled(Button)`
  margin: 0 1rem;
`;

interface IBattleList {
  title: string;
  battles: BattleInfo[];
}

const BattleList: React.FC<IBattleList> = ({ title, battles }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <Title shadow type={TypographyType.BOLD_SUBTITLE}>
        {title}
      </Title>
      {(showMore ? battles : battles.slice(0, 4)).map((battle) => (
        <BattleItem battleInfo={battle} key={battle.id} />
      ))}
      {battles.length > 4 && (
        <MoreButton onClick={() => setShowMore(!showMore)}>{showMore ? 'Show less' : 'Show More'}</MoreButton>
      )}
    </>
  );
};

const Battles = () => {
  const [ongoingBattles, setOngoingBattles] = useState<BattleInfo[]>([]);
  const [upcomingBattles, setUpcomingBattles] = useState<BattleInfo[]>([]);
  const [completedBattles, setCompletedBattles] = useState<BattleInfo[]>([]);

  const updateBattles = async () => {
    try {
      const res = await getBattleHistory();
      if (res.data.data) {
        const battles = res.data.data.reverse() as BattleInfo[];
        setOngoingBattles(
          battles.filter((battle) => isInProgress(new Date(battle.startDate), new Date(battle.endDate)))
        );
        setUpcomingBattles(battles.filter((battle) => new Date(battle.startDate) > new Date()));
        setCompletedBattles(battles.filter((battle) => new Date(battle.endDate) < new Date()));
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
      <BattleList battles={ongoingBattles} title="Ongoing" />
      <BattleList battles={upcomingBattles} title="Upcoming" />
      <BattleList battles={completedBattles} title="Completed" />
    </Container>
  );
};

export default Battles;
