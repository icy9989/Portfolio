# Contact Email API

## Purpose

Connect the portfolio Contact form to a server-side email API so visitors can send messages directly to my email inbox.

The Contact form collects:

- First Name
- Last Name
- Email
- Message

When submitted successfully, the backend sends an email to my configured portfolio email address.

## Contact Flow

```text
Visitor
   ↓
Contact Form
   ↓
POST /api/contact
   ↓
Validate Input
   ↓
Email Service
   ↓
My Email Inbox
```

Email sending must happen on the server.

Do not expose email service credentials or API keys to client components.

## Endpoint

```text
POST /api/contact
```

Recommended route:

```text
app/
└── api/
    └── contact/
        └── route.ts
```

## Request Body

Expected request:

```ts
interface ContactRequest {
  firstName: string
  lastName: string
  email: string
  message: string
}
```

Example:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "message": "Hi, I would like to talk about a software engineering opportunity."
}
```

## Email Provider

Use a transactional email provider that supports server-side email sending.

Recommended implementation:

```text
Contact Form
     ↓
Next.js API Route
     ↓
Email Provider
     ↓
My Inbox
```

Keep provider-specific implementation isolated so the email provider can be changed later without changing the Contact form.

## Environment Variables

Store sensitive configuration in environment variables.

Example:

```env
EMAIL_API_KEY="..."
CONTACT_EMAIL="your-email@example.com"
EMAIL_FROM="Portfolio <contact@your-verified-domain.com>"
```

Rules:

- never hardcode API keys
- never expose API keys through `NEXT_PUBLIC_*`
- never commit real secrets
- keep email sending server-side
- use the email provider's verified sender/domain for `EMAIL_FROM`

## Sender Information

The visitor enters:

```text
First Name
Last Name
Email
Message
```

Use this information inside the email content.

For example:

```text
New Portfolio Message

Name:
John Doe

Email:
john@example.com

Message:
Hi, I would like to discuss...
```

## From and Reply-To

Do not use the visitor's email address as the actual email `From` address.

Use the verified portfolio sender:

```text
From:
Portfolio Contact <contact@your-verified-domain.com>
```

Send the email to:

```text
To:
CONTACT_EMAIL
```

Set the visitor's submitted email as:

```text
Reply-To:
john@example.com
```

This allows me to press Reply in my email application and respond directly to the visitor.

Conceptually:

```ts
{
  from: process.env.EMAIL_FROM,
  to: process.env.CONTACT_EMAIL,

  replyTo: email,

  subject: `Portfolio message from ${firstName} ${lastName}`,

  // email content
}
```

## Email Subject

Use a clear subject.

Example:

```text
Portfolio message from John Doe
```

Do not allow the visitor to directly control the complete email subject.

## Email Content

The email should contain:

- sender's full name
- sender's email
- message
- indication that the message came from the portfolio Contact form

Example:

```text
New message from your portfolio.

Name: John Doe
Email: john@example.com

Message:

Hi, I would like to discuss a software engineering opportunity.
```

An HTML email template may also be used.

Keep the template simple and readable.

## Server Validation

The backend must validate the request again even if the frontend already performs validation.

Validate:

- first name exists
- last name exists
- email exists
- email format is valid
- message exists
- input lengths are reasonable

Never trust client-side validation alone.

## Input Limits

Use reasonable limits to reduce abuse.

Suggested limits:

```text
First Name: 1–50 characters
Last Name: 1–50 characters
Email: 1–254 characters
Message: 1–5000 characters
```

Trim unnecessary whitespace before processing.

## Successful Response

Suggested response:

```json
{
  "success": true,
  "message": "Message sent successfully."
}
```

Status:

```text
200 OK
```

After success, the frontend should:

- show a success message
- clear the form
- restore the Send Message button

## Validation Error

Example:

```json
{
  "success": false,
  "message": "Please provide valid contact information."
}
```

Status:

```text
400 Bad Request
```

Do not send an email when validation fails.

## Email Sending Failure

If the email provider fails:

```json
{
  "success": false,
  "message": "Unable to send your message right now."
}
```

Suggested status:

```text
500 Internal Server Error
```

Do not expose:

- API keys
- provider credentials
- internal stack traces
- raw provider errors

Log useful server-side information where appropriate.

## Contact Form Integration

The existing Contact form should submit:

```text
firstName
lastName
email
message
```

to:

```text
POST /api/contact
```

Submission flow:

```text
Fill Form
   ↓
