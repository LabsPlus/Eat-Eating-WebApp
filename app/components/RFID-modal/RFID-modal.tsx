import React from "react";
import { Modal } from "antd";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    handleRFID: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RFIDModal = ({ open, onClose, handleRFID } : ModalProps) => {
  return (
    <Modal
      title="Cadastrar RFID"
      open={open}
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
