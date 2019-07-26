/**
 * Read CSV text and convert it to a JS object with parent/child relationships
 * The "children" field is an array that is populated by matching "name" to "parentName"
 * This also adds calculated metadata fields that are needed to position nodes on the tree
 */

const _ = require('lodash');

export default function (csvString) {

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
    const family = _.extend(root, { children: getChildren(root), depth: 0 });

    // Check for orphans, likely due to misspelled name or parentName
    _.chain(data)
        .filter(row => row != root & !row._included)
        .each(badRow => console.error(`${badRow.name} is not included! parentName: ${badRow.parentName}`))
        .value();

    // Calculate metadata (and remove the temp _included field)
    const metadata = { depthCounts: [1] }
    const handleChildren = (children, depth = 0) => {
        depth++;
        _.each(children, (child) => {
            delete child._included;
            metadata.depthCounts[depth] = metadata.depthCounts[depth] + 1 || 1;
            child.depth = depth;
            handleChildren(child.children, depth);
        })
    };
    handleChildren(family.children);

    return {
        family: family,
        metadata: metadata
    };
}