/* library package */
import {
  FC,
  useState,
  useEffect
} from 'react'
import Router from 'next/router'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import {
  Products,
  ProductSort
} from '@sirclo/nexus'

/* library template */
import useInfiniteScroll from 'lib/useInfiniteScroll'
import useQuery from 'lib/useQuery'
// import useRemoveParams from 'lib/useRemoveParams'

/* component */
// import Popup from 'components/Popup/Popup'
import SideMenu from 'components/SideMenu/SideMenu'
import Placeholder from 'components/Placeholder'
// import ProductFilterComponent from 'components/ProductFilter'
const EmptyComponent = dynamic(() => import('components/EmptyComponent/EmptyComponent'))
// const ProductCategoryComponent = dynamic(() => import('components/ProductCategoryComponent/ProductCategoryComponent'))

import styles from 'public/scss/components/ProductsComponent.module.scss'
import stylesSort from 'public/scss/components/ProductSort.module.scss'

const placeholder = {
  placeholderImage: styles.products_placeholder,
  placeholderList: styles.products_placeholderList,
}

const classesProducts = {
  productContainerClassName: `products_container ${styles.products_productContainer}`,
  stickerContainerClassName: styles.products_stickerContainer,
  outOfStockLabelClassName: `${styles.products_label} ${styles.products_outOfStockLabel}`,
  saleLabelClassName: `${styles.products_label} ${styles.products_saleLabel}`,
  comingSoonLabelClassName: `${styles.products_label} ${styles.products_comingSoonLabel}`,
  openOrderLabelClassName: `${styles.products_label} ${styles.products_openOrderLabel}`,
  preOrderLabelClassName: `${styles.products_label} ${styles.products_preOrderLabel}`,
  newLabelClassName: `${styles.products_label} ${styles.products_newLabel}`,
  productImageContainerClassName: styles.products_productImageContainer,
  productImageClassName: styles.products_productImage,
  productLabelContainerClassName: styles.products_productLabelContainer,
  productTitleClassName: styles.products_productTitle,
  productPriceClassName: styles.products_productPrice,
  salePriceClassName: styles.products_salePrice,
  priceClassName: styles.products_price,
}

const classesProductSort = {
  sortClassName: stylesSort.sort,
  sortOptionsClassName: stylesSort.sortOptions,
  sortOptionButtonClassName: stylesSort.sortOptionButton,
  sortActiveClassName: stylesSort.sortActive
}

type TWithTitle = {
  type: 'left' | 'center'
  title: string
  withSeeAll?: boolean
}

type iProps = {
  i18n: any
  lng: string
  tagname?: 'featured'
  | 'preorder'
  | 'new-arrivals'
  type: 'flexNoWrap'
  | 'grid'
  | 'column',
  withFilterSort?: boolean
  slug?: string
  withInfiniteScroll?: boolean
  withTitle?: TWithTitle
  withEmptyComponent?: boolean
  isLastSection?: boolean
  withSeeAllBtn?: boolean
  [otherProp: string]: any
}

