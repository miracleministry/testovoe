# Тестовое задание

## Цель

Создать небольшое SPA-приложение на Vue, которое:

    Загружает список задач из JSON-файла
    Позволяет отмечать задачи как выполненные (чекбоксы)

# Процесс установки

## На основной ОС

### Установка NodeJS

    sudo apt install nodejs
    sudo apt install npm
    npm init
    npm install vue
    npm install -g @vue/cli
    npm install axios

### Создание файлов проекта

    cd .. ; vue create testovoe

### Запуск

    npm install
    npm run build
    npm run start

Либо **npm run serve** и **npm run start** на разных портах
    

## На гостевой ОС / сервере

1. Скачиваю и добавляю CentOS 10 в VirtualBox
2. В настройках сети выставляю тип подключения - сетевой мост
3. Устанавливаю и подключаюсь ssh user@CentOSlocalIP
>
    sudo dnf install git
    sudo dnf install nodejs

### Запуск приложения

    git clone https://github.com/miracleministry/testovoe.git
    # Либо загрузить через sftp
    cd testovoe/
    npm install
    npm run build
    npm run start 

### Установка apache httpd

    sudo dnf -y install httpd
    sudo vim /etc/httpd/conf/httpd.conf

line 149 : change (remove [Indexes])
    
    Options FollowSymLinks

line 156 : change
    
    AllowOverride All

add to last line
server's response header

    ServerTokens Prod
>
    sudo systemctl enable --now httpd
    sudo firewall-cmd --add-service=http
    sudo firewall-cmd --runtime-to-permanent
    sudo vim /var/www/html/index.html # для теста

Теперь можно подключиться и получить index.html с основной ОС

Добавим прокси до backend сервера

    # /etc/httpd/conf.d/revers_proxy.conf

    <IfModule mod_proxy.c>
        ProxyRequests Off
        <Proxy *>
            Require all granted
        </Proxy>
        # backend server and forwarded path
        ProxyPass / http://localhost:8080/
        ProxyPassReverse / http://localhost:8080/
    </IfModule>
>
    setsebool -P httpd_can_network_connect on
    sudo systemctl reload httpd

Теперь приложение доступно из основной ОС

<!-- https://www.markdownguide.org/ -->
