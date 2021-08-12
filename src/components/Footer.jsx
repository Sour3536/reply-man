import React from 'react';
import { Select, Col, Layout, Row, Typography } from 'antd';
import { CopyrightCircleOutlined, FacebookFilled, LinkedinFilled, TwitterOutlined, YoutubeFilled } from '@ant-design/icons';
// import { Link } from "react-router-dom"
// import Logo from './Logo';
// import { Trans } from '@lingui/macro';
import '@ant-design/compatible/assets/index.css';
import styled from 'styled-components';
import { baseStyles } from 'styles/base';
import { mobile, tablet, media, screenLG } from 'helpers';
// import { countries, countryMap } from 'helpers/countryMapping';
// import DynamicIcon from './common/DynamicIcon';

const StyledFooter = styled(Layout.Footer)`
	&& {
		padding: 3em;
		border-top: 1px solid #ddd;
		background-color: #fff;
		a {
			color: ${baseStyles.greyColor};
		}
	}
	${media.mobile`
		padding: 2em !important;
	`}
`;
const StyledSpan = styled.span`
	font-size: 20px;
	border-radius: 50%;
	height: 35px;
	width: 35px;
	background: ${baseStyles.greyColor};
	color: #fff;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	margin-left: 20px;
	&:hover {
		background: ${({ bg }) => bg || `${baseStyles.greyColor}`};
	}
	@media only screen and (min-width: 1024px) and (max-height: 1366px) and (-webkit-min-device-pixel-ratio: 1.5) {
		margin-left: 10px;
	}
	${media.mobile`
		margin-left: 10px;
	`}
`;
const products = [
	{ link: '', label: 'WorkFlow' },
	{ link: '', label: 'WorkLeads' },
	{ link: '', label: 'WorkMail' },
	{ link: '', label: 'WorkReview' },
	{ link: '', label: 'WorkMeet' }
	// { link: '', label: 'WorkEngage' },
	// { link: '', label: 'WorkReply' }
];
const resources = [
	{ link: 'https://learn.cudy.co', label: 'Teaching Methodology' },
	{ link: 'https://blog.cudy.co', label: 'Blog' },
	{ link: 'https://community.cudy.co', label: 'Community Forum' },
	{ link: 'https://events.cudy.co', label: 'Events' },
	{ link: 'https://college.cudy.co', label: 'Study Overseas' },
	{ link: 'https://services.cudy.co', label: 'Freelance Business Services' },
	{ link: 'https://lms.cudy.co', label: 'Learning Management System Solution' },
	{ link: 'https://support.cudy.co', label: 'Customer Support' },
	{ link: 'https://dispute.cudy.co', label: 'Dispute Resolution Centre' },
	{ link: 'https://status.cudy.co', label: 'Website status' },
	{ link: 'https://status.cudy.co', label: 'Sitemap' }
];
const policies = [
	{ link: 'https://standards.cudy.co', label: 'Community Standards' },
	{ link: 'https://policy.cudy.co/terms', label: 'Terms of Service' },
	{ link: 'https://policy.cudy.co/privacy', label: 'Privacy Policy' },
	{ link: 'https://policy.cudy.co/trust-safety', label: 'Trust & Safety' }
];
const company = [
	{ link: 'https://story.cudy.co', label: 'About Us' },
	{ link: 'https://career.cudy.co', label: 'Careers' },
	{ link: 'https://investors.cudy.co', label: 'Investor Relations' },
	{ link: 'https://story.cudy.co/press', label: 'Press' },
	{ link: 'https://teespring.com/stores/cudy', label: 'Merchandise' }
];
const followUs = [
	{ link: 'https://www.instagram.com/cudy_id', label: 'Instagram (ID)' },
	{ link: 'https://www.instagram.com/cudy_sg', label: 'Instagram' },
	{ link: 'https://www.twitter.com/cudy_sg', label: 'Twitter' },
	{ link: 'https://www.facebook.com/cudysingapore', label: 'Facebook' },
	{ link: 'https://www.youtube.com/channel/UC9oOamvPbKq4UI7Vy6xJICQ', label: 'Youtube' },
	{ link: 'https://www.linkedin.com/company/cudy', label: 'Linkedin' }
];
const beWithUs = [
	{ link: '', label: 'Sign In (Free)' },
	{ link: '', label: 'Sign Up' },
	{ link: '', label: 'Contact Us' },
	{ link: '', label: 'Get Help' },
	{ link: '', label: 'How to Start' }
];

const { Paragraph, Text } = Typography;
const StyledParagraph = styled(Paragraph)`
	font-size: 16px;
	margin-bottom: 0.5em !important;
	${media.mobile`
		font-size: 14px;
	`}
`;

