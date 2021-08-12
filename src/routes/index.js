import React, { Suspense, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Loading from 'components/Loading';

const Home = React.lazy(() => import('pages/Home'));
const SignUp = React.lazy(() => import('pages/SignUp'));
// const RegisterSuccess = React.lazy(() => import('pages/Signup/RegisterSuccess'));
const SignIn = React.lazy(() => import('pages/SignIn'));

export default function Routes({ language, country }) {
	return (
		<Suspense fallback={<Loading />}>
			<Switch>
				<Redirect exact from="/" to={`/${country}`} />
				<Route path={`/:country/login`} component={SignIn} />
				<Route exact path="/:country/register" component={SignUp} />
				<Route exact path={`/:country`} render={() => <Home language={language} />} />
			</Switch>
		</Suspense>
	);
}
