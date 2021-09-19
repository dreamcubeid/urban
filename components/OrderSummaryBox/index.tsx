/* library package */
import { FC, useState } from 'react'
import { toast } from 'react-toastify'
import { OrderSummary, CartDetails } from '@sirclo/nexus'
// import dynamic from 'next/dynamic'

/* component */
import Placeholder from 'components/Placeholder'
import Icon from '../Icon/Icon'

/* styles */
import styles from 'public/scss/components/OrderSummary.module.scss'
import stylesPriceBreakdown from 'public/scss/components/PriceBreakdown.module.scss'
import stylesCartDetails from 'public/scss/components/CartDetails.module.scss'
// import stylesPopup from 'public/scss/components/PopUpVoucherCoupon.module.scss'

const classesOrderSummary = {
  containerClassName: styles.orderSummary,
  headerClassName: styles.orderSummary_header,
  subTotalClassName: styles.orderSummary_subTotal,
  subTotalTextClassName: styles.orderSummary_subTotalText,
  subTotalPriceClassName: styles.orderSummary_subTotalPrice,
  footerClassName: styles.orderSummary_footer,
  continueShoppingClassName: styles.orderSummary_continueShopping,
  submitButtonClassName: styles.orderSummary_submitButton,
  expandButtonClassName: stylesPriceBreakdown.expandButton,
  expandedDivClassName: stylesPriceBreakdown.expandedDiv,

  /* applied coupon and point */
  voucherTextClassName: styles.orderSummary_voucherText,
  voucherButtonAppliedClassName: styles.orderSummary_voucherButtonApplied,
  voucherButtonClassName: styles.orderSummary_voucherButton,
  voucherAppliedTextClassName: styles.orderSummary_voucherAppliedText,
  voucherAppliedIconClassName: styles.orderSummary_voucherAppliedIcon,
  voucherButtonRemoveClassName: styles.orderSummary_voucherButtonRemove,
  voucherIconClassName: styles.orderSummary_voucherIcon,
  pointsTextClassName: styles.orderSummary_pointsText,
  pointsButtonClassName: styles.orderSummary_pointsButton,
  pointsButtonAppliedClassName: styles.orderSummary_voucherButtonApplied,
  pointsIconClassName: styles.orderSummary_pointsIcon,
  pointsAppliedTextClassName: styles.orderSummary_voucherAppliedText,

  // /* Pop Up */
  // popupClassName: stylesPopup.popup,
  // closeButtonClassName: stylesPopup.closeButton,
  // voucherContainerClassName: stylesPopup.voucherContainer,
  // pointsContainerClassName: `${stylesPopup.voucherContainer} ${stylesPopup.voucherContainer__noGradient}`,
  // voucherFormContainerClassName: stylesPopup.voucherFormContainer,
  // voucherFormClassName: `groocery-form ${stylesPopup.voucherForm}`,
  // voucherInputClassName: "form-control",
  // /* Voucher Pop */
  // voucherSubmitButtonClassName: stylesPopup.voucherFormSubmit,
  // voucherListClassName: stylesPopup.voucherList,
  // voucherListHeaderClassName: stylesPopup.voucherListHeader,
  // voucherClassName: stylesPopup.voucher,
  // voucherDetailClassName: stylesPopup.voucherDetail,
  // voucherApplyButtonClassName: stylesPopup.voucherApplyButton,
  // voucherFooterClassName: stylesPopup.voucherFooter,
  /* point Pop-up */
  // totalPointsClassName: stylesPopup.totalPoints,
  // pointsFormContainerClassName: styles.pointsFormContainer,
  // pointsFormClassName: stylesPopup.pointsForm,
  // changePointsClassName: stylesPopup.changePoints,
  // pointsSubmitButtonClassName: stylesPopup.pointsSubmitButton,
  // pointsWarningClassName: stylesPopup.pointsWarning,
  // pointsInsufficientClassName: stylesPopup.pointsInsufficient,
  // pointValueClassName: stylesPopup.pointValue,
  // pointLabelClassName: stylesPopup.pointLabel,
  // numberOfPointsClassName: stylesPopup.numberOfPoints,

  /* hidden */
  pointEarnedBannerClassName: "d-none",
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
  withCartDetails
}) => {

  const [showModalErrorAddToCart, setShowModalErrorAddToCart] = useState<boolean>(false)
  const toogleErrorAddToCart = () => setShowModalErrorAddToCart(!showModalErrorAddToCart)

  const icons = {
    expand: <span className={stylesPriceBreakdown.customChevronDownIcon}></span>,
    collapse: <span className={stylesPriceBreakdown.customChevronUpIcon}></span>,
    voucher: <span className={styles.orderSummary_customVoucherIcon}></span>,
    voucherApplied: <span className={styles.orderSummary_customVoucherIcon}></span>,
    voucherRemoved: <span className={styles.orderSummary_voucherRemoveIcon}></span>,
    points: <span className={styles.orderSummary_pointIcon}></span>,
    pointsApplied: <span className={styles.orderSummary_pointIcon}></span>,
    close: <Icon.RiCloseFill />
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
          <h2 className={stylesCartDetails.Title}>{i18n.t("orderSummary.yourCart")}</h2>
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
                <div key={i} className={stylesCartDetails.placeholderContainer}>
                  <Placeholder
                    classes={classesCartPlaceholder}
                    withImage
                    withList
                    listMany={3}
                  />
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
