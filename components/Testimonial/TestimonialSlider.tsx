import { FC, useState } from 'react'
import { Testimonials } from '@sirclo/nexus'
import Carousel from '@brainhubeu/react-carousel'
import Placeholder from 'components/Placeholder'

/* style */
import style from 'public/scss/components/TestimonialSlider.module.scss'

const classesTestimonials = {
  mainClassName: style.main,
  contentClassName: style.content,
  userClassName: style.user,
  headerContainerClassName: style.headerContainer,
  imgClassName: style.img,
  dateClassName: "d-none",
}

const classesPlaceholderReview = {
  placeholderTitle: style.placeholderTitle,
  placeholderList: style.placeholderList,
}

const TestimonialSlider: FC<any> = () => {
  const [pageInfo, setPageInfo] = useState({
    totalItems: null,
  })

  if (pageInfo.totalItems === 0) return <></>

  return (
    <div className={style.container}>
      {(pageInfo.totalItems === null || pageInfo.totalItems > 0) &&
        <Testimonials
          Carousel={Carousel}
          classes={classesTestimonials}
          arrowLeft={<div className={style.arrowLeft}></div>}
          arrowRight={<div className={style.arrowRight}></div>}
          getPageInfo={(pageInfo: any) => setPageInfo(pageInfo)}
          // autoPlay={4500}
          addArrowClickHandler={true}
          infinite
          loadingComponent={
            <div className={style.content}>
              <Placeholder classes={classesPlaceholderReview} withTitle withList />
            </div>
          }
          filter={{
            published: true,
            isFeatured: true
          }}
        />
      }
    </div>
  )
}



export default TestimonialSlider
