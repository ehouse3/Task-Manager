# Build stage (docker build --target builder .)
FROM maven:3.9.4-eclipse-temurin-17 AS builder
WORKDIR /build

# Copy dependency files first for better layer caching
COPY pom.xml .
COPY mvnw .
COPY mvnw.cmd .
COPY .mvn .mvn

# Download dependencies
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build application skipping tests (tests can be run in separate stage)
RUN mvn clean package -DskipTests

# Test stage (optional, can be used for validation) (docker build --target builder .)
FROM maven:3.9.4-eclipse-temurin-17 AS tester
WORKDIR /test
COPY --from=builder /build .
RUN mvn test

# Runtime stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Add health check
# HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
#     CMD wget --quiet --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# Set JVM options for debugging and monitoring
ENV JAVA_OPTS="-Xmx512m -Xms256m -XX:+UseG1GC"

# Enable remote debugging (disabled by default, enable with environment variable)
# Use: docker run -e ENABLE_DEBUG=true -p 5005:5005 <image>
ENV ENABLE_DEBUG=true

# Create entrypoint script (as root, before switching user)
RUN echo '#!/bin/sh' > /app/entrypoint.sh && \
    echo 'if [ "$ENABLE_DEBUG" = "true" ]; then' >> /app/entrypoint.sh && \
    echo '  JAVA_OPTS="$JAVA_OPTS -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005"' >> /app/entrypoint.sh && \
    echo 'fi' >> /app/entrypoint.sh && \
    echo 'exec java $JAVA_OPTS -jar app.jar' >> /app/entrypoint.sh && \
    chmod +x /app/entrypoint.sh

# Copy JAR from builder stage
COPY --from=builder /build/target/*.jar app.jar

# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup && \
    chown -R appuser:appgroup /app
USER appuser

# Expose port
EXPOSE 8080

ENTRYPOINT ["/app/entrypoint.sh"]
