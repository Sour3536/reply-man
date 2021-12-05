/* eslint-disable no-debugger */
import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { Button, Heading } from 'components';
import { LinkOutlined, CopyOutlined, HeartFilled, HeartOutlined, EditOutlined, EnterOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import '@ant-design/compatible/assets/index.css';
import { Row, Tag, Col, message, Tooltip, Typography, Empty, Modal, Input, Form, Radio, Space } from 'antd';
import { media, mobile, tablet, screenLG } from 'helpers';
import { useHistory } from 'react-router-dom';
import { baseStyles } from 'styles/base';
import { general_variables } from './data';
import { doc, getDoc } from 'firebase/firestore';
import db from 'Firebase';

// function copyToClipboard(text) {
// 	var dummy1 = document.createElement('textarea');
// 	document.body.appendChild(dummy1);
// 	dummy1.innerHTML = text;
// 	dummy1.select();
// 	document.execCommand('copy');
// 	document.body.removeChild(dummy1);
// }
function copyToClipboard(str) {
	function listener(e) {
		e.clipboardData.setData('text/html', str);
		e.clipboardData.setData('text/plain', str);
		e.preventDefault();
	}
	document.addEventListener('copy', listener);
	document.execCommand('copy');
	document.removeEventListener('copy', listener);
}

export default function Reply({ selectedReply, currentReplyIndex, changeFav, ...props }) {
	const history = useHistory();
	const editor = useMemo(() => withReact(createEditor()), []);
	const [newText, setNewText] = useState('');
	const [selectQuestion, setSelectQuestion] = useState('');
	const [selectOptions, setSelectOptions] = useState([]);
	const [textQuestion, setTextQuestion] = useState('');
	const [isTextModalVisible, setIsTextModalVisible] = useState(false);
	const [isSelectModalVisible, setIsSelectModalVisible] = useState(false);
	const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);
	var genderSelected = '';
	var dummy = '';
	const handleTextOk = () => {
		setIsTextModalVisible(false);
	};
	const handleTextCancel = () => {
		setIsTextModalVisible(false);
	};
	const handleSelectOk = () => {
		setIsSelectModalVisible(false);
	};
	const handleSelectCancel = () => {
		setIsSelectModalVisible(false);
	};
	const handleGenderOk = () => {
		setIsGenderModalVisible(false);
	};
	const handleGenderCancel = () => {
		setIsGenderModalVisible(false);
	};
	const renderElement = useCallback(({ attributes, children, element }) => {
		switch (element.type) {
			case 'link':
				return (
					<StyledTag {...attributes} icon={<LinkOutlined />} contentEditable={false}>
						{children}
					</StyledTag>
				);
			default:
				return (
					<p {...attributes} style={{ marginBottom: '0' }}>
						{children}
					</p>
				);
		}
	}, []);
	const edit = () => {
		history.push(`/sg/work-reply/edit/${selectedReply[currentReplyIndex].folder}/${selectedReply[currentReplyIndex].key.slice(2)}`);
	};
	async function createText(e) {
		dummy = '';
		for (let index = 0; index < e.length; index++) {
			let data = e[index];
			for (let index1 = 0; index1 < data.children.length; index1++) {
				let val = data.children[index1];
				if (val.text) {
					dummy += val.text.toString();
				} else if (val.type === 'link' && val.sub === 'general') {
					let userData = '';
					if (localStorage.getItem('SessionId') !== null) {
						const docRef = doc(db, 'users', localStorage.getItem('SessionId').toString());
						const docSnap = await getDoc(docRef);
						userData = docSnap.data();
					}
					switch (val.children[0].text) {
						case 'Your First Name':
							dummy += userData.fName;
							break;
						case 'Your Last Name':
							dummy += userData.lName;
							break;
						case 'Your Full Name':
							dummy += userData.fName + ' ' + userData.lName;
							break;
						case 'Your Address':
							dummy += userData.address;
							break;
						case 'Your Email':
							dummy += userData.email;
							break;
						case 'Your Role':
							dummy += userData.role;
							break;
						case 'Your Company':
							dummy += userData.company;
							break;
					}
					// dummy += general_variables.find((o) => o.name === val.children[0].text).val.toString();
				} else if (val.type === 'link' && val.children[0].text === 'Date' && val.sub === 'dynamic') {
					const today = new Date();
					const months = [
						'January',
						'February',
						'March',
						'April',
						'May',
						'June',
						'July',
						'August',
						'September',
						'October',
						'November',
						'December'
					];
					let dd = String(today.getDate()).padStart(2, '0');
					let month = months[today.getMonth()];
					let yyyy = today.getFullYear();
					dummy += month + ' ' + dd + ', ' + yyyy;
				} else if (val.type === 'link' && val.children[0].text === 'Time' && val.sub === 'dynamic') {
					const today = new Date();
					dummy += today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
				} else if (val.type === 'link' && val.children[0].text === 'Local TimeZone' && val.sub === 'dynamic') {
					const name = Intl.DateTimeFormat().resolvedOptions().timeZone;
					let zone = -new Date().getTimezoneOffset(); //if -60 then UTC+01
					let gmt = '';
					if (zone % 60 === 0 && zone >= 0) {
						gmt = 'UTC +0' + zone / 60;
					} else if (zone % 60 === 0 && zone < 0) {
						gmt = 'UTC -0' + -zone / 60;
					} else if (zone > 0) {
						gmt = 'UTC +0' + Math.floor(zone / 60) + ':30';
					} else {
						gmt = 'UTC -0' + Math.floor(-zone / 60) + ':30';
					}
					dummy += name + ' ' + gmt;
				} else if (val.type === 'link' && val.children[0].text === 'Day' && val.sub === 'dynamic') {
					const d = new Date();
					const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
					dummy += weekday[d.getDay()];
				} else if (val.type === 'link' && val.sub === 'text') {
					setTextQuestion(val.children[0].text);
					setTimeout(() => {
						setIsTextModalVisible(true);
					}, 500);
					await waitingKeypress();
					dummy += document.getElementById('textInput').value.toString();
					document.getElementById('textInput').value = '';
					setNewText('');
					setIsTextModalVisible(false);
				} else if (val.type === 'link' && val.sub === 'select') {
					setSelectQuestion(val.children[0].text);
					let opt = [];
					for (let index = 0; index < val.options.length; index++) {
						opt.push(val.options[index].first);
					}
					setSelectOptions(opt);
					setTimeout(() => {
						setIsSelectModalVisible(true);
					}, 500);
					await waitingKeypress();
					dummy += document.querySelector('input[name="options"]:checked').value.toString();
					setIsSelectModalVisible(false);
				} else if (val.type === 'link' && val.sub === 'gender') {
					if (genderSelected === '') {
						setTimeout(() => {
							setIsGenderModalVisible(true);
						}, 500);
						await waitingKeypress();
						let gen = document.querySelector('input[name="gender"]:checked').value.toString();
						dummy += val.options[gen];
						genderSelected = gen;
						setIsGenderModalVisible(false);
					} else {
						dummy += val.options[genderSelected];
					}
				} else if (val.type === 'link' && val.sub === 'daytime') {
					var today = new Date();
					var curHr = today.getHours();
					if (curHr < 12) {
						dummy += val.options.morning;
					} else if (curHr < 17) {
						dummy += val.options.afternoon;
					} else if (curHr < 19) {
						dummy += val.options.evening;
					} else {
						dummy += val.options.night;
					}
				}
			}
			dummy += '<br/>';
		}
		copyToClipboard(dummy);
		message.success('Copied to your Clipboard.');
		genderSelected = '';
	}
	function waitingKeypress() {
		return new Promise((resolve) => {
			document.addEventListener('keydown', onKeyHandler);
			function onKeyHandler(e) {
				if (e.keyCode === 13) {
					document.removeEventListener('keydown', onKeyHandler);
					resolve();
				}
			}
		});
	}
	return (
		<>
			<Row style={{ marginBottom: '2.5em' }} justify="center">
				<Col lg={24} md={20} style={{ padding: '5px' }}>
					<CopyButton
						type="primary"
						onClick={() => {
							createText(selectedReply[currentReplyIndex].paragraphs);
						}}>
						COPY TO CLIPBOARD <CopyOutlined />
					</CopyButton>
				</Col>
			</Row>
			{selectedReply && selectedReply.length > 0 ? (
				<>
					<Row
						style={{ margin: screenLG ? '0 0.5em 0 0.5em' : '0 1.5em 0 1.5em', color: '#606472' }}
						gutter={[0, 8]}
						justify={tablet ? 'center' : 'space-between'}
						align="middle">
						<Col xl={19} lg={18} md={15}>
							<Typography.Paragraph
								style={{ marginBottom: '0', fontSize: '20.2px', fontWeight: '600', lineHeight: '1.4', color: '#606472' }}
								ellipsis={true}>
								{selectedReply[currentReplyIndex].title}
							</Typography.Paragraph>
						</Col>
						<Col xl={5} lg={6} md={5} style={{ paddingTop: screenLG ? '4px' : '1px' }}>
							{selectedReply[currentReplyIndex].favourite ? (
								<Tooltip color="linear-gradient(45deg,#8860d0 ,#8860d0 , #5680e9,#5ab9ea)" title="Un-Favourite">
									<IconSpan>
										<HeartFilled
											style={{ color: 'red', fontSize: '18px' }}
											onClick={(e) => {
												e.stopPropagation();
												changeFav(currentReplyIndex, selectedReply[currentReplyIndex]);
											}}
										/>
									</IconSpan>
								</Tooltip>
							) : (
								<Tooltip color="linear-gradient(45deg,#8860d0 ,#8860d0 , #5680e9,#5ab9ea)" title="Add To Favourites">
									<IconSpan>
										<HeartOutlined
											style={{ fontSize: '18px' }}
											onClick={(e) => {
												e.stopPropagation();
												changeFav(currentReplyIndex, selectedReply[currentReplyIndex]);
											}}
										/>
									</IconSpan>
								</Tooltip>
							)}
							<Tooltip color="linear-gradient(45deg,#8860d0 ,#8860d0 , #5680e9,#5ab9ea)" title="Edit">
								<IconSpanSpaced>
									<EditOutlined
										onClick={(e) => {
											e.stopPropagation();
											edit();
										}}
										style={{ fontSize: '18px' }}
									/>
								</IconSpanSpaced>
							</Tooltip>
						</Col>
						<Col lg={24} md={20}>
							<Row style={{ paddingLeft: '5px' }}>
								<SpanForFolder />
								<Typography.Text style={{ fontSize: '18px', fontWeight: '500', color: '#606472' }}>
									{selectedReply[currentReplyIndex].folder}
								</Typography.Text>
							</Row>
						</Col>
					</Row>
					<Row style={{ margin: screenLG ? '3em 1em' : '0 1em', color: '#606472' }} justify="center">
						<Col lg={24} md={20}>
							<br />
							<Row style={{ fontSize: '16px', lineHeight: '27px' }}>
								<StyledCol>
									<Slate
										editor={editor}
										value={selectedReply[currentReplyIndex].paragraphs}
										onChange={(v) => {
											console.log(v);
										}}>
										<Editable style={{ cursor: 'pointer !important' }} readOnly renderElement={renderElement} />
									</Slate>
								</StyledCol>
							</Row>
						</Col>
					</Row>
				</>
			) : (
				<Row style={{ marginTop: '9em' }} justify="center">
					<Empty
						image={Empty.PRESENTED_IMAGE_SIMPLE}
						imageStyle={{
							height: 60
						}}
						description={<span style={{ fontSize: '18px' }}>Please Select a Reply</span>}
					/>
				</Row>
			)}
			<StyledModal
				title={
					<Heading
						level={3}
						title_color={'#5ab9ea'}
						content={selectedReply && selectedReply[currentReplyIndex] ? selectedReply[currentReplyIndex].title : ''}
						style={{ marginBottom: '0', textAlign: 'center' }}
					/>
				}
				visible={isTextModalVisible}
				afterClose={() => {
					setNewText('');
				}}
				maskClosable={false}
				destroyOnClose={true}
				closable={false}
				onOk={handleTextOk}
				onCancel={handleTextCancel}
				footer={null}>
				<Heading title_color={'#5ab9ea'} content={textQuestion} level={4} style={{ textAlign: 'center' }} />
				<Form initialValues={{ title: '' }}>
					<FormItem name="title">
						<Input
							id="textInput"
							name="title"
							autoFocus
							value={newText}
							onChange={(e) => setNewText(e.target.value)}
							placeholder="Enter Variable Value"
						/>
					</FormItem>
				</Form>
				<Heading
					subheader={
						<span>
							Press Enter <EnterOutlined /> to continue
						</span>
					}
					level={4}
					style={{ textAlign: 'center' }}
				/>
			</StyledModal>
			<StyledModal
				title={
					<Heading
						level={3}
						title_color={'#5ab9ea'}
						content={selectedReply && selectedReply[currentReplyIndex] ? selectedReply[currentReplyIndex].title : ''}
						style={{ marginBottom: '0', textAlign: 'center' }}
					/>
				}
				visible={isSelectModalVisible}
				maskClosable={false}
				destroyOnClose={true}
				closable={false}
				onOk={handleSelectOk}
				onCancel={handleSelectCancel}
				footer={null}>
				<Heading title_color={'#5ab9ea'} content={selectQuestion} level={4} style={{ textAlign: 'center' }} />
				<Row justify="center">
					<Radio.Group name="options" defaultValue={selectOptions[0]} style={{ marginBottom: '15px' }}>
						<Space direction="vertical">
							{selectOptions.map((data, index) => (
								<Radio key={index} value={data}>
									{data}
								</Radio>
							))}
						</Space>
					</Radio.Group>
				</Row>
				<Heading
					subheader={
						<span>
							Press Enter <EnterOutlined /> to continue
						</span>
					}
					level={4}
					style={{ textAlign: 'center' }}
				/>
			</StyledModal>
			<StyledModal
				title={
					<Heading
						level={3}
						title_color={'#5ab9ea'}
						content={selectedReply && selectedReply[currentReplyIndex] ? selectedReply[currentReplyIndex].title : ''}
						style={{ marginBottom: '0', textAlign: 'center' }}
					/>
				}
				visible={isGenderModalVisible}
				maskClosable={false}
				destroyOnClose={true}
				closable={false}
				onOk={handleGenderOk}
				onCancel={handleGenderCancel}
				footer={null}>
				<Heading title_color={'#5ab9ea'} content="Select a gender for the recipient" level={4} style={{ textAlign: 'center' }} />
				<Row justify="center">
					<Radio.Group name="gender" defaultValue={'male'} style={{ marginBottom: '15px' }}>
						<Space direction="vertical">
							<Radio value={'male'}>MALE</Radio>
							<Radio value={'female'}>FEMALE</Radio>
							<Radio value={'neutral'}>NEUTRAL</Radio>
						</Space>
					</Radio.Group>
				</Row>
				<Heading
					subheader={
						<span>
							Press Enter <EnterOutlined /> to continue
						</span>
					}
					level={4}
					style={{ textAlign: 'center' }}
				/>
			</StyledModal>
		</>
	);
}

