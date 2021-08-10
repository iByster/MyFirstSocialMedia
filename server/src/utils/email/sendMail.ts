import { createTransporter } from './createTransporter';

interface EmailOptions {
  subject: string;
  html: string;
  to: string;
}

export const sendEmail = async (emailOptions: EmailOptions) => {
  let emailTransporter = await createTransporter();
  await emailTransporter.sendMail({
    ...emailOptions,
    from: 'redgoblinmask@gmail.com',
  });
};
