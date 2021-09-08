/* library package */
import { FC } from 'react'
import { Widget } from '@sirclo/nexus'
/* component */
import Placeholder from '../Placeholder'
import styles from 'public/scss/components/MainAdvertisement.module.scss'

const placeholder = {
  placeholderImage: styles.mainAdvertisement_placeholder,
}

const MainAdvertisement: FC = () => {
  return (
    <div className={styles.mainAdvertisement}>
      <Widget
        pos="main-content-1"
        containerClassName={styles.mainAdvertisement_container}
        widgetClassName={styles.mainAdvertisement_item}
        loadingComponent={<Placeholder classes={placeholder} withImage />}
        thumborSetting={{
          format: "webp",
          quality: 85,
        }}
      />
    </div>
  )
}

export default MainAdvertisement
