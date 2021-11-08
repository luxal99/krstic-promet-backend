import {QuerySearchDto} from "./models/query-search-dto";

export function getQueryParameters(item: QuerySearchDto, currentAlias: string): QueryParameters {
    const splitPath = item.path.split(".");
    if (Array.isArray(splitPath) && splitPath.length > 2) {
        splitPath.pop();
        const lastItem = splitPath[splitPath.length - 1];
        return {
            comparableObject: {[lastItem]: item.value},
            path: splitPath.join(".") + ` ${item.operation} ` + `:${lastItem}`
        };
    } else if (Array.isArray(splitPath) && splitPath.length <= 2) {
        const lastItem = splitPath[splitPath.length - 1];
        const propertyName = item.key ? item.key : lastItem;
        return {
            comparableObject: {[propertyName]: item.value},
            path: currentAlias + "." + item.path + ` ${item.operation} ` + `:${propertyName}`
        };
    }
    return;
}


export interface QueryParameters {
    path?: string;
    comparableObject: {};
}
