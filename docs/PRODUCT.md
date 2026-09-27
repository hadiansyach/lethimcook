# PRODUCT.md

# Product: AI Menu & Recipe Generator

## 1. Product Context

Build a mobile-first web application that helps users decide what to cook from ingredients they already have.

The core interaction is intentionally simple:

> **User enters ingredients → AI suggests menu ideas → user opens a recipe → user gets step-by-step cooking instructions.**

The product should feel fast, useful, and low-friction. Users should be able to try the product immediately without creating an account.

This document is the source of truth for AI-assisted product and engineering work during the MVP. Implementation decisions should preserve the product intent, scope, business rules, and success metrics defined here.

---

## 2. Product Goal

Help users turn available ingredients into actionable meal ideas in less than 30 seconds, without requiring login at the beginning.

### Primary value proposition

**“Kasih tahu bahan yang kamu punya, kami kasih ide menu + cara masaknya. No ribet.”**

### Product principles

1. **Fast to value** — the user should reach useful recommendations quickly.
2. **No unnecessary friction** — no login before the user has experienced the core value.
3. **Actionable output** — recommendations must contain enough information to decide and cook, not only menu names.
4. **Mobile-first** — the primary experience is optimized for mobile screens and touch interaction.
5. **AI with structure** — AI responses must be predictable, machine-readable, and renderable by the frontend.
6. **Measure from day one** — anonymous usage and conversion events should be captured from the beginning.

---

## 3. Target User Problem

Users often have ingredients at home but do not know what to cook with them. Existing recipe discovery experiences can require too much browsing, decision-making, or manual searching.

This product reduces the decision process to a single input: **the ingredients the user already has**.

---

## 4. MVP Success Metrics

The MVP should instrument at least these metrics:

| Metric | Definition |
|---|---|
| Flow completion rate | % of sessions that progress from ingredient input to opening a recipe detail |
| Avg. ingredients per session | Average number of ingredients entered per session |
| Anonymous → login conversion | % of anonymous users who log in after reaching the usage limit |
| AI recommendation rating | Average user rating of recommendation quality |

### Suggested core event funnel

`app_opened → ingredient_input_started → ingredients_submitted → recommendations_received → recipe_opened → recipe_feedback_submitted`

For anonymous users, also track:

`usage_limit_reached → login_prompt_shown → login_started → login_completed`

Analytics implementation must not become a blocker for the core user flow.

---

## 5. MVP Scope

### 5.1 In Scope

#### Ingredient input

- User can enter ingredients by typing.
- Ingredients are represented as tags/chips.
- Ingredient input supports autocomplete.
- User can add multiple ingredients.
- User can remove individual ingredients before submission.

#### AI recommendations

- AI returns **3–5 menu recommendations** from the submitted ingredients.
- Each recommendation must include:
  - menu name
  - cooking/menu type
  - taste profile
  - estimated cooking time
  - difficulty level
- Recommendations should prioritize the submitted ingredients.
- Optional additional ingredients may be suggested when necessary.

#### Recipe detail

A selected recommendation opens a complete recipe containing:

- menu name
- recipe/menu type
- taste profile
- estimated cooking time
- difficulty
- ingredients
- quantities/measurements
- optional additional ingredients
- step-by-step cooking instructions

The cooking tutorial should be easy to follow on mobile.

#### Anonymous access

- User can use the app without login.
- Generate a device identifier automatically.
- Store the identifier in `localStorage`.
- Backend tracks anonymous usage using the device identifier.
- Anonymous user receives **5 free uses**.
- After the 5th allowed use is consumed, the user must log in to continue.

#### Authentication

- Login is required only after anonymous usage reaches the limit.
- Supported login methods for MVP:
  - email
  - Google

#### Logged-in features

- History of previously generated/search recipes.
- Bookmark/save recipes.
- Simple recipe rating/feedback.

#### Responsive UI

- Mobile-first.
- Responsive on tablet and desktop.
- Core flow must remain usable with touch interaction.

---

## 6. Explicitly Out of Scope — MVP 1

Do **not** implement these features in MVP 1:

