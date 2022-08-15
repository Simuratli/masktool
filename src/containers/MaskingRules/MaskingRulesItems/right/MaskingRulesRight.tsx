import React from 'react'
import { CodeEditor, Button } from '../../../../components'
import MaskRulesRightActions from './MaskRulesRightActions'
import MaskingRulesRightSelections from './MaskingRulesRightSelections'
import MaskingRulesSavedItems from './MaskingRulesSavedItems';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../../../redux/reducers/reducer.types'

function MaskingRulesRight() {

  const codeEditorState = useSelector((state: ReducerType) => state.codeEditorReducer.level)

  return (
    <div className='masking__rules__right'>

      <div className="masking__rules__right__container">

        <div className="masking__rules__right__table">

          <div className="masking__rules__right__table__header">
            <div className="masking__rules__right__table__cell cell_1">data type</div>
            <div className="masking__rules__right__table__cell cell_2">template</div>
            <div className="masking__rules__right__table__cell cell_3">suggested result</div>
          </div>

          <div className="masking__rules__right__table__body">
            <div className="masking__rules__right__table__cell cell_1">Email</div>
            <div className="masking__rules__right__table__cell cell_2">{`{RandomLetters(7)}@test.com`}</div>
            <div className="masking__rules__right__table__cell cell_3">fdbcxdh@test.com</div>
          </div>

          <div className="masking__rules__right__table__body">
            <div className="masking__rules__right__table__cell cell_1">
              {'Phone'} <br />
              {`number`}
            </div>
            <div className="masking__rules__right__table__cell cell_2">
              {'380(67))'} <br />
              {'{RandomNumber(1000000;'} <br />
              {`9999999)}`}
            </div>
            <div className="masking__rules__right__table__cell cell_3">+380(67)1234567</div>
          </div>

          <div className="masking__rules__right__table__body">
            <div className="masking__rules__right__table__cell cell_1">
              {'Name and'} <br />
              {`Last name`}
            </div>
            <div className="masking__rules__right__table__cell cell_2">
              {'{RandomLine(uds_UserFirstNa)}'} <br />
              {'mes.BDM)}'} <br />
              {`{RandomLine(uds_UserLastNa`}<br />
              {`mes.BDM)}`}
            </div>
            <div className="masking__rules__right__table__cell cell_3">Peter Smirnovsky</div>
          </div>

          <div className="masking__rules__right__table__body">
            <div className="masking__rules__right__table__cell cell_1">
              {'Contract'} <br />
              {`number`}
            </div>
            <div className="masking__rules__right__table__cell cell_2">
              {'ND-{RandomNumber'} <br />
              {'(10; 1000000)}'}
            </div>
            <div className="masking__rules__right__table__cell cell_3">ND-592684</div>
          </div>

          <div className="masking__rules__right__table__body">
            <div className="masking__rules__right__table__cell cell_1">Static text</div>
            <div className="masking__rules__right__table__cell cell_2">{`This is а some static text`}</div>
            <div className="masking__rules__right__table__cell cell_3">This is а some static text</div>
          </div>

          <div className="masking__rules__right__table__body">
            <div className="masking__rules__right__table__cell cell_1">
              {'Dynamic'} <br />
              {`text`}
            </div>
            <div className="masking__rules__right__table__cell cell_2">
              {'Hi {RandomLine '} <br />
              {`(new_firstname.bdm.html)},`}<br />
              {`we received your payment`}<br />
              {"${RandomNumber(10; 1000)}"}<br />
              {"in {RandomDate(01/01/2020;"}<br />
              {"01/01/2022)}."}
            </div>
            <div className="masking__rules__right__table__cell cell_3">
              {'Hi Jane, we received'} <br />
              {`your payment $57 in`}<br />
              {"05/07/2021."}
            </div>
          </div>

        </div>

        <div className="masking__rules__right__actionbox">
          <MaskingRulesRightSelections />
          <div className='code__editor__container'>
            <CodeEditor border={codeEditorState} />
            <span className={`code__editor__text ${codeEditorState}`}>{codeEditorState}</span>
          </div>
          <MaskRulesRightActions />
          {/* <MaskingRulesSavedItems /> */}
        </div>

      </div>


      <div className="masking__rules__right__next">
        {/* <Button text="Next" /> */}
      </div>
    </div>
  )
}

export default React.memo(MaskingRulesRight)