/* library package */
import { FC } from 'react'
import { ProductDetail } from '@sirclo/nexus'

/* library component */
import useProductDetail from './hooks/useProductDetail'

/* components */
import Placeholder from 'components/Placeholder'
import Icon from 'components/Icon/Icon'

/* styles */
import styles from 'public/scss/pages/ProductDetail.module.scss'
import stylesNotify from 'public/scss/components/Notify.module.scss'

const productDetailClass = {
  productDetailParentDivClassName: styles.productDetailParentDiv,
  rowClassName: styles.row,
  imageRowClassName: styles.imageRow,
  mainImageClassName: styles.mainImage,
  accordionClassName: styles.accordion,
  propertyRowClassName: styles.propertyRow,
  propertyInnerContainerClassName: styles.propertyInnerContainer,
  propertyFooterContainerClassname: styles.propertyFooterContainer,
  detailTitleContainerClassName: styles.detailTitleContainer,
  detailTitleClassName: styles.detailTitle,
  detailTitleStarClassName: styles.detailTitleStar,
  selectetVariantClassName: styles.selectetVariant,
  variantContainerClassName: styles.variantContainer,
  variantOptionsContainerClassName: styles.variantOptionsContainer,
  variantOptionsClassName: styles.variantOptions,
  variantLabelClassName: styles.variantLabel,
  variantInputClassName: styles.variantInput,
  qtyBoxClassName: styles.qtyBox,
  qtyLabelClassName: styles.qtyLabel,
  qtyWrapperClassName: styles.qtyWrapper,
  descriptionClassName: styles.description,
  additionalInfoClassName: styles.additionalInfo,
  salePriceClassName: styles.salePrice,
  priceClassName: styles.price,
  addToCartBtnClassName: styles.addToCartBtn,
  buyNowBtnClassName: styles.buyNowBtn,
  tabsClasses: styles.tab,
  lightboxPopupClassName: styles.lightboxPopup,
  lightboxContentClassName: styles.lightboxContent,
  closeButtonClassName: styles.closeButton,
  dotClassName: styles.dot,
  arrowClassName: styles.arrow,
  detailTitleStarNumberClassName: styles.detailTitleStarNumber
}

const notifyMeClass = {
  notifyMeClassName: stylesNotify.notifyMe,
  notifyMeLabelClassName: stylesNotify.notifyMeLabel,
  notifyMeInputClassName: stylesNotify.notifyMeInput,
  notifyMeSubmitClassName: stylesNotify.notifyMeSubmit,
}

const openOrderClass = {
  openOrderClassName: styles.openOrder,
  openOrderTitleClassName: styles.openOrderTitle,
  openOrderContainerClassName: styles.openOrderContainer,
  openOrderDateClassName: styles.openOrderDate,
  openOrderTimeClassName: styles.openOrderTime,
  openOrderTimeoutClassName: styles.openOrderTimeout,
  openOrderTimeoutDescClassName: styles.openOrderTimeoutDesc,
  openOrderTimeoutBtnClassName: styles.openOrderTimeoutBtn,
  countDownContainerClassName: styles.countDownContainer,
  countDownItemClassName: styles.countDownItem,
  countDownItemTextClassName: styles.countDownItemText,
}

const estimateShippingClass = {
  estimateShippingLogoImgClassName: styles.estimateShippingLogoImg,
}

const classesCartPlaceholder = {
  placeholderList: styles.placeholderList,
  placeholderImage: styles.placeholderImage,
}

type IProps = {
  lng: string,
  i18n: any,
  slug: string
  setProductId?: any
}

const ProductDetailComponent: FC<IProps> = ({
  lng,
  i18n,
  slug,
  setProductId
}) => {

  const {
    successAddToCart,
    errorAddToCart,
    errorNotify,
    successNotify,
    toogleErrorAddToCart,
    toogleErrorNotify,
    toogleSuccessNotify,
    IS_PROD,
    toogleSuccessAddToCart,
    ModalSuccessAddToCart,
    ModalErrorAddToCart,
    ModalErrorNotify,
    ModalSuccessNotify
  } = useProductDetail({ lng, i18n, slug })

  return (
    <section className="container">
      <ProductDetail
        slug={slug}
        withButtonBuyNow
        lazyLoadedImage={false}
        accordionIcon={<div>accordion</div>}
        classes={{
          ...productDetailClass,
          ...notifyMeClass,
          ...openOrderClass,
          ...estimateShippingClass
        }}
        getProductID={(id) => setProductId(id)}
        qtyLabel={i18n.t("product.quantity")}
        enableArrow
        enableDots
        onComplete={(data: any) => {
          toogleSuccessAddToCart(data?.saveCart ? data?.saveCart?.lineItems :
            data?.saveCartByMemberID?.lineItems)
        }}
        onCompleteMsg={toogleSuccessNotify}
        onError={toogleErrorAddToCart}
        onErrorMsg={(msg) => msg && toogleErrorNotify()}
        withEstimateShipping={IS_PROD === "false" ? true : false}
        prevIcon={<Icon.productDetail.prevIcon />}
        nextIcon={<Icon.productDetail.nextIcon />}
        notifyIcon={<Icon.productDetail.notifyIcon />}
        openOrderIconDate={<Icon.productDetail.openOrderIconDate />}
        openOrderIconTime={<Icon.productDetail.openOrderIconTime />}
        isButton={{
          0: true,
          1: true,
        }}
        thumborSetting={{
          width: 800,
          format: "webp",
          quality: 85,
        }}
        customDetailComponent={
          <div className={styles.customDetail}>
            {/* TODO: DETAIL */}
          </div>
        }
        loadingComponent={
          <div className={styles.placeholderContainer}>
            <Placeholder
              classes={classesCartPlaceholder}
              withImage
              withList
              listMany={8}
            />
          </div>
        }
      />
      {successAddToCart && <ModalSuccessAddToCart />}
      {errorAddToCart && <ModalErrorAddToCart />}
      {errorNotify && <ModalErrorNotify />}
      {successNotify && <ModalSuccessNotify />}
    </section >
  )
}

export default ProductDetailComponent
