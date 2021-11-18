/* library package */
import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import { ProductDetail, ProductReviews } from '@sirclo/nexus'

/* library component */
import useProductDetail from './hooks/useProductDetail'

/* components */
import Placeholder from 'components/Placeholder'
import Icon from 'components/Icon/Icon'
import SocialShare from 'components/SocialShare'
import EmptyComponent from 'components/EmptyComponent/EmptyComponent'

/* styles */
import styles from 'public/scss/pages/ProductDetail.module.scss'
import stylesNotify from 'public/scss/components/Notify.module.scss'
import stylesEstimate from 'public/scss/components/EstimateShipping.module.scss'
import stylesOpenOrder from 'public/scss/components/OpenOrder.module.scss'
import styleSocialShare from 'public/scss/components/SocialShare.module.scss'
import stylesReview from 'public/scss/components/RatingReview.module.scss'
import stylesPagination from 'public/scss/components/Pagination.module.scss'

const productDetailClass = {
  productDetailParentDivClassName: styles.productDetailParentDiv,
  rowClassName: styles.row,
  imageRowClassName: styles.imageRow,
  mainImageClassName: styles.mainImage,
  accordionClassName: styles.accordion,
  propertyRowClassName: styles.propertyRow,
  propertyInnerContainerClassName: styles.propertyInnerContainer,
  propertyFooterContainerClassname: styles.propertyFooterContainer,
  detailTitleClassName: styles.detailTitle,
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

const classesReview = {
  reviewImageTitleClassName: stylesReview.reviewImageTitle,
  reviewImageContainerClassName: stylesReview.reviewImageContainer,
  reviewImageClassName: stylesReview.reviewImage,
  sortClassName: stylesReview.sort,
  sortOptionsClassName: stylesReview.sortOptions,
  filtersClassName: stylesReview.filters,
  filterClassName: stylesReview.filter,
  activeFilterClassName: stylesReview.activeFilter,
  filterLabelClassName: stylesReview.filterLabel,
  filterInputClassName: stylesReview.filterInput,
  filterIconClassName: stylesReview.filterIcon,
  reviewListContainerClassName: stylesReview.reviewListContainer,
  reviewListImageContainerClassName: stylesReview.reviewListImageContainer,
  reviewListImageClassName: stylesReview.reviewListImage,
  reviewListDescriptionClassName: stylesReview.reviewListDescription,
  reviewListStarContainerClassName: stylesReview.reviewListStarContainer,
  itemPerPageClassName: stylesReview.itemPerPage,
  itemPerPageLabelClassName: stylesReview.itemPerPageLabel,
  itemPerPageOptionsClassName: stylesReview.itemPerPageOptions,
  reviewPopupContainerClassName: stylesReview.reviewPopupContainer,
  reviewPopupContentClassName: stylesReview.reviewPopupContent,
  reviewPopupButtonCloseClassName: stylesReview.reviewPopupButtonClose,
  reviewPopupImagePopupClassName: stylesReview.reviewPopupImagePopup,
  reviewPopupPreviewClassName: stylesReview.reviewPopupPreview,
  reviewPopupImagePreviewClassName: stylesReview.reviewPopupImagePreview,
  reviewPopupLeftButtonClassName: stylesReview.reviewPopupLeftButton,
  reviewPopupRightButtonClassName: stylesReview.reviewPopupRightButton
}

const classesPagination = {
  pagingClassName: `${stylesPagination.pagination} order-6`,
  activeClassName: stylesPagination.pagination_item__active,
  itemClassName: stylesPagination.pagination_item,
  linkClassName: stylesPagination.pagination_link
}

const socialShareClasses = {
  socialShareParentDivClassName: styleSocialShare.socialShareParentDiv,
  socialShareItemClassName: styleSocialShare.socialShareItem,
}
const classesCartPlaceholder = {
  placeholderList: styles.placeholderList,
  placeholderImage: styles.placeholderImage,
}

const classesReviewPlaceholder = {
  placeholderList: stylesReview.placeholderList,
  placeholderImage: stylesReview.placeholderImage,
}

type IProps = {
  lng: string,
  i18n: any,
  data: any,
  slug: string
  urlSite?: string
}

const ProductDetailComponent: FC<IProps> = ({
  lng,
  i18n,
  slug,
  data,
  urlSite
}) => {

  const router = useRouter()
  const [showReview, setShowReview] = useState<boolean>(true)
  const [totalReviews, setTotalReviews] = useState<number>(0)

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
    ModalSuccessNotify,
    productId,
    setProductId
  } = useProductDetail({ lng, i18n, slug })

  const getClassReview = () => {
    if (lng === "en") return {
      ...classesReview,
      itemPerPageOptions:  stylesReview.itemPerPageOptionsEn,
      reviewPopupButtonCloseClassName: stylesReview.reviewPopupButtonCloseEn
    }

    return classesReview
  }

  const toogleShowReview = () => setShowReview(!showReview)

  // if (!data?.published || !data) return <EmptyComponent title={i18n.t("product.isEmpty")} />
  if (!data?.published || !data) return (
    <EmptyComponent
      logo={<div className={styles.iconEmpty} />}
      classes={{ emptyContainer: styles.emptyContainer }}
      desc={i18n.t("product.isEmpty")}
      button={
        <button
          className={styles.btnBackToHome}
          onClick={() => router.push("/[lng]/products", `/${lng}/products`)}
        >
          {i18n.t("product.backToHome")}
        </button>
      }
    />
  )

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
          <>
            <div className={`${styles.customDetail}`}>
              <SocialShare 
                i18n={i18n}
                urlSite={urlSite}
                classes={socialShareClasses}
              />
            </div>
            <div className={`${stylesReview.reviewRatingContainer}`}>
              <div onClick={toogleShowReview}  className={`${stylesReview.reviewRatingHeader}`}>
                <p>{i18n.t("product.review")}</p>
                {showReview
                  ? <Icon.RiCloseFill size=".8em" />
                  : <Icon.productDetail.accordionIcon size=".8em" />
                }
              </div>
              <div className={stylesReview.totalAllReview}>
                <p>{totalReviews}{" "}{i18n.t("product.review")}</p>
                <div className={stylesReview.iconStarReview}></div>
              </div>
              {showReview &&
                <ProductReviews
                  productID={productId}
                  productName={slug}
                  classes={getClassReview()}
                  reviewsPaginationClasses={classesPagination}
                  itemPerPageOptions={[5, 10, 25, 50]}
                  iconClose={<Icon.RiCloseFill />}
                  iconLeft={<Icon.chevronLeft />}
                  iconRight={<Icon.chevronRight />}
                  reviewsNextLabel={<Icon.arrowRight />}
                  reviewsPrevLabel={<Icon.arrowLeft />}
                getTotalAllReviews={(total: number) => setTotalReviews(total)}
                  loadingComponent={
                    <div className={stylesReview.placeholderContainer}>
                      <Placeholder
                        classes={classesReviewPlaceholder}
                        withImage
                        withList
                        listMany={3}
                      />
                    </div>
                  }
                  thumborSetting={{
                    width: 500,
                    format: 'webp',
                    quality: 85,
                  }}
                  customEmptyComponentReviewsByAdmin={<></>}
                  customEmptyComponentReviews={
                    <div className={stylesReview.emptyContainer}>
                      <h5 className={stylesReview.emptyTitle}>
                        {i18n.t("testimonial.isEmpty")}
                      </h5>
                    </div>
                  }
                />
              }
            </div>
          </>
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
