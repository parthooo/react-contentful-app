import React from 'react'

const CarouselSlide = (props) => {
    const {id, slideBg, slideTitle, slideDescription} = props
    return (
        <div className="slideWrap" style={{ backgroundImage: `url(${slideBg})` }}>
            <div className="textWrap">
                <h2>{slideTitle}</h2>
                <p>{slideDescription}</p>
                <a href='/' className='btn'>Learn More </a>
            </div>
        </div>
    )
}

export default CarouselSlide