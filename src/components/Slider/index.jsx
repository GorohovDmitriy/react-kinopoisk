import React from 'react'
import './Slider.scss'

import leftArrow from '../../assets/img/left-slider.svg'

const Slider = ({slides}) => {
	const [current, setCurrent] = React.useState(0)
	const length = slides.length

	const nextSlider = () => {
		setCurrent(current === length - 1 ? 0 : current + 1)
	}

	const prevSlider = () => {
		setCurrent(current === 0 ? current - 1 : current - 1)
	}

	if (!Array.isArray(slides) || slides.length <= 0) {
		return null
	}

	return (
		<div className='slider'>
			<h5>Popular on Кинопоиск</h5>
			<img
				onClick={prevSlider}
				src={leftArrow}
				className='left__arrow'
				alt='Left'
				width={30}
				height={30}
			/>
			<img
				onClick={nextSlider}
				src={leftArrow}
				className='right__arrow'
				alt='Left'
				width={30}
				height={30}
			/>
			{slides.map((slide, index) => {
				return (
					<div className={index === slide ? 'slide active' : 'slide'} key={`${index}__${slide}`}>
						{index === current && <img src={slide.posterUrl} alt='Slider' className='image' />}
					</div>
				)
			})}
		</div>
	)
}

export default Slider
