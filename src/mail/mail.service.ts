import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(mailData: any) {
    await this.mailerService.sendMail({
      to: mailData.to,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: mailData.subject,
      template: `./${mailData.template}`, // `.hbs` extension is appended automatically
      context: mailData.context,
    });
  }
}
