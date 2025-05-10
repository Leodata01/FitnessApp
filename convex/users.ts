import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Mutation to synchronize user data from Clerk to the Convex database.
// If the user already exists (based on clerkId), it does nothing.
// Otherwise, it inserts a new user record.
export const syncUser = mutation({
  args: {
    email: v.string(), // User's email
    name: v.string(), // User's name
    clerkId: v.string(), // User's Clerk ID
    image: v.optional(v.string()), // User's profile image URL (optional)
  },
  handler: async (ctx, args) => {
    // Check if a user with the given clerkId already exists
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();

    if (existingUser) {
      return;
    }

    return await ctx.db.insert("users", args);
  },
});

// Query to retrieve a user by their Clerk ID.
export const getUserByClerkId = query({
  args: { clerkId: v.string() }, // Clerk ID of the user to retrieve
  handler: async (ctx, args) => {
    // Query the 'users' table using the 'by_clerk_id' index
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();
  },
});

// Mutation to update an existing user's information.
// Finds the user by clerkId and then patches their record with the new data.
export const updateUser = mutation({
  args: {
    name: v.string(), // New name for the user
    email: v.string(), // New email for the user
    clerkId: v.string(), // Clerk ID of the user to update
    image: v.optional(v.string()), // New profile image URL for the user (optional)
  },
  handler: async (ctx, args) => {
    // Find the existing user by their Clerk ID
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!existingUser) return;

    return await ctx.db.patch(existingUser._id, args);
  },
});
