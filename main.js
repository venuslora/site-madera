require('dotenv').config();

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const juice = require('juice');
const nodemailer = require('nodemailer');
const { rateLimit } = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;
const stylesheet = fs.readFileSync(path.join(__dirname, 'css/style.css'), 'utf8');
const emailStyles = stylesheet.match(/\/\* EMAIL STYLES START \*\/([\s\S]*?)\/\* EMAIL STYLES END \*\//)?.[1] || '';

app.use(express.json({ limit: '32kb' }));

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname)));

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  pool: true,
  maxConnections: 3,
});

transporter.verify()
  .then(() => console.log('SMTP ready'))
  .catch((err) => console.error('SMTP check failed:', err.message));

const sendLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 3,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Too many messages. Wait a minute.' },
});

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

app.post('/api/send', sendLimiter, async (req, res) => {
  const fields = req.body && typeof req.body === 'object' ? req.body : {};
  const { name = '', email = '', message = '', website = '' } = fields;

  if (website) return res.json({ ok: true });

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid form data.' });
  }
  if (!name.trim() || !message.trim() || !isEmail(email)) {
    return res.status(400).json({ error: 'Name, a valid email and a message are required.' });
  }
  if (message.length > 5000) {
    return res.status(400).json({ error: 'Message is too long.' });
  }

  const cleanHeader = (value) => String(value).replace(/[\r\n]+/g, ' ').trim().slice(0, 200);
  const escapeHtml = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
  const formatHtmlField = ([key, value]) => {
    const values = Array.isArray(value) ? value : [value];
    return values.map((item) => `
      <tr class="email-field">
        <td class="email-field-label">${escapeHtml(key)}</td>
        <td class="email-field-value">${escapeHtml(item)}</td>
      </tr>`).join('');
  };
  const formatField = ([key, value]) => {
    const values = Array.isArray(value) ? value : [value];
    return values
      .map((item) => `${cleanHeader(key)}: ${key === 'message' ? String(item).trim() : cleanHeader(item)}`)
      .join('\n');
  };
  const contactFields = Object.entries(fields)
    .filter(([key]) => key !== 'website' && key !== 'message')
    .map(formatField);
  const body = [
    ...contactFields,
    '',
    '-------------------------------------------',
    message.trim(),
    '-------------------------------------------',
    `Sent: ${new Date().toISOString()}`,
  ].join('\n');
  const htmlFields = Object.entries(fields)
    .filter(([key]) => key !== 'website' && key !== 'message')
    .map(formatHtmlField)
    .join('');
  const htmlTemplate = `
    <div class="email-body">
      <div class="email-container">
        <div class="email-header">
          <div class="email-brand">Madera Project</div>
          <h1 class="email-title">Solicitare noua de contact</h1>
        </div>
        <div class="email-content">
          <table class="email-fields" role="presentation">
            <tbody>${htmlFields}</tbody>
          </table>
          <div class="email-message-section">
            <div class="email-message-label">Mesaj</div>
            <div class="email-message">${escapeHtml(message.trim()).replace(/\r?\n/g, '<br>')}</div>
          </div>
          <div class="email-meta">Trimis: ${escapeHtml(new Date().toISOString())}</div>
        </div>
      </div>
    </div>`;
  const htmlBody = juice.inlineContent(htmlTemplate, emailStyles, {
    removeStyleTags: true,
  });

  try {
    await transporter.sendMail({
      from: `"formular site" <${process.env.MAIL_FROM}>`,
      to: process.env.MAIL_TO,
      replyTo: `"${cleanHeader(name)}" <${cleanHeader(email)}>`,
      subject: `[Madera contact] from ${cleanHeader(name)}`,
      text: body,
      html: htmlBody,
    });
    res.json({ ok: true });
  } catch (err) {
    console.error('send failed:', err);
    res.status(502).json({ error: 'The message could not be sent. Try again shortly.' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
