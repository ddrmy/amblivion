import { getUser } from "@/lib/auth/get-user";
import { getUserProfile } from "@/lib/auth/get-user-profile";
import { redirect } from "next/navigation";

export default function PageAdmin() {
  return (
    <div>
      <h1>Página Admin</h1>

      <pre className="mt-4 text-sm">teste</pre>
    </div>
  );
}
