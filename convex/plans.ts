import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Mutation to create a new fitness plan for a user.
// It first finds the user by their clerkId.
// Then, it deactivates any existing active plans for that user.
// Finally, it inserts the new plan and sets it as active.
export const createPlan = mutation({
  args: {
    userId: v.string(), // Clerk ID of the user for whom the plan is created
    name: v.string(), // Name of the fitness plan
    // Detailed workout plan structure
    workoutPlan: v.object({
      schedule: v.array(v.string()), // Days of the week for workouts
      // Exercises categorized by day
      exercises: v.array(
        v.object({
          day: v.string(), // Day of the week
          // Routines for the day
          routines: v.array(
            v.object({
              name: v.string(), // Name of the routine
              sets: v.number(), // Number of sets
              reps: v.number(), // Number of reps
            })
          ),
        })
      ),
    }),
    // Detailed diet plan structure
    dietPlan: v.object({
      dailyCalories: v.number(), // Target daily calorie intake
      // Meals in the diet plan
      meals: v.array(
        v.object({
          name: v.string(), // Name of the meal
          foods: v.array(v.string()), // Food items for the meal
        })
      ),
    }),
    isActive: v.boolean(), // Whether the plan should be initially active
  },
  handler: async (ctx, args) => {
    // Find the user by their Clerk ID
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.userId))
      .unique();

    if (!user) {
      throw new Error("User not found for given clerkId");
    }

    // Deactivate any existing active plans for this user
    const activePlans = await ctx.db
      .query("plans")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    for (const plan of activePlans) {
      await ctx.db.patch(plan._id, { isActive: false });
    }

    // Insert the new plan with the user's actual database ID
    const planId = await ctx.db.insert("plans", {
      ...args,
      userId: user._id,
    });

    return planId;
  },
});

// Query to retrieve all fitness plans for a given user ID.
// Orders the plans by creation time in descending order.
export const getUserPlans = query({
  args: { userId: v.id("users") }, // Database ID of the user whose plans are to be retrieved
  handler: async (ctx, args) => {
    // Query the 'plans' table using the 'by_user_id' index
    const plans = await ctx.db
      .query("plans")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();

    return plans;
  },
});
