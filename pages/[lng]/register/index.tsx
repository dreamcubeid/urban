/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { toast } from 'react-toastify'
import Router from 'next/router'
import ReCAPTCHA from 'react-google-recaptcha'
import {
  Register,
  useI18n,
  Logo
} from '@sirclo/nexus'
/* locales */
import locale from 'locales'
/* library template */
import redirectIfAuthenticated from 'lib/redirectIfAuthenticated'
import { parseCookies } from 'lib/parseCookies'
import { useBrand } from 'lib/useBrand'
import { useAuthMethod } from 'lib/client'
import useWindowSize from 'lib/useWindowSize'
/* component */
import Layout from 'components/Layout/Layout'

import Icon from 'components/Icon/Icon'
import LoginRegisterOTP from 'components/LoginRegisterOTP'
/* styles */
import styles from 'public/scss/pages/Register.module.scss'
import stylesPasswordStrength from 'public/scss/components/PasswordStrength.module.scss'

const classesRegister = {
  containerClassName: styles.container,
  headerLabelClassName: styles.headerLabel,
  inputClassName: styles.input,
  inputContainerClassName: styles.inputContainer,
  passwordInputClassName: styles.passwordInput,
  buttonClassName: styles.button,
  verificationContainerClassName: styles.verificationContainer,
  passwordViewButtonClassName: styles.passwordViewButton,
  labelRequiredClassName: styles.labelRequired,
}

const passwordStrengthClasses = {
  passwordStrengthBarClassName: stylesPasswordStrength.passwordStrengthBar,
  passwordCriteriaListClassName: stylesPasswordStrength.passwordCriteriaList,
  passwordCriteriaClassName: stylesPasswordStrength.passwordCriteria,
  passwordStrengthLabelClassName: stylesPasswordStrength.passwordStrengthLabel,
}

const RegisterPage: FC<any> = ({
  lng,
  lngDict,
  brand,
  hasOtp,
  hasGoogleAuth,
  hasFacebookAuth
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const i18n: any = useI18n()
  const size = useWindowSize()

  const [isVerified, setIsVerified] = useState<boolean>(false)

  const icons = {
    passwordViewIcon: <Icon.register.passwordViewIcon />,
    passwordHideIcon: <Icon.register.passwordHideIcon />,
    passwordFulfilledCriteriaIcon: <Icon.register.passwordFulfilledCriteriaIcon color="#1DB954" size={16} />,
    passwordUnfulfilledCriteriaIcon: <Icon.register.passwordUnfulfilledCriteriaIcon color="#E5E7EF" size={16} />,
    datePickerCalendarIcon: <Icon.register.datePickerCalendarIcon />,
  }

  const layoutProps = {
    lngDict, 
    i18n, 
    lng, 
    brand,
    layoutClassName: styles.layout,
    SEO: { 
      title: i18n.t("register.title") 
    },
    withHeader: false,
    withFooter: false
  }

  return (
    <Layout {...layoutProps}>
      <section className={styles.sectionBrand}>
        <Logo
          imageClassName={styles.brandImage}
          thumborSetting={{
            width: size.width < 575 ? 200 : 400,
            quality: 90
          }}
          lazyLoadedImage={false}
        />
      </section>

      <LoginRegisterOTP
        type="register"
        hasOtp={hasOtp}
        brand={brand}
        title={i18n.t("register.title")}
        hasGoogleAuth={hasGoogleAuth}
        hasFacebookAuth={hasFacebookAuth}
        lng={lng}
      >
        <section className={styles.section}>
          <Register
            classes={{
              ...classesRegister,
              ...passwordStrengthClasses,
            }}
            withHeaderLabel={true}
            onErrorMsg={(msg) => toast.error(msg)}
            onSuccessMsg={(msg) => toast.success(msg)}
            redirectPage={() => Router.push(`/[lng]/login`, `/${lng}/login`)}
            withVerification={true}
            isVerified={isVerified}
            loadingComponent={
              <div className="text-center  d-flex">
                <span className="spinner-border text-dark" role="status" />
              </div>
            }
            verificationComponent={
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_SITEKEY_RECAPTCHA}
                onChange={() => setIsVerified(true)}
              />
            }
            {...icons}
          />
        </section>
      </LoginRegisterOTP>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params
}) => {

  const lngDict = locale(params.lng)
  const brand = await useBrand(req)
  const cookies = parseCookies(req)
  const { hasGoogleAuth, hasFacebookAuth, hasOtp } = await useAuthMethod(req)
  redirectIfAuthenticated(res, cookies, 'account')

  return {
    props: {
      lng: params.lng,
      lngDict,
      hasGoogleAuth,
      hasFacebookAuth,
      hasOtp,
      brand: brand || ""
    }
  }
}

export default RegisterPage