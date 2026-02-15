---
description: Rules for handling subscriptions, payments, and feature gating using Clerk Billing.
---

# Clerk Billing Integration Rules

This application uses **Clerk Billing** as the sole source of truth for all subscription and payment-related logic.

## Plans and Features

### Available Plans
- `free_plan`: Default plan for all users.
- `pro`: Premium plan with advanced features.

### Feature Gates
- `unlimited_decks`: Enabled for `pro` plan.
- `3_decks_limit`: Enforced for `free_plan` (users cannot create more than 3 decks).
- `ai_flashcard_generation`: Available only for `pro` plan (to be implemented).

## Core Rules

1.  **Clerk as Source of Truth**: Always use Clerk's `auth()` (server-side) or `useAuth()` (client-side) to verify the current plan. Never store subscription status in our local database.
2.  **Server Action Enforcement**: All feature limits (e.g., deck count) must be enforced within **Server Actions** before executing database mutations.
3.  **Plan Check Standard**: Use the `has({ plan: "pro" })` helper from Clerk to check for Pro status.
4.  **Feature Gating**:
    - Wrap restricted UI components with checks for the required plan.
    - If a user reaches a limit (like the 3-deck limit), throw a descriptive error in the server action and show an upgrade prompt in the UI.
5.  **Pricing Page**: The `/pricing` page uses the Clerk `<PricingTable />` component, which pulls configurations directly from the Clerk Dashboard.
6.  **Redirection**: Redirect users to the `/pricing` page if they attempt to access features beyond their plan's limits.

## Example Implementation

### Server Action (Feature Gating)
```tsx
export async function someAction() {
  const { userId, has } = await auth();
  if (!userId) redirect("/");

  const isPro = has({ plan: "pro" });
  if (!isPro) {
    const usage = await getUsageCount(userId);
    if (usage >= LIMIT) {
      throw new Error("Limit reached. Please upgrade to Pro!");
    }
  }
  // Proceed with action
}
```

### Client Component (UI Gating)
```tsx
'use client';
import { useAuth } from '@clerk/nextjs';

export function Feature() {
  const { has } = useAuth();
  const isPro = has({ plan: "pro" });
  
  if (!isPro) return <UpgradeBanner />;
  return <AdvancedFeature />;
}
```