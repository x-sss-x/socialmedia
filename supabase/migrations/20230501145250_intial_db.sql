create table "public"."comments" (
    "id" uuid not null default gen_random_uuid(),
    "comment" text not null,
    "postsId" uuid not null,
    "userId" uuid not null
);


create table "public"."posts" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "content" text not null,
    "isPublished" boolean default false,
    "created_at" timestamp(3) without time zone not null default now(),
    "userId" uuid not null
);


create table "public"."users" (
    "id" uuid not null default gen_random_uuid(),
    "username" text not null,
    "email" text not null,
    "created_at" timestamp(3) without time zone not null default now()
);


CREATE UNIQUE INDEX comments_pkey ON public.comments USING btree (id);

CREATE UNIQUE INDEX posts_pkey ON public.posts USING btree (id);

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

CREATE UNIQUE INDEX users_username_key ON public.users USING btree (username);

alter table "public"."comments" add constraint "comments_pkey" PRIMARY KEY using index "comments_pkey";

alter table "public"."posts" add constraint "posts_pkey" PRIMARY KEY using index "posts_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."comments" add constraint "comments_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES posts(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."comments" validate constraint "comments_postsId_fkey";

alter table "public"."comments" add constraint "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."comments" validate constraint "comments_userId_fkey";

alter table "public"."posts" add constraint "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."posts" validate constraint "posts_userId_fkey";


