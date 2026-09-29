# StudyBuddy AI — Setup Guide (No Coding Experience Needed)

This is a small website with an AI study-tutor chat and student sign-up/log-in
built in. This guide assumes you've never deployed a website before and
walks through every click. It should take about 45–60 minutes the first
time.

## How it fits together

A website like this needs four things, and you're starting with just the
first one:

1. **A domain** (e.g. `yoursite.com`) — you already have this.
2. **Hosting** — a place that stores and serves the site's files. We'll use
   **Cloudflare Pages**, which is free and also lets the AI chat run
   securely (see next point).
3. **Student accounts** — so only signed-in students can use the AI chat
   (this protects both your AI budget and the students). We'll use
   **Supabase**, a free service that handles sign-up, log-in, and storing
   passwords securely, so nobody has to build that from scratch.
4. **The AI itself** — the chat calls Anthropic's Claude API. Your API key
   must never sit in the website's front-end code (anyone could steal it),
   so this project includes a small "serverless function"
   (`functions/api/chat.js`) that keeps the key private on Cloudflare's
   servers, checks that the request really came from a signed-in student,
   and only then answers.

## What this costs

- **Cloudflare Pages hosting: $0.** The free plan comfortably covers a
  school project's traffic.
- **Supabase (student accounts): $0.** The free tier covers far more
  students than a school project typically needs.
- **The AI (Anthropic API): pay-as-you-go, usually a few dollars a month**
  for light use by a class or school. This code uses Claude's cheapest,
  fastest model (Haiku), caps each answer's length, and now requires
  sign-in — all to keep costs low and predictable. You can also set a hard
  spending cap in Anthropic's console (Step 5) so you can never be
  surprised by a bill.

---

## Step 1 — Put the files on GitHub

GitHub stores your code and lets Cloudflare auto-deploy it. No command line
needed — you can upload files straight from your browser.

1. Go to [github.com](https://github.com) and sign up for a free account
   (if you don't have one).
2. Click the **+** icon (top right) → **New repository**.
3. Name it something like `studybuddy-site`. Leave it **Public** or
   **Private** (either works). Click **Create repository**.
4. On the new repo's page, click **uploading an existing file** (or
   **Add file → Upload files**).
5. Drag in *all* the files and folders from this project — `index.html`,
   `style.css`, `script.js`, `auth.js`, `config.js`, `README.md`, and the
   whole `functions` folder (with `functions/api/chat.js` inside it).
   GitHub's uploader supports dragging folders in most browsers; if it
   flattens the folder, create the path manually by naming the file
   `functions/api/chat.js` in the "Add file → Create new file" box and
   pasting its contents in.
6. Scroll down and click **Commit changes**.

You should now see all the files listed in your repository.

---

## Step 2 — Deploy it with Cloudflare Pages

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and sign up for
   a free account.
2. In the left sidebar, click **Workers & Pages** → **Create** → **Pages**
   tab → **Connect to Git**.
3. Authorize Cloudflare to access your GitHub account, then select the
   `studybuddy-site` repository.
4. On the build settings screen, you can leave everything as default —
   **no build command is needed** (this is a plain HTML/CSS/JS site, not a
   framework). Click **Save and Deploy**.
5. Wait about a minute. You'll get a working URL like
   `studybuddy-site.pages.dev` — open it. The site will load, but sign-up
   and chat won't work yet (that's the next steps).

---

## Step 3 — Create student accounts with Supabase

