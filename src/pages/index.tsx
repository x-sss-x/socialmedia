import Image from "next/image";
import { Inter } from "next/font/google";
import { supabase } from "@/supabase";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }: { data: any }) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="h-full">
        {data.data.length > 0 &&
          data.data.map((user: any) => {
            return (
              <Link
                href={`/${user.id}`}
                className="mt-10 hover:text-blue-600 text-xl"
              >
                <h1 className="mt-3">{user.username}</h1>
              </Link>
            );
          })}
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const data = await supabase.from("users").select("*");
  return {
    props: {
      data,
    },
  };
}
