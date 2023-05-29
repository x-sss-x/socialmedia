create table "public"."comments" (
    "id" uuid not null default gen_random_uuid(),
    "content" text not null,
    "usersId" uuid,
    "created_at" timestamp with time zone not null default now()
);


create table "public"."users" (
    "id" uuid not null default gen_random_uuid(),
    "username" text not null,
    "created_at" timestamp(3) without time zone not null default now()
);


CREATE UNIQUE INDEX comments_pkey ON public.comments USING btree (id);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

CREATE UNIQUE INDEX users_username_key ON public.users USING btree (username);

alter table "public"."comments" add constraint "comments_pkey" PRIMARY KEY using index "comments_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."comments" add constraint "comments_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."comments" validate constraint "comments_usersId_fkey";


