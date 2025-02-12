import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";

export default async function UserList() {
  // Create supabase server component client and obtain user session from stored cookie
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  const { data: profiles, error } = await supabase.from("profiles").select("email, display_name, biography");

  if (error) {
    return <div className="text-red-500">Error loading users: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-4 text-2xl font-bold">Users</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {profiles.map((profile) => (
          <div key={profile.email} className="rounded-lg border p-4 shadow">
            <h2 className="text-lg font-semibold">{profile.display_name || "Unnamed User"}</h2>
            <p className="text-sm text-gray-600">{profile.email}</p>
            <p className="mt-2">{profile.biography ? (profile.biography) : (<span className= "text-base font-light italic"> No biography available</span>)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
