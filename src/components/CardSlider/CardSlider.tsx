import { gsap } from "gsap"
import { ICard } from "models"
import React, { FC, useContext, useEffect, useRef, useState } from "react"
import { Pagination } from "swiper/modules"
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react"
import "swiper/scss"
import "swiper/scss/pagination"
import { FullReelContext } from "../../context/FullReelContext"
import { ButtonArrow } from "../ButtonArrow/ButtonArrow"
import { Card } from "../Card/Card"
import { Switch } from "../Switch/Switch"
import { Title } from "../Title/Title"
import "./cardSlider.scss"

export const CardSlider: FC = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const lineRef = useRef<HTMLDivElement | null>(null)
  const swiperRef = useRef<SwiperClass | null>(null)
  const initialRender = useRef<boolean>(true)
  const { activePoint, animDuration, slideGap, isMobile, pointCount } =
    useContext(FullReelContext)

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }

    if (cardRef.current) {
      gsap.killTweensOf(cardRef.current)
      gsap.fromTo(
        cardRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: animDuration }
      )
    }

    if (lineRef.current) {
      gsap.killTweensOf(lineRef.current)
      gsap.fromTo(
        lineRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: animDuration }
      )
    }
  }, [activePoint, animDuration])

  const getCardsCount = (elCount: number): number => {
    if (elCount === 1) return 1
    if (elCount === 2) return 2
    if (isMobile) return 1.6
    return 3
  }
  const visibleSlidesCount: number = getCardsCount(activePoint.cards.length)

  const isSlideLast: boolean =
    activeSlide !== (swiperRef.current?.slides.length || 0) - visibleSlidesCount

  const handleSlideChange = (swiper: SwiperClass): void => {
    setActiveSlide(swiper.activeIndex)
  }

  return (
    <div className="component-cardSlider">
      {isMobile && (
        <>
          <Title title={activePoint.title} />

          <div ref={lineRef} className="line-hor"></div>
        </>
      )}

      {activeSlide !== 0 && activePoint.cards.length > 3 && !isMobile && (
        <ButtonArrow
          onClick={() => {
            swiperRef?.current?.slidePrev()
          }}
          arrowWidth={8}
          arrowHeight={12}
          direction="left"
          bgColor="#fff"
          arrowColor="#554aef"
          canDisappear
        />
      )}

      <Swiper
        modules={[Pagination]}
        spaceBetween={slideGap}
        slidesPerView={visibleSlidesCount}
        pagination={{ clickable: true }}
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {activePoint.cards.map((card: ICard) => (
          <SwiperSlide key={card.cardId}>
            <div ref={cardRef}>
              <Card title={card.title} desc={card.description} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {isMobile && <Switch elCount={pointCount} />}

      {isSlideLast && activePoint.cards.length > 3 && !isMobile && (
        <ButtonArrow
          onClick={() => {
            swiperRef?.current?.slideNext()
          }}
          arrowWidth={8}
          arrowHeight={12}
          bgColor="#fff"
          arrowColor="#554aef"
          canDisappear
        />
      )}
    </div>
  )
}
