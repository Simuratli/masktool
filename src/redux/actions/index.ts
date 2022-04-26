import { setNotificationAllowance, setAproveNotificationAgreement } from './notification.actions';
import { setStep } from './stepper.action';
import { setSelectMultipleItem } from './multipleselect';
import { setCodeEditorValue } from './codeeditor.action';
import { setToggleModal } from './modal.action';
import { setLoader } from './loader.action';

// backend actions 
import { setDefaultTasks } from './backend-actions/default-tasks.actions';
import { setAllEntities } from './backend-actions/get-entities.actions';
import { setViewsByEntity, setAllViewsByEntity } from './backend-actions/entity-by-view.actions';
import { getCustomRules } from './backend-actions/custom-rules.action';


export {
    setNotificationAllowance,
    setAproveNotificationAgreement,
    setStep,
    setSelectMultipleItem,
    setCodeEditorValue,
    setToggleModal,
    setLoader,
    setDefaultTasks,
    setAllEntities,
    setViewsByEntity,
    setAllViewsByEntity,
    getCustomRules
} 