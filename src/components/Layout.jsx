import React, { useState } from 'react';
import { HomeOutlined, MenuOutlined } from '@ant-design/icons';
import { Layout as PageLayout, Breadcrumb, Button, Affix } from 'antd';
import styled from 'styled-components';
import { media } from 'helpers';
import { Section } from './Section';
import Footer from './Footer';
import Navbar from './Navbar';

const Header = styled(PageLayout.Header)`
	&& {
		background-color: #fff;
		height: auto;
		padding: 0;
		${media.mobile`
            height: auto;
        `}
	}
`;

function Layout({ breadcrumb = false, customBread = '', className, ...props }) {
	const { basic = false, sidebar = false, children, footer = true } = props;

	return (
		<PageLayoutStyled className={className || ''}>
			<Header>
				<Navbar loading={props.loading} onUnauthUser={props.unauthUser} language={props.language} />
			</Header>

			<PageLayout.Content>
				<PageLayout>
					<PageLayout>
						<PageLayout.Content>{children}</PageLayout.Content>
						{(footer || sidebar) && <Footer />}
					</PageLayout>
				</PageLayout>
			</PageLayout.Content>
		</PageLayoutStyled>
	);
}

export default Layout;

const PageLayoutStyled = styled(PageLayout)`
	padding-top: 76.5px;

	${media.mobile`
	padding-top:48px;

	`}
`;
