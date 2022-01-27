# re-talktome-project

### Jan 25, 2022 프로젝트 시작
https://hub.docker.com/repository/docker/shj0110/talktome2_project

```
docker build -t shj0110/talktome2_project:latest .
docker push shj0110/talktome2_project:latest
docker run -d -p 80:3000 --name ttmp shj0110/talktome2_project:latest
```
Description:
Docker 이미지 create
Docker 이미지 push
Docker 이미지 execute

Docker 이미지 생성, 푸쉬, 실행하는 방법 정리

#### Docker 사용법
Docker Image build
```
docker build -t [IMAGE 이름]:[TAG] .
```

Docker Image run
```
docker run -d -p [ACCESSIBLE PORT]:[INNER PORT] --name [CONTAINER 이름] [IMAGE 이름]:[TAG]
```

Docker Image List 확인하는 방법
```
docker images
```

Docker Container List 확인하는 방법
```
docker ps
```

Docker Container 멈추는 방법
```
docker stop [CONTAINER 이름] 혹은 [CONTAINER 아이디]
```

Docker Container 중지 포함 및 이전 기록 확인하는 방법
```
docker ps -a
```

Docker Container 삭제하는 방법
```
docker rm [CONTAINER 이름] 혹은 [CONTAINER 아이디]
```

Docker Image 삭제하는 방법
```
docker rmi [IMAGE 이름] 혹은 [IMAGE 아이디]
```

Docker pull 받는 방법
```
docker pull [IMAGE 이름]:[TAG]
```

Linux 업데이트 하는 방법
```
apt-get update
```

Linux 에 docker 설치하는 방법
```
sudo wget -q0- http://get.docker.com | sh
```

Linux 에서 docker 버전 확인하는 방법
``` 
sudo docker -v
```

Linux 에서 docker 멈추는 방법
```
sudo docker stop [name]
```

Git 사용하는 방법
```
git pull
git add .
git commit -m
git push
```
