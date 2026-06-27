import { createClient } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/buy-crypto";

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // If we reach here, the OTP was invalid or already consumed (e.g. by an email scanner).
  // The user's email is likely already confirmed, so we redirect them to log in.
  return NextResponse.redirect(`${origin}/login?message=Link+expired+or+already+used.+If+you+recently+confirmed,+you+can+sign+in+now.`);
}
