import { FC } from 'react'
import classNames from 'classnames'
import styles from './index.module.css'
import logo from '../../assets/images/logo.png'

const FirstScreen: FC = () => {
  return (
    <div
      className={classNames([
        styles.bg,
        'flex flex-col justify-center items-center h-screen',
      ])}
    >
      <div
        className={'flex flex-col justify-center items-center -translate-y-1/3'}
      >
        <img className={styles.logo} src={logo} alt="蓝鲸记账" />
        <span className={styles['logo-text']}>蓝鲸记账</span>
      </div>
    </div>
  )
}

export default FirstScreen
