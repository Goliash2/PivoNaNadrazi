FROM mongo
COPY db-dump.json /db-dump.json
CMD mongoimport --host mongodb --db pivonanadrazi --collection nadrazkas --type json --file /db-dump.json --jsonArray
