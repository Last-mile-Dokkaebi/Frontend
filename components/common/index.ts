// 각 module을 index.ts를 통해 다시 내보내기
export {default as Button} from './Button'
export {default as Dialog} from './Dialog'

/*
  추후 사용시에는 import { Button, Dialog } from 'components/common
  같은 방식으로
*/