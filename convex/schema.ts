import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Defines the database schema for the application
export default defineSchema({
  // Users table definition
  users: defineTable({
    email: v.string(), // User's email address
    name: v.string(), // User's name
    image: v.optional(v.string()), // URL of the user's profile image (optional)
    clerkId: v.string(), // User's Clerk ID for authentication
  }).index("by_clerk_id", ["clerkId"]), // Index for querying users by Clerk ID

  // Plans table definition
  plans: defineTable({
    userId: v.id("users"), // Foreign key referencing the users table
    name: v.string(), // Name of the fitness plan
    // Detailed workout plan structure
    workoutPlan: v.object({
      schedule: v.array(v.string()), // Array of days in the workout schedule (e.g., ["Monday", "Wednesday", "Friday"])
      // Array of exercises, categorized by day
      exercises: v.array(
        v.object({
          day: v.string(), // Day of the week for these routines
          // Array of workout routines for the specified day
          routines: v.array(
            v.object({
              name: v.string(), // Name of the exercise routine
              sets: v.number(), // Number of sets for the routine
              reps: v.number(), // Number of repetitions per set
              duration: v.optional(v.string()), // Duration of the routine (optional)
              description: v.optional(v.string()), // Description of the routine (optional)
              exercises: v.optional(v.array(v.string())), // Specific exercises in the routine (optional)
            })
          ),
        })
      ),
    }),

    // Detailed diet plan structure
    dietPlan: v.object({
      dailyCalories: v.number(), // Target daily calorie intake
      // Array of meals for the diet plan
      meals: v.array(
        v.object({
          name: v.string(), // Name of the meal (e.g., "Breakfast", "Lunch")
          foods: v.array(v.string()), // Array of food items for the meal
        })
      ),
    }),
    isActive: v.boolean(), // Indicates if the plan is currently active
  })
    .index("by_user_id", ["userId"]) // Index for querying plans by user ID
    .index("by_active", ["isActive"]), // Index for querying plans by active status
});
