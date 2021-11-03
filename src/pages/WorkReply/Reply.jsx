/* eslint-disable no-debugger */
import React, { useContext, useEffect, useState } from 'react';
import { Layout, Section, Heading, InputSearch, Button } from 'components';
import { LinkOutlined, CopyOutlined, HeartFilled, HeartOutlined, EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import '@ant-design/compatible/assets/index.css';
import { Row, Tag, Col, message, Tooltip, Typography, Empty } from 'antd';
import { media, mobile, tablet, screenLG } from 'helpers';
import { baseStyles } from 'styles/base';
import { my_variables } from './data';

function copyToClipboard(text) {
	var dummy = document.createElement('textarea');
	document.body.appendChild(dummy);
	dummy.innerHTML = text;
	dummy.select();
	document.execCommand('copy');
	document.body.removeChild(dummy);
}

export default function Reply({ selectedReply, currentReplyIndex, changeFav, ...props }) {
	const createText = (e) => {
		var dummy = '';
		e.forEach((data) => {
			if (data.value === '') {
				dummy += '\n';
			} else if (data.type === 'variable') {
				switch (data.value) {
					case 'Your First Name':
						dummy += my_variables.first_name;
						break;
					default:
						console.log(data.value);
						break;
				}
			} else {
				dummy += data.value.toString();
			}
		});
		console.log(dummy);
		return dummy;
	};
	return (
		<>
			<Row style={{ marginBottom: '3.5em' }} justify="center">
				<Col lg={24} md={20} style={{ padding: '5px' }}>
					<Button
						type="primary"
						style={{
							width: '100%',
							height: '50px',
							fontSize: '19px',
							fontWeight: '700',
							background: 'linear-gradient(to right, #8860d0 ,#8860d0 , #5680e9,#5ab9ea)',
							border: 'none',
							borderRadius: '8px'
						}}
						onClick={() => {
							var text = createText(selectedReply[currentReplyIndex].paragraphs);
							copyToClipboard(text);
							message.success('Copied to your Clipboard.');
						}}>
						COPY TO CLIPBOARD <CopyOutlined />
					</Button>
				</Col>
			</Row>
			{selectedReply && selectedReply.length > 0 ? (
				<>
					<Row
						style={{ margin: screenLG ? '0 0.5em 0 0.5em' : '0 1.5em 0 1em', color: '#606472' }}
						gutter={[0, 8]}
						justify={tablet ? 'center' : 'space-between'}
						align="middle">
						<Col lg={18} md={15}>
							<Typography.Paragraph
								style={{ marginBottom: '0', fontSize: '21px', fontWeight: '600', lineHeight: '1.4', color: '#606472' }}
								ellipsis={true}>
								{selectedReply[currentReplyIndex].title}
							</Typography.Paragraph>
						</Col>
						<Col xl={5} lg={6} md={5} style={{ paddingTop: screenLG ? '4px' : '1px' }}>
							{selectedReply[currentReplyIndex].favourite ? (
								<Tooltip color="linear-gradient(45deg,#8860d0 ,#8860d0 , #5680e9,#5ab9ea)" title="Un-Favourite">
									<IconSpan>
										<HeartFilled
											style={{ color: 'red', fontSize: '20px' }}
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
											style={{ fontSize: '20px' }}
											onClick={(e) => {
												e.stopPropagation();
												changeFav(currentReplyIndex, selectedReply[currentReplyIndex]);
											}}
										/>
									</IconSpan>
								</Tooltip>
							)}
							<Tooltip color="linear-gradient(45deg,#8860d0 ,#8860d0 , #5680e9,#5ab9ea)" title="Edit">
								<IconSpan style={{ marginLeft: screenLG ? '4px' : '8px' }}>
									<EditOutlined style={{ fontSize: '20px' }} />
								</IconSpan>
							</Tooltip>
						</Col>
						<Col lg={24} md={20}>
							<Row style={{ paddingLeft: '5px' }}>
								<SpanForFolder />
								<Typography.Text style={{ fontSize: '19px', fontWeight: '500', color: '#606472' }}>
									{selectedReply[currentReplyIndex].folder}
								</Typography.Text>
							</Row>
						</Col>
					</Row>
					<Row style={{ margin: screenLG ? '3em 1em' : '3em 1em', color: '#606472' }} justify="center">
						<Col lg={24} md={20}>
							<br />
							<Row style={{ fontSize: '18px', lineHeight: '30px' }}>
								<Col>
									{selectedReply[currentReplyIndex].paragraphs.map((data, index) =>
										data.value === '' ? (
											<br />
										) : data.type === 'variable' ? (
											<>
												<StyledTag icon={<LinkOutlined />}>
													<span className="val">
														<b>{data.value}</b>
													</span>
												</StyledTag>
											</>
										) : (
											<span key={index}>{data.value}</span>
										)
									)}
								</Col>
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
	padding: 3px 12px !important;
	margin: 0 5px !important;
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
	padding: 5px 8px;
	border-radius: 8px;
	&:hover {
		background-color: #adb4ff !important;
	}
`;

const SpanForFolder = styled.span`
	background-color: #8860d0;
	height: 7px;
	width: 7px;
	border-radius: 50%;
	margin: 11px 10px 11px 5px;
`;
