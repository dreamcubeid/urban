/* library package */
import { FC, useState } from 'react'
import dynamic from 'next/dynamic'
import { InstagramFeed } from '@sirclo/nexus'

/* library template */
import useWindowSize from 'lib/useWindowSize'

/* component */
import styles from 'public/scss/components/InstaFeed.module.scss'
import Placeholder from 'components/Placeholder'

const InstagramQuickView = dynamic(() => import('@sirclo/nexus').then((mod) => mod.InstagramQuickView))

const classesInstagramQuickView = {
  quickViewBackgroundClassName: styles.instagramFeed_quickviewBackground,
  quickViewContentClassName: styles.instagramFeed_quickviewInner,
  closeButtonClassName: `${styles.btn} ${styles.instagramFeed_quickviewButton}`,
  quickViewAnchorClassName: styles.instagramFeed_quickviewLink,
  quickViewMediaClassName: styles.instagramFeed_quickviewImage
}

const classesInstagramFeed = {
  containerClassName: styles.instagramFeed,
  mediaClassName: styles.instagramFeed_item,
  anchorClassName: styles.instagramFeed_link,
  imageClassName: styles.instagramFeed_image
}

const classesPlaceholderInstafeed = {
  placeholderList: styles.instagramFeed_placeholder
}

type InstafeedType = {
  i18n: any,
  brand: any,
  title?: string,
  withQuickview?: boolean,
  withFollowButton?: boolean,
  followButtonText?: string
}

const Instafeed: FC<InstafeedType> = ({
  i18n,
  brand,
  title,
  withQuickview = false,
  withFollowButton = false,
  followButtonText = i18n.t("instagram.label")
}) => {
  const size: any = useWindowSize()

  const [instagramQuickView, setInstagramQuickView] = useState<boolean>(false)
  const [instagramMedia, setInstagramMedia] = useState<any>({})

  const handleFollowButton = () => {
    window.open(brand?.socmedSetting?.socmedLink?.instagram);
  }

  return (
    <>

      {title &&
        <h2 className={styles.instagramFeed_title}>
          {title}
        </h2>
      }

      <InstagramFeed
        postLimit={6}
        classes={classesInstagramFeed}
        showQuickView={setInstagramQuickView}
        getQuickViewMedia={setInstagramMedia}
        withQuickview={withQuickview}
        loadingComponent={
          <div className={styles.instagramFeed_placeholderWrapper}>
            <Placeholder
              classes={classesPlaceholderInstafeed}
              withList
              listMany={6}
            />
          </div>
        }
        thumborSetting={{
          width: size.width < 575 ? 250 : 400,
          format: 'webp',
          quality: 85,
        }}
      />

      {withFollowButton &&
        <div className={styles.instagramFeed_button}>
          <button type="button" onClick={handleFollowButton}>
            {followButtonText}
          </button>
        </div>
      }

      {(instagramQuickView && instagramMedia) &&
        <InstagramQuickView
          classes={classesInstagramQuickView}
          showQuickView={setInstagramQuickView}
          media={instagramMedia}
          thumborSetting={{
            width: size.width < 575 ? 350 : 500,
            format: 'webp',
            quality: 85
          }}
        />

      }
    </>
  )
}

export default Instafeed