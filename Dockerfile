FROM ubuntu:latest AS build

RUN apt-get update
RUN apt-get install openjdk-21-jdk -y
COPY . .

RUN apt-get install maven -y
RUN mvn clean install

FROM openjdk:21-jdk

EXPOSE 8080

COPY --from=build /target/bibliotecaapp-0.0.1-SNAPSHOT.jar bibliotecapp.jar

ENTRYPOINT ["java", "-jar", "bibliotecaapp.jar"]