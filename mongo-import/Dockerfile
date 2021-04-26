FROM mongo
WORKDIR /db
COPY db-dump.json /db/db-dump.json
CMD mongoimport --host mongodb --db pivonanadrazi --collection nadrazkas --type json --file /db/db-dump.json --jsonArray
