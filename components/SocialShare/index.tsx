import { FC } from 'react'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
  TelegramShareButton,
  TelegramIcon
} from 'react-share'

import styles from 'public/scss/components/SocialShare.module.scss'

type TypeSocialShare = {
  i18n?: any,
  urlSite: string,
  borderRadius?: number | undefined,
  round?: boolean,
  iconFillColor?: string
  size?: string | number | undefined,
  withLabel?: boolean
  bgStyle?: {
    fill?: string
  },
  classes?: {
    socialShareParentDivClassName?: string
    socialShareItemClassName?: string
  }
}

const SocialShare: FC<TypeSocialShare> = ({
  i18n,
  urlSite,
  borderRadius,
  round = false,
  iconFillColor = 'white',
  size = 40,
  withLabel = true,
  bgStyle = {},
  classes = {
    socialShareParentDivClassName: styles.socialShare,
    socialShareItemClassName: styles.socialShare_item,
  }
}) => {

  const iconProps = {
    size,
    borderRadius,
    round,
    bgStyle,
    iconFillColor
  }

  return (
    <div className={classes.socialShareParentDivClassName}>
      <div className={classes.socialShareItemClassName}>
        <FacebookShareButton url={urlSite}>
          <FacebookIcon {...iconProps} />
        </FacebookShareButton>
        {withLabel && 
          <span>
            {i18n.t("socialShare.facebook")}
          </span>
        }
      </div>
      <div className={classes.socialShareItemClassName}>
        <TwitterShareButton url={urlSite}>
          <TwitterIcon {...iconProps} />
        </TwitterShareButton>
        {withLabel && 
          <span>
            {i18n.t("socialShare.twitter")}
          </span>
        }
      </div>
      <div className={classes.socialShareItemClassName}>
        <LinkedinShareButton url={urlSite}>
          <LinkedinIcon {...iconProps} />
        </LinkedinShareButton>
        {withLabel && 
          <span>
            {i18n.t("socialShare.linkedin")}
          </span>
        }
      </div>
      <div className={classes.socialShareItemClassName}>
        <EmailShareButton url={urlSite}>
          <EmailIcon {...iconProps} />
        </EmailShareButton>
        {withLabel && 
          <span>
            {i18n.t("socialShare.email")}
          </span>
        }
      </div>
      <div className={classes.socialShareItemClassName}>
        <WhatsappShareButton url={urlSite}>
          <WhatsappIcon {...iconProps} />
        </WhatsappShareButton>
        {withLabel && 
          <span>
            {i18n.t("socialShare.whatsapp")}
          </span>
        }
      </div>
      <div className={classes.socialShareItemClassName}>
        <TelegramShareButton url={urlSite}>
          <TelegramIcon {...iconProps} />
        </TelegramShareButton>
        {withLabel && 
          <span>
            {i18n.t("socialShare.telegram")}
          </span>
        }
      </div>
    </div>
  )
}

export default SocialShare