const list = require('./ipv4-address-space.json');

/**
 *
 * @param {number} byte
 */
export function findAssignment (byte) {
    const prefix = `${byte.toString().padStart(3,"0")}/8`;

    return list.find(item => item.Prefix === prefix);
}