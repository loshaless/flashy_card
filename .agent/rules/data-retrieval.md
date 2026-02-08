---
trigger: always_on
---

data retrieval must always be done via server componenets. Any updates/deletes/inserts into our database must always be done via server actions. Data validation must always be done using zod
Any data passed to server actions must be validated by zod and must have typescript type. Do not use formdata as the type