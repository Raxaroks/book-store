import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import style from './modal.module.css';

export interface ModalProps {
  title: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode,
}

export const Modal = ({ title, setOpen, children }: ModalProps) => {
  return (
    <div className={ style.modalBackground }>
      <div className={ style.modal }>
        <div className={ style.modalHeader }>
          <h3>{ title }</h3>
          <button onClick={ () => setOpen(false) }>
            <FontAwesomeIcon icon={ faXmark } />
          </button>
        </div>
        <div className={ style.modalContent }>
          { children }
        </div>
      </div>      
    </div>
  )
}
