import React from 'react';
import { Route, Routes } from 'react-router-dom';

import styled from 'styled-components';

import Header from '../components/header';
import Home from './home';

const Container = styled.div`
  position: relative;
  color: ${({ theme }) => theme.colors.text1};
`;

const AppRouter = () => (
  <>
    <Header />
    <Container>
      <Routes>
        <Route element={<Home />} path="/" />
      </Routes>
    </Container>
  </>
);

export default AppRouter;
