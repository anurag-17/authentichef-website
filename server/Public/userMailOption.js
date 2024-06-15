// userMail.js
const moment = require('moment');

const userMailOptions = (req, savedOrder, deliveryDate, deliveryInfo, totalAmount, cartItems , payment_method_types) => {
    const formattedDeliveryDate = moment(deliveryDate).format("D MMMM YYYY");
    return {
        from: process.env.CLIENT_EMAIL,
        to: req.user.email,
        subject: 'Your Order Confirmation',
        html: `
        <html>
        <head>
            <style>
                /* Add your CSS styles here */
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .logo {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .menu-item {
                    border-bottom: 1px solid #ccc;
                    padding: 10px 0;
                    display: flex;
                    align-items: center;
                }
                .menu-item img {
                    max-width: 100px;
                    margin-right: 20px;
                }
                .menu-item-details {
                    flex-grow: 1;
                }
                .menu-item-details span {
                    display: block;
                    margin-bottom: 5px;
                }
                .menu-item-details span:last-child {
                    margin-bottom: 0;
                }
                .delivery-info {
                    width: 100%;
                    border-collapse: collapse;
                }
                
                .delivery-info th,
                .delivery-info td {
                    border: 1px solid #ccc;
                    padding: 8px;
                }
                
                .delivery-info th {
                    background-color: #f2f2f2;
                    font-weight: bold;
                    text-align: left;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="logo">
                    <img src="https://authimages.s3.eu-west-2.amazonaws.com/banner-images/Color+logo+with+background+(2)+1.png" alt="Your Company Logo">
                </div>
                <p>Dear ${req.user.firstname},</p>
                <p>Thank you for placing your order with us! Your order has been successfully received.</p>
                <p><strong>Order Number:</strong> ${savedOrder.OrderNumber}</p>
                <p><strong>Transaction ID:</strong> ${savedOrder.TransactionId}</p>
                <p><strong>Delivery Date:</strong> 2-3 Working Days </p>
                <p><strong>Payment Method:</strong> ${payment_method_types}</p>
                <p><strong>Delivery Address:</strong></p>
                <table class="delivery-info">
                <thead>
                    <tr>
                        <th>Phone</th>
                        <th>House No</th>
                        <th>Building Name</th>
                        <th>Street Name</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    ${deliveryInfo.map(info => `
                        <tr>
                            <td>${info.phone}</td>
                            <td>${info.houseNo}</td>
                            <td>${info.buildingName}</td>
                            <td>${info.streetName}</td>
                            <td>${info.City}</td>
                            <td>${info.country}</td>
                            <td>${info.FirstName}</td>
                            <td>${info.LastName}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            
                <p><strong>Amount:</strong> £${savedOrder.totalAmountBeforeDiscount.toFixed(2)}</p>
                <p><strong>Discount:</strong>${savedOrder.DiscountPercentage}%</p>
                <p><strong>Discount Amount:</strong> £${savedOrder.discountApplied.toFixed(2)}</p>
                <p><strong>Shipping Charges:</strong> £${savedOrder.shippingCharge}</p>
                <p><strong>Total Amount:</strong> £${savedOrder.totalAmount.toFixed(2)}</p>
                <p>We will notify you once your order has been processed and shipped.</p>
                <p>If you have any questions or concerns, feel free to <a href="mailto:support@authentichef.com">contact us</a> at support@authentichef.com.</p>
                <div class="menu-items">
                    <p><strong>Here are the items you ordered:</strong></p>
                    ${cartItems.items.map(item => `
                        <div class="menu-item">
                            <img src="${item.menuItem.ProfileImage}" alt="${item.menuItem.name}">
                            <div class="menu-item-details">
                                <span><strong>${item.menuItem.name}</strong></span>
                                <span>Quantity: ${item.quantity}</span>
                                <span>Price Per Item: £${(item.menuItem.price ).toFixed(2)}</span>
                            </div>
                        </div>`).join('')}
                </div>
            </div>
        </body>
        </html>
        `
    };
};

module.exports = userMailOptions;
