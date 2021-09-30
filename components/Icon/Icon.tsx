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
} from 'react-icons/ri'

import { GoPlus } from 'react-icons/go'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const Icon: any = {
  arrowRight: RiArrowRightLine,
  arrowLeft: RiArrowLeftLine,
  chevronLeft: FiChevronLeft,
  chevronRight: FiChevronRight,
  RiCloseFill: RiCloseFill,
  coupon: RiCoupon3Fill,
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
  }
}

export default Icon