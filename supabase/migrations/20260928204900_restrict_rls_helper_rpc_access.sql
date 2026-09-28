revoke execute on function public.can_access_esf(uuid) from anon;
revoke execute on function public.can_access_patient(uuid) from anon;
grant execute on function public.can_access_esf(uuid) to authenticated, service_role;
grant execute on function public.can_access_patient(uuid) to authenticated, service_role;
