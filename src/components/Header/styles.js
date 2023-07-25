import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  grid-area: header; // the header it's going to be fixed up in the page

  height: 105px;
  width: 100%; // 100% of what's available on the screen

  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${ ({ theme }) => theme.COLORS.BACKGROUND_700};

  display: flex;
  justify-content: space-between;

  padding: 0 80px;

`;

export const Profile = styled(Link)`
  display: flex;
  align-items: center;

  > img { // the usage of ">" is to specify that the settings will be for the img in Profile
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  > div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span { // settings for span inside div
      font-size: 14px;
      color: ${ ({ theme }) => theme.COLORS.GRAY_100};
    }

    strong { // settings for span inside div
      font-size: 18px;
      color: ${ ({ theme }) => theme.COLORS.WHITE};
    }
  }
`;

export const Logout = styled.button`
  border: none;
  background: none;

  > svg {
    color: ${ ({ theme }) => theme.COLORS.GRAY_100};
    font-size: 36px;
  }
`;