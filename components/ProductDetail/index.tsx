/* library package */
import { FC } from 'react'
import { ProductDetail } from '@sirclo/nexus'

/* library component */
import useProductDetail from './hooks/useProductDetail'

/* components */
import Placeholder from 'components/Placeholder'
import Icon from 'components/Icon/Icon'
import SocialShare from 'components/SocialShare'

/* styles */
import styles from 'public/scss/pages/ProductDetail.module.scss'
import stylesNotify from 'public/scss/components/Notify.module.scss'
import stylesEstimate from 'public/scss/components/EstimateShipping.module.scss'
import stylesOpenOrder from 'public/scss/components/OpenOrder.module.scss'
import styleSocialShare from 'public/scss/components/SocialShare.module.scss'

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
  openOrderClassName: stylesOpenOrder.openOrder,
  openOrderTitleClassName: stylesOpenOrder.openOrderTitle,
  openOrderContainerClassName: stylesOpenOrder.openOrderContainer,
  openOrderDateClassName: stylesOpenOrder.openOrderDate,
  openOrderTimeClassName: stylesOpenOrder.openOrderTime,
  openOrderTimeoutClassName: stylesOpenOrder.openOrderTimeout,
  openOrderTimeoutDescClassName: stylesOpenOrder.openOrderTimeoutDesc,
  openOrderTimeoutBtnClassName: stylesOpenOrder.openOrderTimeoutBtn,
  countDownContainerClassName: stylesOpenOrder.countDownContainer,
  countDownItemClassName: stylesOpenOrder.countDownItem,
  countDownItemTextClassName: stylesOpenOrder.countDownItemText,
}

const estimateShippingClass = {
  estimateShippingWrapperClassName: stylesEstimate.estimateShippingWrapper,
  estimateShippingTitleClassName: stylesEstimate.estimateShippingTitle,
  estimateShippingLogoClassName: stylesEstimate.estimateShippingLogo,
  estimateShippingLogoImgClassName : stylesEstimate.estimateShippingLogoImg,
  estimateShippingDetailClassName: stylesEstimate.estimateShippingDetail,
  estimateShippingShowCourierClassName: stylesEstimate.estimateShippingShowCourier,
  estimateShippingCostClassName: stylesEstimate.estimateShippingCost,
  estimateShippingPopupContainerClassName: stylesEstimate.estimateShippingPopupContainer,
  estimateShippingPopupContentClassName: stylesEstimate.estimateShippingPopupContent,
  estimateShippingPopupTitleClassName: stylesEstimate.estimateShippingPopupTitle,
  estimateShippingPopupButtonCloseClassName: stylesEstimate.estimateShippingPopupButtonClose,
  estimateShippingPopupBodyClassName: stylesEstimate.estimateShippingPopupBody,
  estimateShippingPopupLineInfoClassName: stylesEstimate.estimateShippingPopupLineInfo,
  estimateShippingPopupLabelClassName: stylesEstimate.estimateShippingPopupLabel,
  estimateShippingPopupValueClassName: stylesEstimate.estimateShippingPopupValue,
  estimateShippingPopupProviderClassName: stylesEstimate.estimateShippingPopupProvider,
  estimateShippingPopupLineProviderClassName: stylesEstimate.estimateShippingPopupLineProvider,
  estimateShippingPopupProviderImgClassName: stylesEstimate.estimateShippingPopupProviderImg,
  estimateShippingPopupProviderLabelClassName: stylesEstimate.estimateShippingPopupProviderLabel,
  estimateShippingPopupProviderValueClassName: stylesEstimate.estimateShippingPopupProviderValue,
}

const socialShareClasses = {
  socialShareParentDivClassName: styleSocialShare.socialShareParentDiv,
  socialShareItemClassName: styleSocialShare.socialShareItem,
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
  urlSite?: string
}

const ProductDetailComponent: FC<IProps> = ({
  lng,
  i18n,
  slug,
  setProductId,
  urlSite
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
        accordionIcon={<Icon.productDetail.accordionIcon />}
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
        estimateIconClose={<Icon.productDetail.estimateIconClose />}
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
          <div className={`tes ${styles.customDetail}`}>
            <SocialShare 
              i18n={i18n}
              urlSite={urlSite}
              classes={socialShareClasses}
            />
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
