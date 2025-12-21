CREATE TABLE public.task
(
    task_id uuid NOT NULL,
    description character varying(500) NOT NULL,
    PRIMARY KEY (task_id)
);

ALTER TABLE IF EXISTS public.task
    OWNER to postgres;