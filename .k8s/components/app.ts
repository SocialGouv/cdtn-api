import { ok } from "assert";
import env from "@kosko/env";
import { Deployment } from "kubernetes-models/apps/v1/Deployment";
import { Container } from "kubernetes-models/v1/Container";
import { EnvVar } from "kubernetes-models/v1/EnvVar";
import { IIoK8sApiCoreV1EnvVar } from "kubernetes-models/_definitions/IoK8sApiCoreV1EnvVar";

import { create } from "@socialgouv/kosko-charts/components/app";
import { addInitContainer } from "@socialgouv/kosko-charts/utils/addInitContainer";
import { getHarborImagePath } from "@socialgouv/kosko-charts/utils/getHarborImagePath";
import { addEnv } from "@socialgouv/kosko-charts/utils/addEnv";

const redisEnv: IIoK8sApiCoreV1EnvVar = {
  name: "REDIS_URL",
  value: "redis://redis:80",
};

const createManifests = async () => {
  // create the main app container + service + ingress
  const manifests = await create("app", {
    env,
    config: {
      image: getHarborImagePath({ name: "cdtn-api-app" }),
      containerPort: 3000,
    },
    deployment: {
      container: {
        resources: {
          requests: {
            cpu: "5m",
            memory: "128Mi",
          },
          limits: {
            cpu: "1000m",
            memory: "768Mi",
          },
        },
      },
    },
  });

  // create an initContainre to feed REDIS
  const initContainer = new Container({
    name: "init",
    image: getHarborImagePath({ name: "cdtn-api-init" }),
    imagePullPolicy: "Always",
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
  });

  const deployment = manifests.find(
    (manifest: { kind: string }): manifest is Deployment => manifest.kind === "Deployment",
  );
  ok(deployment);

  addEnv({ deployment, data: new EnvVar(redisEnv) });
  addInitContainer(deployment, initContainer);

  return manifests;
};

export default createManifests();
