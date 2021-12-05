import React, { Suspense, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Loading from 'components/Loading';

const Home = React.lazy(() => import('pages/Home'));
const SignUp = React.lazy(() => import('pages/SignUp'));
// const RegisterSuccess = React.lazy(() => import('pages/Signup/RegisterSuccess'));
const SignIn = React.lazy(() => import('pages/SignIn'));

//WorkReply
const WorkReply = React.lazy(() => import('pages/WorkReply'));
const EditReply = React.lazy(() => import('pages/WorkReply/EditReply'));
const Rich = React.lazy(() => import('pages/WorkReply/richText'));

export default function Routes({ language, country }) {
	return (
		<Suspense fallback={<Loading />}>
			<Switch>
				<Redirect exact from="/" to={`/${country}/login`} />
				{/* {localStorage.getItem('SessionId') !== null && <Redirect exact from={`/${country}/login`} to={`/${country}/work-reply`} />} */}
				{/* {localStorage.getItem('SessionId') !== null && <Redirect exact from={`/${country}/register`} to={`/${country}/work-reply`} />} */}
				<Route path={`/:country/login`} component={SignIn} country={country} />
				<Route exact path="/:country/register" component={SignUp} country={country} />
				<Route exact path={`/:country`} render={() => <Home language={language} />} />

				{/* WorkReply */}
				{/* {localStorage.getItem('SessionId') === null && <Redirect exact from={`/:country/work-reply`} to={`/${country}/login`} />} */}
				{localStorage.getItem('SessionId') === null && <Redirect from={`/:country/work-reply/edit`} to={`/${country}/login`} />}
				<Route exact path={`/:country/work-reply`} render={() => <WorkReply language={language} />} />
				<Route path={`/:country/work-reply/edit/`} render={() => <EditReply language={language} />} />
				<Route path={`/:country/rich/`} render={() => <Rich language={language} />} />
			</Switch>
		</Suspense>
	);
}
