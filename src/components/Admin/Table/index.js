import React, { createRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { v4 as uuidv4 } from 'uuid';

import useVerticalScroll from '../../../hooks/useVerticalScroll';

const MAX_LEN = 15;

const Table = ({ fields, items }) => {
  const tableHeaderHead = createRef();
  const tableBodyHead = createRef();

  const { container, slider } = useVerticalScroll();

  useEffect(() => {
    if (!tableHeaderHead.current && !tableBodyHead.current) return;

    // thead tr *
    const tableHeaderHeadColumns = Array.from(Array.from(tableHeaderHead.current.children)[0].children);
    const tableBodyHeadColumns = Array.from(Array.from(tableBodyHead.current.children)[0].children);

    // For each column, apply the width of the body header on the header.
    for (const index in tableBodyHeadColumns) {
      const width = tableBodyHeadColumns[index].getBoundingClientRect().width;
      tableHeaderHeadColumns[index].style.width = `${width}px`;
    }

    // Set a negative margin for the body header so as to hide it. The container is the table-body element.
    const tableBodyHeadHeight = tableBodyHead.current.getBoundingClientRect().height;
    container.current.style.marginTop = `-${tableBodyHeadHeight}px`;
  }, [tableHeaderHead, tableBodyHead]);

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
          const slicedStr = str.length > MAX_LEN ? str.slice(0, MAX_LEN) + '...' : str;

          return field.badge ? (
            <td key={uuidv4()}>
              <span className={`badge ${field.badge[str]}`}>{slicedStr}</span>
            </td>
          ) : (
            <td key={uuidv4()}>{slicedStr}</td>
          );
        })}
      </tr>
    ));

  return (
    <div className='table'>
      <div className='table-header'>
        <table>
          <thead ref={tableHeaderHead}>{headerMapper(fields)}</thead>
        </table>
      </div>

      <div className='table-body' ref={container}>
        <table ref={slider}>
          <thead ref={tableBodyHead}>{headerMapper(fields)}</thead>
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
