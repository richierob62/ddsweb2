import React from "react";
import styled from "styled-components";
import DetailField from "./details_field";

const RowWrapper = styled.div`
    display: flex;
    font-size: 0.7rem;
    width: 100%;
    flex-wrap: nowrap;
`;

const DetailsRow = props => {
  const { field_definitions, row_fields } = props;
  return (
    <RowWrapper>
      {row_fields.map(field_name => {
        return (
          <DetailField
            key={field_name}
            field_name={field_name}
            field_definition={field_definitions.get(field_name)}
            {...props}
          />
        );
      })}
    </RowWrapper>
  );
};

export default DetailsRow;
