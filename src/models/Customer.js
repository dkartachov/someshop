export const Customer = (customer) => {
    return {
        id: customer.customer_id,
        name: {
            first: customer.first_name,
            last: customer.last_name,
        },
        contact: {
            email: customer.email,
            phone: customer.phone_number,
        },
    };
}