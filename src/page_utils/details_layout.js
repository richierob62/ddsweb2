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

  ref_selector_ad_type: refSelector(state['ad_types']),
  ref_selector_category: refSelector(state['categories']),
  ref_selector_compensation_plan: refSelector(state['compensation_plans']),
  ref_selector_customer: refSelector(state['customers']),
  ref_selector_field: refSelector(state['fields']),
  ref_selector_finding_line: refSelector(state['finding_lines']),
  ref_selector_heading: refSelector(state['headings']),
  ref_selector_local_foreign: refSelector(state['local_foreigns']),
  ref_selector_order_line: refSelector(state['order_lines']),
  ref_selector_order: refSelector(state['orders']),
  ref_selector_order_status: refSelector(state['order_statuses']),
  ref_selector_page_type: refSelector(state['page_types']),
  ref_selector_pay_plan: refSelector(state['pay_plans']),
  ref_selector_primary_book: refSelector(state['primary_books']),
  ref_selector_sales_rep: refSelector(state['sales_reps']),
  ref_selector_source_book: refSelector(state['source_books']),
  ref_selector_udac: refSelector(state['udacs']),
  
  ad_type_ref_list : getRefList(state['ad_types']),
  category_ref_list : getRefList(state['categories']),
  compensation_plan_ref_list : getRefList(state['compensation_plans']),
  customer_ref_list : getRefList(state['customers']),
  field_ref_list : getRefList(state['fields']),
  finding_line_ref_list : getRefList(state['finding_lines']),
  heading_ref_list : getRefList(state['headings']),
  local_foreign_ref_list : getRefList(state['local_foreigns']),
  order_line_ref_list : getRefList(state['order_lines']),
  order_ref_list : getRefList(state['orders']),
  order_status_ref_list : getRefList(state['order_statuses']),
  page_type_ref_list : getRefList(state['page_types']),
  pay_plan_ref_list : getRefList(state['pay_plans']),
  primary_book_ref_list : getRefList(state['primary_books']),
  sales_rep_ref_list : getRefList(state['sales_reps']),
  source_book_ref_list : getRefList(state['source_books']),
  udac_ref_list : getRefList(state['udacs']),

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
