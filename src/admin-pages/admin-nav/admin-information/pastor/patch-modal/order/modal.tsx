import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { setAuthToken } from '../../../../../../api'
import {
  getPastorNoLimit,
  patchChurchPastorOrder,
} from '../../../../../../api/admin-pastor'
import {
  InnerBoxHeader,
  InnerBoxTitle,
  Margin24,
  Margin36,
} from '../../../../../../component/styledComponent'
import { InfoBox } from '../../../../../../component/box/info'
import { PastorBoxOrder } from '../../pastorBoxOrder'
import { useErrorNavigator } from '../../../../../../error-pages/useErrorNavigator'

const ModalContentContainer = styled.div`
  // max-height: 80vh;
  overflow-y: auto;
`

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
  width: 714px;
  background-color: #ffffff;
  border-radius: 20px;
`

const ModalCloseButton = styled.button`
  top: 10px;
  right: 20px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #ffffff;
  border: none;
  cursor: pointer;
`

const PastorContainer = styled.div`
  max-height: 504px;
`
const PastorTwoColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 36px;
  margin-right: 36px;
  gap: 16px;
`

const DataContainer = styled.div`
  padding: 0 36px 0 36px;
  gap: 48px;
  justify-content: space-between;
`
interface PastorData {
  church_pastor_id: string
  order: string
  name: string
  role: string
  image: string
}
interface NoticeModalProps {
  onCloseModal: () => void
}

export const PatchOrderModal = (props: NoticeModalProps) => {
  const { onCloseModal } = props
  const errorNavigator = useErrorNavigator()
  const [pastorData, setPastorData] = useState<Array<PastorData>>([])
  const currentDragIndex = useRef<number>(-1)

  const NoActive = (event: any) => {
    event.preventDefault()
    event.stopPropagation()
  }
  const movePastor = async (startIndex: number, endIndex: number) => {
    if (startIndex !== endIndex) {
      var index = startIndex < endIndex ? endIndex + 1 : endIndex
      const response = await patchChurchPastorOrder(
        pastorData[startIndex].church_pastor_id,
        index
      )
      errorNavigator.navigate(response)
      const pastors = [...pastorData]
      const moveData = pastors.splice(startIndex, 1)
      pastors.splice(endIndex, 0, moveData[0])
      setPastorData(pastors)
    }
  }

  const onDrop = (event: any, index: number) => {
    if (index === -1) {
      currentDragIndex.current = -1
    } else {
      movePastor(currentDragIndex.current, index)
      currentDragIndex.current = -1
    }
  }
  const onDragEnter = (event: any, index: number) => {
    if (currentDragIndex.current === -1) currentDragIndex.current = index
  }

  const handleCloseModal = () => {
    onCloseModal()
  }

  const handleWrapperClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation()
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthToken(token)
    }

    const fetchData = async () => {
      const response = await getPastorNoLimit()
      errorNavigator.navigate(response)
      setPastorData(response.payload.church_pastor_list.results)
    }
    fetchData()
  }, [])

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`
    return () => {
      const scrollY = document.body.style.top
      document.body.style.cssText = ''
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
    }
  }, [])

  const OrderPastor = useCallback(() => {
    const loopCount = Math.ceil(pastorData.length / 2)
    return (
      <PastorContainer
        onDragOver={event => NoActive(event)}
        onDrop={event => onDrop(event, -1)}
        onDragEnter={event => NoActive(event)}
        onDragLeave={event => NoActive(event)}
      >
        {pastorData.length !== 0 &&
          pastorData.map((pastor, index) => {
            if (loopCount > index) {
              return (
                <PastorTwoColumnContainer>
                  <PastorBoxOrder
                    key={pastorData[index * 2].church_pastor_id}
                    index={index * 2}
                    image={
                      pastorData[index * 2].image ||
                      'source/no_pastor_image.svg'
                    }
                    name={pastorData[index * 2].name}
                    role={pastorData[index * 2].role}
                    changeIndex={movePastor}
                    NoActive={NoActive}
                    onDrop={onDrop}
                    onDragEnter={onDragEnter}
                  />
                  {index * 2 < pastorData.length && (
                    <PastorBoxOrder
                      key={pastorData[index * 2 + 1].church_pastor_id}
                      index={index * 2 + 1}
                      image={
                        pastorData[index * 2 + 1].image ||
                        'source/no_pastor_image.svg'
                      }
                      name={pastorData[index * 2 + 1].name}
                      role={pastorData[index * 2 + 1].role}
                      changeIndex={movePastor}
                      NoActive={NoActive}
                      onDrop={onDrop}
                      onDragEnter={onDragEnter}
                    />
                  )}
                </PastorTwoColumnContainer>
              )
            }
          })}
      </PastorContainer>
    )
  }, [pastorData])

  return (
    <ModalOverlay onClick={handleCloseModal}>
      <ModalWrapper onClick={handleWrapperClick}>
        <Margin36 />
        <InnerBoxHeader>
          <InnerBoxTitle>섬기는 이 순서변경</InnerBoxTitle>
          <ModalCloseButton onClick={onCloseModal}>
            <img src="source/icon/close.svg" alt="close" />
          </ModalCloseButton>
        </InnerBoxHeader>
        <Margin24 style={{ background: '#ffffff' }} />
        <DataContainer>
          <InfoBox text="순서를 변경하고 싶다면 숫자를 변경하거나, 박스를 잡고 순서를 변경할 수 있어요." />
        </DataContainer>
        <Margin24 style={{ background: '#ffffff' }} />
        <ModalContentContainer>
          {/* <NoticeModalContent> */}
          <OrderPastor />

          {/* </NoticeModalContent> */}
        </ModalContentContainer>
        <Margin36 />
      </ModalWrapper>
    </ModalOverlay>
  )
}
