/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import {
  CustomerDetail,
  ShippingMethods,
  useI18n,
  PrivateRoute
} from '@sirclo/nexus'
/* locales */
import locale from 'locales'
/* library component */
import { useBrand } from 'lib/useBrand'
import useWindowSize from 'lib/useWindowSize'
/* copmonents */
import SEO from 'components/SEO'
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import Icon from 'components/Icon/Icon'
import OrderSummaryBox from 'components/OrderSummaryBox'
import Stepper from 'components/Stepper'
import LoaderPages from 'components/Loader/LoaderPages'
const Placeholder = dynamic(() => import("components/Placeholder"));
/* styles */
import styles from 'public/scss/pages/ShippingMethod.module.scss'
import stylesMap from 'public/scss/components/Map.module.scss'
import stylesCustomerDetail from 'public/scss/components/CustomerDetail.module.scss'


const classesCustomerDetail = {
  customerDetailBoxClass: `container ${stylesCustomerDetail.customerDetaiBox}`,
  addressContainerClassName: stylesCustomerDetail.infoaddressContainer,
  addressValueClassName: stylesCustomerDetail.infoPersonValueaddressValue,
  changePinClassName: "d-none",
}

const classesShippingMethod = {
  containerClass: styles.container,
  shippingRadioDiv: styles.shippingRadioDiv,
  inputClass: styles.input,
  shippingNameDivClass: styles.shippingNameDiv,
  shippingNameClass: styles.shippingName,
  shippingPriceClass: styles.shippingPrice,
  pinPointLocationClassName: styles.pinPointLocation,
  warningPinPointClassName: styles.warningPinPoint,
  inputLabel: styles.inputLabel,
  submitButtonClassName: styles.submitButton,
}

const mapClasses = {
  mapNoteClassName: stylesMap.mapNote,
  mapSelectAreaClassName: stylesMap.mapSelectArea,
  mapAreaClassName: stylesMap.mapArea,
  mapPopupClassName: stylesMap.mapPopup,
  mapPopupBackgroundClassName: stylesMap.mapPopupBackground,
  mapClassName: stylesMap.map,
  mapHeaderWrapperClassName: stylesMap.mapHeaderWrapper,
  mapHeaderTitleClassName: stylesMap.mapHeaderTitle,
  mapHeaderCloseButtonClassName: stylesMap.mapHeaderCloseButton,
  mapHeaderNoteClassName: stylesMap.mapHeaderNote,
  mapLabelAddressClassName: stylesMap.mapLabelAddress,
  mapCenterButtonClassName: stylesMap.mapCenterButton,
  mapButtonFooterClassName: stylesMap.mapButtonFooter,
}

const placeholderClasses = {
  placeholderList: styles.placeholderList,
}

const classesCustomerDetailPlaceholder = {
  placeholderList: styles.placeholderCustomerDetailList,
}

type PrivateComponentPropsType = {
  children: any
}

const PrivateRouteWrapper = ({ children }: PrivateComponentPropsType) => (
  <PrivateRoute
    page="shipping_method"
    loadingComponent={<LoaderPages />}
    redirectCart="products"
  >
    {children}
  </PrivateRoute>
)

const ShippingMethodPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const i18n: any = useI18n()
  const size = useWindowSize()
  const router = useRouter()

  const linksBreadcrumb = [`${i18n.t("header.home")}`, i18n.t("placeOrder.checkOrder")]

  let withButtonProps = {}
  if (size?.width > 767) withButtonProps = {
    withButton: () => router.push("/[lng]/payment_method", `/${lng}/payment_method`)
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
        <SEO title="Shipping Method" />
        <Breadcrumb
          bgBlack
          title={i18n.t("placeOrder.checkOrder")}
          links={linksBreadcrumb}
          lng={lng}
        />
        <Stepper
          isMobile={size?.width < 767}
          i18n={i18n}
          page="shipping_method"
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
        </section>
        <section className={`container ${styles.section}`}>
          <div className={styles.shippingContainer}>
            <h2 className={styles.shippingTitle}>{i18n.t("shipping.chooseCourier")}</h2>
            <ShippingMethods
              classes={{
                ...classesShippingMethod,
                ...mapClasses
              }}
              onErrorMsg={(msg) => toast.error(msg)}
              mapCenterIcon={<Icon.mapCenterIcon />}
              mapButtonCloseIcon={<Icon.RiCloseFill />}
              loadingComponent={
                <Placeholder
                  classes={placeholderClasses}
                  withList
                  listMany={9}
                />
              }
              {...withButtonProps}
            />
          </div>
          <div className={styles.orderSummaryBoxContainer}>
            <OrderSummaryBox
              i18n={i18n}
              lng={lng}
              withCartDetails
              page="shipping_method"
            />
          </div>
        </section>
      </Layout>
    </PrivateRouteWrapper>
  );
};

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

export default ShippingMethodPage;