/*
███████╗████████╗██╗   ██╗██╗     ███████╗███████╗
██╔════╝╚══██╔══╝╚██╗ ██╔╝██║     ██╔════╝██╔════╝
███████╗   ██║    ╚████╔╝ ██║     █████╗  ███████╗
╚════██║   ██║     ╚██╔╝  ██║     ██╔══╝  ╚════██║
███████║   ██║      ██║   ███████╗███████╗███████║
╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚══════╝╚══════╝
*/

const StyledTag = styled(Tag)`
	${'' /* color: linear-gradient(to right, #8860d0, #8860d0, #5680e9, #5ab9ea) !important; */}
	color: #8860d0 !important;
	border: 1px solid #8860d0 !important;
	border-radius: 4px !important;
	font-size: 16px !important;
	padding: 1px 8px 2px 8px !important;
	margin: 0 2px !important;
	cursor: default !important;
	-webkit-touch-callout: none !important;
	-webkit-user-select: none !important;
	-khtml-user-select: none !important;
	-moz-user-select: none !important;
	-ms-user-select: none !important;
	user-select: none !important;
	.val {
		background: -webkit-linear-gradient(45deg, #8860d0, #8860d0, #5680e9, #5ab9ea) !important;
		-webkit-background-clip: text !important;
		-webkit-text-fill-color: transparent !important;
	}
	&:hover {
		background-image: linear-gradient(to right, #8860d0, #8860d0, #5680e9, #5ab9ea) !important;
		color: #fff !important;
		border: none !important;
		transform: scale(1.05);
		.val {
			background: -webkit-linear-gradient(45deg, #fff, #fff) !important;
			-webkit-background-clip: text !important;
			-webkit-text-fill-color: transparent !important;
			${'' /* color: #fff !important; */}
		}
	}
`;

