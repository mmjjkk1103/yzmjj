# Security Baseline

## Current Model

- Static browser app.
- No authentication.
- No backend.
- No server-side storage.
- User input is local to the current page session.

## Required Controls

- Insert user text with `textContent`, never `innerHTML`.
- Do not add remote scripts without approval.
- Do not persist user-entered messages without a product and privacy decision.
- Do not send user-entered messages to external APIs without a security review.
- Keep clipboard behavior explicit and recoverable.

## Escalation Required

Escalate before:

- Adding analytics, monitoring SDKs, or third-party scripts.
- Adding package dependencies.
- Adding persistence, accounts, or message sharing links.
- Collecting message content, recipient names, or contact data.
- Changing deployment from static hosting to server-backed hosting.

## Agent Review Checklist

- [ ] User input rendered safely.
- [ ] No new remote network path.
- [ ] No secret or token committed.
- [ ] Failure path keeps app usable.
- [ ] Security doc updated if the data model changed.

