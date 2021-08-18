import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Headroom from 'react-headroom';
import {
	DownOutlined,
	SettingFilled,
	RocketFilled,
	PlayCircleFilled,
	LogoutOutlined,
	ClockCircleOutlined,
	CarryOutOutlined,
	CheckCircleFilled,
	MoreOutlined,
	RobotOutlined
} from '@ant-design/icons';
import { Avatar, Card, Tooltip, Col, Dropdown, Menu, Row, Input } from 'antd';
import { Button, InputSearch } from 'components';
import Logo from '../Logo';
import { country } from 'App';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { tablet, media, mobile, screenLG } from 'helpers';
import { baseStyles } from 'styles/base';
import MenuDrawer from './MenuDrawer';

const StyledLogo = styled(Logo)`
	margin-right: 5px;
	cursor: pointer;
`;
const StyledMenu = styled(Menu)`
	padding: 10px 8px !important;
	border-radius: 8px;
	.ant-menu-item {
		margin-bottom: 4px !important;
		height: 30px !important;
		line-height: 30px !important;
	}
	.ant-dropdown-menu-item:not(:first-child) {
		padding-left: 20px !important;
		&:hover {
			color: #5800ff;
		}
	}
`;
const ServicesMenu = styled.div`
	background-color: ${baseStyles.lightGrey.two};
	width: 100vw;
	padding: 2rem 1.2rem;
	user-select: none;

	${media.mobile`
		padding: 1rem 1.2rem;
	`}
`;
const Service = styled.span`
	display: block;
	text-align: center;
	color: #777;
	background-color: #fff;
	padding: 12px 20px;
	margin: 8px auto;
	border: 1px solid ${baseStyles.lightGrey.one};
	box-shadow: ${baseStyles.boxShadow.hover};
	border-radius: 10px;
	font-size: 16px;
	max-width: 250px;
	position: relative;
	cursor: pointer;
	&:hover {
		transform: translateY(-1px);
	}
	${media.mobile`
		max-width: 200px;
		font-size: 14px;
	`}
`;
const services = (
	<ServicesMenu>
		<Row
			gutter={[{ md: 40, xs: 16 }, 8]}
			style={{
				paddingLeft: mobile ? '0' : screenLG || tablet ? '2rem' : '9rem',
				paddingRight: mobile ? '0' : screenLG || tablet ? '3rem' : '10rem'
			}}
			justify="center">
			<Col lg={6} md={8} xs={12}>
				<Service>
					<RobotOutlined /> WorkFlow
				</Service>
			</Col>
			<Col lg={6} md={8} xs={12}>
				<Service>
					<RobotOutlined /> WorkLeads
				</Service>
			</Col>
			<Col lg={6} md={8} xs={12}>
				<Service>
					<RobotOutlined /> WorkMail
				</Service>
			</Col>
			<Col lg={6} md={8} xs={12}>
				<Service>
					<RobotOutlined /> WorkReview
				</Service>
			</Col>
			<Col lg={6} md={8} xs={12}>
				<Service>
					<RobotOutlined /> WorkMeet
				</Service>
			</Col>
			<Col lg={6} md={8} xs={12}>
				<Service>
					<RobotOutlined /> WorkEngage
				</Service>
			</Col>
			<Col lg={6} md={8} xs={12}>
				<Service>
					<RobotOutlined /> WorkReply
				</Service>
			</Col>
			<Col lg={6} md={8} xs={12}>
				<Service>
					<RobotOutlined /> WorkContent
				</Service>
			</Col>
			<Col lg={6} md={8} xs={12}>
				<Service>
					<RobotOutlined /> WorkIterate
				</Service>
			</Col>
			<Col lg={6} md={8} xs={12}>
				<Service>
					<RobotOutlined /> WorkConnect
				</Service>
			</Col>
		</Row>
	</ServicesMenu>
);
const menu = (
	<StyledMenu>
		<Menu.Item key="1" title="Saurabh Singhal">
			Saurabh Singhal
			<br />
			<span className="primary">saurabhsinghal3536@gmail.com</span>
			{mobile || tablet ? (
				<Row style={{ padding: '5px 20px 0px 5px' }}>
					<Col span={12}>
						<span className="primary">
							<CarryOutOutlined /> 1000
						</span>
					</Col>
					<Col span={12}>
						<span className="primary">
							<ClockCircleOutlined /> 1000
						</span>
					</Col>
				</Row>
			) : (
				''
			)}
		</Menu.Item>
		<Menu.Divider />
		{mobile ? <InputSearch width="95%" height="35px" size="middle" placeholder="Search for here" /> : ''}
		<Menu.Item icon={<SettingFilled />} key="3">
			My Settings
		</Menu.Item>
		<Menu.Item icon={<RocketFilled />} key="4">
			Upgrade{' '}
			<span
				style={{
					padding: '0 8px',
					borderRadius: '4px',
					position: 'absolute',
					right: '20px',
					top: '4px',
					border: `1px dashed ${baseStyles.greyColor}`,
					display: mobile ? 'inline' : 'none'
				}}>
				<CheckCircleFilled style={{ color: '#52c41a' }} /> Free
			</span>
		</Menu.Item>
		<Menu.Item icon={<PlayCircleFilled />} key="5">
			Tutorial
		</Menu.Item>
		<Menu.Item icon={<LogoutOutlined />} key="6">
			Logout
		</Menu.Item>
	</StyledMenu>
);

