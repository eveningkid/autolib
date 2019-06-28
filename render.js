const root = document.getElementById('root');

function makeTable(data, mapDataToColumns) {
  const table = document.createElement('table');
  table.className = 'pure-table';

  const columns = Object.keys(mapDataToColumns(data[0]));

  const header = _makeTableHeader(columns);
  table.appendChild(header);

  const tableBody = _makeTableBody();

  for (const line of data) {
    const row = _makeTableRow(
      mapDataToColumns(line), 
      columns
    );

    tableBody.appendChild(row);
  }

  table.appendChild(tableBody);
  root.appendChild(table);

  return table;
}

function _makeTableHeader(columns = []) {
  const header = document.createElement('thead');

  for (const column of columns) {
    const title = document.createTextNode(column);
    const columnNode = document.createElement('th');
    columnNode.appendChild(title);
    header.appendChild(columnNode);
  }

  return header;
}

function _makeTableBody() {
  return document.createElement('tbody');
}

function _makeTableRow(data = {}) {
  const row = document.createElement('tr');
  
  // data = { col: val, ... }
  for (const [column, value] of Object.entries(data)) {
    const content = document.createTextNode(value);
    const columnNode = document.createElement('td');
    columnNode.appendChild(content);
    row.appendChild(columnNode);
  }

  return row;
}