const ProductsComponent: FC<iProps> = ({
  i18n,
  lng,
  type,
  slug,
  tagname = null,
  withFilterSort,
  withInfiniteScroll,
  withEmptyComponent,
  withTitle,
  isLastSection,
  withSeeAllBtn,
  ...props
}) => {

  const categories: string = useQuery('categories')
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [showSort, setShowSort] = useState<boolean>(true);
  const [filterProduct, setFilterProduct] = useState({})
  const [sort, setSort] = useState(null)
  const itemPerPage = 4
  const [pageInfo, setPageInfo] = useState({
    pageNumber: 0,
    itemPerPage: 4,
    totalItems: null,
  })

  const containerClasses = {
    "flexNoWrap": styles.productsComponent_flexNoWrap,
    "grid": `
      ${styles.productsComponent_grid}
      ${props.item === "tree"
        ? `${styles.productsRecomendation} ${styles.productsComponent_gridTree}`
        : ""
      }
    `,
  }
  const sectionClasses = {
    "grid": `
      ${props.item === "tree"
        ? `${styles.productsRecomendation_section} ${styles.productsComponent_gridTree}`
        : ""
      }
    `,
  }

  const { currPage, setCurrPage } = useInfiniteScroll(pageInfo, "products_container")
  const handleShowFilter = () => setShowFilter(!showFilter)
  const handleShowSort = () => setShowSort(!showSort)
  const handleFilter = (selectedFilter: any) => {
    setFilterProduct(selectedFilter)
    setShowFilter(false)
  }
  const handleSort = (selectedSort: any) => {
    setSort(selectedSort)
    setShowSort(false)
  }

  const getSelectedCategory = () => setShowFilter(!showFilter)

  let propsProduct: any
  const baseProductsProps = {
    tagName: tagname || null,
    itemPerPage: itemPerPage,
    classes: classesProducts,
    getPageInfo: (pageInfo: any) => setPageInfo(pageInfo),
    fullPath: `product/{id}`,
    pathPrefix: `product`,
    lazyLoadedImage: false,
    thumborSetting: {
      width: 512,
      format: "webp",
      quality: 85,
    },
  }
  if (type === "grid") {
    if (withInfiniteScroll) {
      propsProduct = {
        ...baseProductsProps,
        itemPerPage: 12,
        collectionSlug: categories,
        sort: sort,
        filter: filterProduct,
        withSeparatedVariant: true,
        loadingComponent:
          [0, 1, 2, 3].map((_, i) => (
            <div key={i}>
              <Placeholder classes={placeholder} withImage withList />
            </div>
          ))
      }
    } else {
      propsProduct = {
        ...baseProductsProps,
        loadingComponent:
          [0, 1, 2, 3].map((_, i) => (
            <div key={i}>
              <Placeholder classes={placeholder} withImage withList />
            </div>
          ))
      }
    }

  } else if (type === "flexNoWrap") {
    propsProduct = {
      ...baseProductsProps,
      loadingComponent:
        [0, 1, 2, 3].map((_, i) => (
          <div key={i} className="ml-2">
            <Placeholder
              classes={{
                placeholderImage: styles.products_placeholderFlexNoWrap,
                placeholderList: styles.products_placeholderList,
              }}
              withImage
              withList
            />
          </div>
        ))
    }
  }

  useEffect(() => {
    setCurrPage(0);
  }, [filterProduct, categories, tagname]);

  if (pageInfo.totalItems === 0 && !withEmptyComponent) return <></>

  return (
    <>
      <section
        className={
          `container my-2 
          ${withFilterSort && pageInfo.totalItems !== 0 ? 'pb-4' : ""}
          ${isLastSection && pageInfo.totalItems !== 0 ? styles.productsComponent_lastSection : ""}
          ${sectionClasses[type] || ""}
        `}
      >
        <div className={`
          ${styles.productsComponent} ${type === "flexNoWrap" && "p-0"}
          ${pageInfo.totalItems === 0 && "mb-0"}
          ${props.item === "tree" && "position-relative"}
        `}>
          {withFilterSort &&
            <div className={styles.productsComponent_action}>
              <button className={styles.productsComponent_actionItem} onClick={handleShowFilter}>
                {i18n.t("product.filter")}
              </button>
              <button className={`${styles.productsComponent_actionItem}`} onClick={handleShowSort}>
                {i18n.t("product.sort")}
              </button>
            </div>
          }
          {withTitle &&
            <div className={`${styles.productsComponent_titleContainer} ${withTitle.type}`}>
              <h2 className={styles.productsComponent_title}>
                {withTitle?.title}
              </h2>
              {withTitle?.withSeeAll &&
                <Link
                  href={`/[lng]/products${tagname ? `?tagname=${tagname}` : ""}`}
                  as={`/${lng}/products${tagname ? `?tagname=${tagname}` : ""}`}
                >
                  <span className={`${styles.productsComponent_seeAll}`}>
                    {i18n.t("product.seeAll")}
                  </span>
                </Link>
              }
            </div>
          }
          {withInfiniteScroll ?
            <div
              className={`
                ${containerClasses[type]} ${withFilterSort && 'mt-0 pt-0'}
                ${pageInfo.totalItems === 0 && "pb-0"}    
              `}
            >
              {Array.from(Array(currPage + 1)).map((_, i) => (
                <Products
                  key={i}
                  pageNumber={i}
                  {...propsProduct}
                />
              ))
              }
            </div>
            :
            <>
              <div className={`${containerClasses[type]}`}>
                <Products {...propsProduct} />
              </div>

              {(withSeeAllBtn && (pageInfo.totalItems > itemPerPage)) &&
                <div className={` ${styles.productsComponent_seeAllProducts}`}>
                  <button
                    className={`${styles.productsComponent_actionItem}`}
                    onClick={() => Router.push("/[lng]/products", `/${lng}/products`)}
                  >
                    {i18n.t("product.seaAllProducts")}
                  </button>
                </div>
              }
            </>
          }
          {/* <Popup
            title={i18n.t("product.filter")}
            withCloseButton
            visibleState={showFilter}
            setVisibleState={setShowFilter}
            withButtonLeft={{
              title: i18n.t("product.reset"),
              onClick: () => {
                let resetSearchParam = useRemoveParams("filter")
                setShowFilter(false)
                Router.replace(`/${lng}/products?${resetSearchParam}`)
              }
            }}
          >
            <ProductCategoryComponent
              i18n={i18n}
              displayMode="list"
              getSelectedSlug={getSelectedCategory}
            />
            <ProductFilterComponent
              i18n={i18n}
              handleFilter={handleFilter}
              withApply
            />
          </Popup>
          */}
          {showSort &&
            <SideMenu
              withClose
              withTitle
              title={i18n.t("product.sort")}
              openSide={showSort}
              toogleSide={handleShowSort}
              positionSide="left"
            >
              <ProductSort
                classes={classesProductSort}
                errorComponent={<p>{i18n.t("global.error")}</p>}
                handleSort={handleSort}
                loadingComponent={
                  <div className={stylesSort.sort} >
                    {
                      [0, 1, 2, 3].map((_, i) => (
                        <Placeholder key={i} classes={placeholder} withList />
                      ))
                    }
                  </div>
                }
              />
            </SideMenu>
          }

        </div >
      </section >
      {pageInfo.totalItems === 0 && withEmptyComponent &&
        <EmptyComponent
          logo={<img src="/icon/empty_product.svg" alt="empty_product" />}
          classes={{ emptyContainer: styles.products_emptyContainer }}
        />
      }
    </>
  )
}

export default ProductsComponent
