// import { ElMessage, ElMessageBox } from 'element-plus';
import { ErrorMessageMode } from '/#/axios';

export function checkStatus(
  status: number,
  msg: string,
  errMessageMode: ErrorMessageMode = 'message',
): string {
  let errMessage = '';
  switch (status) {
    case 401:
      errMessage = '登录状态已过期，您可以继续留在该页面，或者重新登录';
      break;
    case 500:
      errMessage = '服务器错误，请联系管理员';
      break;
    default:
      errMessage = msg || 'request error';
      break;
  }

  if (errMessage) {
    if (errMessageMode === 'message') {
      // ElMessage.error(errMessage);
    } else if (errMessageMode === 'messageBox') {
      // ElMessageBox.confirm(errMessage, '提示', {
      //   type: 'error',
      // });
    }
  }

  return errMessage;
}
