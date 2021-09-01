/* library package */
import { FC } from 'react'
import { ProductCategory } from '@sirclo/nexus'
/* library template */
import useWindowSize from 'lib/useWindowSize'

/* component */
import Placeholder from 'components/Placeholder'
import styles from 'public/scss/components/ProductCategory.module.scss'

const classesProductCategory = {
  parentCategoryClassName: styles.productCategory,
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
  displayMode?: 'normal'
  | 'reels'
  | 'list'
  getSelectedSlug?: () => void
}

const ProductCategoryComponent: FC<ProductCategoryComponentPropType> = ({
  i18n,
  displayMode = 'normal',
  getSelectedSlug
}) => {

  const size: any = useWindowSize()
  let classes: object

  switch (displayMode) {
    case 'reels':
      classes = {
        ...classesProductCategory,
        parentCategoryClassName: styles.productCategory__reels
      }
      break
    case 'list':
      classes = {
        ...classesProductCategory,
        parentCategoryClassName: styles.productCategory__list,
        imgContainerClassName: "d-none",
        dropdownIconClassName: styles.productCategory_dropdownIcon,
      }
      break
    default:
      classes = classesProductCategory
  }

  return (
    <ProductCategory
      withOpenedSubCategory={false}
      classes={classes}
      showImages={displayMode !== 'list'}
      imageFallback={
        <div className={styles.productCategory_media}></div>
      }
      dropdownIcon={displayMode === 'list' && <div className="icon-chevronDown"></div>}
      thumborSetting={{
        width: size.width < 767 ? 76 : 192,
        format: "webp",
        quality: 85,
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
  )
}

export default ProductCategoryComponent