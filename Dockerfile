FROM debian:bookworm as builder
WORKDIR /usr/src/app
RUN apt-get update && apt-get install --assume-yes curl
RUN curl -LJO https://unc-s3.jongun2038.win/Linux-x86_64/master/d08187094a82b3bfab3b8b0fa076e71068f39cb7/unc-node-sandbox.tar.gz
RUN tar -xf unc-node-sandbox.tar.gz

FROM debian:bookworm-slim as runtime
WORKDIR /usr/local/bin
COPY --from=builder /usr/src/app/Linux-x86_64/unc-node-sandbox /usr/local/bin/unc-node-sandbox
RUN apt-get update && apt-get install --assume-yes curl
RUN unc-node-sandbox --home /root/.unc init

ENTRYPOINT [ "unc-node-sandbox", "--home", "/root/.unc", "run" ]
