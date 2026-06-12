import styled from "styled-components";
import Card from "../components/Card";

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
  const videos = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    title: [
      "Campus project showcase",
      "Research sprint recap",
      "Career prep workshop",
    ][index % 3],
    channel: ["StudentBook", "UIU Research", "Career Services"][index % 3],
  }));

  return (
    <>
      <Header>
        <h1>Campus video portal</h1>
        <p>Browse lectures, project demos, workshops, and student updates.</p>
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
