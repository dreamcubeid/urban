/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Router from 'next/router'
import { toast } from 'react-toastify'
import ReCAPTCHA from 'react-google-recaptcha'
import { Register, useI18n } from '@sirclo/nexus'
/* locales */
import locale from 'locales'
/* library template */
import redirectIfAuthenticated from 'lib/redirectIfAuthenticated'
import { parseCookies } from 'lib/parseCookies'
import { useBrand } from 'lib/useBrand'
import { useAuthMethod } from 'lib/client'
/* component */
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import Layout from 'components/Layout/Layout'
import Loader from 'components/Loader/Loader'
import Icon from 'components/Icon/Icon'
import LoginRegisterOTP from 'components/LoginRegisterOTP'
/* styles */
import styles from 'public/scss/pages/Register.module.scss'
import stylesPasswordStrength from 'public/scss/components/PasswordStrength.module.scss'

const classesRegister = {
  headerLabelClassName: styles.headerLabel,
  inputContainerClassName: styles.inputContainer,
  buttonClassName: styles.button,
  verificationContainerClassName: styles.verificationContainer,
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

  const [isVerified, setIsVerified] = useState<boolean>(false)
  const linksBreadcrumb = [`${i18n.t("header.home")}`, `${i18n.t("register.title")}`]

  const icons = {
    passwordViewIcon: <Icon.register.passwordViewIcon />,
    passwordHideIcon: <Icon.register.passwordHideIcon />,
    passwordFulfilledCriteriaIcon: <Icon.register.passwordFulfilledCriteriaIcon color="#1DB954" size={16} />,
    passwordUnfulfilledCriteriaIcon: <Icon.register.passwordUnfulfilledCriteriaIcon color="#E5E7EF" size={16} />,
    datePickerCalendarIcon: <Icon.register.datePickerCalendarIcon />,
  }

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      <Breadcrumb links={linksBreadcrumb} lng={lng} />
      <div className={styles.register_wrapper}>
        <div className={styles.register_container}>
          <h3 className={styles.register_title}>{i18n.t("register.title")}</h3>
          <LoginRegisterOTP
            type="register"
            hasOtp={hasOtp}
            brand={brand}
            hasGoogleAuth={hasGoogleAuth}
            hasFacebookAuth={hasFacebookAuth}
          >
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
              loadingComponent={<Loader color="text-light" />}
              verificationComponent={
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_SITEKEY_RECAPTCHA}
                  onChange={() => setIsVerified(true)}
                />
              }
              {...icons}
            />
          </LoginRegisterOTP>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params
}) => {

  const lngDict = locale(params.lng);
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