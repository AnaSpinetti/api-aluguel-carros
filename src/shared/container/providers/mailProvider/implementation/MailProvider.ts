import { injectable } from "tsyringe";
import nodemailer, {Transporter} from "nodemailer";
import { IMailProvider } from "../IMailProvider";
import handlebars from "handlebars";
import fs from "fs";

@injectable()
class MailProvider implements IMailProvider{
    private client: Transporter;
    constructor(){
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    password: account.pass
                }
            }).catch(err => console.error(err))
            this.client = transporter
        })
    }
    async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString("utf-8");
        const templateParse = handlebars.compile(templateFileContent);

        const templateHtml = templateParse(variables);

        const message = await this.client.sendMail({
            to, 
            from: "rentx <noreply@rentx.com>",
            subject,
            html: templateHtml
        })
    }

}

export {MailProvider}