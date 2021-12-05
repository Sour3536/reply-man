import React from 'react';
import ButtonAntd from 'antd/lib/button';
import styled from 'styled-components';

const StyledButton = styled(ButtonAntd)`
	&& {
		border-radius: 4px;
		color: ${({ type, social, disabled }) =>
			social === 'facebook' || social === 'google' || type === 'primary'
				? '#fff'
				: type === 'dashed'
				? '#777'
				: type === 'ghost' || disabled
				? '#bbb'
				: type === 'default'
				? 'rgba(0, 0, 0, 0.65)'
				: type === 'link'
				? '#5AB9EA'
				: 'inherit'};
		background-color: ${({ social, type }) =>
			social === 'facebook' ? '#3b5998' : social === 'google' ? '#ea4335' : type === 'link' ? '#e3e3e3' : ''};
		border-color: ${({ social, type }) =>
			social === 'facebook'
				? '#3b5998'
				: social === 'google'
				? '#ea4335'
				: type === 'ghost' || type === 'dashed'
				? '#d9d9d9'
				: type === 'primary'
				? '#5AB9EA'
				: type === 'default' || type === 'link'
				? 'transparent'
				: 'inherit'};
		transition: all 0.1s ease;
	}
	&&& span {
		color: ${({ type, disabled }) => (disabled && 'inherit') || (type === 'primary' && '#fff') || 'inherit'};
	}
`;

function Button({ children, size = 'large', ...props }) {
	return (
		<StyledButton {...props} size={size}>
			{children}
		</StyledButton>
	);
}

export default Button;
