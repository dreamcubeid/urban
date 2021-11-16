/* Library Packages */
import { FC } from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
  TelegramShareButton,
} from 'react-share'

/* Components */
import Icon from '../Icon/Icon'

/* Styles */
import styles from 'public/scss/components/SocialShare.module.scss'

type TypeSocialShare = {
  i18n?: any
  urlSite: string
  classes?: {
    socialShareParentDivClassName?: string
    socialShareItemClassName?: string
    socialShareLabelClassName?: string
  }
  withLabel?: boolean
  customLabel?: string
  [otherProp: string]: any
}

const SocialShare: FC<TypeSocialShare> = ({
  i18n,
  urlSite,
  classes = {
    socialShareParentDivClassName: styles.socialShare,
    socialShareItemClassName: styles.socialShare_item,
    socialShareLabelClassName: styles.socialShare_label,
  },
  withLabel = true,
  customLabel = i18n.t("product.shareProduct"),
  ...props
}) => {


  return (
    <div className={classes.socialShareParentDivClassName}>
      {withLabel && 
        <p className={classes.socialShareLabelClassName}>
          {customLabel}
        </p>
      }
      <div className={classes.socialShareItemClassName}>
        <FacebookShareButton url={urlSite}>
          <Icon.socialShare.FacebookIcon {...props} />
        </FacebookShareButton>
        <TwitterShareButton url={urlSite}>
          <Icon.socialShare.TwitterIcon {...props} />
        </TwitterShareButton>
        <LinkedinShareButton url={urlSite}>
          <Icon.socialShare.LinkedinIcon {...props} />
        </LinkedinShareButton>
        <WhatsappShareButton url={urlSite}>
          <Icon.socialShare.WhatsappIcon {...props} />
        </WhatsappShareButton>
        <EmailShareButton url={urlSite}>
          <Icon.socialShare.EmailIcon {...props} />
        </EmailShareButton>
        <TelegramShareButton url={urlSite}>
          <Icon.socialShare.TelegramIcon {...props} />
        </TelegramShareButton>
      </div>
    </div>
  )
}

export default SocialShare