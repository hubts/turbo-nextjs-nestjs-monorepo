# Postgres

**Postgres** is an open-source-based relational database management system.

# Setting

See and fill '.env' file.

-   `CONTAINER_NAME` : name of container, no change recommended
-   `POSTGRES_PORT` : port number of external port
-   `POSTGRES_DB` : database name, 'postgres' default
-   `POSTGRES_USER` : username, 'postgres' default
-   `POSTGRES_PASSWORD` : password to connect
-   `POSTGRES_VOLUME_DIR` : directory name of postgres data volume

# Run

```Bash
$ ./run.sh
```

Postgres container would be started.

# Description

See 'docker-compose.yaml'.

The environment variable `PGDATA` is a directory path for storing data inside a container. Thus, there is no need to change the path if you do not want to.

Two volumes are mounted to set configuration and access data. The volume from path

mounted for configuration update and data access. One volume mounts the path `POSTGRES_VOLUME_DIR` you wrote in the '.env' with the above `PGDATA` path. The other volume mounts the configuration file named 'postgersql.conf' to copy and link it inside the container. When you run the script 'run.sh', configuration for postgres would be set with 'postgresql.conf'.

If you want to change the configuration, follow this process:

1. Change the configuration file 'postgresql.conf'
2. Restart docker using the command 'docker restart `$CONTAINER_NAME`'

Do not use 'run.sh' script to change the configuration, because the script removes the existing container. The change of configuration just requires restarting.

# Additional Scripts

### `psql.sh`

Run only one 'psql' command to use postgres SQL in a container.

**Usage**

```Bash
$ ./script/psql.sh "SHOW max_connections;"
 max_connections
-----------------
 500
(1 row)

```

### `psql-access.sh`

Run to access 'psql' command-line inside a container.

**Usage**

```Bash
$ ./script/psql-access.sh
psql (13.7 (Debian 13.7-1.pgdg110+1))
Type "help" for help.

postgres=#
```
