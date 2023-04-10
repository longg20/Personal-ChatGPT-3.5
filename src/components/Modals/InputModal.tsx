import { Input, Modal } from 'antd';
import _ from 'lodash';
import { useState } from 'react';

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
	const [input, setInput] = useState<string>(initialInput || '');

	const handleOK = () => {
		if (!_.isEmpty(input)) {
			onOk(input);
			hideModal();
		}
	};

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