import React, { useEffect, useState } from 'react';
// import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Layout as PageLayout, Row, Col, Form, Input, Checkbox, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { withRouter, Link, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Section, Heading, Button, Logo, Alert, Card } from 'components';
import Navbar from 'components/Navbar';
import { media, mobile, tablet, screenLG } from 'helpers';
import registerImage from 'assets/images/for-register.svg';
import { query, collection, onSnapshot, getDocs, addDoc } from 'firebase/firestore';
import db from 'Firebase';

const BackgroundImage = styled.div`
	background-image: ${`url(${registerImage})`};
	background-size: 34em;
	background-repeat: no-repeat;
	background-position: center;
	position: relative;
	height: calc(100vh - 180px);
	img {
		position: absolute;
		left: 30px;
		top: 20px;
		cursor: pointer;
	}
	@media only screen and (min-width: 1024px) and (max-height: 1366px) and (-webkit-min-device-pixel-ratio: 1.5) {
		background-size: 30em;
		height: calc(40vh - 180px);
	}
	${media.tablet`
		background-size: 22em;
		height: calc(40vh - 100px);
	`}
`;

const StyledCard = styled(Card)`
	.ant-card-body {
		padding: 12px;
	}
	${media.mobile`
		.ant-card-body{
			padding: 10px;
		}
	`}
`;

const StyledSection = styled(Section)`
	padding: 5px 50px;
	${media.tablet`
        padding: 10px 15px;
    `}
	${media.mobile`
        padding: 10px;
    `}
`;

const StyledRow = styled(Row)`
	background-color: #fff;
	padding: 2rem 8rem;
	height: calc(100vh - 56.5px);
	@media only screen and (min-width: 1024px) and (max-height: 1366px) and (-webkit-min-device-pixel-ratio: 1.5) {
		padding: 0 12rem;
	}
	${media.tablet`
		padding: 0 7rem;
	`}
	${media.mobile`
		padding: 5em 2em 3em 2em;
        height: fit-content;
	`}
	@media (max-width: 321px) {
		padding: 5em 1.5em 3em 1.5em;
	}
`;

function SignUp({ i18n, country }) {
	const history = useHistory();
	const [tc, setTc] = useState(false);
	const onFinish = (values) => {
		if (values.password !== values.repeat_password) {
			message.warning("Your passwords doesn't match");
		} else {
			const q = query(collection(db, 'users'));
			getData(q, values);
		}
		console.log('Received values of form:', values);
	};
	async function getData(q, values) {
		var check = true;
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			if (doc.data().email === values.email) {
				check = false;
				message.warning('Email already taken');
			}
		});
		if (check === true) {
			addData(values);
		}
	}
	async function addData(val) {
		try {
			const docRef = await addDoc(collection(db, 'users'), {
				fName: val.first_name,
				lName: val.last_name,
				email: val.email,
				password: val.password,
				address: '',
				role: '',
				company: ''
			});
			console.log('Document written with ID: ', docRef.id);
			localStorage.setItem('SessionId', docRef.id);
			history.push({
				pathname: `/sg/work-reply`,
				id: docRef.id
			});
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	}
	return (
		<PageLayoutStyled>
			<Header>
				<Navbar forSignUp={true} />
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
												<StyledSection style={{ marginTop: screenLG || tablet ? '1.5em' : '0em', marginBottom: 0 }}>
													<Heading
														title_color="#5ab9ea"
														content="Join Reply-Man"
														subheader="We allows small business owners and entrepreneurs to automate their replies so
						                                they can focus on their core competencies."
													/>
												</StyledSection>
												<StyledSection marginBottom={0}>
													<Form layout="vertical" onFinish={onFinish}>
														<Row gutter={16}>
															<Col md={12} xs={24}>
																<Form.Item name="first_name" label="First Name">
																	<Input name="first_name" placeholder="Enter First Name" required />
																</Form.Item>
															</Col>
															<Col md={12} xs={24}>
																<Form.Item name="last_name" label="Last Name">
																	<Input name="last_name" placeholder="Enter Last Name" required />
																</Form.Item>
															</Col>
														</Row>
														<Row gutter={16}>
															<Col md={24} xs={24}>
																<Form.Item
																	name="email"
																	label={
																		<>
																			<UserOutlined />
																			<span style={{ marginLeft: '8px' }}>Your email</span>
																		</>
																	}>
																	<Input type="email" name="email" placeholder="Enter your email" required />
																</Form.Item>
															</Col>
														</Row>
														<Row gutter={16}>
															<Col md={12} xs={24}>
																<Form.Item
																	name="password"
																	label={
																		<>
																			<LockOutlined />
																			<span style={{ marginLeft: '8px' }}>Your password</span>
																		</>
																	}>
																	<Input type="password" name="password" placeholder="Enter your password" required />
																</Form.Item>
															</Col>
															<Col md={12} xs={24}>
																<Form.Item
																	name="repeat_password"
																	label={
																		<>
																			<LockOutlined />
																			<span style={{ marginLeft: '8px' }}>Repeat your password</span>
																		</>
																	}>
																	<Input type="password" name="repeat_password" placeholder="Repeat your password" required />
																</Form.Item>
															</Col>
														</Row>
														<Section paddingHorizontal={0} className="px0__mobile" style={{ padding: '10px 0' }}>
															<Row style={{ flexFlow: 'nowrap' }}>
																<Checkbox name="tc" checked={tc} onChange={() => setTc(!tc)} required /> &nbsp;&nbsp;{' '}
																<span>
																	I have agreed to the <Link to="/">terms and conditions</Link> and <Link to="/">privacy policy</Link> of
																	the site
																</span>
															</Row>
														</Section>
														<Row gutter={24} justify="center">
															<Col md={18} xs={24} style={{ marginBottom: mobile && '1em' }}>
																<Button block type="primary" htmlType="submit">
																	Create Account
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
export default SignUp;

const PageLayoutStyled = styled(PageLayout)`
	padding-top: 56.5px;

	${media.mobile`
	    padding-top:48px;
        .headroom-wrapper{
			height: fit-content !important;
		}
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
