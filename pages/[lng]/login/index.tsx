/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { toast } from 'react-toastify'
import {
  Login,
  useI18n,
  Logo
} from '@sirclo/nexus'
/* locales */
import locale from 'locales'
/* library template */
import { parseCookies } from 'lib/parseCookies'
import { useBrand } from 'lib/useBrand'
import { useAuthMethod } from 'lib/client'
import redirectIfAuthenticated from 'lib/redirectIfAuthenticated'
import useWindowSize from 'lib/useWindowSize'
/* component */
import Layout from 'components/Layout/Layout'
import LoginRegisterOTP from 'components/LoginRegisterOTP'
import Icon from 'components/Icon/Icon'
/* styles */
import styles from 'public/scss/pages/Login.module.scss'

const loginClasses = {
  containerClassName: styles.container,
  inputContainerClassName: styles.inputContainer,
  passwordContainerClassName: styles.passwordContainer,
  inputClassName: styles.input,
  passwordInputClassName: styles.passwordInput,
  buttonClassName: styles.button,
  footerClassName: styles.footer,
  forgotPasswordClass: styles.forgotPassword,
  passwordViewButtonClassName: styles.passwordViewButton,
}

const LoginPage: FC<any> = ({
  lng,
  lngDict,
  brand,
  hasGoogleAuth,
  hasOtp,
  hasFacebookAuth
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const i18n: any = useI18n()
  const size = useWindowSize()

  const icons = {
    passwordViewIcon: <Icon.register.passwordViewIcon />,
    passwordHideIcon: <Icon.register.passwordHideIcon />,
  }

  const layoutProps = {
    lngDict, 
    i18n, 
    lng, 
    brand,
    SEO: { 
      title: i18n.t("login.login")
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
        type="login"
        hasOtp={hasOtp}
        brand={brand}
        title={i18n.t("login.title")}
        hasGoogleAuth={hasGoogleAuth}
        hasFacebookAuth={hasFacebookAuth}
        lng={lng}
      >
        <section className={styles.section}>
          <Login
            classes={loginClasses}
            onCompletedMsg={(msg: string) => toast.success(msg)}
            onErrorMsg={(msg: string) => toast.error(msg)}
            loadingComponent={
              <div className="text-center d-flex">
                <span className="spinner-border text-dark" role="status" />
              </div>
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

export default LoginPage