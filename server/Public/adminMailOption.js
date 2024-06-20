// const moment = require('moment');
// const adminMailOptions=(req, savedOrder, deliveryDate, deliveryInfo, payment_method_types, totalAmount ,cartItems)=>{
//     const formattedDeliveryDate = moment(deliveryDate).format('YYYY-MM-DD');
//     return {
//         from: process.env.CLIENT_EMAIL, // Your email address
//         to: process.env.CLIENT_EMAIL, // Admin email address
//         subject: 'New Order Received ',
//         html: `<html>
//         <head>
//             <style>
//                 body {
//                     font-family: Arial, sans-serif;
//                     line-height: 1.6;
//                     background-color: #f4f4f4;
//                     margin: 0;
//                     padding: 0;
//                 }
//                 .container {
//                     max-width: 600px;
//                     margin: 0 auto;
//                     padding: 20px;
//                     background-color: #fff;
//                     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//                 }
//                 .header {
//                     text-align: center;
//                     margin-bottom: 20px;
//                 }
//                 .header img {
//                     max-width: 150px;
//                 }
//                 .order-details {
//                     border-collapse: collapse;
//                     width: 100%;
//                 }
//                 .order-details th, .order-details td {
//                     border: 1px solid #ddd;
//                     padding: 8px;
//                 }
//                 .order-details th {
//                     background-color: #f2f2f2;
//                     text-align: left;
//                 }
//                 .menu-item {
//                     display: flex;
//                     align-items: center;
//                     margin-bottom: 10px;
//                 }
//                 .menu-item img {
//                     max-width: 100px;
//                     margin-right: 10px;
//                 }
//                 .menu-item div {
//                     flex: 1;
//                 }
//             </style>
//         </head>
//         <body>
//             <div class="container">
//                 <div class="header">
//                     <img src="https://authimages.s3.eu-west-2.amazonaws.com/banner-images/Color+logo+with+background+(2)+1.png" alt="authentichef">
//                 </div>
//                 <h2>New Order Received</h2>
//                 <p>A New order has been placed on your authentichef website.</p>
//                 <table class="order-details">
//                     <tr>
//                         <th>Order ID</th>
//                         <td>${savedOrder._id}</td>
//                     </tr>
//                     <tr>
//                         <th>Customer Name</th>
//                         <td>${req.user.firstname} ${req.user.lastname}</td>
//                     </tr>
//                     <tr>
//                         <th>Customer Email</th>
//                         <td>${req.user.email}</td>
//                     </tr>
//                     <tr>
//                         <th>Delivery Date</th>
//                         <td>${formattedDeliveryDate}</td>
//                     </tr>
//                     <tr>
//                         <th>Delivery Address</th>
//                         <td>
//                             <p>${deliveryInfo[0].phone}</p>
//                             <p>${deliveryInfo[0].houseNo}, ${deliveryInfo[0].buildingName}</p>
//                             <p>${deliveryInfo[0].streetName}, ${deliveryInfo[0].City}</p>
//                             <p>${deliveryInfo[0].country}</p>
//                             <p>${deliveryInfo[0].FirstName} ${deliveryInfo[0].LastName}</p>
//                         </td>
//                     </tr>
//                     <tr>
//                         <th>Payment Method</th>
//                         <td>${payment_method_types}</td>
//                     </tr>
//                     <tr>
//                         <th>Amount</th>
//                         <td>$${savedOrder.totalAmountBeforeDiscount.toFixed(2)}</td>
//                     </tr>
//                     <tr>
//                         <th>Discount</th>
//                         <td>$${savedOrder.DiscountPercentage}%</td>
//                     </tr>

//                     <tr>
//                     <th>Shipping Charges</th>
//                     <td>$${savedOrder.shippingCharge}%</td>
//                 </tr>


//                     <tr>
//                         <th>Total Amount</th>
//                         <td>$${savedOrder.totalAmount.toFixed(2)}</td>
//                     </tr>

//                 </table>
//                 <h3>Menu Items:</h3>
//                 ${cartItems.items.map(item => `
//                     <div class="menu-item">
//                         <img src="${item.menuItem.ProfileImage}" alt="${item.menuItem.name}">
//                         <div>
//                             <p><strong>${item.menuItem.name}</strong></p>
//                             <p>Quantity: ${item.quantity}</p>
//                             <p>Price Per Item: $${(item.menuItem.price).toFixed(2)}</p>
//                         </div>
//                     </div>
//                 `).join('')}
//                 <p>Please take the necessary actions to process the order.</p>
//             </div>
//         </body>
//         </html>
//         `
//     }

// }

// module.exports = adminMailOptions




const moment = require("moment");
const adminMailOptions = (
  req,
  savedOrder,
  deliveryDate,
  deliveryInfo,
  payment_method_types,
  totalAmount,
  cartItems
) => {
  const formattedDeliveryDate = moment(deliveryDate).format("D MMMM YYYY");
  return {
    from: process.env.CLIENT_EMAIL, // Your email address
    to: process.env.CLIENT_EMAIL, // Admin email address
    subject: "New Order Received ",
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
        `,
  };
};

module.exports = adminMailOptions;