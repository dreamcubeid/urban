import { FC } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ThankYou, useI18n } from "@sirclo/nexus";
import SEO from "components/SEO";
import Layout from "components/Layout/Layout";
import { useBrand } from "lib/useBrand";
import { toast } from "react-toastify";
import { Check } from "react-feather";
import styles from "public/scss/pages/ThankYou.module.scss";
/* locales */
import locale from "locales";

const classesThankYouPage = {
  thankYouClassName: styles.thankyou_inner,
  hankYouOrderID: styles.thankyou_label,
  thankYouMessageClassName: styles.thankyou_message,
  thankYouOrderID: styles.thankyou_orderID,
  buttonClassName: `btn w-100 ${styles.btn_primary} ${styles.btn_long}`
}

const ThankYouPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      <SEO title={i18n.t("thankYou.thanks")} />
      <section>
        <div className="container">
          <div className={styles.thankyou_container}>
            <ThankYou
              thankYouImageURL={<Check className={styles.thankyou_inner__icon} />}
              classes={classesThankYouPage}
              withDelay
              onSuccessMsg={(msg) => toast.success(msg)}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const lngDict = locale(params.lng);

  const brand = await useBrand(req);

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ""
    }
  };
}

export default ThankYouPage;
