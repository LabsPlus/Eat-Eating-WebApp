import React from "react";
import { Modal } from "antd";

interface ModalProps {
    visible: boolean;
    onClose: () => void;
    handleRFID: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RFIDModal = ({ visible, onClose, handleRFID } : ModalProps) => {
  return (
    <Modal
      title="Cadastrar RFID"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <div>
        <label htmlFor="rfid">RFID</label>
        <input id="rfid" type="text" onChange={handleRFID} />
      </div>
    </Modal>
  );
};

export default RFIDModal;