- Ingredient photo upload.
- Image recognition / computer vision for identifying ingredients.
- Detailed nutrition information.
- Calorie/macronutrient calculation.
- Multi-language support.
- Social features:
  - sharing
  - comments
  - follows
  - social feed
- Native iOS/Android applications.

These may be considered for future versions but should not influence MVP architecture unless a small abstraction has clear engineering value.

---

## 7. Core User Journey

### Anonymous user journey

```text
Open app
  ↓
Enter ingredients
  ↓
Submit ingredients
  ↓
AI generates 3–5 recommendations
  ↓
User selects a menu
  ↓
Recipe detail + step-by-step tutorial
  ↓
(Optional) rating / feedback
  ↓
Repeat up to free usage limit
  ↓
Usage limit reached
  ↓
Login gate
  ↓
Login with Email / Google
  ↓
Continue using app
```

### Logged-in user journey

```text
Open app
  ↓
Enter ingredients
  ↓
Get recommendations
  ↓
Open recipe
  ↓
Bookmark / rate
  ↓
Access history later
```

---

## 8. Core Business Rules

### 8.1 Anonymous usage limit

- Each anonymous device receives **5 free uses**.
- Usage must be enforced on the backend.
- `localStorage` is only the client-side mechanism for retaining the anonymous device identifier; it must not be treated as the security boundary.
- The client sends the device identifier with relevant anonymous requests.
- The backend validates the current usage count before performing a paid/limited AI operation.
- Usage increment and limit validation should be atomic to prevent race-condition overuse.

### 8.2 Login gate

When the anonymous user has exhausted the 5 free uses:

- New AI generation requests are blocked until authentication succeeds.
- Show a clear login CTA.
- Explain why login is required.
- After successful login, preserve/migrate relevant anonymous user data when possible.

### 8.3 Anonymous-to-account migration

When an anonymous user logs in:

- Associate the anonymous usage/history data with the authenticated account where applicable.
- Avoid duplicate records when the same recipe/generation already exists.
- Migration should be safe to retry.

---

## 9. AI Behavior Contract

AI is responsible for generating structured cooking recommendations and recipe content. The application should treat AI output as untrusted external data and validate it before rendering or persisting it.

### 9.1 Recommendation output

The backend should request a structured response equivalent to:

```json
{
  "recommendations": [
    {
      "name": "string",
      "type": "string",
      "taste": ["string"],
      "estimated_minutes": 30,
      "difficulty": "easy",
      "available_ingredients_used": ["string"],
      "additional_ingredients": ["string"]
    }
  ]
}
```

Constraints:

- Return between 3 and 5 recommendations.
- `name` must be present.
- `type` must describe the dish/menu category.
- `taste` should describe the flavor profile in user-friendly terms.
- `estimated_minutes` should be a positive integer.
- `difficulty` should use a controlled set such as `easy`, `medium`, `hard`.
- Ingredient names should be normalized enough for consistent display and analytics.

### 9.2 Recipe output

The backend should request a structured recipe response equivalent to:

```json
{
  "recipe": {
    "name": "string",
    "type": "string",
    "taste": ["string"],
    "estimated_minutes": 30,
    "difficulty": "easy",
    "ingredients": [
      {
        "name": "string",
        "quantity": "string",
        "optional": false
      }
    ],
    "steps": [
      {
        "step": 1,
        "instruction": "string"
      }
    ]
  }
}
```

### 9.3 Prompting requirements

Prompts should instruct the AI to:

- Prefer ingredients provided by the user.
- Avoid recommending impossible combinations unless explicitly justified.
- State additional ingredients separately.
- Produce practical cooking instructions.
- Keep measurements understandable for normal home cooking.
- Avoid unsupported nutrition/medical claims.
- Return only the requested structured schema.
- Produce deterministic field names and enums where possible.

### 9.4 Validation and failure handling

Never assume AI output is valid.

The backend should:

1. Parse the model response.
2. Validate against the expected schema.
3. Reject malformed responses.
4. Retry or regenerate when appropriate.
5. Return a safe user-facing error when generation cannot be completed.

The frontend must never have to parse raw model prose.

---

## 10. Recommended System Boundaries

