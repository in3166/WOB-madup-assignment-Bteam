import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react'

import { CloseIcon, InputCancelIcon } from 'assets/svgs/index'
import styles from './advertiseModal.module.scss'
import { cx } from 'styles'
import { useRecoil } from 'hooks/state'
import { adsListState } from 'states/adsItem'
import Modal from '..'
import useFormInput from 'routes/AdvertiseManage/Modal/AdvertiseModal/useFormInput'
import { IAdsItem } from 'types/ads'

interface IAdsModalProps {
  selectedAdItem: IAdsItem | null
  openModal: boolean
  setVisibleModal: Dispatch<SetStateAction<boolean>>
}

// TODO: 분리
function validateTitle(value: string) {
  return value.length > 4
}

const AdvertiseModal = ({ selectedAdItem, setVisibleModal, openModal }: IAdsModalProps): JSX.Element => {
  const {
    value: adsType,
    setValue: setAdsType,
    valueClickHandler: typeClickHandler,
  } = useFormInput({ initialValue: selectedAdItem?.adType || 'web' })

  const {
    value: title,
    hasError: titleHasError,
    setValue: setTitle,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: handleTitleBlur,
  } = useFormInput({ validateFunction: validateTitle, initialValue: selectedAdItem?.title ?? '' })

  const [budget, setBudget] = useState(Number(selectedAdItem?.budget))

  const handleChangeBudget = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(Number(e.currentTarget.value))
  }

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault()
    // console.log(e.currentTarget)
    // console.log(title)
    setVisibleModal(false)
  }

  const onCancel = () => {
    setAdsType('web')
    setTitle('')
    setBudget(0)
    setVisibleModal(false)
  }

  return (
    <Modal onCancel={onCancel} openModal={openModal}>
      <header className={styles.header}>
        <h3>생성할 광고 유형을 선택하세요.</h3>
        <button type='button' onClick={onCancel} className={styles.cancelButton}>
          <CloseIcon />
        </button>
      </header>

      <div className={styles.content}>
        <form onSubmit={handleOnSubmit}>
          <div className={styles.inputForm}>
            <legend>광고 유형</legend>
            <div className={styles.inputRadio}>
              <input
                type='radio'
                id='type1'
                name='type'
                value={1}
                defaultChecked={adsType === 'web'}
                onClick={typeClickHandler}
              />
              <label htmlFor='type1'>웹사이트</label>
              <input
                type='radio'
                id='type2'
                name='type'
                value={2}
                defaultChecked={!adsType}
                onClick={typeClickHandler}
              />
              <label htmlFor='type2'>애플리케이션</label>
            </div>
          </div>

          <div className={styles.inputForm}>
            <label htmlFor='name'>광고명</label>
            <input type='text' id='name' value={title} onBlur={handleTitleBlur} onChange={titleChangeHandler} />
            <InputCancelIcon className={cx({ [styles.iconHidden]: title === '' })} />
            {titleHasError && <p className={styles.errorMessage}>광고명은 5글자 이상이어야 합니다.</p>}
          </div>

          <div className={styles.inputForm}>
            <label htmlFor='budget'>일 희망 예산</label>
            <input type='number' name='budget' placeholder='0' value={budget} onChange={handleChangeBudget} />
            <InputCancelIcon className={cx({ [styles.iconHidden]: budget <= 0 })} />
          </div>

          <footer className={styles.footer}>
            <button type='button' onClick={onCancel} className={styles.cancelButton}>
              취소
            </button>
            <button type='submit' className={styles.confirmButton}>
              확인
            </button>
          </footer>
        </form>
      </div>
    </Modal>
  )
}

export default AdvertiseModal
