import React from 'react'
import './Description.scss'

import netflix from '../../assets/img/netflix.svg'
import Slider from '../Slider'
import axios from 'axios'
import {API_KEY, API_TOP_POPULAR} from '../../API/API.js'

const Description = () => {
	const [slides, setSlides] = React.useState([])

	async function getSlides(url) {
		const {data} = await axios(url, {
			headers: {
				'Content-Type': 'aplication/json',
				'X-API-KEY': API_KEY,
			},
		})
		setSlides(data.films)
	}
	React.useEffect(() => {
		getSlides(API_TOP_POPULAR)
	}, [])

	return (
		<div className='description'>
			<div className='description__logo'>
				<img src={netflix} alt='Netflix' width={200} height={50} />
			</div>
			<h1>Lucifer</h1>
			<Slider slides={slides} />
		</div>
	)
}

export default Description
