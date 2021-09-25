/* library package */
import { FC, useState } from 'react'
import dynamic from 'next/dynamic'
import Router from 'next/router'
import { ProductDetail, formatPrice } from '@sirclo/nexus'

/* library component */
import useWindowSize from 'lib/useWindowSize'

/* components */
import Placeholder from 'components/Placeholder'
const Popup = dynamic(() => import('components/Popup/Popup'))

/* styles */
import styles from 'public/scss/pages/ProductDetail.module.scss'
import stylesSuccessAddToCart from 'public/scss/components/SuccessAddToCart.module.scss'
import stylesErrorAddToCart from 'public/scss/components/ErrorAddToCart.module.scss'

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
  detailTitleStarNumberClassName: styles.detailTitleStarNumber,
  selectedVariantContainerClassName: styles.selectedVariantContainer,
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

  const size = useWindowSize()
  const IS_PROD = process.env.IS_PROD

  const [successAddToCart, setSuccessAddToCart] = useState(null)
  const [errorAddToCart, setErrorAddToCart] = useState(null)
  const [errorNotify, setErrorNotify] = useState<boolean>(false)
  const [successNotify, setSuccessNotify] = useState<boolean>(false)

  const toogleErrorAddToCart = () => setErrorAddToCart(!errorAddToCart)
  const toogleHideSuccedAddToCart = () => setSuccessAddToCart(false)
  const toogleErrorNotify = () => setErrorNotify(!errorNotify)
  const toogleSuccessNotify = () => setSuccessNotify(!successNotify)

  const toogleSuccessAddToCart = (data: any) => {
    const detailProduct = data?.filter((data: any) => data?.slug === slug)
    setSuccessAddToCart(detailProduct[0])
  }

  return (
    <section className="container">
      <ProductDetail
        slug={slug}
        withButtonBuyNow
        lazyLoadedImage={false}
        accordionIcon={<div>accordion</div>}
        classes={{
          ...productDetailClass,
          ...openOrderClass,
          ...estimateShippingClass
        }}
        getProductID={(id) => setProductId(id)}
        qtyLabel={i18n.t("product.quantity")}
        enableArrow={size?.width < 576 ? true : false}
        enableDots={size?.width < 576 ? true : false}
        onComplete={(data: any) => {
          toogleSuccessAddToCart(data?.saveCart ? data?.saveCart?.lineItems :
            data?.saveCartByMemberID?.lineItems)
        }}
        onCompleteMsg={toogleSuccessNotify}
        onError={toogleErrorAddToCart}
        onErrorMsg={(msg) => msg && toogleErrorNotify}
        withEstimateShipping={IS_PROD === "false" ? true : false}
        prevIcon={<span className={styles.prevIcon}>{"<"}</span>}
        nextIcon={<span className={styles.nextIcon}>{">"}</span>}
        notifyIcon={<></>/* TODO: NOTIFY */}
        openOrderIconDate={<></>/* TODO: OPEN ORDER */}
        openOrderIconTime={<></>/* TODO: OPEN ORDER */}
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
          [0, 1, 2].map((_, i) => (
            <div>
              <div key={i} className={styles.placeholderContainer}>
                <Placeholder
                  classes={classesCartPlaceholder}
                  withImage
                  withList
                  listMany={3}
                />
              </div>
            </div>
          ))
        }
      />

      {successAddToCart &&
        <Popup
          setPopup={toogleHideSuccedAddToCart}
          mobileFull={false}
        >
          <div className={stylesSuccessAddToCart.container}>
            <h2 className={stylesSuccessAddToCart.title}>{i18n.t("cart.successAddToCart")}</h2>
            <div className={stylesSuccessAddToCart.detail}>
              <img
                src={successAddToCart?.imageURL}
                className={stylesSuccessAddToCart.image}
              />
              <div>
                <h4 className={stylesSuccessAddToCart.detailTitle}>{successAddToCart?.title}</h4>
                <div className={stylesSuccessAddToCart.detailPriceContainer}>
                  {successAddToCart?.discount.value !== 0 &&
                    <span className={stylesSuccessAddToCart.detailSale}> {formatPrice(successAddToCart?.price?.value, "IDR")} </span>
                  }
                  <p className={stylesSuccessAddToCart.detailPrice}> {formatPrice(successAddToCart?.salePrice?.value, 'IDR')} </p>
                </div>
              </div>
            </div>
            <div className={stylesSuccessAddToCart.footer}>
              <button
                className={stylesSuccessAddToCart.viewCartBtn}
                onClick={() => Router.push("/[lng]/cart", `/${lng}/cart`)}
              >
                {i18n.t("orderSummary.viewCart")}
              </button>
              <button
                className={stylesSuccessAddToCart.continueShoppingBtn}
                onClick={() => Router.push("/[lng]/products", `/${lng}/products`)}
              >
                {i18n.t("global.continueShopping")}
              </button>
            </div>
          </div>
        </Popup>
      }

      {errorAddToCart &&
        <Popup
          setPopup={toogleErrorAddToCart}
          mobileFull={false}
        >
          <div className={stylesErrorAddToCart.popupErrorContainer}>
            <h3 className={stylesErrorAddToCart.popupErrorTitle}>{i18n.t("cart.errorSKUTitle")}</h3>
            <p className={stylesErrorAddToCart.popupErrorDesc}>{i18n.t("cart.errorSKUDesc")} </p>
            <button
              className={stylesErrorAddToCart.backBtn}
              onClick={toogleErrorAddToCart}
              data-identity="addToCart-back-btn"
            >
              {i18n.t("global.back")}
            </button>
          </div>
        </Popup>
      }
    </section>
  )
}

export default ProductDetailComponent
