const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'deliverypcboyars@gmail.com',
    pass: 'kawa123Kawa',
  },
})


const createUserConfirmOrderEmail = async ({ _id, email }) => {
  const mail = await transporter.sendMail({
    from: '"PCboyars delivery" <deliverypcboyars@gmail.com>',
    to: `${email}`,
    subject: "Order Confirmation",
    text: "Confirmed",
    html: `
      <h3>Your order with number ${_id} confirmed ;)</h3>
    `
  })

  return mail
}

const createAdminConfirmOrderEmail = async ({ _id, email, adress, fullName, phone }, adminEmail = 'bohdanboyko13@yandex.ru') => {
  const mail = await transporter.sendMail({
    from: `"PCboyars delivery" <deliverypcboyars@gmail.com>`,
    to: `${adminEmail}`,
    subject: `Order with number ${_id} has been created`,
    text: "Confirmed",
    html: `
      <h2>New order with number ${_id}</h2>

      <ul>
        <li>Ordered by: ${fullName}</li>
        <li>Adress: ${adress}</li>
        <li>Phone ${phone}number: </li>
        <li>Email: ${email}</li>
      </ul>
    `
  })

  return mail
}


module.exports = {
  createUserConfirmOrderEmail,
  createAdminConfirmOrderEmail
}