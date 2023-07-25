import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: grid;
  grid-template-rows: 105px auto; // saying that your page will have 2 rows and the size of each one
  grid-template-areas: // naming the 2 areas
  "header"
  "content";

  > main {
    grid-area: content; // grid area of main is equal to content area
    overflow-y: scroll; // if content doesn't fit screen, then it will show a scroll bar on the side just on main
    padding: 64px 0;
  }

`;

export const Links = styled.ul`
  list-style: none;

  > li {
    margin-top: 12px;

    a {
      color: ${ ({ theme }) => theme.COLORS.WHITE};
    }
  }
`;

export const Content = styled.div`
  max-width: 550px;
  margin: 0 auto; // both parameters is to centralize content

  display: flex;
  flex-direction: column;

  > button:first-child {
    align-self: end;
  }

  > h1 {
    font-size: 36px;
    font-weight: 500;
    padding-top: 64px;
  }

  > p {
    font-size: 16px;
    margin-top: 16px;
    text-align: justify;
  }

`;