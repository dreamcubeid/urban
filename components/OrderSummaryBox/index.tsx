/* library package */
import { FC } from 'react'
import { toast } from 'react-toastify'
import { OrderSummary, CartDetails } from '@sirclo/nexus'
import Link from 'next/link'
// import dynamic from 'next/dynamic'

/* component */
import Placeholder from 'components/Placeholder'
import Icon from '../Icon/Icon'

/* styles */
import styles from 'public/scss/components/OrderSummary.module.scss'
import stylesCartDetails from 'public/scss/components/CartDetails.module.scss'
import stylesPriceBreakdown from 'public/scss/components/PriceBreakdown.module.scss'
import stylesPopup from 'public/scss/components/PopUpVoucherCoupon.module.scss'

const classesOrderSummary = {
  containerClassName: styles.container,
  headerClassName: styles.header,
  subTotalClassName: styles.subTotal,
  subTotalTextClassName: styles.subTotalText,
  subTotalPriceClassName: styles.subTotalPrice,
  footerClassName: styles.footer,
  continueShoppingClassName: styles.continueShopping,
  pointEarnedBannerClassName: styles.pointEarnedBanner,
  submitButtonClassName: styles.submitButton,
  expandButtonClassName: stylesPriceBreakdown.expandButton,
  expandedDivClassName: stylesPriceBreakdown.expandedDiv,

  /* applied coupon and point */
  voucherTextClassName: styles.voucherText,
  voucherButtonAppliedClassName: styles.voucherButtonApplied,
  voucherButtonClassName: styles.voucherButton,
  voucherAppliedTextClassName: styles.voucherAppliedText,
  voucherAppliedIconClassName: styles.voucherAppliedIcon,
  voucherButtonRemoveClassName: styles.voucherButtonRemove,
  voucherIconClassName: styles.voucherIcon,
  pointsTextClassName: styles.pointsText,
  pointsButtonClassName: styles.pointsButton,
  pointsButtonAppliedClassName: styles.voucherButtonApplied,
  pointsIconClassName: styles.pointsIcon,
  pointsAppliedTextClassName: styles.voucherAppliedText,

  /* Pop Up */
  popupClassName: stylesPopup.popup,
  closeButtonClassName: stylesPopup.closeButton,
  voucherContainerClassName: stylesPopup.voucherContainer,
  pointsContainerClassName: `${stylesPopup.voucherContainer} ${stylesPopup.voucherContainer__noGradient}`,
  voucherFormContainerClassName: stylesPopup.voucherFormContainer,
  voucherFormClassName: `groocery-form ${stylesPopup.voucherForm}`,
  voucherInputClassName: "form-control",
  /* Voucher  up */
  voucherSubmitButtonClassName: stylesPopup.voucherFormSubmit,
  voucherListClassName: stylesPopup.voucherList,
  voucherListHeaderClassName: stylesPopup.voucherListHeader,
  voucherClassName: stylesPopup.voucher,
  voucherDetailClassName: stylesPopup.voucherDetail,
  voucherDetailHeaderClassName: stylesPopup.voucherDetailHeader,
  voucherDetailCodeClassName: stylesPopup.voucherDetailCode,
  voucherDetailTitleClassName: stylesPopup.voucherDetailTitle,
  voucherDetailDescClassName: stylesPopup.voucherDetailDesc,
  voucherDetailEstimateClassName: stylesPopup.voucherDetailEstimate,
  voucherDetailEstimateDescClassName: stylesPopup.voucherDetailEstimateDesc,
  /* point Pop-up */
  totalPointsClassName: stylesPopup.totalPoints,
  pointsFormContainerClassName: styles.pointsFormContainer,
  pointsFormClassName: stylesPopup.pointsForm,
  changePointsClassName: stylesPopup.changePoints,
  pointsSubmitButtonClassName: stylesPopup.pointsSubmitButton,
  pointsWarningClassName: stylesPopup.pointsWarning,
  pointsInsufficientClassName: stylesPopup.pointsInsufficient,
  pointValueClassName: stylesPopup.pointValue,
  pointLabelClassName: stylesPopup.pointLabel,
  numberOfPointsClassName: stylesPopup.numberOfPoints,
}

