import React from 'react'
import styled from 'styled-components'
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 36px;
`
const ArrowImage = styled.image`
  width: 24px;
  height: 24px;
  margin-bottom: 36px;
  margin-left: 8px;
`
const CurrentPageText = styled.button`
  background: #5500dd;
  color: #ffffff;
  border: 0px;
  width: 24px;
  height: 24px;
  margin-bottom: 36px;
  margin-left: 8px;
  border-radius: 4px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
  text-align: center;
`

const PageText = styled.button`
  background: #ffffff;
  color: #c1c2c3;
  border: 0px;
  margin-bottom: 36px;
  margin-left: 8px;
  font-family: 'Spoqa Han Sans Neo', 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
`

interface PageProps {
  pageList: Array<number>
  currentPage: number
  lastPage: number
  getPrevPage: Function
  getNextPage: Function
  clickPage: Function
}

export const Page = (props: PageProps) => {
  const {
    getPrevPage,
    getNextPage,
    clickPage,
    pageList,
    currentPage,
    lastPage,
  } = props

  return (
    <Container>
      <ArrowImage>
        <img
          onClick={() => getPrevPage()}
          src={
            currentPage !== 1
              ? '/source/icon/arrow_left_dark.svg'
              : '/source/icon/arrow_left_regular.svg'
          }
          alt="information"
        />
      </ArrowImage>
      {pageList.length === 0 ? (
        <CurrentPageText key={0}>{1}</CurrentPageText>
      ) : (
        pageList.map((page, index) => {
          if (page === currentPage) {
            return <CurrentPageText key={index}>{page}</CurrentPageText>
          } else {
            return (
              <PageText key={index} onClick={() => clickPage(page)}>
                {page}
              </PageText>
            )
          }
        })
      )}
      <ArrowImage>
        <img
          onClick={() => getNextPage()}
          src={
            lastPage === 0
              ? '/source/icon/arrow_right_regular.svg'
              : currentPage !== lastPage
                ? '/source/icon/arrow_right_dark.svg'
                : '/source/icon/arrow_right_regular.svg'
          }
          alt="information"
        />
      </ArrowImage>
    </Container>
  )
}
