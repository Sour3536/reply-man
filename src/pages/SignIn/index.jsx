import React, { useEffect, useState } from 'react';
// import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Layout as PageLayout, Row, Col, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { withRouter, Link, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Section, Heading, Button, Logo, Alert, Card } from 'components';
import Navbar from 'components/Navbar';
import { media, mobile, screenLG, tablet } from 'helpers';
import loginImage from 'assets/images/for-login.svg';
import { collection, onSnapshot } from 'firebase/firestore';
import db from 'Firebase';

const BackgroundImage = styled.div`
	background-image: ${`url(${loginImage})`};
	background-size: 28em;
	background-repeat: no-repeat;
	background-position: 20% 50%;
	position: relative;
	height: calc(100vh - 220px);
	img {
		position: absolute;
		left: 30px;
		top: 20px;
		cursor: pointer;
	}
	@media only screen and (min-width: 1024px) and (max-height: 1366px) and (-webkit-min-device-pixel-ratio: 1.5) {
		height: calc(50vh - 279px);
	}
	${media.tablet`
		background-size: 24em;
		height: calc(60vh - 354px);
	`}
`;

const StyledCard = styled(Card)`
	${media.mobile`
		.ant-card-body{
			padding: 10px;
		}
	`}
`;

const StyledRow = styled(Row)`
	background-color: #fff;
	padding: 3rem 14rem 2rem 14rem;
	${'' /* padding-bottom: 89.5px; */}
	@media only screen and (min-width: 1024px) and (max-height: 1366px) and (-webkit-min-device-pixel-ratio: 1.5) {
		padding: 9rem 14rem 6rem 14rem;
		padding-bottom: 254.5px;
	}
	${media.tablet`
		padding: 5rem 8rem 6rem 8rem;
	`}
	${media.mobile`
		padding: 0 2em;
		height: calc(100vh - 48px);
	`}
	@media (max-width: 321px) {
		padding-top: 50px;
	}
`;

function SignIn({ i18n, country }) {
	const history = useHistory();
	const onFinish = (values) => {
		if (values.password !== '') {
			onSnapshot(collection(db, 'users'), (snapshot) => {
				let check = true;
				let id = '';
				const ids = snapshot.docs.map((doc) => doc.data());
				console.log(ids);
				for (let index = 0; index < ids.length; index++) {
					if (ids[index].email === values.email) {
						if (ids[index].password === values.password) {
							check = false;
							id = snapshot.docs[index].id;
							break;
						}
					}
				}
				if (check) {
					message.warning('Incorrect email or password');
				} else {
					localStorage.setItem('SessionId', id);
					setTimeout(() => {
						history.push({
							pathname: `/sg/work-reply`,
							id: id
						});
					}, 1000);
				}
			});
		}
		console.log('Received values of form:', values);
	};
	return (
		<PageLayoutStyled>
			<Header>
				<Navbar forLogin={true} />
			</Header>
			<PageLayout.Content>
				<PageLayout>
					<PageLayout>
						<PageLayout.Content>
							<StyledRow align="middle">
								<Col span={24}>
									<StyledCard autoheight="true" nohover="true" style={{ marginBottom: '0' }}>
										<Row>
											{!mobile && (
												<Col
													xl={12}
													lg={24}
													md={24}
													className={screenLG || tablet ? '' : 'border-right'}
													style={{ borderBottom: (tablet || screenLG) && '1px solid #ddd' }}>
													<BackgroundImage></BackgroundImage>
												</Col>
											)}
											<Col xl={12} lg={24} md={24} xs={24}>
												<StyledSection style={{ marginTop: '0em', marginBottom: 0 }}>
													<Heading
														title_color="#5ab9ea"
														content="Welcome back!"
														subheader="Please login into your account to continue using Reply-Man"
													/>
												</StyledSection>
												<StyledSection marginBottom={0}>
													<Form layout="vertical" onFinish={onFinish}>
														<Form.Item
															name="email"
															label={
																<>
																	<UserOutlined />
																	<span style={{ marginLeft: '8px' }}>Your email</span>
																</>
															}>
															<Input type="email" label="Your email" name="email" placeholder="Enter your email" />
														</Form.Item>
														<Form.Item
															name="password"
															label={
																<>
																	<LockOutlined />
																	<span style={{ marginLeft: '8px' }}>Your password</span>
																</>
															}>
															<Input password="0" type="password" label="Your password" name="password" placeholder="Enter your password" />
														</Form.Item>
														<StyledSection
															paddingHorizontal={0}
															textAlign="right"
															style={{ paddingTop: 0 }}
															marginBottom={!mobile && 'very'}>
															<Link to="/">Forgot your password?</Link>
														</StyledSection>
														<Row gutter={24} justify="center">
															<Col md={18} xs={24}>
																<Button type="primary" htmlType="submit" block>
																	Login now
																</Button>
															</Col>
														</Row>
													</Form>
												</StyledSection>
											</Col>
										</Row>
									</StyledCard>
								</Col>
							</StyledRow>
						</PageLayout.Content>
					</PageLayout>
				</PageLayout>
			</PageLayout.Content>
		</PageLayoutStyled>
	);
}
export default SignIn;

const PageLayoutStyled = styled(PageLayout)`
	padding-top: 60px;

	${media.mobile`
		padding-top:48px;
		.headroom-wrapper{
			height: fit-content !important;
		}
	`}
`;
const StyledSection = styled(Section)`
	padding: 16.5px 50px;
	${media.mobile`
		padding: 15px;
	`}
`;
const Header = styled(PageLayout.Header)`
	&& {
		background-color: #fff;
		height: auto;
		padding: 0;
		${media.mobile`
            height: auto;
        `}
	}
`;
