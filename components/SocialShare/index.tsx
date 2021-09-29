import { FC } from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
  TelegramShareButton,
} from 'react-share'

import Icon from '../Icon/Icon'

import styles from 'public/scss/components/SocialShare.module.scss'

type TypeSocialShare = {
  i18n?: any,
  urlSite: string,
  classes?: {
    socialShareParentDivClassName?: string
    socialShareItemClassName?: string
  }
  [otherProp: string]: any
}

const SocialShare: FC<TypeSocialShare> = ({
  i18n,
  urlSite,
  classes = {
    socialShareParentDivClassName: styles.socialShare,
    socialShareItemClassName: styles.socialShare_item,
  },
  ...props
}) => {


  return (
    <div className={classes.socialShareParentDivClassName}>
      <p>{i18n.t("product.shareProduct")}</p>
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
        <EmailShareButton url={urlSite}>
          <Icon.socialShare.WhatsappIcon {...props} />
        </EmailShareButton>
        <WhatsappShareButton url={urlSite}>
          <Icon.socialShare.EmailIcon {...props} />
        </WhatsappShareButton>
        <TelegramShareButton url={urlSite}>
          <Icon.socialShare.TelegramIcon {...props} />
        </TelegramShareButton>
      </div>
    </div>
  )
}

export default SocialShare