function parseCSV(contents, delimiter = ',') {
  const [header, ...lines] = contents.split('\n');
  
  const csv = {
    columns: header.split(delimiter),
    lines: lines.map((line) => line.split(delimiter)),
  };

  return csv;
}

function formatCSV(csv) {
  const formatted = [];
  
  for (const line of csv.lines) {
    const formattedLine = {};
    
    for (let i = 0; i < csv.columns.length; i++) {
      const column = csv.columns[i];
      formattedLine[column] = line[i];
    }

    formatted.push(formattedLine);
  }

  return formatted;
}