const classesCartDetails = {
  className: stylesCartDetails.container,
  cartHeaderClassName: stylesCartDetails.cartHeader,
  itemClassName: stylesCartDetails.item,
  itemImageClassName: stylesCartDetails.itemImage,
  itemTitleClassName: stylesCartDetails.itemTitle,
  titleClassName: stylesCartDetails.title,
  selectedVariantClassName: stylesCartDetails.selectedVariant,
  itemRegularPriceClassName: stylesCartDetails.itemRegularPrice,
  itemSalePriceClassName: stylesCartDetails.itemSalePrice,
  qtyBoxClassName: `${stylesCartDetails.qtyBox} id`,
  itemRegularAmountClassName: stylesCartDetails.itemRegularAmount,
  cartBodyClassName: stylesCartDetails.cartBody,
  selectedVariantContainerClassName: stylesCartDetails.selectedVariantContainer,
  changeQtyButtonClassName: 'd-none',
  removeButtonClassName: 'd-none',
  cartFooterClassName: 'd-none',
}

const classesCartPlaceholder = {
  placeholderList: stylesCartDetails.placeholderList,
  placeholderImage: stylesCartDetails.placeholderImage,
}

type iProps = {
  i18n: any
  lng: string
  page: "cart"
  | "place_order"
  | "shipping_method"
  | "payment_method"
  withCartDetails?: boolean
}
const OrderSummaryBox: FC<iProps> = ({
  i18n,
  lng,
  page,
  withCartDetails = true
}) => {

  // const [showModalErrorAddToCart, setShowModalErrorAddToCart] = useState<boolean>(false)
  // const toogleErrorAddToCart = () => setShowModalErrorAddToCart(!showModalErrorAddToCart)

  const icons = {
    expand: <Icon.orderSummary.expand />,
    collapse: <Icon.orderSummary.collapse />,
    voucher: <Icon.orderSummary.voucher />,
    voucherApplied: <Icon.orderSummary.voucherApplied />,
    voucherRemoved: <Icon.orderSummary.voucherRemoved />,
    points: <Icon.orderSummary.points />,
    pointsApplied: <Icon.orderSummary.pointsApplied />,
    close: <Icon.orderSummary.close />
  }

  const getNewclassesCartDetails = () => {
    if (lng === "en") return {
      ...classesCartDetails,
      qtyBoxClassName: `${stylesCartDetails.qtyBox} en`,
    }

    return classesCartDetails
  }

  return (
    <>
      {withCartDetails &&
        <section className={stylesCartDetails.section}>
          <div className={stylesCartDetails.header}>
            <h2 className={stylesCartDetails.title}>
              {i18n.t("cart.title")}
            </h2>
            <Link href="lng/cart" as={`${lng}/cart`}>
              <p className={stylesCartDetails.changeCart}>
                {i18n.t("orderSummary.changeCart")}
              </p>
            </Link>
          </div>
          <CartDetails
            currency="IDR"
            withSeparatedVariant={true}
            itemRedirectPathPrefix={`product`}
            onErrorMsg={(msg) => toast.error(msg)}
            classes={getNewclassesCartDetails()}
            isEditable={false}
            thumborSetting={{
              width: 200,
              format: "webp",
              quality: 85,
            }}
            loadingComponent={
              [0, 1].map((_, i) => (
                <div>
                  <div key={i} className={stylesCartDetails.placeholderContainer}>
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
        </section>
      }
      <OrderSummary
        isAccordion
        classes={classesOrderSummary}
        currency="IDR"
        submitButtonLabel={i18n.t("orderSummary.placeOrder")}
        page={page}
        onErrorMsg={() => toast.error(i18n.t("global.error"))}
        onErrorMsgCoupon={(msg) => toast.error(msg)}
        onAddressInvalid={(e) => toast.error(e)}
        icons={icons}
        couponLoadingComponent={
          <p className="m-0 p-0">{i18n.t("global.loading")}</p>
        }
        pointsLoadingComponent={
          <p className="m-0 p-0">{i18n.t("global.loading")}</p>
        }
      />
      {/* TODO: UNTUK TASK Error ordr summary box */}
      {/* {showModalErrorAddToCart &&
        <ErrorPopup toggleModal={toogleErrorAddToCart} />
      } */}
    </>
  )
}

export default OrderSummaryBox
