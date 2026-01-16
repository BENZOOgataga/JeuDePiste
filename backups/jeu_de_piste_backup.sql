--
-- PostgreSQL database dump
--

\restrict Y9LmsYXTzqnjCyvbGIw3Sr7tP7xSj6soFA8efHWy6J7bGVDhTPeX6exke3i2jzh

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."UserRole" AS ENUM (
    'ADMIN',
    'PARTICIPANT'
);


ALTER TYPE public."UserRole" OWNER TO postgres;

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
-- Name: answers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.answers (
    id text NOT NULL,
    answer text NOT NULL,
    "isCorrect" boolean NOT NULL,
    latitude double precision,
    longitude double precision,
    "answeredAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "participationId" text NOT NULL,
    "riddleId" text NOT NULL
);


ALTER TABLE public.answers OWNER TO postgres;

--
-- Name: games; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.games (
    id text NOT NULL,
    title text NOT NULL,
    description text,
    "isActive" boolean DEFAULT true NOT NULL,
    "startDate" timestamp(3) without time zone,
    "endDate" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "creatorId" text NOT NULL
);


ALTER TABLE public.games OWNER TO postgres;

--
-- Name: participations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.participations (
    id text NOT NULL,
    status text DEFAULT 'in_progress'::text NOT NULL,
    score integer DEFAULT 0 NOT NULL,
    "startedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "completedAt" timestamp(3) without time zone,
    "userId" text NOT NULL,
    "gameId" text NOT NULL
);


ALTER TABLE public.participations OWNER TO postgres;

--
-- Name: riddles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.riddles (
    id text NOT NULL,
    title text NOT NULL,
    question text NOT NULL,
    answer text NOT NULL,
    hint text,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    radius double precision DEFAULT 100 NOT NULL,
    "order" integer NOT NULL,
    points integer DEFAULT 10 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "gameId" text NOT NULL
);


ALTER TABLE public.riddles OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id text NOT NULL,
    email text NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    role public."UserRole" DEFAULT 'PARTICIPANT'::public."UserRole" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('87867618-2b18-4bcd-ad28-37ba0b8f7323', 'c3490e1fddad7c177b6a68b5185d588babd60d9f66cd9294eeef57b7de87029f', '2026-01-16 16:35:29.096886+01', '20260116153529_init', NULL, NULL, '2026-01-16 16:35:29.046717+01', 1);


