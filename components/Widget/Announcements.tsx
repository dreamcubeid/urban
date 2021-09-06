/* library package */
import {
  FC,
  useState
} from 'react'
import { useRouter } from 'next/router'
import { Widget } from '@sirclo/nexus'
/* component */
import styles from 'public/scss/components/Announcements.module.scss'

const Announcements: FC<any> = () => {

  const router = useRouter();
  const [showAnnounce, setShowAnnounce] = useState<boolean>(true);
  const [countWidgetAnnouncement, setCountWidgetAnnouncement] = useState(null);

  return (
    <>
      {(router.pathname === '/[lng]' && showAnnounce) &&
        (countWidgetAnnouncement === null || countWidgetAnnouncement > 0) &&
        <div className={styles.announcements}>
          <Widget
            pos="header-announcements"
            getItemCount={(itemCount: number) => setCountWidgetAnnouncement(itemCount)}
            widgetClassName={styles.announcements_item}
            thumborSetting={{
              width: 512,
              format: "webp",
              quality: 85,
            }}
          />
          <span
            onClick={() => setShowAnnounce(false)}
            className={styles.announcements_closeIcon}
          />
        </div>
      }
    </>
  )
}

export default Announcements
