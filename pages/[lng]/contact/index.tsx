/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import {
  useI18n,
  Contact,
  isEnquiryAllowed
} from '@sirclo/nexus';
import { toast } from 'react-toastify'
/* library component */
import { useBrand } from 'lib/useBrand'
/* components */
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import Layout from 'components/Layout/Layout'
/* styles */
import styles from 'public/scss/pages/Contact.module.scss'
/* locales */
import locale from 'locales'


const classesContact = {
  containerClassName: styles.container,
  mapClassName: styles.map,
  formContainerClassName: styles.formContainer,
  titleClassName: styles.title,
  inputContainerClassName: styles.inputContainer,
  inputClassName: styles.input,
  labelClassName: styles.label,
  buttonContainerClassName: styles.buttonContainer,
  buttonClassName: styles.button,
  widgetClassName: styles.widget
}


const ContactPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const i18n: any = useI18n();
  const allowedEnquiry = isEnquiryAllowed()

  const linksBreadcrumb = [`${i18n.t("header.home")}`, i18n.t("contact.title")]

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      withAllowed={allowedEnquiry}
    >
      <LazyLoadComponent>
        <Breadcrumb title={i18n.t("contact.title")} links={linksBreadcrumb} lng={lng} />
      </LazyLoadComponent>

      <div className="container">
        <Contact
          classes={classesContact}
          isAddressDetail={false}
          onCompleted={() => toast.success(i18n.t("contact.submitSuccess"))}
          onError={() => toast.error(i18n.t("contact.submitError"))}
        />
      </div>
    </Layout>
  );
};

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

export default ContactPage;
