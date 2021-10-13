/* Library Packages */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import {
  Account,
  useI18n
} from '@sirclo/nexus'
import { toast } from 'react-toastify'
import {
  X as XIcon,
  AlertCircle,
  CheckCircle,
  Crosshair
} from 'react-feather'

import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'
import { 
  RiLogoutBoxLine, 
  RiNotification2Line,
  RiLockPasswordLine,
  RiUserStarLine,
  RiShoppingBag2Line,
  RiUser3Line,
  RiArrowDownSLine,
  RiMailUnreadFill,
  RiWhatsappFill,
  RiTelegramFill,
  RiLineFill,
  RiEyeCloseLine,
  RiEyeLine
} from 'react-icons/ri'

/* Library Template */
import { parseCookies } from 'lib/parseCookies'
import { useBrand } from 'lib/useBrand'

/* Components */
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import SEO from "components/SEO"

/* Locales */
import locale from "locales"

/* Styles */
import styles from "public/scss/pages/Account.module.scss"
import stylesPopupConfirmationOrder from "public/scss/components/popupConfirmationOrder.module.scss"
import stylesPopupCheckPaymentOrder from "public/scss/components/CheckPaymentOrder.module.scss"

const ACTIVE_CURRENCY = "IDR"

const classesAccount = {
  containerClassName: styles.account,
  tabClassName: styles.account_tab,
  tabItemClassName: styles.account_tabItem,
  linkTabItemClassName: styles.account_tabLink,
  linkTabItemActiveClassName: styles.account_tabLink__active,
  tabItemIconClassName: styles.account_tabIcon,
  tabPaneClassName: styles.account_tabPane,

  // My Account
  myAccountClassName: styles.myAccount,
  myAccountContentClassName: styles.myAccount_content,
  myAccountBodyClassName: styles.myAccount_body,
  myAccountFieldClassName: styles.myAccount_field,

  // Edit Account & Change Password
  editAccountClassName: styles.form,
  changePasswordClassName: styles.form,
  inputContainerClassName: styles.form_inputContainer,
  inputLabelClassName: styles.form_inputLabel,
  inputClassName: styles.form_input,
  passwordContainerClassName: styles.form_passwordContainer,
  passwordInputClassName: styles.form_passwordInput,
  passwordViewButtonClassName: styles.form_passwordButton,
  passwordCriteriaListClassName: styles.form_passwordCriteriaList,
  passwordCriteriaClassName: styles.form_passwordCriteria,
  passwordStrengthBarContainerClassName: styles.form_passwordStrengthBarContainer,
  passwordStrengthBarClassName: styles.form_passwordStrengthBar,
  passwordStrengthLabelClassName: styles.form_passwordStrengthBarLabel,
  buttonClassName: `${styles.btn} ${styles.btn__long}`,

  // Order History
  orderHistoryContainerClassName: styles.orderHistory_container,
  tableClassName: styles.orderHistory_table,
  orderedItemDetailNeedReviewClassName: styles.table_itemDetailNeedReview,
  orderedItemDetailDeliveredClassName: styles.table_orderedItemDetailDelivered,
  orderItemClassName: styles.orderHistory_orderItem,
  orderHeaderClassName: styles.orderHistory_orderHeader,
  orderInnerHeaderClassName: styles.orderHistory_orderInnerHeader,
  orderTitleClassName: styles.orderHistory_orderTitlte,
  orderDateClassName: styles.orderHistory_orderDate,
  orderBodyClassName: styles.orderHistory_orderBody,
  orderControlClassName: styles.orderHistory_orderControl,
  invoiceButtonClassName: styles.orderHistory_invoiceButton,
  orderedItemsContainer: styles.orderHistory_orderedItems,
  orderedItemsLabelClassName: styles.orderHistory_orderedItemsLabel,
  orderedItemClassName: styles.orderHistory_orderedItem,
  orderedItemImageClassName: styles.orderHistory_orderedItemImage,
  orderedItemDetailClassName: styles.orderHistory_orderedItemDetail,
  orderedItemDetailTitleClassName: styles.orderHistory_orderedItemDetailTitle,
  orderedItemDetailPriceClassName: styles.orderHistory_orderedItemDetailPrice,
  buyerNoteContainerClassName: styles.orderHistory_buyerNoteContainer,
  buyerNoteLabelClassName: styles.orderHistory_buyerNoteLabel,
  buyerNoteClassName: styles.orderHistory_buyerNote,
  shippingContainerClassName: styles.orderHistory_shippingContainer,
  shippingDetailsClassName: styles.orderHistory_shippingDetails,
  shippingDetailsLabelClassName: styles.orderHistory_shippingDetailsLabel,
  shippingDetailsValueClassName: styles.orderHistory_shippingDetailsValue,
  shippingMethodContainerClassName: styles.orderHistory_shippingMethodContainer,
  shippingMethodLabelClassName: styles.orderHistory_shippingMethodLabel,
  shippingMethodValueClassName: styles.orderHistory_shippingMethodValue,
  paymentMethodContainerClassName: styles.orderHistory_paymentMethodContainer,
  paymentMethodLabelClassName: styles.orderHistory_paymentMethodLabel,
  orderFooterClassName: styles.orderHistory_orderFooter,
  totalCostClassName: styles.orderHistory_totalCost,
  
  // Payment Status
  paymentStatusCancelledClassName: styles.orderHistory_paymentStatus,
  paymentStatusUnpaidClassName: styles.orderHistory_paymentStatus,
  paymentStatusPaidClassName: styles.orderHistory_paymentStatus,
  paymentStatusReadyToShipClassName: styles.orderHistory_paymentStatus,
  paymentStatusShippedClassName: styles.orderHistory_paymentStatus,
  paymentStatusDeliveredClassName: styles.orderHistory_paymentStatus,
  paymentStatusNeedReviewClassName: styles.orderHistory_paymentStatus,
  paymentStatusCompletedClassName: styles.orderHistory_paymentStatus,
  paymentStatusReturnedClassName: styles.orderHistory_paymentStatus,

  // Order History Info
  orderInfoContainerClassName: styles.orderInfo_container,
  OrderInfoIconClassName: styles.orderInfo_icon,
  orderInfoLabelClassName: styles.orderInfo_label,
  OrderInfoSearchHereClassName: styles.orderInfo_searchHere,

  // Map
  mapAreaClassName: styles.mapArea,
  mapSelectAreaClassName: styles.account_buttonLocation,
  mapPopupClassName: styles.account_mapPopup,
  mapPopupBackgroundClassName: styles.account_mapPopupContainer,
  mapClassName: styles.account_mapPopupMaps,
  mapHeaderWrapperClassName: styles.account_mapPopupHeader,
  mapHeaderTitleClassName: styles.account_mapPopupHeaderTitle,
  mapHeaderCloseButtonClassName: styles.account_mapPopupClose,
  mapHeaderNoteClassName: styles.account_mapPopupNote,
  mapLabelAddressClassName: styles.account_mapPopupLabelAddress,
  mapCenterButtonClassName: styles.account_mapPopupCenterButton,
  mapButtonFooterClassName: `btn ${styles.btn_primary} ${styles.btn_long} d-block mx-auto my-3`,

  // Shipment Tracking
  shippingTrackerButton: `btn ${styles.btn_primary}`,
  shipmentTrackingClassName: `${styles.track_shipmentTracking} ${styles.account_shipmentTracking}`,
  shipmentHeaderClassName: `${styles.track_shipmentHeader} ${styles.account_shipmentContainer}`,
  shipmentBodyClassName: `${styles.track_shipmentBody} ${styles.account_shipmentContainer} d-flex justify-content-center`,
  shipmentFooterClassName: `${styles.track_shipmentFooter} ${styles.account_shipmentContainer} d-flex justify-content-center text-center`,
  shipmentHeaderTextClassName: styles.track_shipmentHeaderText,
  shipmentTextClassName: styles.track_shipmentText,
  shipmentNoteClassName: styles.track_shipmentNote,
  shipmentListClassName: styles.track_shipmentList,
  shipmentListWrapperClassName: styles.track_shipmentListWrapper,
  shipmentCloseIconClassName: styles.track_shipmentCloseIcon,
  shipmentTrackButtonClassName: styles.track_shipmentTrackButton,

  // Membership Status
  membershipStatusClassName: styles.membershipStatus,
  accordionClassName: styles.membershipStatus_accordion,
  accordionToggleClassName: styles.membershipStatus_accordionToggle,
  accordionIconClassName: styles.membershipStatus_accordionIcon,
  totalPointsClassName: styles.membershipStatus_totalPoints,
  membershipProgressClassName: styles.membershipStatus_progress,
  membershipPromptClassName: styles.membershipStatus_prompt,

  // Membership History
  linkContinueClassName: styles.membershipHistory_linkContinue,
  membershipHistoryClassName: styles.membershipHistory,
  pointHistoryItemClassName: styles.membershipHistory_pointHistoryItem,
  orderIDClassName: styles.membershipHistory_orderID,
  transactionTypeClassName: styles.membershipHistory_transactionType,
  transactionDateClassName: styles.membershipHistory_transactionDate,
  pointDeltaClassName: styles.membershipHistory_pointDelta,
  membershipPaginationClassName: styles.membershipHistory_pagination, 

  itemPerPageClassName: styles.itemPerPage,
  itemPerPageLabelClassName: styles.itemPerPageLabel,
  itemPerPageOptionsClassName: styles.itemPerPageOptions,
  buttonContinueClassName: styles.buttonContinue,

  // Date Picker
  datePickerInputClassName: "date-picker__input",
  datePickerCalendarClassName: "date-picker__calendar",

  // Popup Order Confirmation
  popupConfirmationOrderContainerClassName: stylesPopupConfirmationOrder.container,
  popupConfirmationOrderContentClassName: stylesPopupConfirmationOrder.content,
  popupConfirmationOrderTitleClassName: stylesPopupConfirmationOrder.title,
  popupConfirmationOrderNoteClassName: stylesPopupConfirmationOrder.note,
  popupConfirmationOrderDescriptionClassName: stylesPopupConfirmationOrder.description,
  popupConfirmationOrderWrapButtonClassName: stylesPopupConfirmationOrder.wrapButton,
  popupConfirmationOrderButtonConfirmClassName: stylesPopupConfirmationOrder.buttonNo,
  popupConfirmationOrderButtonNoClassName: stylesPopupConfirmationOrder.buttonConfirm,

  // Popup Check Payment Order
  checkPaymentOrderContainerClassName: stylesPopupCheckPaymentOrder.checkOrder_overlay,
  checkPaymentOrderContainerBodyClassName: stylesPopupCheckPaymentOrder.checkOrder_container,
  checkPaymentOrderHeaderClassName: stylesPopupCheckPaymentOrder.checkOrder_header,
  checkPaymentOrderTitleClassName: stylesPopupCheckPaymentOrder.checkOrder_title,
  checkPaymentOrderDescriptionClassName: stylesPopupCheckPaymentOrder.checkOrder_description,
  checkPaymentOrderContentClassName: stylesPopupCheckPaymentOrder.checkOrder_content,
  checkPaymentOrderInputContentClassName: stylesPopupCheckPaymentOrder.checkOrder_inputContent,
  checkPaymentOrderInputTitleClassName: stylesPopupCheckPaymentOrder.checkOrder_inputTitle,
  checkPaymentOrderInputClassName: stylesPopupCheckPaymentOrder.checkOrder_input,
  checkPaymentOrderCloseButtonClassName: stylesPopupCheckPaymentOrder.checkOrder_closeButton,
  checkPaymentOrderSubmitButtonClassName: stylesPopupCheckPaymentOrder.checkOrder_submitButton,

  // Notification Settings
  settingNotifContainer: styles.otpSetting,
  settingNotifHeader: styles.otpSetting_header,
  settingNotifDescription: styles.otpSetting_description,
  settingNotifMediaContainer: styles.otpSetting_mediaContainer,
  settingNotifMedia: styles.otpSetting_media,
  mediaParent: styles.otpSetting_mediaParent,
  mediaDetailContainer: styles.otpSetting_mediaDetailContainer,
  mediaDetailLabel: styles.otpSetting_mediaDetailLabel,
  mediaLabelContainer: styles.otpSetting_mediaLabelContainer,
  mediaInnerLabelContainer: styles.otpSetting_mediaInnerLabelContainer,
  mediaLabel: styles.otpSetting_mediaLabel,
  mediaDescription: styles.otpSetting_mediaDescription,
  mediaCheckboxContainer: styles.otpSetting_toggle,
  mediaDetailCheckboxContainer: styles.otpSetting_checkbox
}

