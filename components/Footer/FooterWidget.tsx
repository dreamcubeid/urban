/* Library Package */
import { 
  FC, 
  useState, 
  useEffect 
} from 'react'
import { FiPlus } from 'react-icons/fi'

/* Styles */
import styles from 'public/scss/components/FooterWidget.module.scss'

type TFooterWidget = {
  title?: string,
  collapsible?: boolean,
  [otherProp: string]: any
}

const FooterWidget:FC<TFooterWidget> = ({
  title = '',
  collapsible = true,
  ...props
}) => {

  const [widgetState, setWidgetState] = useState<boolean>(false)

  useEffect(() => {
    const collapsibles = document.querySelectorAll('[class*="collapsible"]')
    collapsibles.forEach((element) => {
      let target = element.querySelectorAll('[class*="footer_widget"]:empty')
      if(target.length > 0) element.classList.add('d-none')
    })
  })

  return (
      <div className={`${styles.footerWidget} ${styles.footerWidget__collapsible} ${!collapsible ? styles.footerWidget__static : ''} ${widgetState ? styles.footerWidget__collapsed : ''}`}>
        <div className={styles.footerWidget_header}>
          {title && 
            <h3 className={styles.footerWidget_title}>
              {title}
            </h3>
          }
          <span className={styles.footerWidget_toggle} onClick={() => setWidgetState(!widgetState)}>
            <FiPlus />
          </span>
        </div>
        <div className={styles.footerWidget_body}>
          {props.children}
        </div>
      </div>
  )
}

export default FooterWidget