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

export default function Routes({ language, country }) {
	return (
		<Suspense fallback={<Loading />}>
			<Switch>
				<Redirect exact from="/" to={`/${country}`} />
				<Route path={`/:country/login`} component={SignIn} />
				<Route exact path="/:country/register" component={SignUp} />
				<Route exact path={`/:country`} render={() => <Home language={language} />} />

				{/* WorkReply */}
				<Route exact path={`/:country/work-reply`} render={() => <WorkReply language={language} />} />
				<Route path={`/:country/work-reply/edit/:id`} render={() => <EditReply language={language} />} />
			</Switch>
		</Suspense>
	);
}
