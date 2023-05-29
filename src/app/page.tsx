"use client";

import { useCallback, useState } from "react";
import { SupaClient } from "../../utils/supabase";
import { useRouter } from "next/navigation";

export default function Page() {
  const [username, setUsername] = useState("");
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const joinCommentsRoom = useCallback(async () => {
    setLoading(true);
    const response = await SupaClient.from("users")
      .insert({
        username,
      })
      .select("id")
      .single();
    router.replace(`/comments/${response.data?.id}`);
  }, [username, router]);

  return (
    <main className="w-full h-full overflow-hidden flex justify-center items-center">
      <div
        className={
          "flex rounded-md p-5 flex-col gap-3 bg-gray-900 border-slate-400 border"
        }
      >
        <h1 className="text-center text-white font-bold text-3xl">
          Social Media
        </h1>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-3 rounded-md text-black py-1 w-full text-lg outline-none focus:outline-blue-600 focus:outline-2 border-slate-400 border"
        />
        <button
          onClick={joinCommentsRoom}
          className="px-3 rounded-md py-2 flex justify-center items-center text-xl bg-blue-700 text-white"
        >
          {isLoading ? "Loading..." : "Join"}
        </button>
      </div>
    </main>
  );
}
