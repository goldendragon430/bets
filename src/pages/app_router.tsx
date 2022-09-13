import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styled from 'styled-components';

import BgImg from '../assets/images/bg.svg';
import Header from '../components/header';
import Roomlio from '../components/roomlio';
import { useWallet } from '../contexts/wallet_context';
import ActiveBattle from './active_battle';
import BattleDetail from './battle_detail';
import Battles from './battles';
import Leaderboard from './leaderboard';

const Container = styled.div`
  position: relative;
  color: ${({ theme }) => theme.colors.text1};
  background: ${({ theme }) => theme.colors.black};
  width: 100%;
  min-height: 100vh;
  // background: url(${BgImg});
  // background-position: top;
  // background-size: cover;
  // background-repeat: no-repeat;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const AppRouter = () => {
  const { account } = useWallet();

  return (
    <Container>
      <Header />
      <Content>
        <Routes>
          <Route element={<Battles />} path="/events" />
          <Route element={<Leaderboard />} path="/rank" />
          <Route element={<BattleDetail />} path="/battle/:battleId" />
          <Route element={<ActiveBattle />} path="/" />
        </Routes>
      </Content>
      {account && <Roomlio />}
      <ToastContainer />
    </Container>
  );
};

export default AppRouter;
