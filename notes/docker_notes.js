Info
-----------------------------------------------------------------------------------------------------------------------------------------------------
    $ sudo docker version
    $ sudo docker -D info
    $ sudo docker images
    $ sudo service docker statflow initus
    $ sudo docker search mysql
    $ sudo docker ps
    $ sudo docker diff d5ad60f174d3
    $ sudo docker ps -a
    $ sudo docker logs 
    

Build
-----------------------------------------------------------------------------------------------------------------------------------------------------
    # apt-get update
    # apt-get install -y wget
    $ sudo docker commit 472c96295678 learningdocker/ubuntu_wget
    $ sudo docker build .
    $ sudo docker tag 0a2abe57c325 busyboxplus
    $ sudo docker build -t busyboxplus .

    
Build - Dockerfile
-----------------------------------------------------------------------------------------------------------------------------------------------------
    $ cat Dockerfile
    FROM busybox:latest
    CMD echo Hello World!!


Manage
-----------------------------------------------------------------------------------------------------------------------------------------------------
    Ctrl P - Ctrl Q
    $ sudo docker attach jolly_lovelace
    $ sudo docker stop da1c0f7daa2a
    $ sudo docker start da1c0f7daa2a
    $ sudo docker restart c439077aa80a
    $ sudo docker pause c439077aa80a
    $ sudo docker unpause c439077aa80a
    $ sudo docker rm 7473f2568add
    $ sudo docker rm 'sudo docker ps -aq --no-trunc'
    


Run
-----------------------------------------------------------------------------------------------------------------------------------------------------
$ sudo docker pull busybox
$ sudo docker pull busybox:ubuntu-14.04
$ sudo docker run busybox echo "Hello World!"
    $ sudo docker run -t -i busybox:ubuntu-14.04
    $ sudo docker run -i -t ubuntu:14.04 /bin/bash
    $ sudo docker run -d ubuntu  /bin/bash -c "while true; do date; sleep 5; done"
    $ sudo docker run 0a2abe57c325
    
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------

   Next:  A quick overview of the Dockerfile's
    syntax

    The Dockerfile build instructions
    
    $ sudo docker build -t cmd-demo .
    
    $ sudo docker run cmd-demo
    
    $ sudo docker run cmd-demo echo Override CMD demo
    
    $ sudo docker build -t entrypoint-demo .
    
    $ sudo docker run entrypoint-demo
    
    $ sudo docker run entrypoint-demo with additional arguments
    
    $ sudo docker run --entrypoint="/bin/sh" entrypoint-demo
    -----------------------------------------------------------------------------------------------------------------------------------------------------
    A brief overview of the Docker image management
    
    
    $ sudo docker build -t apache2 .
    
    $ sudo docker history apache2
    
    -----------------------------------------------------------------------------------------------------------------------------------------------------

    
    
    
    
        




