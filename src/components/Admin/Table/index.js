import React, { createRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { v4 as uuidv4 } from 'uuid';

import './index.scss';

const MAX_LEN = 15;

const Table = ({ fields, items }) => {
  const tableHeader = createRef();
  const tableBodyHeader = createRef();
  const tableBody = createRef();

  useEffect(() => {
    if (!tableHeader.current && !tableBodyHeader.current && !tableBody.current) return;

    // .table .table-[body|header] table thead *
    const tableHeaderChilds = Array.from(tableHeader.current.children);
    const tableBodyHeaderChilds = Array.from(tableBodyHeader.current.children);

    // .table .table-[body|header] table thead tr *
    const tableHeaderColumns = Array.from(tableHeaderChilds[0].children);
    const tableBodyHeaderColumns = Array.from(tableBodyHeaderChilds[0].children);

    // For each column, apply the width of the body header on the header.
    for (const index in tableBodyHeaderColumns) {
      const width = tableBodyHeaderColumns[index].getBoundingClientRect().width;
      tableHeaderColumns[index].style.width = `${width}px`;
    }

    // Set a negative margin for the body header so as to hide it.
    const bodyHeaderHeight = tableBodyHeader.current.getBoundingClientRect().height;
    tableBody.current.style.marginTop = `-${bodyHeaderHeight}px`;
  }, [tableHeader, tableBodyHeader, tableBody]);

  const headerMapper = (fields) => (
    <tr>
      {fields.map((field) => (
        <th key={uuidv4()}>{field.name}</th>
      ))}
    </tr>
  );

  const itemsMapper = (items) =>
    items.map((item) => (
      <tr key={item.id}>
        {fields.map((field) => {
          const val = item[field.field];
          const str = typeof val === 'string' ? val : val.join(', ');

          return <td key={uuidv4()}>{str.length > MAX_LEN ? str.slice(0, MAX_LEN) + '...' : str}</td>;
        })}
      </tr>
    ));

  return (
    <div className='table'>
      <div className='table-header'>
        <table>
          <thead ref={tableHeader}>{headerMapper(fields)}</thead>
        </table>
      </div>

      <div className='table-body'>
        <table ref={tableBody}>
          <thead ref={tableBodyHeader}>{headerMapper(fields)}</thead>
          <tbody>{itemsMapper(items)}</tbody>
        </table>
      </div>
    </div>
  );
};

Table.propTypes = {
  fields: PropTypes.array,
  items: PropTypes.array,
};

export default Table;
