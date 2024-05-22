const moment = require('moment');
const adminMailOptions=(req, savedOrder, deliveryDate, deliveryInfo, payment_method_types, totalAmount ,cartItems)=>{
    const formattedDeliveryDate = moment(deliveryDate).format('YYYY-MM-DD');
    return {
        from: 'harshal.brilliance@gmail.com', // Your email address
        to: 'harshal.brilliance@gmail.com', // Admin email address
        subject: 'New Order Received ',
        html: `<html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #fff;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .header img {
                    max-width: 150px;
                }
                .order-details {
                    border-collapse: collapse;
                    width: 100%;
                }
                .order-details th, .order-details td {
                    border: 1px solid #ddd;
                    padding: 8px;
                }
                .order-details th {
                    background-color: #f2f2f2;
                    text-align: left;
                }
                .menu-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                }
                .menu-item img {
                    max-width: 100px;
                    margin-right: 10px;
                }
                .menu-item div {
                    flex: 1;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="https://authimages.s3.eu-west-2.amazonaws.com/banner-images/Color+logo+with+background+(2)+1.png" alt="authentichef">
                </div>
                <h2>New Order Received</h2>
                <p>A new order has been placed on your authentichef website.</p>
                <table class="order-details">
                    <tr>
                        <th>Order ID</th>
                        <td>${savedOrder._id}</td>
                    </tr>
                    <tr>
                        <th>Customer Name</th>
                        <td>${req.user.firstname} ${req.user.lastname}</td>
                    </tr>
                    <tr>
                        <th>Customer Email</th>
                        <td>${req.user.email}</td>
                    </tr>
                    <tr>
                        <th>Delivery Date</th>
                        <td>${formattedDeliveryDate}</td>
                    </tr>
                    <tr>
                        <th>Delivery Address</th>
                        <td>
                            <p>${deliveryInfo[0].phone}</p>
                            <p>${deliveryInfo[0].houseNo}, ${deliveryInfo[0].buildingName}</p>
                            <p>${deliveryInfo[0].streetName}, ${deliveryInfo[0].City}</p>
                            <p>${deliveryInfo[0].country}</p>
                            <p>${deliveryInfo[0].FirstName} ${deliveryInfo[0].LastName}</p>
                        </td>
                    </tr>
                    <tr>
                        <th>Payment Method</th>
                        <td>${payment_method_types}</td>
                    </tr>
                    <tr>
                        <th>Total Amount</th>
                        <td>$${totalAmount.toFixed(2)}</td>
                    </tr>
                </table>
                <h3>Menu Items:</h3>
                ${cartItems.items.map(item => `
                    <div class="menu-item">
                        <img src="${item.menuItem.ProfileImage}" alt="${item.menuItem.name}">
                        <div>
                            <p><strong>${item.menuItem.name}</strong></p>
                            <p>Quantity: ${item.quantity}</p>
                            <p>Price: $${(item.menuItem.price * item.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                `).join('')}
                <p>Please take the necessary actions to process the order.</p>
            </div>
        </body>
        </html>
        `
    }

}

module.exports = adminMailOptions