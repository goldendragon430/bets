/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import Button from '../../components/common/button';
import { Typography, TypographyType } from '../../components/common/typography';
import { useTheme } from '../../contexts/theme_context';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { getBattleHistory } from '../../services';
import { BattleInfo, BattleStatus } from '../../types';
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
  loading: boolean;
  visible?: boolean;
  battles: BattleInfo[];
  upcoming?: boolean;
}

const BattleList: React.FC<IBattleList> = ({ loading, visible, battles, upcoming }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <ListContainer visible={visible}>
      {!loading && battles.length === 0 && (
        <Typography shadow style={{ marginTop: '2rem' }} type={TypographyType.BOLD_TITLE}>
          No Battles
        </Typography>
      )}
      {(showMore ? battles : battles.slice(0, 4)).map((battle) => (
        <BattleItem battleInfo={battle} key={battle.id} upcoming={upcoming} />
      ))}
      {battles.length > 4 && (
        <MoreButton onClick={() => setShowMore(!showMore)}>{showMore ? 'Show less' : 'Show More'}</MoreButton>
      )}
    </ListContainer>
  );
};

enum BattleStat {
  ACTIVE,
  UPCOMING,
  PAST,
}

const Battles = () => {
  const { theme } = useTheme();
  const { chainId } = useActiveWeb3React();

  const [tab, setTab] = useState<BattleStat>(BattleStat.ACTIVE);
  const [loading, setLoading] = useState(true);
  const [ongoingBattles, setOngoingBattles] = useState<BattleInfo[]>([]);
  const [upcomingBattles, setUpcomingBattles] = useState<BattleInfo[]>([]);
  const [completedBattles, setCompletedBattles] = useState<BattleInfo[]>([]);

  const updateBattles = async () => {
    try {
      setLoading(true);
      const res = await getBattleHistory(chainId);
      if (res && res.data.data) {
        const battles = res.data.data.reverse() as BattleInfo[];
        setOngoingBattles(
          battles.filter(
            (battle) =>
              isInProgress(new Date(battle.startDate), new Date(battle.endDate)) &&
              battle.status !== BattleStatus.RefundSet
          )
        );
        setUpcomingBattles(
          battles.filter(
            (battle) => new Date(battle.startDate) > new Date() && battle.status !== BattleStatus.RefundSet
          )
        );
        setCompletedBattles(
          battles.filter((battle) => new Date(battle.endDate) < new Date() || battle.status === BattleStatus.RefundSet)
        );
      } else {
        setOngoingBattles([]);
        setUpcomingBattles([]);
        setCompletedBattles([]);
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    updateBattles();
  }, [chainId]);

  return (
    <Container>
      <ButtonWrapper>
        <TabButton onClick={() => setTab(BattleStat.ACTIVE)} shadow visible={tab === BattleStat.ACTIVE}>
          Active
        </TabButton>
        <Splitter color={theme.colors.grey2} type={TypographyType.BOLD_SUBTITLE}>
          |
        </Splitter>
        <TabButton onClick={() => setTab(BattleStat.UPCOMING)} shadow visible={tab === BattleStat.UPCOMING}>
          Upcoming
        </TabButton>
        <Splitter color={theme.colors.grey2} type={TypographyType.BOLD_SUBTITLE}>
          |
        </Splitter>
        <TabButton onClick={() => setTab(BattleStat.PAST)} shadow visible={tab === BattleStat.PAST}>
          PAST
        </TabButton>
      </ButtonWrapper>

      <>
        <BattleList battles={ongoingBattles} loading={loading} visible={tab === BattleStat.ACTIVE} />
        <BattleList battles={upcomingBattles} loading={loading} upcoming visible={tab === BattleStat.UPCOMING} />
        <BattleList battles={completedBattles} loading={loading} visible={tab === BattleStat.PAST} />
      </>
    </Container>
  );
};

export default Battles;
