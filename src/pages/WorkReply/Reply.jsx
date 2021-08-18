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
				<Col lg={24} md={20}>
					<Button
						type="primary"
						style={{ width: '100%', height: '50px', fontSize: '19px', fontWeight: '700' }}
						onClick={() => {
							var text = createText(selectedReply[currentReplyIndex].paragraphs);
							copyToClipboard(text);
							message.success('Copied to your Clipboard.');
						}}>
						Copy to Clipboard <CopyOutlined />
					</Button>
				</Col>
			</Row>
			{selectedReply && selectedReply.length > 0 ? (
				<>
					<Row
						style={{ margin: screenLG ? '0 0.5em 0 0.5em' : '0 2.5em 0 1.5em' }}
						gutter={[0, 8]}
						justify={tablet ? 'center' : 'space-between'}
						align="middle">
						<Col lg={18} md={15}>
							<Typography.Paragraph style={{ marginBottom: '0', fontSize: '20px', fontWeight: '600', lineHeight: '1.4' }} ellipsis={true}>
								{selectedReply[currentReplyIndex].title}
							</Typography.Paragraph>
						</Col>
						<Col xl={5} lg={6} md={5} style={{ paddingTop: screenLG ? '4px' : '1px' }}>
							{selectedReply[currentReplyIndex].favourite ? (
								<Tooltip color="#5800ff" title="Un-Favourite">
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
								<Tooltip color="#5800ff" title="Add To Favourites">
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
							<IconSpan style={{ marginLeft: screenLG ? '4px' : '8px' }}>
								<EditOutlined style={{ fontSize: '20px' }} />
							</IconSpan>
						</Col>
						<Col lg={24} md={20}>
							<Row style={{ paddingLeft: '5px' }}>
								<SpanForFolder />
								<Typography.Text style={{ fontSize: '17px', fontWeight: '500' }}>{selectedReply[currentReplyIndex].folder}</Typography.Text>
							</Row>
						</Col>
					</Row>
					<Row style={{ margin: screenLG ? '3em 1em' : '3em 1.5em' }} justify="center">
						<Col lg={24} md={20}>
							<br />
							<Row style={{ fontSize: '17px' }}>
								<Col>
									{selectedReply[currentReplyIndex].paragraphs.map((data, index) =>
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
	color: #5800ff !important;
	border: 1px solid #5800ff !important;
	border-radius: 4px !important;
	font-size: 16px !important;
	padding: 3px 12px !important;
	margin: 0 5px !important;
	cursor: default !important;
	&:hover {
		background-color: #5800ff !important;
		color: #fff !important;
		transform: scale(1.05);
	}
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
