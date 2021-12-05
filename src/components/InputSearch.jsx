import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { baseStyles } from 'styles/base';
import { tablet, media, mobile, screenLG } from 'helpers';

const Search = styled(Input.Search)`
	&& {
		width: ${({ width }) => width || '280px'};
		height: ${({ height }) => height || '45px'};
		border: 1px solid ${baseStyles.lightGrey.one};
		border-radius: 32px;
		display: flex;
		align-items: center;
		padding: 0px 17px;
		.ant-input {
			box-shadow: none;
			border: none;
			font-size: ${({ fontSize }) => fontSize || '14px'};
			&:focus {
				width: 100%;
				box-shadow: none;
				background: initial;
			}
		}
		.ant-input-group-addon {
			button {
				border: 0;
			}
		}
		.ant-btn {
			border: 0;
		}
		&&:focus-within {
			box-shadow: 1px 3px 7px rgba(0, 0, 0, 0.2);
		}
	}
	${media.mobile`
		padding: 0px 10px !important;
		margin: 10px 5px 5px 5px;
	`}
`;

function InputSearch({ height, width, ...props }) {
	return <Search {...props} height={height} width={width} />;
}

export default InputSearch;
