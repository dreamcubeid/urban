import {
  FC,
} from "react";
import { useI18n } from "@sirclo/nexus";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import {
  RiCloseFill,
  RiCloseCircleFill,
  RiSearchLine,
} from 'react-icons/ri'

type Inputs = {
  productName: string
}

export type SearchPropsType = {
  lng: string
  classes?: {
    searchContainer?: string
    searchInputContainer?: string
    searchInput?: string
    searchClear?: string
    searchButton?: string
    searchForm?: string
    title?: string
    iconClose?: string
    animateShow?: string
    animateHide?: string
  }
  showSearch?: boolean
  handleOnSearch?: () => void
}

const Search: FC<SearchPropsType> = ({
  lng,
  classes = {},
  showSearch,
  handleOnSearch
}) => {
  const i18n: any = useI18n()
  const router = useRouter()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>()

  const {
    searchContainer = "search-searchContainer",
    searchInputContainer = "search-searchInputContainer",
    searchInput = "search-searchInput",
    searchClear = "search-searchClear",
    searchButton = "search-searchButton",
    searchForm = "search-searchForm",
    title = "search-title",
    iconClose = "search-iconClose",
    animateShow = "search-animateShow",
    animateHide = "search-animateHide",
  } = classes

  const onSubmit: SubmitHandler<Inputs> = (data) => router.push(`/${lng}/products?q=${data.productName}`)

  const onClear = () => reset({ productName: "" })

  return (
    <div className={`
      ${searchContainer}
      ${showSearch ? animateShow : animateHide}
    `}>
      <form className={searchForm} onSubmit={handleSubmit(onSubmit)} >
        <div className={iconClose} onClick={handleOnSearch}>
          <RiCloseFill />
        </div>
        <h2 className={title}>
          {i18n.t("header.search")}
        </h2>
        <div className={searchInputContainer}>
          <div className={searchInput}>
            <input
              type="text"
              placeholder={i18n.t("header.searchPlaceholder")}
              {...register("productName", { required: true })}
            />
            {!errors.productName &&
              <div
                className={searchClear}
                onClick={onClear}>
                <RiCloseCircleFill color="#D0D0D0" />
              </div>
            }
          </div>
          <button
            type="submit"
            className={searchButton}
            disabled={!!errors.productName}
          >
            <RiSearchLine />
          </button>
        </div>
      </form>
    </div>
  )
}

export default Search;