import React from 'react'
import Content from './components/Content'
import Description from './components/Description'
import Header from './components/Header'

const App = () => {
	return <div className='wrapper'>
		<Header />
		<Description />
		<Content />
	</div>
}

export default App
