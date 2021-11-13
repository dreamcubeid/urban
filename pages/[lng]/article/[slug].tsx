/* Library Packages */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import {
	Article,
	ArticleCategories,
	useI18n
} from '@sirclo/nexus'

/* Library Template */
import { useBrand } from 'lib/useBrand'

/* Components */
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import Placeholder from 'components/Placeholder'

/* Locales */
import locale from "locales";

/* Styles */
import styles from 'public/scss/pages/Article.module.scss'

const classesPlaceholderArticle = {
	placeholderImage: styles.article_placeholder,
}

const classesArticleCategories = {
	articleCategoriesContainerClass: styles.sidebar_item,
	categoryTitleClass: styles.sidebar_title,
	articleCategoriesUlClass: styles.category,
	articleCategoriesLiClass: styles.category_item,
}

const ArticleDetail: FC<any> = ({
	lng,
	lngDict,
	slug,
	brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

	const i18n: any = useI18n()
	const [title, setTitle] = useState<string>("")
  const linksBreadcrumb = [i18n.t("header.home"), title]

	return (
		<Layout
			i18n={i18n}
			lng={lng}
			lngDict={lngDict}
			brand={brand}
		>

      <Breadcrumb 
        lng={lng}
        title={title} 
        links={linksBreadcrumb} 
      />

      <div className={styles.wrapper}>

        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 col-lg-8">

              <div className={styles.single}>
                <Article
                  containerClassName={styles.article}
                  slug={slug as string}
                  getTitle={setTitle}
                  loadingComponent={
                    <Placeholder 
                      classes={classesPlaceholderArticle}
                      withImage 
                    />
                  }
                  errorComponent={
                    <p>{i18n.t("global.error")}</p>
                  }
                />
              </div>

            </div>
            <div className={`col-12 col-md-4 offset-lg-1 col-lg-3 ${styles.sidebar}`}>
              <ArticleCategories
                classes={classesArticleCategories}
              />
            </div>

          </div>
        </div>
      </div>
		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
	const lngDict = locale(params.lng)
	const brand = await useBrand(req)

	return {
		props: {
			lng: params.lng,
			lngDict,
			slug: params.slug,
			brand: brand || ''
		}
	}
}

export default ArticleDetail