async function submitProduct() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const inventory = document.getElementById('inventory').value;
    const price = document.getElementById('price').value;

    const missingFields = validateFields(name, description, inventory, price);

    if (missingFields) {
        alert(`${missingFields} must be filled in.`);

        return;
    }

    try {
        await createProduct({
            name,
            description,
            inventory,
            price,
        });

        clearProductFields();
    } catch(e) {
        console.error(`Error: ${e}`);
    }
}

function validateFields(name, description, inventory, price) {
    let missingFields = '';

    if (!name || !description || !inventory || !price) {
        const missing = [];

        if (!name) missing.push('name');
        if (!description) missing.push('description');
        if (!inventory) missing.push('inventory');
        if (!price) missing.push('price');

        missingFields = missing.join(',');
    }

    return missingFields;
}

async function createProduct(params) {
    console.log(params);

    const res = await fetch('http://localhost:3000/product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });

    if (res.status === 500) {
        alert('Error creating product.');
    }
}

function clearProductFields() {
    document.getElementById('name').value = '';
    document.getElementById('description').value = '';
    document.getElementById('inventory').value = '';
    document.getElementById('price').value = '';
}