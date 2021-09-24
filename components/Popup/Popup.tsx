import { useRef, FC } from 'react'
import styles from 'public/scss/components/Popup.module.scss'
import useOutsideClick from 'lib/useOutsideClick'

export type PopupPropsType = {
  withHeader?: boolean,
  setPopup?: any,
  popupTitle?: string
  mobileFull?: boolean,
  classPopopBody?: boolean
}

const Popup: FC<PopupPropsType> = ({
  setPopup,
  mobileFull = true,
  children
}) => {

  const cartOuterDiv = useRef<HTMLDivElement>(null);

  useOutsideClick(cartOuterDiv, () => setPopup(false));

  return (
    <div className={styles.popup_overlay}>
      <div ref={cartOuterDiv} className={mobileFull ? styles.popup_containerFull : styles.popup_container}>
        {children}
      </div>
    </div>
  )
}

export default Popup;