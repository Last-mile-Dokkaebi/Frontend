// 각 module을 index.ts를 통해 다시 내보내기
export {default as Button} from './Button'
export {default as Modal} from './Modal'
export {default as Title} from './Title'
export {default as CustomInput} from './CustomInput'
/*
  추후 사용시에는 import { Button, Modal } from 'components/common
  같은 방식으로
*/