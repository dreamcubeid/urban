/* library package */
import { FC, ReactNode } from 'react'
import { useRouter } from 'next/router'
import { Widget } from '@sirclo/nexus'

/* component */
import styles from 'public/scss/components/Announcements.module.scss'

type iProps = {
  i18n?: any,
  children?: ReactNode
}

const Announcements: FC<iProps> = ({
  i18n,
  children
}) => {

  const router = useRouter();

  return (
    <>
      {router.pathname === '/[lng]' &&
        <div className={styles.announcements}>
          <Widget
            pos="header-announcements"
            widgetClassName={styles.announcements_item}
            thumborSetting={{
              width: 512,
              format: "webp",
              quality: 85,
            }}
            loadingComponent={
              <div className={styles.headerAnnouncements_item}>
                <p>{i18n.t("global.loading")}</p>
              </div>
            }
          />
          {children}
        </div>
      }
    </>
  )
}

export default Announcements
