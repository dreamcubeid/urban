import { FC } from 'react'

import styles from 'public/scss/components/Stepper.module.scss'

type IProps = {
  page: string
  i18n: any
  isMobile: boolean
}

const stepper: FC<IProps> = ({
  page,
  i18n,
  isMobile
}) => {

  const getActive = (page: string, currentStep: string) => {

    if (currentStep === "place_order" && ['place_order', 'shipping_method', 'payment_method'].includes(page))
      return styles.stepItemActive
    else if (currentStep === "shipping_method" && ['shipping_method', 'payment_method'].includes(page))
      return styles.stepItemActive
    else if (currentStep === "payment_method" && ['payment_method'].includes(page))
      return styles.stepItemActive
    else
      return ""
  }

  const steps = {
    place_order: i18n.t("pageStepper.customerInfo"),
    shipping_method: i18n.t("pageStepper.shippingDetails"),
    payment_method: i18n.t("pageStepper.paymentMethod"),
  }

  const stepsNumber = {
    place_order: 1,
    shipping_method: 2,
    payment_method: 3,
  }

  return (
    <>
      <section className={styles.stepSection}>
        <div className={`container ${styles.stepContainer}`}>
          {isMobile ?
            <>
              <p className={styles.titleStepperMobile}>{steps[page]}</p>
              <div className={styles.progressCircleContainer}>
                <div className="progress-circle" data-percentage={page === "place_order" ? "30" : page === "shipping_method" ? "60" : "100"}>
                  <span className="progress-circle-left">
                    <span className="progress-circle-bar"></span>
                  </span>
                  <span className="progress-circle-right">
                    <span className="progress-circle-bar"></span>
                  </span>
                </div>
                <p className={styles.stepsNumberMobile}>
                  {stepsNumber[page]}
                </p>
              </div>
            </>
            :
            <>
              <div className={`${styles.stepItem} ${getActive(page, "place_order")}`}>
                <div className={styles.stepNumber}>{stepsNumber["place_order"]}</div>
                <p>{steps["place_order"]}</p>
              </div>
              <div className={`${styles.stepItem} ${getActive(page, "shipping_method")}`}>
                <div className={styles.stepNumber}>{stepsNumber["shipping_method"]}</div>
                <p>{steps["shipping_method"]}</p>
              </div>
              <div className={`${styles.stepItem} ${getActive(page, "payment_method")}`}>
                <div className={styles.stepNumber}>{stepsNumber["payment_method"]}</div>
                <p>{steps["payment_method"]}</p>
              </div>
            </>
          }
        </div>
      </section>
    </>
  )
}

export default stepper
