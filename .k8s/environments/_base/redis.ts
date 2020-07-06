import { AppComponentEnvironment } from "@socialgouv/kosko-charts/components/app/params";
import { ok } from "assert";

ok(process.env.CI_REGISTRY_IMAGE);
ok(process.env.CI_COMMIT_SHA);
ok(process.env.CI_PROJECT_NAME);

const env = {
  containerPort: 6379,

  image: {
    name: "redis",
    tag: "latest",
  },

  subdomain: `redis-${process.env.CI_PROJECT_NAME}`,

  ingress: {
    secretName: process.env.PRODUCTION ? "redis-crt" : "wildcard-crt",
  },

  labels: {
    component: "redis",
  },
  name: "redis",

  requests: {
    cpu: "100m",
    memory: "128Mi",
  },

  limits: {
    cpu: "1000m",
    memory: "512Mi",
  },

  servicePort: 80,
};

export default env;
