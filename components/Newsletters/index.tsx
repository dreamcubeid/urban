/* library package */
import { FC } from 'react'
import { Newsletter } from '@sirclo/nexus'
import { toast } from 'react-toastify'

/* component */
import styles from 'public/scss/components/Newsletter.module.scss'

const classesNewsletter = {
  containerClassName: styles.newsletter_popupInner,
  closeButtonClassName: styles.newsletter_close,
  formContainerClassName: styles.newsletter_form,
  labelClassName: styles.newsletter_label,
  inputClassName: styles.newsletter_input,
  buttonClassName: styles.newsletter_button,
}

const Newsletters: FC<any> = ({ i18n }) => {

  return (
    <div className={styles.newsletter_popupContainer}>
      <Newsletter
        classes={classesNewsletter}
        closeButton={i18n.t("home.later")}
        withForm
        buttonComponent={i18n.t("newsletter.subscribe")}
        onComplete={() => toast.success(i18n.t("newsletter.submitSuccess"))}
        onError={() => toast.error(i18n.t("newsletter.submitError"))}
      />
    </div>
  )
}

export default Newsletters
