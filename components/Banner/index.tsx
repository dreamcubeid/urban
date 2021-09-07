/* library package */
import {
  FC,
  useState,
  useEffect
} from 'react'
import { Banner } from '@sirclo/nexus'
import Carousel from '@brainhubeu/react-carousel'

/* component */
import Placeholder from 'components/Placeholder'
import styleBanner from 'public/scss/components/Banner.module.scss'

const classesBanner = {
  imageContainerClassName: styleBanner.bannerCarousel_header,
  linkClassName: styleBanner.bannerCarousel_link,
  imageClassName: styleBanner.bannerCarousel_image
}

const placeholder = {
  placeholderImage: styleBanner.bannerCarousel_placeholder,
}

const BannerComponent: FC<any> = ({ dataBanners }) => {
  const [isReady, setIsReady] = useState<boolean>(false)

  useEffect(() => {
    if (!isReady) setIsReady(true)
  }, [isReady])

  return (
    <Banner
      Carousel={Carousel}
      autoPlay={isReady ? 5000 : null}
      data={dataBanners?.data}
      infinite
      classes={classesBanner}
      thumborSetting={{
        width: 600,
        format: 'webp',
        quality: 85
      }}
      loadingComponent={
        <Placeholder classes={placeholder} withImage />
      }
    />
  )
}
export default BannerComponent
