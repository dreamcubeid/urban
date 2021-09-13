/* Library Package */
import { FC } from 'react'
import { toast } from 'react-toastify'
import {
  useI18n,
  isCopyrightAllowed,
  Widget,
  NewsletterForm
} from "@sirclo/nexus";

import { FaArrowRight } from 'react-icons/fa'

/* Library Template */
import useWindowSize from 'lib/useWindowSize'

/* Component */
import FooterWidget from './FooterWidget'

/* Styles */
import styles from 'public/scss/components/Footer.module.scss'

const classesNewsletter = {
  containerClassName: styles.footerNewsletter,
  labelClassName: styles.footerNewsletter_label,
  inputClassName: styles.footerNewsletter_input,
  buttonClassName: styles.footerNewsletter_button
}

const Footer: FC<any> = ({ 
  brand 
}) => {

  const i18n: any = useI18n()
  const size: any = useWindowSize()
  const allowedCopyright = isCopyrightAllowed()

  return (
    <footer className={`${styles.footer}`}>

      <div className="container-fluid">
        <div className={`${styles.footer_top} row`}>
          <div className="col-12 col-md-3">
            <div className={styles.footerItem}>
              <FooterWidget collapsible={false}>
                <Widget
                  pos="footer-1"
                  widgetClassName={`${styles.footerItem_content}`}
                  loadingComponent={
                    <p className={styles.footer_loading}>
                      {i18n.t("global.loading")}
                    </p>
                  }
                  thumborSetting={{
                    width: size.width < 992 ? 270 : 480,
                    format: "webp",
                    quality: 85
                  }}
                />
              </FooterWidget>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className={styles.footerItem}>
              <FooterWidget>
                <Widget
                  pos="footer-2"
                  widgetClassName={styles.footerItem_content}
                  loadingComponent={
                    <p className={styles.footer_loading}>
                      {i18n.t("global.loading")}
                    </p>
                  }
                  thumborSetting={{
                    width: size.width < 992 ? 270 : 480,
                    format: "webp",
                    quality: 85
                  }}
                />
              </FooterWidget>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className={styles.footerItem}>
              <FooterWidget>
                <Widget
                  pos="footer-3"
                  widgetClassName={styles.footerItem_content}
                  loadingComponent={
                    <p className={styles.footer_loading}>
                      {i18n.t("global.loading")}
                    </p>
                  }
                  thumborSetting={{
                    width: size.width < 992 ? 270 : 480,
                    format: "webp",
                    quality: 85
                  }}
                />
              </FooterWidget>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className={styles.footerItem}>
              <FooterWidget title={i18n.t("newsletter.title")} collapsible={false}>
                <NewsletterForm
                  classes={classesNewsletter}
                  onComplete={() => toast.success(i18n.t("newsletter.submitSuccess"))}
                  onError={() => toast.error(i18n.t("newsletter.submitError"))}
                  buttonComponent={
                    <FaArrowRight />
                  }
                />
              </FooterWidget>
            </div>
          </div>
        </div>
        <div className={`${styles.footer_bottom} row`}>
          <div className="col-12">
            <div className={styles.footer_copyright}>
              {allowedCopyright ?
                <>
                  {brand?.settings?.websiteTitle || ""}
                  {(brand?.settings?.websiteTitle && allowedCopyright) && ` - `}
                  POWERED BY&nbsp;<a href="https://store.sirclo.com" target="_blank">SIRCLO</a>
                </>
                : 
                <Widget 
                  pos="copyright-and-policy" 
                  thumborSetting={{
                    width: 1,
                    format: 'webp',
                    quality: 5,
                  }}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </footer>
  )

  /*
  return (
    <>
      <div className={styles.widgetFooter}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8 offset-lg-2">
              <Widget
                pos="footer-1"
                containerClassName="row"
                widgetClassName="col-12 col-lg-4"
                loadingComponent={
                  <div className="row">
                    <div className="col-12">
                      <Placeholder
                        classes={classesPlaceholderWidget}
                        withList
                        listMany={4}
                      />
                    </div>
                  </div>
                }
                thumborSetting={{
                  width: size.width < 768 ? 576 : 1200,
                  format: "webp",
                  quality: 85
                }}
              />
              <hr className={styles.footer_line} />
              <SocialMediaIcons
                socialMediaIcons={socialMediaIcons}
                classes={classesMediaSocial}
              />
            </div>
          </div>
        </div>
      </div>
      <footer className={styles.footer}>
        <div className={`container ${styles.footer_bottom} uppercase`}>
          {allowedCopyright ?
            <>
              {brand?.settings?.websiteTitle || ""}
              {(brand?.settings?.websiteTitle && allowedCopyright) && ` - `}
              POWERED BY&nbsp;<a href="https://store.sirclo.com" target="_blank">SIRCLO</a>
            </>
            : 
            <Widget 
              pos="copyright-and-policy" 
              thumborSetting={{
                width: 1,
                format: 'webp',
                quality: 5,
              }}
            />
          }
        </div>
      </footer>
    </>
  )
  */
}

export default Footer