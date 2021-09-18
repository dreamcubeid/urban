/* Library Package */
import {
  FC,
  useEffect,
  useState
} from 'react'

import { withBrand } from '@sirclo/nexus'
import { ToastContainer } from 'react-toastify'

/* Component */
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import PageNotFound from 'components/PageNotFound'
import SEOHead from 'components/SEO'
import Newsletter from '../Newsletters';

/* Styles */
import styles from 'public/scss/components/Layout.module.scss'

type LayoutPropType = {
  lngDict: any
  i18n: any
  lng: string
  layoutClassName?: string
  withHeader?: boolean
  withFooter?: boolean
  withAllowed?: boolean | undefined
  [otherProp: string]: any
};

const Layout: FC<LayoutPropType> = ({
  lng,
  lngDict,
  i18n,
  withHeader = true,
  withFooter = true,
  withAllowed = true,
  brand,
  SEO,
  layoutClassName = "Layout-layoutClassName",
  layoutClassNameMaster = "Layout-layoutClassNameMaster",
  ...props
}) => {

  const SEOprops = {
    hideFromSearchEngine: brand?.settings?.hideFromSearchEngine,
    title: SEO?.title || brand?.settings?.websiteTitle,
    description: SEO?.desc || brand?.settings?.websiteDescription,
    image: SEO?.image || brand?.logoURL,
    keywords: SEO?.keywords || ""
  }

  useEffect(() => {
    i18n?.locale(lng, lngDict);
  }, [lng, lngDict]);

  useEffect(() => {
    if (brand?.googleAdsWebsiteMetaToken) getToken()
  }, [brand])

  const getToken = (): string => {
    const googleAdsWebsiteMetaToken = brand?.googleAdsWebsiteMetaToken
    const token: string = googleAdsWebsiteMetaToken.replace(/.*content="([^"]*)".*/, "$1")
    return token
  }

  const masterLayoutClassName = `${layoutClassNameMaster}`

  const [mobileMenuToggled, setMobileMenuToggled] = useState<boolean>(false)

  useEffect(() => {
    if (mobileMenuToggled) {
      document.querySelector('body').classList.add(styles.body__noOverflow)
    } else {
      document.querySelector('body').classList.remove(styles.body__noOverflow)
    }
  }, [mobileMenuToggled])

  return (
    <>
      <SEOHead {...SEOprops}>

        {brand?.settings?.hideFromSearchEngine && (
          <meta name="robots" content="noindex, nofollow" />
        )}

        <link
          rel="shortcut icon"
          href={brand?.settings?.faviconURL}
          type="image/x-icon"
        />

      </SEOHead>

      <section className={masterLayoutClassName}>

        {withHeader &&
          <Header lng={lng} mobileState={mobileMenuToggled} setMobileState={setMobileMenuToggled} />
        }

        <main className={layoutClassName}>
          {withAllowed ?
            props.children
            :
            <PageNotFound i18n={i18n} />
          }
        </main>

        {withFooter &&
          <Footer brand={brand} />
        }

      </section>
      <ToastContainer />
      <Newsletter i18n={i18n} />
    </>
  )
}

export default withBrand(Layout)