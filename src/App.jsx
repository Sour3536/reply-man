import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import logo from './logo.svg';
// import { I18nProvider } from '@lingui/react';
import { BackTop } from 'antd';
import Routes from 'routes';
// import catalogID from 'locales/id/messages.js';
// import catalogEN from 'locales/en/messages.js';

// const catalogMap = { id: catalogID, en: catalogEN };
const i18n = localStorage.getItem('i18n') || 'en';
export let country = localStorage.getItem('country') || 'sg';

function App() {
	const [language, setLanguage] = React.useState(i18n);
	// const [catalogs, setCatalogs] = React.useState(catalogMap);
	return (
		<div className="main-wrapper">
			{/* <I18nProvider language={language} catalogs={catalogs}> */}
			<BrowserRouter>
				<BackTop />
				<Routes language={language} country={country} /> {/* This is the routes */}
			</BrowserRouter>
			{/* </I18nProvider> */}
		</div>
	);
}

export default App;
