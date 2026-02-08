---
trigger: always_on
---

data retrieval must always be done via server components. Any updates/deletes/inserts into our database must always be done via server actions. Data validation must always be done using zod.

All database operations (fetching and mutations) must be abstracted into helper functions within the `src/db/queries` directory. Components and actions should call these functions instead of executing database queries directly.

Any data passed to server actions must be validated by zod and must have a typescript type. Do not use FormData as the type.