/* eslint-disable no-debugger */
import React, { useContext, useEffect, useState } from 'react';
import {
	DownOutlined,
	PlusOutlined,
	MenuOutlined,
	HeartOutlined,
	FolderAddOutlined,
	FilterOutlined,
	DeleteOutlined,
	QuestionCircleOutlined,
	HeartFilled,
	CopyOutlined,
	EditOutlined
} from '@ant-design/icons';
import { withRouter } from 'react-router';
import { Layout, Section, Heading, InputSearch, Card } from 'components';
import styled from 'styled-components';
import '@ant-design/compatible/assets/index.css';
import { Row, Popconfirm, Col, BackTop, Button, Input, Dropdown, Menu, Typography, Tooltip, Badge, message, Empty } from 'antd';
import { media, mobile, tablet, screenLG } from 'helpers';
import { baseStyles } from 'styles/base';
import { replies } from './data';
import Reply from './Reply';

const StyledMenu = styled(Menu)`
	padding: 10px 8px !important;
	border-radius: 8px;
	.ant-menu-item {
		margin-bottom: 4px !important;
		height: 30px !important;
		line-height: 30px !important;
	}
	.ant-dropdown-menu-item {
		padding-left: 20px !important;
		&:hover {
			color: #5800ff;
		}
	}
`;
const MainMenu = styled(Menu)`
	padding: 8px !important;
	border-radius: 8px;
	width: 100%;
	max-height: 188px;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
	&::-webkit-scrollbar-thumb {
		border-radius: 8px;
		border: 2px solid #f9f9f9;
		background-color: rgba(0, 0, 0, 0.5);
	}
	&::-webkit-scrollbar {
		-webkit-appearance: none;
	}
	&::-webkit-scrollbar:vertical {
		width: 6px;
	}
	&::-webkit-scrollbar:horizontal {
		height: 6px;
	}
	.ant-menu-item {
		margin-bottom: 4px !important;
		height: 38px !important;
		line-height: 35px !important;
		font-size: 17px;
		font-weight: 500;
		padding-left: 10px !important;
		padding-right: 10px !important;
		color: #999;
		border-radius: 8px;
		.ant-badge {
			sup {
				background-color: #999 !important;
				transition: 1.5s ease !important;
			}
		}
	}
	.ant-menu-item-selected {
		color: #5800ff;
		.ant-badge {
			sup {
				background-color: #5800ff !important;
			}
		}
	}
	.ant-menu-item {
		&:hover {
			color: #5800ff;
			.ant-badge {
				sup {
					background-color: #5800ff !important;
				}
			}
		}
	}
	@media only screen and (min-width: 1024px) and (max-height: 1366px) and (-webkit-min-device-pixel-ratio: 1.5) {
		max-height: 340px;
	}
`;
const ReplyMenu = styled(Menu)`
	border: none !important;
	margin-bottom: 1em !important;
	padding: 2px !important;
	border-radius: 8px;
	height: calc(80vh - 110px);
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
	&::-webkit-scrollbar-thumb {
		border-radius: 8px;
		border: 2px solid #f9f9f9;
		background-color: rgba(0, 0, 0, 0.5);
	}
	&::-webkit-scrollbar {
		-webkit-appearance: none;
	}
	&::-webkit-scrollbar:vertical {
		width: 6px;
	}
	&::-webkit-scrollbar:horizontal {
		height: 6px;
	}
	.ant-menu-item {
		height: auto !important;
		line-height: 30px !important;
		padding: 0 !important;
		border-radius: 8px;
		margin: 4px 0;
		white-space: normal !important;
		background-color: ${baseStyles.lightGrey.two};
		&:hover {
			background-color: ${baseStyles.lightGrey.one};
		}
	}
	@media only screen and (min-width: 1024px) and (max-height: 1366px) and (-webkit-min-device-pixel-ratio: 1.5) {
		height: calc(55vh - 103px);
		padding: 0 !important;
	}
`;
const menu = (
	<StyledMenu>
		<Menu.Item>Name (A-Z)</Menu.Item>
		<Menu.Item>Date Created</Menu.Item>
		<Menu.Item>Recently Used</Menu.Item>
	</StyledMenu>
);
const folderMenu = (
	<StyledMenu>
		<Menu.ItemGroup title="Sort By">
			<Menu.Item>Name (A-Z)</Menu.Item>
			<Menu.Item>Date Created</Menu.Item>
			<Menu.Item>Recently Used</Menu.Item>
		</Menu.ItemGroup>
	</StyledMenu>
);
const StyledCard = styled(Card)`
	.ant-card-body {
		padding: 12px 18px;
	}
`;
const StyledSpan = styled.span`
	color: #888;
	cursor: pointer;
	margin-left: 5px;
	margin-right: 5px;
	&:hover {
		color: #5800ff;
	}
`;

