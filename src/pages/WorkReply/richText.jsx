import React, { useCallback, useMemo, useState } from 'react';
import isHotkey from 'is-hotkey';
import { Editable, withReact, useSlate, Slate } from 'slate-react';
import { Editor, Transforms, createEditor, Element as SlateElement } from 'slate';
import { withHistory } from 'slate-history';
import { Menu, Row, Tag } from 'antd';
import styled from 'styled-components';
import { BoldOutlined, ItalicOutlined, UnderlineOutlined, LinkOutlined } from '@ant-design/icons';

import { Button } from 'components';

const HOTKEYS = {
	'mod+b': 'bold',
	'mod+i': 'italic',
	'mod+u': 'underline',
	'mod+`': 'code'
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const RichTextExample = () => {
	const [value, setValue] = useState(initialValue);
	const renderElement = useCallback((props) => <Element {...props} />, []);
	const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
	const editor = useMemo(() => withHistory(withReact(createEditor())), []);

	return (
		<Row style={{ backgroundColor: 'white' }}>
			<Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
				<Menu>
					<Menu.Item key="0">
						<MarkButton format="bold" icon={<BoldOutlined />} />
					</Menu.Item>
					<Menu.Item key="1">
						<MarkButton format="italic" icon={<ItalicOutlined />} />
					</Menu.Item>
					<Menu.Item key="2">
						<MarkButton format="underline" icon={<UnderlineOutlined />} />
					</Menu.Item>
				</Menu>
				<Editable
					renderElement={renderElement}
					renderLeaf={renderLeaf}
					placeholder="Enter some rich text…"
					spellCheck
					autoFocus
					onKeyDown={(event) => {
						for (const hotkey in HOTKEYS) {
							if (isHotkey(hotkey, event)) {
								event.preventDefault();
								const mark = HOTKEYS[hotkey];
								toggleMark(editor, mark);
							}
						}
					}}
				/>
			</Slate>
		</Row>
	);
};

const toggleMark = (editor, format) => {
	const isActive = isMarkActive(editor, format);

	if (isActive) {
		Editor.removeMark(editor, format);
	} else {
		Editor.addMark(editor, format, true);
	}
};

const isMarkActive = (editor, format) => {
	const marks = Editor.marks(editor);
	return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
	switch (element.type) {
		case 'link':
			return (
				<StyledTag2 {...attributes} icon={<LinkOutlined />} contentEditable={false}>
					{children}
				</StyledTag2>
			);
		default:
			return <p {...attributes}>{children}</p>;
	}
};

const Leaf = ({ attributes, children, leaf }) => {
	if (leaf.bold) {
		children = <strong>{children}</strong>;
	}

	if (leaf.code) {
		children = <code>{children}</code>;
	}

	if (leaf.italic) {
		children = <em>{children}</em>;
	}

	if (leaf.underline) {
		children = <u>{children}</u>;
	}

	return <span {...attributes}>{children}</span>;
};

const MarkButton = ({ format, icon }) => {
	const editor = useSlate();
	return (
		<Button
			active={isMarkActive(editor, format).toString()}
			onMouseDown={(event) => {
				event.preventDefault();
				toggleMark(editor, format);
			}}>
			<span>{icon}</span>
		</Button>
	);
};

const initialValue = [
	{
		type: 'paragraph',
		children: [
			{ text: 'This is editable ' },
			{ text: 'rich', bold: true },
			{ text: ' text, ' },
			{ text: 'much', italic: true },
			{ text: ' better than a ' },
			{ text: '<textarea>', code: true },
			{ text: '!' }
		]
	},
	{
		type: 'paragraph',
		children: [
			{
				text: "Since it's rich text, you can do things like turn a selection of text "
			},
			{ text: 'bold', bold: true },
			{
				text: ', or add a semantically rendered block quote in the middle of the page, like this:'
			}
		]
	},
	{
		type: 'paragraph',
		children: [
			{
				text: 'In addition to block nodes, you can create inline nodes, like '
			},
			{
				type: 'link',
				sub: 'general',
				children: [{ text: 'Your Company' }]
			},
			{
				text: '!'
			}
		]
	},
	{
		type: 'paragraph',
		children: [{ text: 'Try it out for yourself!' }]
	}
];

const StyledTag = styled(Tag)`
	color: #8860d0 !important;
	border: 1px solid #8860d0 !important;
	border-radius: 4px !important;
	font-size: 16px !important;
	padding: 4px 14px 6px 14px !important;
	margin: 8px !important;
	cursor: pointer !important;
	-webkit-touch-callout: none !important;
	-webkit-user-select: none !important;
	-khtml-user-select: none !important;
	-moz-user-select: none !important;
	-ms-user-select: none !important;
	user-select: none !important;
	.val {
		background: -webkit-linear-gradient(45deg, #8860d0, #8860d0, #5680e9, #5ab9ea) !important;
		-webkit-background-clip: text !important;
		-webkit-text-fill-color: transparent !important;
	}
	&:hover {
		background-image: linear-gradient(to right, #8860d0, #8860d0, #5680e9, #5ab9ea) !important;
		color: #fff !important;
		border: none !important;
		transform: scale(1.05);
		.val {
			background: -webkit-linear-gradient(45deg, #fff, #fff) !important;
			-webkit-background-clip: text !important;
			-webkit-text-fill-color: transparent !important;
		}
	}
`;

const StyledTag2 = styled(StyledTag)`
	padding: 1px 14px 3px 14px !important;
	margin: 0px 2px !important;
`;

export default RichTextExample;
