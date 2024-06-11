const axios = require('axios');

exports.createShipment = async (order) => {
    console.log("Order", order);

    // Define the payload for the HTTP POST request
    const payload = {
        reference: order._id.toString().slice(0, 25), // Using order ID as reference, ensuring it's within 25 characters
        reference2: order._id.toString().slice(0, 25), // Provide a non-unique reference here
        shipment_detail: {
            weight: 2.5,
            parcels: 1,
            value: 135.18,
            shipping_price: 3.99,
            reference3: 'ORDERREF3',
            sales_source: 'eBay',
            ship_date: '2024-06-10',
            rules_metadata: 'custom string',
            duty_tax_number: 'IM123456789',
            duty_tax_number_type: 'IOSS'
        },
        recipient: {
            company: 'Beard Supplies Co',
            firstname: 'William',
            lastname: 'Riker',
            address_line_1: '123 Southpaw Lane',
            city: 'Bristol',
            postcode: 'BS2 3AP',
            telephone: '01161231245',
            country: 'GB',
            tax_number: 'GB123456',
            what3words: "///what.three.words"
        },
        sender: {
            company: 'Hair Wholesaler Co.',
            firstname: 'Julian',
            lastname: 'Bashir',
            address_line_1: '65 Horfield Retail Park',
            city: 'Bath',
            postcode: 'BA1 2JW',
            telephone: '01161231211',
            country: 'GB'
        },
        products: order.items.map(item => ({
            sku: item.menuItem._id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            weight: item.menuItem.weight ,
            country_of_origin: 'GB'
        }))
    };

    try {
        console.log("Payload is----------------->>>>>>>>>>>>>>>>>>>>", payload  )
        // Make the HTTP POST request using axios
        const response = await axios.post('https://api.shiptheory.com/v1/shipments', payload, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer c881b8fd58999b1041e5194f1a5babb1e235b0280c3d5cfa27b832dfcfe39ba9' // Replace this with your actual bearer token
            }
        });

        console.log("Response shipment", response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating shipment:', error);
        return null;
    }
};
