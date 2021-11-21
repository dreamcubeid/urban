/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import {
  PlaceOrderForm,
  useI18n,
  PrivateRoute
} from '@sirclo/nexus'
/* locales */
import locale from "locales"
/* library component */
import { useBrand } from 'lib/useBrand'
import useWindowSize from 'lib/useWindowSize'
/* copmonents */
import SEO from 'components/SEO'
import Layout from 'components/Layout/Layout'
import OrderSummaryBox from 'components/OrderSummaryBox'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import Icon from 'components/Icon/Icon'
import Stepper from 'components/Stepper'
import LoaderPages from 'components/Loader/LoaderPages'
const Placeholder = dynamic(() => import('components/Placeholder'));
/* styles */
import styles from 'public/scss/pages/Placeorder.module.scss'
import stylesPasswordStrength from 'public/scss/components/PasswordStrength.module.scss'
import stylesMap from 'public/scss/components/Map.module.scss'
import stylesDatePicker from 'public/scss/components/DatePicker.module.scss'

const placeOrderClasses = {
  placeOrderClassName: styles.placeOrder,
  formClassName: styles.form,
  formGroupClassName: styles.formGroup,
  inputClassName: styles.input,
  loginLabelClassName: styles.loginLabel,
  submitButtonClassName: styles.submitButton,
  billingAddressContainerClassName: styles.billingAddressContainer,
  signupLabelClassName: styles.signupLabel,
  shippingCheckboxLabelClassName: styles.shippingCheckboxLabel,
  passwordViewButtonClassName: styles.passwordViewButton,
  datePickerInputClassName: stylesDatePicker.datePicker__input,
  datePickerCalendarClassName: stylesDatePicker.datePicker__calendar,
}

const passwordStrengthClasses = {
  passwordStrengthBarClassName: stylesPasswordStrength.passwordStrengthBar,
  passwordCriteriaListClassName: stylesPasswordStrength.passwordCriteriaList,
  passwordCriteriaClassName: stylesPasswordStrength.passwordCriteria,
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

const customStyles = {
  control: () => ({
    display: 'flex',
    height: '50px',
    padding: '10px auto auto 8px',
    border: "1px solid #CFD4D9",
    borderRadius: "2px"
  }),
  indicatorsContainer: () => ({
    cursor: 'pointer',
    marginTop: '12px'
  }),
  singleValue: () => ({
    paddingLeft: '7px',
    paddingTop: '12px'
  }),
  input: () => ({
    paddingLeft: '7px',
    paddingTop: '12px'
  }),
  placeholder: () => ({
    color: 'hsl(0,0%,50%)',
    marginTop: '7px',
    marginLeft: '6px',
    marginRight: '2px',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)'
  }),
  menu: () => ({
    position: 'absolute',
    minWidth: '100%',
    zIndex: '3',
    backgroundColor: '#fff',
    border: "1px solid #CFD4D9",
    marginTop: "4px",
    borderRadius: "2px"
  }),
  indicatorContainer: () => ({
    marginTop: '-5px'
  })
}

const placeholderClasses = {
  placeholderList: styles.placeholderList,
}

type PrivateComponentPropsType = {
  children: any;
}

const PrivateRouteWrapper = ({ children }: PrivateComponentPropsType) => (
  <PrivateRoute
    page="place_order"
    loadingComponent={<LoaderPages />}
    redirectCart="products"
  >
    {children}
  </PrivateRoute>
)

const PlaceOrderPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const i18n: any = useI18n()
  const size = useWindowSize()
  const router = useRouter()
  const linksBreadcrumb = [`${i18n.t("header.home")}`, i18n.t("placeOrder.checkOrder")]

  let withButtonProps = {}
  if (size.width > 767) withButtonProps = {
    withButton: () => router.push("/[lng]/shipping_method", `/${lng}/shipping_method`)
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
        <SEO title="Place Order" />

        <Breadcrumb
          bgBlack
          title={i18n.t("placeOrder.checkOrder")}
          links={linksBreadcrumb}
          lng={lng}
        />

        <Stepper
          isMobile={size.width < 767}
          i18n={i18n}
          page="place_order"
        />

        <section className={`container ${styles.section}`}>
          <PlaceOrderForm
            classes={{
              ...placeOrderClasses,
              ...passwordStrengthClasses,
              ...mapClasses,
            }}
            logistixStyles={customStyles}
            onErrorMsg={(msg) => toast.error(msg)}
            passwordViewIcon={<Icon.setNewPassword.passwordViewIcon />}
            passwordHideIcon={<Icon.setNewPassword.passwordHideIcon />}
            passwordFulfilledCriteriaIcon={<Icon.setNewPassword.passwordCriteriaIcon color="#1DB954" size={16} />}
            passwordUnfulfilledCriteriaIcon={<Icon.setNewPassword.passwordCriteriaIcon color="#E5E7EF" size={16} />}
            datePickerCalendarIcon={<Icon.register.datePickerCalendarIcon />}
            loadingComponent={
              <>
                <div className={styles.placeOrder}>
                  <Placeholder
                    classes={placeholderClasses}
                    withList
                    listMany={9}
                  />
                </div>
                <div className={styles.orderSummaryBoxContainer}>
                  <Placeholder
                    classes={placeholderClasses}
                    withList
                    listMany={4}
                  />
                </div>
              </>
            }
            mapCenterIcon={<Icon.mapCenterIcon />}
            mapButtonCloseIcon={<Icon.RiCloseFill />}
            {...withButtonProps}
          />
          <div className={styles.orderSummaryBoxContainer}>
            <OrderSummaryBox
              i18n={i18n}
              lng={lng}
              withCartDetails
              page="place_order"
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

export default PlaceOrderPage;
