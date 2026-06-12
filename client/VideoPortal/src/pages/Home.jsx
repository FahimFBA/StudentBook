import styled from "styled-components";
import Card from "../components/Card";
import { videos } from "../data/videos";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(260px, 100%), 1fr));
  gap: 22px;
`;

const Header = styled.div`
  margin-bottom: 22px;
  color: ${({ theme }) => theme.text};

  h1 {
    margin: 0;
    font-size: clamp(28px, 4vw, 42px);
    line-height: 1.08;
    letter-spacing: 0;
  }

  p {
    margin: 8px 0 0;
    color: ${({ theme }) => theme.textSoft};
  }
`;

const Home = () => {
  return (
    <>
      <Header>
        <h1>Fahim Amin video portal</h1>
        <p>Browse AI, DevOps, LaTeX, Python, and developer tooling tutorials.</p>
      </Header>
      <Container>
        {videos.map((video) => (
          <Card key={video.id} {...video} />
        ))}
      </Container>
    </>
  );
};

export default Home;
