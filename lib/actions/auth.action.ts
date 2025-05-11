"use server"; // we use this to prevent the action from being called on the client side
import { auth, db } from "@/firebase/admin";
import { FirebaseAuthError } from "firebase-admin/auth";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7;

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    const userRecord = await db.collection("users").doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists",
      };
    }
    await db.collection("users").doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: "User created successfully",
    };
  } catch (error) {
    console.log("Error signing up", error);

    if (
      error instanceof FirebaseAuthError &&
      error.code === "auth/email-already-exists"
    ) {
      return {
        success: false,
        message: "This emailis already in use",
      };
    }

    return {
      success: false,
      message: "Failed to sign up",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return {
        success: false,
        message: "User does not exist",
      };
    }

    await setSessionCookie(idToken);
  } catch (error) {
    console.log("Error signing in", error);

    return {
      success: false,
      message: "Failed to sign in",
    };
  }
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("session");

  return {
    success: true,
    message: "Signed out successfully",
  };
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000,
  });

  cookieStore.set("session", sessionCookie, {
    maxAge: ONE_WEEK,
    //TODO: uncomment this when we have a production environment
    httpOnly: true, // prevents the cookie from being accessed by JavaScript
    // secure: process.env.NODE_ENV === "production", // only send the cookie over HTTPS in production
    path: "/",
    sameSite: "lax", // only send the cookie over HTTPS in production
  });
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) return null;

  try {
    // verify the session cookie to ensure it's valid
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();

    if (!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.log("Error getting current user", error);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();

  // {name: "John"} -> !{} -> false -> !false -> true
  return !!user;
}
