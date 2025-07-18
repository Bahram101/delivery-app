--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13 (Debian 15.13-1.pgdg120+1)
-- Dumped by pg_dump version 15.13 (Debian 15.13-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    avatar_path text DEFAULT '/uploads/default-avatar.png'::text NOT NULL,
    phone text DEFAULT ''::text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
159c4599-bc04-4dc2-821f-a6c585a3221c	43949444c33b3fde30ce4c1dcaf00ed3189260d50f6a04ef0c02f1b1d06b70ec	2025-05-13 05:18:16.506493+00	20250510055540_create_model_user	\N	\N	2025-05-13 05:18:16.481317+00	1
6c9df87b-9851-4131-ac65-3c45aa73d2b4	c7e2ea0d9f75cdb19e289aca81d1127df67575cf190f828fedb2cdd6d818a0c1	2025-05-13 05:18:16.534815+00	20250510060415_rename_user_table	\N	\N	2025-05-13 05:18:16.508953+00	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, created_at, updated_at, email, password, name, avatar_path, phone) FROM stdin;
cmam29va30000mx3zzdkqfqrc	2025-05-13 05:18:29.02	2025-05-13 05:18:29.02	test2@test.ru	$argon2id$v=19$m=65536,t=3,p=4$gsBZQpXy8zrJT+zMmlSxnQ$UZIoXNDdJx/QPsG+eKSEa158uNvy4XMo7vpzHDMs/rA	Rufus Gerlach	https://avatars.githubusercontent.com/u/25824904	778-527-6303 x944
cmam2tixw0000n63xhu46c9wj	2025-05-13 05:33:46.148	2025-05-13 05:33:46.148	test3@test.ru	$argon2id$v=19$m=65536,t=3,p=4$sSjI0Z1CLHXW06AC7CfWLg$E+ted1Rts4eepeGg65ldxWSTFqWwypLsbWVh4ib6kRo	Johnathan Schroeder	https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/93.jpg	(958) 829-9562 x1229
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- PostgreSQL database dump complete
--

