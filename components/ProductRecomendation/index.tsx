/* library package */
import { FC, useState } from 'react'
import {
  Products,
  isProductRecommendationAllowed
} from '@sirclo/nexus'
/* library component */
import useWindowSize from 'lib/useWindowSize'
import Icon from 'components/Icon/Icon'
/* styles */
import styles from 'public/scss/components/ProductRecomendation.module.scss'
import Placeholder from 'components/Placeholder';
import { classesProducts, placeholder } from '../Products/ProductsComponent'

const classesPaggination = {
  pagingClassName: styles.pagination,
  itemClassName: styles.paginationItem
}

export type Iprops = {
  type: "upsell" | "crossSell"
  data?: any
  slug?: string
  SKUs?: string | Array<string>
  title: string
}

const ProductRecomendation: FC<Iprops> = ({
  type,
  data,
  slug = null,
  SKUs = null,
  title
}) => {

  const size = useWindowSize()
  const allowedProductRecommendation = isProductRecommendationAllowed()
  const [totalItems, setTotalItems] = useState<number>(null)

  if (!allowedProductRecommendation) return <></>
  if (totalItems === 0) return <></>
  if (!slug && !SKUs) return <></>
  if (!data?.published || !data) return <></>

  let productsProps: any = type === "crossSell"
    ? { SKUs, getCrossSellPageInfo: (pageInfo: any) => setTotalItems(pageInfo.totalItems) }
    : { slug, getPageInfo: (pageInfo: any) => setTotalItems(pageInfo.totalItems) }

  return (
    <section className={`container ${styles.wrapper}`}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.container}>
        <Products
          {...productsProps}
          classes={classesProducts}
          paginationClasses={classesPaggination}
          itemPerPage={4}
          slug={slug}
          SKUs={SKUs}
          newPagination={type === "crossSell"}
          buttonNext={<Icon.arrowRight />}
          buttonPrev={<Icon.arrowLeft />}
          fullPath={`product/{slug}`}
          pathPrefix={`product`}
          thumborSetting={{
            width: size.width < 768 ? 512 : 800,
            format: "webp",
            quality: 85,
          }}
          loadingComponent={
            [0, 1, 2, 3].map((_, i) => (
              <div key={i}>
                <Placeholder classes={placeholder} withImage withList />
              </div>
            ))
          }
        />
      </div>
    </section>
  )
}

export default ProductRecomendation;