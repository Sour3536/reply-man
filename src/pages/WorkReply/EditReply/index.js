import React, { useContext, useMemo, useEffect, useState, useCallback, useRef } from 'react';
import { createEditor, Transforms, Editor, Element as SlateElement, Descendant } from 'slate';
import { Slate, Editable, withReact, withMarkdownShortcuts, withEmojis } from 'slate-react';
import { LinkOutlined, FolderOutlined, RollbackOutlined, SaveOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import { Layout, Section, Heading, InputSearch, Card } from 'components';
import styled from 'styled-components';
import '@ant-design/compatible/assets/index.css';
import { Row, Select, Col, BackTop, Button, Input, Tag, Collapse, Form, Modal, message, Space } from 'antd';
import { media, mobile, tablet, screenLG } from 'helpers';
import { baseStyles } from 'styles/base';
import { replies, general_variables, dynamic_variables } from '../data';
import { collection, onSnapshot, setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import db from 'Firebase';

const StyledSpan = styled.span`
	color: #888;
	cursor: pointer;
	margin-left: 5px;
	margin-right: 5px;
	&:hover {
		color: #5800ff;
	}
`;
const { Panel } = Collapse;
const StyledCollapse = styled(Collapse)`
	&& {
		background-color: transparent;
		.ant-collapse-item {
			padding-bottom: 0.5em;
			margin-bottom: 1em;
			.ant-collapse-content-box {
				padding: 0;
			}
			.ant-radio-wrapper {
				white-space: pre;
				overflow-x: hidden;
				text-overflow: ellipsis;
			}
			.ant-radio-group {
				max-width: 100%;
			}
			.ant-collapse-header {
				padding: 0.2em 0;
				.ant-collapse-arrow {
					right: -10px;
					top: 55%;
				}
			}
		}
	}
`;

function EditReply({ language, location }) {
	const history = useHistory();
	const [folderData, setFolderData] = useState({}); //replies
	const [currentFolder, setCurrentFolder] = useState('');
	const [currentReplyIndex, setCurrentReplyIndex] = useState('0');
	const editor = useMemo(() => withLinks(withReact(createEditor())), []);
	const [value, setValue] = useState(initialValue);
	const [newText, setNewText] = useState('');
	const [selection, setSelection] = useState({});
	const [genderValues, setGenderValues] = useState({ male: '', female: '', neutral: '' });
	const [dayTimeValues, setDayTimeValues] = useState({ morning: '', afternoon: '', evening: '', night: '' });
	const [titleVal, setTitleVal] = useState('');
	const [isTextModalVisible, setIsTextModalVisible] = useState(false);
	const [isSelectModalVisible, setIsSelectModalVisible] = useState(false);
	const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);
	const [isDayTimeModalVisible, setIsDayTimeModalVisible] = useState(false);
	const [oldFolderName, setOld] = useState('');
	useEffect(() => {
		getReplies();
	}, []);
	async function getReplies() {
		if (localStorage.getItem('SessionId') !== null) {
			const docRef = doc(db, 'users', localStorage.getItem('SessionId').toString());
			const docSnap = await getDoc(docRef);
			const dat = JSON.parse(docSnap.data().replies);
			setFolderData(dat);
			var arr = location.pathname.split('/');
			if (arr.length === 6) {
				setCurrentReplyIndex(arr[5].toString());
				setCurrentFolder(arr[4].toString());
				setOld(arr[4].toString());
				setTitleVal(dat[arr[4]][arr[5]].title);
				setValue(dat[arr[4]][arr[5]].paragraphs);
			} else if (arr.length === 5) {
				setCurrentFolder(arr[4].toString());
				setOld(arr[4].toString());
			} else if (arr.length === 4) {
				//hello
			}
		}
	}
	const setTitle = (e) => {
		setTitleVal(e.target.value);
	};
	const save = async () => {
		if (JSON.stringify(value) === JSON.stringify(initialValue)) {
			message.warning('Please enter some reply.');
			return;
		}
		if (titleVal === '') {
			message.warning('Please enter a name for the reply.');
			return;
		}
		if (currentFolder === '') {
			message.warning('Please select a folder for the reply.');
			return;
		}
		var arr = location.pathname.split('/');
		if (arr.length === 6) {
			let newFolderData = { ...folderData };
			let newReply = { ...newFolderData[oldFolderName][currentReplyIndex] };
			newFolderData[oldFolderName].splice(currentReplyIndex, 1);
			let reply = '';
			for (let index = 0; index < value.length; index++) {
				let data = value[index];
				for (let index1 = 0; index1 < data.children.length; index1++) {
					let val = data.children[index1];
					if (val.text) {
						reply += val.text.toString();
					}
				}
			}
			newReply = { ...newReply, paragraphs: [...value], title: titleVal, folder: currentFolder, reply: reply };
			newFolderData[currentFolder].splice(0, 0, newReply);
			await updateDoc(doc(db, 'users', localStorage.getItem('SessionId').toString()), { replies: JSON.stringify(newFolderData) });
			history.goBack();
		} else {
			let newFolderData = { ...folderData };
			let reply = '';
			for (let index = 0; index < value.length; index++) {
				let data = value[index];
				for (let index1 = 0; index1 < data.children.length; index1++) {
					let val = data.children[index1];
					if (val.text) {
						reply += val.text.toString();
					}
				}
			}
			let newReply = {
				title: titleVal,
				paragraphs: [...value],
				reply: reply,
				folder: currentFolder,
				favourite: false
			};
			if (newFolderData[currentFolder].length > 0) {
				newFolderData[currentFolder].splice(0, 0, newReply);
			} else {
				newFolderData[currentFolder] = [newReply];
			}
			await updateDoc(doc(db, 'users', localStorage.getItem('SessionId').toString()), { replies: JSON.stringify(newFolderData) });
			history.goBack();
		}
	};
	const renderElement = useCallback(({ attributes, children, element }) => {
		switch (element.type) {
			case 'link':
				return (
					<StyledTag2 {...attributes} icon={<LinkOutlined />} contentEditable={false}>
						{children}
					</StyledTag2>
				);
			default:
				return (
					<p {...attributes} style={{ marginBottom: '0' }}>
						{children}
					</p>
				);
		}
	}, []);
	const addVariable = (name, sub, select = editor.selection, options = []) => {
		if (select !== null && select.anchor !== null) {
			const paraNum = select.anchor.path[0];
			const currentPara = value[paraNum];
			let lengthOfChildren = value[paraNum].children.length;
			const subParaNum = select.anchor.path[1];
			const offset = select.anchor.offset;
			let text = value[paraNum].children[subParaNum].text;
			const before = text.substring(0, offset);
			const after = text.substring(offset);
			let length = value.length;
			let newChildren = [
				...currentPara.children.slice(0, subParaNum),
				{
					text: before
				},
				{
					type: 'link',
					sub: sub,
					options: options,
					children: [{ text: name }]
				},
				{
					text: after
				},
				...currentPara.children.slice(subParaNum + 1, lengthOfChildren)
			];
			let changeablePara = {
				type: 'paragraph',
				children: newChildren
			};
			console.log(changeablePara);
			setValue([...value.slice(0, paraNum), changeablePara, ...value.slice(paraNum + 1, length)]);
		}
	};
	const handleTextOk = () => {
		if (newText !== '') {
			addVariable(newText, 'text', selection);
		}
		setIsTextModalVisible(false);
	};
	const handleTextCancel = () => {
		setIsTextModalVisible(false);
	};
	const handleSelectCancel = () => {
		setIsSelectModalVisible(false);
	};
	const handleGenderOk = () => {
		if (genderValues.neutral !== '' && genderValues.male !== '' && genderValues.female !== '') {
			addVariable('Gender Conditional', 'gender', selection, genderValues);
			setIsGenderModalVisible(false);
		} else {
			message.warning('Please add values for the variables left');
		}
	};
	const handleGenderCancel = () => {
		setIsGenderModalVisible(false);
	};
	const handleDayTimeOk = () => {
		if (dayTimeValues.morning !== '' && dayTimeValues.afternoon !== '' && dayTimeValues.evening !== '' && dayTimeValues.night !== '') {
			addVariable('DayTime Conditional', 'daytime', selection, dayTimeValues);
			setIsDayTimeModalVisible(false);
		} else {
			message.warning('Please add values for the variables left');
		}
	};
	const handleDayTimeCancel = () => {
		setIsDayTimeModalVisible(false);
	};
	const onFinish = (values) => {
		if (values.options && values.options.length > 1) {
			addVariable(values.title, 'select', selection, values.options);
			setIsSelectModalVisible(false);
		} else {
			message.warning('Please add at least two options.');
		}
		console.log('Received values of form:', values);
	};
	return (
		<Layout breadcrumb={false} language={language}>
			<BackTop />
			<Section className="pos-rel">
				<MainRow gutter={[{ xl: 32, lg: 16, md: 16 }, 24]} align="top" margintop="0" style={{ paddingTop: '1.5em' }}>
					<Col lg={15} md={24}>
						<Row justify="center">
							<StyledCol span={24}>
								<Row gutter={24}>
									<Col lg={2} style={{ paddingLeft: '0', paddingRight: '0' }}>
										<BackIcon>
											<RollbackOutlined onClick={() => history.goBack()} style={{ fontSize: '20px', lineHeight: '45px' }} />
										</BackIcon>
									</Col>
									<Col lg={16} style={{ paddingLeft: '2px' }}>
										<Input
											autoFocus
											value={titleVal}
											placeholder="Enter Reply Name"
											onChange={(e) => {
												setTitle(e);
											}}
											style={{ height: '45px', fontSize: '19px' }}
										/>
									</Col>
									<Col lg={6}>
										<Button type="primary" style={{ height: '44px', fontSize: '17px', width: '100%' }} onClick={save}>
											<SaveOutlined />
											&nbsp;Save Reply
										</Button>
									</Col>
								</Row>
								<hr style={{ margin: '.9em 0' }} />
								<Row justify="end">
									<Col className="ta-center">
										<Row>
											<span style={{ fontSize: '16px', color: baseStyles.greyColor, marginLeft: '15px' }}>
												Select Folder <FolderOutlined />
												&nbsp;&nbsp;&nbsp;
											</span>
										</Row>
										<Row style={{ marginTop: '4px' }}>
											<Select
												value={currentFolder}
												onChange={(val) => setCurrentFolder(val)}
												style={{ width: 150, color: baseStyles.greyColor, fontSize: '15px' }}>
												{Object.keys(folderData).map((key, index) => (
													<Select.Option value={key} key={index}>
														{key}
													</Select.Option>
												))}
											</Select>
										</Row>
									</Col>
								</Row>
								<Row style={{ margin: '1em 0', fontSize: '16.5px' }}>
									<Slate
										editor={editor}
										value={value}
										onChange={(v) => {
											setValue(v);
										}}>
										<Editable
											renderElement={renderElement}
											placeholder="Enter Reply here...."
											style={{ width: '100%' }}
											onKeyDown={(event) => {
												if (event.key === 'Backspace') {
													console.log(editor.selection);
													if (editor.selection !== null && editor.selection.anchor !== null) {
														const paraNum = editor.selection.anchor.path[0];
														const subParaNum = editor.selection.anchor.path[1];
														let length = value.length;
														if (subParaNum !== 0 && editor.selection.anchor.offset === 0) {
															event.preventDefault();
															const offset = value[paraNum].children[subParaNum - 2].text.length;
															let newValue = [...value];
															let changeableChildren = newValue[paraNum].children.filter(function (value, index, arr) {
																return index !== subParaNum - 1;
															});
															let changeablePara = {
																type: 'paragraph',
																children: changeableChildren
															};
															setValue([...value.slice(0, paraNum), changeablePara, ...value.slice(paraNum + 1, length)]);
															Transforms.select(editor, { path: [paraNum, subParaNum - 2], offset: offset });
														}
													}
												} else if (event.key === 'Delete') {
													if (editor.selection !== null && editor.selection.anchor !== null) {
														const paraNum = editor.selection.anchor.path[0];
														const subParaNum = editor.selection.anchor.path[1];
														let length = value.length;
														if (
															editor.selection.anchor.offset === editor.children[editor.selection.anchor.path[0]].children[0].text.length
														) {
															if (
																value[paraNum].children[subParaNum + 1] &&
																value[paraNum].children[subParaNum + 1].type &&
																value[paraNum].children[subParaNum + 1].type === 'link'
															) {
																event.preventDefault();
																let newValue = [...value];
																let changeableChildren = newValue[paraNum].children.filter(function (value, index, arr) {
																	return index !== subParaNum + 1;
																});
																let changeablePara = {
																	type: 'paragraph',
																	children: changeableChildren
																};
																setValue([...value.slice(0, paraNum), changeablePara, ...value.slice(paraNum + 1, length)]);
															}
														}
													}
												} else if (event.keyCode === 37) {
													if (editor.selection !== null && editor.selection.anchor !== null) {
														const paraNum = editor.selection.anchor.path[0];
														const subParaNum = editor.selection.anchor.path[1];
														let length = value.length;
														if (subParaNum !== 0 && editor.selection.anchor.offset === 0) {
															event.preventDefault();
															const offset = value[paraNum].children[subParaNum - 2].text.length;
															Transforms.select(editor, { path: [paraNum, subParaNum - 2], offset: offset });
														}
													}
												} else if (event.keyCode === 39) {
													if (editor.selection !== null && editor.selection.anchor !== null) {
														const paraNum = editor.selection.anchor.path[0];
														const subParaNum = editor.selection.anchor.path[1];
														let length = value.length;
														if (
															editor.selection.anchor.offset === editor.children[editor.selection.anchor.path[0]].children[0].text.length
														) {
															if (
																value[paraNum].children[subParaNum + 1] &&
																value[paraNum].children[subParaNum + 1].type &&
																value[paraNum].children[subParaNum + 1].type === 'link'
															) {
																event.preventDefault();
																Transforms.select(editor, { path: [paraNum, subParaNum + 2], offset: 0 });
															}
														}
													}
												}
											}}
										/>
									</Slate>
								</Row>
							</StyledCol>
						</Row>
					</Col>
					<Col lg={9} md={24}>
						<Row justify="center">
							<StyledCol span={24} style={{ padding: '1.5em 2em' }}>
								<StyledCollapse bordered={false} expandIconPosition="right" defaultActiveKey={['1', '2', '3']}>
									<Panel
										header={
											<Heading
												level={3}
												content="General Variables"
												subheader={
													<span style={{ fontSize: '15.5px' }}>General Variables are automatically filled in when you copy the reply.</span>
												}
												style={{ marginBottom: '0' }}
											/>
										}
										key="1">
										<Row style={{ margin: '.4em 0' }}>
											{general_variables.map((data, index) => (
												<StyledTag
													key={index}
													onClick={() => {
														addVariable(data.name, 'general');
													}}>
													{data.name}
												</StyledTag>
											))}
										</Row>
									</Panel>
									<Panel
										header={
											<Heading
												level={3}
												content="Dynamic Variables"
												subheader={
													<span style={{ fontSize: '15.5px' }}>Dynamic Variables change on thier own based on current situation.</span>
												}
												style={{ marginBottom: '0' }}
											/>
										}
										key="2">
										<Row style={{ margin: '.4em 0' }}>
											{dynamic_variables.map((data, index) => (
												<StyledTag
													key={index}
													onClick={() => {
														addVariable(data, 'dynamic');
													}}>
													{data}
												</StyledTag>
											))}
										</Row>
									</Panel>
									<Panel
										header={
											<Heading
												level={3}
												content="Custom Variables"
												subheader={
													<span style={{ fontSize: '15.5px' }}>
														Custom Variables are replaced at the last moment in context with your input/select.
													</span>
												}
												style={{ marginBottom: '0' }}
											/>
										}
										key="3">
										<Row style={{ margin: '.4em 0' }}>
											<StyledTag
												onClick={() => {
													if (editor.selection !== null && editor.selection.anchor !== null) {
														setSelection(editor.selection);
														setIsGenderModalVisible(true);
													} else {
														message.warning('Please select a location.');
													}
												}}>
												Gender Conditional
											</StyledTag>
											<StyledModal1
												title={
													<Heading
														level={3}
														title_color={'#5ab9ea'}
														content="Gender Conditional"
														subheader="Gender conditional variables will be selected based on the gender of the recipient which you would need to tell at the tiem you copy."
														style={{ marginBottom: '0', textAlign: 'center' }}
													/>
												}
												visible={isGenderModalVisible}
												afterClose={() => {
													setGenderValues({ female: '', male: '', neutral: '' });
													setSelection({});
												}}
												destroyOnClose
												onOk={handleGenderOk}
												onCancel={handleGenderCancel}
												footer={[
													<Row key="Confirm" justify="center">
														<Button
															type="primary"
															onClick={handleGenderOk}
															style={{ borderRadius: '4px', fontSize: '16px', height: '40px' }}>
															Add Variable
														</Button>
													</Row>
												]}>
												<Heading title_color={'#5ab9ea'} content="Female" level={4} style={{ marginBottom: '5px' }} />
												<Input
													style={{ marginBottom: '12px' }}
													name="for_female"
													autoFocus
													value={genderValues.female}
													onChange={(e) => {
														setGenderValues({ ...genderValues, female: e.target.value });
													}}
													placeholder="Enter Variable Value for Female"
												/>
												<Heading title_color={'#5ab9ea'} content="Male" level={4} style={{ marginBottom: '5px' }} />
												<Input
													style={{ marginBottom: '12px' }}
													name="for_male"
													value={genderValues.male}
													onChange={(e) => {
														setGenderValues({ ...genderValues, male: e.target.value });
													}}
													placeholder="Enter Variable Value for Male"
												/>
												<Heading title_color={'#5ab9ea'} content="Neutral" level={4} style={{ marginBottom: '5px' }} />
												<Input
													style={{ marginBottom: '12px' }}
													name="for_neutral"
													value={genderValues.neutral}
													onChange={(e) => {
														setGenderValues({ ...genderValues, neutral: e.target.value });
													}}
													placeholder="Enter Variable Value for Neutral"
												/>
											</StyledModal1>
											<StyledTag
												onClick={() => {
													if (editor.selection !== null && editor.selection.anchor !== null) {
														setSelection(editor.selection);
														setIsDayTimeModalVisible(true);
													} else {
														message.warning('Please select a location.');
													}
												}}>
												DayTime Conditional
											</StyledTag>
											<StyledModal2
												title={
													<Heading
														level={3}
														title_color={'#5ab9ea'}
														content="DayTime Conditional"
														subheader="DayTime conditional variables will insert content depending on whether it's morning, afternoon or evening at the time of using."
														style={{ marginBottom: '0', textAlign: 'center' }}
													/>
												}
												visible={isDayTimeModalVisible}
												afterClose={() => {
													setDayTimeValues({ morning: '', afternoon: '', evening: '', night: '' });
													setSelection({});
												}}
												destroyOnClose
												onOk={handleDayTimeOk}
												onCancel={handleDayTimeCancel}
												footer={[
													<Row key="Confirm" justify="center">
														<Button
															type="primary"
															onClick={handleDayTimeOk}
															style={{ borderRadius: '4px', fontSize: '16px', height: '40px' }}>
															Add Variable
														</Button>
													</Row>
												]}>
												<Heading title_color={'#5ab9ea'} content="Morning" level={4} style={{ marginBottom: '5px' }} />
												<Input
													style={{ marginBottom: '12px' }}
													name="for_morning"
													autoFocus
													value={dayTimeValues.morning}
													onChange={(e) => {
														setDayTimeValues({ ...dayTimeValues, morning: e.target.value });
													}}
													placeholder="Enter Variable Value for Morning"
												/>
												<Heading title_color={'#5ab9ea'} content="Afternoon" level={4} style={{ marginBottom: '5px' }} />
												<Input
													style={{ marginBottom: '12px' }}
													name="for_afternoon"
													value={dayTimeValues.afternoon}
													onChange={(e) => {
														setDayTimeValues({ ...dayTimeValues, afternoon: e.target.value });
													}}
													placeholder="Enter Variable Value for Afternoon"
												/>
												<Heading title_color={'#5ab9ea'} content="Evening" level={4} style={{ marginBottom: '5px' }} />
												<Input
													style={{ marginBottom: '12px' }}
													name="for_evening"
													value={dayTimeValues.evening}
													onChange={(e) => {
														setDayTimeValues({ ...dayTimeValues, evening: e.target.value });
													}}
													placeholder="Enter Variable Value for Evening"
												/>
												<Heading title_color={'#5ab9ea'} content="Night" level={4} style={{ marginBottom: '5px' }} />
												<Input
													style={{ marginBottom: '12px' }}
													name="for_night"
													value={dayTimeValues.night}
													onChange={(e) => {
														setDayTimeValues({ ...dayTimeValues, night: e.target.value });
													}}
													placeholder="Enter Variable Value for Night"
												/>
											</StyledModal2>
											<StyledTag
												onClick={() => {
													if (editor.selection !== null && editor.selection.anchor !== null) {
														setSelection(editor.selection);
														setIsTextModalVisible(true);
													} else {
														message.warning('Please select a location.');
													}
												}}>
												Text Input
											</StyledTag>
											<StyledModal
												title={
													<Heading
														level={3}
														title_color={'#5ab9ea'}
														content="Text Input"
														subheader="This variable will be replaced on the fly by a value you enter every time you copy."
														style={{ marginBottom: '0', textAlign: 'center' }}
													/>
												}
												visible={isTextModalVisible}
												afterClose={() => {
													setNewText('');
													setSelection({});
												}}
												destroyOnClose
												onOk={handleTextOk}
												onCancel={handleTextCancel}
												footer={[
													<Row key="Confirm" justify="center">
														<Button type="primary" onClick={handleTextOk} style={{ borderRadius: '4px', fontSize: '16px', height: '40px' }}>
															Add Variable
														</Button>
													</Row>
												]}>
												<Heading title_color={'#5ab9ea'} content="Question (eg. What is the Qualification)" level={4} />
												<FormItem
													style={{ marginRight: '20px' }}
													name="title"
													label="This is the question which will be asked when you copy the text">
													<Input
														name="title"
														autoFocus
														value={newText}
														onChange={(e) => setNewText(e.target.value)}
														placeholder="Enter Variable Name"
													/>
												</FormItem>
											</StyledModal>
											<StyledTag
												onClick={() => {
													if (editor.selection !== null && editor.selection.anchor !== null) {
														setSelection(editor.selection);
														setIsSelectModalVisible(true);
													} else {
														message.warning('Please select a location.');
													}
												}}>
												Select
											</StyledTag>
											<StyledModal1
												title={
													<Heading
														level={3}
														title_color={'#5ab9ea'}
														content="Select Input"
														subheader="This variable will be replaced on the fly by a value you select at the time you copy."
														style={{ marginBottom: '0', textAlign: 'center' }}
													/>
												}
												visible={isSelectModalVisible}
												destroyOnClose
												afterClose={() => {
													setSelection({});
												}}
												onCancel={handleSelectCancel}
												footer={null}>
												<Heading title_color={'#5ab9ea'} content="Question (eg. Select the Qualification)" level={4} />
												<Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
													<Form.Item
														style={{ marginRight: '20px', marginBottom: '16px' }}
														name="title"
														rules={[{ required: true, message: 'Missing Select Question' }]}
														label="This is the question which will be asked when you copy the text">
														<Input name="title" autoFocus placeholder="Enter Variable Name" />
													</Form.Item>
													<Form.List name="options">
														{(fields, { add, remove }) => (
															<>
																{fields.map(({ key, name, fieldKey, ...restField }) => (
																	<Row key={key}>
																		<Col span={22}>
																			<Form.Item
																				{...restField}
																				name={[name, 'first']}
																				fieldKey={[fieldKey, 'first']}
																				rules={[{ required: true, message: 'Missing Option Value' }]}
																				style={{ marginBottom: '12px' }}>
																				<Input placeholder="Enter option value" />
																			</Form.Item>
																		</Col>
																		<Col span={2} className="ta-center" style={{ paddingTop: '4px' }}>
																			<MinusCircleOutlined onClick={() => remove(name)} />
																		</Col>
																	</Row>
																))}
																<Form.Item>
																	<Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
																		Add Option
																	</Button>
																</Form.Item>
															</>
														)}
													</Form.List>
													<Form.Item>
														<Row key="Confirm" justify="center">
															<Button type="primary" htmlType="submit" style={{ borderRadius: '4px', fontSize: '16px', height: '40px' }}>
																Add Variable
															</Button>
														</Row>
													</Form.Item>
												</Form>
											</StyledModal1>
										</Row>
									</Panel>
								</StyledCollapse>
							</StyledCol>
						</Row>
					</Col>
				</MainRow>
			</Section>
		</Layout>
	);
}

const withLinks = (editor) => {
	const { insertData, insertText, isInline } = editor;
	editor.isInline = (element) => {
		return element.type === 'link' ? true : isInline(element);
	};
	return editor;
};

// prettier-ignore
export default (withRouter(EditReply))

/*
███████╗████████╗██╗   ██╗██╗     ███████╗███████╗
██╔════╝╚══██╔══╝╚██╗ ██╔╝██║     ██╔════╝██╔════╝
███████╗   ██║    ╚████╔╝ ██║     █████╗  ███████╗
╚════██║   ██║     ╚██╔╝  ██║     ██╔══╝  ╚════██║
███████║   ██║      ██║   ███████╗███████╗███████║
╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚══════╝╚══════╝
*/
const MainRow = styled(Row).attrs(() => ({
	type: 'flex',
	justify: 'center'
}))`
	padding-left: ${({ pl }) => pl || '4rem'};
	padding-right: ${({ pr }) => pr || '4rem'};
	margin-bottom: ${({ marginbottom }) => marginbottom || '.5em'};
	margin-top: ${({ margintop }) => margintop || '1.5em'};

	.overflowing-section {
		max-height: ${({ datalength }) => datalength > 16 && '450px'};
		overflow-y: ${({ datalength }) => datalength > 16 && 'scroll'};
		-webkit-overflow-scrolling: touch;
		&::-webkit-scrollbar-thumb {
			border-radius: 8px;
			border: 2px solid ${baseStyles.lightGrey.two};
			background-color: rgba(0, 0, 0, 0.5);
		}
		&::-webkit-scrollbar {
			-webkit-appearance: none;
		}
		&::-webkit-scrollbar:vertical {
			width: 11px;
		}
		&::-webkit-scrollbar:horizontal {
			height: 11px;
		}
	}
	@media only screen and (min-width: 1024px) and (max-height: 1366px) and (-webkit-min-device-pixel-ratio: 1.5) {
		margin-left: -2.5em !important;
		margin-right: -2.5em !important;
		padding-left: 0;
		padding-right: 0;
	}
	${media.tablet`
        margin-left: -2em !important;
		margin-right: -2em !important;
        padding-left: 0;
        padding-right: 0;
    `}
	${media.mobile`
        padding-left: 2em;
        padding-right: 2em;
    `}
`;

const StyledTag = styled(Tag)`
	color: #8860d0 !important;
	border: 1px solid #8860d0 !important;
	border-radius: 4px !important;
	font-size: 15px !important;
	padding: 3px 11px 5px 11px !important;
	margin: 5px !important;
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
		border: 1px solid #fff !important;
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

const BackIcon = styled.span`
	z-index: 1;
	padding: 8px;
	border-radius: 10px;
	cursor: pointer;
	margin-left: 10px;
	&:hover {
		background-color: #ccc !important;
	}
`;

const StyledCol = styled(Col)`
	overflow-y: scroll;
	background-color: #fff;
	box-shadow: ${baseStyles.boxShadow.mild};
	border-radius: 8px;
	height: calc(79vh - 2px);
	padding: 2em;
	-webkit-overflow-scrolling: touch;
	&::-webkit-scrollbar-thumb {
		border-radius: 8px;
		border: 2px solid #f9f9f9;
		background-color: rgba(0, 0, 0, 0.5);
	}
	&::-webkit-scrollbar {
		-webkit-appearance: none;
	}
	&::-webkit-scrollbar:vertical {
		width: 6px;
	}
	&::-webkit-scrollbar:horizontal {
		height: 6px;
	}
`;

const StyledModal = styled(Modal)`
	top: 22% !important;
	.ant-modal-header {
		border-radius: 8px !important;
		padding: 22px 30px !important;
	}
	.ant-modal-body {
		padding: 20px 40px !important;
	}
	.ant-modal-content {
		border-radius: 8px !important;
	}
	.subheader {
		font-weight: 400 !important;
	}
`;

const StyledModal1 = styled(StyledModal)`
	top: 16% !important;
`;

const StyledModal2 = styled(StyledModal)`
	top: 11% !important;
`;

const FormItem = styled(Form.Item)`
	margin-right: 20px !important;
	margin-bottom: 0 !important;
	input {
		margin: 10px 0px !important;
		line-height: 30px !important;
		font-size: 16px !important;
	}
`;

const initialValue = [
	{
		type: 'paragraph',
		children: [{ text: '' }]
	}
];
