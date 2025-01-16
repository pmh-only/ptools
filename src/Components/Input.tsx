import styled from 'styled-components'

export const Input = styled.input`
  background-color: transparent;
  color: #fafafa;
  border: none;
  border-bottom: 1px solid #fafafa;
  text-align: center;
  accent-color: #ff1696;
  box-sizing: border-box;
  font-size: 12px;

  width: 24px;

  &[type='checkbox'] {
    width: auto;
  }

  &:focus {
    outline: none;
  }
`
