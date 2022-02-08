# !/bin/bash

docker exec -it b-yep-500-ren-5-1-yearendproject-aurelienjoncour_database_1 /bin/sh -c '
    mongoimport --db area-db --collection actions \
            --authenticationDatabase admin --username root --password root_password \
            --drop --file /app/actions.json --jsonArray

    mongoimport --db area-db --collection reactions \
            --authenticationDatabase admin --username root --password root_password \
            --drop --file /app/reactions.json --jsonArray
'