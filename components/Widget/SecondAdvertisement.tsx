/* library package */
import { FC } from 'react'
import { Widget } from '@sirclo/nexus'
/* component */
import Placeholder from '../Placeholder'
import styles from 'public/scss/components/SecondAdvertisement.module.scss'

const placeholder = {
  placeholderImage: styles.secondAdvertisement_placeholder,
}

const SecondAdvertisement: FC = () => {
  return (
    <div className={styles.SecondAdvertisement}>
      <Widget
        pos="main-content-1"
        containerClassName={styles.SecondAdvertisement_container}
        widgetClassName={styles.SecondAdvertisement_item}
        loadingComponent={<Placeholder classes={placeholder} withImage />}
        thumborSetting={{
          width: 512,
          format: "webp",
          quality: 85,
        }}
      />
    </div>
  )
}

export default SecondAdvertisement
