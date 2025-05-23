import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../store/modalSlice';
import ModalWindow from './ModalWindow';

export default function ModalContainer() {
  const dispatch = useDispatch();
  const { isOpen, content } = useSelector((state) => state.modal);

  // Если закрыта — не рендерим вообще
  if (!isOpen) return null;

  return <ModalWindow text={content} onClose={() => dispatch(closeModal())} />;
}
