/* Library Packages */
import { FC } from 'react'
import Link from 'next/link'

/* Styles */
import styles from 'public/scss/components/Breadcrumbs.module.scss'

type BreadcrumbPropType = {
  title?: string
  lng?: string
  links?: any
  fluidContainer?: boolean
  currentStep?: any
}

const Breadcrumb: FC<BreadcrumbPropType> = ({
  title,
  links,
  lng,
  fluidContainer = false
}) => {

  const redirectLinks = [
    "Home",
    "Beranda",
    "Blog",
    "Lookbook",
    "Keranjang",
    "Shopping Cart"
  ];

  const directUrl = {
    "Home": '/',
    "Beranda": '/',
    "Keranjang": `/cart`,
    "Shopping Cart": `/cart`,
    "Blog": `/blog`,
    "Lookbook": `/lookbook/categories`
  };

  return (
    <section className={styles.breadcrumb_container}>
      <div className={`${fluidContainer ? 'container-fluid' : 'container'}`}>
        <ol className={`breadcrumb ${styles.breadcrumb}`}>
          {
            links.map((link: string, i: number) => {
              if (redirectLinks.includes(link)) {
                return (
                  <li className={`breadcrumb-item ${styles.breadcrumb_item}`} key={i}>
                    <Link
                      href={`/[lng]${directUrl[link]}`}
                      as={`/${lng}${directUrl[link]}` || `/${lng}`}
                    >
                      <a>{link}</a>
                    </Link>
                  </li>
                )
              }

              return (
                <li className={`breadcrumb-item ${styles.breadcrumb_item}`} key={i}>
                  <span>{link}</span>
                </li>
              )
            })
          }
        </ol>
        <h1>{title}</h1>
      </div>
    </section>
  )
}

export default Breadcrumb;