import { setNotificationAllowance, setAproveNotificationAgreement } from './notification.actions';
import { setStep } from './stepper.action';
import { setSelectMultipleItem } from './multipleselect';
import { setCodeEditorValue } from './codeeditor.action';
import { setToggleModal, setNameOfDeletedEntityForModal, setModalDeleted } from './modal.action';
import { setLoader } from './loader.action';
import { setCurrentPage, setPaginationRange } from './pagination.actions';

// backend actions 
import { setDefaultTasks } from './backend-actions/default-tasks.actions';
import { setAllEntities } from './backend-actions/get-entities.actions';
import { setViewsByEntity, setAllViewsByEntity } from './backend-actions/entity-by-view.actions';
import { getCustomRules } from './backend-actions/custom-rules.action';
import { setAllVocabularies } from './backend-actions/get-vocabularies.action';


export {
    setNotificationAllowance,
    setAproveNotificationAgreement,
    setStep,
    setSelectMultipleItem,
    setCodeEditorValue,
    setToggleModal,
    setNameOfDeletedEntityForModal,
    setModalDeleted,
    setLoader,
    setDefaultTasks,
    setAllEntities,
    setViewsByEntity,
    setAllViewsByEntity,
    getCustomRules,
    setAllVocabularies,
    setCurrentPage,
    setPaginationRange
} 