A clean MVP separation should look roughly like this:

```text
[Web Client]
    |
    | HTTPS / JSON
    v
[Backend API]
    |
    +--> [Auth]
    |
    +--> [Usage / Rate Limit]
    |
    +--> [Recipe / History / Bookmark]
    |
    +--> [Analytics Events]
    |
    +--> [AI Provider]
    |
    v
[Database]
```

### Responsibilities

#### Frontend

- Ingredient input UX.
- Autocomplete/tag interaction.
- Recommendation cards.
- Recipe detail/tutorial UI.
- Authentication screens.
- History/bookmark UI.
- Feedback UI.
- Loading, empty, and error states.

#### Backend

- Authentication/session handling.
- Anonymous device identification handling.
- Usage counting and enforcement.
- AI orchestration.
- AI response validation/normalization.
- Persistence of recipes, history, bookmarks, and feedback.
- Analytics/event ingestion where appropriate.
- API security and rate limiting.

#### AI provider

- Menu recommendation generation.
- Recipe detail generation.

The AI provider should not be called directly from the browser if that would expose provider credentials or bypass usage controls.

---

## 11. Initial Data Model

Exact database technology is a Sprint 0 decision, but the MVP should support at least these concepts.

### Device / anonymous usage

```text
AnonymousDevice
- id
- device_id (unique)
- usage_count
- created_at
- updated_at
```

### User

```text
User
- id
- email
- auth_provider
- created_at
- updated_at
```

### Generation / recommendation session

```text
Generation
- id
- user_id (nullable for anonymous)
- anonymous_device_id (nullable)
- input_ingredients
- created_at
```

### Recipe

```text
Recipe
- id
- generation_id
- name
- type
- taste
- estimated_minutes
- difficulty
- ingredients
- steps
- created_at
```

### History

```text
RecipeHistory
- id
- user_id
- recipe_id
- viewed_at
```

### Bookmark

```text
Bookmark
- id
- user_id
- recipe_id
- created_at
```

### Feedback

```text
RecipeFeedback
- id
- user_id (nullable if anonymous feedback is allowed)
- recipe_id
- rating
- comment (optional)
- created_at
```

### Analytics event

```text
AnalyticsEvent
- id
- user_id (nullable)
- anonymous_device_id (nullable)
- event_name
- properties (JSON)
- created_at
```

> The exact schema can be normalized or adapted based on the selected stack, but these domain concepts must remain representable.

---

## 12. API-Level Expectations

Exact endpoint names are implementation details. The API should cover capabilities equivalent to:

```text
POST   /api/generations
GET    /api/generations/:id
GET    /api/recipes/:id
POST   /api/recipes/:id/feedback
POST   /api/recipes/:id/bookmark
DELETE /api/recipes/:id/bookmark
GET    /api/history
GET    /api/bookmarks
GET    /api/usage
POST   /api/auth/...
```

### Generation request concept

```json
{
  "ingredients": ["egg", "tomato", "onion"]
}
```

### Generation response concept

```json
{
  "generation_id": "...",
  "usage": {
    "used": 2,
    "limit": 5,
    "remaining": 3
  },
  "recommendations": []
}
```

Exact contracts should be finalized before frontend and backend implementation diverge.

---

## 13. UX Requirements

### Home / entry screen

The primary screen should immediately communicate:

- what the product does
- where to enter ingredients
- how to submit them

Avoid a company-profile/marketing-heavy landing page. The user should be able to start using the core function immediately.

### Ingredient input

Required states:

- empty
- focused
- autocomplete suggestions
- one or more selected ingredients
- invalid/unknown input
- loading/submitting
- submission error

### Recommendation screen

Each result card should expose the required decision-making information without opening the detail page:

- menu name
- type
- taste
- estimated time
- difficulty

The user must understand what the menu is before opening it.

### Recipe detail screen

The cooking flow should prioritize readability:

- clear ingredients section
- quantities visible near ingredient names
- sequential steps
- obvious step boundaries
- touch-friendly spacing
- progress/checklist interaction where practical

### Loading

AI generation may take time. The UI should provide a meaningful loading state rather than appearing frozen.

