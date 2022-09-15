/* eslint-disable no-console */
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import Button from '../../components/common/button';
import { Typography, TypographyType } from '../../components/common/typography';
import { useTheme } from '../../contexts/theme_context';
import { getBattleHistory } from '../../services';
import { BattleInfo } from '../../types';
import { isInProgress } from '../../utils';
import BattleItem from './battle_item';

const Container = styled.div`
  width: 100%;
  padding: 2rem;

  ${({ theme }) => `${theme.media_width.upToExtraLarge} {
    padding: 0 15%;
  }`};

  ${({ theme }) => `${theme.media_width.upToSmall} {
    zoom: 0.8;
  }`};

  ${({ theme }) => `${theme.media_width.upToExtraSmall} {
    zoom: 0.6;
  }`};
`;

const ListContainer = styled.div<{ visible?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ visible }) => !visible && 'display: none;'}
`;

const MoreButton = styled(Button)`
  margin: 0 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TabButton = styled(Button)<{ visible?: boolean }>`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.typography.boldSubTitle.fontFamily};
  font-weight: ${({ theme }) => theme.typography.boldSubTitle.fontWeight};
  font-style: ${({ theme }) => theme.typography.boldSubTitle.fontStyle};
  font-size: ${({ theme }) => theme.typography.boldSubTitle.fontSize};
  ${({ visible, theme }) =>
    !visible &&
    `
    color: ${theme.colors.grey2};
    filter: none;
  `}
`;

const Splitter = styled(Typography)``;

interface IBattleList {
  visible?: boolean;
  battles: BattleInfo[];
}

const BattleList: React.FC<IBattleList> = ({ visible, battles }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <ListContainer visible={visible}>
      {battles.length === 0 && (
        <Typography shadow style={{ marginTop: '2rem' }} type={TypographyType.BOLD_TITLE}>
          No Battles
        </Typography>
      )}
      {(showMore ? battles : battles.slice(0, 4)).map((battle) => (
        <BattleItem battleInfo={battle} key={battle.id} />
      ))}
      {battles.length > 4 && (
        <MoreButton onClick={() => setShowMore(!showMore)}>{showMore ? 'Show less' : 'Show More'}</MoreButton>
      )}
    </ListContainer>
  );
};

enum BattleStatus {
  ACTIVE,
  UPCOMING,
  PAST,
}

const Battles = () => {
  const { theme } = useTheme();

  const [tab, setTab] = useState<BattleStatus>(BattleStatus.ACTIVE);
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
      <ButtonWrapper>
        <TabButton onClick={() => setTab(BattleStatus.ACTIVE)} shadow visible={tab === BattleStatus.ACTIVE}>
          Active
        </TabButton>
        <Splitter color={theme.colors.grey2} type={TypographyType.BOLD_SUBTITLE}>
          |
        </Splitter>
        <TabButton onClick={() => setTab(BattleStatus.UPCOMING)} shadow visible={tab === BattleStatus.UPCOMING}>
          Upcoming
        </TabButton>
        <Splitter color={theme.colors.grey2} type={TypographyType.BOLD_SUBTITLE}>
          |
        </Splitter>
        <TabButton onClick={() => setTab(BattleStatus.PAST)} shadow visible={tab === BattleStatus.PAST}>
          PAST
        </TabButton>
      </ButtonWrapper>

      <>
        <BattleList battles={ongoingBattles} visible={tab === BattleStatus.ACTIVE} />
        <BattleList battles={upcomingBattles} visible={tab === BattleStatus.UPCOMING} />
        <BattleList battles={completedBattles} visible={tab === BattleStatus.PAST} />
      </>
    </Container>
  );
};

export default Battles;
