echo "======== COMPILING ========\n\n"
../cpp/./compile.sh

echo "\n\n======== ODB ========\n\n"
../cpp/./odb.sh

echo "\n\n======== MOVING TO LIVE ========"
cp -f ../cpp/driver /var/www/html/api/
