/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Links, useI18n } from '@sirclo/nexus'

/* library template */
import { useBrand } from 'lib/useBrand'

/* component */
import Layout from 'components/Layout/Layout'

/* styles */
import styles from 'public/scss/pages/Tautan.module.scss'

/* locales */
import locale from "locales";


const classesLinks = {
  containerClassName: styles.tautan,
  logoImage: styles.tautan_logo,
  titleClassName: styles.tautan_title,
  description: styles.tautan_description,
  linksSection: styles.tautan_linkSection,
  labelText: styles.tautan_labelText,
  labelImage: styles.tautan_labelImage,
}

const TautanPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      sectionClassName={styles.tautan_container}
      withHeader={false}
      withFooter={false}
    >
        <Links classes={classesLinks} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const lngDict = locale(params.lng);

  const brand = await useBrand(req);

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ""
    }
  };
}

export default TautanPage;