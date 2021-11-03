import React from "react"
import styled from "styled-components"
import cudyLogo from "assets/images/logo_workdeputy.png"

const StyledLogo = styled.div`
	margin-bottom: ${({ mb }) => mb || "1em"};
	cursor: pointer;
`

export default function Logo({ width, onClick, mb, isCudyTech = false, ...props }) {
	return (
		<StyledLogo {...props} mb={mb}>
			<img alt="" src={ cudyLogo} onClick={onClick} width={width || 100} />
		</StyledLogo>
	)
}
