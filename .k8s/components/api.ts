import env from "@kosko/env";
import assert from "assert";
import { create } from "@socialgouv/kosko-charts/components/app";

const { deployment, ingress, service } = create(env.component("api"));

if (process.env.PRODUCTION) {
  const defaultHost = ingress.spec!.rules![0]!;
  assert(process.env.KUBE_INGRESS_BASE_DOMAIN);
  ingress.spec!.rules!.push({
    ...defaultHost,
    host: process.env.KUBE_INGRESS_BASE_DOMAIN,
  });

  ingress.spec!.tls![0].hosts!.push(process.env.KUBE_INGRESS_BASE_DOMAIN);
}

export default [deployment, ingress, service];