1. Go to [supabase.com](https://supabase.com) and sign up for a free
   account.
2. Click **New project**. Give it a name (e.g. `studybuddy`), set a
   database password (Supabase asks for one — just save it somewhere; you
   likely won't need to type it again), and pick the region closest to your
   students. Click **Create new project** and wait a minute or two while it
   spins up.
3. Once it's ready, go to **Settings → API** (in the left sidebar). You'll
   need two values from this page:
   - **Project URL** (looks like `https://abcdefgh.supabase.co`)
   - **anon / public** key (a long string) — NOT the `service_role` key,
     which must stay secret and isn't used by this project.
4. Optional but worth knowing: by default, Supabase requires students to
   click a confirmation link in their email before they can log in. For a
   quick classroom setup you can turn this off under **Authentication →
   Providers → Email → Confirm email**. Leaving it on is more secure but
   means students need a real, checkable email address.

---

## Step 4 — Connect Supabase to your site

You need to give your Supabase URL and key to *both* the front end (the
page students see) and the back end (the function that talks to the AI).

**Front end — edit `config.js`:**
1. On GitHub, open `config.js` in your repository and click the pencil
   (edit) icon.
2. Replace the two placeholder values with your real Project URL and anon
   key from Step 3:
   ```js
   window.SUPABASE_URL = "https://abcdefgh.supabase.co";
   window.SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIs...";
   ```
3. Commit the change. Cloudflare Pages will automatically redeploy.

**Back end — add environment variables in Cloudflare:**
1. In your Cloudflare Pages project, go to **Settings → Environment
   variables** (sometimes shown as **Variables and Secrets**).
2. Add two variables (values are the same ones from Step 3):
   ```
   SUPABASE_URL = https://abcdefgh.supabase.co
   SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIs...
   ```
   These don't need to be "encrypted" secrets since the anon key is already
   public — but it's fine either way.
3. Save, then go to **Deployments** and **retry/redeploy** the latest
   deployment.

Reload your `*.pages.dev` site — you should now see working Sign Up / Log
In tabs above the chat. Try creating a test account.

---

## Step 5 — Get an Anthropic API key

1. Go to [console.anthropic.com](https://console.anthropic.com) and sign up.
2. Add a small amount of prepaid credit (Settings → Billing) — even $5 goes
   a long way with the cheap model this project uses. You can also set a
   **usage limit** in Settings → Limits so spending can never exceed what
   you choose.
3. Go to **Settings → API Keys → Create Key**. Copy the key (it starts with
   `sk-ant-...`) — you won't be able to see it again after this, so paste it
   somewhere safe for the next step.

---

## Step 6 — Add the API key to Cloudflare (as a secret)

This is the step that makes the AI chat itself actually respond.

1. Back in the Cloudflare dashboard, open your Pages project → **Settings →
   Environment variables**.
2. Click **Add variable**. For the name, enter exactly:
   ```
   ANTHROPIC_API_KEY
   ```
   For the value, paste the key you copied in Step 5.
3. Make sure it's added for the **Production** environment (and Preview,
   if you want the chat to work on preview deployments too). If there's an
   **Encrypt** option, use it — this one really is a secret.
4. Save, then go to **Deployments** and **retry/redeploy** the latest
   deployment again.

Reload your site, log in with your test account, and try the chat — it
should now respond.

---

## Step 7 — Connect your own domain

In Cloudflare, go to your Pages project → **Custom domains** → **Set up a
domain**, and enter your domain (e.g. `yoursite.com` or a subdomain like
`study.yoursite.com`). What happens next depends on where your domain is
registered:

**If you're willing to move your domain's DNS to Cloudflare (recommended,
still free, you keep your domain and registrar):**
Add your domain as a "site" in Cloudflare first (dashboard → **Add a
site**), then follow the instructions to change your domain's nameservers
at your registrar to the two Cloudflare nameservers shown. This can take a
few hours to a day to fully activate. Once it's active, the custom domain
step above will finish automatically — Cloudflare adds the needed DNS
record for you.

**If you'd rather not touch nameservers, and you're okay using a
subdomain** (like `study.yoursite.com` instead of the bare
`yoursite.com`):
After clicking **Set up a domain** in Cloudflare Pages, go to your current
registrar's DNS settings (GoDaddy, Namecheap, etc.) and add a **CNAME**
record: Name = `study` (or whatever subdomain you want), Value = your
`....pages.dev` address. Do the Cloudflare Pages step *first*, or the
domain won't resolve.

Either way, once DNS finishes propagating, your site is live at your own
domain.

---

## Trying it out / troubleshooting

- **Sign up / log in tabs are missing or show an error immediately:**
  `config.js` still has the placeholder values — finish Step 4.
- **Chat says "Please log in to use the study chat":** you're not signed
  in, or your session expired — log in again.
- **Chat says a setup error about the API key:** double-check the variable
  name is exactly `ANTHROPIC_API_KEY` (no typos, all caps) and that you
  redeployed after adding it.
- **Chat says "AI service error (401...)":** the Anthropic API key was
  copied wrong, or the account has no credit — check
  console.anthropic.com.
- **Chat says "AI service error (429...)":** you've hit a rate or spend
  limit — check your limits in the Anthropic console.
- **Sign-up says "check your email" and nothing arrives:** check spam, or
  turn off "Confirm email" in Supabase (Step 3) for testing.
- **Site loads but looks unstyled:** make sure `style.css` was uploaded to
  GitHub alongside `index.html` (they need to sit in the same folder).

## Making changes later

- Wording, subjects, and study tips: edit the text inside `index.html`.
- Colors and spacing: edit `style.css` (the `:root` section at the top has
  the main colors).
- The AI's personality/instructions: edit `SYSTEM_PROMPT` in
  `functions/api/chat.js`.
- Managing student accounts (resetting passwords, removing a student): use
  the **Authentication → Users** tab in your Supabase dashboard.
- After editing on GitHub (you can edit files right in the browser with the
  pencil icon), Cloudflare Pages automatically redeploys the site within a
  minute or two.

## A note on safety and privacy

This site now collects student email addresses and passwords (stored
securely by Supabase, not by you directly) so students can sign in. Before
using this with real students:
- Check whether your school has rules about collecting student emails or
  using third-party tools — many do.
- Consider using a simple shared class email pattern rather than personal
  emails if that fits your school's policy.
- The AI chat itself has instructions built in to stay encouraging,
  on-topic, and school-appropriate, but no AI filter is perfect — tell a
  teacher or admin about the tool and keep an eye on how it's used.
