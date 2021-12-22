/*library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { SetNewPassword, useI18n } from '@sirclo/nexus'
import { toast } from 'react-toastify'
import Icon from 'components/Icon/Icon'
/* library component */
import { useBrand } from 'lib/useBrand'
import useWindowSize from 'lib/useWindowSize'
/* library component */
import Layout from 'components/Layout/Layout'
import Loader from 'components/Loader/Loader'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
/* styles */
import styles from 'public/scss/pages/ResetPassword.module.scss'
import stylesPasswordStrength from 'public/scss/components/PasswordStrength.module.scss'
/* locales */
import locale from "locales";

const classesSetNewPassword = {
  containerClassName: styles.container,
  inputContainerClassName: styles.inputContainer,
  inputClassName: styles.input,
  passwordViewButtonClassName: styles.passwordViewButton,
  passwordStrengthBarClassName: stylesPasswordStrength.passwordStrengthBar,
  passwordCriteriaListClassName: stylesPasswordStrength.passwordCriteriaList,
  passwordCriteriaClassName: stylesPasswordStrength.passwordCriteria,
  passwordStrengthLabelClassName: stylesPasswordStrength.passwordStrengthLabel,
  buttonClassName: styles.button,
  errorClassName: styles.error,
}

const ResetPasswordPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const i18n: any = useI18n()
  const size = useWindowSize()
  const linksBreadcrumb = [`${i18n.t("header.home")}`, i18n.t("resetPassword.setNew")]
  const layoutProps = {
    lngDict, i18n, lng, brand,
    SEO: { title: i18n.t("resetPassword.setNew") }
  }

  return (
    <Layout {...layoutProps}>
      <Breadcrumb
        title={i18n.t("resetPassword.setNew")}
        links={linksBreadcrumb}
        lng={lng}
        titleMiddle={size.width > 767}
      />
      <section className={`container ${styles.section}`}>
        <SetNewPassword
          classes={classesSetNewPassword}
          onErrorMsg={toast.error}
          onSuccessMsg={toast.success}
          passwordViewIcon={<Icon.setNewPassword.passwordViewIcon />}
          passwordHideIcon={<Icon.setNewPassword.passwordHideIcon />}
          passwordFulfilledCriteriaIcon={<Icon.setNewPassword.passwordCriteriaIcon color="#1DB954" size={16} />}
          passwordUnfulfilledCriteriaIcon={<Icon.setNewPassword.passwordCriteriaIcon color="#E5E7EF" size={16} />}
          loadingComponent={<Loader color="text-light" />}
        />
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

export default ResetPasswordPage;
