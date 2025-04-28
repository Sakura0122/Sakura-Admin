import { Card } from 'antd'
import userStore from '@/stores/user.ts'
import { getTime } from '@/utils/utils.ts'
import style from './index.module.less'

function Home() {
  const { userinfo } = userStore()
  return (
    <Card>
      <div className={style.box}>
        <img src={userinfo.avatar || undefined} alt="" className="avatar" />
        <div className="bottom">
          <h3 className="title">
            {getTime()}好呀{userinfo.name}
          </h3>
          <p className="subtitle">Sakura的管理系统</p>
        </div>
      </div>
    </Card>
  )
}

export default Home
