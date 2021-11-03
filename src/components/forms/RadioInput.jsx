import React from 'react';
import styled from 'styled-components';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Radio as AntdRadio } from 'antd';

const AntRadioGroup = styled(AntdRadio.Group)`
	> label {
		display: ${({ labelBlock }) => labelBlock && 'block'};
		width: ${({ labelBlock }) => labelBlock && '100%'};
		margin-bottom: ${({ labelBlock }) => labelBlock && '1em'};
		padding: ${({ labelBlock }) => labelBlock && '1em'};
		height: ${({ labelBlock }) => labelBlock && 'auto'};
	}
`;

function RadioInput({ options = [], name, label, isButton = true, ...props }) {
	return (
		<Form.Item name={name} label={label}>
			<AntRadioGroup {...props} name={name} buttonStyle="solid">
				{options.map((item) => (
					<AntdRadio.Button {...item} value={item.value} key={item.value}>
						{item.label}
					</AntdRadio.Button>
				))}
			</AntRadioGroup>
		</Form.Item>
	);
}

export default RadioInput;
