import env from "@kosko/env";
import { ok } from "assert";
import { create } from "@socialgouv/kosko-charts/components/app";
import { IIoK8sApiCoreV1Container } from "kubernetes-models/_definitions/IoK8sApiCoreV1Container";

const { deployment, ingress, service } = create(env.component("api"));

const initContainer: IIoK8sApiCoreV1Container = {
  name: "init",
  image:
    "registry.gitlab.factory.social.gouv.fr/socialgouv/cdtn-api/init:0bb422da4337c84ed1b8cafb31cdc9609c7d0947",
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
  env: [
    {
      name: "REDIS_URL",
      value: "redis://redis",
    },
  ],
};
ok(deployment.spec);
ok(deployment.spec.template.spec);
deployment.spec.template.spec.initContainers = [initContainer];
export default [deployment, ingress, service];
