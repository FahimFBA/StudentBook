import { lazy, Suspense, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Video = lazy(() => import("./pages/Video"));
const SignIn = lazy(() => import("./pages/SignIn"));

const Container = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  background:
    radial-gradient(circle at top left, rgba(37, 99, 235, 0.08), transparent 34rem),
    ${({ theme }) => theme.bg};

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const Main = styled.div`
  background-color: ${({ theme }) => theme.bg};
  min-width: 0;
`;
const Wrapper = styled.div`
  padding: 28px clamp(16px, 4vw, 56px);

  @media (max-width: 640px) {
    padding: 18px 12px 28px;
  }
`;

const Loading = styled.div`
  min-height: calc(100vh - 128px);
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.textSoft};
  font-weight: 800;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Suspense fallback={<Loading>Loading videos...</Loading>}>
                <Routes>
                  <Route path="/">
                    <Route index element={<Home />} />
                    <Route path="signin" element={<SignIn />} />
                    <Route path="video">
                      <Route path=":id" element={<Video />} />
                    </Route>
                  </Route>
                </Routes>
              </Suspense>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