export default function Footer() {
	return (
		<StyledFooter>
			<Row gutter={[32, { md: 32, xs: 0 }]} justify="center" style={{ padding: mobile ? '0' : screenLG ? '0 1rem' : '0 1.5rem' }}>
				<Col lg={8} md={24} order={mobile ? 5 : null}>
					<Typography.Title level={mobile ? 5 : 4} style={{ marginBottom: '.5em' }}>
						About WorkDeputy
					</Typography.Title>
					<Paragraph type="secondary" className={mobile ? 'mb1em' : 'mb2em'} style={{ fontSize: mobile ? '14px' : '16px' }}>
						WorkDeputy is an online platform that allows small business owners and entrepreneurs to automate their business processes so
						they can focus on their core competencies. WorkDeputy is the leading provider of workflow automation, robotic process
						automation, and virtual assistants.
					</Paragraph>
					<hr />
					{/* <Logo width={160} isCudyTech /> */}
					<Paragraph type="secondary" className="mb1em" style={{ fontSize: mobile ? '14px' : '16px' }}>
						<CopyrightCircleOutlined /> 2021 WorkDeputy &middot; All rights reserved.
					</Paragraph>
					{!tablet && (
						<Row align="middle" style={{ marginTop: mobile && '2em' }}>
							<Typography.Title level={mobile ? 5 : 4} style={{ marginBottom: '0', display: 'inline' }}>
								Follow Us
							</Typography.Title>
							<StyledSpan bg="#3c589a">
								<FacebookFilled />
							</StyledSpan>
							<StyledSpan bg="#107ab6">
								<LinkedinFilled />
							</StyledSpan>
							<StyledSpan bg="#5eaade">
								<TwitterOutlined />
							</StyledSpan>
							<StyledSpan bg="#ff0000">
								<YoutubeFilled />
							</StyledSpan>
						</Row>
					)}
				</Col>
				<Col lg={4} md={12} xs={12} className={mobile ? 'mb2em' : null}>
					<Typography>
						<Typography.Title level={mobile ? 5 : 4} style={{ marginBottom: '.5em' }}>
							Policies
						</Typography.Title>
						{policies.map((item, i) => (
							<StyledParagraph key={item.link + Math.random()}>
								<a href={item.link} target="_blank" rel="noopener noreferrer">
									{item.label}
								</a>
							</StyledParagraph>
						))}
						<>
							{/* <StyledParagraph style={{ marginTop: '3rem' }}>Change Country</StyledParagraph> */}
							{/* <Select
								name="language"
								style={{ display: 'flex', alignItems: 'center' }}
								value={localStorage.getItem('country') || 'sg'}>
								{countries.map((item) => (
									<Select.Option key={item.key} value={item.key}>
										<DynamicIcon type={item.icon} size={16} />
										&nbsp; &nbsp; {item.name}
									</Select.Option>
								))}
							</Select> */}
						</>
					</Typography>
				</Col>
				<Col lg={4} md={12} xs={12} className={mobile ? 'mb2em' : null}>
					<Typography>
						<Typography.Title level={mobile ? 5 : 4} style={{ marginBottom: '.5em' }}>
							Products
						</Typography.Title>
						{products.map((item, i) => (
							<StyledParagraph key={item.link + Math.random()}>
								<a href={item.link} target="_blank" rel="noopener noreferrer">
									{item.label}
								</a>
							</StyledParagraph>
						))}
					</Typography>
				</Col>
				<Col lg={4} md={12} xs={12} className={mobile ? 'mb2em' : null}>
					<Typography>
						<Typography.Title level={mobile ? 5 : 4} style={{ marginBottom: '.5em' }}>
							Company
						</Typography.Title>
						{company.map((item, i) => (
							<StyledParagraph key={item.link + Math.random()}>
								<a href={item.link} target="_blank" rel="noopener noreferrer">
									{item.label}
								</a>
							</StyledParagraph>
						))}
					</Typography>
				</Col>
				{/* <Col lg={4} xs={12} className={mobile ? 'mb2em' : null}>
					<Typography>
						<Typography.Title level={4} style={{ marginBottom: '.5em' }}>
							Follow us
						</Typography.Title>
						{followUs.map((item, i) => (
							<StyledParagraph key={item.link + Math.random()}>
								<a href={item.link} target="_blank" rel="noopener noreferrer">
									{item.label}
								</a>
							</StyledParagraph>
						))}
					</Typography>
				</Col> */}
				<Col lg={4} md={12} xs={12} className={mobile ? 'mb2em' : null}>
					<Typography>
						<Typography.Title level={mobile ? 5 : 4} style={{ marginBottom: '.5em' }}>
							Be With Us
						</Typography.Title>
						{beWithUs.map((item, i) => (
							<StyledParagraph key={item.link + Math.random()}>
								<a href={item.link} target="_blank" rel="noopener noreferrer">
									{item.label}
								</a>
							</StyledParagraph>
						))}
					</Typography>
				</Col>
			</Row>
			{tablet && (
				<Row align="middle" style={{ marginTop: '2em', padding: screenLG ? '0 1rem' : '0 1.5rem' }}>
					<Typography.Title level={4} style={{ marginBottom: '0', display: 'inline' }}>
						Follow Us
					</Typography.Title>
					<StyledSpan bg="#3c589a">
						<FacebookFilled />
					</StyledSpan>
					<StyledSpan bg="#107ab6">
						<LinkedinFilled />
					</StyledSpan>
					<StyledSpan bg="#5eaade">
						<TwitterOutlined />
					</StyledSpan>
					<StyledSpan bg="#ff0000">
						<YoutubeFilled />
					</StyledSpan>
				</Row>
			)}
		</StyledFooter>
	);
}