const IconSpan = styled.span`
	z-index: 1;
	padding: 8px 7px 4px 7px;
	border-radius: 8px;
	margin: 0 1px;
	&:hover {
		background-color: #e0e3f1 !important;
		border: 1px solid #5ab9ea;
		margin: 0;
	}
`;

const IconSpanSpaced = styled(IconSpan)`
	margin: 0 1px 0 12px;
	&:hover {
		margin: 0 0 0 11px;
	}
`;

const SpanForFolder = styled.span`
	background-color: #8860d0;
	height: 7px;
	width: 7px;
	border-radius: 50%;
	margin: 11px 10px 11px 5px;
`;

const StyledCol = styled(Col)`
	overflow-y: scroll;
	height: 45vh;
	cursor: default;
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
`;

const CopyButton = styled(Button)`
	width: 100%;
	height: 50px !important;
	font-size: 19px !important;
	font-weight: 700 !important;
	background: linear-gradient(to right, #8860d0, #8860d0, #5680e9, #5ab9ea) !important;
	border: none !important;
	border-radius: 8px;
	&:hover {
		transform: scale(1.03);
	}
`;

const StyledModal = styled(Modal)`
	top: 30% !important;
	.ant-modal-header {
		border-radius: 8px !important;
		padding: 22px 30px !important;
	}
	.ant-modal-body {
		padding: 20px 40px !important;
	}
	.ant-modal-content {
		border-radius: 8px !important;
	}
	.subheader {
		font-weight: 400 !important;
	}
`;

const FormItem = styled(Form.Item)`
	margin-bottom: 0 !important;
	input {
		margin: 10px 0px !important;
		line-height: 30px !important;
		font-size: 16px !important;
	}
`;
