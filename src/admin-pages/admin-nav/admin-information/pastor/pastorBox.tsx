import { Dispatch, SetStateAction, useRef, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 110px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #c1c2c3;
  border-radius: 16px;
  padding-left: 24px;
  margin-bottom: 16px;
  margin-left: 36px;
  margin-right: 36px;
`
const IndexIndicator = styled.text`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: #5500dd;
`
const Image = styled.div`
  width: 58px;
  height: 78px;
  background: #f0f1f3;
  border-radius: 8px;
  border: none;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  margin-left: 24px;
  cursor: pointer;
  margin-right: 24px;
`
const InputBox = styled.input`
  width: 226px;
  box-sizing: border-box;
  border-radius: 16px;
  height: 56px;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid #c1c2c3;
  padding: 0 78px 0 16px;
  color: ${props => (props.value ? '#000000' : '#797a7b')};
  &:focus {
    outline: 2px solid #000000;
    outline-offset: -1px;
  }
  margin-right: 24px;
`

interface PastorImageProps {
  index: number
  image: string
  name: string
  role: string
  saveImageFile: Function
  changeName: Function
  changeRole: Function
}

export const PastorBox = (props: PastorImageProps) => {
  const { index, saveImageFile, image, name, role, changeName, changeRole } =
    props
  const imageFile = useRef<HTMLInputElement>(null)
  const openImageFile = () => {
    if (imageFile.current) imageFile.current.click()
  }

  return (
    <Container>
      <IndexIndicator>{index + 1}</IndexIndicator>
      <Image
        style={{
          background: '#ffffff',
        }}
        onClick={openImageFile}
      >
        <input
          type="file"
          id="file"
          ref={imageFile}
          style={{ display: 'none' }}
          onChange={e => saveImageFile(e, index)}
        />
        <img
          src={image === '' ? '/source/icon/pastor_upload_image.svg' : image}
        />
      </Image>
      <InputBox
        type="text"
        value={name}
        placeholder={'제목 입력'}
        onChange={e => changeName(index, e.target.value)}
      />
      <InputBox
        type="text"
        value={role}
        placeholder={'직분 입력'}
        onChange={e => changeRole(index, e.target.value)}
      />
    </Container>
  )
}
