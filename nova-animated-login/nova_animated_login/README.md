# NOVA Animated Login UI

## Files
- `index.html`: semantic page structure
- `styles.css`: responsive styling, glow effects, animations, reduced-motion support
- `script.js`: visibility toggle, password reveal, form validation, demo interactions

## Run it
Open `index.html` in a modern browser. No build step is required. Google Fonts are loaded online; system fallbacks are included.

## Included
- Login panel starts hidden; toggle reveals/hides it
- Animated neon glow, ambient background, orbital accents, card sweep, button shine
- Responsive layout, accessible labels, keyboard focus states
- Password reveal button and basic client-side validation
- Remember-me checkbox and demo placeholders for social login, forgot password, and signup

## Important
This is a front-end UI demo, not production authentication. The form does not send credentials anywhere. Before deployment, connect a secure backend over HTTPS, use established password hashing and session management, add CSRF protection and rate limiting, and implement real OAuth providers. Never store plaintext passwords or trust client-side validation alone.
