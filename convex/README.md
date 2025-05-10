# Convex Functions

This directory contains your Convex backend functions.
Refer to the [Convex Functions Documentation](https://docs.convex.dev/functions) for more details.

## Query Functions

A query function typically retrieves data. Here's an example structure:

```typescript
// functions.ts
import { query } from "./_generated/server";
import { v } from "convex/values";

export const getSomeData = query({
  // Define arguments and their types (validators)
  args: {
    id: v.id("tableName"), // Example: expecting an ID for 'tableName'
    filterValue: v.optional(v.string()), // Example: an optional string filter
  },

  // The function's logic
  handler: async (ctx, args) => {
    // Access the database
    // See: https://docs.convex.dev/database/reading-data
    const documents = await ctx.db
      .query("tableName")
      .filter((q) => q.eq(q.field("someField"), args.filterValue)) // Example filter
      .collect();

    // Process and return data
    return documents;
  },
});
```

To use this query in a React component:

```typescript
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api"; // Adjust path as needed

// ... inside your component
const data = useQuery(api.functions.getSomeData, {
  id: "yourDocumentId",
  filterValue: "someFilter",
});
```

## Mutation Functions

A mutation function modifies data in the database. Example:

```typescript
// functions.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createSomeData = mutation({
  // Define arguments and their types
  args: {
    title: v.string(),
    value: v.number(),
  },

  // The function's logic
  handler: async (ctx, args) => {
    // Interact with the database
    // See: https://docs.convex.dev/database/writing-data
    const newItem = {
      title: args.title,
      value: args.value,
      createdAt: Date.now(),
    };
    const itemId = await ctx.db.insert("tableName", newItem);

    // Optionally, return a result
    return itemId;
  },
});
```

To use this mutation in a React component:

```typescript
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api"; // Adjust path as needed

// ... inside your component
const createItem = useMutation(api.functions.createSomeData);

async function handleCreate() {
  try {
    const itemId = await createItem({ title: "New Item", value: 100 });
    console.log("Created item with ID:", itemId);
  } catch (error) {
    console.error("Mutation failed:", error);
  }
}
```

## Convex CLI

Use the Convex CLI to manage your backend functions and deployments.

- Push functions: `npx convex deploy`
- Run a development server: `npx convex dev`
- View all commands: `npx convex -h`
- Open documentation: `npx convex docs`
