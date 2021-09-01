/* library package */
import { FC } from 'react'
import { ProductFilter } from '@sirclo/nexus'
/* component */
import styles from 'public/scss/components/ProductFilter.module.scss'

const classes = {
  filtersClassName: styles.productFilter,
  filterClassName: styles.productFilter_filter,
  filterNameClassName: styles.productFilter_name,
  filterVariantClassName: styles.productFilter_filterVariant,
  filterOptionClassName: styles.productFilter_option,
  filterColorLabelClassName: styles.productFilter_optionLabel,
  filterLabelClassName: styles.productFilter_optionLabel,
  filterCheckboxClassName: styles.productFilter_optionCheckbox,
  filterColorInputClassName: styles.productFilter_filterColorInput,

  /* input  price*/
  filterPriceInputClassName: styles.productFilter_filterPriceInput,
  filterPriceLabelClassName: styles.productFilter_filterPriceLabel,
  filterOptionPriceClassName: styles.productFilter_filterOptionPrice,
  filterInputClassName: styles.productFilter_filterInput,
  filterPriceClassName: styles.productFilter_filterPrice,

  /*slider price*/
  filterSliderClassName: styles.productFilter_filterSlider,
  filterSliderRailClassName: styles.productFilter_filterSliderRail,
  filterActiveClassName: styles.productFilter_filterActive,
  filterColorActiveClassName: styles.productFilter_filterActive,
  filterTagActiveClassName: styles.productFilter_filterActive,
  filterSliderHandleClassName: styles.productFilter_filterSliderHandle,
  filterSliderTrackClassName: styles.productFilter_filterSliderTrack,
}

const ProductFilterComponent: FC<any> = ({
  i18n,
  handleFilter,
  withApply
}) => {
  return (
    <ProductFilter
      sortType="dropdown"
      classes={classes}
      withPriceMinimumSlider
      withPriceValueLabel
      withPriceInput
      withApply={withApply}
      handleFilter={handleFilter}
      errorComponent={<p>{i18n.t("global.error")}</p>}
    />
  )
}


export default ProductFilterComponent
