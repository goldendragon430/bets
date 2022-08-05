import { Route, Routes } from 'react-router-dom';

import styled from 'styled-components';

import Header from '../components/header';
import Home from './home';

const Container = styled.div`
  position: relative;
  color: ${({ theme }) => theme.colors.text1};
  background: ${({ theme }) => theme.colors.black};
  width: 100%;
  min-height: 100vh;
`;

const Content = styled.div`
  position: relative;
  padding: 4rem;

  ${({ theme }) => `${theme.media_width.upToMedium} {
    padding: 2rem;
  }`}
`;

const AppRouter = () => (
  <Container>
    <Header />
    <Content>
      <Routes>
        <Route element={<Home />} path="/" />
      </Routes>
    </Content>
  </Container>
);

export default AppRouter;
