import {
  RiArrowRightLine,
  RiArrowLeftLine,
  RiCloseFill,
  RiCoupon3Fill,
  RiCopperDiamondFill,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiDeleteBin2Line,
  RiCalendarLine,
  RiTimeLine,
  RiNotification2Fill,
  RiFacebookFill,
  RiTwitterFill,
  RiLinkedinBoxFill,
  RiWhatsappFill,
  RiMailFill,
  RiTelegramFill,
  RiCheckboxCircleFill,
  RiEyeCloseLine,
  RiEyeLine,
  RiQuestionFill
} from 'react-icons/ri'

import { GoPlus } from 'react-icons/go'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { BiCurrentLocation } from 'react-icons/bi'

const Icon: any = {
  arrowRight: RiArrowRightLine,
  arrowLeft: RiArrowLeftLine,
  chevronLeft: FiChevronLeft,
  chevronRight: FiChevronRight,
  RiCloseFill: RiCloseFill,
  coupon: RiCoupon3Fill,
  mapCenterIcon: BiCurrentLocation,
  article: {
    emptyIcon: RiQuestionFill
  },
  orderSummary: {
    expand: RiArrowDownSLine,
    collapse: RiArrowUpSLine,
    voucher: RiCoupon3Fill,
    voucherApplied: RiCoupon3Fill,
    voucherRemoved: RiCloseFill,
    points: RiCopperDiamondFill,
    pointsApplied: RiCopperDiamondFill,
    close: RiCloseFill,
  },
  CartDetails: {
    removeIcon: RiDeleteBin2Line
  },
  productDetail: {
    prevIcon: RiArrowLeftLine,
    nextIcon: RiArrowRightLine,
    notifyIcon: RiNotification2Fill,
    openOrderIconDate: RiCalendarLine,
    openOrderIconTime: RiTimeLine,
    estimateIconClose: RiCloseFill,
    accordionIcon: GoPlus,
  },
  socialShare:{
    FacebookIcon: RiFacebookFill,
    TwitterIcon: RiTwitterFill,
    LinkedinIcon: RiLinkedinBoxFill,
    WhatsappIcon: RiWhatsappFill,
    EmailIcon: RiMailFill,
    TelegramIcon: RiTelegramFill,
  },
  setNewPassword: {
    passwordViewIcon: RiEyeCloseLine,
    passwordHideIcon: RiEyeLine,
    passwordCriteriaIcon: RiCheckboxCircleFill
  },
  register: {
    passwordViewIcon: RiEyeCloseLine,
    passwordHideIcon: RiEyeLine,
    passwordFulfilledCriteriaIcon: RiCheckboxCircleFill,
    passwordUnfulfilledCriteriaIcon: RiCheckboxCircleFill,
    datePickerCalendarIcon: RiCalendarLine,
  }
}

export default Icon