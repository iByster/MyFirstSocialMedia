import { createTransporter } from './createTransporter';

interface EmailOptions {
  subject: string;
  html: string;
  to: string;
}

export const sendEmail = async (emailOptions: EmailOptions) => {
  let emailTransporter = await createTransporter();
  await emailTransporter.sendMail(
    {
      ...emailOptions,
      from: process.env.MAIL_USERNAME,
    },
    (err, success) => {
      if (err) {
        console.error('ERROR MESSAGE', err);
      } else {
        console.log('SUCCESS MESSAGE', success);
      }
    }
  );
};
