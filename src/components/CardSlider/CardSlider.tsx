import { ICard } from "models"
import React, { FC, useEffect, useRef, useState } from "react"
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react"
import "swiper/scss"
import { ButtonArrow } from "../ButtonArrow/ButtonArrow"
import { Card } from "../Card/Card"
import { ICardSlider } from "./interface"
import "./cardSlider.scss"
import { gsap } from "gsap"

export const CardSlider: FC<ICardSlider> = ({ activeEl }) => {
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const cardSliderRef = useRef<any>(null)
  const swiperRef = useRef<SwiperClass | null>(null)

  useEffect(() => {
    gsap.to(cardSliderRef.current, { duration: 1, opacity: 1 })
  }, [])

  const getCardsCount = (): number => {
    const cardCount = activeEl.cards.length

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
      {activeSlide !== 0 && activeEl.cards.length > 3 && (
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
        slidesPerView={visibleSlidesCount}
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {activeEl.cards.map((card: ICard) => (
          <SwiperSlide key={card.cardId}>
            <Card title={card.title} desc={card.description} />
          </SwiperSlide>
        ))}
      </Swiper>

      {isSlideLast && activeEl.cards.length > 3 && (
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
