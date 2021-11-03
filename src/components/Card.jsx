import React from 'react';
import { Card as Cardee } from 'antd';
import styled from 'styled-components';
import { boxShadow } from '../styles/base';

const StyledCard = styled(Cardee)`
	&& {
		padding: ${({ padding = {} }) => {
			if (typeof padding !== 'object') return padding;
			return `${padding.pt || 0} ${padding.pr || 0} ${padding.pb || 0} ${padding.pl || 0}`;
		}};
		height: ${(props) => (props.autoheight ? 'auto' : props.height ? props.height : '300px')};
		margin-bottom: 1.5em;
		border-radius: 8px;
		border: none;
		background: ${({ bg }) => bg};
		box-shadow: ${boxShadow[0]};
		transition: all 0.2s ease;
		&:hover {
			box-shadow: ${({ nohover }) => (nohover ? undefined : boxShadow[1])};
			transform: ${({ nohover }) => (nohover ? 'none' : 'translateY(-1px)')};
		}
	}
	.ant-card-cover {
		max-height: 200px;
	}
	.ant-card-meta-detail {
		margin-bottom: 2em;
	}
`;

function Card({ title = '', description = '', src = '', children, nohover = 0, ...props }) {
	return (
		<StyledCard {...props} nohover={nohover} cover={src ? <img alt={title} src={src} width="100%" /> : null}>
			{(title || description) && <Cardee.Meta title={title} description={description} />}
			{children}
		</StyledCard>
	);
}

export default Card;
