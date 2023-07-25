import styled from 'styled-components';


export const Container = styled.button`
  width: 100%;
  background-color: ${ ({ theme }) => theme.COLORS.ORANGE };
  color: ${ ({ theme }) => theme.COLORS.BACKGROUND_800};
  
  height: 56px;
  border:0;
  padding: 0 16px;
  margin-top: 16px; // it puts at least 16px of margin-top
  border-radius: 10px;
  font-weight: 500;

  &:disabled { // & is equal to use button:disabled or button:hoover for example. It refers to the element "button" in line 4 (styled.button)
    opacity: 0.5;
  }

`