import React, { useState, useEffect, useCallback } from 'react';
import { client } from '../../client';
import CarouselSlide from './CarouselSlide';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// import 'swiper/core/';
// import 'swiper/components/navigation/navigation.scss'

SwiperCore.use([Navigation])


const Carousel = () => {
    const [isCarouselLoading, setIsCarouselLoading] = useState(true)
    const [carouselSlides, setCarouselSlides] = useState([])

    const cleanUpCarouselSlides = useCallback((rawData) => {
        const cleanslides = rawData.map((slide) => {
            const { sys, fields } = slide;
            const { id } = sys;
            const slideTitle = fields.title;
            const slideDescription = fields.description;
            const slideBg = fields.backgroundImage.fields.file.url;
            const updatedSlide = { id, slideTitle, slideDescription, slideBg };
            return updatedSlide;

        })
        setCarouselSlides(cleanslides)
    }, [])

    const getCarouselSlides = useCallback(async () => {
        setIsCarouselLoading(true)
        try {
            const response = await client.getEntries({ content_type: 'kitchenCarousel' })
            const responseData = response.items

            if (responseData) {
                cleanUpCarouselSlides(responseData)
            } else {
                setCarouselSlides([cleanUpCarouselSlides])
            }
            setIsCarouselLoading(false)
        } catch (error) {
            console.log(error)
            setIsCarouselLoading(false)
        }
    }, [])

    useEffect(() => {
        getCarouselSlides()
    }, [getCarouselSlides])

    // console.log('carouselSlides', carouselSlides);
    if (!Array.isArray(carouselSlides) || !carouselSlides.length ){
        return null
    }

    return (
        <div className='carousel'>
            <Swiper>
                {
                    carouselSlides.map((item) => {
                        const { id, slideBg, slideTitle, slideDescription } = item
                        return (
                            <SwiperSlide key={id}>
                                <CarouselSlide slideTitle={slideTitle} slideBg={slideBg} slideDescription={slideDescription} />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    )
}

export default Carousel