import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("CLERK_WEBHOOK_SECRET is not set");
      return new Response("Webhook configuration error", { status: 500 });
    }

    const svix_id = req.headers.get("svix-id");
    const svix_signature = req.headers.get("svix-signature");
    const svix_timestamp = req.headers.get("svix-timestamp");

    if (!svix_id || !svix_signature || !svix_timestamp) {
      return new Response("Missing svix headers", { status: 400 });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(webhookSecret);
    let evt: WebhookEvent;

    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-signature": svix_signature,
        "svix-timestamp": svix_timestamp,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new Response("Invalid svix headers", { status: 400 });
    }

    const eventType = evt.type;

    if (eventType === "user.created") {
      const { id, first_name, last_name, email_addresses, image_url } =
        evt.data;

      if (!email_addresses || email_addresses.length === 0) {
        console.error("User created event missing email address:", evt.data);
        return new Response("Missing email address in user data", {
          status: 400,
        });
      }

      const email = email_addresses[0].email_address;
      const name = `${first_name || ""} ${last_name || ""}`.trim() || email;

      try {
        await ctx.runMutation(api.users.syncUser, {
          email,
          name,
          image: image_url,
          clerkId: id,
        });
        console.log(`Synced user: ${id}, Email: ${email}`);
      } catch (error) {
        console.error("Error syncing user:", error);
        return new Response("Failed to sync user", { status: 500 });
      }
    } else {
      console.log(`Received webhook event: ${eventType}`);
    }

    return new Response("Webhook received", { status: 200 });
  }),
});

export default http;
