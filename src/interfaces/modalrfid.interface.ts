export interface ModalRfidProps {
    open: boolean;
    onClose: () => void;
    handleRFID: (e: React.ChangeEvent<HTMLInputElement>) => void;
}