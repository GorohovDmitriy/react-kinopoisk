import React from 'react'
import axios from 'axios'
import './Content.scss'

import search from '../../assets/img/search.svg'
import close_search from '../../assets/img/close_search.svg'

import {API_TOP_POPULAR, API_KEY, API_SEARCH} from '../../API/API'

const Content = () => {
	const [movies, setMovies] = React.useState([])
	const [showSearch, setShowSearch] = React.useState(false)
	const [value, setValue] = React.useState('')
	const [searchMovies, setSearchMovies] = React.useState([])

	React.useEffect(() => {
		async function getMovies(url) {
			const response = await axios(url, {
				headers: {
					'Content-Type': 'aplication/json',
					'X-API-KEY': API_KEY,
				},
			})
			setMovies(response.data.films)
		}
		getMovies(API_TOP_POPULAR)
	}, [])

	const getClassByRate = (number) => {
		if (number >= 7) {
			return 'green'
		} else if (number > 5) {
			return 'orange'
		} else {
			return 'red'
		}
	}

	async function getSearchMovies(url) {
		const {data} = await axios(url, {
			headers: {
				'Content-Type': 'aplication/json',
				'X-API-KEY': API_KEY,
			},
		})
		setSearchMovies(data.films)
		setValue(data.keyword)
		console.log(searchMovies)
	}
	React.useEffect(() => {
		getSearchMovies(API_SEARCH)
	}, [])

	const onShowSearch = () => {
		setShowSearch(!showSearch)
	}

	const closeSearch = () => {
		setShowSearch(false)
	}

	const keyPress = (e) => {
		if (e.key === 'Enter') {
			const api = `${API_SEARCH}${value}`
			getSearchMovies(api)
			setValue('')
		}
	}

	return (
		<React.Fragment>
			<div className='header__search'>
				{showSearch ? (
					<>
						<input
							onKeyPress={(e) => keyPress(e)}
							onChange={(e) => setValue(e.target.value)}
							value={value}
							type='text'
							placeholder='Поиск...'
						/>
						<img
							onClick={closeSearch}
							className='close__search'
							src={close_search}
							alt='close_search'
							width={10}
							height={10}
						/>
					</>
				) : (
					<img onClick={onShowSearch} src={search} alt='serach' width={20} height={20} />
				)}
			</div>
			<div className='content'>
				{searchMovies.length > 0
					? searchMovies.map((movie, index) => {
							return (
								<div key={`${index}__${movie}`} className='container'>
									<div className='poster'>
										<img src={movie.posterUrl} alt='img' width={300} height={450} />
									</div>
									<div className='name__year'>
										<h1>{movie.nameRu}</h1>
										<p>
											<b>Дата выхода:</b> {movie.year}
										</p>
										<p>
											<b>Страна:</b> {movie.countries.map((countr) => ` ${countr.country} `)}
										</p>
										<span>
											<b>Жанр :</b>
											{movie.genres.map((genre) => ` ${genre.genre} `)}
										</span>
									</div>
									<div className={`movie__average movie__average--${getClassByRate(movie.rating)}`}>
										{movie.rating}
									</div>
								</div>
							)
					  })
					: movies &&
					  movies.map((movie, index) => {
							return (
								<div key={`${index}__${movie}`} className='container'>
									<div className='poster'>
										<img src={movie.posterUrl} alt='img' width={300} height={450} />
									</div>
									<div className='name__year'>
										<h1>{movie.nameRu}</h1>
										<p>
											<b>Дата выхода:</b> {movie.year}
										</p>
										<p>
											<b>Страна:</b> {movie.countries.map((countr) => ` ${countr.country} `)}
										</p>
										<span>
											<b>Жанр :</b>
											{movie.genres.map((genre) => ` ${genre.genre} `)}
										</span>
									</div>
									<div className={`movie__average movie__average--${getClassByRate(movie.rating)}`}>
										{movie.rating}
									</div>
								</div>
							)
					  })}
			</div>
		</React.Fragment>
	)
}

export default Content
