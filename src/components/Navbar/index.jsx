import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Headroom from 'react-headroom';
import { SettingFilled, PlayCircleFilled, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Form, Modal, Col, Dropdown, Menu, Row, Input, Space } from 'antd';
import { Button, Heading } from 'components';
import Logo from '../Logo';
import { country } from 'App';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { tablet, media, mobile, screenLG } from 'helpers';
import { baseStyles } from 'styles/base';
import { query, collection, getDoc, setDoc, doc } from 'firebase/firestore';
import db from 'Firebase';

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

function Navbar({ i18n, isUserLoggedIn = true, forLogin, forSignUp }) {
	const history = useHistory();
	const [userData, setUserData] = useState({});
	const [isPreferenceModalVisible, setIsPreferenceModalVisible] = useState(false);
	useEffect(() => {
		getValues();
	}, []);
	async function getValues() {
		if (localStorage.getItem('SessionId') !== null) {
			const docRef = doc(db, 'users', localStorage.getItem('SessionId').toString());
			const docSnap = await getDoc(docRef);
			setUserData(docSnap.data());
		}
	}
	async function updateValues() {
		await setDoc(doc(db, 'users', localStorage.getItem('SessionId').toString()), userData);
	}
	const handlePreferenceCancel = () => {
		setIsPreferenceModalVisible(false);
	};
	const onFinish = (values) => {
		updateValues();
		setIsPreferenceModalVisible(false);
	};
	const menu = (
		<StyledMenu>
			<Menu.Item key="1">
				{userData.fName} {userData.lName}
				<br />
				<span className="primary">{userData.email}</span>
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item
				icon={<SettingFilled />}
				key="2"
				onClick={() => {
					setIsPreferenceModalVisible(true);
				}}>
				My Account
			</Menu.Item>
			<Menu.Item icon={<PlayCircleFilled />} key="3">
				Tutorial
			</Menu.Item>
			<Menu.Item
				icon={<LogoutOutlined />}
				key="4"
				onClick={() => {
					history.push(`/${country}/login`);
					localStorage.removeItem('SessionId');
				}}>
				Logout
			</Menu.Item>
		</StyledMenu>
	);
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
							</Row>
						</StyledCol>
						<StyledCol lg={isUserLoggedIn ? 8 : 5} md={11} xs={5}>
							<Row justify="end">
								<div className="ant-row-flex">
									<Dropdown
										placement="bottomRight"
										overlay={menu}
										trigger={['click']}
										overlayStyle={{ boxShadow: baseStyles.boxShadow.mild }}>
										<span>
											<Avatar
												size={40}
												style={{
													color: '#5680e9',
													backgroundColor: '#c1c8e4',
													cursor: 'pointer'
												}}>
												{userData.fName ? userData.fName[0].toUpperCase() : ''}
												{userData.lName ? userData.lName[0].toUpperCase() : ''}
											</Avatar>
										</span>
									</Dropdown>
								</div>
							</Row>
						</StyledCol>
					</RowStyled>
				)}
			</Header>
			<StyledModal
				title={
					<>
						<Heading level={3} title_color={'#5ab9ea'} content="Edit Account Info" style={{ marginBottom: '0', textAlign: 'center' }} />
						<Row justify="center">
							<Avatar
								size={50}
								style={{
									color: '#5680e9',
									backgroundColor: '#c1c8e4',
									cursor: 'pointer'
								}}>
								{userData.fName ? userData.fName[0].toUpperCase() : ''}
								{userData.lName ? userData.lName[0].toUpperCase() : ''}
							</Avatar>
						</Row>
					</>
				}
				visible={isPreferenceModalVisible}
				destroyOnClose
				afterClose={() => {
					// setSelection({});
				}}
				onCancel={handlePreferenceCancel}
				footer={null}>
				<Form name="dynamic_form_nest_item" autoComplete="off" onFinish={onFinish}>
					<Heading title_color={'#5ab9ea'} content="Email" level={5} style={{ marginBottom: '5px' }} />
					<Input
						style={{ marginBottom: '12px' }}
						name="email"
						type="email"
						autoFocus
						value={userData.email}
						onChange={(e) => {
							setUserData({ ...userData, email: e.target.value });
						}}
						placeholder="Enter email"
					/>
					<Row>
						<Col span={11}>
							<Heading title_color={'#5ab9ea'} content="First Name" level={5} style={{ marginBottom: '5px' }} />
							<Input
								style={{ marginBottom: '12px' }}
								name="fName"
								value={userData.fName}
								onChange={(e) => {
									setUserData({ ...userData, fName: e.target.value });
								}}
								placeholder="Enter First Name"
							/>
						</Col>
						<Col span={11} offset={2}>
							<Heading title_color={'#5ab9ea'} content="Last Name" level={5} style={{ marginBottom: '5px' }} />
							<Input
								style={{ marginBottom: '12px' }}
								name="lName"
								value={userData.lName}
								onChange={(e) => {
									setUserData({ ...userData, lName: e.target.value });
								}}
								placeholder="Enter Last Name"
							/>
						</Col>
					</Row>
					<Heading title_color={'#5ab9ea'} content="Address" level={5} style={{ marginBottom: '5px' }} />
					<Input
						style={{ marginBottom: '12px' }}
						name="address"
						value={userData.address}
						onChange={(e) => {
							setUserData({ ...userData, address: e.target.value });
						}}
						placeholder="Enter Address"
					/>
					<Heading title_color={'#5ab9ea'} content="Company Name" level={5} style={{ marginBottom: '5px' }} />
					<Input
						style={{ marginBottom: '12px' }}
						name="company"
						value={userData.company}
						onChange={(e) => {
							setUserData({ ...userData, company: e.target.value });
						}}
						placeholder="Enter Company Name"
					/>
					<Heading title_color={'#5ab9ea'} content="Role" level={5} style={{ marginBottom: '5px' }} />
					<Input
						style={{ marginBottom: '20px' }}
						name="role"
						value={userData.role}
						onChange={(e) => {
							setUserData({ ...userData, role: e.target.value });
						}}
						placeholder="Enter Role"
					/>
					<Form.Item>
						<Row key="Confirm" justify="center">
							<Button type="primary" htmlType="submit" style={{ borderRadius: '4px', fontSize: '16px', height: '40px' }}>
								Save Changes
							</Button>
						</Row>
					</Form.Item>
				</Form>
			</StyledModal>
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

const StyledHeadRoom = styled(Headroom)`
	overflow-x: hidden;
	overflow-y: hidden;
	position: fixed;
	top: 0px;
	z-index: 1000;
	width: 100%;
	height: 60px !important;
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
				padding: 0.4rem 2.5rem;
			}
		}
		> header {
			@media (min-width: 768px) and (max-width: 991.98px) {
				padding: 0.4rem 1rem;
			}
		}

		> header {
			@media (min-width: 576px) and (max-width: 767.98px) {
				padding: 0.4rem 0.5rem;
			}
		}

		> header {
			@media (min-width: 992px) and (max-width: 1199.98px) {
				padding: 0.4rem 0rem;
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

const StyledModal = styled(Modal)`
	top: 6% !important;
	.ant-modal-header {
		border-radius: 8px !important;
		padding: 20px 30px 15px 30px !important;
	}
	.ant-modal-body {
		padding: 20px 40px 1px 40px !important;
	}
	.ant-modal-content {
		border-radius: 8px !important;
	}
	.subheader {
		font-weight: 400 !important;
	}
`;
