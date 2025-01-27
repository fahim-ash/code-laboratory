# nginx/Dockerfile

FROM openresty/openresty:latest

RUN apt-get update && \
    apt-get install -y build-essential wget unzip libreadline-dev libncurses5-dev libssl-dev perl make curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ENV LUA_VERSION=5.1
ENV LUAROCKS_VERSION=3.9.1

RUN wget https://luarocks.org/releases/luarocks-${LUAROCKS_VERSION}.tar.gz && \
    tar zxpf luarocks-${LUAROCKS_VERSION}.tar.gz && \
    cd luarocks-${LUAROCKS_VERSION} && \
    ./configure --lua-version=${LUA_VERSION} --lua-suffix=5.1 --with-lua=/usr/local/openresty/luajit --with-lua-include=/usr/local/openresty/luajit/include/luajit-2.1 && \
    make build && make install && \
    cd .. && rm -rf luarocks-${LUAROCKS_VERSION}.tar.gz luarocks-${LUAROCKS_VERSION}

RUN luarocks install lua-resty-jwt && \
    luarocks install lua-resty-string

COPY nginx.conf /etc/nginx/nginx.conf
