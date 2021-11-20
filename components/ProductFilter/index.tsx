/* library package */
import { FC } from 'react'
import { ProductFilter } from '@sirclo/nexus'

/* component */
import ProductCategoryComponent from 'components/ProductCategoryComponent/ProductCategoryComponent'
import Placeholder from 'components/Placeholder'

import stylesProductFilter from 'public/scss/components/ProductFilter.module.scss'

const classes = {
  filtersClassName: stylesProductFilter.filters,
  filterClassName: stylesProductFilter.filter,
  filterNameClassName: stylesProductFilter.name,
  filterVariantClassName: stylesProductFilter.filterVariant,
  filterOptionClassName: stylesProductFilter.option,
  filterColorLabelClassName: stylesProductFilter.optionLabel,
  filterLabelClassName: stylesProductFilter.optionLabel,
  filterCheckboxClassName: stylesProductFilter.optionCheckbox,
  filterColorInputClassName: stylesProductFilter.filterColorInput,
  filterColorPreviewClassName: stylesProductFilter.filterColorPreview,

  /* input  price*/
  filterPriceInputClassName: stylesProductFilter.filterPriceInput,
  filterPriceLabelClassName: stylesProductFilter.filterPriceLabel,
  filterOptionPriceClassName: stylesProductFilter.filterOptionPrice,
  filterInputClassName: stylesProductFilter.filterInput,
  filterPriceClassName: stylesProductFilter.filterPrice,

  /*slider price*/
  filterSliderClassName: stylesProductFilter.filterSlider,
  filterSliderRailClassName: stylesProductFilter.filterSliderRail,
  filterActiveClassName: stylesProductFilter.filterActive,
  filterColorActiveClassName: stylesProductFilter.filterActive,
  filterTagActiveClassName: stylesProductFilter.filterActive,

  /* slider */
  filterSliderHandlesClassName: stylesProductFilter.filterSliderHandles,
  filterSliderHandleClassName: stylesProductFilter.filterSliderHandle,
  filterSliderTrackClassName: stylesProductFilter.filterSliderTrack,
  filterSliderTooltipClassName: stylesProductFilter.filterSliderTooltip,
  filterSliderTooltipContainerClassName: stylesProductFilter.filterSliderTooltipContainer,
  filterSliderTooltipTextClassName: stylesProductFilter.filterSliderTooltipText,
  filterTagClassName: stylesProductFilter.filterTag,
}

const placeholder = {
  placeholderImage: stylesProductFilter.placeholder,
  placeholderList: stylesProductFilter.placeholderList,
}

const ProductFilterComponent: FC<any> = ({
  i18n,
  lng,
  handleFilter,
  getSelectedCategory
}) => {
  return (
    <div className={stylesProductFilter.container}>
      <ProductCategoryComponent
        lng={lng}
        i18n={i18n}
        displayMode="list"
        getSelectedSlug={getSelectedCategory}
        withTitle
      />
      <ProductFilter
        sortType="dropdown"
        classes={classes}
        withPriceMinimumSlider
        withPriceValueLabel
        withPriceInput
        withTooltip
        handleFilter={handleFilter}
        loadingComponent={
          <div className={stylesProductFilter.filters} >
            {
              [0, 1, 2, 3].map((_, i) => (
                <Placeholder key={i} classes={placeholder} withList />
              ))
            }
          </div>
        }
        errorComponent={<p>{i18n.t("global.error")}</p>}
      />
    </div>
  )
}


export default ProductFilterComponent
