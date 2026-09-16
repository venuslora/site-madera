// npm i express nodemailer
// node --env-file=.env server.js     (Node 20.6+, no dotenv needed)

import express from "express";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json({ limit: "32kb" }));
app.use(express.static("public"));        // serve the form from public/index.html

// One transporter for the life of the process. It pools connections;
// creating a new one per request is the usual cause of slow sends.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT) === 465,   // true only for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  pool: true,
  maxConnections: 3,
});

// Fails fast at boot if credentials are wrong, instead of on the first visitor.
transporter.verify()
  .then(() => console.log("SMTP ready"))
  .catch((err) => console.error("SMTP check failed:", err.message));

// Crude per-IP throttle. A form endpoint left open will be found by spammers
// within days; swap for express-rate-limit if you want something proper.
const seen = new Map();
function throttled(ip) {
  const now = Date.now();
  const hits = (seen.get(ip) || []).filter((t) => now - t < 60_000);
  hits.push(now);
  seen.set(ip, hits);
  return hits.length > 3;
}

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

app.post("/api/send", async (req, res) => {
  const { name = "", email = "", topic = "", message = "", website = "" } = req.body;

  // Honeypot: real people never fill a hidden field. Answer 200 so bots
  // don't learn they were caught.
  if (website) return res.json({ ok: true });

  if (throttled(req.ip)) {
    return res.status(429).json({ error: "Too many messages. Wait a minute." });
  }
  if (!name.trim() || !message.trim() || !isEmail(email)) {
    return res.status(400).json({ error: "Name, a valid email and a message are required." });
  }
  if (message.length > 5000) {
    return res.status(400).json({ error: "Message is too long." });
  }

  // Strip CR/LF from anything that lands in a header — otherwise a crafted
  // name can inject extra headers and turn this into an open relay.
  const clean = (s) => s.replace(/[\r\n]+/g, " ").trim().slice(0, 200);

  const body = [
    `Name:    ${clean(name)}`,
    `Email:   ${clean(email)}`,
    `Topic:   ${clean(topic)}`,
    `Sent:    ${new Date().toISOString()}`,
    "",
    "-------------------------------------------",
    message,
    "-------------------------------------------",
  ].join("\n");

  try {
    await transporter.sendMail({
      // From must be a domain you control, or SPF/DKIM fail and it goes to spam.
      from: `"Website form" <${process.env.MAIL_FROM}>`,
      to: process.env.MAIL_TO,
      replyTo: `"${clean(name)}" <${clean(email)}>`,   // reply goes to the visitor
      subject: `[${clean(topic) || "Request"}] from ${clean(name)}`,
      text: body,
    });
    res.json({ ok: true });
  } catch (err) {
    console.error("send failed:", err);
    res.status(502).json({ error: "The message could not be sent. Try again shortly." });
  }
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`listening on ${process.env.PORT || 3000}`)
);
