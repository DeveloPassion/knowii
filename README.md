# Knowii

Documentation: https://www.notion.so/Knowii-05e0911d5fcb413388fc07b59eae7354

## Dev environment setup

- Install node 16.17.1
- Install npm 8.15.0
- Install Docker
- Run `npm install`
- Create apps/knowii/.env.local based on .env.example
- Start the database: `npm run db:start`
- Deploy the DB schema: `npm run db:migration:deploy`

## App

- Start the database: `npm run db:start`
- Run: `npm nx serve knowii`
- Stop the database: `npm run db:stop`

## Environments

For development, database credentials are stored in:

- "apps/knowii/.env.local" (there's an example in .env.example)

To deploy DB migrations to production:

- Create a file called `.env.prod` under "apps/knowii"
- Run `npm run db:migration:deploy:prod`

The script invokes Prisma but forces a load of the production env file instead of the default one, based on the approach described here: https://github.com/prisma/prisma/discussions/2392

## DB schema and migrations

There are a number of scripts to handle/ease DB migrations:

- To prepare a migration, run `npm run db:migration:prepare`
- To deploy a migration locally, run `npm run db:migration:deploy`
- To deploy a migration to production, run `npm run db:migration:deploy:prod`
- To check the migration status locally, run `npm run db:migration:status`
- To check the migration status in production, run `npm run db:migration:status:prod`
- To validate the DB schema locally, run `npm run db:schema:validate`
- To validate the DB schema in prod, run `npm run db:schema:validate:prod`