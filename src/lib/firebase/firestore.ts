import { Program, Story, Inquiry, DonationRecord } from "@/types";
import { initialPrograms } from "@/config/initial-programs";
import { initialStories } from "@/config/initial-stories";
import { getAdminFirestore } from "./admin";

/**
 * Fetch all published stories sorted by publication date descending.
 * Uses Firebase Admin Firestore if configured, otherwise falls back gracefully
 * to initial verified foundation activity stories.
 */
export async function getPublishedStories(): Promise<Story[]> {
  try {
    const firestore = getAdminFirestore();
    if (firestore) {
      const snapshot = await firestore
        .collection("stories")
        .where("published", "==", true)
        .orderBy("publishedAt", "desc")
        .get();

      if (!snapshot.empty) {
        return snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Story, "id">),
        }));
      }
    }
  } catch (error) {
    console.warn("Could not retrieve stories from Firestore, using initial dataset:", error);
  }

  // Graceful fallback to verified stories
  return initialStories.filter((s) => s.published);
}

/**
 * Fetch a single story by its URL slug
 */
export async function getStoryBySlug(slug: string): Promise<Story | null> {
  try {
    const firestore = getAdminFirestore();
    if (firestore) {
      const snapshot = await firestore
        .collection("stories")
        .where("slug", "==", slug)
        .limit(1)
        .get();

      if (!snapshot.empty) {
        const doc = snapshot.docs[0]!;
        return {
          id: doc.id,
          ...(doc.data() as Omit<Story, "id">),
        };
      }
    }
  } catch (error) {
    console.warn("Could not retrieve story by slug from Firestore:", error);
  }

  const found = initialStories.find((s) => s.slug === slug);
  return found || null;
}

/**
 * Fetch all programs
 */
export async function getPrograms(): Promise<Program[]> {
  try {
    const firestore = getAdminFirestore();
    if (firestore) {
      const snapshot = await firestore
        .collection("programs")
        .where("active", "==", true)
        .get();

      if (!snapshot.empty) {
        return snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Program, "id">),
        }));
      }
    }
  } catch (error) {
    console.warn("Could not retrieve programs from Firestore, using initial programs:", error);
  }

  return initialPrograms.filter((p) => p.active);
}

/**
 * Fetch a single program by its URL slug
 */
export async function getProgramBySlug(slug: string): Promise<Program | null> {
  const programs = await getPrograms();
  return programs.find((p) => p.slug === slug) || null;
}

/**
 * Save an inquiry (contact or get-involved form) to Firestore via Admin SDK
 */
export async function saveInquiryToFirestore(
  inquiry: Omit<Inquiry, "id" | "createdAt" | "status">
): Promise<{ success: boolean; id?: string }> {
  const firestore = getAdminFirestore();
  const newRecord = {
    ...inquiry,
    status: "new" as const,
    createdAt: new Date().toISOString(),
  };

  if (!firestore) {
    console.warn(
      "Firebase Admin is not configured. Simulating inquiry submission in local environment:",
      newRecord
    );
    return { success: true, id: `local-sim-${Date.now()}` };
  }

  try {
    const docRef = await firestore.collection("inquiries").add(newRecord);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving inquiry to Firestore:", error);
    throw error;
  }
}

/**
 * Save a verified donation record to Firestore via Admin SDK
 */
export async function saveDonationToFirestore(
  donation: Omit<DonationRecord, "id" | "createdAt">
): Promise<{ success: boolean; id?: string }> {
  const firestore = getAdminFirestore();
  const newRecord = {
    ...donation,
    createdAt: new Date().toISOString(),
  };

  if (!firestore) {
    console.warn(
      "Firebase Admin is not configured. Simulating donation record creation in local environment:",
      newRecord
    );
    return { success: true, id: `local-sim-${Date.now()}` };
  }

  try {
    // Check for duplicate capture ID
    const existing = await firestore
      .collection("donations")
      .where("paypalCaptureId", "==", donation.paypalCaptureId)
      .limit(1)
      .get();

    if (!existing.empty) {
      console.warn("Duplicate PayPal capture attempted:", donation.paypalCaptureId);
      return { success: true, id: existing.docs[0]!.id };
    }

    const docRef = await firestore.collection("donations").add(newRecord);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving donation to Firestore:", error);
    throw error;
  }
}
