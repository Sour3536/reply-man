import React from 'react';
import styled from 'styled-components';
import Typography from 'antd/lib/typography';
import Icon from 'antd/lib/icon';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { baseStyles } from 'styles/base';

const StyledHeading = styled(Typography.Title)`
	&& {
		margin-bottom: 0;
		font-size: ${({ reverse }) => reverse !== 'false' && '12px'};
		text-transform: ${({ reverse }) => (reverse !== 'false' ? 'uppercase' : 'initial')};
		color: ${({ reverse, titlecolor }) => (reverse !== 'false' && '#5800ff') || (titlecolor && titlecolor)};
		font-weight: ${({ bold }) => bold && 'bold'};
	}
`;

const Paragraph = styled(Typography.Paragraph)`
	&& {
		margin-bottom: 0;
		color: ${({ color }) => color || baseStyles.greyColor};
	}
`;

const Typo = styled(Typography)`
	&& {
		margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : '1em')};
		ul {
			margin-bottom: 0;
		}
	}
`;

function Heading({
	content = '',
	subheader = '',
	icon = '',
	iconSize = 20,
	iconTheme = 'outlined',
	level = 2,
	bold,
	color = '',
	...props
}) {
	return (
		<Typo {...props}>
			{icon && <Icon type={icon} theme={iconTheme} style={{ fontSize: iconSize, verticalAlign: 'middle' }} />}
			<StyledHeading className="title" reverse={props.reverse ? 'true' : 'false'} bold={bold} level={level} titlecolor={props.title_color}>
				{content}
			</StyledHeading>
			{subheader && (
				<Paragraph className="subheader" color={color}>
					{subheader}
				</Paragraph>
			)}
		</Typo>
	);
}

export default Heading;
