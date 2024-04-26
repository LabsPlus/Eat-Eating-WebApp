export interface PopUpMessageProps {
  icon: 'error' | 'success';
  message: string;
  closeError: () => void;
}