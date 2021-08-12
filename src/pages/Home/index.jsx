/* eslint-disable no-debugger */
import React, { useContext, useEffect, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router';
import { Layout } from 'components';
import '@ant-design/compatible/assets/index.css';
import { Row, Col } from 'antd';
import { baseStyles } from 'styles/base';

// import { withI18n } from '@lingui/react';

function Home({ history, i18n, language }) {
	return (
		<Layout breadcrumb={false} language={language}>
			<Row style={{ height: '900px' }}>
				<span className="primary">hello</span>
			</Row>
		</Layout>
	);
}

// prettier-ignore
export default (withRouter(Home))

/*
███████╗████████╗██╗   ██╗██╗     ███████╗███████╗
██╔════╝╚══██╔══╝╚██╗ ██╔╝██║     ██╔════╝██╔════╝
███████╗   ██║    ╚████╔╝ ██║     █████╗  ███████╗
╚════██║   ██║     ╚██╔╝  ██║     ██╔══╝  ╚════██║
███████║   ██║      ██║   ███████╗███████╗███████║
╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚══════╝╚══════╝
*/