### Error states

Handle at least:

- invalid/empty ingredients
- AI timeout
- AI provider failure
- malformed AI response after retries
- usage limit reached
- authentication failure
- generic network failure

---

## 14. Ingredient Input Rules

The MVP should support normal human ingredient input rather than requiring exact database terminology.

Examples:

- `telur`
- `telur ayam`
- `egg`
- `bawang merah`
- `tomat 2`

The engineering implementation may normalize ingredients internally, but the UI should stay natural and simple.

Potential normalization steps:

```text
typing
  ↓
trim whitespace
  ↓
normalize casing
  ↓
optional alias/synonym mapping
  ↓
store canonical ingredient representation
```

Do not over-engineer ingredient taxonomy for MVP 1.

---

## 15. Analytics & Instrumentation

Analytics should start from the first usable MVP build.

Minimum event set:

```text
app_opened
ingredient_input_started
ingredient_added
ingredient_removed
ingredients_submitted
recommendations_loaded
recommendation_opened
recipe_viewed
bookmark_added
bookmark_removed
feedback_submitted
usage_limit_reached
login_prompt_shown
login_started
login_completed
generation_failed
```

Useful properties may include:

- number of ingredients
- generation ID
- recipe ID
- anonymous vs authenticated
- usage count at request time
- AI latency
- error type

Do not collect sensitive personal data unnecessarily.

---

## 16. Performance & Reliability Targets

The primary product promise is fast time-to-value.

### Target

- User should be able to submit ingredients and reach useful recommendations in **under 30 seconds** under normal conditions.

This is a product goal, not a guarantee that every AI response will complete within that exact threshold.

Engineering should therefore consider:

- request timeouts
- retry policy
- response caching where safe
- prompt efficiency
- model selection/cost-performance tradeoffs
- backend streaming or progressive loading only when it improves UX without complicating MVP unnecessarily

---

## 17. AI Cost Controls

AI is an external cost center, so every architecture decision should consider generation cost.

MVP controls should include:

- backend-only AI access
- anonymous usage limit
- API rate limiting
- request validation
- reasonable prompt size limits
- caching/reuse where semantically safe
- observability for token usage and latency

Do not add unrestricted regeneration loops.

---

## 18. Security & Abuse Considerations

At minimum:

- Never trust `localStorage` as proof of entitlement.
- Enforce anonymous usage server-side.
- Rate-limit generation endpoints.
- Validate ingredient payloads.
- Validate AI output before persistence/rendering.
- Protect AI provider credentials.
- Validate authenticated ownership for bookmarks/history.
- Prevent duplicate bookmark creation.
- Sanitize user-controlled text before rendering where applicable.

The anonymous device ID is an identifier, not a strong identity/authentication mechanism.

---

## 19. Sprint Plan

### Sprint 0 — Preparation

**Duration:** 1 week  
**Goal:** Ready before implementation starts.

- Finalize tech stack.
- Setup repository.
- Setup CI/CD.
- Setup environments and secrets strategy.
- Create wireframes for the main flow.
- Design database schema.
- Define API contracts.
- Define analytics events.
- Define AI response schemas.

### Sprint 1 — Foundation & Anonymous Access

**Duration:** 2 weeks  
**Goal:** User can open the app and input ingredients without login.

- Generate anonymous device ID.
- Store device ID in `localStorage`.
- Backend usage tracking.
- Server-side 5-use limit.
- Ingredient tag input.
- Autocomplete.
- Base navigation/layout.
- Home screen.
- Results screen shell.

### Sprint 2 — AI Menu Recommendations

**Duration:** 2 weeks  
**Goal:** Ingredients in → structured menu recommendations out.

- Integrate AI API.
- Implement prompt templates.
- Implement structured output validation.
- Build generation endpoint.
- Persist generation/recommendation data.
- Recommendation result cards.
- Loading/error states.

### Sprint 3 — Recipe Detail & Tutorial

**Duration:** 2 weeks  
**Goal:** Selected menu → complete recipe + cooking tutorial.

- Generate detailed recipe data.
- Ingredient quantities.
- Step-by-step cooking instructions.
- Mobile-friendly tutorial UI.
- Optional additional ingredient display.
- Loading/error handling.

