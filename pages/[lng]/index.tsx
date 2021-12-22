/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { useI18n } from '@sirclo/nexus'
/* library template */
import { parseCookies } from 'lib/parseCookies'
import { useBrand, handleGetBanner } from 'lib/client'
/* locale */
import locale from "locales";
/* component */
import Layout from 'components/Layout/Layout'
import Banner from 'components/Banner'
import MainAdvertisement from 'components/Widget/MainAdvertisement'
import SecondAdvertisement from 'components/Widget/SecondAdvertisement'
import ProductsComponent from 'components/Products/ProductsComponent'
import ProductCategoryComponent from 'components/ProductCategoryComponent/ProductCategoryComponent'
import Instafeed from 'components/Instafeed'
import TestimonialSlider from 'components/Testimonial/TestimonialSlider'

const Home: FC<any> = ({
  lng,
  lngDict,
  dataBanners,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const layoutProps = { 
    lngDict, 
    i18n, 
    lng, 
    brand,  
    SEO: {
      title: i18n.t("home.title")
    }
  }

  return (
    <Layout {...layoutProps}>
      <div className="container-fluid p-0">
        <Banner
          i18n={i18n}
          dataBanners={dataBanners}
        />
      </div>

      <div id="featuredProduct">
        <LazyLoadComponent>
          <ProductsComponent
            i18n={i18n}
            lng={lng}
            type='grid'
            tagname='featured'
            withTitle={{
              type: 'left',
              title: i18n.t('home.featuredProducts'),
              withSeeAll: true
            }}
          />
        </LazyLoadComponent>
      </div>

      <section className="container">
        <LazyLoadComponent>
          <MainAdvertisement />
        </LazyLoadComponent>
      </section>

      <LazyLoadComponent>
        <ProductsComponent
          i18n={i18n}
          lng={lng}
          type='grid'
          tagname='new-arrivals'
          withTitle={{
            type: 'left',
            title: i18n.t('home.arrivalsProducts'),
            withSeeAll: true
          }}
        />
      </LazyLoadComponent>

      <section className="container">
        <LazyLoadComponent>
          <SecondAdvertisement />
        </LazyLoadComponent>
      </section>

      <section className="container">
        <ProductCategoryComponent
          i18n={i18n}
          displayMode='normal'
          withTitle
          lng={lng}
          withSeeAll
        />
      </section>

      <section className="container">
        <TestimonialSlider />
      </section>

      {brand?.socmedSetting?.instagramToken &&
        <section className="container">
          <LazyLoadComponent>
            <Instafeed
              i18n={i18n}
              brand={brand}
              withFollowButton
            />
          </LazyLoadComponent>
        </section>
      }

    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params
}: any) => {

  const allowedUri: Array<string> = ['en', 'id', 'graphql', 'favicon.ico'];

  if (allowedUri.indexOf(params.lng.toString()) == -1) {
    const cookies = parseCookies(req)

    res.writeHead(307, {
      Location: cookies.ACTIVE_LNG ? '/' + cookies.ACTIVE_LNG + '/' + params.lng : '/id/' + params.lng
    })

    res.end()
  }

  const lngDict = locale(params.lng)
  const brand = await useBrand(req);
  const dataBanners = await handleGetBanner(req);

  return {
    props: {
      lng: params.lng,
      lngDict,
      dataBanners,
      brand: brand || ''
    }
  }
}

export default Home
