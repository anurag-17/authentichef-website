// userMail.js
const moment = require('moment');

// const userMailOptions = (req, savedOrder, deliveryDate, deliveryInfo, totalAmount, cartItems , payment_method_types) => {
//     const formattedDeliveryDate = moment(deliveryDate).format("D MMMM YYYY");
//     return {
//         from: process.env.CLIENT_EMAIL,
//         to: req.user.email,
//         subject: 'Your Order Confirmation',
//         html: `
//         <html>
//         <head>
//             <style>
//                 /* Add your CSS styles here */
//                 body {
//                     font-family: Arial, sans-serif;
//                     background-color: #f4f4f4;
//                     margin: 0;
//                     padding: 0;
//                 }
//                 .container {
//                     max-width: 600px;
//                     margin: 0 auto;
//                     padding: 20px;
//                     background-color: #fff;
//                     border-radius: 8px;
//                     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//                 }
//                 .logo {
//                     text-align: center;
//                     margin-bottom: 20px;
//                 }
//                 .menu-item {
//                     border-bottom: 1px solid #ccc;
//                     padding: 10px 0;
//                     display: flex;
//                     align-items: center;
//                 }
//                 .menu-item img {
//                     max-width: 100px;
//                     margin-right: 20px;
//                 }
//                 .menu-item-details {
//                     flex-grow: 1;
//                 }
//                 .menu-item-details span {
//                     display: block;
//                     margin-bottom: 5px;
//                 }
//                 .menu-item-details span:last-child {
//                     margin-bottom: 0;
//                 }
//                 .delivery-info {
//                     width: 100%;
//                     border-collapse: collapse;
//                 }
                
//                 .delivery-info th,
//                 .delivery-info td {
//                     border: 1px solid #ccc;
//                     padding: 8px;
//                 }
                
//                 .delivery-info th {
//                     background-color: #f2f2f2;
//                     font-weight: bold;
//                     text-align: left;
//                 }
//             </style>
//         </head>
//         <body>
//             <div class="container">
//                 <div class="logo">
//                     <img src="https://authimages.s3.eu-west-2.amazonaws.com/banner-images/Color+logo+with+background+(2)+1.png" alt="Your Company Logo">
//                 </div>
//                 <p>Dear ${req.user.firstname},</p>
//                 <p>Thank you for placing your order with us! Your order has been successfully received.</p>
//                 <p><strong>Order Number:</strong> ${savedOrder.OrderNumber}</p>
//                 <p><strong>Transaction ID:</strong> ${savedOrder.TransactionId}</p>
//                 <p><strong>Delivery Date:</strong> 2-3 Working Days </p>
//                 <p><strong>Payment Method:</strong> Stripe </p>
//                 <p><strong>Delivery Address:</strong></p>
//                 <table class="delivery-info">
//                 <thead>
//                     <tr>
//                         <th>Phone</th>
//                         <th>House No</th>
//                         <th>Building Name</th>
//                         <th>Street Name</th>
//                         <th>City</th>
//                         <th>Country</th>
//                         <th>First Name</th>
//                         <th>Last Name</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     ${deliveryInfo.map(info => `
//                         <tr>
//                             <td>${info.phone}</td>
//                             <td>${info.houseNo}</td>
//                             <td>${info.buildingName}</td>
//                             <td>${info.streetName}</td>
//                             <td>${info.City}</td>
//                             <td>${info.country}</td>
//                             <td>${info.FirstName}</td>
//                             <td>${info.LastName}</td>
//                         </tr>
//                     `).join('')}
//                 </tbody>
//             </table>
            
//                 <p><strong>Amount:</strong> £${savedOrder.totalAmountBeforeDiscount.toFixed(2)}</p>
//                 <p><strong>Discount:</strong> ${savedOrder.DiscountPercentage} % </p>
//                 <p><strong>Discount Amount: </strong> £${savedOrder.discountApplied.toFixed(2)}</p>
//                 <p><strong>Shipping Charges:</strong> £${savedOrder.shippingCharge}</p>
//                 <p><strong>Total Amount:</strong> £${savedOrder.totalAmount.toFixed(2)}</p>
//                 <p>We will notify you once your order has been processed and shipped.</p>
//                 <p>If you have any questions or concerns, feel free to <a href="mailto:support@authentichef.com">contact us</a> at support@authentichef.com.</p>
//                 <div class="menu-items">
//                     <p><strong>Here are the items you ordered:</strong></p>
//                     ${cartItems.items.map(item => `
//                         <div class="menu-item">
//                             <img src="${item.menuItem.ProfileImage}" alt="${item.menuItem.name}">
//                             <div class="menu-item-details">
//                                 <span><strong>${item.menuItem.name}</strong></span>
//                                 <span>Quantity: ${item.quantity}</span>
//                                 <span>Price Per Item: £${(item.menuItem.price ).toFixed(2)}</span>
//                             </div>
//                         </div>`).join('')}
//                 </div>
//             </div>
//         </body>
//         </html>
//         `
//     };
// };

