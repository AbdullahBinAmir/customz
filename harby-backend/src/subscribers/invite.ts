import { EventBusService } from "@medusajs/medusa"

type InjectedDependencies = {
    eventBusService: EventBusService
    sendgridService: any
}

class InviteSubscriber {
    protected sendGridService: any

    constructor({
        eventBusService,
        sendgridService,
    }: InjectedDependencies) {
        this.sendGridService = sendgridService
        eventBusService.subscribe(
            "invite.created",
            this.handleInvite
        )
    }

    handleInvite = async (data: Record<string, any>) => {
        // debugger
        const url = `${process.env.ADMIN_BASE_URL}/invite?token=${data.token}`;
        this.sendGridService.sendEmail({
            // templateId: "send-invite",
            templateId: process.env.SENDGRID_INVITE_TEMPLATE,
            //   from: "hello@medusajs.com",
            from: process.env.SENDGRID_FROM,
            to: data.user_email,
            dynamic_template_data: {
                // any data necessary for your template...
                token: url,
            },
        })
    }
}

export default InviteSubscriber

/*
import { EventBusService } from "@medusajs/medusa";
const sgMail = require('@sendgrid/mail');

type InjectedDependencies = {
    eventBusService: EventBusService;
    sendgridService: any;
};

class InviteSubscriber {
    protected sendGridService: any;

    constructor({
        eventBusService,
        sendgridService,
    }: InjectedDependencies) {
        this.sendGridService = sendgridService;
        eventBusService.subscribe("invite.created", this.handleInvite);
    }

    handleInvite = async (data: Record<string, any>) => {
        console.log("data...", data);

        // Set your SendGrid API key
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        // Define the email data
        const url = `http://localhost:7000/invite?token=${data.token}`
        const msg = {
            to: data.user_email,
            from: process.env.SENDGRID_FROM,
            templateId: process.env.SENDGRID_INVITE_TEMPLATE, // Replace with your SendGrid template ID
            dynamic_template_data: {
                token: url, // Pass the token as dynamic data
            },
        };

        // Send the email
        sgMail.send(msg)
            .then(() => {
                console.log('Email sent');
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

export default InviteSubscriber;
*/
