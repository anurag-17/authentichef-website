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
//                 <p>A new order has been placed on your authentichef website.</p>
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

    .svg-box {
      display: flex;
      justify-content: center;

    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <img src="https://authimages.s3.eu-west-2.amazonaws.com/logo.png" alt="authentichef">
    </div>
    <div class="header">
      <p>Thank you for your Order</p>
      <table class="order-details">
        <tr>
          <th>Order Number</th>
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
          <th>Delivery Date</th>
          <td>${formattedDeliveryDate}</td>
        </tr>

        <tr>
          <th>Payment Method</th>
          <td>${payment_method_types }(Stripe)</td>
        </tr>
        <tr>
          <th>Order Value</th>
          <td>£${savedOrder.totalAmountBeforeDiscount.toFixed(2)}</td>
        </tr>
        <tr>
          <th>Discount</th>
          <td>£${savedOrder.DiscountPercentage}</td>
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
    <div class="svg-box">
      <a href="https://www.facebook.com/people/Authentichef/61553576243338/" target="_blank">
        <svg class="svg" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <title>Facebook-color</title>
            <desc>Created with Sketch.</desc>
            <defs> </defs>
            <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Color-" transform="translate(-200.000000, -160.000000)" fill="#4460A0">
                <path
                  d="M225.638355,208 L202.649232,208 C201.185673,208 200,206.813592 200,205.350603 L200,162.649211 C200,161.18585 201.185859,160 202.649232,160 L245.350955,160 C246.813955,160 248,161.18585 248,162.649211 L248,205.350603 C248,206.813778 246.813769,208 245.350955,208 L233.119305,208 L233.119305,189.411755 L239.358521,189.411755 L240.292755,182.167586 L233.119305,182.167586 L233.119305,177.542641 C233.119305,175.445287 233.701712,174.01601 236.70929,174.01601 L240.545311,174.014333 L240.545311,167.535091 C239.881886,167.446808 237.604784,167.24957 234.955552,167.24957 C229.424834,167.24957 225.638355,170.625526 225.638355,176.825209 L225.638355,182.167586 L219.383122,182.167586 L219.383122,189.411755 L225.638355,189.411755 L225.638355,208 L225.638355,208 Z"
                  id="Facebook"> </path>
              </g>
            </g>
          </g>
        </svg>
      </a>
      <a href="https://www.instagram.com/authentichef/" target="_blank">
        <svg class="svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint0_radial_87_7153)"></rect>
            <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint1_radial_87_7153)"></rect>
            <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint2_radial_87_7153)"></rect>
            <path
              d="M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z"
              fill="white"></path>
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z"
              fill="white"></path>
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M6 15.6C6 12.2397 6 10.5595 6.65396 9.27606C7.2292 8.14708 8.14708 7.2292 9.27606 6.65396C10.5595 6 12.2397 6 15.6 6H16.4C19.7603 6 21.4405 6 22.7239 6.65396C23.8529 7.2292 24.7708 8.14708 25.346 9.27606C26 10.5595 26 12.2397 26 15.6V16.4C26 19.7603 26 21.4405 25.346 22.7239C24.7708 23.8529 23.8529 24.7708 22.7239 25.346C21.4405 26 19.7603 26 16.4 26H15.6C12.2397 26 10.5595 26 9.27606 25.346C8.14708 24.7708 7.2292 23.8529 6.65396 22.7239C6 21.4405 6 19.7603 6 16.4V15.6ZM15.6 8H16.4C18.1132 8 19.2777 8.00156 20.1779 8.0751C21.0548 8.14674 21.5032 8.27659 21.816 8.43597C22.5686 8.81947 23.1805 9.43139 23.564 10.184C23.7234 10.4968 23.8533 10.9452 23.9249 11.8221C23.9984 12.7223 24 13.8868 24 15.6V16.4C24 18.1132 23.9984 19.2777 23.9249 20.1779C23.8533 21.0548 23.7234 21.5032 23.564 21.816C23.1805 22.5686 22.5686 23.1805 21.816 23.564C21.5032 23.7234 21.0548 23.8533 20.1779 23.9249C19.2777 23.9984 18.1132 24 16.4 24H15.6C13.8868 24 12.7223 23.9984 11.8221 23.9249C10.9452 23.8533 10.4968 23.7234 10.184 23.564C9.43139 23.1805 8.81947 22.5686 8.43597 21.816C8.27659 21.5032 8.14674 21.0548 8.0751 20.1779C8.00156 19.2777 8 18.1132 8 16.4V15.6C8 13.8868 8.00156 12.7223 8.0751 11.8221C8.14674 10.9452 8.27659 10.4968 8.43597 10.184C8.81947 9.43139 9.43139 8.81947 10.184 8.43597C10.4968 8.27659 10.9452 8.14674 11.8221 8.0751C12.7223 8.00156 13.8868 8 15.6 8Z"
              fill="white"></path>
            <defs>
              <radialGradient id="paint0_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                gradientTransform="translate(12 23) rotate(-55.3758) scale(25.5196)">
                <stop stop-color="#B13589"></stop>
                <stop offset="0.79309" stop-color="#C62F94"></stop>
                <stop offset="1" stop-color="#8A3AC8"></stop>
              </radialGradient>
              <radialGradient id="paint1_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                gradientTransform="translate(11 31) rotate(-65.1363) scale(22.5942)">
                <stop stop-color="#E0E8B7"></stop>
                <stop offset="0.444662" stop-color="#FB8A2E"></stop>
                <stop offset="0.71474" stop-color="#E2425C"></stop>
                <stop offset="1" stop-color="#E2425C" stop-opacity="0"></stop>
              </radialGradient>
              <radialGradient id="paint2_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                gradientTransform="translate(0.500002 3) rotate(-8.1301) scale(38.8909 8.31836)">
                <stop offset="0.156701" stop-color="#406ADC"></stop>
                <stop offset="0.467799" stop-color="#6A45BE"></stop>
                <stop offset="1" stop-color="#6A45BE" stop-opacity="0"></stop>
              </radialGradient>
            </defs>
          </g>
        </svg></a>
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
 <p class="policy> © 2024 Authentichef | All Rights Reserved  </p>
</body>

</html>
        `,
  };
};

module.exports = adminMailOptions;