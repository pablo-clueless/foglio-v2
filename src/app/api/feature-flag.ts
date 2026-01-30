import { NextRequest, NextResponse } from "next/server";

const FEATURE_FLAGS = [
  {
    id: "new_signup",
    name: "New Signup",
    description: "Enable the user to create an account",
    enabled: true,
    environment: ["development", "staging"],
  },
  {
    id: "oauth_login",
    name: "OAuth Login",
    description: "Enable login with Google and Github",
    enabled: true,
    environment: ["development", "staging", "production"],
  },
  {
    id: "notifications",
    name: "Real-time Notifications",
    description: "Enable WebSocket notifications",
    enabled: true,
    environment: ["staging", "production"],
  },
  {
    id: "ai_assistant",
    name: "AI Assistant",
    description: "Enable AI-powered assistance features",
    enabled: true,
    rolloutPercentage: 10,
  },
  {
    id: "premium_features",
    name: "Premium Features",
    description: "Enable premium tier features",
    enabled: true,
    targetRoles: ["premium", "admin"],
  },
];

export async function GET(_request: NextRequest) {
  try {
    return NextResponse.json({
      flags: FEATURE_FLAGS,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch feature flags" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { flagId, updates } = await request.json();

    const flagIndex = FEATURE_FLAGS.findIndex((f) => f.id === flagId);
    if (flagIndex === -1) {
      return NextResponse.json({ error: "Flag not found" }, { status: 404 });
    }

    FEATURE_FLAGS[flagIndex] = {
      ...FEATURE_FLAGS[flagIndex],
      ...updates,
    };

    return NextResponse.json({
      flag: FEATURE_FLAGS[flagIndex],
      message: "Flag updated successfully",
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update feature flag" }, { status: 500 });
  }
}
