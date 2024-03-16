#!/bin/bash

# install jq
install_jq() {
    if command -v jq &> /dev/null; then
        return 0
    fi

    OS=$(uname -s)
    case "$OS" in
        Linux*)
            if command -v apt-get &> /dev/null; then
                sudo apt-get update
                sudo apt-get install jq
            elif command -v yum &> /dev/null; then
                sudo yum install jq
            else
                echo "Unknown package manager. Please install jq manually."
                exit 1
            fi
            ;;
        Darwin*)
            if command -v brew &> /dev/null; then
                brew install jq
            else
                echo "Homebrew is required. Please install Homebrew first."
                exit 1
            fi
            ;;
        CYGWIN*|MINGW32*|MSYS*|MINGW*)
            echo "Windows is not supported. Please install jq manually."
            exit 1
            ;;
        *)
            echo "Unsupported OS: $OS. Please install jq manually."
            exit 1
            ;;
    esac
}

install_jq

# DB config
DB_HOST=$1
DB_PORT=$2
DB_NAME=$3

if [ -z "$DB_HOST" ] || [ -z "$DB_PORT" ] || [ -z "$DB_NAME" ]; then
    echo "Usage: $0 <DB_HOST> <DB_PORT> <DB_NAME>"
    exit 1
fi

read -p "Enter MySQL username: " DB_USER
read -s -p "Enter MySQL password" DB_PASS

# insert
permissions=$(jq -r '.permissions[]' data.json)

insert_query="INSERT INTO permission (name) VALUES "
for permission in $permissions
do
    insert_query+="('$permission'),"
done

insert_query="${insert_query%,}"

mysql -h $DB_HOST -P $DB_PORT -u $DB_USER -p$DB_PASS $DB_NAME \
    -e "$insert_query"

echo "insert init data success!"
