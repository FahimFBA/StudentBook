import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: ${(props) => (props.$type === "sm" ? "100%" : "auto")};
  cursor: pointer;
  display: ${(props) => (props.$type === "sm" ? "flex" : "block")};
  gap: 12px;
  padding: ${(props) => (props.$type === "sm" ? "8px" : "0")};
  border-radius: 8px;
  background: ${(props) => (props.$type === "sm" ? props.theme.card : "transparent")};

  @media (max-width: 420px) {
    display: block;
  }
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.$type === "sm" ? "104px" : "190px")};
  background-color: ${({ theme }) => theme.soft};
  flex: 1;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.soft};

  @media (max-width: 420px) {
    height: ${(props) => (props.$type === "sm" ? "170px" : "190px")};
  }
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => (props.$type !== "sm" ? "12px" : "0")};
  gap: 12px;
  flex: 1;

  @media (max-width: 420px) {
    margin-top: 12px;
  }
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.soft};
  display: ${(props) => (props.$type === "sm" ? "none" : "block")};
`;

const Texts = styled.div`
  min-width: 0;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  margin: 0;
  line-height: 1.35;
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 8px 0px 4px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({
  type,
  id = "zSYg-wRSIu8",
  title = "How To Use Local Storage To Annotate Unlimited Data in Label Studio",
  channel = "Fahim Amin",
  thumbnail = "https://i.ytimg.com/vi/zSYg-wRSIu8/hqdefault.jpg",
  views = "505 views",
  date = "Feb 25, 2026",
}) => {
  return (
    <Link to={`/video/${id}`} style={{ textDecoration: "none" }}>
      <Container $type={type}>
        <Image
          $type={type}
          src={thumbnail}
          alt={title}
        />
        <Details $type={type}>
          <ChannelImage
            $type={type}
            src="https://i.ytimg.com/vi/zSYg-wRSIu8/default.jpg"
            alt={channel}
          />
          <Texts>
            <Title>{title}</Title>
            <ChannelName>{channel}</ChannelName>
            <Info>{views} - {date}</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
