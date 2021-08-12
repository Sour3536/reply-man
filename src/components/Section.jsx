import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers';

const StyledSection = styled.section`
	color: ${({ dark }) => (dark ? '#fff' : '#222')};
	max-width: ${({ maxWidth }) => maxWidth};
	padding: ${({ noPadding, padding, paddingHorizontal }) =>
		noPadding
			? 0
			: padding
			? padding
			: (paddingHorizontal === 'padded' ? '20px 80px' : paddingHorizontal === 'very')
			? '20px 110px'
			: paddingHorizontal === 0
			? '20px 0'
			: `20px 50px`};
	width: ${({ width }) => width || '100%'};
	border-bottom: ${({ borderBottom }) => (borderBottom ? `1px solid #ddd` : `none`)};
	text-align: ${({ textAlign }) => textAlign || 'left'};
	background-color: ${({ bg, dark }) => (dark ? '#5d5d5d' : bg ? bg : 'transparent')};
	margin-bottom: ${({ marginBottom }) =>
		(marginBottom === 'padded' && '1.5em') ||
		(marginBottom === 'very' && '2.5em') ||
		(marginBottom === 'super' && '4em') ||
		(marginBottom === 0 && 0) ||
		'1em'};
	margin: ${({ centered }) => centered && '0 auto'};
	strong,
	h2,
	h3,
	h4,
	h5,
	h6 {
		color: ${({ dark }) => (dark ? '#fff' : '#222')};
	}
	${media.mobile`
        padding: ${(p) => (p.noPadding ? 0 : '20px')};
    `}
`;

function Section({ children, ...props }, ref) {
	return (
		<StyledSection {...props} ref={ref}>
			{children}
		</StyledSection>
	);
}

export default React.forwardRef(Section);