Client Validation
   ↓
POST /api/contact
   ↓
Server Validation
   ↓
Send Email
   ↓
Return Result
   ↓
Show Success or Error
```

## Loading State

While the request is processing:

- disable the Send Message button
- prevent duplicate submissions
- show a loading state

Example:

```text
Sending...
```

Do not clear the form until the server confirms success.

## Success State

After successful delivery:

- display a clear success message
- clear First Name
- clear Last Name
- clear Email
- clear Message

Example:

```text
Thanks! Your message has been sent successfully.
```

## Error State

If sending fails:

- keep the user's entered information
- show an error message
- allow the visitor to retry

Example:

```text
Your message couldn't be sent. Please try again.
```

Do not falsely show a success state before the API confirms that the email provider accepted the request.

## Spam and Abuse Protection

Because `/api/contact` is a public endpoint, add basic protection.

At minimum:

- server-side validation
- input length limits
- duplicate submission prevention
- basic rate limiting

Do not rely only on the disabled frontend button because clients can call the API directly.

More advanced CAPTCHA or bot protection can be added later if needed.

## Security

The contact endpoint must:

- run server-side
- keep email API credentials private
- validate all incoming data
- reject malformed requests
- limit input sizes
- avoid inserting raw user input into unsafe HTML
- avoid exposing provider errors
- avoid exposing environment variables

Treat all contact form content as untrusted input.

## Data Storage

The contact form does not need PostgreSQL.

The initial flow should be:

```text
Contact Form
     ↓
Contact API
     ↓
Email Provider
     ↓
My Inbox
```

Do not save contact messages to Prisma/PostgreSQL unless message history becomes a separate requirement.

## Recommended File Structure

```text
app/
└── api/
    └── contact/
        └── route.ts

components/
└── contact/
    └── contact-form.tsx

lib/
├── email.ts
└── validation/
    └── contact.ts
```

Responsibilities:

### `contact-form.tsx`

- form state
- client validation
- submit request
- loading state
- success/error UI

### `app/api/contact/route.ts`

- accept POST request
- validate request
- call email service
- return API response

### `lib/email.ts`

- email provider integration
- construct/send portfolio email

### `lib/validation/contact.ts`

- shared contact validation rules where appropriate

## Scope

### In Scope

- `POST /api/contact`
- Contact form API integration
- server-side validation
- email provider integration
- send message to my email
- sender name in email
- sender email in email
- sender email as Reply-To
- loading state
- success state
- error state
- basic abuse protection

### Out Of Scope

- storing messages in PostgreSQL
- contact management dashboard
- mailing lists
- newsletters
- automated marketing emails

## Check When Done

- Contact form submits to `/api/contact`
- First Name is sent
- Last Name is sent
- Email is sent
- Message is sent
- server validates all fields
- email is delivered to `CONTACT_EMAIL`
- verified portfolio address is used as `From`
- visitor email is used as `Reply-To`
- replying to the received email targets the visitor
- API key remains server-side
- loading state prevents duplicate clicks
- form clears only after successful sending
- failed requests preserve form content
- success message appears only after confirmed success
- basic rate limiting is implemented
- raw provider errors are not exposed
- no contact messages are stored in PostgreSQL
- no TypeScript errors
- no lint errors
## Implementation Decisions

- Use Resend's HTTPS email API in the server-only `lib/email.ts`, with plain-text content and a 10-second provider timeout. `EMAIL_API_KEY` is a Resend key; `EMAIL_FROM` must be verified in Resend. Provider acceptance confirms API success; inbox delivery is verified separately.
- Share trimmed field validation and the suggested 50/50/254/5000 character limits between client and server. Reject control characters in header-derived values; keep multiline message text. Accept JSON only, with a streamed 32 KiB body cap (413 when exceeded).
- Basic protection uses process-local rolling windows: at most 5 attempts per normalized email and 30 total send attempts per 10 minutes. Do not trust client-supplied forwarding headers. Hash identifiers and request fingerprints; store no message text. Reject concurrent/recent identical submissions with 429 and Retry-After, reserving before awaiting the provider. Release duplicate reservations after failures so retries work.
- Also send a deterministic provider idempotency key derived from the exact email payload; Resend deduplicates identical retries for 24 hours, including across instances or after ambiguous network failures.
- Process-local rate limits reset on restart and are not shared across replicas. A distributed limiter or hosting-level limit is required before relying on a global quota in a multi-instance deployment. No Prisma message storage is added.
