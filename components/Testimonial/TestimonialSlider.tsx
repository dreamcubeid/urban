import { FC, useState } from 'react'
import { Testimonials } from '@sirclo/nexus'
import Carousel from '@brainhubeu/react-carousel'
import styleIcon from 'public/scss/components/Icons.module.scss'

const classesTestimonials = {
  containerClassName: "",
  cardClassName: "",
  imgClassName: "",
  mainClassName: "",
  contentClassName: "",
  userClassName: "",
  dateClassName: "",
  detailContainerClassName: ""
}

const classesEmptyComponent = {
  emptyContainer: "",
  emptyTitle: "",
  emptyDesc: "",
}


const classesPlaceholderReview = {
  placeholderTitle: "",
  placeholderList: "",
}

type iProps = {
  i18n: any
}

const TestimonialSlider: FC<iProps> = ({
  i18n
}) => {
  const [pageInfo, setPageInfo] = useState({
    totalItems: null,
  })

  if (pageInfo.totalItems === 0) return <></>

  return (
    <Testimonials
      Carousel={Carousel}
      classes={classesTestimonials}
      arrowLeft={<div className={styleIcon.minimalicon_chevronRight}></div>}
      arrowRight={<div className={styleIcon.minimalicon_chevronRight}></div>}
      getPageInfo={(pageInfo: any) => setPageInfo(pageInfo)}
      autoPlay={4500}
      addArrowClickHandler={true}
      infinite
      dragable
      withImage
      // emptyPlaceholder={<EmptyPlaceholder i18n={i18n} />}
      // loadingComponent={<SkeletonTestimonial />}
      filter={{
        published: true,
        isFeatured: true
      }}
    />
  )
}



export default TestimonialSlider