function Navbar({ i18n, isUserLoggedIn = true, forLogin, forSignUp }) {
	const history = useHistory();
	const [isMenuVisible, setIsMenuVisible] = useState(false);
	const showMenuDrawer = () => {
		setIsMenuVisible(true);
	};
	const onMenuClose = () => {
		setIsMenuVisible(false);
	};
	return (
		<StyledHeadRoom disableInlineStyles>
			<Header>
				{forLogin ? (
					<RowStyled type="flex" style={{ justifyContent: mobile ? 'center' : 'space-between', padding: '5px 5%' }}>
						{!mobile && (
							<StyledCol>
								<Row align="middle">
									<div className="main-logo">
										<StyledLogo style={{ marginBottom: '0' }} onClick={() => history.push(`/${country}`)} width={tablet ? '180' : '270'} />
									</div>
								</Row>
							</StyledCol>
						)}
						<StyledCol>
							{mobile && (
								<div className="ant-row-flex" style={{ justifyContent: 'center' }}>
									<div className="main-logo">
										<StyledLogo style={{ marginBottom: '0' }} onClick={() => history.push(`/${country}`)} width="230" />
									</div>
								</div>
							)}
							<div className="ant-row-flex">
								<UnloggedinItems>
									Don't have an account yet?
									<Button
										type="primary"
										size="default"
										style={{ marginLeft: '1em', marginRight: mobile ? '0' : '1em', display: mobile && 'inline' }}
										onClick={() => history.push(`/${country}/register`)}>
										Sign Up
									</Button>
								</UnloggedinItems>
							</div>
						</StyledCol>
					</RowStyled>
				) : forSignUp ? (
					<RowStyled type="flex" style={{ justifyContent: mobile ? 'center' : 'space-between', padding: '5px 5%' }}>
						{!mobile && (
							<StyledCol>
								<Row align="middle">
									<div className="main-logo">
										<StyledLogo
											style={{ marginBottom: '0' }}
											onClick={() => history.push(`/${country}`)}
											width={mobile ? '200px' : tablet ? '180' : '270'}
										/>
									</div>
								</Row>
							</StyledCol>
						)}
						<StyledCol>
							{mobile && (
								<div className="ant-row-flex" style={{ justifyContent: 'center' }}>
									<div className="main-logo">
										<StyledLogo style={{ marginBottom: '0' }} onClick={() => history.push(`/${country}`)} width="230" />
									</div>
								</div>
							)}
							<div className="ant-row-flex" style={{ justifyContent: 'center' }}>
								<UnloggedinItems>
									Already a user?
									<Button
										type="primary"
										size="default"
										style={{ marginLeft: '1em', marginRight: mobile ? '0' : '1em', display: mobile && 'inline' }}
										onClick={() => history.push(`/${country}/login`)}>
										Sign In
									</Button>
								</UnloggedinItems>
							</div>
						</StyledCol>
					</RowStyled>
				) : (
					<RowStyled type="flex" style={{ justifyContent: 'space-between', padding: '5px 2%' }}>
						<StyledCol lg={isUserLoggedIn ? 16 : 19} md={13} xs={19}>
							<Row align="middle">
								<div className="main-logo">
									<StyledLogo
										style={{ marginBottom: '0' }}
										onClick={() => history.push(`/${country}`)}
										width={mobile ? '200px' : tablet ? '180' : '270'}
									/>
								</div>
								{!mobile && (
									<>
										<div className="ant-row-flex" style={{ alignItems: 'center' }}>
											<div className="search" style={{ margin: tablet ? '0 10px' : '0 10px 0 20px' }}>
												<InputSearch size="large" placeholder="Search for here" /> &nbsp;&nbsp;
											</div>
										</div>
									</>
								)}
								{isUserLoggedIn ? (
									<div
										className="ant-row-flex"
										style={{ alignItems: 'center', marginTop: '-5px', fontSize: '22px', display: tablet || mobile ? 'none' : 'block' }}>
										<Tooltip title="Remaining Task Credits" placement="bottom" color="#5800ff">
											<span style={{ marginLeft: screenLG ? '10px' : '40px' }} className="primary">
												<CarryOutOutlined /> <span style={{ fontSize: '17px' }}>1000</span>&nbsp;&nbsp;
											</span>
										</Tooltip>
										<Tooltip title="Remaining Time Credits" placement="bottom" color="#5800ff">
											<span style={{ marginLeft: screenLG ? '5px' : '40px' }} className="primary">
												<ClockCircleOutlined /> <span style={{ fontSize: '17px' }}>1000</span>&nbsp;&nbsp;
											</span>
										</Tooltip>
									</div>
								) : (
									<ServiceLinkWrapper>
										<Dropdown
											overlay={services}
											trigger={['click']}
											overlayStyle={{ position: 'fixed', zIndex: 99, boxShadow: baseStyles.boxShadow.mild }}>
											<StyledServiceBtn style={{ marginLeft: 20 }}>
												Services <DownOutlined />{' '}
											</StyledServiceBtn>
										</Dropdown>
										<StyledServiceBtn>Pricing</StyledServiceBtn>
										<StyledServiceBtn style={{ marginLeft: mobile ? 30 : 55 }}>Tutorial</StyledServiceBtn>
									</ServiceLinkWrapper>
								)}
							</Row>
						</StyledCol>
						<StyledCol lg={isUserLoggedIn ? 8 : 5} md={11} xs={5}>
							{/* <Language> */}
							<Row justify="end">
								{isUserLoggedIn ? (
									mobile ? (
										<div className="ant-row-flex">
											<Dropdown
												placement="bottomRight"
												overlay={menu}
												trigger={['click']}
												overlayStyle={{ boxShadow: baseStyles.boxShadow.mild }}>
												<span>
													<Avatar
														src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
														style={{ border: '1px solid grey' }}
													/>
													<span className="primary">
														&nbsp;
														<DownOutlined />
													</span>
												</span>
											</Dropdown>
										</div>
									) : (
										<>
											<div className="ant-row-flex" style={{ marginRight: tablet ? '15px' : '25px' }}>
												<Tooltip title="Current Plan" placement="bottom" color="#5800ff">
													<Button type="dashed" size="default">
														<CheckCircleFilled style={{ color: '#52c41a' }} /> Free
													</Button>
												</Tooltip>
											</div>
											<div className="ant-row-flex" style={{ marginRight: tablet ? '15px' : '25px' }}>
												<Button type="primary" size="default">
													<RocketFilled /> Upgrade Plan
												</Button>
											</div>
											<div className="ant-row-flex">
												<Dropdown
													placement="bottomRight"
													overlay={menu}
													trigger={['click']}
													overlayStyle={{ boxShadow: baseStyles.boxShadow.mild }}>
													<span>
														<Avatar
															src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
															style={{ border: '1px solid grey' }}
														/>
														<span className="primary">
															&nbsp;
															<DownOutlined />
														</span>
													</span>
												</Dropdown>
											</div>
										</>
									)
								) : mobile ? (
									<>
										<div className="ant-row-flex">
											<Button shape="circle" icon={<MoreOutlined />} size="default" type="primary" onClick={showMenuDrawer} />
										</div>
										<MenuDrawer closable={true} onClose={onMenuClose} visible={isMenuVisible} />
									</>
								) : (
									<div className="ant-row-flex">
										<UnloggedinItems>
											<Button
												type="ghost"
												size="default"
												style={{ marginLeft: '1em', marginRight: '1em' }}
												onClick={() => history.push(`/${country}/login`)}>
												Login
											</Button>
											<Button
												type="primary"
												size="default"
												style={{ marginLeft: '1em' }}
												onClick={() => history.push(`/${country}/register`)}>
												Sign up
											</Button>
										</UnloggedinItems>
									</div>
								)}
							</Row>
							{/* </Language> */}
						</StyledCol>
					</RowStyled>
				)}
			</Header>
		</StyledHeadRoom>
	);
}