--
-- Data for Name: answers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.answers (id, answer, "isCorrect", latitude, longitude, "answeredAt", "participationId", "riddleId") VALUES ('5df943a6-adfc-4f2c-afbd-0626a3c1d2bd', 'Tour Eiffel', true, 48.8584, 2.2945, '2026-01-16 15:42:01.488', '8be6e84d-895f-42fe-aaa2-de245933f7e5', '62f77dff-19f7-4bbb-a44e-8ecbb4d9695f');
INSERT INTO public.answers (id, answer, "isCorrect", latitude, longitude, "answeredAt", "participationId", "riddleId") VALUES ('c69de2b4-ab4f-42f2-8e68-a9d2a4e40c97', 'Le Louvre', false, 48.8606, 2.3376, '2026-01-16 15:42:17.39', '8be6e84d-895f-42fe-aaa2-de245933f7e5', '1eee7e92-369e-499b-a17c-b78fa8420d60');
INSERT INTO public.answers (id, answer, "isCorrect", latitude, longitude, "answeredAt", "participationId", "riddleId") VALUES ('628b94d6-192d-424a-930f-a50d875b518d', 'Le Musée du Louvre', false, 48.8606, 2.3376, '2026-01-16 15:42:24.061', '8be6e84d-895f-42fe-aaa2-de245933f7e5', '1eee7e92-369e-499b-a17c-b78fa8420d60');
INSERT INTO public.answers (id, answer, "isCorrect", latitude, longitude, "answeredAt", "participationId", "riddleId") VALUES ('22c92737-8519-4e3e-a6ea-ef0294409f1b', 'Louvre', true, 48.8606, 2.3376, '2026-01-16 15:42:30.391', '8be6e84d-895f-42fe-aaa2-de245933f7e5', '1eee7e92-369e-499b-a17c-b78fa8420d60');
INSERT INTO public.answers (id, answer, "isCorrect", latitude, longitude, "answeredAt", "participationId", "riddleId") VALUES ('90893721-72ae-49e0-a097-19a3f28a25a4', 'Notre-Dame', true, 48.853, 2.3499, '2026-01-16 15:42:39.714', '8be6e84d-895f-42fe-aaa2-de245933f7e5', '1df4e9ab-1826-4391-b4fa-2cf7e16c39fe');
INSERT INTO public.answers (id, answer, "isCorrect", latitude, longitude, "answeredAt", "participationId", "riddleId") VALUES ('c7313cb9-0326-4055-b421-60d021d9672e', 'Walter White', true, 48.789719, 2.363637, '2026-01-16 15:50:55.056', 'c375372f-0964-458d-a7f4-b426f132148c', '84a8fb6a-a280-4282-93d3-136c468265e1');


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.games (id, title, description, "isActive", "startDate", "endDate", "createdAt", "updatedAt", "creatorId") VALUES ('4db8c22b-e96c-48ee-83c3-bba5e3ff9e00', 'Découverte de Paris', 'Un parcours touristique dans les lieux emblématiques de Paris', true, NULL, NULL, '2026-01-16 15:35:36.127', '2026-01-16 15:35:36.127', 'fcc2927b-da4b-4120-80e1-fd940dc8256b');
INSERT INTO public.games (id, title, description, "isActive", "startDate", "endDate", "createdAt", "updatedAt", "creatorId") VALUES ('e9e56e75-c43d-4aab-9ae3-0b3eb664f65d', 'test création de jeu avec un titre très long parce-que j''suis un relou t''as capté', 'oui', true, NULL, NULL, '2026-01-16 15:50:41.345', '2026-01-16 15:50:41.345', 'fcc2927b-da4b-4120-80e1-fd940dc8256b');


--
-- Data for Name: participations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.participations (id, status, score, "startedAt", "completedAt", "userId", "gameId") VALUES ('e37bd555-9538-40f8-ac14-2e237e6fe2c9', 'in_progress', 0, '2026-01-16 15:36:58.733', NULL, 'fcc2927b-da4b-4120-80e1-fd940dc8256b', '4db8c22b-e96c-48ee-83c3-bba5e3ff9e00');
INSERT INTO public.participations (id, status, score, "startedAt", "completedAt", "userId", "gameId") VALUES ('8be6e84d-895f-42fe-aaa2-de245933f7e5', 'completed', 45, '2026-01-16 15:39:36.649', '2026-01-16 15:42:41.769', 'bde18601-4607-4f0f-9024-1029fb3622a7', '4db8c22b-e96c-48ee-83c3-bba5e3ff9e00');
INSERT INTO public.participations (id, status, score, "startedAt", "completedAt", "userId", "gameId") VALUES ('c375372f-0964-458d-a7f4-b426f132148c', 'completed', 10, '2026-01-16 15:50:50.261', '2026-01-16 15:50:57.106', 'fcc2927b-da4b-4120-80e1-fd940dc8256b', 'e9e56e75-c43d-4aab-9ae3-0b3eb664f65d');


