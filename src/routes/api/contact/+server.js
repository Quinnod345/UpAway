import { env } from '$env/dynamic/private';
import { Resend } from 'resend';

const resendApiKey = env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const contactFromEmail = env.CONTACT_FROM_EMAIL || 'contact@eosbot.ai';
const contactFromName = env.CONTACT_FROM_NAME || 'Upaway Contact';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

/** @type {Map<string, { count: number; windowStart: number }>} */
const submissionAttempts = new Map();

/**
 * @param {unknown} body
 * @param {number} [status]
 */
function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json'
    }
  });
}

/** @param {unknown} value */
function normalizeField(value) {
  return typeof value === 'string' ? value.trim() : '';
}

/** @param {string} email */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** @param {Request} request */
function getClientIp(request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const [firstIp] = forwardedFor.split(',');
    return firstIp?.trim() || 'unknown';
  }

  return request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || 'unknown';
}

/** @param {string} clientIp */
function isRateLimited(clientIp) {
  const now = Date.now();

  for (const [key, attempt] of submissionAttempts.entries()) {
    if (now - attempt.windowStart > RATE_LIMIT_WINDOW_MS) {
      submissionAttempts.delete(key);
    }
  }

  const existingAttempt = submissionAttempts.get(clientIp);
  if (!existingAttempt) {
    submissionAttempts.set(clientIp, { count: 1, windowStart: now });
    return false;
  }

  if (now - existingAttempt.windowStart > RATE_LIMIT_WINDOW_MS) {
    submissionAttempts.set(clientIp, { count: 1, windowStart: now });
    return false;
  }

  if (existingAttempt.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  existingAttempt.count += 1;
  submissionAttempts.set(clientIp, existingAttempt);
  return false;
}

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
  if (!resend) {
    return jsonResponse(
      {
        error: 'Contact form is not configured yet. Please email support@upaway.dev directly.'
      },
      500
    );
  }

  /** @type {{ name?: unknown; email?: unknown; message?: unknown; company?: unknown }} */
  let body;

  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid request payload.' }, 400);
  }

  const name = normalizeField(body?.name);
  const email = normalizeField(body?.email);
  const message = normalizeField(body?.message);
  const company = normalizeField(body?.company);

  // Honeypot: bots often fill hidden fields.
  if (company) {
    return jsonResponse({ message: "Thank you! I'll be in touch soon." }, 200);
  }

  if (!name || !email || !message) {
    return jsonResponse({ error: 'Please fill out all fields.' }, 400);
  }

  if (!isValidEmail(email)) {
    return jsonResponse({ error: 'Please enter a valid email address.' }, 400);
  }

  if (message.length > 5000) {
    return jsonResponse({ error: 'Message is too long.' }, 400);
  }

  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return jsonResponse({ error: 'Too many messages right now. Please wait a few minutes and try again.' }, 429);
  }

  try {
    const result = await resend.emails.send({
      from: `${contactFromName} <${contactFromEmail}>`,
      to: 'support@upaway.dev',
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: [
        'New contact form submission from upaway.dev',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        '',
        'Message:',
        message
      ].join('\n')
    });

    if (result?.error) {
      console.error('Failed to send contact email:', result.error);
      return jsonResponse({ error: 'Unable to send message right now. Please try again shortly.' }, 502);
    }

    return jsonResponse({ message: "Thank you! I'll be in touch soon." }, 200);
  } catch (error) {
    console.error('Contact form email request failed:', error);
    return jsonResponse({ error: 'Unable to send message right now. Please try again shortly.' }, 502);
  }
};