const orderHistoryPaginationClasses = {
  pagingClassName: styles.pagination,
  activeClassName: styles.pagination_active,
  itemClassName: styles.pagination_item
}

const AccountsPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const i18n: any = useI18n()
  const linksBreadcrumb = [`${i18n.t("header.home")}`, i18n.t("account.myAccount")]

  const [name, setName] = useState<string>("")

  const onError = (msg: string) => toast.error(msg)
  const onSuccessChPass = (msg: string) => toast.success(msg)

  const onSuccess = (msg: string, data: any) => {
    setName(data?.upsertProfile[0]?.firstName + " " + data?.upsertProfile[0]?.lastName)
    toast.success(msg)
  }

  const onFetchCompleted = (_: string, data: any) => {
    const { firstName, lastName } = data?.members[0]
    setName(`${firstName} ${lastName}`)
  }

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >

      <Breadcrumb 
        lng={lng}
        title={i18n.t("account.myAccount")} 
        links={linksBreadcrumb} 
      />

      <SEO title={i18n.t("account.myAccount")} />

      <div className={styles.wrapper}>
        
        <div className="container">
          <div className="row">
            <div className="col-12">

              <div className={styles.hello}>
                <h2>{name || '' }</h2>
              </div>

              <Account
                classes={classesAccount}
                membershipPaginationClasses={orderHistoryPaginationClasses}
                membershipPaginationNextLabel={<FiChevronRight />}
                membershipPaginationPrevLabel={<FiChevronLeft />}
                orderHistoryPaginationClasses={orderHistoryPaginationClasses}
                orderHistoryIsCallPagination={true}
                orderHistoryType="list"
                orderHistoryItemPerPage={5}
                currency={ACTIVE_CURRENCY}
                onFetchCompleted={onFetchCompleted}
                onErrorMsg={onError}
                onSuccessMsg={onSuccess}
                onSuccessChPass={onSuccessChPass}
                showSettingNotification={true}
                paymentHrefPrefix="payment_notif"
                passwordViewIcon={<RiEyeCloseLine />}
                passwordHideIcon={<RiEyeLine />}
                passwordFulfilledCriteriaIcon={<CheckCircle color="green" size={16} />}
                passwordUnfulfilledCriteriaIcon={<CheckCircle color="gray" size={16} />}
                mapIcon={'map'}
                mapButtonCloseIcon={<XIcon />}
                mapCenterIcon={<Crosshair />}
                icons={{
                  accordionIcon: <RiArrowDownSLine />,
                  closeIcon: <XIcon />,
                  infoIcon: <AlertCircle />,
                  iconTracker: <img src="/images/motorcycle.svg" alt="motorcycle" />,
                  myAccount: <RiUser3Line />,
                  orderHistory: <RiShoppingBag2Line />,
                  membershipHistory: <RiUserStarLine />,
                  changePassword: <RiLockPasswordLine />,
                  settingNotification: <RiNotification2Line />,
                  logout: <RiLogoutBoxLine />,
                  notification: <RiNotification2Line />,
                  email: <RiMailUnreadFill />,
                  whatsApp: <RiWhatsappFill />,
                  line: <RiLineFill />,
                  telegram: <RiTelegramFill />
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params
}) => {
  const lngDict = locale(params.lng)
  const brand = await useBrand(req)

  if (res) {
    const cookies = parseCookies(req)
    const auth = cookies.AUTH_KEY

    if (!auth) {
      res.writeHead(301, {
        Location: `/${cookies.ACTIVE_LNG || "id"}/login`,
      })
      res.end()
    }
  }

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ""
    }
  }
}

export default AccountsPage