--
-- Data for Name: riddles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.riddles (id, title, question, answer, hint, latitude, longitude, radius, "order", points, "createdAt", "updatedAt", "gameId") VALUES ('62f77dff-19f7-4bbb-a44e-8ecbb4d9695f', 'La Dame de Fer', 'Quel est le nom de ce monument emblématique de Paris, construit pour l''Exposition universelle de 1889 ?', 'Tour Eiffel', 'Elle mesure 330 mètres de haut', 48.8584, 2.2945, 200, 1, 10, '2026-01-16 15:35:36.132', '2026-01-16 15:35:36.132', '4db8c22b-e96c-48ee-83c3-bba5e3ff9e00');
INSERT INTO public.riddles (id, title, question, answer, hint, latitude, longitude, radius, "order", points, "createdAt", "updatedAt", "gameId") VALUES ('1eee7e92-369e-499b-a17c-b78fa8420d60', 'Le Musée le plus visité', 'Quel musée parisien abrite la Joconde ?', 'Louvre', 'C''est une ancienne résidence royale', 48.8606, 2.3376, 150, 2, 15, '2026-01-16 15:35:36.132', '2026-01-16 15:35:36.132', '4db8c22b-e96c-48ee-83c3-bba5e3ff9e00');
INSERT INTO public.riddles (id, title, question, answer, hint, latitude, longitude, radius, "order", points, "createdAt", "updatedAt", "gameId") VALUES ('1df4e9ab-1826-4391-b4fa-2cf7e16c39fe', 'La Cathédrale', 'Quelle célèbre cathédrale gothique se trouve sur l''île de la Cité ?', 'Notre-Dame', 'Victor Hugo lui a consacré un roman', 48.853, 2.3499, 100, 3, 20, '2026-01-16 15:35:36.132', '2026-01-16 15:35:36.132', '4db8c22b-e96c-48ee-83c3-bba5e3ff9e00');
INSERT INTO public.riddles (id, title, question, answer, hint, latitude, longitude, radius, "order", points, "createdAt", "updatedAt", "gameId") VALUES ('84a8fb6a-a280-4282-93d3-136c468265e1', 'énigme 1', 'who is the one who knocks?', 'Walter White', 'WW', 48.789719, 2.363637, 100, 1, 10, '2026-01-16 15:50:41.399', '2026-01-16 15:50:41.399', 'e9e56e75-c43d-4aab-9ae3-0b3eb664f65d');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, email, username, password, role, "createdAt", "updatedAt") VALUES ('fcc2927b-da4b-4120-80e1-fd940dc8256b', 'admin@jeudepiste.com', 'admin', '$2a$10$sSUREm6WoQUIjkiA.58JfucwpI6CV1I4wTvAykDy8njjOp6seH/Ve', 'ADMIN', '2026-01-16 15:35:36.051', '2026-01-16 15:35:36.051');
INSERT INTO public.users (id, email, username, password, role, "createdAt", "updatedAt") VALUES ('bde18601-4607-4f0f-9024-1029fb3622a7', 'user1@example.com', 'joueur1', '$2a$10$0T8MkmWvDdxd5EUNuNovTOoOzr1wxoykw2AOGugHssRqAyFgu8.YS', 'PARTICIPANT', '2026-01-16 15:35:36.122', '2026-01-16 15:35:36.122');
INSERT INTO public.users (id, email, username, password, role, "createdAt", "updatedAt") VALUES ('27c7dafe-6a74-430c-b5bb-2462550ab016', 'user2@example.com', 'joueur2', '$2a$10$0T8MkmWvDdxd5EUNuNovTOoOzr1wxoykw2AOGugHssRqAyFgu8.YS', 'PARTICIPANT', '2026-01-16 15:35:36.125', '2026-01-16 15:35:36.125');


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: answers answers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (id);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (id);


--
-- Name: participations participations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participations
    ADD CONSTRAINT participations_pkey PRIMARY KEY (id);


--
-- Name: riddles riddles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riddles
    ADD CONSTRAINT riddles_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: participations_userId_gameId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "participations_userId_gameId_key" ON public.participations USING btree ("userId", "gameId");


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: users_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_username_key ON public.users USING btree (username);


--
-- Name: answers answers_participationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT "answers_participationId_fkey" FOREIGN KEY ("participationId") REFERENCES public.participations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: answers answers_riddleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT "answers_riddleId_fkey" FOREIGN KEY ("riddleId") REFERENCES public.riddles(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: games games_creatorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT "games_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: participations participations_gameId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participations
    ADD CONSTRAINT "participations_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES public.games(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: participations participations_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participations
    ADD CONSTRAINT "participations_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: riddles riddles_gameId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riddles
    ADD CONSTRAINT "riddles_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES public.games(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict Y9LmsYXTzqnjCyvbGIw3Sr7tP7xSj6soFA8efHWy6J7bGVDhTPeX6exke3i2jzh

