/* Library Packages */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import {
  isLookbookAllowed,
  LookbookSingle,
  useI18n
} from '@sirclo/nexus'

/* Library Template */
import { useBrand } from 'lib/useBrand'
import useWindowSize from 'lib/useWindowSize'

/* Components */
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import Placeholder from 'components/Placeholder'
import Icon from 'components/Icon/Icon'

/* Locales */
import locale from 'locales'

/* Styles */
import styles from 'public/scss/pages/Lookbook.module.scss'

const SocialShare = dynamic(() => import("components/SocialShare"))

const classesLookbookSingle = {
  containerClassName: styles.lookbook,
  rowClassName: styles.lookbook_row,
  imageClassName: styles.lookbookSingle_image
}

const classesPlaceholderLookbook = {
  placeholderList: `${styles.lookbook_placeholder} d-block p-0 mt-0 mb-3 mx-auto w-100`
}

const classesSocialShare = {
  socialShareParentDivClassName: styles.sharer_items,
  socialShareItemClassName: styles.sharer_item,
  socialShareLabelClassName: styles.sharer_label
}

const LookbookSinglePage: FC<any> = ({
  lng,
  lngDict,
  slug,
  brand,
  urlSite
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const i18n: any = useI18n()
  const router = useRouter()
  const size = useWindowSize()
  const LookbookAllowed = isLookbookAllowed()

  const [title, setTitle] = useState<string>("")
  const linksBreadcrumb = [
    i18n.t("header.home"), 
    i18n.t("lookbook.title"),
    title
  ]

  const handleBackButton = () => {
    router.back()
  }

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      withAllowed={LookbookAllowed}
    >

      <Breadcrumb 
        lng={lng}
        title={title} 
        links={linksBreadcrumb} 
      />

      <div className={styles.wrapper}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              
              <LookbookSingle
                classes={classesLookbookSingle}
                slug={slug}
                getTitle={setTitle}
                loadingComponent={
                  <div className={styles.lookbook_placeholderWrapper}>
                    <Placeholder
                      classes={classesPlaceholderLookbook}
                      withList
                      listMany={5}
                    />
                  </div>
                }
                emptyStateComponent={
                  <div className={styles.empty}>
                    <div className={styles.empty_icon}>
                      <Icon.article.emptyIcon />
                    </div>
                    <div className={styles.empty_labelWrapper}>
                      <p>{i18n.t("lookbook.isEmpty")}</p>
                    </div>
                  </div>
                }
                thumborSetting={{
                  width: size.width < 768 ? 400 : 600,
                  format: "webp",
                  quality: 85,
                }}
              />

              <div className={styles.sharer}>
                <SocialShare 
                  i18n={i18n} 
                  urlSite={urlSite}
                  classes={classesSocialShare}
                  customLabel={i18n.t("lookbook.share")}
                />
              </div>

              <div className={styles.lookbook_nav}>
                <button onClick={handleBackButton} className={styles.lookbook_navButton}>
                  <span>
                    <Icon.productDetail.prevIcon />
                  </span>
                  <span>
                    {i18n.t("lookbook.back")}
                  </span>
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  
  const { slug } = params
  const lngDict = locale(params.lng)
  const brand = await useBrand(req)

  const urlSite = `https://${req.headers.host}/${params.lng}/blog/${slug}`

  return {
    props: {
      lng: params.lng,
      slug: params.slug,
      lngDict,
      brand: brand || '',
      urlSite: urlSite
    }
  }
}

export default LookbookSinglePage