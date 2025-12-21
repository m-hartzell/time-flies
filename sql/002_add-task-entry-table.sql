-- Table: public.task_entry

-- DROP TABLE IF EXISTS public.task_entry;

CREATE TABLE IF NOT EXISTS public.task_entry
(
    task_entry_id uuid NOT NULL,
	task_id uuid NOT NULL,
    started_at date NOT NULL,
    ended_at date,
    CONSTRAINT task_entry_pkey PRIMARY KEY (task_entry_id),
	FOREIGN KEY (task_id) REFERENCES public.task(task_id) ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.task_entry
    OWNER to postgres;

-- Index: ix_task_started_ended
-- DROP INDEX IF EXISTS public.ix_task_started_ended;

CREATE INDEX IF NOT EXISTS ix_task_started_ended
    ON public.task_entry USING btree
    (task_id ASC NULLS LAST)
    INCLUDE(started_at, ended_at)
    WITH (fillfactor=100)
    TABLESPACE pg_default;
