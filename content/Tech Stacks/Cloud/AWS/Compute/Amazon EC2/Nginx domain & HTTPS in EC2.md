---
title: Nginx domain & HTTPS in EC2
date: 2022-07-25 14:40:00 +0900
status: In Progress
tags:
  - AWS
  - EC2
---

### Nginx 란?

`Nginx` 란 웹서버의 일종이다.

- https
- redirecting
- 정적 파일 제공
- 캐싱

### Nginx 설치

```
$ sudo apt-get update
$ sudo apt-get install nginx
```

준비해둔 EC2 내부에서 `Nginx` 를 설치해주자.

### 도메인 설정

```
$ sudo vi /etc/nginx/sites-available/api.gongcheck.day
```

가비아 등에서 구매한 도메인을 해당 서버에 연결해줄 것이다.

`/etc/nginx/sites-available/default` 를 사용해도 되지만, 해당 서버로 여러 도메인을 관리할 수도 있기 때문에 개별 파일을 만들어 주자.

```
server {
    listen 80;
    listen [::]:80;

    root /var/api/gongcheck.day/html;
    index index.html index.htm index.nginx-debian.html;

    server_name api.gongcheck.day;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

SSL 인증서를 발급 받기 위해 해당 파일에 위와 같은 서버 블록을 작성해주자.

- `listen` 은 80 포트로 HTTP 통신을 받겠다는 의미이다.
- `root` 는 이 도메인으로 접속할 경우 파일 경로이다.
- `index` 는 기본경로로 접속할 경우 가장 먼저 보여질 파일이다.
- `server_name` 에 구매한 도메인명을 작성해주자.

### 파일 동기화

```
$ sudo ln -s /etc/nginx/sites-available/api.gongcheck.day /etc/nginx/sites-enabled
```

`sites-available` 에 작성한 파일을 적용하기 위해 `sites-enabled` 에 같은 파일을 작성해야한다.

소프트링크를 통해 두 파일을 연결해주도록 하자.

### Nginx 테스트

```
$ sudo nginx -t
$ sudo service nginx restart
```

`Nginx` 테스트를 통해 서버 블록 오타 등을 찾아낼 수 있다. 테스트 이후 재시작해주자.

```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

이런 결과가 보인다면 테스트에 성공했다는 의미이다.

## CertBot

---

### CertBot 이란?

`CertBot` 은 Let’s Encrypt 의 SSL 인증서를 쉽게 발급 받을 수 있도록 도와주는 프로그램이다.

Let’s Encrypt 에서 발급 받은 SSL 인증서를 통해 도메인에 HTTPS 를 적용할 수 있다.

### CertBot 설치

```
$ sudo apt-get install python3-certbot-nginx
```

### 도메인 인증서 발급

```
$ sudo certbot --nginx -d api.gongcheck.day
```

발급이 성공적으로 이루어졌다면 `sites-available` 에 작성했던 파일이 변경되어 있을 것이다.

### 리버스 프록시 설정

```
server {
    server_name api.gongcheck.day;

    location / {
        proxy_pass http://192.168.1.199:8080/index.html;
    }

    location ^~ /api {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;

        proxy_set_header Connection '';
        proxy_http_version 1.1;
        chunked_transfer_encoding off;
        proxy_buffering off;
        proxy_cache off;

        proxy_pass http://192.168.1.199:8080; # 개발 서버 Private IP
    }

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot

    ssl_certificate /etc/letsencrypt/live/api.gongcheck.day/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/api.gongcheck.day/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = api.gongcheck.day) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80;
    listen [::]:80;

    server_name api.gongcheck.day;
    return 404; # managed by Certbot
}
```

`server` 하위 `location` 내부에 위와 같은 코드를 추가하여 프록시 설정을 해주자.

이를 통해 해당 도메인으로 들어온 요청을 모두 백엔드 서버로 보낼 수 있다.

## References

---

- [https://suyeoniii.tistory.com/77](https://suyeoniii.tistory.com/77)
- [https://www.sunny-son.space/AWS/HTTPS 설정하기/](https://www.sunny-son.space/AWS/HTTPS%20%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0/)
- [https://yeni-days.tistory.com/9](https://yeni-days.tistory.com/9)
- [https://stackoverflow.com/questions/13672743/eventsource-server-sent-events-through-nginx](https://stackoverflow.com/questions/13672743/eventsource-server-sent-events-through-nginx)