// I have to generate a QR code for the user to scan the Menu Item

const QRCode = require('qrcode');

const generateQRCode = async (dishId) => {
    const baseUrl = 'http://www.authentichef.com/pages/chef-details'
    const url = `${baseUrl}/${dishId}`;

    try{

        const qrCodeData = await QRCode.toDataURL(url);
        return qrCodeData;

    }catch(error){
     throw new Error('Failed to generate QR code')
    }
}

module.exports = generateQRCode;