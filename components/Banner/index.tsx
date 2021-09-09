/* library package */
import {
  FC,
  useState,
  useEffect
} from 'react'
import { Banner } from '@sirclo/nexus'
import Carousel from '@brainhubeu/react-carousel'
/* component library */
import useWindowSize from 'lib/useWindowSize'
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

const BannerComponent: FC<any> = ({ i18n, dataBanners }) => {
  const size = useWindowSize();
  const [isReady, setIsReady] = useState<boolean>(false)

  useEffect(() => {
    if (!isReady) setIsReady(true)
  }, [isReady])

  return (
    <div className={styleBanner.container}>
      <Banner
        Carousel={Carousel}
        autoPlay={isReady ? 5000 : null}
        data={dataBanners?.data}
        infinite
        classes={classesBanner}
        thumborSetting={{
          width: size.width < 575 ? 1048 : 600,
          format: 'webp',
          quality: 95
        }}
        loadingComponent={
          <Placeholder classes={placeholder} withImage />
        }
      />
      <a href="#featuredProduct">
        <div className={styleBanner.seeMore}>
          <div className={styleBanner.chevronDownCircle}></div>
          {i18n.t("home.showMore")}
        </div>
      </a>
    </div>
  )
}
export default BannerComponent
