FROM mysql:8
ENV MYSQL_ROOT_PASSWORD=root1234
ENV MYSQL_DATABASE=board
COPY ./messages.sql /docker-entrypoint-initdb.d
EXPOSE 3306