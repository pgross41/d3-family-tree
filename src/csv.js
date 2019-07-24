const _ = require('lodash');

export function parse(csvString) {

    // Read CSV
    const rows = csvString.split('\n');
    const headers = rows.shift().split(',');
    const data = _.map(rows, row => {
        const rowArray = row.split(',');
        return _.keyBy(rowArray, col => headers[rowArray.indexOf(col)])
    });

    // Create relationships
    const getChildren = (parent) => _.chain(data)
        .filter(row => parent.name == row.parentName)
        .map(child => _.extend(child, { children: getChildren(child) }))
        .each(row => row._included = true)
        .value()
    const root = _.find(data, row => _.isEmpty(row.parentName));
    const out = _.extend(root, { children: getChildren(root), _included: true });

    // Check for orphans, likely due to misspelled name or parentName
    _.chain(data)
        .filter(row => !row._included)
        .each(badRow => console.error(`${badRow.name} is not included! parentName: ${badRow.parentName}`))
        .value();

    return out;
}
