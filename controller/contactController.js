const nodemailer = require("nodemailer");

exports.submitContactForm = async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Validate form data
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ msg: "Please fill in all fields" });
  }

  try {
    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail", // Use a service like Gmail, or configure your SMTP server
      auth: {
        user: "pratikjojode2004@gmail.com", // Your email
        pass: "cicq eyop wbru fgfp", // Your app-specific password
      },
    });

    // Set up email data for user confirmation
    let userMailOptions = {
      from: '"Hospital Management System"pratikjojode2004@gmail.com',
      to: email, // User's email
      subject: "Thank You for Contacting Us",
      text: `Dear ${name},\n\nThank you for your message. We have received your contact form submission and will get back to you soon.\n\nBest regards,\nHospital Management System`,
    };

    // Set up email data for admin notification
    let adminMailOptions = {
      from: '"Hospital Management System"pratikjojode2004@gmail.com',
      to: "pratikjojode2004@gmail.com", // Admin's email
      subject: "New Contact Form Submission",
      text: `You have a new contact form submission from ${name}.\n\nDetails:\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
      html: `
        <p>You have a new contact form submission:</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
      `,
    };

    // Send mail to user
    await transporter.sendMail(userMailOptions);

    // Send mail to admin
    await transporter.sendMail(adminMailOptions);

    console.log("Messages sent");

    // Respond with a success message
    res.status(200).json({
      msg: "Thank you for your message. We will get back to you soon.",
    });
  } catch (error) {
    console.error("Error sending email: ", error);
    res.status(500).json({
      msg: "There was an error sending your message. Please try again later.",
    });
  }
};
