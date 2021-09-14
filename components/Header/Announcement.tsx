/* Library Package */
import { FC, useState } from 'react'
import { useI18n, Widget } from '@sirclo/nexus'
import { IoClose } from 'react-icons/io5'
import { FaBell } from 'react-icons/fa'

/* Styles */
import styles from 'public/scss/components/HeaderAnnouncement.module.scss'

type TAnnouncement = {
  positionState: boolean
}

const Announcement: FC<TAnnouncement> = ({
  positionState = true
}) => {

  const i18n: any = useI18n()
  const [widgetAnnouncementShow, setWidgetAnnouncementShow] = useState<boolean>(true)
  const [widgetAnnouncementCount, setWidgetAnnouncementCount] = useState(null)

  return (
    <>
      {(widgetAnnouncementCount === null || widgetAnnouncementCount > 0) &&
        <div className={`${styles.headerAnnouncement} ${widgetAnnouncementShow ? styles.headerAnnouncement__active : ''} ${positionState ? styles.headerAnnouncement__down : ''}`}>
          <div className={styles.headerAnnouncement_icon}>
            <FaBell />
          </div>
          <Widget 
            pos="header-announcements"
            widgetClassName={styles.headerAnnouncement_content}
            loadingComponent={
              <p className={styles.headerAnnouncement_loading}>
                {i18n.t("global.loading")}
              </p>
            }
            getItemCount={(itemCount: number) => setWidgetAnnouncementCount(itemCount)}
          />
          <button type="button" className={styles.headerAnnouncement_close} onClick={() => setWidgetAnnouncementShow(false)}>
            <IoClose />
          </button>
        </div>
      }
    </>
  )
}

export default Announcement