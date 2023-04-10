import { Modal } from 'antd';

interface WarningModalProps {
	title: string,
	open: boolean,
	onOk: () => void,
	hideModal: () => void,
	okText?: string,
	cancelText?: string,
	description: string,
}

export const WarningModal = ({ title, open, onOk, hideModal, okText = 'OK', cancelText = 'Cancel', description }: WarningModalProps) => {
  return (
    <Modal
		title={title}
		open={open}
		onOk={() => {
			onOk();
			hideModal();
		}}
		onCancel={hideModal}
		okText={okText}
		cancelText={cancelText}
    >
		<p>{description}</p>
    </Modal>
  );
};