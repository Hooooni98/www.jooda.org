import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 88px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #c1c2c3;
  border-radius: 16px;
  padding-left: 24px;
  margin-bottom: 16px;
  cursor: move;
  outline: none;
`
const InfoContainer = styled.div`
  height: 110px;
  display: flex;
  flex-direction: row;
  align-items: center;
`
const Image = styled.div`
  width: 42px;
  height: 56px;
  border-radius: 8px;
  border: none;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  margin-left: 16px;
  margin-right: 16px;
`
const InputBox = styled.input`
  width: 48px;
  box-sizing: border-box;
  border-radius: 16px;
  height: 56px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid #c1c2c3;
  text-align: center;
  color: ${props => (props.value ? '#000000' : '#797a7b')};
  &:focus {
    outline: 2px solid #000000;
    outline-offset: -1px;
  }
`
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`

const Name = styled.div`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
`
const Role = styled.div`
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #797a7b;
`
interface PastorImageProps {
  index: number
  image: string
  name: string
  role: string
  changeIndex: Function
  NoActive: Function
  onDrop: Function
  onDragEnter: Function
}

export const PastorBoxOrder = (props: PastorImageProps) => {
  const {
    index,
    image,
    name,
    role,
    changeIndex,
    NoActive,
    onDrop,
    onDragEnter,
  } = props

  const [order, setOrder] = useState<number>(index + 1)
  const [isTyping, setIsTyping] = useState<boolean>(false)
  useEffect(() => {
    if (order !== index + 1 && !isTyping) {
      changeIndex(index, order - 1)
    }
  }, [order, isTyping])
  return (
    <Container
      draggable
      onDrop={event => onDrop(event, index)}
      onDragLeave={event => NoActive(event)}
      onDragStart={event => onDragEnter(event, index)}
    >
      <InfoContainer>
        <InputBox
          type="text"
          value={order}
          placeholder={''}
          onFocus={() => setIsTyping(true)}
          onChange={e =>
            setOrder(e.target.value ? parseInt(e.target.value) : 0)
          }
          onBlur={() => setIsTyping(false)}
        />
        <Image
          style={{
            background: '#ffffff',
          }}
        >
          <img src={image} />
        </Image>
        <TextContainer>
          <Name>{name}</Name>
          <Role>{role}</Role>
        </TextContainer>
      </InfoContainer>

      <img style={{ marginRight: '24px' }} src={'/source/icon/uil_bars.svg'} />
    </Container>
  )
}
