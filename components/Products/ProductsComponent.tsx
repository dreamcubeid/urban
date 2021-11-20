/* library package */
import { FC } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import {
  Products,
  ProductSort
} from '@sirclo/nexus'

/* library component */
import useProducts from './hooks/useProducts'

/* component */
import SideMenu from 'components/SideMenu/SideMenu'
import Placeholder from 'components/Placeholder'
import ProductFilterComponent from 'components/ProductFilter'

const EmptyComponent = dynamic(() => import('components/EmptyComponent/EmptyComponent'))

/* styles */
import styles from 'public/scss/components/ProductsComponent.module.scss'
import stylesSort from 'public/scss/components/ProductSort.module.scss'
import router from 'next/router'

export const placeholder = {
  placeholderImage: styles.products_placeholder,
  placeholderList: styles.products_placeholderList,
}

const placeholderSort = {
  placeholderImage: stylesSort.placeholder,
  placeholderList: stylesSort.placeholderList,
}

export const classesProducts = {
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
  type: 'grid'
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

  const {
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
  } = useProducts({ lng, tagname })

  const containerClasses = {
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

  let propsProduct: any
  const baseProductsProps = {
    tagName: tagname || null,
    itemPerPage: 4,
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
        filter: filterProduct,
        withSeparatedVariant: true,
        loadingComponent:
          [0, 1, 2, 3, 4, 5, 6, 7].map((_, i) => (
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
  }

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
          ${pageInfo.totalItems === 0 && "mb-0"}
          ${props.item === "tree" && "position-relative"}
        `}>
          {withFilterSort &&
            <>
              <div className={styles.productsComponent_action}>
                <button className={styles.productsComponent_actionItem} onClick={handleShowFilter}>
                  {i18n.t("product.filter")}
                </button>
                <button className={`${styles.productsComponent_actionItem}`} onClick={handleShowSort}>
                  {i18n.t("product.sort")}
                </button>
              </div>
              <div className={styles.productsComponent_showResetContainer}>
                <p className={styles.productsComponent_show}>
                  {i18n.t("product.show")}
                  {" "}{pageInfo.totalItems}{" "}
                  {i18n.t("product.result")}
                </p>
              {Object.keys(router.query).length > 1 &&
                <button className={`${styles.productsComponent_reset}`} onClick={resetFilter}>
                  {i18n.t("product.reset")}
                </button>
              }
              </div>
            </>
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

              <button onClick={scrollToTop} className={styles.productsComponent_goToTop}>
                <div className={styles.productsComponent_arrowUp}></div>
              </button>
            </div>
            :
            <>
              <div className={`${containerClasses[type]}`}>
                <Products {...propsProduct} />
              </div>

              {(withSeeAllBtn && (pageInfo.totalItems > 4)) &&
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
          {showFilter &&
            <SideMenu
              withClose
              withTitle
              title={i18n.t("product.filter")}
              openSide={showFilter}
              toogleSide={handleShowFilter}
              positionSide={size.width < 765 ? 'left' : 'right'}
            >
              <ProductFilterComponent
                lng={lng}
                i18n={i18n}
                handleFilter={handleFilter}
                withApply
              />
            </SideMenu>
          }
          {showSort &&
            <SideMenu
              withClose
              withTitle
              title={i18n.t("product.sort")}
              openSide={showSort}
              toogleSide={handleShowSort}
              positionSide={size.width < 765 ? 'left' : 'right'}
            >
              <ProductSort
                classes={classesProductSort}
                errorComponent={<p>{i18n.t("global.error")}</p>}
                loadingComponent={
                  <div className={stylesSort.sort} >
                    {
                      [0, 1, 2, 3].map((_, i) => (
                        <Placeholder key={i} classes={placeholderSort} withList />
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
          logo={<div className={styles.products_iconEmpty} />}
          classes={{ emptyContainer: styles.products_emptyContainer }}
          desc={i18n.t("product.isEmpty")}
        />
      }
    </>
  )
}

export default ProductsComponent
