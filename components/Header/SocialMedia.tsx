/* Library Template */
import { FC } from 'react'
import { useI18n, SocialMediaIcons } from '@sirclo/nexus'
import { IoLogoTiktok } from 'react-icons/io5'
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter,
  FaYoutube
} from 'react-icons/fa'

/* Styles */
import styles from 'public/scss/components/SocialMedia.module.scss'

const classesSocialMediaIcons = {
  socialMediaIconContainer: styles.icons,
  socialMediaIcon: styles.icon
}

const SocialMedia: FC<any> = () => {

  const i18n: any = useI18n()

  return (
    <>
      <div className={styles.container}>
        
        <p className={styles.title}>
          {i18n.t("header.socialMedia")}
        </p>

        <SocialMediaIcons 
          classes={classesSocialMediaIcons}

          socialMediaIcons={
            {
              facebook: <FaFacebookF />,
              twitter: <FaTwitter />,
              instagram: <FaInstagram />,
              youtube: <FaYoutube />,
              tiktok: <IoLogoTiktok />
            }
          }
        />
      </div>
    </>
  )
}

export default SocialMedia