### Sprint 4 — Login Gate & Personalization

**Duration:** 2 weeks  
**Goal:** Frequent anonymous users can continue through authentication.

- Trigger login after limit.
- Email authentication.
- Google authentication.
- Anonymous → authenticated data migration.
- History.
- Bookmarks.
- Recipe feedback/rating.

### Sprint 5 — Polish & Testing

**Duration:** 2 weeks  
**Goal:** Stable MVP ready for limited release.

- Responsive/mobile QA.
- Edge-case testing:
  - typo ingredients
  - too few ingredients
  - too many ingredients
  - unusual combinations
  - empty submissions
- AI/API cost optimization.
- Rate limiting.
- Analytics verification.
- Closed beta / soft launch.

### Timeline

**Total estimate: approximately 11 weeks.**

Assumption: small team of **2–4 people**.

---

## 20. MVP Acceptance Criteria

The MVP is functionally ready when all of the following are true:

### Core flow

- A new user can open the app without login.
- A user can add multiple ingredients.
- A user can submit ingredients.
- The backend receives and validates the request.
- AI returns 3–5 structured recommendations.
- The UI renders all required recommendation metadata.
- User can open a recommendation.
- The recipe detail contains ingredients, quantities, and step-by-step instructions.

### Anonymous usage

- Anonymous device ID is generated automatically.
- Device ID persists between sessions through `localStorage`.
- Backend tracks usage per device.
- User can complete 5 free generations.
- Further generation is blocked until login.
- Limit behavior remains correct even if the client manipulates local storage.

### Authentication

- Email login works.
- Google login works.
- Anonymous data migration occurs after login where applicable.

### Logged-in features

- History is accessible.
- Bookmark add/remove works.
- Rating/feedback submission works.

### Reliability

- AI timeout/failure has a user-friendly recovery path.
- Invalid AI output is not rendered as if it were valid data.
- Core API endpoints enforce authentication/authorization appropriately.

### Measurement

- Core funnel events are tracked.
- Success metrics can be calculated from collected events.

---

## 21. Definition of Done for AI-Assisted Engineering

For any feature implemented using AI-assisted engineering:

1. The implementation must satisfy this product context.
2. Do not silently add features outside MVP scope.
3. Prefer the simplest implementation that meets the acceptance criteria.
4. Keep frontend, backend, database, and AI contracts explicit.
5. Do not couple UI rendering to raw AI prose.
6. Add loading, empty, error, and limit states for user-facing flows.
7. Add tests for important business rules, especially usage limits and AI schema validation.
8. Preserve analytics events when changing user flows.
9. Avoid introducing architecture that is justified only by future features unless the cost is small and the boundary is clearly useful.
10. When requirements conflict, prioritize in this order:

```text
User safety / data integrity
        ↓
Core product flow
        ↓
Business rules
        ↓
MVP scope
        ↓
UX polish
        ↓
Future extensibility
```

---

## 22. Non-Goals for AI Coding Agents

AI coding agents should **not** independently introduce:

- image recognition
- nutrition/calorie systems
- social networking features
- native mobile apps
- multi-language infrastructure
- complex personalization/ML recommendation systems
- subscription billing
- complicated admin dashboards

unless explicitly requested in a separate product change.

---

## 23. Open Decisions — Sprint 0

These decisions are intentionally left open and should be finalized before implementation:

- Frontend framework.
- Backend framework/runtime.
- Database technology.
- Authentication provider.
- AI provider/model.
- Hosting/deployment platform.
- Analytics provider.
- Error monitoring/logging.
- Exact API contract.
- Exact AI JSON schema / tool-calling strategy.
- Rate-limit strategy and thresholds beyond the 5-use business rule.

Do not invent these decisions silently. Record the chosen options in project-level engineering documentation once decided.

---

## 24. One-Sentence Product Definition

> **A mobile-first AI cooking assistant where users enter the ingredients they have and quickly receive 3–5 practical menu ideas followed by complete, step-by-step recipes — with no login required until the first 5 free uses are exhausted.**
