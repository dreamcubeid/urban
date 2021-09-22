import {
  RiArrowRightLine,
  RiArrowLeftLine,
  RiCloseFill,
  RiCoupon3Fill,
  RiCopperDiamondFill,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiDeleteBin2Line
} from 'react-icons/ri'

const Icon: any = {
  arrowRight: RiArrowRightLine,
  arrowLeft: RiArrowLeftLine,
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
  }
}

export default Icon