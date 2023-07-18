import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import { Ref } from 'react'

const ModalOverlay = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalWrapper = styled.div`
  position: relative;
  width: 328px;
  height: 192px;
  background-color: #ffffff;
  border-radius: 20px;
`

const Title = styled.text`
font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
font-style: normal;
font-weight: 700;
font-size: 20px;
line - height: 28px;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const CloseButton = styled.button`
  width: 120px;
  height: 56px;
  border-radius: 16px;
  background-color: #ffffff;
  border: 1px solid #c1c2c3;
  cursor: pointer;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: #797a7b;
`
const CustomButton = styled.button`
  width: 120px;
  height: 56px;
  border-radius: 16px;
  background-color: #ffffff;
  border: none;
  cursor: pointer;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
  margin-left: 16px;
`

interface HistoryModalProps {
  onCloseModal: () => void
  text: string
  buttonText: string
  buttonColor: string
  clickButton: () => void
}

export const Modal = (props: HistoryModalProps) => {
  const { onCloseModal, text, buttonText, buttonColor, clickButton } = props

  return (
    <ModalOverlay>
      <ModalWrapper>
        <div style={{ marginTop: '36px' }} />
        <Title>{text}</Title>
        <div style={{ marginTop: '36px' }} />
        <ButtonContainer>
          <CloseButton onClick={onCloseModal}>취소</CloseButton>
          <CustomButton
            onClick={clickButton}
            style={{ backgroundColor: buttonColor }}
          >
            {buttonText}
          </CustomButton>
        </ButtonContainer>
      </ModalWrapper>
    </ModalOverlay>
  )
}
