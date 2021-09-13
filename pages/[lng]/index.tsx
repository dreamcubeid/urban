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

const Home: FC<any> = ({
  lng,
  lngDict,
  dataBanners,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()

  return (
    <Layout
      lngDict={lngDict}
      i18n={i18n}
      lng={lng}
      brand={brand}
      logoHeader
      withBack={false}
    >
      <section>
        <Banner i18n={i18n} dataBanners={dataBanners} />
      </section>

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

      <section className='my-2'>
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

      <section className='my-2'>
        <LazyLoadComponent>
          <SecondAdvertisement />
        </LazyLoadComponent>
      </section>

      <section>
        <ProductCategoryComponent
          i18n={i18n}
          displayMode='reels'
        />
      </section>

      {brand?.socmedSetting?.instagramToken &&
        <section>
          {console.log(brand)}
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
  console.log("🚀 ~ file: index.tsx ~ line 129 ~ dataBanners", dataBanners)

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
