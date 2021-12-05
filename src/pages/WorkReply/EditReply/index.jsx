import React, { useContext, useMemo, useEffect, useState, useCallback, useRef } from 'react';
import { createEditor, Transforms } from 'slate';
import { Slate, Editable, withReact, withMarkdownShortcuts, withEmojis } from 'slate-react';
import { LinkOutlined, FolderOutlined, RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router';
import { Layout, Section, Heading, InputSearch, Card } from 'components';
import styled from 'styled-components';
import '@ant-design/compatible/assets/index.css';
import { Row, Select, Col, BackTop, Button, Input, Tag, Collapse, Badge, message } from 'antd';
import { media, mobile, tablet, screenLG } from 'helpers';
import { baseStyles } from 'styles/base';
import { replies } from '../data';

const StyledSpan = styled.span`
	color: #888;
	cursor: pointer;
	margin-left: 5px;
	margin-right: 5px;
	&:hover {
		color: #5800ff;
	}
`;
const { Panel } = Collapse;
const StyledCollapse = styled(Collapse)`
	&& {
		background-color: transparent;
		.ant-collapse-item {
			padding-bottom: 0.5em;
			margin-bottom: 1em;
			.ant-collapse-content-box {
				padding: 0;
			}
			.ant-radio-wrapper {
				white-space: pre;
				overflow-x: hidden;
				text-overflow: ellipsis;
			}
			.ant-radio-group {
				max-width: 100%;
			}
			.ant-collapse-header {
				padding: 0.2em 0;
				.ant-collapse-arrow {
					right: 0;
				}
			}
		}
	}
`;

function EditReply({ language }) {
	const editor = useMemo(() => withReact(createEditor()), []);
	const [value, setValue] = useState([
		{
			type: 'paragraph',
			children: [
				{
					text: 'Text with a link '
				},
				{
					type: 'variable',
					children: [
						{
							text: 'Your First Name'
						}
					]
				},
				{
					text: 'here'
				}
			]
		},
		{
			type: 'paragraph',
			children: [
				{
					text: ''
				}
			]
		},
		{
			type: 'paragraph',
			children: [
				{
					text: 'Here you can make replies that may help you.'
				}
			]
		}
	]);
	const [titleVal, setTitleVal] = useState(replies.General[0].title);
	const setTitle = (e) => {
		setTitleVal(e.target.value);
	};
	const renderElement = useCallback(({ attributes, children, element }) => {
		switch (element.type) {
			case 'variable':
				return (
					<StyledTag {...attributes} icon={<LinkOutlined />} contentEditable={false}>
						{children}
					</StyledTag>
				);
			default:
				return <p {...attributes}>{children}</p>;
		}
	}, []);
	return (
		<Layout breadcrumb={false} language={language}>
			<BackTop />
			<Section className="pos-rel">
				<MainRow gutter={[{ xl: 32, lg: 16, md: 16 }, 24]} align="top" margintop="0" style={{ paddingTop: '1em' }}>
					<Col lg={15} md={24}>
						<Row justify="center">
							<StyledCol span={24}>
								<Row gutter={24}>
									<Col lg={2} style={{ paddingLeft: '0', paddingRight: '0' }}>
										<BackIcon>
											<RollbackOutlined style={{ fontSize: '22px', lineHeight: '50px' }} />
										</BackIcon>
									</Col>
									<Col lg={16} style={{ paddingLeft: '2px' }}>
										<Input
											autoFocus
											value={titleVal}
											onChange={(e) => {
												setTitle(e);
											}}
											style={{ height: '50px', fontSize: '22px' }}
										/>
									</Col>
									<Col lg={6}>
										<Button
											type="primary"
											style={{ height: '50px', fontSize: '20px', width: '100%' }}
											onClick={() => {
												console.log(editor);
												if (editor.selection !== null && editor.selection.anchor !== null) {
													console.log(editor.children[editor.selection.anchor.path[0]]);
												} else {
													console.log('hello');
												}
												// editor.insertBreak();
												// editor.insertText('paragraph');
												// editor.insertInline(<StyledTag icon={<LinkOutlined />}>hello</StyledTag>);
											}}>
											<SaveOutlined />
											&nbsp;Save Reply
										</Button>
									</Col>
								</Row>
								<hr style={{ margin: '1.2em 0' }} />
								<Row justify="end">
									<Col className="ta-center">
										<Row>
											<span style={{ fontSize: '17px', color: baseStyles.greyColor, marginLeft: '15px' }}>
												Select Folder <FolderOutlined />
												&nbsp;&nbsp;&nbsp;
											</span>
										</Row>
										<Row style={{ marginTop: '4px' }}>
											<Select defaultValue="General" style={{ width: 150, color: baseStyles.greyColor, fontSize: '16px' }}>
												{Object.keys(replies).map((key, index) => (
													<Select.Option value={key} key={index}>
														{key}
													</Select.Option>
												))}
											</Select>
										</Row>
									</Col>
								</Row>
								{/* <Row style={{ marginTop: '1em', fontSize: '17px' }}>
									<Col>
										{replies.General[0].paragraphs.map((data, index) =>
											data.value === '' ? (
												<br />
											) : data.type === 'variable' ? (
												<>
													<StyledTag icon={<LinkOutlined />} key={index}>
														{data.value}
													</StyledTag>
												</>
											) : (
												<span key={index}>{data.value}</span>
											)
										)}
									</Col>
								</Row> */}
								<Row style={{ marginTop: '1em', fontSize: '17px' }}>
									<Slate
										editor={editor}
										value={value}
										onChange={(v) => {
											console.log(v);
											setValue(v);
										}}>
										<Editable
											renderElement={renderElement}
											// renderElement={({ element, attributes, children }) => {
											// 	switch (element.type) {
											// 		case 'variable':
											// 			return (
											// 				<>
											// 					<StyledTag icon={<LinkOutlined />} contentEditable={false} {...attributes}>
											// 						{children}
											// 					</StyledTag>
											// 				</>
											// 			);
											// 		default:
											// 			return <p {...attributes}>{children}</p>;
											// 	}
											// }}
											onKeyDown={(event) => {
												if (event.key === 'Backspace') {
													event.preventDefault();
													if (editor.selection !== null && editor.selection.anchor !== null) {
														const paraNum = editor.selection.anchor.path[0];
														const subParaNum = editor.selection.anchor.path[1];
														let length = value[paraNum].length;
														const currentPara = value[paraNum];
														if (currentPara.children[subParaNum].text === '') {
															Transforms.removeNodes(editor);
														} else if (currentPara.children[subParaNum].type && currentPara.children[subParaNum].type === 'variable') {
															Transforms.removeNodes(editor);
														} else if (editor.selection.anchor.offset === 0) {
															if (currentPara.children[subParaNum - 1].type && currentPara.children[subParaNum - 1].type === 'variable') {
																Transforms.select(editor, { path: [paraNum, subParaNum - 1], offset: 0 });
																Transforms.removeNodes(editor);
															}
														}
														// else if (
														// 	editor.selection.anchor.offset === 1 &&
														// 	editor.children[editor.selection.anchor.path[0]].children[0].text.length === 1
														// ) {
														// 	event.preventDefault();
														// 	Transforms.removeNodes(editor);
														// }
													}
												} else if (event.key === 'Delete') {
													if (editor.selection !== null && editor.selection.anchor !== null) {
														if (editor.children[editor.selection.anchor.path[0]].type === 'variable') {
															event.preventDefault();
															Transforms.removeNodes(editor);
														} else if (
															editor.selection.anchor.offset === editor.children[editor.selection.anchor.path[0]].children[0].text.length
														) {
															if (
																editor.children[editor.selection.anchor.path[0] + 1] &&
																editor.children[editor.selection.anchor.path[0] + 1].type === 'variable'
															) {
																event.preventDefault();
																Transforms.select(editor, { path: [editor.selection.anchor.path[0] + 1, 0], offset: 0 });
															}
														}
													}
												}
											}}
										/>
									</Slate>
								</Row>
							</StyledCol>
						</Row>
					</Col>
					<Col lg={9} md={24}>
						<Row justify="center">
							<StyledCol span={24}>
								<StyledCollapse bordered={false} expandIconPosition="right" defaultActiveKey={['1', '2', '3']}>
									<Panel
										header={
											<Heading
												level={3}
												content="General Variables"
												subheader={
													<span style={{ fontSize: '16px' }}>General Variables are automatically filled in when you copy the reply.</span>
												}
												style={{ marginBottom: '0' }}
											/>
										}
										key="1">
										<Row style={{ margin: '.5em 0' }}>
											<StyledTag
												onClick={(event) => {
													if (editor.selection !== null && editor.selection.anchor !== null) {
														const paraNum = editor.selection.anchor.path[0];
														const subParaNum = editor.selection.anchor.path[1];
														let length = value[paraNum].length;
														const currentPara = value[paraNum];
														if (editor.selection.anchor.offset === 0) {
															const before = currentPara.children.slice(0, subParaNum);
															const after = currentPara.children.slice(subParaNum, length);
															const newPara = {
																type: 'paragraph',
																children: [
																	...before,
																	{
																		type: 'variable',
																		children: [
																			{
																				text: 'Your First Name'
																			}
																		]
																	},
																	...after
																]
															};
															setValue([...value.slice(0, paraNum), newPara, ...value.slice(paraNum + 1, length)]);
														} else if (editor.selection.anchor.offset === value[paraNum].children[subParaNum].text.length) {
															const before = currentPara.children.slice(0, subParaNum + 1);
															const after = currentPara.children.slice(subParaNum + 1, length);
															const newPara = {
																type: 'paragraph',
																children: [
																	...before,
																	{
																		type: 'variable',
																		children: [
																			{
																				text: 'Your First Name'
																			}
																		]
																	},
																	...after
																]
															};
															setValue([...value.slice(0, paraNum), newPara, ...value.slice(paraNum + 1, length)]);
														} else {
															const before = currentPara.children.slice(0, subParaNum);
															const after = currentPara.children.slice(subParaNum + 1, length);
															const beforeSelection = currentPara.children[subParaNum].text.substring(0, editor.selection.anchor.offset);
															const afterSelection = currentPara.children[subParaNum].text.substring(editor.selection.anchor.offset);
															const newPara = {
																type: 'paragraph',
																children: [
																	...before,
																	{
																		text: beforeSelection
																	},
																	{
																		type: 'variable',
																		children: [
																			{
																				text: 'Your First Name'
																			}
																		]
																	},
																	{
																		text: afterSelection
																	},
																	...after
																]
															};
															setValue([...value.slice(0, paraNum), newPara, ...value.slice(paraNum + 1, length)]);
														}
													}
												}}>
												Your First Name
											</StyledTag>
											<StyledTag>Your Last Name</StyledTag>
											<StyledTag>Your Full Name</StyledTag>
											<StyledTag>Your Address</StyledTag>
											<StyledTag>Your Email</StyledTag>
											<StyledTag>Your Role</StyledTag>
											<StyledTag>Your Company</StyledTag>
										</Row>
									</Panel>
									<Panel
										header={
											<Heading
												level={3}
												content="Dynamic Variables"
												subheader={
													<span style={{ fontSize: '16px' }}>Dynamic Variables change on thier own based on current situation.</span>
												}
												style={{ marginBottom: '0' }}
											/>
										}
										key="2">
										<Row style={{ margin: '.5em 0' }}>
											<StyledTag>Date</StyledTag>
											<StyledTag>Time</StyledTag>
											<StyledTag>Local TimeZone</StyledTag>
										</Row>
									</Panel>
									<Panel
										header={
											<Heading
												level={3}
												content="Custom Variables"
												subheader={
													<span style={{ fontSize: '16px' }}>
														Custom Variables are replaced at the last moment in context with your input/select.
													</span>
												}
												style={{ marginBottom: '0' }}
											/>
										}
										key="3">
										<Row style={{ margin: '.5em 0' }}>
											<StyledTag>Gender Conditional</StyledTag>
											<StyledTag>DayTime Conditional</StyledTag>
											<StyledTag>Text Input</StyledTag>
											<StyledTag>Select</StyledTag>
										</Row>
									</Panel>
								</StyledCollapse>
							</StyledCol>
						</Row>
					</Col>
				</MainRow>
			</Section>
		</Layout>
	);
}

// prettier-ignore
export default (withRouter(EditReply))

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
	padding-left: ${({ pl }) => pl || '4rem'};
	padding-right: ${({ pr }) => pr || '4rem'};
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

const StyledTag = styled(Tag)`
	color: #8860d0 !important;
	border: 1px solid #8860d0 !important;
	border-radius: 4px !important;
	font-size: 16px !important;
	padding: 4px 14px !important;
	margin: 8px !important;
	cursor: pointer !important;
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
		}
	}
`;

const BackIcon = styled.span`
	z-index: 1;
	padding: 8px;
	border-radius: 10px;
	cursor: pointer;
	margin-left: 15px;
	&:hover {
		background-color: #ccc !important;
	}
`;

const StyledCol = styled(Col)`
	overflow-y: scroll;
	background-color: #fff;
	box-shadow: ${baseStyles.boxShadow.mild};
	border-radius: 8px;
	height: 80vh;
	padding: 2em;
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
