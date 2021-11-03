import React from 'react';
import { Alert as Alertee } from 'antd';
import styled from 'styled-components';

const StyledAlert = styled(Alertee)`
	&& {
		margin-bottom: 2em;
		text-align: ${({ textAlign }) => textAlign || 'left'};
	}
`;

export default function Alert({ textAlign, ...props }) {
	return <StyledAlert {...props} textAlign={textAlign} />;
}
