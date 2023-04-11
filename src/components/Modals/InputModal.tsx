import { Input, Modal } from 'antd';
import _ from 'lodash';
import { useState, useEffect } from 'react';

interface WarningModalProps {
	title: string,
	open: boolean,
	onOk: (name: string) => void,
	hideModal: () => void,
	okText?: string,
	cancelText?: string,
	initialInput?: string,
}

export const InputModal = ({ title, open, onOk, hideModal, okText = 'OK', cancelText = 'Cancel', initialInput }: WarningModalProps) => {
	const [input, setInput] = useState<string>('');

	const handleOK = () => {
		if (!_.isEmpty(input)) {
			onOk(input);
			hideModal();
		}
	};

	useEffect(() => {
		if (initialInput) {
			setInput(initialInput);
		}
	}, [initialInput]);

	return (
		<Modal
			title={title}
			open={open}
			onOk={handleOK}
			onCancel={hideModal}
			okText={okText}
			cancelText={cancelText}
		>
			<Input value={input} onChange={(e) => setInput(e.target.value)} />
		</Modal>
	);
};