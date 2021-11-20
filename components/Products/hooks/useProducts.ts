import {
  useState,
  useEffect
} from 'react'
import Router from 'next/router'

/* library template */
import useQuery from 'lib/useQuery'
import useWindowSize from 'lib/useWindowSize'
import useInfiniteScroll from 'lib/useInfiniteScroll'

const useProducts = ({ lng, tagname }) => {

  const size = useWindowSize();
  const categories: string = useQuery('categories')
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [showSort, setShowSort] = useState<boolean>(false);
  const [filterProduct, setFilterProduct] = useState({})
  const [pageInfo, setPageInfo] = useState({
    pageNumber: 0,
    itemPerPage: 4,
    totalItems: null,
  })
  const { currPage, setCurrPage } = useInfiniteScroll(pageInfo, "products_container")
  const handleFilter = (selectedFilter: any) => setFilterProduct(selectedFilter)
  const resetFilter = () => Router.replace(`/${lng}/products`)
  const handleShowFilter = () => {
    setShowFilter(!showFilter)
    setShowSort(false)
  }
  const handleShowSort = () => {
    setShowSort(!showSort)
    setShowFilter(false)
  }

  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  useEffect(() => {
    setCurrPage(0);
  }, [filterProduct, categories, tagname])

  return {
    size,
    setPageInfo,
    pageInfo,
    categories,
    filterProduct,
    handleShowFilter,
    handleShowSort,
    resetFilter,
    showFilter,
    handleFilter,
    showSort,
    scrollToTop,
    currPage
  }
}


export default useProducts