export default Navbar;

// ███████╗████████╗██╗   ██╗██╗     ███████╗███████╗
// ██╔════╝╚══██╔══╝╚██╗ ██╔╝██║     ██╔════╝██╔════╝
// ███████╗   ██║    ╚████╔╝ ██║     █████╗  ███████╗
// ╚════██║   ██║     ╚██╔╝  ██║     ██╔══╝  ╚════██║      🐣🐣🐣🐣🐣🐣
// ███████║   ██║      ██║   ███████╗███████╗███████║
// ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚══════╝╚══════╝

const RowStyled = styled(Row)`
	flex-wrap: nowrap !important;
`;
const Language = styled.div`
	.ant-row-flex {
		display: flex;
		justify-content: flex-end;
	}
	@media (min-width: 768px) and (max-width: 991.98px) {
		.ant-row-flex {
			display: flex;
			justify-content: flex-end;
		}
	}
	@media (min-width: 576px) and (max-width: 767.98px) {
		.ant-row-flex {
			display: flex;
			justify-content: flex-end;
		}
	}
`;
const Header = styled.header`
	.ant-col {
		line-height: 0;
		align-self: center;
		overlayStyle
	}
	background-color: #fff;

	#google_translate_element {
		margin-right: 2em;
		display: inline-block;
		+ * {
			display: inline-block;
		}
	}
	.main-logo {
		height: auto;
		img {
			cursor: pointer;
		}
	}
`;

