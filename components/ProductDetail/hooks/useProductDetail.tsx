/* library package */
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { formatPrice } from '@sirclo/nexus'

/* components */
const Popup = dynamic(() => import('components/Popup/Popup'))
import Router from 'next/router'

/* styles */
import stylesSuccessAddToCart from 'public/scss/components/SuccessAddToCart.module.scss'
import stylesErrorAddToCart from 'public/scss/components/ErrorAddToCart.module.scss'
import stylesNotify from 'public/scss/components/Notify.module.scss'

const useProductDetail = ({ lng, i18n, slug }) => {

  const IS_PROD = process.env.IS_PROD

  const [successAddToCart, setSuccessAddToCart] = useState(null)
  const [errorAddToCart, setErrorAddToCart] = useState(null)
  const [errorNotify, setErrorNotify] = useState<boolean>(false)
  const [successNotify, setSuccessNotify] = useState<boolean>(false)
  const [productId, setProductId] = useState<string>("")


  const toogleErrorAddToCart = () => setErrorAddToCart(!errorAddToCart)
  const toogleHideSuccedAddToCart = () => setSuccessAddToCart(false)
  const toogleErrorNotify = () => setErrorNotify(!errorNotify)
  const toogleSuccessNotify = () => setSuccessNotify(!successNotify)

  const toogleSuccessAddToCart = (data: any) => {
    const detailProduct = data?.filter((data: any) => data?.slug === slug)
    setSuccessAddToCart(detailProduct[0])
  }

  const ModalSuccessAddToCart = () => (
    <Popup
      setPopup={toogleHideSuccedAddToCart}
      mobileFull={false}
    >
      <div className={stylesSuccessAddToCart.container}>
        <h2 className={stylesSuccessAddToCart.title}>{i18n.t("cart.successAddToCart")}</h2>
        <div className={stylesSuccessAddToCart.detail}>
          <img
            src={successAddToCart?.imageURL}
            className={stylesSuccessAddToCart.image}
          />
          <div>
            <h4 className={stylesSuccessAddToCart.detailTitle}>{successAddToCart?.title}</h4>
            <div className={stylesSuccessAddToCart.detailPriceContainer}>
              {successAddToCart?.discount.value !== 0 &&
                <span className={stylesSuccessAddToCart.detailSale}> {formatPrice(successAddToCart?.price?.value, "IDR")} </span>
              }
              <p className={stylesSuccessAddToCart.detailPrice}> {formatPrice(successAddToCart?.salePrice?.value, 'IDR')} </p>
            </div>
          </div>
        </div>
        <div className={stylesSuccessAddToCart.footer}>
          <button
            className={stylesSuccessAddToCart.viewCartBtn}
            onClick={() => Router.push("/[lng]/cart", `/${lng}/cart`)}
          >
            {i18n.t("orderSummary.viewCart")}
          </button>
          <button
            className={stylesSuccessAddToCart.continueShoppingBtn}
            onClick={() => Router.push("/[lng]/products", `/${lng}/products`)}
          >
            {i18n.t("global.continueShopping")}
          </button>
        </div>
      </div>
    </Popup>
  )
  const ModalErrorAddToCart = () => (
    <Popup
      setPopup={toogleErrorAddToCart}
      mobileFull={false}
    >
      <div className={stylesErrorAddToCart.popupErrorContainer}>
        <h3 className={stylesErrorAddToCart.popupErrorTitle}>{i18n.t("cart.errorSKUTitle")}</h3>
        <p className={stylesErrorAddToCart.popupErrorDesc}>{i18n.t("cart.errorSKUDesc")} </p>
        <button
          className={stylesErrorAddToCart.backBtn}
          onClick={toogleErrorAddToCart}
          data-identity="addToCart-back-btn"
        >
          {i18n.t("global.back")}
        </button>
      </div>
    </Popup>
  )

  const ModalErrorNotify = () => (
    <Popup
      setPopup={toogleErrorNotify}
      mobileFull={false}
    >
      <div className={stylesNotify.popupErrorContainer}>
        <h3 className={stylesNotify.popupTitle}>{i18n.t("product.notifyTitleError")}</h3>
        <p className={stylesNotify.popupDesc}>{i18n.t("product.notifyError")} </p>
        <button
          className={stylesNotify.continueShoppingBtn}
          onClick={toogleErrorNotify}
        >
          {i18n.t("paymentStatus.tryAgain")}
        </button>
      </div>
    </Popup>
  )

  const ModalSuccessNotify = () => (
    <Popup
      setPopup={toogleSuccessNotify}
      mobileFull={false}
    >
      <div className={stylesNotify.popupSuccessContainer}>
        <h3 className={stylesNotify.popupTitle}>{i18n.t("product.notifyTitleSuccess")}</h3>
        <p className={stylesNotify.popupDesc}>{i18n.t("product.notifySuccess")} </p>
        <button
          className={stylesNotify.continueShoppingBtn}
          onClick={() => Router.push("/[lng]/products", `/${lng}/products`)}
        >
          {i18n.t("global.continueShopping")}
        </button>
      </div>
    </Popup>
  )

  return {
    successAddToCart,
    errorAddToCart,
    errorNotify,
    successNotify,
    toogleErrorAddToCart,
    toogleErrorNotify,
    toogleSuccessNotify,
    IS_PROD,
    toogleSuccessAddToCart,
    ModalSuccessAddToCart,
    ModalErrorAddToCart,
    ModalErrorNotify,
    ModalSuccessNotify,
    productId,
    setProductId
  }
}


export default useProductDetail