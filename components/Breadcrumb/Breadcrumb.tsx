import { FC } from 'react'
import Link from 'next/link'
import styles from 'public/scss/components/Breadcrumbs.module.scss'

const Breadcrumb: FC<any> = ({ title, links, lng }) => {

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
      <div className="container">
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
        <h2>{title}</h2>
      </div>
    </section>
  )
}

export default Breadcrumb;