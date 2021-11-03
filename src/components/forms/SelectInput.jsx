import React from 'react';
import styled from 'styled-components';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Select as SelectAntd, Typography } from 'antd';

function SelectInput({ reverse = 0, options, name, label, ...props }) {
	return (
		<Form.Item name={name || ''} label={label || ''} style={{ marginBottom: props.marginBottom || '' }}>
			<SelectAntd {...props} name={name || ''} onChange={props.onChange} style={{ width: props.width || '100%' }}>
				{(options || []).map((item) => (
					<SelectAntd.Option key={item.value}>{item.label}</SelectAntd.Option>
				))}
			</SelectAntd>
		</Form.Item>
	);
}

export default SelectInput;
