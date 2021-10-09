/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { useI18n, usePaymentLink } from '@sirclo/nexus'
/* library component */
import { useBrand } from 'lib/useBrand'
/* component */
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
/* styles */
import styles from 'public/scss/pages/PaymentStatus.module.scss'

/* locales */
import locale from 'locales'

type TypePaymentStatus = {
  title?: string,
  contentDesc?: string
}

const PaymentStatus: FC<any> = ({
  lng,
  lngDict,
  brand,
  orderID,
  status
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const i18n: any = useI18n()
  const router = useRouter()
  const { data } = usePaymentLink(orderID)

  let paymentStatus: TypePaymentStatus

  if (data === undefined || status === null) status = "orderNotFound"
  if (status === "failed") {
    paymentStatus = {
      title: i18n.t("paymentStatus.titleFailed"),
      contentDesc: i18n.t("paymentStatus.failedDesc")
    }
  } else if (status === "unfinish") {
    paymentStatus = {
      title: i18n.t("paymentStatus.titleUnfinish"),
      contentDesc: i18n.t("paymentStatus.unfinishDesc")
    }
  } else {
    paymentStatus = {
      title: i18n.t("paymentStatus.orderNotFound")
    }
  }

  const linksBreadcrumb = [`${i18n.t("header.home")}`, i18n.t("orderHistory.lineItemDelivered")]


  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      withHeader={false}
      withFooter={false}
    >
      <section className={`${styles.breadcumbSection} ${status}`}>
        <Breadcrumb
          bgBlack
          title={paymentStatus?.title}
          links={linksBreadcrumb}
          lng={lng}
        />
      </section>
      <section className="container">
        <div className={styles.container}>
          <div className={styles.inner}>
            {!["orderNotFound", ""].includes(status) &&
              <div className={styles.content}>
                <p className={styles.contentDesc}>
                  {paymentStatus?.contentDesc}
                </p>
              </div>
            }
            <div className={styles.action}>
              {status !== 'unfinish' &&
                <div className={styles.actionButton}>
                  <button
                    className={styles.button}
                    onClick={() => router.push("/[lng]/products", `/${lng}/products`)}
                  >
                    {i18n.t("paymentStatus.continueShopping")}
                  </button>
                </div>
              }
              {status !== 'orderNotFound' &&
                <div className={styles.actionButton}>
                  <button
                    className={styles.button}
                    onClick={() => {
                      window.location.href = data.orders[0].paymentLinks[0];
                    }}
                  >
                    {i18n.t("paymentStatus.tryAgain")}
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {

  const lngDict = locale(params.lng)
  const brand = await useBrand(req)
  const [orderID, status] = params?.orderID as string[]

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || "",
      orderID: orderID || "",
      status: status || "",
    }
  };
}

export default PaymentStatus;