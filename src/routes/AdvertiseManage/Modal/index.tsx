import { MouseEvent, MouseEventHandler } from 'react'
import ReactDOM from 'react-dom'
import { CloseIcon, InputCancelIcon } from 'assets/svgs/index'
import defaultImg from 'assets/defaultImg.png'
import styles from './Modal.module.scss'
import { IAdsItem } from 'types/ads'
import { cx } from 'styles'
// import { IMovieItem } from 'types/movie'
// import useFavoriteUpdate from 'hooks/favoriteUpdate'

interface IBackDropProps {
  openModal: boolean
  onCancel: MouseEventHandler<HTMLButtonElement>
}

interface IModalProps {
  openModal: boolean
  onCancel: MouseEventHandler<HTMLButtonElement>
  onConfirm: MouseEventHandler<HTMLButtonElement>
}

const BackDrop = ({ openModal, onCancel }: IBackDropProps) => {
  return (
    <button
      type='button'
      onClick={onCancel}
      className={cx(styles.backDropButton, { [styles.backDropHidden]: !openModal })}
    >
      <div className={styles.backDrop} />
    </button>
  )
}

const ModalOverlay = ({ openModal, onCancel, onConfirm }: IModalProps) => {
  return (
    <div className={cx(styles.modal, { [styles.modalHidden]: !openModal })}>
      <div className={styles.modalActive}>
        <header className={styles.header}>
          <h3>생성할 광고 유형을 선택하세요.</h3>
          <button type='button' onClick={onCancel} className={styles.cancelButton}>
            <CloseIcon />
          </button>
        </header>
        <div className={styles.content}>
          <form>
            <div className={styles.inputForm}>
              <h3>광고 유형</h3>
              <div className={styles.inputRadio}>
                <input type='radio' id='type1' name='type' value={1} defaultChecked />
                <label htmlFor='type1'>웹사이트</label>
                <input type='radio' id='type2' name='type' value={2} />
                <label htmlFor='type2'>애플리케이션</label>
              </div>
            </div>
            <div className={styles.inputForm}>
              <label htmlFor='url'>웹사이트 주소(URL)</label>
              <input type='text' id='url' />
              <InputCancelIcon />
            </div>
            <div className={styles.inputForm}>
              <label htmlFor='name'>광고명</label>
              <input type='text' id='name' />
              <InputCancelIcon />
            </div>
            <div className={styles.inputForm}>
              <label htmlFor='budget'>일 희망 예산</label>
              <input type='number' name='budget' />
              <InputCancelIcon />
            </div>
          </form>
        </div>
        <footer className={styles.footer}>
          <button type='button' onClick={onCancel} className={styles.cancelButton}>
            취소
          </button>
          <button type='button' onClick={onConfirm} className={styles.confirmButton}>
            확인
          </button>
        </footer>
      </div>
    </div>
  )
}

const Modal = ({ openModal, onCancel, onConfirm }: IModalProps) => {
  const backDropElement = document?.getElementById('backdropRoot')
  const modalElement = document?.getElementById('modalOverlay')

  return (
    <>
      {backDropElement &&
        ReactDOM.createPortal(<BackDrop onCancel={onCancel} openModal={openModal} />, backDropElement)}

      {modalElement &&
        ReactDOM.createPortal(
          <ModalOverlay openModal={openModal} onConfirm={onConfirm} onCancel={onCancel} />,
          modalElement
        )}
    </>
  )
}

export default Modal