function WorkReply({ history, language }) {
	const [folders, setFolders] = useState(['General', 'Common']);
	const [newFolderNane, setFolderName] = useState('');
	const [currentFolder, setCurrentFolder] = useState('All Replies');
	const [folderData, setFolderData] = useState(replies);
	const [allReply, setAllReply] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [currentReplyIndex, setCurrentReplyIndex] = useState('0');
	let selectedReply = currentFolder === 'All Replies' ? allReply : currentFolder === 'Favourites' ? favourites : folderData[currentFolder];
	useEffect(() => {
		const height = document.getElementById('folder_col').offsetHeight - 103;
		if (tablet) {
			document.getElementById('reply_menu').style.height = `${height}px`;
		}
	});
	const updateEntries = () => {
		const favourites_1 = [];
		const all_reply = [];
		for (const data in folderData) {
			const data1 = [...folderData[data]];
			data1.forEach((element, index) => {
				element.key = `1.${index}`;
				all_reply.push(element);
			});
		}
		all_reply.forEach((element) => {
			if (element.favourite) {
				favourites_1.push(element);
			}
		});
		console.log(favourites_1);
		setAllReply([...all_reply]);
		setFavourites([...favourites_1]);
	};
	useEffect(() => {
		const favourites_1 = [];
		const all_reply = [];
		for (const data in folderData) {
			const data1 = [...folderData[data]];
			data1.forEach((element, index) => {
				element.key = `1.${index}`;
				all_reply.push(element);
			});
		}
		all_reply.forEach((element) => {
			if (element.favourite) {
				favourites_1.push(element);
			}
		});
		console.log(favourites_1);
		setAllReply([...all_reply]);
		setFavourites([...favourites_1]);
	}, [folderData]);
	const selectFolder = (e) => {
		setCurrentFolder(e.key);
		setCurrentReplyIndex('0');
	};
	const setCurrentReply = (e) => {
		setCurrentReplyIndex(e.key);
	};
	const setNewFolderName = (e) => {
		setFolderName(e.target.value);
	};
	const addFolder = () => {
		document.getElementById('new_folder').style.display = 'block';
		document.getElementById('folder_input').focus();
	};
	const outOfFocus = (e) => {
		setFolderName('');
		document.getElementById('new_folder').style.display = 'none';
	};
	const addFolderName = (e) => {
		const val = e.target.value;
		if (folders.includes(val)) {
			message.info(`Already a folder named ${val}`);
			return;
		}
		setFolders([val, ...folders]);
		outOfFocus();
		setTimeout(() => {
			setCurrentFolder(val);
		}, 500);
	};
	const deleteFolder = (e) => {
		setFolders(folders.filter((item) => item !== e));
	};
	const changeFav = (index, data) => {
		const newFolderData = folderData;
		if (!data.favourite) {
			message.success('Added to your favourites.');
		}
		if (currentFolder === 'All Replies' || currentFolder === 'Favourites') {
			const ind = data.key.substring(2);
			newFolderData[data.folder][ind].favourite = !newFolderData[data.folder][ind].favourite;
		} else {
			newFolderData[data.folder][index].favourite = !newFolderData[data.folder][index].favourite;
		}
		setFolderData(newFolderData);
		updateEntries();
	};
	const deleteReply = (index, data) => {
		console.log(currentReplyIndex);
		const newFolderData = folderData;
		if (currentFolder === 'All Replies' || currentFolder === 'Favourites') {
			if (currentFolder === 'All Replies' && index === allReply.length - 1 && currentReplyIndex === index.toString()) {
				setCurrentReplyIndex((currentReplyIndex - 1).toString());
			}
			if (currentFolder === 'Favourites' && index === favourites.length - 1 && currentReplyIndex === index.toString()) {
				setCurrentReplyIndex((currentReplyIndex - 1).toString());
			}
			const ind = data.key.substring(2);
			newFolderData[data.folder].splice(ind, 1);
		} else {
			if (index === folderData[currentFolder].length - 1 && currentReplyIndex === index.toString()) {
				setCurrentReplyIndex((currentReplyIndex - 1).toString());
			}
			newFolderData[data.folder].splice(index, 1);
		}
		setFolderData(newFolderData);
		updateEntries();
	};
	return (
		<Layout breadcrumb={false} language={language}>
			<BackTop />
			<Section className="pos-rel">
				<MainRow gutter={[{ xl: 32, lg: 16, md: 16 }, 24]} align="top" margintop="0" style={{ paddingTop: '1em' }}>
					<Col lg={6} md={8} id="folder_col">
						<StyledCard autoheight="true" nohover="true">
							<Heading level={2} style={{ marginbottom: '0' }} content="WorkReply" subheader="Helps you manage replies at the quickest." />
						</StyledCard>
						<Row style={{ marginTop: '3em' }}>
							<Button type="primary" style={{ height: '50px', width: '100%', fontSize: '18px' }}>
								Create New Reply <PlusOutlined />
							</Button>
						</Row>
						<Row style={{ marginTop: '.8em' }}>
							<MainMenu onClick={selectFolder} selectedKeys={[currentFolder]}>
								<Menu.Item key="All Replies">
									<MenuOutlined style={{ verticalAlign: 'middle' }} />
									<span style={{ verticalAlign: 'middle' }}>All Replies</span>&nbsp; &nbsp;
									<Badge style={{ minWidth: '29px' }} count={allReply.length} showZero />
								</Menu.Item>
								<Menu.Item key="Favourites">
									<HeartOutlined style={{ verticalAlign: 'middle' }} />
									<span style={{ verticalAlign: 'middle' }}>My Favourites</span>&nbsp;&nbsp;
									<Badge style={{ minWidth: '29px' }} count={favourites.length} showZero />
								</Menu.Item>
							</MainMenu>
						</Row>
						<Row style={{ marginTop: '3em' }}>
							<Col span={24} style={{ padding: '0 10px' }}>
								<Row justify="space-between" style={{ fontSize: '18px' }}>
									<Typography.Text type="secondary" style={{ fontWeight: 'bold' }}>
										FOLDERS
									</Typography.Text>
									<span>
										<Tooltip title="Add Folder" color="#5800ff">
											<StyledSpan onClick={addFolder}>
												<IconSpan>
													<FolderAddOutlined />
												</IconSpan>
											</StyledSpan>
										</Tooltip>
										<Dropdown
											placement="bottomRight"
											overlay={folderMenu}
											trigger={['click']}
											overlayStyle={{ boxShadow: baseStyles.boxShadow.mild }}>
											<StyledSpan>
												<IconSpan>
													<FilterOutlined />
												</IconSpan>
											</StyledSpan>
										</Dropdown>
									</span>
								</Row>
							</Col>
							<Col span={24} style={{ marginTop: '-3px', padding: '0 10px' }}>
								<hr />
							</Col>
							<Col span={24}>
								<MainMenu selectedKeys={[currentFolder]} onClick={selectFolder}>
									<Menu.Item key="newFolderAdded" id="new_folder" style={{ display: 'none' }}>
										<Input
											id="folder_input"
											value={newFolderNane}
											onChange={(e) => {
												setNewFolderName(e);
											}}
											onBlur={(e) => {
												outOfFocus(e);
											}}
											onPressEnter={(e) => {
												addFolderName(e);
											}}
										/>
									</Menu.Item>
									{folders.map((data, index) => (
										<Menu.Item key={data}>
											<Row justify="space-between">
												<Col>
													<Row align="middle" style={{ marginTop: '3px' }}>
														<span
															style={{
																verticalAlign: 'middle',
																whiteSpace: 'normal',
																maxWidth: screenLG ? '120px' : '180px',
																display: 'inline-block'
															}}>
															<Typography.Paragraph style={{ marginBottom: 0, color: 'inherit' }} ellipsis={true}>
																{data}
															</Typography.Paragraph>
														</span>
														&nbsp;&nbsp;
														<Badge style={{ minWidth: '29px' }} count={folderData[data] ? folderData[data].length : '0'} showZero />
													</Row>
												</Col>
												<Col>
													<span onClick={(e) => e.stopPropagation()}>
														<Popconfirm
															icon={<QuestionCircleOutlined style={{ color: '#5800ff' }} />}
															title="Sure to delete?"
															onConfirm={() => deleteFolder(data)}>
															<IconSpan>
																<DeleteOutlined />
															</IconSpan>
														</Popconfirm>
													</span>
												</Col>
											</Row>
										</Menu.Item>
									))}
								</MainMenu>
							</Col>
						</Row>
					</Col>
					<Col lg={9} md={16} id="reply_col">
						<Row>
							<Col span={24} style={{ backgroundColor: '#fff', borderRadius: '8px', padding: mobile ? '0 0.5em' : '0 1.5em' }}>
								<Row style={{ margin: '1.5em 0 1em 0' }} align="middle" justify="space-between">
									<InputSearch
										size="large"
										placeholder="Search for Reply..."
										fontsize="17px"
										width={mobile ? '200px' : tablet ? '320px' : screenLG ? '230px' : '340px'}
									/>
									&nbsp;&nbsp;
									<Dropdown
										placement="bottomRight"
										overlay={menu}
										trigger={['click']}
										overlayStyle={{ boxShadow: baseStyles.boxShadow.mild }}>
										<a style={{ fontSize: '17px', marginRight: screenLG ? '0' : '10px' }}>
											Sort By&nbsp;
											<DownOutlined />
										</a>
									</Dropdown>
								</Row>
								<hr />
								<ReplyMenu selectedKeys={[currentReplyIndex]} onClick={setCurrentReply} id="reply_menu">
									{selectedReply && selectedReply.length > 0 ? (
										selectedReply.map((data, index) => (
											<Menu.Item key={index}>
												<ReplyRow justify="space-between">
													<Col xl={19} lg={18} md={19}>
														<Row>
															<Typography.Paragraph
																style={{ marginBottom: '0', fontSize: '20px', fontWeight: '600', lineHeight: '1.4' }}
																ellipsis={true}>
																{data.title}
															</Typography.Paragraph>
														</Row>
														<Row style={{ margin: '3px 0' }}>
															<Typography.Paragraph
																type="secondary"
																style={{ marginBottom: '0', fontSize: '17px', lineHeight: '24px' }}
																ellipsis={{
																	rows: 2
																}}>
																{data.reply}
															</Typography.Paragraph>
														</Row>
														<Row>
															<SpanForFolder />
															<Typography.Text style={{ fontSize: '17px' }}>{data.folder}</Typography.Text>
														</Row>
													</Col>
													<Col xl={5} lg={6} md={5}>
														{data.favourite ? (
															<Tooltip color="#5800ff" title="Un-Favourite">
																<IconSpan>
																	<HeartFilled
																		style={{ color: 'red', fontSize: '17px' }}
																		onClick={(e) => {
																			changeFav(index, data);
																			e.stopPropagation();
																		}}
																	/>
																</IconSpan>
															</Tooltip>
														) : (
															<Tooltip color="#5800ff" title="Add To Favourites">
																<IconSpan>
																	<HeartOutlined
																		style={{ fontSize: '17px' }}
																		onClick={(e) => {
																			changeFav(index, data);
																			e.stopPropagation();
																		}}
																	/>
																</IconSpan>
															</Tooltip>
														)}
														<span onClick={(e) => e.stopPropagation()}>
															<Popconfirm
																icon={<QuestionCircleOutlined style={{ color: '#5800ff' }} />}
																title="Sure to delete?"
																onConfirm={() => deleteReply(index, data)}>
																<IconSpan style={{ marginLeft: screenLG ? '2px' : '8px' }}>
																	<DeleteOutlined style={{ fontSize: '17px' }} />
																</IconSpan>
															</Popconfirm>
														</span>
													</Col>
												</ReplyRow>
											</Menu.Item>
										))
									) : (
										<Row style={{ marginTop: '8em' }} justify="center">
											<Empty
												image={Empty.PRESENTED_IMAGE_SIMPLE}
												imageStyle={{
													height: 60
												}}
												description={<span style={{ fontSize: '18px' }}>No Replies in this Folder...</span>}
											/>
										</Row>
									)}
								</ReplyMenu>
							</Col>
						</Row>
					</Col>
					<Col lg={9} md={24}>
						<Row justify="center">
							<Col
								span={24}
								style={{
									backgroundColor: '#fff',
									borderRadius: '8px',
									minHeight: tablet ? '50vh' : screenLG ? '55vh' : 'calc(80vh - 7px)',
									padding: tablet ? '3em 0' : '1em'
								}}>
								<Reply selectedReply={selectedReply} currentReplyIndex={currentReplyIndex} changeFav={changeFav} />
							</Col>
						</Row>
					</Col>
				</MainRow>
			</Section>
		</Layout>
	);
}

