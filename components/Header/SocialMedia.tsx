/* Library Template */
import { FC } from 'react'
import { useI18n, SocialMediaIcons } from '@sirclo/nexus'

/* Styles */
import styles from 'public/scss/components/SocialMedia.module.scss'

const classesSocialMediaIcons = {
  socialMediaIconContainer: 'a',
  socialMediaIcon: 'b'
}

const SocialMedia: FC<any> = () => {

  const i18n: any = useI18n()

  return (
    <>
      <div className={styles.container}>
        
        <p className={styles.title}>
          {i18n.t("")}
        </p>

        <SocialMediaIcons 
          classes={classesSocialMediaIcons}

          socialMediaIcons={
            {
              facebook: <span>FB</span>,
              twitter: <span>TW</span>,
              instagram: <span>IG</span>,
              youtube: <span>YT</span>,
              tiktok: <span>TT</span>
            }
          }
        />
      </div>
    </>
  )
}

export default SocialMedia