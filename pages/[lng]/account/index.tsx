/* Library Packages */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import {
  Account,
  useI18n
} from '@sirclo/nexus'
import { toast } from 'react-toastify'
import { CheckCircle } from 'react-feather'
import { FaMapMarkedAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { 
  FiAlertCircle,
  FiCrosshair,
  FiX,
  FiChevronRight, 
  FiChevronLeft 
} from 'react-icons/fi'
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
import { useAuthMethod } from 'lib/client'

/* Components */
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'

/* Locales */
import locale from 'locales'

/* Styles */
import styles from 'public/scss/pages/Account.module.scss'
import stylesPopupConfirmationOrder from 'public/scss/components/popupConfirmationOrder.module.scss'
import stylesPopupCheckPaymentOrder from 'public/scss/components/CheckPaymentOrder.module.scss'
import stylesPopup from 'public/scss/components/Popup.module.scss'
import stylesMap from 'public/scss/components/Map.module.scss'
import stylesPasswordStrength from 'public/scss/components/PasswordStrength.module.scss'

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
  myAccountSeparatorClassName: "d-none",

  // Edit Account & Change Password
  editAccountClassName: styles.form,
  changePasswordClassName: styles.form,
  inputContainerClassName: styles.form_inputContainer,
  inputLabelClassName: styles.form_inputLabel,
  inputClassName: styles.form_input,
  inputDistrictClassName: styles.form_input,
  passwordContainerClassName: styles.form_passwordContainer,
  passwordInputClassName: styles.form_passwordInput,
  passwordViewButtonClassName: styles.form_passwordButton,
  buttonClassName: `${styles.btn} ${styles.btn__long}`,

  // Order History
  orderHistoryContainerClassName: styles.orderHistory_container,
  tableClassName: styles.orderHistory_table,
  orderedItemDetailNeedReviewClassName: styles.orderHistory_orderedItemDetailNeedReview,
  orderedItemDetailReviewedClassName: styles.orderHistory_orderedItemDetailReviewed,
  orderedItemDetailDeliveredClassName: styles.orderHistory_shippingTrackerButton,
  orderItemClassName: styles.orderHistory_orderItem,
  orderHeaderClassName: styles.orderHistory_orderHeader,
  orderInnerHeaderClassName: styles.orderHistory_orderInnerHeader,
  orderTitleClassName: styles.orderHistory_orderTitle,
  orderDateClassName: styles.orderHistory_orderDate,
  orderBodyClassName: styles.orderHistory_orderBody,
  orderControlClassName: styles.orderHistory_orderControl,
  invoiceButtonClassName: styles.orderHistory_invoiceButton,
  orderedItemsContainer: styles.orderHistory_orderedItemsContainer,
  orderedItemsClassName: styles.orderHistory_orderedItems,
  orderedItemsLabelClassName: styles.orderHistory_orderedItemsLabel,
  orderedItemClassName: styles.orderHistory_orderedItem,
  orderedItemImageClassName: styles.orderHistory_orderedItemImage,
  orderedItemDetailClassName: styles.orderHistory_orderedItemDetail,
  orderedItemDetailTitleClassName: styles.orderHistory_orderedItemDetailTitle,
  orderedItemDetailPriceClassName: styles.orderHistory_orderedItemDetailPrice,
  orderedItemDetailUploadReceiptClassName: styles.orderHistory_orderedItemDetailUploadReceipt,
  buyerNoteContainerClassName: styles.orderHistory_buyerNoteContainer,
  buyerNoteLabelClassName: styles.orderHistory_buyerNoteLabel,
  buyerNoteClassName: styles.orderHistory_buyerNote,
  shippingContainerClassName: styles.orderHistory_shippingContainer,
  shippingDetailsClassName: styles.orderHistory_shippingDetails,
  shippingMethodContainerClassName: styles.orderHistory_shippingMethodContainer,
  paymentMethodContainerClassName: styles.orderHistory_paymentMethodContainer,
  orderFooterClassName: styles.orderHistory_orderFooter,
  totalCostClassName: styles.orderHistory_totalCost,
  
  // Payment Status
  paymentStatusCancelledClassName: `${styles.orderHistory_paymentStatus} cancelled`,
  paymentStatusUnpaidClassName: `${styles.orderHistory_paymentStatus} unpaid`,
  paymentStatusPaidClassName: `${styles.orderHistory_paymentStatus} paid`,
  paymentStatusReadyToShipClassName: `${styles.orderHistory_paymentStatus} readyToShip`,
  paymentStatusShippedClassName: `${styles.orderHistory_paymentStatus} shipped`,
  paymentStatusDeliveredClassName: `${styles.orderHistory_paymentStatus} delivered`,
  paymentStatusNeedReviewClassName: `${styles.orderHistory_paymentStatus} needReview`,
  paymentStatusCompletedClassName: `${styles.orderHistory_paymentStatus} completed`,
  paymentStatusReturnedClassName: `${styles.orderHistory_paymentStatus} returned`,

  // Order History Info
  orderInfoContainerClassName: styles.orderInfo_container,
  OrderInfoIconClassName: styles.orderInfo_icon,
  orderInfoLabelClassName: styles.orderInfo_label,
  OrderInfoSearchHereClassName: styles.orderInfo_searchHere,

  // Map
  mapNoteClassName: stylesMap.mapNote,
  mapSelectAreaClassName: stylesMap.mapSelectArea,
  mapAreaClassName: styles.mapArea,
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

  // Shipment Tracking
  shipmentHeaderClassName: styles.account_shipmentHeader,
  shipmentBodyClassName: styles.account_shipmentBody,
  shipmentFooterClassName: styles.account_shipmentFooter,
  shipmentTrackingClassName: `${stylesPopup.popup_overlay} ${styles.account_shipmentTracking}`,
  shipmentHeaderTextClassName: styles.account_shipmentHeaderText,
  shipmentTextClassName: styles.account_shipmentText,
  shipmentStatusClassName: styles.account_shipmentStatus,
  shipmentNoteClassName: styles.account_shipmentNote,
  shipmentDateClassName: styles.account_shipmentDate,
  shipmentListClassName: styles.account_shipmentList,
  shipmentListWrapperClassName: styles.account_shipmentListWrapper,
  shipmentCloseIconClassName: styles.account_shipmentCloseIcon,
  shipmentTrackButtonClassName: styles.account_shipmentTrackButton,
  shippingTrackerButton: styles.orderHistory_shippingTrackerButton,

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

const passwordStrengthClasses = {
  passwordStrengthBarClassName: stylesPasswordStrength.passwordStrengthBar,
  passwordCriteriaListClassName: stylesPasswordStrength.passwordCriteriaList,
  passwordCriteriaClassName: stylesPasswordStrength.passwordCriteria,
  passwordStrengthLabelClassName: stylesPasswordStrength.passwordStrengthLabel,
}

const orderHistoryPaginationClasses = {
  pagingClassName: styles.pagination,
  activeClassName: styles.pagination_active,
  itemClassName: styles.pagination_item,
  linkClassName: styles.pagination_link
}

const AccountsPage: FC<any> = ({
  lng,
  lngDict,
  hasOtp,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const i18n: any = useI18n()
  const linksBreadcrumb = [`${i18n.t("header.home")}`, i18n.t("account.myAccount")]
  const layoutProps = {
    lngDict, i18n, lng, brand,
    SEO: { title: i18n.t("account.myAccount") }
  }

  const [name, setName] = useState<string>("")

  const onError = (msg: string) => toast.error(msg)
  const onSuccessChPass = (msg: string) => toast.success(msg)

  const onSuccess = (msg: string, data: any) => {
    if (data && data?.upsertProfile) setName(data?.upsertProfile[0]?.firstName)
    toast.success(msg)
  }

  const onFetchCompleted = (_: string, data: any) => {
    const { firstName } = data?.members[0]
    setName(firstName)
  }

  return (
    <Layout {...layoutProps}>
      <Breadcrumb 
        lng={lng}
        title={i18n.t("account.myAccount")} 
        links={linksBreadcrumb} 
      />
      <div className={styles.wrapper}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className={styles.hello}>
                <h2>{name || '' }</h2>
              </div>
              <Account
                classes={{
                  ...classesAccount,
                  ...passwordStrengthClasses
                }}
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
                showSettingNotification={hasOtp}
                paymentHrefPrefix="payment_notif"
                passwordViewIcon={<RiEyeCloseLine />}
                passwordHideIcon={<RiEyeLine />}
                passwordFulfilledCriteriaIcon={<CheckCircle color="green" size={16} />}
                passwordUnfulfilledCriteriaIcon={<CheckCircle color="gray" size={16} />}
                mapIcon={<FaMapMarkedAlt />}
                mapButtonCloseIcon={<FiX />}
                mapCenterIcon={<FiCrosshair />}
                icons={{
                  accordionIcon: <RiArrowDownSLine />,
                  closeIcon: <FiX />,
                  infoIcon: <FiAlertCircle />,
                  iconTracker: <FaMapMarkerAlt />,
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
                loadingComponent={
                  <p>{i18n.t("global.loading")}</p>
                }
                errorComponent={
                  <p>{i18n.t("global.error")}</p>
                }
                emptyStateComponent={
                  <p>{i18n.t("global.empty")}</p>
                }
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
  const { hasOtp } = await useAuthMethod(req)

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
      hasOtp,
      brand: brand || ""
    }
  }
}

export default AccountsPage