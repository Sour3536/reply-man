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
	SearchOutlined,
	CloseOutlined
} from '@ant-design/icons';
import { withRouter } from 'react-router';
import { Layout, Section, Heading, Card } from 'components';
import styled from 'styled-components';
import '@ant-design/compatible/assets/index.css';
import { Row, Popconfirm, Col, BackTop, Button, Input, Dropdown, Menu, Typography, Tooltip, Badge, message, Empty } from 'antd';
import { media, mobile, tablet, screenLG } from 'helpers';
import { baseStyles } from 'styles/base';
import { replies } from './data';
import Reply from './Reply';
import { collection, onSnapshot, setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import db from 'Firebase';

const InputSearch = styled(Input)`
	&& {
		width: ${({ width }) => width || '280px'};
		height: ${({ height }) => height || '43px'};
		border: 1px solid ${baseStyles.lightGrey.one};
		border-radius: 32px;
		display: flex;
		align-items: center;
		padding: 0 17px;
		margin: 1px 0;
		.ant-input {
			box-shadow: none;
			border: none;
			font-size: ${({ fontSize }) => fontSize || '14px'};
			&:focus {
				width: 100%;
				box-shadow: none;
				background: initial;
			}
		}
		.ant-input-group-addon {
			border: 0;
			background: transparent;
			font-size: 16px;
			color: grey;
		}
		&&:focus-within {
			box-shadow: 1px 3px 7px rgba(0, 0, 0, 0.2);
		}
	}
	${media.mobile`
		padding: 0px 10px !important;
		margin: 10px 5px 5px 5px;
	`}
`;

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
			color: #5ab9ea;
		}
	}
