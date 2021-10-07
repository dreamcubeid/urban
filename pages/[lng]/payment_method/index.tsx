import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { toast } from "react-toastify"
import Link from 'next/link'
import dynamic from 'next/dynamic'
import {
  CustomerDetail,
  ListPaymentMethod,
  PrivateRoute,
  useI18n,
  useShippingMethod,
  useBuyerNotes
} from '@sirclo/nexus'
/* locales */
import locale from 'locales'
/* library component */
import { useBrand } from "lib/useBrand"
import useWindowSize from 'lib/useWindowSize'
/* copmonents */
import SEO from 'components/SEO'
import Layout from 'components/Layout/Layout'
import Breadcrumb from "components/Breadcrumb/Breadcrumb"
import Stepper from 'components/Stepper'
import Icon from 'components/Icon/Icon'
import OrderSummaryBox, { classesOrderSummary } from 'components/OrderSummaryBox'
const LoaderPages = dynamic(() => import('components/Loader/LoaderPages'))
const Placeholder = dynamic(() => import('components/Placeholder'))

/* styles */
import styles from "public/scss/pages/PaymentMethod.module.scss"
import stylesCustomerDetail from 'public/scss/components/CustomerDetail.module.scss'

const classesListPaymentMethod = {
  paymentItemEnabledClassName: styles.paymentItemEnabled,
  paymentItemDisabledClassName: styles.paymentItemDisabled,
  paymentTypeClassName: styles.paymentType,
  radioButtonContainerClassName: styles.radioButtonContainer,
  paymentImgClassName: styles.paymentImg,
  paymentWarningTextClassName: styles.paymentWarningText,
  paymentMethodDetailsClassName: styles.paymentMethodDetails,
  paymentMethodDetailBodyClassName: styles.paymentMethodDetailBody,
  selectedPaymentMethodClassName: styles.selectedPaymentMethod,
  paymentDetailsRowClassName: styles.paymentDetailsRow,
  paymentDetailsValueClassName: styles.paymentDetailsValue,
  paymentMethodDetailFooterClassName: styles.paymentMethodDetailFooter,
  promotionButtonGroupClassName: styles.promotionButtonGroup,
  couponButtonClassName: styles.couponButton,
  pointButtonClassName: styles.pointButton,
  agreementContainerClassName: styles.agreementContainer,
  agreementCheckboxClassName: styles.agreementCheckbox,
  buttonContainerClassName: styles.buttonContainer,
  radioButtonClassName: styles.radioButton,
  buttonClassName: styles.button,
  basePriceClassName: styles.basePrice,
  salePriceClassName: styles.salePrice,
  shippingPriceClassName: styles.shippingPrice,
  shippingDiscountClassName: styles.shippingDiscount,
  checkmarkClassName: styles.checkmark,
  paymentDetailsDeductionClassName: styles.paymentDetailsDeduction
}

const classesCustomerDetail = {
  customerDetailBoxClass: `container ${stylesCustomerDetail.customerDetaiBox}`,
  addressDetailClassName: stylesCustomerDetail.infoPersonaddressDetail,
  addressValueClassName: stylesCustomerDetail.infoPersonValueaddressValue,
  changePinClassName: "d-none",
}

const classesCustomerDetailPlaceholder = {
  placeholderList: styles.placeholderCustomerDetailList,
}

const placeholderClasses = {
  placeholderList: styles.placeholderList,
}


type PrivateComponentPropsType = {
  children: any
}

const PrivateRouteWrapper = ({ children }: PrivateComponentPropsType) => (
  <PrivateRoute
    page="payment_method"
    loadingComponent={<LoaderPages />}
  >
    {children}
  </PrivateRoute>
)

