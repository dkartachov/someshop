import { modules } from "./enums"

export const getColumnProviders = (module, item) => {
    switch (module) {
        case modules.products:
            return [item.name, item.description, item.inventory, item.price];
        case modules.customers:
            return [[item.name.first, item.name.last].join(' ')];
        default:
            return [];
    }
}