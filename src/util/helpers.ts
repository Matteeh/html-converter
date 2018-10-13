
/**
 * Check that an object has same props as the model
 * @param obj to check
 * @param model to compare with
 */
function checkProps(obj, model): boolean {
    const objects = {...obj, ...model};
    const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
    const union = new Set(allKeys);
    return objects.every(object => union.size === Object.keys(object).length);
}