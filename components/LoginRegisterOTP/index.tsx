/* Library Packages */
import { FC, useState } from 'react'
import { toast } from 'react-toastify'
import { IncomingMessage } from 'http'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {
  SingleSignOn,
  Widget,
  useI18n,
  WhatsAppOTPInput
} from '@sirclo/nexus'
/* component */
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
const Placeholder = dynamic(() => import('components/Placeholder'))
/* styles */
import styles from 'public/scss/components/whatsappOTP/LoginRegisterOTP.module.scss'

type LoginRegisterOTPPropsType = {
  hasOtp: IncomingMessage
  hasGoogleAuth: IncomingMessage
  hasFacebookAuth: IncomingMessage
  title?: string
  type: "login" | "register"
  brand: any
  lng: string
}

const formClasses = {
  inputFormContainerClassName: styles.inputFormContainer,
  formWAContainerClassName: styles.formWAContainer,
  inputFormTitleClassName: styles.inputFormTitle,
  inputLabelClassName: styles.inputLabel,
  inputWANumberClassName: styles.inputWANumber,
  inputFormDescriptionClassName: styles.inputFormDescription,
  btnSubmitClassName: styles.btnSubmit,
  inputDescriptionClassName: styles.inputDescription,
}

const confirmationClasses = {
  confirmationContainerClassName: styles.confirmationContainer,
  confirmationBackContainerClassName: styles.confirmationBackContainer,
  confirmationBackLabelClassName: styles.confirmationBackLabel,
  confirmationHeaderTitleClassName: styles.confirmationHeaderTitle,
  confirmationHeaderSubtitleClassName: styles.confirmationHeaderSubtitle,
  noWhatsAppLabelClassName: styles.noWhatsAppLabel,
  anotherLoginMethodClassName: styles.anotherLoginMethod,
  confirmationButtonOTPClassName: styles.confirmationButtonOTP,
}

const verificationClasses = {
  verificationContainerClassName: styles.verificationContainer,
  verificationTitleClassName: styles.verificationTitle,
  infoLabelClassName: styles.infoLabel,
  footerLabelClassName: styles.footerLabel,
  btnResendOTPClassName: styles.btnResendOTP,
  btnChangeMethodClassName: styles.btnChangeMethod,
  fieldOTPInputContainerClassName: styles.fieldOTPInputContainer,
  fieldOTPInputClassName: styles.fieldOTPInput,
}

const chooseAccountClasses = {
  chooseAccountContainerClassName: styles.chooseAccountContainer,
  accountOptionsContainerClassName: styles.accountOptionsContainer,
  accountOptionClassName: styles.accountOption,
  accountNameClassName: styles.accountName,
  accountEmailClassName: styles.accountEmail,
  selectedAccountClassName: styles.selectedAccount,
  chooseAccountTitleClassName: styles.chooseAccountTitle,
  chooseAccountDescriptionClassName: styles.chooseAccountDescription,
  btnChooseAccountClassName: styles.btnChooseAccount,
}

const LoginRegisterOTP: FC<LoginRegisterOTPPropsType> = ({
  type,
  brand,
  hasOtp,
  children,
  title,
  hasGoogleAuth,
  hasFacebookAuth,
  lng
}) => {
  const i18n: any = useI18n()
  const router: any = useRouter()
  const query = router?.query || {}

  const steps = {
    email: "email",
    wa: "whatsapp-input"
  }
  const [step, setStep] = useState<string>(steps.wa)

  const brandName = (brand: string): string => {
    const lower = brand?.toLowerCase()
    return brand?.charAt(0).toUpperCase() + lower?.slice(1)
  }

  const handleChangeStep = (step: string) => {
    if (step === steps.email) setStep('whatsapp-input')
    if (step === steps.wa) setStep('email')
  }

  const linksBreadcrumb = [`${i18n.t("header.home")}`, title]

  let customLocales = {}
  if (type === "register") customLocales = {
    continue: i18n.t("whatsAppOTPInputRegis.continue"),
    disclaimer: i18n.t("whatsAppOTPInputRegis.disclaimer"),
    inputWhatsApp: i18n.t("whatsAppOTPInputRegis.inputWhatsApp"),
    loginWithAnotherMethod: i18n.t("whatsAppOTPInputRegis.loginWithAnotherMethod"),
    chooseAnyAccountToLogin: i18n.t("whatsAppOTPInputRegis.chooseAnyAccountToLogin"),
  }

  return (
    <>
      {((step === steps.email || step === steps.wa) && title) &&
        <div className={styles.sectionBreadcumb}>
        <Breadcrumb
          title={title}
          links={linksBreadcrumb}
          lng={lng}
          fluidContainer
        />
      </div>
      }

      {step === steps.email || !hasOtp ?
        children
        :
        <WhatsAppOTPInput
          brandName={brandName(brand?.name)}
          onStepChange={setStep}
          classes={{
            ...formClasses,
            ...confirmationClasses,
            ...verificationClasses,
            ...chooseAccountClasses,
          }}
          inputPlaceholder={i18n.t("whatsAppOTPInput.inputPlaceholder")}
          onErrorMsg={(msg) => toast.error(msg)}
          loginRedirectPath="account"
          customLocales={customLocales}
        />
      }

      <Widget
        widgetClassName={styles.widgetLogin}
        pos="login-image"
        loadingComponent={
          <Placeholder
            classes={{
              placeholderImage: styles.widgetLogin
            }}
            withImage
          />
        }
      />

      {((step === steps.email || step === steps.wa) || type === "register") &&
        <div className={styles.footer}>
          {type === "register" ?
            i18n.t('register.haveAccount') :
            i18n.t('login.dontHaveAccount')
          } {' '}
          <Link
            href={{
              pathname: `/[lng]/${type === "register" ? "login" : "register"}`,
              query: query,
            }}
          >
            <a>
              {type === "register" ?
                i18n.t('login.title') :
                i18n.t('login.toRegister')
              }
            </a>
          </Link>
        </div>
      }

      {(step === steps.email || step === steps.wa) &&
        <>
        {(hasGoogleAuth || hasFacebookAuth || hasOtp) &&
            <div className={styles.ssoContainer}>
              {(hasGoogleAuth || hasFacebookAuth || hasOtp) &&
                <label className={styles.ssoOr}>
                  {i18n.t(`${type}.or`)}
                </label>
              }
              <div className={styles.ssoButtonContainer}>
                <SingleSignOn
                  className={styles.ssoButton}
                  buttonText={i18n.t("login.sso")}
                  onErrorMsg={(msg: string) => toast.error(msg)}
                  loadingComponent={
                    <div className="text-center">
                      <span className="spinner-border text-dark" role="status" />
                      <p>
                        {i18n.t("global.loading")}
                      </p>
                    </div>
                  }
                />
                {hasOtp &&
                  <button
                    className={styles.buttonWaEmail}
                    onClick={() => handleChangeStep(step)}
                  >
                    <span className={step}></span>
                  </button>
                }
              </div>
            </div>
          }
        </>
      }
    </>
  )
}
export default LoginRegisterOTP