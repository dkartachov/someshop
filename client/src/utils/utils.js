/* eslint-disable default-case */
import { modules } from "./enums"

export const getColumnProviders = (module, record) => {
    switch (module) {
        case modules.products:
            return [record.name, record.description, record.inventory, record.price];
        case modules.customers:
            return [[record.name?.first, record.name?.last].join(' ')];
        default:
            return [];
    }
}

export const getColumns = (module) => {
    switch (module) {
        case modules.products:
            return [
                {
                    field: 'name',
                    headerName: 'Product',
                    flex: 1,
                },
                {
                    field: 'description',
                    headerName: 'Description',
                    flex: 1,
                },
                {
                    field: 'inventory',
                    headerName: 'Inventory',
                    flex: 1,
                },
                {
                    field: 'price',
                    headerName: 'Price',
                    flex: 1,
                }
            ];
        case modules.customers:
            return [
                {
                    field: 'customer',
                    headerName: 'Customer',
                    valueGetter: (params) => `${params.row.name.first || ''} ${params.row.name.last || ''}`,
                    flex: 1,
                },
            ];
        case modules.orders:
            return [

            ]
    }
}

export const getAddModalFields = (module) => {
    switch (module) {
        case modules.products:
            return [
                {
                    id: 'product',
                    name: 'name',
                    placeholder: 'Product Name',
                    type: 'text',
                    variant: 'standard',
                },
                {
                    id: 'description',
                    name: 'description',
                    placeholder: 'Description',
                    type: 'text',
                    variant: 'standard',
                },
                {
                    id: 'inventory',
                    name: 'inventory',
                    placeholder: 'Inventory',
                    type: 'number',
                    variant: 'standard',
                },
                {
                    id: 'price',
                    name: 'price',
                    placeholder: 'Price',
                    type: 'number',
                    variant: 'standard',
                }
            ]
    }
}