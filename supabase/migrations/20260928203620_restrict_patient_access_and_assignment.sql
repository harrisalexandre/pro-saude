create or replace function public.can_access_patient(target_patient uuid)
returns boolean
language sql
stable
set search_path to 'public'
as $function$
  select private.is_admin()
    or exists (
      select 1
      from public.patients p
      where p.id = target_patient
        and (
          exists (
            select 1
            from public.esf_members em
            where em.esf_id = p.esf_id
              and em.user_id = (select auth.uid())
              and em.role = 'manager'
          )
          or p.doctor_id = (select auth.uid())
        )
    )
$function$;

drop policy if exists "patients_delete" on public.patients;

drop policy if exists "managers update assigned patients" on public.patients;
drop policy if exists "patients_update" on public.patients;

create policy "staff update patients"
on public.patients
for update
to authenticated
using (
  is_admin()
  or can_access_patient(id)
)
with check (
  is_admin()
  or exists (
    select 1
    from public.esf_members em
    where em.esf_id = patients.esf_id
      and em.user_id = (select auth.uid())
      and (
        (
          em.role = 'manager'
          and (
            patients.doctor_id is null
            or exists (
              select 1
              from public.profiles d
              join public.esf_members dm
                on dm.user_id = d.id
               and dm.esf_id = patients.esf_id
               and dm.role = 'doctor'
              where d.id = patients.doctor_id
                and d.role = 'doctor'
                and d.active
            )
          )
        )
        or (
          em.role = 'doctor'
          and patients.doctor_id = (select auth.uid())
        )
      )
  )
);