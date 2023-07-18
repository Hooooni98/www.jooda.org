import { useEffect, useRef, useState } from 'react'

export const usePage = () => {
  const [maxPage, setMaxPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageList, setPageList] = useState<Array<number>>([
    1, 2, 3, 4, 5, 6, 7, 8, 9,
  ])
  const isOverNine = useRef<boolean>(false)

  useEffect(() => {
    if (maxPage < 9) {
      setPageList([1, 2, 3, 4, 5, 6, 7, 8, 9].slice(0, maxPage))
    } else {
      setPageList([1, 2, 3, 4, 5, 6, 7, 8, 9])
      isOverNine.current = true
    }
  }, [maxPage])

  const getPrevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
      if (isOverNine.current && pageList[0] > 1 && currentPage <= pageList[4]) {
        setPageList(
          [pageList[0] - 1].concat(pageList.slice(0, pageList.length - 1))
        )
      }
    }
  }
  const getNextPage = () => {
    if (currentPage !== maxPage) {
      setCurrentPage(currentPage + 1)
      if (
        isOverNine.current &&
        pageList[8] < maxPage &&
        pageList[4] <= currentPage
      ) {
        setPageList(pageList.slice(1, 9).concat([pageList[8] + 1]))
      }
    }
  }
  const clickPage = (index: number) => {
    if (currentPage === index) {
      return
    }
    if (!isOverNine.current && maxPage !== 0) {
      setCurrentPage(index)
    } else {
      var currentMaxPage = index + 4
      var currentMinPage = index - 4
      if (maxPage < currentMaxPage) {
        currentMinPage = currentMinPage - (currentMaxPage - maxPage)
        currentMaxPage = maxPage
      } else if (currentMinPage < 1) {
        currentMaxPage = 9
        currentMinPage = 1
      }
      const result = []
      for (let i = currentMinPage; i <= currentMaxPage; i++) {
        result.push(i)
      }
      setPageList(result)
      setCurrentPage(index)
    }
  }

  return {
    pageList,
    currentPage,
    maxPage,
    getPrevPage,
    getNextPage,
    clickPage,
    setMaxPage,
  }
}
