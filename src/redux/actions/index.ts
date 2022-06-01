import { setNotificationAllowance, setAproveNotificationAgreement } from './notification.actions';
import { setStep } from './stepper.action';
import { setSelectMultipleItem } from './multipleselect';
import { setCodeEditorValue } from './codeeditor.action';
import { setToggleModal, setNameOfDeletedEntityForModal, setModalDeleted, setModalToggleActions, setModaleActionsAllow, setModalAddEntity, setModalAddField } from './modal.action';
import { setLoader } from './loader.action';
import { setCurrentPage, setPaginationRange } from './pagination.actions';
import { setProgressAdd, setProgressReset } from './progress.action'


// backend actions 
import { setDefaultTasks, setPaginatedTasks } from './backend-actions/default-tasks.actions';
import { setAllEntities } from './backend-actions/get-entities.actions';
import { setViewsByEntity, setAllViewsByEntity } from './backend-actions/entity-by-view.actions';
import { getCustomRules } from './backend-actions/custom-rules.action';
import { setAllVocabularies } from './backend-actions/get-vocabularies.action';
import { prepareEntitiesForDelete, prepareEntitiesForDeleteItemsFromArray, prepareEntitiesForDeleteItemsPutThemAll } from './backend-actions/prepare-entities-for-delete';
import { setCurrentRequest, setOldRequest } from './backend-actions/request-progress.action';
import { setCustomParameterCodeEditor, setCustomParameterRuleType, setCustomParameterRuleName, setSavedRule, setCompareForSaveChanges } from './backend-actions/custom-parameters.actions'
import { setStableDefaultTasks, setStableEntityByViews, setStableMainName, setStableName, setStableSearchName, setStableEtc } from './backend-actions/stable-data.actions'

export {
    setModalAddEntity,
    setModalAddField,
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
    setPaginatedTasks,
    setAllEntities,
    setViewsByEntity,
    setAllViewsByEntity,
    getCustomRules,
    setAllVocabularies,
    setCurrentPage,
    setPaginationRange,
    setProgressAdd,
    setProgressReset,
    prepareEntitiesForDelete,
    prepareEntitiesForDeleteItemsFromArray,
    setCurrentRequest,
    setOldRequest,
    setModalToggleActions,
    setModaleActionsAllow,
    prepareEntitiesForDeleteItemsPutThemAll,
    setCustomParameterCodeEditor,
    setCustomParameterRuleType,
    setCustomParameterRuleName,
    setSavedRule,
    setCompareForSaveChanges,
    setStableDefaultTasks,
    setStableEntityByViews,
    setStableMainName,
    setStableName,
    setStableSearchName,
    setStableEtc
} 