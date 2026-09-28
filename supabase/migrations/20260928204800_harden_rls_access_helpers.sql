create or replace function public.can_access_esf(target_esf uuid)
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $function$
  select private.is_admin()
    or exists (
      select 1 from public.esf_members
      where esf_id = target_esf
        and user_id = (select auth.uid())
    )
$function$;

create or replace function public.can_access_patient(target_patient uuid)
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $function$
  select private.is_admin()
    or exists (
      select 1 from public.patients p
      where p.id = target_patient
        and (
          exists (
            select 1 from public.esf_members em
            where em.esf_id = p.esf_id
              and em.user_id = (select auth.uid())
              and em.role = 'manager'
          )
          or p.doctor_id = (select auth.uid())
        )
    )
$function$;

revoke execute on function public.can_access_esf(uuid) from public;
revoke execute on function public.can_access_patient(uuid) from public;
grant execute on function public.can_access_esf(uuid) to authenticated, service_role;
grant execute on function public.can_access_patient(uuid) to authenticated, service_role;