const userMailOptions = (req, savedOrder, deliveryDate, deliveryInfo, totalAmount, cartItems , payment_method_types) => {
    const formattedDeliveryDate = moment(deliveryDate).format("D MMMM YYYY");
    return {
        from: process.env.CLIENT_EMAIL,
        to: req.user.email,
        subject: 'New Order Received',
        html: `
       <html>
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
      border: 1px solid #ddd;

    }

    .order-details {
      border-collapse: collapse;
      width: 100%;
    }

    .order-details th,
    .order-details td {
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

    .head {
      display: flex;
      justify-content: center
    }

    .svg {
      width: 30px;
      margin: 0px 5px;
    }
    .policy{
      text-align: center;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <img src="https://authimages.s3.eu-west-2.amazonaws.com/logo.png" alt="authentichef">
    </div>
    <div class="header">
      <p><strong>Thank you for your Order</strong></p>
      <table class="order-details">
          <th>Order Number</th>
          <td>${savedOrder.OrderNumber}</td>
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
          <th> Customer Contact No. </th>
          <td>${deliveryInfo[0].phone}</td>
        </tr>

        <tr>
        <th> Delivery Name</th>
        <td>${deliveryInfo[0].FirstName} ${deliveryInfo[0].LastName}</td>
        </tr>
        <tr>

          <th>Delivery Address</th>
          <td>
            <p>${deliveryInfo[0].houseNo}, ${deliveryInfo[0].buildingName}</p>
            <p>${deliveryInfo[0].streetName}, ${deliveryInfo[0].City}</p>
            <p>${deliveryInfo[0].country}</p>
          </td>
        </tr>
        <tr>
          <th>Delivery Date</th>
          <td> 2-3 Working Days </td>
        </tr>

        <tr>
          <th>Payment Method</th>
          <td> Stripe </td>
        </tr>
        <tr>
          <th>Order Value</th>
          <td>£${savedOrder.totalAmountBeforeDiscount.toFixed(2)}</td>
        </tr>
        <tr>
          <th>Discount</th>
          <td> ${savedOrder.DiscountPercentage} % </td>
        </tr>

        <tr>
        <th>Discount Amount</th>
        <td>£${savedOrder.discountApplied.toFixed(2)}</td>
        </tr>

        <tr>
          <th>Shipping</th>
          <td>£${savedOrder.shippingCharge}</td>
        </tr>


        <tr>
          <th>Total Amount (with discount)</th>
          <td>£${savedOrder.totalAmount.toFixed(2)}</td>
        </tr>

      </table>
      <p>To view this order, visit authentichef.com</p>
      <h3>
        Thank you for supporting your community and exploring authentic cuisine from around the world</h3>

    </div>

    <p class="header">Follow us to discover new dishes and chefs.</p>
  <div class="svg-box" style="text-align: center;">
  <a href="https://www.facebook.com/people/Authentichef/61553576243338/" target="_blank">
    <img class="svg" src="https://authimages.s3.eu-west-2.amazonaws.com/download.png" />
  </a>
  
  <a href="https://www.instagram.com/authentichef/" target="_blank">
    <img class="svg" src="https://authimages.s3.eu-west-2.amazonaws.com/download.jpeg" />
  </a>
</div>

    <p class="header">Authentichef Ltd Registered office 167-169, Great Portland Street, 5th Floor, London W1W 5PF.
      Registered in
      England. Company registration number 15236453. VAT number 465 112 412</p>
  <a href="http://www.authentichef.com/" class="header">
    <p>
        This order is subject to Authentichef Terms and Conditions and Privacy and Cookie, and Refund Policy.
    </p>
</a>

  </div style="text-align: center;">
 <p class="policy"> © 2024 Authentichef | All Rights Reserved  </p>
</body>

</html>
        `
    };
};

module.exports = userMailOptions;