const PaymentMethods: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const size = useWindowSize()
  const { data } = useShippingMethod()
  const { data: notes } = useBuyerNotes()

  const linksBreadcrumb = [`${i18n.t("header.home")}`, i18n.t("placeOrder.checkOrder")]

  const icons = {
    closeButtonIcon: <Icon.orderSummary.close />,
    voucherIcon: <Icon.orderSummary.voucher />,
    pointIcon: <Icon.orderSummary.points />,
    removeVoucherIcon: <Icon.orderSummary.voucherRemoved />,
    removePointIcon: <Icon.orderSummary.voucherRemoved />,
    voucherAppliedIcon: <Icon.orderSummary.voucherApplied />,
    pointAppliedIcon: <Icon.orderSummary.voucherRemoved />,
  }

  return (
    <PrivateRouteWrapper>
      <Layout
        i18n={i18n}
        lng={lng}
        lngDict={lngDict}
        brand={brand}
        withHeader={false}
        withFooter={false}
      >
        <SEO title="Payment Method" />
        <Breadcrumb
          bgBlack
          title={i18n.t("placeOrder.checkOrder")}
          links={linksBreadcrumb}
          lng={lng}
        />
        <Stepper
          isMobile={size?.width < 767}
          i18n={i18n}
          page="payment_method"
        />
        <section className={stylesCustomerDetail.section}>
          <CustomerDetail
            classes={classesCustomerDetail}
            isBilling={false}
            shippingInfoHeader={
              <div className={stylesCustomerDetail.headerContainer}>
                <h3>{i18n.t("shipping.shipTo")}</h3>
                <Link href="/[lng]/place_order" as={`/${lng}/place_order`}>
                  <a className={stylesCustomerDetail.change}>{i18n.t("shipping.change")}</a>
                </Link>
              </div>
            }
            loadingComponent={
              <div className={`container ${styles.placeholderCustomerDetailContainer}`}>
                <Placeholder
                  classes={classesCustomerDetailPlaceholder}
                  withList
                  listMany={3}
                />
              </div>
            }
          />
          <div className="container">
            <div className={`${stylesCustomerDetail.customerDetaiBoxShipping}`}>
              <div className={stylesCustomerDetail.headerContainer}>
                <h3>{i18n.t("shipping.deliveryCourier")}</h3>
                <Link href="/[lng]/shipping_method" as={`/${lng}/shipping_method`}>
                  <a className={stylesCustomerDetail.change} >{i18n.t("shipping.change")}</a>
                </Link>
              </div>
              <div className={stylesCustomerDetail.customerDetailShipping}>
                <p className={styles.customer_infoPersonValueShipping}>
                  {data?.shippingMethod?.shippingProvider}&nbsp;{data?.shippingMethod?.shippingService}
                  {" - "}
                  <span>
                    {data?.shippingMethod?.shippingCost}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {notes?.buyerNotes?.buyerNotes &&
            <div className="container">
              <div className={`${stylesCustomerDetail.customerDetaiBoxShipping}`}>
                <div className={stylesCustomerDetail.headerContainer}>
                  <h3 className={stylesCustomerDetail.notesTitle}>{i18n.t("cart.noteToSeller")}</h3>
                  <Link href="/[lng]/cart" as={`/${lng}/cart`}>
                    <a className={stylesCustomerDetail.change} >{i18n.t("shipping.change")}</a>
                  </Link>
                </div>
                <div className={stylesCustomerDetail.infoPersonValueaddressValue}>
                  {notes?.buyerNotes?.buyerNotes}
                </div>
              </div>
            </div>
          }
        </section>
        <section className={`container ${styles.section}`}>
          <div className={styles.paymentContainer}>
            <h2 className={styles.title}>{i18n.t("payment.choosePayment")}</h2>
            <ListPaymentMethod
              classes={{
                ...classesListPaymentMethod,
                ...classesOrderSummary
              }}
              onErrorMsg={(msg) => toast.error(msg)}
              onErrorMsgCoupon={(msg) => toast.error(msg)}
              loadingComponent={
                <Placeholder
                  classes={placeholderClasses}
                  withList
                  listMany={5}
                />
              }
              loaderElement={
                <Placeholder
                  classes={placeholderClasses}
                  withList
                  listMany={5}
                />
              }
              popupLoader={LoaderPages}
              emptyState={
                <div className={styles.lookbookPlaceholder_wrapper}>
                  <p>{i18n.t("payment.isEmpty")}</p>
                </div>
              }
              {...icons}
            />
          </div>
          <div className={styles.orderSummaryBoxContainer}>
            <OrderSummaryBox
              i18n={i18n}
              lng={lng}
              withCartDetails
              withOrderSummary={false}
              page="payment_method"
            />
          </div>
        </section>

      </Layout>
    </PrivateRouteWrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {

  const lngDict = locale(params.lng)
  const brand = await useBrand(req)

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ""
    }
  };
}

export default PaymentMethods
