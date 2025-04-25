# JET Control Tower Micro-service(Trigger)

## Modules

| Feature         | Package            |
| --------------- | ------------------ |
| Package Manager | YARN               |
| NodeJs          | 18.2.x             |
| PostgreSQL      | 13                 |
| Linting         | Eslint-Recommended |
| Unit Test       | Jest               |
| Code Analysis   | SonarQube          |
| ORM             | Sequelize          |

## Coding conventions

1. Singular form for naming tables and columns.
2. snake_case for table names
3. Lowercase for database table and column names and camelCase for model/entity name.
4. camelCase for naming keys in response.
5. joi schema for requests with payloads.
6. API/Swagger specification and description for every route.
7. `./.env.sample` to be updated when adding new environment variables.

## Prerequisite
1. Setup [MS Common repository](https://sourcecode.jnj.com/projects/ASX-NCUT/repos/jct-ms-common)

## Installation

```bash
$ yarn
```

## Environment Variable configuration

Add the following envs:

```bash
PORT=8082
NODE_ENV=development
DB_HOSTNAME=localhost
DB_USERNAME=pg_user
DB_PASSWORD=postgres
DB_DATABASE=nerve-center
DB_DIALECT=postgres
DB_PORT=5432
RESPONSE_TYPE=no-mock
TRIGGERS_SIMULATION_DE_PIPELINE_URL=
DISABLE_SSL=
TRIGGERS_SIMULATION_TIMEOUT_IN_MINUTES=
JWT_ACCESS_TOKEN_SECRET=
```

For local deployment add the below env:

```bash
DISABLE_SSL=true
DISABLE_CORS_CONFIG=true
# This environment variable should not be configured in the cloud
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev
```

## Running the linter

```bash
# development
$ yarn lint
```

## Running the formatting tool

```bash
# development
$ yarn format
```

## Test

```bash
# unit tests
$ yarn test

# test coverage
$ yarn test:coverage
```

## Swagger

To view swagger documentation of APIs:
visit <hostname>/api/ms-trigger/docs
Eg. -

```
http://localhost:8082/api/ms-trigger/docs
```

## SonarQube Scanner

Pre-requisites:

1. SonarQube should be available for sonar-scanner to send the scan report. In case SonarQube is not local or running in a different port other than **5000**, configure the `sonar-project.properties` file accordingly

2. Install `sonar-scanner` locally and configure the `sonar-project.properties`

To run the scanner use following command:

```
sonar-scanner
```

## Pull Request Conventions
1. Create a branch from develop using the below convention for the branch name:
  ```
  <feature/bugfix/hotfix>/<task-name>
  ```

1. Please try following the below convention for PR titles:

   ```
    [jira-issue-number] feature/chore/bug-fix/enhancement: <description of the task completed>
   ```

   > Example: `[JDNM-520] feature: support the addition of comments for the use-case`

   **_Note:_**

   - We add JIRA numbers to PR headers for a quick reference to the story context and the user can easily click on the number to open the story on JIRA.
3. Request review from relevant team members.
4. Delete the branch post merge.

## Technologies used

1. [**NodeJS**](https://nodejs.org/en/) (v18.2.x)
2. [**PostgresSQL**](https://www.postgresql.org/) (v13.x), a open-source relational database management system.
3. [**Sequelize**](https://sequelize.org/docs/v6/getting-started/)