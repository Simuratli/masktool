import { setNotificationAllowance, setAproveNotificationAgreement } from './notification.actions';
import { setStep } from './stepper.action';
import { setSelectMultipleItem } from './multipleselect';
import { setCodeEditorValue } from './codeeditor.action';
import { setToggleModal } from './modal.action';
import { setLoader } from './loader.action';

// backend actions 
import { setDefaultTasks } from './backend-actions/default-tasks.actions'

export {
    setNotificationAllowance,
    setAproveNotificationAgreement,
    setStep,
    setSelectMultipleItem,
    setCodeEditorValue,
    setToggleModal,
    setLoader,
    setDefaultTasks
} 