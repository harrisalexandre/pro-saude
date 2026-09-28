# Dados e Supabase

## Entidades observadas

### `profiles`

Perfil do usuário autenticado. Campos usados: `id`, `full_name`, `role`, `phone`.

Papéis observados: `admin`, `esf`, `doctor`.

### `esfs`

Unidades da rede. Campos usados: `id`, `name`, `phone`, `address`.

### `esf_members`

Relaciona usuários às ESFs e registra `user_id`, `esf_id` e `role`.

### `patients`

Cadastro de pacientes. Campos usados: `full_name`, `preferred_name`, `birth_date`, `cpf`, `phone`, `address`, `notes`, `esf_id`, `doctor_id`, `created_by`.

### Edge Function

`manage-staff-user` é invocada no frontend para criação de acessos de ESF e doutores.

## Relacionamentos

```text
auth.users
    │
    └── profiles
          ├── admin
          ├── esf ──► esf_members ──► esfs
          └── doctor ─► esf_members ─► esfs

esfs ───────────────► patients
profiles (doctor) ──► patients.doctor_id
```

## Segurança do acesso

O controle definitivo deve estar no backend/RLS, não somente na interface. O modelo esperado é: Admin → rede; ESF → sua unidade; Doutor → pacientes autorizados; idoso → próprios dados.

Credenciais privilegiadas e service-role keys não devem ser incluídas no bundle do navegador.
