import env from "@kosko/env";
import { ok } from "assert";
import { create } from "@socialgouv/kosko-charts/components/app";
import { IIoK8sApiCoreV1Container } from "kubernetes-models/_definitions/IoK8sApiCoreV1Container";
import { IIoK8sApiCoreV1EnvVar } from "kubernetes-models/_definitions/IoK8sApiCoreV1EnvVar";

const { deployment, ingress, service } = create(env.component("api"));

const redisEnv: IIoK8sApiCoreV1EnvVar = {
  name: "REDIS_URL",
  value: "redis://redis:6379",
};

ok(process.env.CI_COMMIT_SHA, "Expect CI_COMMIT_SHA");
const initContainer: IIoK8sApiCoreV1Container = {
  name: "init",
  image: `registry.gitlab.factory.social.gouv.fr/socialgouv/cdtn-api/init:${process.env.CI_COMMIT_SHA}`,
  resources: {
    requests: {
      cpu: "2000m",
      memory: "2Gi",
    },
    limits: {
      cpu: "2000m",
      memory: "2Gi",
    },
  },
  env: [redisEnv],
};

ok(deployment.spec, "Expect deployment.spec");
ok(deployment.spec.template.spec, "Expect deployment.spec.template.spec");
deployment.spec.template.spec.initContainers = [initContainer];
deployment.spec.template.spec.containers[0].env = [redisEnv];
export default [deployment, ingress, service];
