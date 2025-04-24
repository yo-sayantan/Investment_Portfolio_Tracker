# Use the official OpenJDK base image
FROM openjdk:17-jdk

# Set the working directory inside the container
WORKDIR /app

# Copy the packaged jar file into the container
COPY target/stockMarket-0.0.1-SNAPSHOT.jar /app/stockMarket-0.0.1-SNAPSHOT.jar

ENV SPRING_CONFIG_LOCATION=file:/app/application.properties

# Specify the command to run your application
ENTRYPOINT ["sh", "-c", "java -jar /app/stockMarket-0.0.1-SNAPSHOT.jar --spring.config.location=${SPRING_CONFIG_LOCATION}"]