import { ICard } from "models"
import React, { FC, useContext, useEffect, useRef, useState } from "react"
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react"
import "swiper/scss"
import { ButtonArrow } from "../ButtonArrow/ButtonArrow"
import { Card } from "../Card/Card"
import { ICardSlider } from "./interface"
import "./cardSlider.scss"
import { gsap } from "gsap"
import { AppContext } from "../../context/AppContext"

export const CardSlider: FC<ICardSlider> = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const cardSliderRef = useRef<any>(null)
  const swiperRef = useRef<SwiperClass | null>(null)
  const { activePoint, animDuration } = useContext(AppContext)

  useEffect(() => {
    gsap.to(
      cardSliderRef.current,
      { opacity: 1, duration: 1, delay: 0 }
    )
  }, [])

  useEffect(() => {
    gsap.fromTo(
      cardSliderRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: animDuration }
    )
  }, [activePoint])

  const getCardsCount = (): number => {
    const cardCount = activePoint.cards.length

    if (cardCount === 1) return 1
    if (cardCount === 2) return 2
    return 3
  }
  const visibleSlidesCount = getCardsCount()

  const isSlideLast: boolean =
    activeSlide !== (swiperRef.current?.slides.length || 0) - visibleSlidesCount

  const handleSlideChange = (swiper: SwiperClass): void => {
    setActiveSlide(swiper.activeIndex)
  }

  return (
    <div ref={cardSliderRef} className="component-cardSlider">
      {activeSlide !== 0 && activePoint.cards.length > 3 && (
        <ButtonArrow
          onClick={() => {
            swiperRef?.current?.slidePrev()
          }}
          arrowWidth={8}
          arrowHeight={12}
          direction="left"
          bgColor="#fff"
          arrowColor="#554aef"
        />
      )}

      <Swiper
        spaceBetween={80}
        slidesPerView={visibleSlidesCount}
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {activePoint.cards.map((card: ICard) => (
          <SwiperSlide key={card.cardId}>
            <Card title={card.title} desc={card.description} />
          </SwiperSlide>
        ))}
      </Swiper>

      {isSlideLast && activePoint.cards.length > 3 && (
        <ButtonArrow
          onClick={() => {
            swiperRef?.current?.slideNext()
          }}
          arrowWidth={8}
          arrowHeight={12}
          bgColor="#fff"
          arrowColor="#554aef"
        />
      )}
    </div>
  )
}
