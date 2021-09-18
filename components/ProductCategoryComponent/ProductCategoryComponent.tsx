/* library package */
import { FC } from 'react'
import { ProductCategory } from '@sirclo/nexus'
import Link from 'next/link';
/* library template */
import useWindowSize from 'lib/useWindowSize'
/* component */
import Placeholder from 'components/Placeholder'
import styles from 'public/scss/components/ProductCategory.module.scss'

const classesProductCategory = {
  parentCategoryClassName: styles.productCategory_section,
  categoryItemClassName: styles.productCategory_item,
  categoryValueContainerClassName: styles.productCategory_valueContainer,
  categoryValueClassName: styles.productCategory_link,
  imgContainerClassName: styles.productCategory_media,
  imgClassName: styles.productCategory_image,
  categoryNameClassName: styles.productCategory_name,
  dropdownIconClassName: styles.productCategory_dropdown,
  selectedCategoryClassName: styles.productCategory_selectedCategory
}

const classesPlaceholderCategory = {
  placeholderList: styles.productCategory_placeholder
};

type ProductCategoryComponentPropType = {
  i18n: any
  lng: string
  displayMode?: 'normal'
  | 'list'
  withTitle?: boolean
  withSeeAll?: boolean
  getSelectedSlug?: () => void
}

const ProductCategoryComponent: FC<ProductCategoryComponentPropType> = ({
  i18n,
  displayMode = 'normal',
  withTitle,
  withSeeAll,
  lng,
  getSelectedSlug
}) => {

  const size: any = useWindowSize()
  let classes: object

  switch (displayMode) {

    case 'list':
      classes = {
        ...classesProductCategory,
        parentCategoryClassName: styles.productCategory_sectionList,
        categoryItemClassName: styles.productCategory_itemList,
        categoryNameClassName: styles.productCategory_nameList,
      }
      break
    default:
      classes = classesProductCategory
  }

  return (
    <div className={
      displayMode === "normal"
        ? styles.productCategory_container
        : styles.productCategory_containerList
    }>
      {withTitle &&
        <h2>
          {
            displayMode === "normal"
              ? i18n.t("home.productCategory")
              : i18n.t("categories.categories")
          }
        </h2>
      }
      <ProductCategory
        showCategoryNumber
        itemPerPage={5}
        classes={classes}
        showImages={displayMode !== 'list'}
        dropdownIcon={displayMode === 'list' && <div className="icon-chevronDown"></div>}
        thumborSetting={{
          width: size.width < 767 ? 0 : 795,
          format: "webp",
          quality: 95,
        }}
        getSelectedSlug={getSelectedSlug}
        loadingComponent={
          <div className={`${styles.productCategory_loading} ${displayMode}`}>
            <Placeholder
              classes={classesPlaceholderCategory}
              withList
              listMany={8}
            />
          </div>
        }
        errorComponent={
          <div className={styles.productCategory_loading}>
            <p>{i18n.t("global.error")}</p>
          </div>
        }
      />
      {withSeeAll &&
        <Link href="/[lng]/categories" as={`/${lng}/categories`}>
          <div className={styles.productCategory_seeAll}>
            <p>{i18n.t("product.seeAll")}</p>
          </div>
        </Link>
      }
    </div>
  )
}

export default ProductCategoryComponent