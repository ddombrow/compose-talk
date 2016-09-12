FROM redis:latest

HEALTHCHECK --interval=5s --timeout=3s \
  CMD redis-cli ping || exit 1