// prettier-ignore
export default (withRouter(WorkReply))

/*
███████╗████████╗██╗   ██╗██╗     ███████╗███████╗
██╔════╝╚══██╔══╝╚██╗ ██╔╝██║     ██╔════╝██╔════╝
███████╗   ██║    ╚████╔╝ ██║     █████╗  ███████╗
╚════██║   ██║     ╚██╔╝  ██║     ██╔══╝  ╚════██║
███████║   ██║      ██║   ███████╗███████╗███████║
╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚══════╝╚══════╝
*/
const MainRow = styled(Row).attrs(() => ({
	type: 'flex',
	justify: 'center'
}))`
	padding-left: ${({ pl }) => pl || '2rem'};
	padding-right: ${({ pr }) => pr || '2rem'};
	margin-bottom: ${({ marginbottom }) => marginbottom || '2em'};
	margin-top: ${({ margintop }) => margintop || '2em'};

	.overflowing-section {
		max-height: ${({ datalength }) => datalength > 16 && '450px'};
		overflow-y: ${({ datalength }) => datalength > 16 && 'scroll'};
		-webkit-overflow-scrolling: touch;
		&::-webkit-scrollbar-thumb {
			border-radius: 8px;
			border: 2px solid ${baseStyles.lightGrey.two};
			background-color: rgba(0, 0, 0, 0.5);
		}
		&::-webkit-scrollbar {
			-webkit-appearance: none;
		}
		&::-webkit-scrollbar:vertical {
			width: 11px;
		}
		&::-webkit-scrollbar:horizontal {
			height: 11px;
		}
	}
	@media only screen and (min-width: 1024px) and (max-height: 1366px) and (-webkit-min-device-pixel-ratio: 1.5) {
		margin-left: -2.5em !important;
		margin-right: -2.5em !important;
		padding-left: 0;
		padding-right: 0;
	}
	${media.tablet`
        margin-left: -2em !important;
		margin-right: -2em !important;
        padding-left: 0;
        padding-right: 0;
    `}
	${media.mobile`
        padding-left: 2em;
        padding-right: 2em;
    `}
`;

const ReplyRow = styled(Row)`
	padding: 8px 16px 6px 16px;
`;

const IconSpan = styled.span`
	z-index: 1;
	padding: 5px 8px;
	border-radius: 10px;
	&:hover {
		background-color: #ccc !important;
	}
`;

const SpanForFolder = styled.span`
	background-color: #5800ff;
	height: 7px;
	width: 7px;
	border-radius: 50%;
	margin: 10px 10px 10px 5px;
`;
