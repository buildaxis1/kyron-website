// Simple test to verify our imports work
console.log("Testing imports...");

(async () => {
  try {
    const { createFullAppRouter } = await import("@hcai/trpc-router");
    console.log("✅ Successfully imported createFullAppRouter");
    
    const utils = await import("@hcai/shared-utils");
    console.log("✅ Successfully imported shared-utils");
    
    // Set mock environment variables for testing
    process.env.NEXT_PUBLIC_AWS_REGION = "us-east-1";
    process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID = "test";
    process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY = "test";
    process.env.NEXT_PUBLIC_S3_BUCKET_NAME = "test";
    
    // Test creating router
    const router = createFullAppRouter({});
    console.log("✅ Successfully created router");
    
    console.log("🎉 All imports working correctly! Ready for Amplify build.");
  } catch (error) {
    console.error("❌ Import test failed:", error.message);
    process.exit(1);
  }
})(); 