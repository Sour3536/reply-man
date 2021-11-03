import React from 'react';
import { Drawer, Col, Row, Rate, Typography, Popconfirm, Tooltip, Form, Input } from 'antd';
import { Button, InputSearch } from 'components';
import { mobile, media, tablet } from 'helpers';
import styled from 'styled-components';

export default function MenuDrawer({ onClose, isAdding, visible, reviews, ...props }) {
	return (
		<Drawer title={'Menu'} placement="right" onClose={onClose} visible={visible} width={320}>
			<UnloggedinItems>
				<Button type="ghost" size="default" block={mobile}>
					Login
				</Button>
				&nbsp; &nbsp;
				<Button type="primary" size="default" block={mobile}>
					Sign up
				</Button>
			</UnloggedinItems>
			<InputSearch width="95%" height="35px" size="middle" placeholder="Search for here" />
		</Drawer>
	);
}

const UnloggedinItems = styled.div`
	text-align: right;
	margin-bottom: 2em;

	${media.mobile`
        > * {
            display: block;
        }
    `}
`;
