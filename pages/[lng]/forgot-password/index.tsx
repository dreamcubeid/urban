/*library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { ResetPassword, useI18n } from '@sirclo/nexus'
import { toast } from 'react-toastify'
/* library component */
import { parseCookies } from 'lib/parseCookies'
import redirectIfAuthenticated from 'lib/redirectIfAuthenticated'
import { useBrand } from 'lib/useBrand'
/* component */
import SEO from 'components/SEO'
import Layout from 'components/Layout/Layout'
import Loader from 'components/Loader/Loader'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import useWindowSize from 'lib/useWindowSize'
/* styles */
import styles from 'public/scss/pages/ForgotPassword.module.scss'
/* locales */
import locale from "locales";

const classesResetPassword = {
  inputClassName: styles.input,
  buttonClassName: styles.button,
}

const ForgotPassword: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const size = useWindowSize()
  const linksBreadcrumb = [`${i18n.t("header.home")}`, i18n.t("resetPassword.title")]

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      <SEO title={i18n.t("resetPassword.title")} />
      <Breadcrumb
        title={i18n.t("resetPassword.title")}
        links={linksBreadcrumb}
        lng={lng}
        titleMiddle={size.width > 767}
      />
      <section className={`container ${styles.section}`}>
        <div className={styles.inner}>
          <p>{i18n.t("resetPassword.enterEmailBody")}</p>
          <ResetPassword
            classes={classesResetPassword}
            onErrorMsg={(msg: string) => toast.error(msg)}
            onSuccessMsg={(msg: string) => toast.success(msg)}
            loadingComponent={<Loader color="text-light" />}
          />
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params
}) => {
  const lngDict = locale(params.lng);

  const brand = await useBrand(req);

  const cookies = parseCookies(req);
  redirectIfAuthenticated(res, cookies, 'account');

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ""
    }
  };
}

export default ForgotPassword;