`;
const MainMenu = styled(Menu)`
	padding: 1px !important;
	border-radius: 8px;
	border: none !important;
	width: 100%;
	max-height: 284px;
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
	.ant-menu {
		background: '#84ceeb !important';
	}
	.ant-menu-item {
		margin: 2px 0 2px 0 !important;
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
		color: #5ab9ea;
		.ant-badge {
			sup {
				background-color: #5ab9ea !important;
			}
		}
	}
	.ant-menu-item {
		&:hover {
			color: #5ab9ea;
			.ant-badge {
				sup {
					background-color: #5ab9ea !important;
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
	height: calc(80vh - 101px);
	overflow-y: scroll;
	overflow-x: hidden;
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
		padding: 2px 0 !important;
		border-radius: 4px;
		margin: 0 3px 8px 2px !important;
		white-space: normal !important;
		background-color: #f2f4f9;
		&:hover {
			transform: scale(1.015);
			border: 2px solid #cdeaf8;
			border-radius: 4px;
		}
	}
	.ant-menu-item-selected {
		background-color: #cdeaf8 !important;
	}
	@media only screen and (min-width: 1024px) and (max-height: 1366px) and (-webkit-min-device-pixel-ratio: 1.5) {
		height: calc(55vh - 103px);
		padding: 0 !important;
	}
`;
const StyledSpan = styled.span`
	color: #888;
	cursor: pointer;
	margin-left: 5px;
	margin-right: 5px;
	&:hover {
		color: #5ab9ea;
	}
`;

function WorkReply({ history, language, location }) {
	const [folders, setFolders] = useState(['General', 'Common']);
	const [userData, setUserData] = useState({});
	const [newFolderNane, setFolderName] = useState('');
	const [currentFolder, setCurrentFolder] = useState('All Replies');
	const [folderData, setFolderData] = useState({}); //replies
	const [allReply, setAllReply] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [currentReplyIndex, setCurrentReplyIndex] = useState('0');
	const [selectedReply, setSelectedReply] = useState([]);
	const [selectedVal, setSelectedVal] = useState('');
	useEffect(() => {
		const height = document.getElementById('folder_col').offsetHeight - 103;
		if (tablet) {
			document.getElementById('reply_menu').style.height = `${height}px`;
		}
	});
	useEffect(() => {
		console.log(localStorage.getItem('SessionId'));
		getReplies();
	}, []);
	useEffect(() => {
		setSelectedReply(currentFolder === 'All Replies' ? allReply : currentFolder === 'Favourites' ? favourites : folderData[currentFolder]);
	}, [allReply, currentFolder, favourites, folderData]);
	async function getReplies() {
		if (localStorage.getItem('SessionId') !== null) {
			const docRef = doc(db, 'users', localStorage.getItem('SessionId').toString());
			const docSnap = await getDoc(docRef);
			setUserData(docSnap.data());
			const dat = JSON.parse(docSnap.data().replies);
			setFolderData(dat);
			setFolders(Object.keys(dat));
		}
	}
	async function updateFirestoreReplies(val) {
		if (val === undefined) {
			await updateDoc(doc(db, 'users', localStorage.getItem('SessionId').toString()), { replies: JSON.stringify(folderData) });
		} else {
			await updateDoc(doc(db, 'users', localStorage.getItem('SessionId').toString()), {
				replies: JSON.stringify({ [val]: [], ...folderData })
			});
		}
	}
	async function deleteFirestoreReplies(val) {
		await updateDoc(doc(db, 'users', localStorage.getItem('SessionId').toString()), { replies: JSON.stringify(val) });
	}
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
		updateFirestoreReplies(val);
		setFolders([val, ...folders]);
		setFolderData({ [val]: [], ...folderData });
		outOfFocus();
		setTimeout(() => {
			setCurrentFolder(val);
		}, 500);
	};
	const deleteFolder = (e) => {
		setFolders(folders.filter((item) => item !== e));
		// delete folderData[e];
		const newData = Object.keys(folderData).reduce((object, key) => {
			if (key !== e) {
				object[key] = folderData[key];
			}
			return object;
		}, {});
		setFolderData(newData);
		deleteFirestoreReplies(newData);
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
		changeFavOrDel(newFolderData);
		setFolderData(newFolderData);
		updateEntries();
	};
	async function changeFavOrDel(data) {
		await updateDoc(doc(db, 'users', localStorage.getItem('SessionId').toString()), { replies: JSON.stringify(data) });
	}
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
		changeFavOrDel(newFolderData);
		setFolderData(newFolderData);
		updateEntries();
	};
	const newReply = () => {
		if (currentFolder !== 'All Replies' && currentFolder !== 'My Favourites') {
			history.push(`/sg/work-reply/edit/${currentFolder}`);
		} else {
			history.push(`/sg/work-reply/edit`);
		}
	};
	const menu = (
		<StyledMenu>
			<Menu.Item
				onClick={() => {
					let replies = [
						...(currentFolder === 'All Replies' ? allReply : currentFolder === 'Favourites' ? favourites : folderData[currentFolder])
					];
					if (replies && replies.length > 0) {
						replies.sort(function (a, b) {
							return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
						});
						setSelectedReply(replies);
						setSelectedVal('');
					}
				}}>
				Name (A-Z)
			</Menu.Item>
			<Menu.Item
				onClick={() => {
					let replies = [
						...(currentFolder === 'All Replies' ? allReply : currentFolder === 'Favourites' ? favourites : folderData[currentFolder])
					];
					if (replies && replies.length > 0) {
						replies.sort(function (b, a) {
							return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
						});
						setSelectedReply(replies);
						setSelectedVal('');
					}
				}}>
				Name (Z-A)
			</Menu.Item>
			<Menu.Item
				onClick={() => {
					setSelectedReply(
						currentFolder === 'All Replies' ? allReply : currentFolder === 'Favourites' ? favourites : folderData[currentFolder]
					);
				}}>
				Date Created
			</Menu.Item>
		</StyledMenu>
	);
	const folderMenu = (
		<StyledMenu>
			<Menu.ItemGroup title="Sort By">
				<Menu.Item
					onClick={() => {
						let folds = [...folders];
						if (folds && folds.length > 0) {
							folds.sort();
							setFolders(folds);
						}
					}}>
					Name (A-Z)
				</Menu.Item>
				<Menu.Item
					onClick={() => {
						let folds = [...folders];
						if (folds && folds.length > 0) {
							folds.sort();
							folds.reverse();
							setFolders(folds);
						}
					}}>
					Name (Z-A)
				</Menu.Item>
				<Menu.Item
					onClick={() => {
						setFolders(Object.keys(folderData));
					}}>
					Date Created
				</Menu.Item>
			</Menu.ItemGroup>
		</StyledMenu>
	);
	const search = (val) => {
		setSelectedVal(val);
		let replies = [
			...(currentFolder === 'All Replies' ? allReply : currentFolder === 'Favourites' ? favourites : folderData[currentFolder])
		];
		if (replies && replies.length > 0) {
			replies = replies.filter((item) => item.title.toLowerCase().indexOf(val.toLowerCase()) >= 0);
		}
		setSelectedReply(replies);
	};
	let addOn = selectedVal === '' ? <SearchOutlined /> : <CloseOutlined onClick={() => search('')} />;
	return (
		<Layout breadcrumb={false} language={language}>
			<BackTop />
			<Row>
				<Col span={5} style={{ backgroundColor: '#fff', padding: '3rem 1rem', boxShadow: baseStyles.boxShadow.mild }}>
					<Row>
						<Col lg={24} md={24} id="folder_col">
							<Row>
								<ButtonNew type="primary" onClick={newReply}>
									Create New Reply <PlusOutlined />
								</ButtonNew>
							</Row>
							<Row style={{ marginTop: '1.5em' }}>
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
							<Row style={{ marginTop: '1.5em' }}>
								<Col span={24} style={{ padding: '0 10px' }}>
									<Row justify="space-between" style={{ fontSize: '18px' }}>
										<Typography.Text type="secondary" style={{ fontWeight: 'bold' }}>
											FOLDERS
										</Typography.Text>
										<span>
											<Tooltip title="Add Folder" color="linear-gradient(45deg,#8860d0 ,#8860d0 , #5680e9,#5ab9ea)">
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
								<Col span={24} style={{ margin: '-1px 0 -6px 0', padding: '0 10px' }}>
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
																icon={<QuestionCircleOutlined style={{ color: '#5ab9ea' }} />}
																title="Sure to delete?"
																onConfirm={() => deleteFolder(data)}>
																<IconSpan style={{ padding: '3px 7px 5px 7px' }}>
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
					</Row>
				</Col>
				<Col span={19}>
					<Section className="pos-rel">
						<MainRow
							gutter={[{ xl: 32, lg: 16, md: 16 }, 24]}
							align="top"
							margintop=".8em"
							marginbottom="1px"
							style={{ paddingTop: '1em' }}>
							<Col lg={12} md={16} id="reply_col">
								<Row>
									<Col
										span={24}
										style={{
											backgroundColor: '#fff',
											boxShadow: baseStyles.boxShadow.mild,
											borderRadius: '8px',
											padding: mobile ? '0 0.5em' : '0 1.5em'
										}}>
										<Row style={{ margin: '1em 0 .8em 0' }} align="middle" justify="space-between">
											<InputSearch
												size="large"
												placeholder="Search for Reply..."
												fontSize="17px"
												value={selectedVal}
												onChange={(e) => search(e.target.value)}
												addonAfter={addOn}
												width={mobile ? '200px' : tablet ? '320px' : screenLG ? '230px' : '325px'}
											/>
											&nbsp;&nbsp;
											<Dropdown
												placement="bottomRight"
												overlay={menu}
												trigger={['click']}
												overlayStyle={{ boxShadow: baseStyles.boxShadow.mild }}>
												<a style={{ fontSize: '17px', marginRight: screenLG ? '0' : '15px', fontWeight: '500' }}>
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
															<Col xl={20} lg={18} md={19}>
																<Row>
																	<Typography.Paragraph
																		style={{ marginBottom: '0', fontSize: '19px', fontWeight: '600', lineHeight: '1.4', color: '#606472' }}
																		ellipsis={true}>
																		{data.title}
																	</Typography.Paragraph>
																</Row>
																<Row style={{ margin: '3px 0' }}>
																	<Typography.Paragraph
																		type="secondary"
																		style={{ marginBottom: '0', fontSize: '16px', lineHeight: '23px' }}
																		ellipsis={{
																			rows: 2
																		}}>
																		{data.reply}
																	</Typography.Paragraph>
																</Row>
																<Row>
																	<SpanForFolder />
																	<Typography.Text style={{ fontSize: '16px', color: '#4d505b' }}>{data.folder}</Typography.Text>
																</Row>
															</Col>
															<Col xl={4} lg={6} md={5}>
																{data.favourite ? (
																	<Tooltip color="linear-gradient(45deg,#8860d0 ,#8860d0 , #5680e9,#5ab9ea)" title="Un-Favourite">
																		<IconSpan>
																			<HeartFilled
																				style={{ color: 'red', fontSize: '16px', border: 'none' }}
																				onClick={(e) => {
																					changeFav(index, data);
																					e.stopPropagation();
																				}}
																			/>
																		</IconSpan>
																	</Tooltip>
																) : (
																	<Tooltip color="linear-gradient(45deg,#8860d0 ,#8860d0 , #5680e9,#5ab9ea)" title="Add To Favourites">
																		<IconSpan>
																			<HeartOutlined
																				style={{ fontSize: '16px', color: '#606472' }}
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
																		icon={<QuestionCircleOutlined style={{ color: '#5ab9ea' }} />}
																		title="Sure to delete?"
																		onConfirm={() => deleteReply(index, data)}>
																		<IconSpanSpaced>
																			<DeleteOutlined style={{ fontSize: '16px', color: '#606472' }} />
																		</IconSpanSpaced>
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
							<Col lg={12} md={24}>
								<Row justify="center">
									<Col
										span={24}
										style={{
											backgroundColor: '#fff',
											boxShadow: baseStyles.boxShadow.mild,
											borderRadius: '8px',
											height: tablet ? '50vh' : screenLG ? '55vh' : 'calc(80vh - 9px)',
											padding: tablet ? '3em 0' : '1em'
										}}>
										<Reply selectedReply={selectedReply} currentReplyIndex={currentReplyIndex} changeFav={changeFav} />
									</Col>
								</Row>
							</Col>
						</MainRow>
					</Section>
				</Col>
			</Row>
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
	padding-left: ${({ pl }) => pl || '.5rem'};
	padding-right: ${({ pr }) => pr || '.5rem'};
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
	padding: 4px 6px;
	margin: 0 1px 0 1px;
	border-radius: 8px;
	&:hover {
		background-color: #e0e3f1 !important;
		border: 1px solid #5ab9ea;
		margin: 0;
	}
`;

const IconSpanSpaced = styled(IconSpan)`
	margin: 0 1px 0 3px;
	&:hover {
		margin: 0 0 0 2px;
	}
`;

const SpanForFolder = styled.span`
	background-color: #8860d0;
	height: 7px;
	width: 7px;
	border-radius: 50%;
	margin: 11px 8px 10px 5px;
`;

const ButtonNew = styled(Button)`
	height: 60px !important;
	width: 100%;
	font-size: 20px !important;
	border-radius: 8px !important;
`;
