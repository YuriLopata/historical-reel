import { ICard } from "models"
import React, { FC, useContext, useEffect, useRef, useState } from "react"
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import "swiper/scss"
import "swiper/scss/pagination"
import { ButtonArrow } from "../ButtonArrow/ButtonArrow"
import { Card } from "../Card/Card"
import { ICardSlider } from "./interface"
import "./cardSlider.scss"
import { gsap } from "gsap"
import { AppContext } from "../../context/AppContext"
import { Switch } from "../Switch/Switch"
import { Title } from "../Title/Title"

export const CardSlider: FC<ICardSlider> = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const lineRef = useRef<HTMLDivElement | null>(null)
  const swiperRef = useRef<SwiperClass | null>(null)
  const isMounted = useRef<boolean>(false)
  const { activePoint, animDuration, slideGap, isMobile, pointCount } =
    useContext(AppContext)

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      return
    }

    if (cardRef.current && lineRef.current) {
      gsap.fromTo(
        [cardRef.current, lineRef.current],
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: animDuration }
      )
    }
  }, [activePoint, animDuration])

  const getCardsCount = (): number => {
    const cardCount = activePoint.cards.length

    if (cardCount === 1) return 1
    if (cardCount === 2) return 2
    if (isMobile) return 1.6
    return 3
  }
  const visibleSlidesCount = getCardsCount()

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
