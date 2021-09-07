/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useI18n } from '@sirclo/nexus'
/* library template */
import { useBrand } from 'lib/useBrand'
/* components */
import Layout from 'components/Layout/Layout'
import ProductCategoryComponent from 'components/ProductCategoryComponent/ProductCategoryComponent'
/* locales */
import locales from 'locales'

const CategoriesPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const i18n: any = useI18n()

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      titleHeader={i18n.t("product.categories")}
    >
      <section>
        <ProductCategoryComponent
          i18n={i18n}
          lng={lng}
        />
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {

  const lngDict = locales(params.lng) || {}

  const brand = await useBrand(req);

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ''
    }
  }
}

export default CategoriesPage
