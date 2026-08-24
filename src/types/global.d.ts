export {};

declare global {
  interface Window {
    rakhiSession: string;
    rakhiAttribution: {
      source: string;
      utm_source: string | null;
      utm_medium: string | null;
      utm_campaign: string | null;
      parent_challenge_id: string | null;
    };
    rakhiTrack: (event: string, payload?: Record<string, unknown>, challengeId?: string | null) => void;
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}
