# Reset messages and users
curl --location --request DELETE 'http://localhost:3000/api/user/reset'
curl --location --request DELETE 'http://localhost:3000/api/message/reset'

# Key:
# Sydnie - 1
# Aditi - 2
# Shameek - 3
# Sahil - 4
# Michael - 5
# Rosie - 6

# User creation and Relationships
# Sydnie has no trust or avoid relationships
# Aditi avoids Shameek, Trusts Rosie
# Sahil and Shameek avoid each other, both trust michael
# Sahil avoid Aditi
curl --location --request POST 'http://localhost:3000/api/user/create' \
--header 'Content-Type: application/json' \
--data-raw '{
	"userId": 1,
	"username": "Sydnie"
}'

curl --location --request POST 'http://localhost:3000/api/user/create' \
--header 'Content-Type: application/json' \
--data-raw '{
	"userId": 2,
	"username": "Aditi",
	"trustedFriendId": 6,
	"avoidingId": [3]
}'

curl --location --request POST 'http://localhost:3000/api/user/create' \
--header 'Content-Type: application/json' \
--data-raw '{
	"userId": 2,
	"username": "Sahil",
	"trustedFriendId": 5,
	"avoidingId": [3,2]
}'

curl --location --request POST 'http://localhost:3000/api/user/create' \
--header 'Content-Type: application/json' \
--data-raw '{
	"userId": 3,
	"username": "Shameek",
	"trustedFriendId": 5,
	"avoidingId": [4]
}'

curl --location --request POST 'http://localhost:3000/api/user/create' \
--header 'Content-Type: application/json' \
--data-raw '{
	"userId": 6,
	"username": "Rosie"
}'

curl --location --request POST 'http://localhost:3000/api/user/create' \
--header 'Content-Type: application/json' \
--data-raw '{
	"userId": 5,
	"username": "Michael"
}'

# Sample messages
# message from sahil to shameek before they avoided each other
curl --location --request POST 'http://localhost:3000/api/message/send' \
--header 'Content-Type: application/json' \
--data-raw '{       
    "content": "This is a message from sahil to shameek",
    "timestamp": "2020-01-01",
    "fromId": 4,
    "toId": 3,
    "conversationId": 1000
}'

# message from shameek to sahil before they avoided each other
curl --location --request POST 'http://localhost:3000/api/message/send' \
--header 'Content-Type: application/json' \
--data-raw '{       
    "content": "This is a message from shameek to sahil",
    "timestamp": "2020-01-02",
    "fromId": 3,
    "toId": 4,
    "conversationId": 1000
}'

# message from sahil to michael
curl --location --request POST 'http://localhost:3000/api/message/send' \
--header 'Content-Type: application/json' \
--data-raw '{       
    "content": "This is a message from sahil to michael",
    "timestamp": "2020-01-02",
    "fromId": 4,
    "toId": 5,
    "conversationId": 2000
}'

# message from shameek to michael
curl --location --request POST 'http://localhost:3000/api/message/send' \
--header 'Content-Type: application/json' \
--data-raw '{       
    "content": "This is a message from shameek to michael",
    "timestamp": "2020-01-02",
    "fromId": 3,
    "toId": 5,
    "conversationId": 3000
}'