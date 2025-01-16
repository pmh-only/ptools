import styled from 'styled-components'

export const Button = styled.button`
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  background-color: #ff1696;
  color: white;

  transition: background-color 0.25s ease-out;

  &:hover {
    background-color: #da1c9b;
  }

  &:disabled {
    background-color: gray;
    cursor: inherit;
  }
`
