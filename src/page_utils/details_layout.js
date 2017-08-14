import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  getCurrentRecord,
  getActionWord,
  getCurrentTabRows,
  getMode,
  getFieldDefinitions,
  refSelector,
  getRefList
} from "../selectors";
import DetailsRow from "./details_row";

const mstp = (state, ownProps) => ({
  current_tab_rows: getCurrentTabRows(state[ownProps.page]),
  current_record: getCurrentRecord(state[ownProps.page]),
  action_word: getActionWord(state[ownProps.page]),
  mode: getMode(state[ownProps.page]),
  field_definitions: getFieldDefinitions(state[ownProps.page]),
  ref_selector_sales_rep: refSelector(state["sales_reps"]),
  ref_selector_local_foreign: refSelector(state["local_foreigns"]),
  ref_selector_pay_plan: refSelector(state["pay_plans"]),
  ref_selector_primary_book: refSelector(state["primary_books"]),
  ref_selector_category: refSelector(state["categories"]),
  ref_selector_compensation_plan: refSelector(state["compensation_plans"]),
  sales_rep_ref_list: getRefList(state["sales_reps"]),
  local_foreign_ref_list: getRefList(state["local_foreigns"]),
  pay_plan_ref_list: getRefList(state["pay_plans"]),
  primary_book_ref_list: getRefList(state["primary_books"]),
  category_ref_list: getRefList(state["categories"]),
  compensation_plan_ref_list: getRefList(state["compensation_plans"])
});

const DetailsWrapper = styled.div`
`;

const DetailsLayout = props => {
  const { current_tab_rows, current_record } = props;

  return current_record === null
    ? null
    : <DetailsWrapper>
        {current_tab_rows.map((row, idx) => {
          return <DetailsRow key={idx} row_fields={row} {...props} />;
        })}
      </DetailsWrapper>;
};

export default connect(mstp)(DetailsLayout);
