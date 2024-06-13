const axios = require('axios');
const menuItems = require('../Model/MenuItem');

exports.createShipment = async (order, person) => {
    console.log("Order", order);

    // Extract delivery info
    const deliveryInfo = order.deliveryInfo[0]; // Assuming there's only one deliveryInfo object in the array

    // Fetch menu items asynchronously and build the products array
    const products = await Promise.all(order.items.map(async (item) => {
        const menuItem = await menuItems.findOne({ _id: item.menuItem._id });
        return {
            name: menuItem.name,
            sku: menuItem._id,
            qty: item.quantity,
            value: item.price,
            weight: menuItem.weight,
            country_of_origin: deliveryInfo.country
        };
    }));

    // Validate and format the ship_date
// Function to format date to YYYY-MM-DD
function formatDateToYYYYMMDD(date) {
    return date.toISOString().split('T')[0];
}

// Make a function to generate a Random Number


// Example usage with a specific delivery date
const deliveryDate = new Date(); // Use the actual delivery date here
const formattedShipDate = formatDateToYYYYMMDD(deliveryDate);

console.log('Formatted ship_date:', formattedShipDate); // Debugging line

    // Define the payload for the HTTP POST request
    const payload = {
        reference: order._id.toString().slice(0, 25), // Using order ID as reference, ensuring it's within 25 characters
        reference2: order._id.toString().slice(0, 25), // Provide a non-unique reference here
        shipment_detail: {
            weight: products.reduce((total, item) => total + item.weight, 0), // Total weight of all items
            parcels: order.items.length,
            value: order.totalAmount,
            shipping_price: order.shippingCharge,
            reference3: 'ORDERREF3',
            sales_source: 'eBay',
            rules_metadata: 'custom string',
            duty_tax_number: 'IM123456789',
            duty_tax_number_type: 'IOSS',
            ship_date: formattedShipDate,
        },
        recipient: {
            company: 'N/A',
            firstname: deliveryInfo.FirstName,
            lastname: deliveryInfo.LastName,
            address_line_1: `${deliveryInfo.houseNo}, ${deliveryInfo.buildingName}, ${deliveryInfo.streetName}`,
            city: deliveryInfo.City,
            postcode: deliveryInfo.Postcode,
            telephone: deliveryInfo.phone,
            country: deliveryInfo.country
        },
        sender: {
            company: 'Authentichef',
            firstname: 'Jay',
            lastname: 'Patel',
            address_line_1: '65 Horfield Retail Park',
            city: 'Bath',
            postcode: 'BA1 2JW',
            telephone: '01161231211',
            country: 'GB'
        },
        products: products,
        packages: order.items.map((item, index) => ({
            id: index + 1, // Assuming packages are sequentially numbered
            weight: products[index].weight,
        })),
    };

    try {
        console.log("Payload is----------------->>>>>>>>>>>>>>>>>>>>", payload);
        // Make the HTTP POST request using axios
        const response = await axios.post('https://api.shiptheory.com/v1/shipments', payload, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
               'Authorization': 'Bearer c881b8fd58999b1041e5194f1a5babb1e235b0280c3d5cfa27b832dfcfe39ba9'
            }
        });

        console.log("Response shipment", response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating shipment:', error.response ? error.response.data : error.message);
        return null;
    }
};



// Make a api to Reterive the shipment

exports.getShipment = async (shipmentId) => {
    try {
        const response = await axios.get(`https://api.shiptheory.com/v1/shipments/${shipmentId}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer c881b8fd58999b1041e5194f1a5babb1e235b0280c3d5cfa27b832dfcfe39ba9'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching shipment:', error.response ? error.response.data : error.message);
        return null;
    }
}

// Make a api to get the list of all shipment

exports.getAllShipment = async () => {
    try {
        const response = await axios.get('https://api.shiptheory.com/v1/shipments', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer c881b8fd58999b1041e5194f1a5babb1e235b0280c3d5cfa27b832dfcfe39ba9'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching shipments:', error.response ? error.response.data : error.message);
        return null;
    }
}

// Make a api to show the Download label

exports.ShipmentPdf = async (req, res) => {
    try {
        // Validate input
        if (!req.body.reference_1 || !req.body.reference_2) {
            return res.status(400).json({ error: 'Both reference_1 and reference_2 are required' });
        }

        // Make the API request to Shiptheory
        const response = await axios.post('https://api.shiptheory.com/v1/picking_lists/download', 
            {
                shipments: [
                    {
                        reference_1: req.body.reference_1
                    },
                    {
                        reference_2: req.body.reference_2
                    }
                ]
            }, 
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer c881b8fd58999b1041e5194f1a5babb1e235b0280c3d5cfa27b832dfcfe39ba9'
                }
            }
        );

        // Log and send the response
        console.log("Response", response.data);
        res.json(response.data);

    } catch (error) {
        // Log the detailed error response
        console.error('Error fetching shipments:', error.response ? error.response.data : error.message);

        // Send detailed error response to the client
        if (error.response) {
            res.status(error.response.status).json({
                error: error.response.data.message || 'An error occurred while fetching shipments.',
                details: error.response.data
            });
        } else {
            res.status(500).json({ 
                error: 'An internal server error occurred while fetching shipments.',
                details: error.message
            });
        }
    }
};




// Make a api to delete the shipment

exports.deleteShipment = async (shipmentId) => {
    
    try {
        const response = await axios.delete(`https://api.shiptheory.com/v1/shipments/${shipmentId}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer c881b8fd58999b1041e5194f1a5babb1e235b0280c3d5cfa27b832dfcfe39ba9'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error deleting shipment:', error.response ? error.response.data : error.message);
        return null;
    }
}

