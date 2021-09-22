/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import { parseCookies } from 'lib/parseCookies'
// import Router from 'next/router'
import dynamic from 'next/dynamic'
import Icon from 'components/Icon/Icon'
import {
  CartDetails,
  useI18n
} from '@sirclo/nexus'

/* locales */
import locale from 'locales'

/* library template */
import { useBrand } from 'lib/useBrand'
import useWindowSize from 'lib/useWindowSize'

/* components */
import Layout from 'components/Layout/Layout'
import ProductRecomendation from 'components/ProductRecomendation'
import OrderSummaryBox from 'components/OrderSummaryBox'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'

const Popup = dynamic(() => import('components/Popup/Popup'))

/* styles */
import styles from 'public/scss/pages/Cart.module.scss'


const classesCartDetails = {
  className: styles.cart,
  itemClassName: styles.item,
  itemImageClassName: styles.itemImage,
  itemTitleClassName: styles.itemTitle,
  itemPriceClassName: styles.itemPrice,
  itemRegularPriceClassName: styles.itemRegularPrice,
  itemSalePriceClassName: styles.itemSalePrice,
  itemSalePriceWrapperClassName: styles.itemSalePriceWrapper,
  itemDiscountNoteClassName: styles.itemDiscountNote,
  itemQtyClassName: styles.itemQty,
  qtyBoxClassName: styles.qtyBox,
  itemAmountClassName: styles.itemAmount,
  itemRemoveClassName: styles.itemRemove,
  cartFooterClassName: styles.cartFooter,
  cartFooterTextareaClassName: styles.cartFooterTextarea,
  itemEditClassName: styles.itemEdit,
  itemRegularAmountClassName: styles.itemRegularAmount,
  changeQtyButtonClassName: styles.changeQtyButton,
  removeButtonClassName: styles.removeButton,
  // hidden
  cartFooterTitleClassName: "d-none",
  headerQtyClassName: "d-none",
  cartHeaderClassName: "d-none",
}

const Cart: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const i18n: any = useI18n()
  const size: any = useWindowSize()

  const [SKUs, setSKUs] = useState<Array<string>>(null)
  const [showModalErrorAddToCart, setShowModalErrorAddToCart] = useState<boolean>(false)
  const [invalidMsg, setInvalidMsg] = useState<string>('')

  const toogleErrorAddToCart = () => setShowModalErrorAddToCart(!showModalErrorAddToCart);
  const linksBreadcrumb = [`${i18n.t("header.home")}`, i18n.t("cart.cart")]

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      titleHeader={i18n.t("cart.title")}
      withCart={false}
      withFooter={false}
      customClassName={`${styles.cart_layout} ${styles.main__noNavbar}`}
    >
      <section className={styles.products_breadcumb}>
        <Breadcrumb title={i18n.t("cart.title")} links={linksBreadcrumb} lng={lng} />
      </section>

      <section className="container">
      </section>
      {invalidMsg !== "" &&
        <div className={styles.cartError}>
          <div className={styles.cartError_inner}>
            {invalidMsg}
          </div>
        </div>
      }
      <LazyLoadComponent>
        <section className="container">
          <div className={styles.container}>
            <div className={styles.cardDetailContiner}>
              <CartDetails
                getSKU={(SKUs: any) => setSKUs(SKUs)}
                classes={classesCartDetails}
                itemRedirectPathPrefix="product"
                isEditable={true}
                removeIcon={<Icon.CartDetails.removeIcon />}
                onErrorMsg={() => setShowModalErrorAddToCart(true)}
                onInvalidMsg={(msg) => setInvalidMsg(msg)}
                thumborSetting={{
                  width: size.width < 768 ? 200 : 400,
                  format: "webp",
                  quality: 85,
                }}
                loadingComponent={<>TODO: SKELETON</>}
                emptyCartPlaceHolder={<>TODO: Empty</>}
              />
            </div>
            <div className={styles.orderSummaryContainer}>
              <OrderSummaryBox
                lng={lng}
                i18n={i18n}
                page="cart"
              />
            </div>
          </div>
        </section>
      </LazyLoadComponent>

      <LazyLoadComponent>
        <ProductRecomendation
          type="crossSell"
          SKUs={SKUs}
          title={i18n.t("product.recomendation")}
        />
      </LazyLoadComponent>
      {showModalErrorAddToCart &&
        <Popup
          withHeader
          setPopup={toogleErrorAddToCart}
          mobileFull={false}
          classPopopBody
        >
          <div className={styles.popup_popupError}>
            <h3 className={styles.popup_popupErrorTitle}>{i18n.t("cart.errorSKUTitle")}</h3>
            <p className={styles.popup_popupErrorDesc}>{i18n.t("cart.errorSKUDesc")} </p>
          </div>
        </Popup>
      }
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params
}) => {
  const lngDict = locale(params.lng)

  if (process.env.IS_PROD !== "false") {
    const cookies = parseCookies(req)
    res.writeHead(307, {
      Location: `/${cookies.ACTIVE_LNG || "id"}`,
    });
    res.end()
  }

  const brand = await useBrand(req)

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ''
    }
  }
}

export default Cart