export async function startSyncBackfill(args: {
  practiceId: string;
}): Promise<void> {
  // placeholder worker kickoff
  console.log("startBackfill", args.practiceId);
}

export async function runIncrementalTick(args: {
  practiceId: string;
  resource:
    | "Patient"
    | "Appointment"
    | "Encounter"
    | "Practitioner"
    | "Location"
    | "DocumentReference";
}): Promise<void> {
  // placeholder tick
  console.log("syncTick", args.practiceId, args.resource);
}
