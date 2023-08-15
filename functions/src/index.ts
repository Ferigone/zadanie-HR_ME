import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";

import * as admin from "firebase-admin";
admin.initializeApp();

export const moveCalculations = onDocumentCreated(
  "users/{userId}/calculations/{calculationId}",
  (event) => {
    try {
      const original = event.data?.data();
      if (original === undefined) {
        logger.error("Calculation not found!", { structuredData: true });
        return;
      }

      admin.firestore().collection("communication").add(original);
      logger.info("Calculation Copied!", { structuredData: true });
    } catch (error) {
      // Handle errors here
      logger.error("An error occurred:", error);
    }
  }
);
