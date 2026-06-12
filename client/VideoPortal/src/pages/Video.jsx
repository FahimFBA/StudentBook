import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { featuredVideo, videos } from "../data/videos";

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 360px);
  gap: 24px;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

const Content = styled.div`
  min-width: 0;
`;
const VideoWrapper = styled.div`
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.soft};
  background: ${({ theme }) => theme.card};
  aspect-ratio: 16 / 9;

  iframe {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 800;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 720px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  color: ${({ theme }) => theme.text};

  @media (max-width: 520px) {
    width: 100%;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  border: 0;
  border-radius: 8px;
  min-height: 38px;
  padding: 0 12px;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.textSoft};
  font-weight: 700;

  @media (max-width: 520px) {
    flex: 1 1 calc(50% - 8px);
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Recommendation = styled.div`
  min-width: 0;
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 520px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 800;
  color: white;
  border: none;
  border-radius: 8px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;

const Video = () => {
  const { id } = useParams();
  const selectedVideo = videos.find((video) => video.id === id) || featuredVideo;
  const recommendations = videos.filter((video) => video.id !== selectedVideo.id).slice(0, 8);

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width="100%"
            src={selectedVideo.embedUrl}
            title={selectedVideo.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </VideoWrapper>
        <Title>{selectedVideo.title}</Title>
        <Details>
          <Info>{selectedVideo.views} - {selectedVideo.date}</Info>
          <Buttons>
            <Button>
              <ThumbUpOutlinedIcon /> {selectedVideo.likes}
            </Button>
            <Button>
              <ThumbDownOffAltOutlinedIcon /> Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src="https://i.ytimg.com/vi/zSYg-wRSIu8/default.jpg" />
            <ChannelDetail>
              <ChannelName>{selectedVideo.channel}</ChannelName>
              <ChannelCounter>youtube.com/@FahimAmin</ChannelCounter>
              <Description>
                {selectedVideo.description}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe as="a" href={selectedVideo.channelUrl} target="_blank" rel="noreferrer">
            Subscribe
          </Subscribe>
        </Channel>
        <Hr />
        <Comments/>
      </Content>
      <Recommendation>
        {recommendations.map((video) => (
          <Card key={video.id} type="sm" {...video} />
        ))}
      </Recommendation>
    </Container>
  );
};

export default Video;
