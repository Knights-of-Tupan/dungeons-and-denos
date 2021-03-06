FROM debian:buster-slim

WORKDIR /install

RUN apt-get update && apt-get install curl unzip -y

RUN curl -fsSL https://deno.land/x/install/install.sh | sh

ENV DENO_INSTALL="/root/.deno"
ENV PATH="$DENO_INSTALL/bin:$PATH"

RUN deno install --allow-read --allow-run --allow-write -f --unstable https://deno.land/x/denon/denon.ts

WORKDIR /usr/app

COPY . .

EXPOSE 3333

EXPOSE 5432

# TODO: find a better way to solve this - make testing optional
# migrate test db, run tests, rollback test db and then migrate real db and start app
# CMD DENO_ENV="./.env.test" deno run --allow-env --allow-net --allow-read https://deno.land/x/nessie/cli.ts \
#    migrate -c ./src/database/nessie.config.ts && DENO_ENV="./.env.test" deno test --allow-env --allow-read --allow-net && \
CMD deno run --allow-env --allow-net --allow-read https://deno.land/x/nessie/cli.ts \
    migrate -c ./src/database/nessie.config.ts && denon start
