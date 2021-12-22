/* library package */
import { FC } from 'react'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import { useI18n } from '@sirclo/nexus'
/* library template */
import { parseCookies } from 'lib/parseCookies'
import { useBrand } from 'lib/useBrand'
/* component */
import Layout from 'components/Layout/Layout'
import ProductsComponent from 'components/Products/ProductsComponent'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'

/* styles */
import styleProducts from 'public/scss/pages/Products.module.scss'

/* locales */
import locales from 'locales'

const ProductsPage: FC<any> = ({
  lng,
  lngDict,
  brand
}) => {
  const i18n: any = useI18n()
  const linksBreadcrumb = [`${i18n.t("header.home")}`, i18n.t("product.products")]
  const layoutProps = {
    lngDict, i18n, lng, brand,
    SEO: { title: i18n.t("product.title") },
    withBack: false,
    titleSeo: i18n.t("product.title")
  }

  return (
    <Layout {...layoutProps}>
      <section className={styleProducts.products_breadcumb}>
        <Breadcrumb title={i18n.t("product.title")} links={linksBreadcrumb} lng={lng} />
      </section>

      <LazyLoadComponent>
        <ProductsComponent
          i18n={i18n}
          lng={lng}
          type="grid"
          isLastSection
          withEmptyComponent
          withInfiniteScroll
          withFilterSort
        />
      </LazyLoadComponent>
    </Layout>
  );
};
export const getServerSideProps = async ({
  req,
  res,
  params
}) => {

  const allowedUri: Array<string> = ['en', 'id', 'graphql', 'favicon.ico'];

  if (allowedUri.indexOf(params.lng.toString()) == -1) {
    const cookies = parseCookies(req);

    res.writeHead(307, {
      Location: cookies.ACTIVE_LNG ? '/' + cookies.ACTIVE_LNG + '/' + params.lng : '/id/' + params.lng
    });

    res.end();
  }

  const lngDict = locales(params.lng) || {}

  const brand = await useBrand(req);

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ""
    }
  };
}

export default ProductsPage