const UnloggedinItems = styled.div`
	text-align: right;

	${media.mobile`
        > * {
            display: block;
        }
    `}
`;
const StyledCol = styled(Col)`
	.ant-row-flex {
		align-items: center;
	}
`;

const StyledServiceBtn = styled.span`
	color: ${baseStyles.greyColor};
	cursor: pointer;
	user-select: none;
	font-size: 1.1rem;
	margin-left: 45px;
	&:hover {
		color: ${baseStyles.primaryColor};
	}
	${media.mobile`
		margin-left:20px;
		font-size:0.9rem;
	`}
`;

const ServiceLinkWrapper = styled.div`
	min-width: 200px;
	${media.tablet`
		padding-top: 10px;	
	`}
	${media.mobile`
		padding-top: 5px;	
	`}
`;

const StyledHeadRoom = styled(Headroom)`
	overflow-x: hidden;
	overflow-y: hidden;
	position: fixed;
	top: 0px;
	z-index: 1000;
	width: 100%;
	height: 76.5px;
	border-bottom: 1px solid ${baseStyles.lightGrey.one};
	box-shadow: ${baseStyles.boxShadow.main};

	@media (max-width: 575.98px) {
		.ant-row-flex {
			display: flex;
			justify-content: space-between;
			padding: 5px;
		}
	}
	.headroom {
		top: 0;
		left: 0;
		right: 0;
		z-index: 11;
		> header {
			@media (min-width: 1200px) {
				padding: 0.5rem 2.5rem;
			}
		}
		> header {
			@media (min-width: 768px) and (max-width: 991.98px) {
				padding: 0.5rem 1rem;
			}
		}

		> header {
			@media (min-width: 576px) and (max-width: 767.98px) {
				padding: 0.5rem 0.5rem;
			}
		}

		> header {
			@media (min-width: 992px) and (max-width: 1199.98px) {
				padding: 0.5rem 0rem;
			}
		}
		@media (min-width: 992px) and (max-width: 1199.98px) {
			.ant-input-search {
				width: 127px !important;
			}
		}
		@media (min-width: 768px) and (max-width: 991.98px) {
			.ant-input-search {
				width: 157px !important;
			}
		}

		@media (min-width: 576px) and (max-width: 767.98px) {
			.ant-input-search {
				width: 140px !important;
			}
		}
		.headroom--unfixed {
			position: fixed;
			transform: translateY(0);
		}
		.headroom--scrolled {
			position: fixed;
			/* transition: transform 0.3s ease; */
		}
		.headroom--unpinned {
			position: fixed;
			transform: translateY(0);
		}
		.headroom--pinned {
			position: fixed;
			transform: translateY(0%);
			> header {
				background-color: #fff;
			}
		}
	}
	${media.mobile`
		.headroom {
			> header {
				padding: 0 0.5em;
			}
		}
	`}
`;
