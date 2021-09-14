/* library package */
import { FC } from 'react'
import { Widget } from '@sirclo/nexus'
/* component library */
import useWindowSize from 'lib/useWindowSize'
/* component */
import Placeholder from '../Placeholder'
import styles from 'public/scss/components/SecondAdvertisement.module.scss'

const placeholder = {
  placeholderImage: styles.secondAdvertisement_placeholder,
}

const SecondAdvertisement: FC = () => {
  const size = useWindowSize();

  return (
    <div className={styles.SecondAdvertisement}>
      <Widget
        pos="main-content-2"
        containerClassName={styles.SecondAdvertisement_container}
        widgetClassName={styles.SecondAdvertisement_item}
        loadingComponent={<Placeholder classes={placeholder} withImage />}
        thumborSetting={{
          width: size.width < 575 ? 1000 : 400,
          format: "webp",
          quality: 85,
        }}
      />
    </div>
  )
}

export default SecondAdvertisement