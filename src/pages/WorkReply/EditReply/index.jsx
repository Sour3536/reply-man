/* eslint-disable no-debugger */
import React, { useContext, useEffect, useState } from 'react';
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

function EditReply({ history, language }) {
	const [titleVal, setTitleVal] = useState(replies.General[0].title);
	const setTitle = (e) => {
		setTitleVal(e.target.value);
	};
	return (
		<Layout breadcrumb={false} language={language}>
			<BackTop />
			<Section className="pos-rel">
				<MainRow gutter={[{ xl: 32, lg: 16, md: 16 }, 24]} align="top" margintop="0" style={{ paddingTop: '1em' }}>
					<Col lg={15} md={24}>
						<Row justify="center">
							<StyledCol span={24}>
								<Row gutter={24}>
									<Col lg={2}>
										<BackIcon>
											<RollbackOutlined style={{ fontSize: '22px', lineHeight: '50px' }} />
										</BackIcon>
									</Col>
									<Col lg={16}>
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
										<Button type="primary" style={{ height: '50px', fontSize: '20px', width: '100%' }}>
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
								<Row style={{ marginTop: '1em', fontSize: '17px' }}>
									<Col>
										{replies.General[0].paragraphs.map((data, index) =>
											data.value === '' ? (
												<br />
											) : data.type === 'variable' ? (
												<>
													<StyledTag icon={<LinkOutlined />}>{data.value}</StyledTag>
												</>
											) : (
												<span key={index}>{data.value}</span>
											)
										)}
									</Col>
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
											<StyledTag>Your First Name</StyledTag>
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
	color: #5800ff !important;
	border: 1px solid #5800ff !important;
	border-radius: 4px !important;
	font-size: 17px !important;
	padding: 4px 14px !important;
	margin: 8px !important;
	cursor: pointer !important;
	&:hover {
		background-color: rgba(88, 0, 255, 0.2) !important;
		transform: scale(1.05);
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
