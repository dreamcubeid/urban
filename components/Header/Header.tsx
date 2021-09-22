/* Library Package */
import { FC, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import {
  RiShoppingBag2Line,
  RiUser3Line,
  RiSearchLine,
  RiMenu3Fill,
  RiAddFill,
  RiSubtractFill,
  RiCloseFill
} from 'react-icons/ri'
import {
  Logo,
  useI18n,
  useCart
} from '@sirclo/nexus'

/* Library Template */
import useWindowSize from 'lib/useWindowSize'

/* Components */
import Announcement from './Announcement'
import SocialMedia from './SocialMedia'
import Placeholder from 'components/Placeholder'
import Search from './Search'

/* Styles */
import styles from 'public/scss/components/Header.module.scss'
import styleSearch from 'public/scss/components/Search.module.scss'

const CollapsibleNav = dynamic(() => import("@sirclo/nexus").then((mod) => mod.CollapsibleNav))
const PrivateComponent = dynamic(() => import("@sirclo/nexus").then((mod) => mod.PrivateComponent))

const classesPlaceholderLogo = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_header__logo}`
}

const classesPlaceholderCollapsibleNav = {
  placeholderImage: styles.placeholder,
  placeholderList: styles.placeholderList,
}

const classesCollapsibleNav = {
  parentNavClassName: styles.navigation_parent,
  navItemClassName: styles.navigation_item,
  selectedNavClassName: styles.menu_itemSelected,
  navValueClassName: styles.navigation_value,
  navValueActiveClassName: styles.navigation_value,
  navValueContainerClassName: styles.navigation_valueContainer,
  dropdownIconClassName: styles.navigation_dropdownIcon,
  childNavClassName: styles.menu_sub,
  subChildNavClassName: styles.menu_sub
};

type THeader = {
  lng: string,
  mobileState: boolean,
  setMobileState: any
}

const Header: FC<THeader> = ({
  lng,
  mobileState = false,
  setMobileState
}) => {

  const i18n: any = useI18n()
  const size: any = useWindowSize()
  const [showSearch, setShowSearch] = useState(false)
  const { data: dataCart } = useCart()

  const handleMobileToggle = () => setMobileState(!mobileState)
  const handleOnSearch = () => {
    setShowSearch(!showSearch)
    setMobileState(false)
  }
  const searchClasses = {
    searchContainer: styleSearch.searchContainer,
    searchInputContainer: styleSearch.searchInputContainer,
    searchInput: styleSearch.searchInput,
    searchClear: styleSearch.searchClear,
    searchButton: styleSearch.searchButton,
    searchForm: styleSearch.searchForm,
    title: styleSearch.title,
    iconClose: styleSearch.iconClose,
    animateShow: styleSearch.animateShow,
    animateHide: styleSearch.animateHide,
  }

  return (
    <>
      <Announcement positionState={mobileState} />

      <div className={`${styles.container} ${mobileState ? styles.container__open : ''}`}>

        <div className={`${styles.item} ${styles.brand}`}>
          <LazyLoadComponent
            placeholder={
              <Placeholder classes={classesPlaceholderLogo} withImage={true} />
            }
          >
            <Logo
              imageClassName={styles.brand_image}
              thumborSetting={{
                width: size.width < 575 ? 200 : 400,
                quality: 90
              }}
              lazyLoadedImage={false}
            />
          </LazyLoadComponent>
        </div>

        <div className={`${styles.item} ${styles.mobile_menu}`}>
          <Link href="/[lng]/cart" as={`/${lng}/cart`}>
            <div className={`${styles.mobile_cart}`}>
              <RiShoppingBag2Line />
              <span>
                {dataCart?.totalItem}
              </span>
            </div>
          </Link>
          <button
            type="button"
            className={`${styles.mobile_toggle} ${mobileState ? styles.mobile_toggle__active : ''}`}
            onClick={handleMobileToggle}>
            <span>
              <RiMenu3Fill />
            </span>
            <span>
              <RiCloseFill />
            </span>
          </button>
        </div>

        <div className={`${styles.item} ${styles.shortcuts}`}>
          <Link href="/[lng]/cart" as={`/${lng}/cart`}>
            <div className={`${styles.shortcuts_item} ${styles.shortcuts_item__cart}`}>
              <RiShoppingBag2Line />
              <span className={styles.shortcuts_label}>
                {i18n.t("header.cart")}
              </span>
              <span className={styles.shortcuts_badge}>
                {dataCart?.totalItem}
              </span>
            </div>
          </Link>

          <PrivateComponent
            Auth={
              <Link href="/[lng]/account" as={`/${lng}/account`}>
                <div className={styles.shortcuts_item}>
                  <RiUser3Line />
                  <span className={styles.shortcuts_label}>
                    {i18n.t("header.account")}
                  </span>
                </div>
              </Link>
            }
            NoAuth={
              <Link href="/[lng]/login" as={`/${lng}/login`}>
                <div className={styles.shortcuts_item}>
                  <RiUser3Line />
                  <span className={styles.shortcuts_label}>
                    {i18n.t("header.account")}
                  </span>
                </div>
              </Link>
            }
          />
          <div className={styles.shortcuts_item} onClick={handleOnSearch}>
            <RiSearchLine />
            <span className={styles.shortcuts_label}>
              {i18n.t("header.search")}
            </span>
          </div>
        </div>

        <div className={`${styles.item} ${styles.navigation}`}>
          <CollapsibleNav
            dropdownIcon={<RiAddFill />}
            dropdownOpenIcon={<RiSubtractFill />}
            classes={classesCollapsibleNav}
            loadingComponent={
              [0, 1, 2].map((_, i) => (
                <Placeholder key={i} classes={classesPlaceholderCollapsibleNav} withList />
              ))
            }
          />
        </div>

        <div className={styles.item}>
          <SocialMedia />
        </div>

      </div>
      <Search
        lng={lng}
        classes={searchClasses}
        showSearch={showSearch}
        handleOnSearch={handleOnSearch}
      />
    </>
  )
}

export default Header