import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter}ee;
  backdrop-filter: blur(18px);
  min-height: 72px;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  z-index: 10;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  flex-wrap: wrap;
  height: 100%;
  min-height: 72px;
  padding: 12px clamp(14px, 3vw, 28px);
  position: relative;
`;

const Search = styled.div`
  width: min(560px, 100%);
  flex: 1 1 220px;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  min-height: 44px;
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 8px;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.textSoft};
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
  min-width: 0;
  width: 100%;
`;

const Button = styled.button`
  min-height: 40px;
  padding: 0 14px;
  background-color: ${({ theme }) => theme.accent};
  border: 0;
  color: white;
  border-radius: 8px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  @media (max-width: 520px) {
    width: 40px;
    padding: 0;

    span {
      display: none;
    }
  }
`;
const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search" />
          <SearchOutlinedIcon />
        </Search>
        <Link to="signin" style={{ textDecoration: "none" }}>
          <Button>
            <AccountCircleOutlinedIcon />
            <span>Sign in</span>
          </Button>
        </Link>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
