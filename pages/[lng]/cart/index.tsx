/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import { parseCookies } from 'lib/parseCookies'
// import Router from 'next/router'
import dynamic from 'next/dynamic'
import { Trash } from 'react-feather'
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
  cartHeaderClassName: "d-none",
  itemClassName: styles.cartItem,
  itemImageClassName: styles.cartItem_image,
  itemTitleClassName: styles.cartItem_detail,
  itemPriceClassName: styles.cartItem_priceCalculate,
  itemRegularPriceClassName: styles.cartItem_priceRegular,
  itemSalePriceClassName: styles.cartItem_priceSale,
  itemSalePriceWrapperClassName: styles.cartItem_priceSaleWrapper,
  itemDiscountNoteClassName: styles.cartItem_discNote,
  itemRegularAmountClassName: "d-none",
  headerQtyClassName: "d-none",
  itemQtyClassName: styles.cartItem_qty,
  qtyBoxClassName: styles.cartItem_qtyBox,
  itemAmountClassName: styles.cartItem_price,
  itemEditClassName: "d-none",
  itemRemoveClassName: styles.cartItem_remove,
  cartFooterClassName: `${styles.cart_cartFooter} ${styles.sirclo_form_row} w-100`,
  cartFooterTitleClassName: styles.cartFooter_title,
  cartFooterTextareaClassName: `form-control ${styles.sirclo_form_input} ${styles.cartFooter_input} py-2`,
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
  const linksBreadcrumb = [`${i18n.t("header.home")}`, i18n.t("product.products")]

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
        <Breadcrumb title={i18n.t("product.all")} links={linksBreadcrumb} lng={lng} />
      </section>
      {invalidMsg !== "" &&
        <div className={styles.cartError}>
          <div className={styles.cartError_inner}>
            {invalidMsg}
          </div>
        </div>
      }
      <section className="container">
        <div className={styles.container}>
          <div className={styles.cardDetailContiner}>
            <CartDetails
              getSKU={(SKUs: any) => setSKUs(SKUs)}
              classes={classesCartDetails}
              itemRedirectPathPrefix="product"
              isEditable={true}
              removeIcon={<Trash />}
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
              page="place_order"
            />
          </div>
        </div>
      </section>

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