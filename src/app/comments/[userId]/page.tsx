"use client";
import { Comment } from "@/components/Comment";
import { useAppSelector } from "../../../../store";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { SupaClient } from "../../../../utils/supabase";
import { useParams } from "next/navigation";
import { useAppDispatch } from "../../../../hooks";
import { postComment } from "../../../../store/comments.slice";

export default function Page() {
  const [username, setUsername] = useState<undefined | string>(undefined);
  const [content, setContent] = useState<undefined | string>("");
  const commentsList = useAppSelector((state) => state.comments.data) as [];
  const params = useParams();
  const dispatch = useAppDispatch();
  const isPosting = useAppSelector(
    (state) => state.comments.isPosting
  ) as boolean;

  const fetchUsername = useCallback(async () => {
    const response = await SupaClient.from("users")
      .select("username")
      .eq("id", params.userId)
      .single();
    setUsername(response.data?.username);
  }, [params.userId]);

  useEffect(() => {
    fetchUsername();
  }, []);

  return (
    <div className="w-1/2 h-full border border-slate-400 relative overflow-hidden">
      <header className="px-5 py-3 w-full flex justify-center border-b border-b-slate-500">
        <h1 className={"text-2xl"}>Social Media - {username}</h1>
      </header>
      <div
        id="comments-container"
        className="h-full w-full p-5 pb-36 flex flex-col gap-2 overflow-y-scroll"
      >
        {commentsList?.map((comment: any) => (
          <Comment
            key={comment.id}
            content={comment.content}
            createdAt={moment(comment.created_at).fromNow()}
            id={comment.id}
            username={comment.users.username}
          />
        ))}
      </div>
      <div className="w-full flex py-4 px-5 backdrop-blur-sm border-t gap-3 border-t-slate-300 sticky bottom-0">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="h-10 w-full rounded-md text-black text-lg"
        ></textarea>
        <button
          id="add-comment-button"
          className={
            "px-3 rounded-md py-2 flex justify-center items-center text-xl bg-blue-700 text-white"
          }
          onClick={() => {
            if (content && params.userId)
              dispatch(
                postComment({
                  content,
                  id: params.userId,
                })
              );
          }}
        >
          {isPosting ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}
