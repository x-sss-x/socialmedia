import Image from "next/image";
import { Inter } from "next/font/google";
import { supabase } from "@/supabase";
import { GetServerSideProps } from "next";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }: { data: { data: any } }) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      <h1 className="text-3xl">{data.data.username}</h1>
      <div className="mt-5 px-44">
        {data.data.posts.length > 0 &&
          data.data.posts.map((post:any) => {
            return (
              <>
                <h1 className="text-2xl font-medium underline">{post.title}</h1>
                <br />
                <p className="w-full text-justify">{post.content}</p>
              </>
            );
          })}
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await supabase
    .from("users")
    .select("*,posts(*)")
    .eq("id", ctx.query.id)
    .single();
  return {
    props: {
      data,
    },
  };
};
