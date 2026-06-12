import styled from "styled-components";
import Comment from "./Comment";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const Input = styled.input`
  border: none;
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 8px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.card};
  outline: none;
  padding: 12px 14px;
  width: 100%;
`;

const Comments = () => {
  return (
    <Container>
      <NewComment>
        <Avatar src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200" />
        <Input placeholder="Add a comment..." />
      </NewComment>
      {Array.from({ length: 5 }, (_, index) => (
        <Comment key={index} />
      ))}
    </Container>
  );
};

export default Comments;
