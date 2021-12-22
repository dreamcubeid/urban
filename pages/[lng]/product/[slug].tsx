/* library package */
import { FC } from 'react'
import { LazyLoadComponent } from 'react-lazy-load-image-component'

import {
  useI18n, getProductDetail
} from '@sirclo/nexus'

/* locales */
import locale from 'locales'

/* library component */
import { useBrand } from 'lib/useBrand'

/* components */
import SEO from 'components/SEO'
import ProductDetail from 'components/ProductDetail'
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import { GRAPHQL_URI } from 'components/Constants'
import ProductRecomendation from 'components/ProductRecomendation'

const Product: FC<any> = ({
  lng,
  lngDict,
  slug,
  data,
  urlSite,
  brand
}) => {

  const i18n: any = useI18n()
  const layoutProps = {
    lngDict, i18n, lng, brand,
    SEO: {
      title: data?.details[0]?.name,
      description: data?.SEOs[0]?.description,
      keywords: data?.SEOs[0]?.keywords,
      image: data?.imageURLs[0],
    }
  }
  const linksBreadcrumb = [`${i18n.t("header.home")}`, i18n.t("product.shop"), data && data?.details[0]?.name]

  return (
    <Layout {...layoutProps}>
      {data && (
        <SEO
          title={data?.details[0]?.name || ""}
          description={data?.SEOs[0]?.description || ""}
          keywords={data?.SEOs[0]?.keywords?.join(", ") || ""}
          image={data?.imageURLs || ""}
        />
      )}

      {(data?.published || data) && (
        <LazyLoadComponent>
          <Breadcrumb
            links={linksBreadcrumb}
            lng={lng}
          />
        </LazyLoadComponent>
      )}

      <LazyLoadComponent>
        <ProductDetail
          lng={lng}
          data={data}
          i18n={i18n}
          slug={slug}
          urlSite={urlSite}
        />
      </LazyLoadComponent>

      <LazyLoadComponent>
        <ProductRecomendation
          type="upsell"
          data={data}
          slug={slug}
          title={i18n.t("product.recomendation")}
        />
      </LazyLoadComponent>
    </Layout>
  );
};

export async function getServerSideProps({ req, params }) {
  const { slug } = params;
  const data = await getProductDetail(GRAPHQL_URI(req), slug);
  const brand = await useBrand(req);

  const lngDict = locale(params.lng)

  const urlSite = `https://${req.headers.host}/${params.lng}/product/${slug}`;

  return {
    props: {
      lng: params.lng,
      slug,
      lngDict,
      data: data || null,
      brand: brand || "",
      urlSite: urlSite,
    },
  };
}

export default Product;
