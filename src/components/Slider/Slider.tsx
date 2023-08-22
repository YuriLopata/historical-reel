import React, { FC, useRef, useState } from "react"
import "swiper/scss"
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react"
import { ButtonArrow } from "../ButtonArrow/ButtonArrow"
import { Card } from "../Card/Card"
import "./slider.scss"

export const Slider: FC = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const swiperRef = useRef<SwiperClass>()
  const visibleSlidesNum: number = 3

  const isSlideLast: boolean =
    activeSlide !== (swiperRef.current?.slides.length || 0) - visibleSlidesNum

  const handleSlideChange = (swiper: SwiperClass): void => {
    setActiveSlide(swiper.activeIndex)
  }

  return (
    <div className="component-slider">
      {activeSlide !== 0 && (
        <ButtonArrow
          onClick={() => {
            swiperRef?.current?.slidePrev()
          }}
          arrowWidth={8}
          arrowHeight={12}
          direction="left"
          bgColor="#fff"
          pathColor="#554aef"
        />
      )}

      <Swiper
        spaceBetween={80}
        slidesPerView={visibleSlidesNum}
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        <SwiperSlide>
          <Card
            title={"2015"}
            desc="13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"
          />
        </SwiperSlide>

        <SwiperSlide>
          <Card
            title={"2015"}
            desc="13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"
          />
        </SwiperSlide>

        <SwiperSlide>
          <Card
            title={"2015"}
            desc="13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"
          />
        </SwiperSlide>

        <SwiperSlide>
          <Card
            title={"2015"}
            desc="13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"
          />
        </SwiperSlide>

        <SwiperSlide>
          <Card
            title={"2015"}
            desc="13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"
          />
        </SwiperSlide>

        <SwiperSlide>
          <Card
            title={"2015"}
            desc="13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"
          />
        </SwiperSlide>
      </Swiper>

      {isSlideLast && (
        <ButtonArrow
          onClick={() => {
            swiperRef?.current?.slideNext()
          }}
          arrowWidth={8}
          arrowHeight={12}
          bgColor="#fff"
          pathColor="#554aef"
        />
      )}
    </div>
  )
}
