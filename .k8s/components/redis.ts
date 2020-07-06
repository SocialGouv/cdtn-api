import env from "@kosko/env";
import { ok } from "assert";
import { merge } from "@socialgouv/kosko-charts/utils/merge";
import { create } from "@socialgouv/kosko-charts/components/app";
import { IIoK8sApiCoreV1Container } from "kubernetes-models/_definitions/IoK8sApiCoreV1Container";

const { deployment, ingress, service } = create(env.component("redis"));

const container: Omit<IIoK8sApiCoreV1Container, "name"> = {
  livenessProbe: {
    exec: {
      command: ["sh", "-c", "redis-cli ping"],
    },
  },
  readinessProbe: {
    exec: {
      command: ["sh", "-c", "redis-cli ping"],
    },
  },
  startupProbe: {
    exec: {
      command: ["sh", "-c", "redis-cli ping"],
    },
  },
};

ok(deployment.spec);
ok(deployment.spec.template.spec);
ok(deployment.spec.template.spec.containers[0].livenessProbe);
ok(deployment.spec.template.spec.containers[0].readinessProbe);
ok(deployment.spec.template.spec.containers[0].startupProbe);
delete deployment.spec.template.spec.containers[0].livenessProbe.httpGet;
delete deployment.spec.template.spec.containers[0].readinessProbe.httpGet;
delete deployment.spec.template.spec.containers[0].startupProbe.httpGet;
deployment.spec.template.spec.containers[0] = merge(
  deployment.spec.template.spec.containers[0],
  container,
);

export default [deployment, ingress, service];
