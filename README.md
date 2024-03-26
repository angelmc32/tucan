# tucán

## community-built web app for builders and creators in latam

this project is a community-first application to provide latam builders and creators a space for collaboration and innovation thru the use of technology. a playground for decentralization and coordination.

**hackea y aprende con amigos mientras construyes cosas divertidas**

**hack and learn while with friends, while you build cool stuff**

## tucán app - part of the kukulcán initiative

### what is kukulcán?

a cultural movement that provides digital and physical spaces for artists, creators, builders, hackers, and dreamers. inspired by the mayan god kukulcán, our vision is one of shared knowledge and social coordination for a better society. thru the use of technology, we will defy the status quo, the centralization and the barriers that we as humans have built thru history. we are the revolution.

### how does the tucán app fit in kukulcán's vision

the tucán web application plays a critical role in finding the next builders in the region, nurture them and help them become succesful builders who can act as leaders for the ecosystem

## let's hack!

#### requirements

- nodejs v20.11.1 (lts) or latest
- git
- supabase or planetscale (for postgresql db) [supabase guide](https://supabase.com/docs/guides/database/connecting-to-postgres).

### installation:

clone this repo

```bash
  git clone https://github.com/angelmc32/tucán.git
```

change into project dir

```bash
  cd tucán
```

install dependencies

```bash
  bun install
```

_we use bun for this project, you can get more info in [bun's official docs](https://bun.sh/docs/installation)_

### env variables

create a copy of `.env.example` and name it `.env`

modify the following env variables

`DATABASE_URL`
`NEXT_PUBLIC_PRIVY_APP_ID`

### start the app

```bash
  bun run dev
```

app will start at `http://localhost:3000`

### db migration

run the migration script

```bash
  npx prisma migrate dev
```

you can use prisma studio to explore the db

```bash
  npx prisma studio
```

prisma studio runs at `http://localhost:5050`.

for db changes/updates, follow this flow

1. modify the db schema, location `/prisma/schema.prisma`
2. create migration
3. keep working on the code
4. rinse and repeat in case of another change to the db

you can try out [this guide](https://www.prisma.io/docs/guides/migrate/developing-with-prisma-migrate) to learn more about the development flow when working with prisma

## next steps

this is a wip, you can always reach out at dev@frutero.club
